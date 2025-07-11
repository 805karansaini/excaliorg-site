// Privacy compliance and GDPR utilities
import { trackUserPreference } from './analytics';

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
    const isEU = true; // Placeholder
    const isCA = false; // Placeholder
    
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
    
    // Hide banner
    if (this.banner) {
      this.banner.style.display = 'none';
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
    (window as any)['ga-disable-G-RY42DV6SGY'] = this.config.analyticsOptOut;
    
    // Listen for Do Not Track header
    if (navigator.doNotTrack === '1') {
      this.config.analyticsOptOut = true;
      (window as any)['ga-disable-G-RY42DV6SGY'] = true;
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
            } catch (e) {
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
    const originalCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || 
                          Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
    
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
      '# Privacy Policy',
      '',
      '## Data We Collect',
      'We collect the following types of data:',
      ...this.dataProcessingRecords.map(record => [
        `### ${record.purpose}`,
        `- **Data Types**: ${record.dataTypes.join(', ')}`,
        `- **Legal Basis**: ${record.legalBasis}`,
        `- **Retention**: ${record.retention} days`,
        `- **Third Parties**: ${record.thirdParties.join(', ') || 'None'}`,
        `- **Cross-Border Transfer**: ${record.crossBorderTransfer ? 'Yes' : 'No'}`,
        `- **Automated Processing**: ${record.automated ? 'Yes' : 'No'}`,
        ''
      ]).flat(),
      '',
      '## Your Rights',
      'Under GDPR, you have the following rights:',
      '- Right to access your data',
      '- Right to rectify incorrect data',
      '- Right to erase your data',
      '- Right to restrict processing',
      '- Right to data portability',
      '- Right to object to processing',
      '- Right to withdraw consent',
      '',
      '## Contact Information',
      'For privacy-related inquiries, please contact us at privacy@excali.org',
      '',
      `## Last Updated`,
      `This privacy policy was last updated on ${new Date().toLocaleDateString()}.`
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

// Auto-initialize privacy features
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    privacyManager.initialize();
  });
}

// Export utility functions
export const getConsent = () => privacyManager.getConsent();
export const hasConsent = (type: 'analytics' | 'functional' | 'marketing') => privacyManager.hasConsent(type);
export const revokeConsent = () => privacyManager.revokeConsent();
export const exportUserData = () => privacyManager.exportUserData();
export const deleteAllUserData = () => privacyManager.deleteAllUserData();
export const generatePrivacyPolicy = () => privacyManager.generatePrivacyPolicy();