// Advanced animation utilities for Phase 3 enhancements
import { trackFeatureUsage } from './analytics';

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  loop?: boolean;
  alternate?: boolean;
}

export interface RippleConfig {
  size: number;
  color: string;
  duration: number;
  opacity: number;
}

export class AnimationManager {
  private static instance: AnimationManager;
  private observers: Map<string, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();

  private constructor() {}

  public static getInstance(): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  /**
   * Initialize scroll-triggered animations
   */
  public initializeScrollAnimations(): void {
    // Create intersection observer for fade-in animations
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animateElement(entry.target, 'fade-in');
            this.animatedElements.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Create intersection observer for staggered animations
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animateStaggeredChildren(entry.target);
            this.animatedElements.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '30px'
      }
    );

    // Observe elements with animation classes
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    fadeElements.forEach((el) => fadeObserver.observe(el));

    const staggerElements = document.querySelectorAll('.animate-stagger-container');
    staggerElements.forEach((el) => staggerObserver.observe(el));

    this.observers.set('fade', fadeObserver);
    this.observers.set('stagger', staggerObserver);
  }

  /**
   * Animate element with specified animation
   */
  private animateElement(element: Element, animationType: string): void {
    switch (animationType) {
      case 'fade-in':
        element.classList.add('animate-fade-in-up');
        break;
      case 'stagger':
        element.classList.add('animate-stagger-reveal');
        break;
      default:
        element.classList.add('animate-fade-in-up');
    }

    trackFeatureUsage('animation', animationType, element.tagName.toLowerCase());
  }

  /**
   * Animate staggered children
   */
  private animateStaggeredChildren(container: Element): void {
    const children = container.querySelectorAll('.animate-stagger-item');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate-stagger-reveal');
        child.classList.add(`animate-stagger-${Math.min(index + 1, 6)}`);
      }, index * 100);
    });
  }

  /**
   * Create ripple effect - Optimized for performance
   */
  public createRipple(
    element: HTMLElement,
    event: MouseEvent | TouchEvent,
    config: Partial<RippleConfig> = {}
  ): void {
    const defaultConfig: RippleConfig = {
      size: 100,
      color: '#6366f1',
      duration: 600,
      opacity: 0.3
    };

    const rippleConfig = { ...defaultConfig, ...config };

    // Use requestAnimationFrame to batch DOM reads and writes
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();

      let x: number, y: number;
      if (event instanceof MouseEvent) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      } else {
        const touch = event.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      }

      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      
      // Use hardware acceleration and will-change for better performance
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${rippleConfig.color};
        opacity: ${rippleConfig.opacity};
        transform: scale(0) translate3d(0, 0, 0);
        animation: ripple-effect ${rippleConfig.duration}ms ease-out;
        width: ${rippleConfig.size}px;
        height: ${rippleConfig.size}px;
        left: ${x - rippleConfig.size / 2}px;
        top: ${y - rippleConfig.size / 2}px;
        pointer-events: none;
        z-index: 1000;
        will-change: transform, opacity;
      `;

      element.appendChild(ripple);

      // Use setTimeout with cleanup check for better performance
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, rippleConfig.duration);
    });

    trackFeatureUsage('interaction', 'ripple_effect', element.tagName.toLowerCase());
  }

  /**
   * Add magnetic effect to buttons - Optimized to prevent forced reflows
   */
  public addMagneticEffect(element: HTMLElement, strength: number = 0.3): void {
    let rect: DOMRect;
    let rafId: number;
    let isMouseInside = false;

    // Cache rect on mouse enter and resize
    const updateRect = () => {
      rect = element.getBoundingClientRect();
    };

    const handleMouseEnter = () => {
      isMouseInside = true;
      updateRect(); // Cache rect only when needed
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseInside || !rect) return;

      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame to batch DOM writes
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * strength;
        const moveY = y * strength;

        // Use transform for hardware acceleration
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      // Reset transform with hardware acceleration
      element.style.transform = 'translate3d(0, 0, 0)';
    };

    // Update rect on window resize to handle responsive layouts
    const handleResize = () => {
      if (isMouseInside) {
        updateRect();
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Store handlers for cleanup
    (element as any)._magneticHandlers = {
      mouseenter: handleMouseEnter,
      mousemove: handleMouseMove,
      mouseleave: handleMouseLeave,
      resize: handleResize
    };
  }

  /**
   * Remove magnetic effect
   */
  public removeMagneticEffect(element: HTMLElement): void {
    const handlers = (element as any)._magneticHandlers;
    if (handlers) {
      element.removeEventListener('mousemove', handlers.mousemove);
      element.removeEventListener('mouseleave', handlers.mouseleave);
      delete (element as any)._magneticHandlers;
    }
  }

  /**
   * Initialize typewriter effect
   */
  public initializeTypewriter(element: HTMLElement, text: string, speed: number = 100): void {
    let index = 0;
    const originalText = text;
    element.textContent = '';

    const typeChar = () => {
      if (index < originalText.length) {
        element.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      } else {
        // Remove cursor after completion
        element.classList.remove('typewriter-text');
        trackFeatureUsage('animation', 'typewriter_complete', element.tagName.toLowerCase());
      }
    };

    element.classList.add('typewriter-text');
    typeChar();
  }

  /**
   * Create floating particles
   */
  public createParticles(container: HTMLElement, count: number = 20): void {
    const particles: HTMLElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${4 + Math.random() * 2}s;
      `;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Clean up particles after animation
    setTimeout(() => {
      particles.forEach(particle => particle.remove());
    }, 8000);
  }

  /**
   * Add scroll-triggered counter animation
   */
  public animateCounter(
    element: HTMLElement,
    endValue: number,
    duration: number = 2000,
    startValue: number = 0
  ): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.runCounter(element, startValue, endValue, duration);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
  }

  private runCounter(
    element: HTMLElement,
    startValue: number,
    endValue: number,
    duration: number
  ): void {
    const startTime = Date.now();
    const difference = endValue - startValue;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + difference * easeOutQuart);

      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        trackFeatureUsage('animation', 'counter_complete', element.tagName.toLowerCase());
      }
    };

    requestAnimationFrame(updateCounter);
  }

  /**
   * Add smooth scroll with custom easing - Optimized for performance
   */
  public smoothScrollTo(
    target: Element | string,
    duration: number = 1000,
    offset: number = 0
  ): void {
    const targetElement = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!targetElement) return;

    // Batch DOM reads at the beginning to prevent forced reflows
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetPosition - startPosition;
    const startTime = Date.now();

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentPosition = startPosition + distance * easeInOutCubic;
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        trackFeatureUsage('navigation', 'smooth_scroll', 'custom');
      }
    };

    requestAnimationFrame(animateScroll);
  }

  /**
   * Add parallax effect
   */
  public addParallaxEffect(elements: NodeListOf<Element> | Element[]): void {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0.5');
        const yPos = -(scrollTop * speed);

        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
  }

  /**
   * Create loading skeleton
   */
  public createSkeleton(container: HTMLElement, config: {
    lines: number;
    width?: string[];
    height?: string;
  }): void {
    const { lines, width = ['100%'], height = '1rem' } = config;

    for (let i = 0; i < lines; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-loader';
      skeleton.style.cssText = `
        width: ${width[i] || width[0]};
        height: ${height};
        margin-bottom: 0.5rem;
        border-radius: 0.25rem;
      `;
      container.appendChild(skeleton);
    }
  }

  /**
   * Remove skeleton and show content
   */
  public removeSkeleton(container: HTMLElement, showContent: () => void): void {
    const skeletons = container.querySelectorAll('.skeleton-loader');
    skeletons.forEach(skeleton => skeleton.remove());
    showContent();
  }

  /**
   * Cleanup all observers and effects
   */
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// Initialize animation manager
export const animationManager = AnimationManager.getInstance();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      animationManager.initializeScrollAnimations();
    });
  } else {
    animationManager.initializeScrollAnimations();
  }
}

// Export utility functions
export const createRipple = (element: HTMLElement, event: MouseEvent | TouchEvent, config?: Partial<RippleConfig>) => {
  animationManager.createRipple(element, event, config);
};

export const addMagneticEffect = (element: HTMLElement, strength?: number) => {
  animationManager.addMagneticEffect(element, strength);
};

export const smoothScrollTo = (target: Element | string, duration?: number, offset?: number) => {
  animationManager.smoothScrollTo(target, duration, offset);
};

export const animateCounter = (element: HTMLElement, endValue: number, duration?: number, startValue?: number) => {
  animationManager.animateCounter(element, endValue, duration, startValue);
};

export const initializeTypewriter = (element: HTMLElement, text: string, speed?: number) => {
  animationManager.initializeTypewriter(element, text, speed);
};

export const createParticles = (container: HTMLElement, count?: number) => {
  animationManager.createParticles(container, count);
};

export const addParallaxEffect = (elements: NodeListOf<Element> | Element[]) => {
  animationManager.addParallaxEffect(elements);
};

export const createSkeleton = (container: HTMLElement, config: {
  lines: number;
  width?: string[];
  height?: string;
}) => {
  animationManager.createSkeleton(container, config);
};

export const removeSkeleton = (container: HTMLElement, showContent: () => void) => {
  animationManager.removeSkeleton(container, showContent);
};
