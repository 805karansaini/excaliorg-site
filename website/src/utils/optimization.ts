// Performance optimization utilities
import { trackPerformance, trackError } from './analytics';

export interface OptimizationConfig {
  lazyLoadImages: boolean;
  prefetchLinks: boolean;
  cacheResources: boolean;
  compressImages: boolean;
  minifyAssets: boolean;
  enableServiceWorker: boolean;
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private config: OptimizationConfig;
  private imageObserver: IntersectionObserver | null = null;
  private linkObserver: IntersectionObserver | null = null;
  private resourceCache: Map<string, any> = new Map();

  private constructor(config: Partial<OptimizationConfig> = {}) {
    this.config = {
      lazyLoadImages: true,
      prefetchLinks: true,
      cacheResources: true,
      compressImages: true,
      minifyAssets: true,
      enableServiceWorker: true,
      ...config
    };
  }

  public static getInstance(config?: Partial<OptimizationConfig>): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer(config);
    }
    return PerformanceOptimizer.instance;
  }

  /**
   * Initialize all performance optimizations
   */
  public initialize(): void {
    this.initializeLazyLoading();
    this.initializePrefetching();
    this.initializeResourceCaching();
    this.optimizeImages();
    this.optimizeFonts();
    this.optimizeCSS();
    this.trackInitialPerformance();
  }

  /**
   * Initialize lazy loading for images
   */
  private initializeLazyLoading(): void {
    if (!this.config.lazyLoadImages) return;

    this.imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              img.removeAttribute('data-src');
              this.imageObserver?.unobserve(img);
              
              trackPerformance('lazy_load_image', performance.now(), 'optimization');
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => this.imageObserver?.observe(img));
  }

  /**
   * Initialize link prefetching
   */
  private initializePrefetching(): void {
    if (!this.config.prefetchLinks) return;

    this.linkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.href;
            
            if (href && !link.dataset.prefetched) {
              this.prefetchResource(href);
              link.dataset.prefetched = 'true';
              this.linkObserver?.unobserve(link);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px'
      }
    );

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
    links.forEach((link) => this.linkObserver?.observe(link));
  }

  /**
   * Prefetch a resource
   */
  private prefetchResource(url: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    
    trackPerformance('prefetch_resource', performance.now(), 'optimization');
  }

  /**
   * Initialize resource caching
   */
  private initializeResourceCaching(): void {
    if (!this.config.cacheResources) return;

    // Cache frequently accessed resources
    // const cacheableResources = ['fetch', 'XMLHttpRequest']; // Reserved for future use

    // Override fetch to add caching
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      
      // Check cache first
      if (this.resourceCache.has(url)) {
        return Promise.resolve(this.resourceCache.get(url));
      }

      try {
        const response = await originalFetch(input, init);
        const clonedResponse = response.clone();
        
        // Cache successful responses
        if (response.ok) {
          this.resourceCache.set(url, clonedResponse);
        }
        
        return response;
      } catch (error) {
        trackError('fetch_error', `Failed to fetch ${url}`, error instanceof Error ? error.message : 'Unknown error');
        throw error;
      }
    };
  }

  /**
   * Optimize images
   */
  private optimizeImages(): void {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
      // Add loading="lazy" if not already present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      // Add proper alt text warning
      if (!img.hasAttribute('alt')) {
        console.warn('Image missing alt text:', img.src);
      }

      // Optimize image format suggestions
      const src = img.src;
      if (src && !src.includes('.webp') && !src.includes('.avif')) {
        console.info('Consider using WebP or AVIF format for better compression:', src);
      }
    });
  }

  /**
   * Optimize fonts
   */
  private optimizeFonts(): void {
    // Add font-display: swap to existing font faces
    const fontFaces = document.querySelectorAll('style');
    fontFaces.forEach((style) => {
      if (style.textContent && style.textContent.includes('@font-face')) {
        if (!style.textContent.includes('font-display')) {
          style.textContent = style.textContent.replace(
            /@font-face\s*{/g,
            '@font-face { font-display: swap;'
          );
        }
      }
    });

    // Preload critical fonts
    const criticalFonts = [
      'Inter-Regular.woff2',
      'Inter-SemiBold.woff2',
      'Inter-Bold.woff2'
    ];

    criticalFonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = `/fonts/${font}`;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize CSS
   */
  private optimizeCSS(): void {
    // Remove unused CSS classes (basic implementation)
    const usedClasses = new Set<string>();
    const elements = document.querySelectorAll('*');
    
    elements.forEach((element) => {
      element.classList.forEach((className) => {
        usedClasses.add(className);
      });
    });

    // Log unused classes for manual review
    const stylesheets = document.querySelectorAll('style, link[rel="stylesheet"]');
    stylesheets.forEach((sheet) => {
      if (sheet instanceof HTMLStyleElement && sheet.textContent) {
        const cssText = sheet.textContent;
        const classMatches = cssText.match(/\.[a-zA-Z0-9_-]+/g);
        
        if (classMatches) {
          classMatches.forEach((match) => {
            const className = match.slice(1);
            if (!usedClasses.has(className)) {
              console.info('Potentially unused CSS class:', className);
            }
          });
        }
      }
    });
  }

  /**
   * Track initial performance metrics
   */
  private trackInitialPerformance(): void {
    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.fetchStart
          };

          Object.entries(metrics).forEach(([key, value]) => {
            trackPerformance(`initial_${key}`, value, 'page_load');
          });
        }

        // Track resource counts
        const resources = performance.getEntriesByType('resource');
        const resourceCounts = {
          total: resources.length,
          images: resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)).length,
          scripts: resources.filter(r => r.name.match(/\.js$/i)).length,
          styles: resources.filter(r => r.name.match(/\.css$/i)).length,
          fonts: resources.filter(r => r.name.match(/\.(woff|woff2|ttf|eot)$/i)).length
        };

        Object.entries(resourceCounts).forEach(([key, value]) => {
          trackPerformance(`resource_count_${key}`, value, 'resource_analysis');
        });
      }, 1000);
    });
  }

  /**
   * Optimize event listeners
   */
  public optimizeEventListeners(): void {
    // Convert all scroll listeners to passive
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
      
      if (passiveEvents.includes(type)) {
        if (typeof options === 'boolean') {
          options = { passive: true, capture: options };
        } else {
          options = { passive: true, ...options };
        }
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  /**
   * Implement critical resource hints
   */
  public addResourceHints(): void {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];

    hints.forEach((hint) => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }

  /**
   * Implement compression for text-based resources
   */
  public enableCompression(): void {
    // This would typically be handled by the server
    // but we can at least verify that gzip is supported
    const supportsGzip = 'CompressionStream' in window;
    const supportsBrotli = 'CompressionStream' in window && 'brotli' in CompressionStream.prototype;
    
    trackPerformance('compression_gzip_support', supportsGzip ? 1 : 0, 'feature_detection');
    trackPerformance('compression_brotli_support', supportsBrotli ? 1 : 0, 'feature_detection');
  }

  /**
   * Implement memory optimization
   */
  public optimizeMemory(): void {
    // Clean up unused objects periodically
    let cleanupInterval: number;
    
    const performCleanup = () => {
      // Clear old cache entries
      if (this.resourceCache.size > 50) {
        const entries = Array.from(this.resourceCache.entries());
        const toRemove = entries.slice(0, 25);
        toRemove.forEach(([key]) => this.resourceCache.delete(key));
      }
      
      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc();
      }
    };

    cleanupInterval = window.setInterval(performCleanup, 300000); // 5 minutes

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(cleanupInterval);
      this.resourceCache.clear();
    });
  }

  /**
   * Get optimization recommendations
   */
  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    
    // Check for optimization opportunities
    const images = document.querySelectorAll('img');
    const scripts = document.querySelectorAll('script');
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    
    if (images.length > 10) {
      recommendations.push('Consider implementing image lazy loading and compression');
    }
    
    if (scripts.length > 5) {
      recommendations.push('Consider bundling and minifying JavaScript files');
    }
    
    if (styles.length > 3) {
      recommendations.push('Consider combining CSS files to reduce HTTP requests');
    }
    
    // Check for render-blocking resources
    const renderBlocking = document.querySelectorAll('script:not([async]):not([defer]), link[rel="stylesheet"]:not([media])');
    if (renderBlocking.length > 0) {
      recommendations.push('Consider making non-critical resources async or deferred');
    }
    
    return recommendations;
  }

  /**
   * Cleanup resources
   */
  public dispose(): void {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
    if (this.linkObserver) {
      this.linkObserver.disconnect();
    }
    this.resourceCache.clear();
  }
}

// Export singleton instance
export const performanceOptimizer = PerformanceOptimizer.getInstance();

// Auto-initialize optimizations
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceOptimizer.initialize();
    performanceOptimizer.optimizeEventListeners();
    performanceOptimizer.addResourceHints();
    performanceOptimizer.enableCompression();
    performanceOptimizer.optimizeMemory();
  });
}