import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, Download, ArrowRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { trackCTAClick, trackStoreRedirect, trackThemeToggle } from '../utils/analytics'
import { openChromeWebStore } from '../utils/links'

interface HeaderBarProps {
  className?: string
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
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

  // Handle scrolling to hash when arriving at home page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        // Add a small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.pathname, location.hash])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Solution', href: '#problem-solution' },
    { name: 'Features', href: '#features' },
    { name: 'Getting Started', href: '#getting-started' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'FAQ', href: '#faq' }
  ]

  const handleCTAClick = () => {
    trackCTAClick('Add to Browser', 'header_bar')
    trackStoreRedirect('header_bar')
    // Open Chrome Web Store in new tab
    openChromeWebStore()
  }

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleThemeToggle = () => {
    toggleTheme()
    trackThemeToggle(theme === 'light' ? 'dark' : 'light')
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)

    if (location.pathname !== '/') {
      // If not on home page, navigate to home page with hash
      navigate(`/${href}`)
    } else {
      // If already on home page, just scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header
        className={`
          fixed w-full top-0 z-50
          glass-header
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div
              className="
                flex items-center gap-3
                group cursor-pointer
              "
              onClick={handleLogoClick}
            >
              <div className="relative">
                <picture>
                  <source srcSet="/icon-64-avif.avif" type="image/avif" />
                  <source srcSet="/icon-64-webp.webp" type="image/webp" />
                  <source srcSet="/icon-64-png.png" type="image/png" />
                  <img
                    src="/icon-64-png.png"
                    alt="Excali Organizer"
                    className="w-8 h-8"
                  />
                </picture>
                {/* Removed glow effect for performance */}
              </div>
              <span className="
                text-xl font-bold
                gradient-text-static
              ">
                Excali Organizer
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="animated-link font-medium"
                >
                  {item.name}
                  <span></span>
                </button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className={`relative p-2 rounded-full group header-btn
                  ${theme === 'light'
                    ? 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                    : 'bg-gray-800 border border-gray-600 hover:bg-gray-700'
                  }`}
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`} />
                  <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </button>

              {/* Add to Browser Button - Only visible on large screens */}
              {isDesktop && (
                <button
                  onClick={handleCTAClick}
                  className="flex items-center btn-primary group px-4 py-2 text-sm"
                  style={{ transformOrigin: 'center center' }}
                >
                  <Download className="w-3 h-3 mr-1" />
                  <span className="relative z-10">Add to Browser</span>
                  <ArrowRight className="w-3 h-3 ml-1 icon" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 rounded-full group header-btn
                  ${theme === 'light'
                    ? 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                    : 'bg-gray-800 border border-gray-600 hover:bg-gray-700'
                  }`}
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

      {/* Mobile Menu - With smooth animations */}
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
