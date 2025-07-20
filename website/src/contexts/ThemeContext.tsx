import { useEffect, useState, useMemo, useCallback, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme'

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first, then system preference, fallback to light
        const stored = localStorage.getItem('excali-organizer-theme') as Theme
        if (stored && (stored === 'light' || stored === 'dark')) {
            return stored
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }

        return 'light'
    })

    useEffect(() => {
        // Apply theme to document element with performance optimization
        const root = document.documentElement
        
        // Use requestAnimationFrame for smoother DOM updates on mobile
        requestAnimationFrame(() => {
            root.classList.remove('light', 'dark')
            root.classList.add(theme)
        })

        // Store theme preference
        localStorage.setItem('excali-organizer-theme', theme)
    }, [theme])

    useEffect(() => {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            // Only auto-switch if no manual preference is stored
            const stored = localStorage.getItem('excali-organizer-theme')
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }, [])

    const value = useMemo(() => ({
        theme,
        setTheme,
        toggleTheme,
    }), [theme, toggleTheme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
