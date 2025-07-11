import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="relative p-3 rounded-full bg-surface border border-border hover:bg-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div className="relative w-6 h-6 overflow-hidden">
                {/* Sun Icon */}
                <svg
                    className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-500 transform ${theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="5" strokeWidth={2} />
                    <path strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>

                {/* Moon Icon */}
                <svg
                    className={`absolute inset-0 w-6 h-6 text-slate-700 dark:text-slate-300 transition-all duration-500 transform ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-0'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeWidth={2} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>

            {/* Hover effect ring */}
            <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
    )
}
