import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Essential Colors (using CSS variables instead)
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
      },

      // Typography System
      fontSize: {
        'heading-1': ['4.5rem', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.02em'
        }],
        'heading-2': ['3rem', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.01em'
        }],
        'heading-3': ['1.5rem', { 
          lineHeight: '1.3'
        }],
        'body-large': ['1.25rem', { 
          lineHeight: '1.6'
        }],
        'body': ['1rem', { 
          lineHeight: '1.6'
        }],
        'body-small': ['0.875rem', { 
          lineHeight: '1.5'
        }],
      },
      
      // Font weights for our typography
      fontWeight: {
        'heading-1': '700',
        'heading-2': '600', 
        'heading-3': '600',
      },

      // Enhanced Spacing System
      spacing: {
        '18': '4.5rem', // 72px - header height
        '88': '22rem',  // 352px - large sections
        '100': '25rem', // 400px - extra large
        '112': '28rem', // 448px - hero sections
        '128': '32rem', // 512px - mega sections
      },

      // Animation System
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
      },

      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseSubtle: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.02)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        gradientShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },

      // Custom Height Classes
      height: {
        '18': '4.5rem', // 72px - header height
      },

      // Essential animation delays
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}

export default config