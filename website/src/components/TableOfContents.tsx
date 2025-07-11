import { useState } from 'react';
import { trackEvent } from '../utils/analytics';

interface TocItem {
  id: string;
  title: string;
  icon: string;
}

const tocItems: TocItem[] = [
  { id: 'hero', title: 'Home', icon: '🏠' },
  { id: 'features', title: 'Features', icon: '✨' },
  { id: 'workflow', title: 'How It Works', icon: '🔄' },
  { id: 'installation', title: 'Get Started', icon: '🚀' },
  { id: 'use-cases', title: 'Use Cases', icon: '💼' },
  { id: 'faq', title: 'FAQ', icon: '❓' },
];

export const TableOfContents: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    trackEvent('toc_toggle', 'engagement', isOpen ? 'close' : 'open');
  };

  const handleNavClick = (item: TocItem) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      trackEvent('toc_navigation', 'engagement', item.title);
    }
  };

  return (
    <div className="fixed top-20 right-6 z-40">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-200"
        style={{ backgroundColor: 'var(--color-primary)' }}
        aria-label="Table of Contents"
      >
        <svg 
          className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Table of Contents Panel */}
      <div 
        className={`absolute top-16 right-0 w-64 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div className="p-4">
          <h3 className="text-heading-3 mb-4">Quick Navigation</h3>
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-surface-100 transition-colors duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-body">{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};