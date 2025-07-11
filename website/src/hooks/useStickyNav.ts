import { useState, useEffect, useCallback } from 'react';

export const useStickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const showThreshold = 120; // When to first show the sticky nav
    const hideThreshold = 50;  // Only hide if very close to top
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
    // Only process if scroll difference is significant (reduces flickering)
    if (scrollDifference < 3) return;
    
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    setScrollDirection(direction);
    
    // Persistent sticky nav logic:
    // 1. Show once user scrolls past showThreshold
    // 2. Stay visible regardless of scroll direction
    // 3. Only hide if user scrolls back near the very top
    
    if (currentScrollY > showThreshold) {
      // User has scrolled past threshold - show and remember
      if (!hasTriggered) {
        setHasTriggered(true);
      }
      setIsVisible(true);
    } else if (currentScrollY < hideThreshold) {
      // User is very close to top - hide and reset
      setIsVisible(false);
      setHasTriggered(false);
    }
    // Note: No else clause - this means once triggered and visible,
    // it stays visible until user goes back to the very top
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, hasTriggered]);

  useEffect(() => {
    let ticking = false;
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => window.removeEventListener('scroll', requestTick);
  }, [handleScroll]);

  return { isVisible, scrollDirection, hasTriggered };
};