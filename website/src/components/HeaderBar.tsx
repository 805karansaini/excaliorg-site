import React, { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, Download, ArrowRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { trackCTAClick, trackStoreRedirect, trackThemeToggle } from '../utils/analytics'

interface HeaderBarProps {
  className?: string
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#workflow' },
    { name: 'Get Started', href: '#installation' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'FAQ', href: '#faq' }
  ]

  const handleCTAClick = () => {
    trackCTAClick('Add to Browser', 'header_bar')
    trackStoreRedirect('header_bar')
    // Open download page in new tab
    window.open('https://dev.excali.org', '_blank', 'noopener,noreferrer')
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleThemeToggle = () => {
    toggleTheme()
    trackThemeToggle(theme === 'light' ? 'dark' : 'light')
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 glass-header transition-all duration-300 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={handleLogoClick}>
              <div className="relative">
                <picture>
                  <source srcSet="/icon-64-avif.avif" type="image/avif" />
                  <source srcSet="/icon-64-webp.webp" type="image/webp" />
                  <source srcSet="/icon-64-png.png" type="image/png" />
                  <img src="/icon-64-png.png" alt="Excali Organizer" className="w-8 h-8" />
                </picture>
                <div className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <span className="text-xl font-bold gradient-text-static transition-all duration-300">
                Excali Org
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="relative p-2 rounded-full transition-all duration-300 group"
                style={{
                  backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
                  border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#e5e7eb' : '#374151'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#1f2937'
                }}
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
                  <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
                </div>
              </button>

              {/* Add to Browser Button - Only visible on large screens */}
              {isDesktop && (
                <button
                  onClick={handleCTAClick}
                  className="flex items-center btn-primary group px-4 py-2 text-sm"
                  style={{ transformOrigin: 'center center' }}
                >
                  <Download className="w-3 h-3 mr-1 group-hover:animate-bounce" />
                  <span className="relative z-10">Add to Browser</span>
                  <ArrowRight className="w-3 h-3 ml-1 icon transition-transform duration-300" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full transition-all duration-300 group"
                style={{
                  backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
                  border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#e5e7eb' : '#374151'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#f3f4f6' : '#1f2937'
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Menu - Positioned absolutely to avoid header container constraints */}
      <div className={`lg:hidden fixed top-18 left-0 right-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
        <div className={`mx-4 mt-2 rounded-lg shadow-xl border ${theme === 'light'
            ? 'bg-white border-gray-200'
            : 'bg-gray-800 border-gray-700'
          }`}>
          <div className="py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${theme === 'light'
                    ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    : 'text-gray-300 hover:text-indigo-400 hover:bg-gray-700'
                  }`}
              >
                {item.name}
              </button>
            ))}
            <div className={`pt-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'
              }`}>
              <button
                onClick={handleCTAClick}
                className="w-full btn-primary group py-3 text-sm"
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                <span>Add to Browser</span>
                <ArrowRight className="w-4 h-4 ml-2 icon transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
