import { useTheme } from '../hooks/useTheme'
import { trackThemeToggle } from '../utils/analytics'

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    const handleToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        toggleTheme()
        trackThemeToggle(newTheme)
    }

    return (
        <button
            onClick={handleToggle}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group mobile-tap-feedback backdrop-blur-md"
            style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div className="relative w-4 h-4 overflow-hidden">
                {/* Sun Icon - Clean & Modern */}
                <svg
                    className={`absolute inset-0 w-4 h-4 text-amber-500 transition-all duration-500 transform ${theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                        }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42" strokeWidth={1.5} stroke="currentColor" />
                </svg>

                {/* Moon Icon - Clean & Modern */}
                <svg
                    className={`absolute inset-0 w-4 h-4 text-slate-600 dark:text-slate-200 transition-all duration-500 transform ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-0'
                        }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>

            {/* Subtle hover effect */}
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    )
}
