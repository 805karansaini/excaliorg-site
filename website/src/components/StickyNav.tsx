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

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{ 
        backgroundColor: 'var(--color-background)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🗂️</div>
            <span className="text-heading-3" style={{ color: 'var(--color-primary)' }}>
              Excali Organizer
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleInstallClick}
            className="btn-primary px-6 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
          >
            <span>Add to Chrome - Free</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};