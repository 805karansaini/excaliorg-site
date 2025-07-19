// Privacy compliance and GDPR utilities
import { trackUserPreference } from './analytics';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export interface PrivacyConfig {
  enableCookieConsent: boolean;
  enableGDPRCompliance: boolean;
  enableCCPACompliance: boolean;
  cookieExpirationDays: number;
  analyticsOptOut: boolean;
  dataRetentionDays: number;
  showPrivacyBanner: boolean;
}

export interface CookieData {
  name: string;
  value: string;
  expires: Date;
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export interface PrivacyConsent {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: Date;
  version: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface DataProcessingRecord {
  purpose: string;
  dataTypes: string[];
  legalBasis: string;
  retention: number;
  thirdParties: string[];
  crossBorderTransfer: boolean;
  automated: boolean;
}

// Feature flag: Set to true to show privacy bar, false to allow cookies/tracking by default
export const SHOW_PRIVACY_BANNER = false;

export class PrivacyManager {
  private static instance: PrivacyManager;
  private config: PrivacyConfig;
  private consent: PrivacyConsent | null = null;
  private banner: HTMLElement | null = null;
  private dataProcessingRecords: DataProcessingRecord[] = [];

  private constructor(config: Partial<PrivacyConfig> = {}) {
    this.config = {
      enableCookieConsent: true,
      enableGDPRCompliance: true,
      enableCCPACompliance: true,
      cookieExpirationDays: 365,
      analyticsOptOut: false,
      dataRetentionDays: 1095, // 3 years
      showPrivacyBanner: true,
      ...config
    };

    this.initializeDataProcessingRecords();
  }

  public static getInstance(config?: Partial<PrivacyConfig>): PrivacyManager {
    if (!PrivacyManager.instance) {
      PrivacyManager.instance = new PrivacyManager(config);
    }
    return PrivacyManager.instance;
  }

  /**
   * Initialize privacy compliance features
   */
  public initialize(): void {
    if (!SHOW_PRIVACY_BANNER) {
      // If feature flag is false, set consent to all true and do not show banner
      this.setConsent({
        analytics: true,
        functional: true,
        marketing: true,
        timestamp: new Date(),
        version: '1.0'
      });
      return;
    }
    this.loadStoredConsent();
    this.detectUserLocation();
    this.setupPrivacyBanner();
    this.setupAnalyticsOptOut();
    this.setupDataMinimization();
    this.setupCookieManagement();
  }

  /**
   * Initialize data processing records
   */
  private initializeDataProcessingRecords(): void {
    this.dataProcessingRecords = [
      {
        purpose: 'Website Analytics',
        dataTypes: ['IP address', 'Browser information', 'Page views', 'Session duration'],
        legalBasis: 'Legitimate interest',
        retention: 1095, // 3 years
        thirdParties: ['Google Analytics'],
        crossBorderTransfer: true,
        automated: true
      },
      {
        purpose: 'Performance Monitoring',
        dataTypes: ['Page load times', 'Error logs', 'User interactions'],
        legalBasis: 'Legitimate interest',
        retention: 730, // 2 years
        thirdParties: [],
        crossBorderTransfer: false,
        automated: true
      },
      {
        purpose: 'User Experience Enhancement',
        dataTypes: ['Theme preferences', 'Language settings', 'Accessibility settings'],
        legalBasis: 'Consent',
        retention: 365, // 1 year
        thirdParties: [],
        crossBorderTransfer: false,
        automated: false
      }
    ];
  }

  /**
   * Load stored consent preferences
   */
  private loadStoredConsent(): void {
    const stored = localStorage.getItem('privacy_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.consent = {
          ...parsed,
          timestamp: new Date(parsed.timestamp)
        };
      } catch (e) {
        console.warn('Failed to parse stored consent:', e);
        this.consent = null;
      }
    }
  }

  /**
   * Detect user location for regional compliance
   */
  private detectUserLocation(): void {
    // In production, this would use a geolocation service
    // For now, we'll assume GDPR compliance is needed
    const isEU = true // Placeholder
    const isCA = false // Placeholder

    if (isEU) {
      this.config.enableGDPRCompliance = true;
    }
    if (isCA) {
      this.config.enableCCPACompliance = true;
    }
  }

  /**
   * Setup privacy banner
   */
  private setupPrivacyBanner(): void {
    // Remove any existing banners before creating a new one
    const existingBanners = document.querySelectorAll('.privacy-banner');
    existingBanners.forEach(banner => banner.remove());

    if (!this.config.showPrivacyBanner || this.hasValidConsent()) {
      return;
    }

    this.banner = document.createElement('div');
    this.banner.className = 'privacy-banner';
    this.banner.innerHTML = `
      <div class="privacy-banner-content">
        <div class="privacy-banner-text">
          <h3>Privacy & Cookies</h3>
          <p>We use cookies and similar technologies to enhance your experience, analyze site usage, and provide personalized content. By continuing to use our site, you consent to our use of cookies.</p>
        </div>
        <div class="privacy-banner-actions">
          <button class="privacy-btn privacy-btn-accept" data-action="accept-all">Accept All</button>
          <button class="privacy-btn privacy-btn-customize" data-action="customize">Customize</button>
          <button class="privacy-btn privacy-btn-reject" data-action="reject-all">Reject All</button>
        </div>
      </div>
      <div class="privacy-banner-details" style="display: none;">
        <div class="privacy-category">
          <label>
            <input type="checkbox" name="analytics" checked>
            <span>Analytics Cookies</span>
            <small>Help us understand how you use our site</small>
          </label>
        </div>
        <div class="privacy-category">
          <label>
            <input type="checkbox" name="functional" checked>
            <span>Functional Cookies</span>
            <small>Essential for site functionality</small>
          </label>
        </div>
        <div class="privacy-category">
          <label>
            <input type="checkbox" name="marketing">
            <span>Marketing Cookies</span>
            <small>Used for personalized advertising</small>
          </label>
        </div>
        <div class="privacy-banner-actions">
          <button class="privacy-btn privacy-btn-save" data-action="save-preferences">Save Preferences</button>
          <button class="privacy-btn privacy-btn-back" data-action="back">Back</button>
        </div>
      </div>
    `;

    this.banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-card);
      border-top: 1px solid var(--color-border);
      box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
      z-index: 1000;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
    `;

    document.body.appendChild(this.banner);
    this.setupBannerEvents();
  }

  /**
   * Setup banner event listeners
   */
  private setupBannerEvents(): void {
    if (!this.banner) return;

    this.banner.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const action = target.dataset.action;

      switch (action) {
        case 'accept-all':
          this.setConsent({
            analytics: true,
            functional: true,
            marketing: true,
            timestamp: new Date(),
            version: '1.0'
          });
          break;

        case 'reject-all':
          this.setConsent({
            analytics: false,
            functional: true, // Always required
            marketing: false,
            timestamp: new Date(),
            version: '1.0'
          });
          break;

        case 'customize':
          this.showCustomizationOptions();
          break;

        case 'save-preferences':
          this.saveCustomPreferences();
          break;

        case 'back':
          this.hideCustomizationOptions();
          break;
      }
    });
  }

  /**
   * Show customization options
   */
  private showCustomizationOptions(): void {
    if (!this.banner) return;

    const content = this.banner.querySelector('.privacy-banner-content') as HTMLElement;
    const details = this.banner.querySelector('.privacy-banner-details') as HTMLElement;

    content.style.display = 'none';
    details.style.display = 'block';
  }

  /**
   * Hide customization options
   */
  private hideCustomizationOptions(): void {
    if (!this.banner) return;

    const content = this.banner.querySelector('.privacy-banner-content') as HTMLElement;
    const details = this.banner.querySelector('.privacy-banner-details') as HTMLElement;

    content.style.display = 'block';
    details.style.display = 'none';
  }

  /**
   * Save custom preferences
   */
  private saveCustomPreferences(): void {
    if (!this.banner) return;

    const analyticsCheckbox = this.banner.querySelector('input[name="analytics"]') as HTMLInputElement;
    const functionalCheckbox = this.banner.querySelector('input[name="functional"]') as HTMLInputElement;
    const marketingCheckbox = this.banner.querySelector('input[name="marketing"]') as HTMLInputElement;

    this.setConsent({
      analytics: analyticsCheckbox.checked,
      functional: functionalCheckbox.checked,
      marketing: marketingCheckbox.checked,
      timestamp: new Date(),
      version: '1.0'
    });
  }

  /**
   * Set consent preferences
   */
  private setConsent(consent: PrivacyConsent): void {
    this.consent = consent;
    localStorage.setItem('privacy_consent', JSON.stringify(consent));

    // Track consent preferences
    trackUserPreference('analytics_consent', consent.analytics ? 'granted' : 'denied');
    trackUserPreference('functional_consent', consent.functional ? 'granted' : 'denied');
    trackUserPreference('marketing_consent', consent.marketing ? 'granted' : 'denied');

    // Configure analytics based on consent
    this.configureAnalytics(consent.analytics);

    // Remove banner from DOM and clear reference
    if (this.banner) {
      this.banner.remove();
      this.banner = null;
    }

    // Dispatch consent event
    window.dispatchEvent(new CustomEvent('privacy-consent-changed', {
      detail: consent
    }));
  }

  /**
   * Configure analytics based on consent
   */
  private configureAnalytics(enabled: boolean): void {
    if (typeof window.gtag === 'function') {
      (window.gtag as any)('consent', 'update', {
        analytics_storage: enabled ? 'granted' : 'denied',
        ad_storage: enabled ? 'granted' : 'denied',
        functionality_storage: 'granted',
        personalization_storage: enabled ? 'granted' : 'denied',
        security_storage: 'granted'
      });
    }
  }

  /**
   * Check if user has valid consent
   */
  private hasValidConsent(): boolean {
    if (!this.consent) return false;

    const consentAge = Date.now() - this.consent.timestamp.getTime();
    const maxAge = this.config.cookieExpirationDays * 24 * 60 * 60 * 1000;

    return consentAge < maxAge;
  }

  /**
   * Setup analytics opt-out
   */
  private setupAnalyticsOptOut(): void {
    // Global opt-out mechanism
    (window as Window & { 'ga-disable-G-RY42DV6SGY'?: boolean })['ga-disable-G-RY42DV6SGY'] = this.config.analyticsOptOut;

    // Listen for Do Not Track header
    if (navigator.doNotTrack === '1') {
      this.config.analyticsOptOut = true;
      (window as Window & { 'ga-disable-G-RY42DV6SGY'?: boolean })['ga-disable-G-RY42DV6SGY'] = true;
    }
  }

  /**
   * Setup data minimization
   */
  private setupDataMinimization(): void {
    // Anonymize IP addresses
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-RY42DV6SGY', {
        anonymize_ip: true,
        allow_ad_personalization_signals: false,
        allow_google_signals: false
      });
    }

    // Set up automatic data deletion
    this.scheduleDataDeletion();
  }

  /**
   * Schedule automatic data deletion
   */
  private scheduleDataDeletion(): void {
    const deleteOldData = () => {
      const keys = Object.keys(localStorage);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.dataRetentionDays);

      keys.forEach(key => {
        if (key.startsWith('privacy_') || key.startsWith('analytics_')) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsed = JSON.parse(item);
              if (parsed.timestamp) {
                const itemDate = new Date(parsed.timestamp);
                if (itemDate < cutoffDate) {
                  localStorage.removeItem(key);
                }
              }
            } catch {
              // If can't parse, remove old items
              localStorage.removeItem(key);
            }
          }
        }
      });
    };

    // Run immediately and then daily
    deleteOldData();
    setInterval(deleteOldData, 24 * 60 * 60 * 1000);
  }

  /**
   * Setup cookie management
   */
  private setupCookieManagement(): void {
    // Override document.cookie to track cookie usage
    const originalCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');

    if (originalCookie) {
      Object.defineProperty(document, 'cookie', {
        get: originalCookie.get,
        set: (value: string) => {
          const cookieName = value.split('=')[0];
          console.log(`Cookie set: ${cookieName}`);

          // Apply SameSite and Secure attributes
          let enhancedValue = value;
          if (!value.includes('SameSite=')) {
            enhancedValue += '; SameSite=Lax';
          }
          if (location.protocol === 'https:' && !value.includes('Secure')) {
            enhancedValue += '; Secure';
          }

          if (originalCookie.set) {
            originalCookie.set.call(document, enhancedValue);
          }
        },
        enumerable: true,
        configurable: true
      });
    }
  }

  /**
   * Get current consent status
   */
  public getConsent(): PrivacyConsent | null {
    return this.consent;
  }

  /**
   * Check if specific consent is granted
   */
  public hasConsent(type: 'analytics' | 'functional' | 'marketing'): boolean {
    return this.consent ? this.consent[type] : false;
  }

  /**
   * Revoke consent
   */
  public revokeConsent(): void {
    this.consent = null;
    localStorage.removeItem('privacy_consent');

    // Reconfigure analytics
    this.configureAnalytics(false);

    // Show banner again
    if (this.config.showPrivacyBanner) {
      this.setupPrivacyBanner();
    }

    trackUserPreference('consent_revoked', 'true');
  }

  /**
   * Get data processing records
   */
  public getDataProcessingRecords(): DataProcessingRecord[] {
    return this.dataProcessingRecords;
  }

  /**
   * Generate privacy policy content
   */
  public generatePrivacyPolicy(): string {
    const policy = [
      '# Privacy Policy for Excali Organizer',
      '',
      '**Effective Date:** January 12, 2025',
      '',
      '## Introduction',
      '',
      'Excali Organizer is a Chrome extension that enhances your Excalidraw experience with organization and project management features. We are committed to protecting your privacy and being transparent about our data practices.',
      '',
      '## Core Privacy Principles',
      '',
      '• **Local-First:** Your canvases and projects are stored locally on your device',
      '• **No Account Required:** We don\'t collect personal information or require account creation',
      '• **Minimal Data Collection:** We only collect anonymous usage analytics to improve the extension',
      '• **Your Control:** You have full control over your data and privacy preferences',
      '',
      '## What Data We Collect',
      '',
      '### Website Analytics (This Website Only)',
      'When you visit this website (excali.org), we use Google Analytics to understand how users interact with our site:',
      '• Page views and navigation patterns',
      '• Time spent on pages and bounce rates',
      '• Device type, browser, and approximate location (country/region)',
      '• Referral sources and search terms',
      '',
      'This data is anonymous and aggregated. We use it to improve the website experience and understand user interest in the extension.',
      '',
      '### Extension Usage (Excali Organizer Extension)',
      'The Excali Organizer extension operates with a privacy-first approach:',
      '• **Your Canvases:** Never collected, transmitted, or stored on our servers',
      '• **Project Data:** Stored locally in your browser using secure storage APIs',
      '• **Preferences:** Theme settings and organizational preferences stored locally',
      '• **Usage Analytics:** We may collect anonymous feature usage to improve the extension (with your consent)',
      '',
      '## What We Don\'t Collect',
      '',
      '• Personal identifying information (name, email, etc.)',
      '• Your Excalidraw canvases or creative content',
      '• Login credentials or account information',
      '• Detailed browsing history outside of excalidraw.com usage',
      '• Any data that could identify you personally',
      '',
      '## How We Use Data',
      '',
      '### Website Analytics',
      '• Understand user interest and improve the website',
      '• Optimize content and user experience',
      '• Monitor website performance and fix issues',
      '',
      '### Extension Improvement',
      '• Identify popular features and usage patterns',
      '• Detect and fix bugs or performance issues',
      '• Prioritize new feature development',
      '',
      '## Data Storage and Security',
      '',
      '### Local Storage',
      '• Extension data is stored locally using Chrome\'s secure storage APIs',
      '• Data remains on your device and is not transmitted to our servers',
      '• You can export your data at any time for backup purposes',
      '',
      '### Analytics Data',
      '• Website analytics are processed by Google Analytics',
      '• Data is anonymized and aggregated',
      '• No personal information is included in analytics data',
      '',
      '## Your Rights and Choices',
      '',
      '### Cookie Preferences',
      'You can control analytics cookies through:',
      '• Our cookie consent banner (when first visiting the site)',
      '• Your browser settings',
      '• Opt-out tools provided by Google Analytics',
      '',
      '### Extension Data',
      '• **Export:** Export all your projects and data at any time',
      '• **Delete:** Remove the extension to delete all associated data',
      '• **Control:** Manage privacy settings within the extension',
      '',
      '### Your GDPR Rights',
      'If you\'re in the EU, you have additional rights:',
      '• **Access:** Request information about data we process',
      '• **Rectification:** Correct inaccurate data',
      '• **Erasure:** Request deletion of your data',
      '• **Portability:** Export your data in a standard format',
      '• **Objection:** Object to certain types of processing',
      '',
      '## Third-Party Services',
      '',
      '### Google Analytics',
      '• Used only for website analytics (not in the extension)',
      '• Governed by Google\'s Privacy Policy',
      '• You can opt-out using Google\'s tools or browser settings',
      '',
      '### Chrome Web Store',
      '• Extension distribution is handled by Google',
      '• Subject to Google\'s Chrome Web Store policies',
      '• Installation and update data may be processed by Google',
      '',
      '## Children\'s Privacy',
      '',
      'Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.',
      '',
      '## Changes to This Policy',
      '',
      'We may update this privacy policy from time to time. We will notify users of any material changes by:',
      '• Updating the "Effective Date" at the top of this policy',
      '• Posting the updated policy on our website',
      '• Providing notice within the extension if changes affect extension functionality',
      '',
      '## Contact Us',
      '',
      'If you have questions about this privacy policy or our data practices:',
      '',
      '• **Email:** privacy@excali.org',
      '• **GitHub:** Open an issue on our repository for public discussions',
      '• **Website:** Visit excali.org for the most current information',
      '',
      '## Open Source Commitment',
      '',
      'Excali Organizer is an open-source project. You can review our code, contribute improvements, and verify our privacy practices at our GitHub repository.',
      '',
      `**Last Updated:** ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`
    ];

    return policy.join('\n');
  }

  /**
   * Export user data (GDPR compliance)
   */
  public exportUserData(): string {
    const data = {
      consent: this.consent,
      localStorage: Object.fromEntries(
        Object.entries(localStorage).filter(([key]) =>
          key.startsWith('privacy_') || key.startsWith('analytics_')
        )
      ),
      cookieData: document.cookie.split(';').map(cookie => cookie.trim()),
      timestamp: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }

  /**
   * Delete all user data
   */
  public deleteAllUserData(): void {
    // Clear localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('privacy_') || key.startsWith('analytics_')) {
        localStorage.removeItem(key);
      }
    });

    // Clear cookies
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.trim().split('=')[0];
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // Reset consent
    this.consent = null;

    trackUserPreference('data_deleted', 'true');
  }

  /**
   * Cleanup resources
   */
  public dispose(): void {
    if (this.banner) {
      this.banner.remove();
    }
  }
}

// Export singleton instance
export const privacyManager = PrivacyManager.getInstance();

// Export utility functions
export const getConsent = () => privacyManager.getConsent();
export const hasConsent = (type: 'analytics' | 'functional' | 'marketing') => privacyManager.hasConsent(type);
export const revokeConsent = () => privacyManager.revokeConsent();
export const exportUserData = () => privacyManager.exportUserData();
export const deleteAllUserData = () => privacyManager.deleteAllUserData();
export const generatePrivacyPolicy = () => privacyManager.generatePrivacyPolicy();

/**
 * Clear stored consent for testing purposes
 */
export const clearConsent = () => {
  localStorage.removeItem('privacy_consent');
  privacyManager.revokeConsent();
};
