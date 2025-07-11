// Google Analytics 4 utilities for event tracking
export const GA_MEASUREMENT_ID = 'G-RY42DV6SGY';

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