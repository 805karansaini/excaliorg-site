import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (!isVisible) {
        return null
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group mobile-tap-feedback z-50 shadow-lg hover:shadow-xl
                ${theme === 'light'
                    ? 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                    : 'bg-gray-800 border border-gray-600 hover:bg-gray-700'
                }`}
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>

            {/* Subtle hover effect */}
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    )
}
