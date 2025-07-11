import { useEffect } from 'react';
import { trackScrollDepth, trackSectionView } from '../utils/analytics';

export const useScrollTracking = () => {
  useEffect(() => {
    let hasTracked25 = false;
    let hasTracked50 = false;
    let hasTracked75 = false;
    let hasTracked90 = false;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Track sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll depth milestones
      if (scrollPercent >= 25 && !hasTracked25) {
        hasTracked25 = true;
        trackScrollDepth(25);
      }
      if (scrollPercent >= 50 && !hasTracked50) {
        hasTracked50 = true;
        trackScrollDepth(50);
      }
      if (scrollPercent >= 75 && !hasTracked75) {
        hasTracked75 = true;
        trackScrollDepth(75);
      }
      if (scrollPercent >= 90 && !hasTracked90) {
        hasTracked90 = true;
        trackScrollDepth(90);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
    };
  }, []);
};