import React from 'react';
import { trackCTAClick, trackStoreRedirect } from '../utils/analytics';

interface StickyNavProps {
  isVisible: boolean;
}

export const StickyNav: React.FC<StickyNavProps> = ({ isVisible }) => {
  const handleInstallClick = () => {
    trackCTAClick('Add to Chrome - Free', 'sticky_nav');
    trackStoreRedirect('sticky_nav');
    // TODO: Add actual Chrome Web Store redirect logic
    console.log('Redirecting to Chrome Web Store...');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop for better visibility */}
      <div 
        className={`fixed top-0 left-0 right-0 h-16 z-40 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: 'var(--color-background)/80',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />
      
      {/* Main sticky nav */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ 
          backgroundColor: 'var(--color-background)/95',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
        role="navigation"
        aria-label="Sticky navigation"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 group cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Scroll to top"
            >
              <div className="text-2xl transition-transform duration-200 group-hover:scale-110">
                🗂️
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-semibold tracking-tight" style={{ color: 'var(--color-primary)' }}>
                  Excali Organizer
                </span>
                <div className="text-xs opacity-75" style={{ color: 'var(--color-text-muted)' }}>
                  Professional Workspace
                </div>
              </div>
              <div className="sm:hidden">
                <span className="text-base font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Excali
                </span>
              </div>
            </button>

            {/* Enhanced CTA Button */}
            <button
              onClick={handleInstallClick}
              className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium flex items-center space-x-2 mobile-tap-feedback group relative overflow-hidden"
              aria-label="Install Excali Organizer Chrome extension"
            >
              <span className="relative z-10">Add to Chrome</span>
              <span className="hidden sm:inline relative z-10">- Free</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 cta-arrow relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              
              {/* Enhanced shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};