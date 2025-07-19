import React, { useState } from 'react'
import { trackEvent } from '../utils/analytics'

interface TocItem {
    id: string
    title: string
}

const tocItems: TocItem[] = [
    { id: 'hero', title: 'Home' },
    { id: 'problem-solution', title: 'Solution' },
    { id: 'features', title: 'Features' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'use-cases', title: 'Use Cases' },
    { id: 'faq', title: 'FAQ' },
]

export const TableOfContents: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
        trackEvent('toc_toggle', 'engagement', isOpen ? 'close' : 'open')
    }

    const handleNavClick = (item: TocItem) => {
        const element = document.getElementById(item.id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsOpen(false)
            trackEvent('toc_navigation', 'engagement', item.title)
        }
    }

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 group mobile-tap-feedback backdrop-blur-md"
                style={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                aria-label="Table of Contents"
            >
                <svg
                    className={`w-4 h-4 transform transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h8" />
                </svg>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Table of Contents Panel */}
            <div
                className={`absolute top-full right-0 mt-3 w-60 sm:w-72 max-w-[calc(100vw-2rem)] rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
                    }`}
                style={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                }}
            >
                <div className="p-4">
                    <h3 className="text-heading-3 mb-4">Quick Navigation</h3>
                    <nav className="space-y-2">
                        {tocItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item)}
                                className="w-full text-left px-3 py-2 rounded-md hover:bg-surface-100 transition-colors duration-200"
                            >
                                <span className="text-body">{item.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
