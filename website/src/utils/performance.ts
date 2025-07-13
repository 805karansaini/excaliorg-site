// Performance monitoring and optimization utilities
import { trackPerformance, trackError } from './analytics';

export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
  timeToInteractive?: number;
}

export interface ResourceMetrics {
  totalResources: number;
  totalSize: number;
  imageSize: number;
  cssSize: number;
  jsSize: number;
  slowestResource: {
    name: string;
    duration: number;
    size: number;
  };
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics | null = null;
  private observer: PerformanceObserver | null = null;
  private vitalsObserver: PerformanceObserver | null = null;

  private constructor() {
    this.initializeObservers();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers(): void {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    // Core Web Vitals observer
    if ('PerformanceObserver' in window) {
      try {
        this.vitalsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.trackLCP(entry.startTime);
            }
            if (entry.entryType === 'first-input') {
              const fidEntry = entry as PerformanceEventTiming
              this.trackFID(fidEntry.processingStart - entry.startTime)
            }
            if (entry.entryType === 'layout-shift') {
              const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number }
              if (!clsEntry.hadRecentInput) {
                this.trackCLS(clsEntry.value)
              }
            }
          }
        });

        this.vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        if (import.meta.env.DEV) {
          console.warn('Could not initialize Core Web Vitals observer:', e)
        }
      }
    }

    // Load event listener for basic metrics
    window.addEventListener('load', () => {
      this.collectBasicMetrics();
    });
  }

  private collectBasicMetrics(): void {
    if (!performance.getEntriesByType) return;

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      };

      this.metrics = metrics;
      this.reportMetrics(metrics);
    } catch (e) {
      trackError('performance_collection', 'Failed to collect basic metrics', e instanceof Error ? e.message : 'Unknown error');
    }
  }

  private trackLCP(value: number): void {
    if (this.metrics) {
      this.metrics.largestContentfulPaint = value;
    }
    trackPerformance('largest_contentful_paint', value, 'core_web_vitals');
  }

  private trackFID(value: number): void {
    if (this.metrics) {
      this.metrics.firstInputDelay = value;
    }
    trackPerformance('first_input_delay', value, 'core_web_vitals');
  }

  private trackCLS(value: number): void {
    if (this.metrics) {
      this.metrics.cumulativeLayoutShift = (this.metrics.cumulativeLayoutShift || 0) + value;
    }
    trackPerformance('cumulative_layout_shift', value * 1000, 'core_web_vitals'); // Convert to milliseconds for consistency
  }

  private reportMetrics(metrics: PerformanceMetrics): void {
    // Track individual metrics
    trackPerformance('load_time', metrics.loadTime, 'basic_metrics');
    trackPerformance('dom_content_loaded', metrics.domContentLoaded, 'basic_metrics');
    trackPerformance('first_paint', metrics.firstPaint, 'basic_metrics');
    trackPerformance('first_contentful_paint', metrics.firstContentfulPaint, 'basic_metrics');

    // Track performance grade
    const grade = this.calculatePerformanceGrade(metrics);
    trackPerformance('performance_grade', grade, 'overall_score');
  }

  private calculatePerformanceGrade(metrics: PerformanceMetrics): number {
    let score = 100;

    // Deduct points for slow metrics
    if (metrics.firstContentfulPaint > 2000) score -= 10;
    if (metrics.firstContentfulPaint > 4000) score -= 20;
    if (metrics.loadTime > 3000) score -= 15;
    if (metrics.loadTime > 5000) score -= 25;
    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 2500) score -= 15;
    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 4000) score -= 25;
    if (metrics.firstInputDelay && metrics.firstInputDelay > 100) score -= 10;
    if (metrics.firstInputDelay && metrics.firstInputDelay > 300) score -= 20;
    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) score -= 10;
    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.25) score -= 20;

    return Math.max(0, score);
  }

  public getMetrics(): PerformanceMetrics | null {
    return this.metrics;
  }

  public getResourceMetrics(): ResourceMetrics | null {
    if (!performance.getEntriesByType) return null;

    try {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      let totalSize = 0;
      let imageSize = 0;
      let cssSize = 0;
      let jsSize = 0;
      let slowestResource = { name: '', duration: 0, size: 0 };

      for (const resource of resources) {
        const size = resource.transferSize || 0;
        const duration = resource.responseEnd - resource.startTime;

        totalSize += size;

        if (resource.initiatorType === 'img') {
          imageSize += size;
        } else if (resource.initiatorType === 'link' && resource.name.includes('.css')) {
          cssSize += size;
        } else if (resource.initiatorType === 'script' || resource.name.includes('.js')) {
          jsSize += size;
        }

        if (duration > slowestResource.duration) {
          slowestResource = {
            name: resource.name,
            duration,
            size
          };
        }
      }

      return {
        totalResources: resources.length,
        totalSize,
        imageSize,
        cssSize,
        jsSize,
        slowestResource
      };
    } catch (e) {
      trackError('resource_analysis', 'Failed to analyze resource metrics', e instanceof Error ? e.message : 'Unknown error');
      return null;
    }
  }

  public startInteractionTracking(): void {
    // Track first interaction
    let firstInteraction = true
    const interactionHandler = () => {
      if (firstInteraction) {
        firstInteraction = false
        trackPerformance('time_to_first_interaction', performance.now(), 'user_interaction')
      }
    }

    ;['click', 'keydown', 'touchstart', 'scroll'].forEach(eventType => {
      document.addEventListener(eventType, interactionHandler, { once: true, passive: true })
    })
  }

  public trackCustomTiming(name: string, startTime: number, endTime?: number): void {
    const duration = endTime ? endTime - startTime : performance.now() - startTime;
    trackPerformance(name, duration, 'custom_timing');
  }

  public dispose(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.vitalsObserver) {
      this.vitalsObserver.disconnect();
    }
  }
}

// Memory usage monitoring
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private intervalId: number | null = null;

  private constructor() {}

  public static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  public startMonitoring(intervalMs = 30000): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      this.trackMemoryUsage();
    }, intervalMs);

    // Initial measurement
    this.trackMemoryUsage();
  }

  private trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
      if (memory) {
        trackPerformance('memory_used', memory.usedJSHeapSize, 'memory_metrics');
        trackPerformance('memory_total', memory.totalJSHeapSize, 'memory_metrics');
        trackPerformance('memory_limit', memory.jsHeapSizeLimit, 'memory_metrics');
      }
    }
  }

  public stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Connection monitoring
export class ConnectionMonitor {
  private static instance: ConnectionMonitor;

  private constructor() {
    this.initializeConnectionTracking();
  }

  public static getInstance(): ConnectionMonitor {
    if (!ConnectionMonitor.instance) {
      ConnectionMonitor.instance = new ConnectionMonitor();
    }
    return ConnectionMonitor.instance;
  }

  private initializeConnectionTracking(): void {
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection?: { downlink: number; rtt: number; effectiveType: string; addEventListener: (event: string, handler: () => void) => void } }).connection
      if (connection) {
        this.trackConnectionInfo(connection);
        
        connection.addEventListener('change', () => {
          this.trackConnectionInfo(connection);
        });
      }
    }
  }

  private trackConnectionInfo(connection: { downlink: number; rtt: number; effectiveType?: string }): void {
    trackPerformance('connection_downlink', connection.downlink * 1000, 'connection_metrics'); // Convert to Kbps
    trackPerformance('connection_rtt', connection.rtt, 'connection_metrics');
    
    // Track connection type
    if (connection.effectiveType) {
      trackPerformance('connection_type', this.getConnectionTypeScore(connection.effectiveType), 'connection_metrics');
    }
  }

  private getConnectionTypeScore(type: string): number {
    const scores: Record<string, number> = {
      'slow-2g': 1,
      '2g': 2,
      '3g': 3,
      '4g': 4,
      '5g': 5
    };
    return scores[type] || 0;
  }

  public getConnectionInfo(): unknown {
    if ('connection' in navigator) {
      return (navigator as unknown as { connection?: unknown }).connection
    }
    return null;
  }
}

// Bundle size analyzer
export class BundleAnalyzer {
  public static async analyzeBundleSize(): Promise<void> {
    if (!performance.getEntriesByType) return;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const analysis = {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      fontSize: 0,
      largestFiles: [] as Array<{ name: string; size: number; type: string }>
    };

    for (const resource of resources) {
      const size = resource.transferSize || 0;
      const url = resource.name;
      
      analysis.totalSize += size;

      let type = 'other';
      if (url.includes('.js')) {
        analysis.jsSize += size;
        type = 'js';
      } else if (url.includes('.css')) {
        analysis.cssSize += size;
        type = 'css';
      } else if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
        analysis.imageSize += size;
        type = 'image';
      } else if (url.match(/\.(woff|woff2|ttf|eot)$/)) {
        analysis.fontSize += size;
        type = 'font';
      }

      if (size > 10000) { // Only track files larger than 10KB
        analysis.largestFiles.push({ name: url, size, type });
      }
    }

    // Sort by size
    analysis.largestFiles.sort((a, b) => b.size - a.size);

    // Track bundle metrics
    trackPerformance('bundle_total_size', analysis.totalSize, 'bundle_analysis');
    trackPerformance('bundle_js_size', analysis.jsSize, 'bundle_analysis');
    trackPerformance('bundle_css_size', analysis.cssSize, 'bundle_analysis');
    trackPerformance('bundle_image_size', analysis.imageSize, 'bundle_analysis');
    trackPerformance('bundle_font_size', analysis.fontSize, 'bundle_analysis');

    // Track largest files
    analysis.largestFiles.slice(0, 5).forEach((file, index) => {
      trackPerformance(`bundle_largest_${index + 1}`, file.size, `bundle_analysis_${file.type}`);
    });
  }
}

// Initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  const performanceMonitor = PerformanceMonitor.getInstance();
  const memoryMonitor = MemoryMonitor.getInstance();
  // Initialize connection monitor
  ConnectionMonitor.getInstance();

  // Start interaction tracking
  performanceMonitor.startInteractionTracking();

  // Start memory monitoring (every 30 seconds)
  memoryMonitor.startMonitoring(30000);

  // Analyze bundle size after load
  window.addEventListener('load', () => {
    setTimeout(() => {
      BundleAnalyzer.analyzeBundleSize();
    }, 2000);
  });
};

// Export singleton instances
export const performanceMonitor = PerformanceMonitor.getInstance();
export const memoryMonitor = MemoryMonitor.getInstance();
// connectionMonitor is available via ConnectionMonitor.getInstance() when needed