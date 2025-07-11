import { useState, useEffect } from 'react';

export const useMobileStickyBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show mobile sticky bottom after 300px scroll but hide when near bottom
      const showThreshold = 300;
      const hideThreshold = documentHeight - windowHeight - 200;
      
      if (currentScrollY > showThreshold && currentScrollY < hideThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isVisible };
};