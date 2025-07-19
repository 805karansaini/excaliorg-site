import { useEffect } from 'react';
import { trackScrollDepth, trackSectionView } from '../utils/analytics';

export const useScrollTracking = () => {
  useEffect(() => {
    let hasTracked50 = false;
    let hasTracked90 = false;
    let scrollTicking = false;
    
    // Batch section view tracking to reduce calls
    const pendingSectionViews = new Set<string>();
    let sectionViewTimeout: number;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            // Batch section views to reduce analytics calls
            pendingSectionViews.add(entry.target.id);
            
            clearTimeout(sectionViewTimeout);
            sectionViewTimeout = setTimeout(() => {
              // Send batched section views
              pendingSectionViews.forEach(sectionId => {
                trackSectionView(sectionId);
              });
              pendingSectionViews.clear();
            }, 1000); // Batch for 1 second
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

    // Optimized scroll handler with throttling and reduced milestones
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          );

          // Reduced to only 2 milestones for better performance
          if (scrollPercent >= 50 && !hasTracked50) {
            hasTracked50 = true;
            trackScrollDepth(50);
          }
          if (scrollPercent >= 90 && !hasTracked90) {
            hasTracked90 = true;
            trackScrollDepth(90);
          }
          
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
      clearTimeout(sectionViewTimeout);
    };
  }, []);
};