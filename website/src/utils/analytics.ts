// Google Analytics 4 utilities for event tracking with performance optimization
import { analyticsBatcher } from './analytics-batch';

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
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track custom events with Google Analytics - Optimized with batching
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
  // Use batching for better performance
  analyticsBatcher.addEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  });
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
 * Track section visibility (when user scrolls to a section)
 * @param sectionName - Name of the section that became visible
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', 'engagement', sectionName);
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
 * Initialize enhanced analytics tracking
 */
export const initializeAnalytics = () => {
  // Track session start
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
  const sessionData = {
    sessionId,
    startTime: new Date(),
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer
  };

  trackSessionInfo(sessionData);

};
