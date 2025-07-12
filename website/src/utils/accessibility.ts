// Comprehensive accessibility utilities and audit tools
import { trackAccessibilityInteraction, trackError } from './analytics';

export interface AccessibilityConfig {
  enforceAria: boolean;
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  colorContrastChecking: boolean;
  focusManagement: boolean;
  motionPreferences: boolean;
}

export interface AccessibilityIssue {
  element: Element;
  type: 'error' | 'warning' | 'info';
  category: 'keyboard' | 'aria' | 'color' | 'content' | 'structure' | 'motion';
  message: string;
  recommendation: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriterion: string;
}

export interface ColorContrastResult {
  foreground: string;
  background: string;
  ratio: number;
  aaSmall: boolean;
  aaLarge: boolean;
  aaaSmall: boolean;
  aaaLarge: boolean;
}

export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private config: AccessibilityConfig;
  private issues: AccessibilityIssue[] = [];
  // private keyboardTraps: WeakSet<Element> = new WeakSet() // Reserved for future use
  private announcementRegion: HTMLElement | null = null;

  private constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      enforceAria: true,
      keyboardNavigation: true,
      screenReaderSupport: true,
      colorContrastChecking: true,
      focusManagement: true,
      motionPreferences: true,
      ...config
    };
  }

  public static getInstance(config?: Partial<AccessibilityConfig>): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager(config);
    }
    return AccessibilityManager.instance;
  }

  /**
   * Initialize accessibility features
   */
  public initialize(): void {
    this.createAnnouncementRegion();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupMotionPreferences();
    this.setupAriaLiveRegions();
    this.runAccessibilityAudit();
  }

  /**
   * Create announcement region for screen readers
   */
  private createAnnouncementRegion(): void {
    this.announcementRegion = document.createElement('div');
    this.announcementRegion.id = 'accessibility-announcements';
    this.announcementRegion.setAttribute('aria-live', 'polite');
    this.announcementRegion.setAttribute('aria-atomic', 'true');
    this.announcementRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(this.announcementRegion);
  }

  /**
   * Announce message to screen readers
   */
  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.announcementRegion) return;

    this.announcementRegion.setAttribute('aria-live', priority);
    this.announcementRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.announcementRegion) {
        this.announcementRegion.textContent = '';
      }
    }, 1000);

    trackAccessibilityInteraction('screen_reader_announcement', 'screen_reader', message);
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    if (!this.config.keyboardNavigation) return;

    document.addEventListener('keydown', (event) => {
      const { key, altKey, ctrlKey, shiftKey } = event;
      
      // Skip navigation
      if (key === 'Tab' && altKey) {
        event.preventDefault();
        this.focusNextLandmark(shiftKey);
        return;
      }

      // Escape key handling
      if (key === 'Escape') {
        this.handleEscapeKey();
        return;
      }

      // Arrow key navigation for components
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        this.handleArrowKeyNavigation(event);
        return;
      }

      // Skip to content
      if (key === 'Enter' && ctrlKey) {
        event.preventDefault();
        this.skipToMainContent();
        return;
      }

      trackAccessibilityInteraction('keyboard_navigation', 'keyboard', key);
    });
  }

  /**
   * Focus next landmark
   */
  private focusNextLandmark(reverse: boolean = false): void {
    const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"], main, nav, header, footer, aside');
    const landmarkArray = Array.from(landmarks);
    const currentIndex = landmarkArray.findIndex(el => el.contains(document.activeElement));
    
    let nextIndex = reverse ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0) nextIndex = landmarkArray.length - 1;
    if (nextIndex >= landmarkArray.length) nextIndex = 0;
    
    const nextLandmark = landmarkArray[nextIndex] as HTMLElement;
    if (nextLandmark) {
      nextLandmark.focus();
      this.announce(`Navigated to ${this.getLandmarkName(nextLandmark)}`);
    }
  }

  /**
   * Get landmark name for announcement
   */
  private getLandmarkName(element: Element): string {
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    
    if (ariaLabel) return ariaLabel;
    if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy);
      if (labelElement) return labelElement.textContent || '';
    }
    if (role) return role;
    return element.tagName.toLowerCase();
  }

  /**
   * Handle escape key
   */
  private handleEscapeKey(): void {
    const activeElement = document.activeElement as HTMLElement;
    
    // Close modals, dropdowns, etc.
    const closableElements = document.querySelectorAll('[data-closable="true"], .modal, .dropdown, .tooltip');
    closableElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.display !== 'none') {
        htmlEl.style.display = 'none';
        htmlEl.setAttribute('aria-hidden', 'true');
      }
    });

    // Return focus to appropriate element
    if (activeElement && activeElement.hasAttribute('data-return-focus')) {
      const returnFocusId = activeElement.getAttribute('data-return-focus');
      const returnElement = document.getElementById(returnFocusId!);
      if (returnElement) {
        returnElement.focus();
      }
    }
  }

  /**
   * Handle arrow key navigation
   */
  private handleArrowKeyNavigation(event: KeyboardEvent): void {
    const activeElement = document.activeElement as HTMLElement;
    const parent = activeElement.closest('[role="tablist"], [role="menubar"], [role="listbox"], [role="tree"]');
    
    if (!parent) return;

    event.preventDefault();
    
    const focusableElements = parent.querySelectorAll('[tabindex="0"], [tabindex="-1"]');
    const currentIndex = Array.from(focusableElements).indexOf(activeElement);
    
    let nextIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowUp':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        break;
      case 'ArrowRight':
        nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        break;
    }
    
    const nextElement = focusableElements[nextIndex] as HTMLElement;
    if (nextElement) {
      nextElement.focus();
    }
  }

  /**
   * Skip to main content
   */
  private skipToMainContent(): void {
    const mainContent = document.querySelector('main, [role="main"], #main, #content');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      this.announce('Skipped to main content');
    }
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    if (!this.config.focusManagement) return;

    // Track focus changes
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      
      // Add focus outline if not present
      if (!target.style.outline && !target.style.boxShadow) {
        target.style.outline = '2px solid #6366f1';
        target.style.outlineOffset = '2px';
      }
      
      // Scroll element into view if needed
      const rect = target.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    document.addEventListener('focusout', (event) => {
      const target = event.target as HTMLElement;
      
      // Remove programmatic focus outline
      if (target.style.outline && target.style.outline.includes('#6366f1')) {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }
    });
  }

  /**
   * Setup motion preferences
   */
  private setupMotionPreferences(): void {
    if (!this.config.motionPreferences) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (matches: boolean) => {
      document.documentElement.style.setProperty('--motion-duration', matches ? '0s' : '0.3s');
      document.documentElement.style.setProperty('--motion-scale', matches ? '1' : '1.02');
      
      if (matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    handleMotionPreference(prefersReducedMotion.matches);
    prefersReducedMotion.addEventListener('change', (e) => handleMotionPreference(e.matches));
  }

  /**
   * Setup ARIA live regions
   */
  private setupAriaLiveRegions(): void {
    const liveRegions = document.querySelectorAll('[aria-live]');
    
    liveRegions.forEach(region => {
      // Ensure live regions are properly configured
      if (!region.getAttribute('aria-atomic')) {
        region.setAttribute('aria-atomic', 'true');
      }
      
      // Monitor changes to live regions
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const content = (mutation.target as Element).textContent;
            if (content && content.trim()) {
              trackAccessibilityInteraction('live_region_update', 'screen_reader', content);
            }
          }
        });
      });
      
      observer.observe(region, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  }

  /**
   * Run comprehensive accessibility audit
   */
  public runAccessibilityAudit(): AccessibilityIssue[] {
    this.issues = [];
    
    this.auditHeadingStructure();
    this.auditImages();
    this.auditForms();
    this.auditLinks();
    this.auditColorContrast();
    this.auditKeyboardAccess();
    this.auditAriaLabels();
    this.auditLandmarks();
    this.auditFocusManagement();
    
    return this.issues;
  }

  /**
   * Audit heading structure
   */
  private auditHeadingStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level > previousLevel + 1) {
        this.addIssue({
          element: heading,
          type: 'error',
          category: 'structure',
          message: `Heading level ${level} follows heading level ${previousLevel}`,
          recommendation: 'Use heading levels sequentially (h1 → h2 → h3, etc.)',
          wcagLevel: 'A',
          wcagCriterion: '1.3.1'
        });
      }
      
      if (!heading.textContent?.trim()) {
        this.addIssue({
          element: heading,
          type: 'error',
          category: 'content',
          message: 'Empty heading element',
          recommendation: 'Provide descriptive heading text',
          wcagLevel: 'A',
          wcagCriterion: '1.3.1'
        });
      }
      
      previousLevel = level;
    });
  }

  /**
   * Audit images
   */
  private auditImages(): void {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      const src = img.src;
      
      if (alt === null) {
        this.addIssue({
          element: img,
          type: 'error',
          category: 'content',
          message: 'Image missing alt attribute',
          recommendation: 'Add alt attribute describing the image content',
          wcagLevel: 'A',
          wcagCriterion: '1.1.1'
        });
      }
      
      if (alt === '' && !img.hasAttribute('role')) {
        // Empty alt should be used for decorative images
        if (src.includes('icon') || src.includes('decoration')) {
          img.setAttribute('role', 'presentation');
        }
      }
      
      if (alt && alt.length > 125) {
        this.addIssue({
          element: img,
          type: 'warning',
          category: 'content',
          message: 'Alt text is very long (>125 characters)',
          recommendation: 'Consider using a shorter alt text or longdesc attribute',
          wcagLevel: 'AA',
          wcagCriterion: '1.1.1'
        });
      }
    });
  }

  /**
   * Audit forms
   */
  private auditForms(): void {
    const formElements = document.querySelectorAll('input, select, textarea');
    
    formElements.forEach((element) => {
      const hasLabel = element.hasAttribute('aria-label') || 
                      element.hasAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${element.id}"]`);
      
      if (!hasLabel) {
        this.addIssue({
          element: element,
          type: 'error',
          category: 'aria',
          message: 'Form element missing label',
          recommendation: 'Add label element or aria-label attribute',
          wcagLevel: 'A',
          wcagCriterion: '1.3.1'
        });
      }
      
      if (element.hasAttribute('required') && !element.hasAttribute('aria-required')) {
        element.setAttribute('aria-required', 'true');
      }
    });
  }

  /**
   * Audit links
   */
  private auditLinks(): void {
    const links = document.querySelectorAll('a');
    
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const text = link.textContent?.trim();
      
      if (!href || href === '#') {
        this.addIssue({
          element: link,
          type: 'error',
          category: 'keyboard',
          message: 'Link missing href attribute or href="#"',
          recommendation: 'Provide valid href or use button element',
          wcagLevel: 'A',
          wcagCriterion: '2.1.1'
        });
      }
      
      if (!text || text.length < 2) {
        this.addIssue({
          element: link,
          type: 'error',
          category: 'content',
          message: 'Link has no accessible text',
          recommendation: 'Add descriptive link text or aria-label',
          wcagLevel: 'A',
          wcagCriterion: '2.4.4'
        });
      }
      
      if (text && ['click here', 'read more', 'more'].includes(text.toLowerCase())) {
        this.addIssue({
          element: link,
          type: 'warning',
          category: 'content',
          message: 'Link text is not descriptive',
          recommendation: 'Use descriptive link text that makes sense out of context',
          wcagLevel: 'AA',
          wcagCriterion: '2.4.4'
        });
      }
    });
  }

  /**
   * Audit color contrast
   */
  private auditColorContrast(): void {
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button');
    
    textElements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element);
      const color = computedStyle.color;
      const backgroundColor = computedStyle.backgroundColor;
      
      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const contrast = this.calculateColorContrast(color, backgroundColor);
        
        if (contrast.ratio < 4.5) {
          this.addIssue({
            element: element,
            type: 'error',
            category: 'color',
            message: `Color contrast ratio is ${contrast.ratio.toFixed(2)}:1`,
            recommendation: 'Increase color contrast to at least 4.5:1 for normal text',
            wcagLevel: 'AA',
            wcagCriterion: '1.4.3'
          });
        }
      }
    });
  }

  /**
   * Calculate color contrast ratio
   */
  private calculateColorContrast(color1: string, color2: string): ColorContrastResult {
    const rgb1 = this.parseColor(color1);
    const rgb2 = this.parseColor(color2);
    
    const luminance1 = this.calculateLuminance(rgb1);
    const luminance2 = this.calculateLuminance(rgb2);
    
    const lightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    
    const ratio = (lightest + 0.05) / (darkest + 0.05);
    
    return {
      foreground: color1,
      background: color2,
      ratio: ratio,
      aaSmall: ratio >= 4.5,
      aaLarge: ratio >= 3.0,
      aaaSmall: ratio >= 7.0,
      aaaLarge: ratio >= 4.5
    };
  }

  /**
   * Parse color string to RGB
   */
  private parseColor(color: string): { r: number; g: number; b: number } {
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const rgbColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    const match = rgbColor.match(/\d+/g);
    if (match) {
      return {
        r: parseInt(match[0]),
        g: parseInt(match[1]),
        b: parseInt(match[2])
      };
    }
    
    return { r: 0, g: 0, b: 0 };
  }

  /**
   * Calculate luminance
   */
  private calculateLuminance(rgb: { r: number; g: number; b: number }): number {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;
    
    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Audit keyboard accessibility
   */
  private auditKeyboardAccess(): void {
    const interactiveElements = document.querySelectorAll('button, input, select, textarea, a[href], [tabindex]');
    
    interactiveElements.forEach((element) => {
      const tabIndex = element.getAttribute('tabindex');
      
      if (tabIndex && parseInt(tabIndex) > 0) {
        this.addIssue({
          element: element,
          type: 'warning',
          category: 'keyboard',
          message: 'Positive tabindex value',
          recommendation: 'Use tabindex="0" or remove tabindex to maintain natural tab order',
          wcagLevel: 'A',
          wcagCriterion: '2.1.1'
        });
      }
      
      // Check if element is visually hidden but still focusable
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
        if (tabIndex !== '-1') {
          this.addIssue({
            element: element,
            type: 'error',
            category: 'keyboard',
            message: 'Hidden element is still focusable',
            recommendation: 'Add tabindex="-1" to hidden interactive elements',
            wcagLevel: 'A',
            wcagCriterion: '2.1.1'
          });
        }
      }
    });
  }

  /**
   * Audit ARIA labels
   */
  private auditAriaLabels(): void {
    const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
    
    elementsWithAria.forEach((element) => {
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const ariaDescribedBy = element.getAttribute('aria-describedby');
      
      if (ariaLabelledBy) {
        const labelElement = document.getElementById(ariaLabelledBy);
        if (!labelElement) {
          this.addIssue({
            element: element,
            type: 'error',
            category: 'aria',
            message: `aria-labelledby references non-existent element: ${ariaLabelledBy}`,
            recommendation: 'Ensure referenced element exists',
            wcagLevel: 'A',
            wcagCriterion: '1.3.1'
          });
        }
      }
      
      if (ariaDescribedBy) {
        const descElement = document.getElementById(ariaDescribedBy);
        if (!descElement) {
          this.addIssue({
            element: element,
            type: 'error',
            category: 'aria',
            message: `aria-describedby references non-existent element: ${ariaDescribedBy}`,
            recommendation: 'Ensure referenced element exists',
            wcagLevel: 'A',
            wcagCriterion: '1.3.1'
          });
        }
      }
      
      if (ariaLabel && ariaLabel.trim().length === 0) {
        this.addIssue({
          element: element,
          type: 'error',
          category: 'aria',
          message: 'Empty aria-label attribute',
          recommendation: 'Provide meaningful aria-label text or remove attribute',
          wcagLevel: 'A',
          wcagCriterion: '1.3.1'
        });
      }
    });
  }

  /**
   * Audit landmarks
   */
  private auditLandmarks(): void {
    const main = document.querySelectorAll('main, [role="main"]');
    if (main.length === 0) {
      this.addIssue({
        element: document.body,
        type: 'error',
        category: 'structure',
        message: 'Page missing main landmark',
        recommendation: 'Add main element or role="main"',
        wcagLevel: 'A',
        wcagCriterion: '1.3.1'
      });
    }
    
    if (main.length > 1) {
      main.forEach((element, index) => {
        if (index > 0) {
          this.addIssue({
            element: element,
            type: 'error',
            category: 'structure',
            message: 'Multiple main landmarks',
            recommendation: 'Use only one main landmark per page',
            wcagLevel: 'A',
            wcagCriterion: '1.3.1'
          });
        }
      });
    }
  }

  /**
   * Audit focus management
   */
  private auditFocusManagement(): void {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element);
      const outlineStyle = computedStyle.outline;
      const outlineWidth = computedStyle.outlineWidth;
      
      if (outlineStyle === 'none' || outlineWidth === '0px') {
        // Check if element has alternative focus indicator
        const hasAlternativeFocus = computedStyle.boxShadow !== 'none' ||
                                  computedStyle.border !== 'none' ||
                                  computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)'
        
        if (!hasAlternativeFocus) {
          this.addIssue({
            element: element,
            type: 'warning',
            category: 'keyboard',
            message: 'Element has no visible focus indicator',
            recommendation: 'Add visible focus indicator (outline, box-shadow, or border)',
            wcagLevel: 'AA',
            wcagCriterion: '2.4.7'
          });
        }
      }
    });
  }

  /**
   * Add issue to audit results
   */
  private addIssue(issue: AccessibilityIssue): void {
    this.issues.push(issue);
    
    // Log to console in development
    if (import.meta.env?.DEV) {
      console.warn(`[A11Y ${issue.wcagLevel}] ${issue.message}`, issue.element)
    }
    
    trackError('accessibility_issue', issue.message, `${issue.category} - ${issue.wcagLevel}`);
  }

  /**
   * Get audit results
   */
  public getAuditResults(): AccessibilityIssue[] {
    return this.issues;
  }

  /**
   * Get audit summary
   */
  public getAuditSummary(): {
    total: number;
    errors: number;
    warnings: number;
    byCategory: Record<string, number>;
    byWcagLevel: Record<string, number>;
  } {
    const summary = {
      total: this.issues.length,
      errors: this.issues.filter(i => i.type === 'error').length,
      warnings: this.issues.filter(i => i.type === 'warning').length,
      byCategory: {} as Record<string, number>,
      byWcagLevel: {} as Record<string, number>
    };
    
    this.issues.forEach(issue => {
      summary.byCategory[issue.category] = (summary.byCategory[issue.category] || 0) + 1;
      summary.byWcagLevel[issue.wcagLevel] = (summary.byWcagLevel[issue.wcagLevel] || 0) + 1;
    });
    
    return summary;
  }

  /**
   * Generate accessibility report
   */
  public generateReport(): string {
    const summary = this.getAuditSummary();
    const report = [
      '# Accessibility Audit Report',
      '',
      `## Summary`,
      `- Total Issues: ${summary.total}`,
      `- Errors: ${summary.errors}`,
      `- Warnings: ${summary.warnings}`,
      '',
      '## Issues by Category',
      ...Object.entries(summary.byCategory).map(([category, count]) => 
        `- ${category}: ${count}`
      ),
      '',
      '## Issues by WCAG Level',
      ...Object.entries(summary.byWcagLevel).map(([level, count]) => 
        `- ${level}: ${count}`
      ),
      '',
      '## Detailed Issues',
      ...this.issues.map(issue => [
        `### ${issue.type.toUpperCase()}: ${issue.message}`,
        `- **Category**: ${issue.category}`,
        `- **WCAG Level**: ${issue.wcagLevel}`,
        `- **Criterion**: ${issue.wcagCriterion}`,
        `- **Recommendation**: ${issue.recommendation}`,
        `- **Element**: ${issue.element.tagName.toLowerCase()}${issue.element.id ? `#${issue.element.id}` : ''}`,
        ''
      ]).flat()
    ];
    
    return report.join('\n');
  }

  /**
   * Cleanup resources
   */
  public dispose(): void {
    if (this.announcementRegion) {
      this.announcementRegion.remove();
    }
    this.issues = [];
  }
}

// Export singleton instance
export const accessibilityManager = AccessibilityManager.getInstance();

// Auto-initialize accessibility features
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager.initialize();
  });
}

// Export utility functions
export const announce = (message: string, priority?: 'polite' | 'assertive') => {
  accessibilityManager.announce(message, priority);
};

export const runAccessibilityAudit = () => {
  return accessibilityManager.runAccessibilityAudit();
};

export const getAuditResults = () => {
  return accessibilityManager.getAuditResults();
};

export const getAuditSummary = () => {
  return accessibilityManager.getAuditSummary();
};

export const generateAccessibilityReport = () => {
  return accessibilityManager.generateReport();
};