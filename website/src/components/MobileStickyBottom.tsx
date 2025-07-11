import { trackCTAClick, trackStoreRedirect } from '../utils/analytics';

interface MobileStickyBottomProps {
  isVisible: boolean;
}

export const MobileStickyBottom: React.FC<MobileStickyBottomProps> = ({ isVisible }) => {
  const handleInstallClick = () => {
    trackCTAClick('Add to Chrome - Free', 'mobile_sticky_bottom');
    trackStoreRedirect('mobile_sticky_bottom');
    // TODO: Add actual Chrome Web Store redirect logic
    console.log('Redirecting to Chrome Web Store...');
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transform transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ 
        backgroundColor: 'var(--color-background)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <div className="px-4 py-3">
        <button
          onClick={handleInstallClick}
          className="btn-primary w-full py-4 rounded-lg text-base font-medium flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-200"
        >
          <span>Add to Chrome - Free</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};