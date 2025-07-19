import { trackCTAClick, trackStoreRedirect } from '../../utils/analytics'

interface HeroSectionProps {
  onCTAClick?: (buttonText: string, location: string) => void
}

export const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
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
    <section id="hero" className="section relative overflow-hidden animated-bg" style={{ background: 'var(--color-hero)' }}>
      {/* Modern Animated Background Center Element */}
      <div className="animated-bg-center" />

      <div className="container mx-auto px-4 text-center relative z-10 pt-16">
        <h1 className="hero-title mb-6 animate-fade-in-up">
          Turn Excalidraw into a{' '}
          <span className="gradient-text-static">Professional Creative Workspace</span>
        </h1>

        <p className="hero-subtitle mb-12 animate-fade-in-up animate-delay-100">
          Add powerful project management, unlimited storage, and advanced search to Excalidraw.com - completely free and privacy-focused.
        </p>

        {/* Key Benefits with Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">💾</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Unlimited Storage</h3>
                  <p className="text-body-small">Never lose your work again</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">🗂️</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Smart Organization</h3>
                  <p className="text-body-small">Group drawings into color-coded projects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-400">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">🔍</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Instant Search</h3>
                  <p className="text-body-small">Find any drawing in seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-500">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">🔐</div>
                <div className="text-left">
                  <h3 className="text-heading-3">100% Private</h3>
                  <p className="text-body-small">All data stays on your device</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">📱</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Works Offline</h3>
                  <p className="text-body-small">No internet required</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon emoji">⚡</div>
                <div className="text-left">
                  <h3 className="text-heading-3">High Performance</h3>
                  <p className="text-body-small">Optimized for speed and efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => handleCTAClick('Add to Chrome - Free', 'hero')}
            className="btn-primary animate-fade-in-up animate-delay-300 mobile-tap-feedback group"
          >
            <span>Add to Chrome - Free</span>
            <svg className="w-5 h-5 cta-arrow icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}