// Google Analytics 4 utilities for event tracking
export const GA_MEASUREMENT_ID = 'G-RY42DV6SGY';

// Analytics configuration
export const ANALYTICS_CONFIG = {
  measurementId: GA_MEASUREMENT_ID,
  cookieFlags: 'SameSite=None;Secure',
  anonymizeIp: true,
  allowAdFeatures: false,
  allowGoogleSignals: false,
  sendPageView: true,
  debug: import.meta.env?.DEV || false
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track custom events with Google Analytics
 * @param action - The action that was performed
 * @param category - The category of the event
 * @param label - Optional label for the event
 * @param value - Optional numeric value for the event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track CTA button clicks
 * @param buttonText - Text of the button that was clicked
 * @param location - Where on the page the button was clicked
 */
export const trackCTAClick = (buttonText: string, location: string) => {
  trackEvent('cta_click', 'engagement', `${buttonText} - ${location}`);
};

/**
 * Track Chrome Web Store redirects
 * @param source - Source of the redirect (hero, sticky, footer, etc.)
 */
export const trackStoreRedirect = (source: string) => {
  trackEvent('store_redirect', 'conversion', source);
};

/**
 * Track FAQ interactions
 * @param question - The FAQ question that was clicked
 * @param isOpening - Whether the FAQ is opening or closing
 */
export const trackFAQInteraction = (question: string, isOpening: boolean) => {
  trackEvent(
    isOpening ? 'faq_open' : 'faq_close',
    'engagement',
    question.substring(0, 50) + (question.length > 50 ? '...' : '')
  );
};

/**
 * Track theme toggle usage
 * @param theme - The theme that was switched to
 */
export const trackThemeToggle = (theme: 'light' | 'dark') => {
  trackEvent('theme_toggle', 'engagement', theme);
};

/**
 * Track scroll depth milestones
 * @param percentage - Percentage of page scrolled
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

/**
 * Track feature card hover interactions
 * @param featureName - Name of the feature card that was hovered
 */
export const trackFeatureCardHover = (featureName: string) => {
  trackEvent('feature_card_hover', 'engagement', featureName);
};

/**
 * Track section visibility (when user scrolls to a section)
 * @param sectionName - Name of the section that became visible
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', 'engagement', sectionName);
};

/**
 * Track user engagement metrics
 * @param metric - The engagement metric to track
 * @param value - The value of the metric
 * @param context - Additional context for the metric
 */
export const trackEngagement = (metric: string, value: number, context?: string) => {
  trackEvent('engagement_metric', 'user_behavior', `${metric}${context ? ` - ${context}` : ''}`, value);
};

/**
 * Track performance metrics
 * @param metric - The performance metric name
 * @param value - The metric value in milliseconds
 * @param context - Additional context
 */
export const trackPerformance = (metric: string, value: number, context?: string) => {
  trackEvent('performance_metric', 'technical', `${metric}${context ? ` - ${context}` : ''}`, value);
};

/**
 * Track user journey milestones
 * @param milestone - The milestone reached
 * @param timeToReach - Time to reach milestone in seconds
 * @param context - Additional context
 */
export const trackJourneyMilestone = (milestone: string, timeToReach?: number, context?: string) => {
  trackEvent('journey_milestone', 'user_flow', `${milestone}${context ? ` - ${context}` : ''}`, timeToReach);
};

/**
 * Track A/B test interactions
 * @param testId - The A/B test identifier
 * @param variantId - The variant the user is seeing
 * @param interaction - The interaction type
 * @param value - Optional numeric value
 */
export const trackABTestInteraction = (testId: string, variantId: string, interaction: string, value?: number) => {
  trackEvent('ab_test_interaction', 'experimentation', `${testId}_${variantId}_${interaction}`, value);
};

/**
 * Track conversion funnel steps
 * @param step - The funnel step name
 * @param stepNumber - The step number in the funnel
 * @param context - Additional context
 */
export const trackFunnelStep = (step: string, stepNumber: number, context?: string) => {
  trackEvent('funnel_step', 'conversion', `${stepNumber}_${step}${context ? ` - ${context}` : ''}`, stepNumber);
};

/**
 * Track error events
 * @param errorType - The type of error
 * @param errorMessage - The error message or description
 * @param context - Additional context about where the error occurred
 */
export const trackError = (errorType: string, errorMessage: string, context?: string) => {
  trackEvent('error', 'technical', `${errorType}: ${errorMessage}${context ? ` - ${context}` : ''}`);
};

/**
 * Track user preferences
 * @param preference - The preference type
 * @param value - The preference value
 * @param context - Additional context
 */
export const trackUserPreference = (preference: string, value: string, context?: string) => {
  trackEvent('user_preference', 'personalization', `${preference}: ${value}${context ? ` - ${context}` : ''}`);
};

/**
 * Track feature usage
 * @param featureName - The name of the feature used
 * @param action - The action taken with the feature
 * @param context - Additional context
 */
export const trackFeatureUsage = (featureName: string, action: string, context?: string) => {
  trackEvent('feature_usage', 'engagement', `${featureName}_${action}${context ? ` - ${context}` : ''}`);
};

/**
 * Track mobile-specific interactions
 * @param interaction - The mobile interaction type
 * @param context - Additional context
 */
export const trackMobileInteraction = (interaction: string, context?: string) => {
  trackEvent('mobile_interaction', 'mobile', `${interaction}${context ? ` - ${context}` : ''}`);
};

/**
 * Track accessibility interactions
 * @param interaction - The accessibility interaction type
 * @param method - The interaction method (keyboard, screen reader, etc.)
 * @param context - Additional context
 */
export const trackAccessibilityInteraction = (interaction: string, method: string, context?: string) => {
  trackEvent('accessibility_interaction', 'accessibility', `${interaction}_${method}${context ? ` - ${context}` : ''}`);
};

/**
 * Enhanced event tracking with custom parameters
 * @param eventName - The event name
 * @param parameters - Custom event parameters
 */
export const trackCustomEvent = (eventName: string, parameters: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

/**
 * Track user session information
 * @param sessionData - Session data to track
 */
export const trackSessionInfo = (sessionData: {
  sessionId: string;
  startTime: Date;
  userAgent: string;
  screenResolution: string;
  viewport: string;
  referrer?: string;
}) => {
  trackCustomEvent('session_start', {
    session_id: sessionData.sessionId,
    start_time: sessionData.startTime.toISOString(),
    user_agent: sessionData.userAgent,
    screen_resolution: sessionData.screenResolution,
    viewport: sessionData.viewport,
    referrer: sessionData.referrer || 'direct'
  });
};

/**
 * Track page performance metrics
 * @param metrics - Performance metrics to track
 */
export const trackPagePerformance = (metrics: {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}) => {
  trackCustomEvent('page_performance', {
    load_time: metrics.loadTime,
    dom_content_loaded: metrics.domContentLoaded,
    first_paint: metrics.firstPaint,
    first_contentful_paint: metrics.firstContentfulPaint,
    largest_contentful_paint: metrics.largestContentfulPaint,
    cumulative_layout_shift: metrics.cumulativeLayoutShift,
    first_input_delay: metrics.firstInputDelay
  });
};

/**
 * Initialize enhanced analytics tracking
 */
export const initializeAnalytics = () => {
  // Track session start
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const sessionData = {
    sessionId,
    startTime: new Date(),
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer
  };
  
  trackSessionInfo(sessionData);
  
  // Track page performance when available
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };
        
        trackPagePerformance(metrics);
      }, 1000);
    });
  }
  
  // Initialize performance monitoring
  if (typeof window !== 'undefined') {
    import('./performance').then(({ initializePerformanceMonitoring }) => {
      initializePerformanceMonitoring();
    });
  }
};