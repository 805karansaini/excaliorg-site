import { trackCTAClick, trackStoreRedirect } from '../../utils/analytics'

interface WorkflowSectionProps {
  onCTAClick?: (buttonText: string, location: string) => void
}

export const WorkflowSection = ({ onCTAClick }: WorkflowSectionProps) => {
  const handleCTAClick = (buttonText: string, location: string) => {
    trackCTAClick(buttonText, location)
    trackStoreRedirect(location)
    if (onCTAClick) {
      onCTAClick(buttonText, location)
    } else {
      // Default behavior - open download page in new tab
      window.open('https://excali.org', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="getting-started" className="section relative overflow-hidden" style={{ backgroundColor: 'var(--color-workflow)' }}>
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-heading-1 mb-6 animate-fade-in-up">
            Get Started in{' '}
            <span className="gradient-text-static">3 Simple Steps</span>
          </h2>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            No account required - works immediately after installation
          </p>
        </div>

        {/* Installation and Usage Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1: Install */}
            <div className="animate-fade-in-up animate-delay-200">
              <div className="card-modern p-6 h-full text-center">
                <div className="mb-6">
                  <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-xl step-number mx-auto mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Install Extension</h3>
                  <p className="text-body-large text-gray-600 dark:text-gray-400">
                    Get Excali Organizer from the Chrome Web Store with just one click. No registration required.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Visit */}
            <div className="animate-fade-in-up animate-delay-300">
              <div className="card-modern p-6 h-full text-center">
                <div className="mb-6">
                  <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-xl step-number mx-auto mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Visit Excalidraw</h3>
                  <p className="text-body-large text-gray-600 dark:text-gray-400">
                    Open excalidraw.com and watch the organization panel appear seamlessly in your interface.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Start Organizing */}
            <div className="animate-fade-in-up animate-delay-400">
              <div className="card-modern p-6 h-full text-center">
                <div className="mb-6">
                  <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-xl step-number mx-auto mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Start Organizing</h3>
                  <p className="text-body-large text-gray-600 dark:text-gray-400">
                    Create unlimited projects, organize with custom colors, and find any drawing instantly with powerful search.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="grid grid-cols-6 gap-4 transform rotate-12 scale-150">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)', animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-heading-2 mb-4 animate-fade-in-up">
              Ready to{' '}
              <span className="gradient-text-static">Supercharge</span>{' '}
              Your Creative Workflow?
            </h3>
            <p className="text-body-large mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              Join thousands of creators who've already upgraded their Excalidraw experience.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <button
                onClick={() => handleCTAClick('Install from Chrome Web Store', 'getting-started')}
                className="btn-primary animate-fade-in-up animate-delay-200 group"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Install from Chrome Web Store</span>
                <svg className="w-5 h-5 cta-arrow icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-heading-3">Unlimited</div>
                <div className="text-body">Canvases supported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-heading-3">100%</div>
                <div className="text-body">Free & Open Source</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-heading-3">Chrome</div>
                <div className="text-body">+ All Chromium browsers</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
