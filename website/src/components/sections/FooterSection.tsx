import { Link } from 'react-router-dom'
import { trackCTAClick, trackStoreRedirect } from '../../utils/analytics'

interface FooterSectionProps {
  onCTAClick?: (buttonText: string, location: string) => void
}

export const FooterSection = ({ onCTAClick }: FooterSectionProps) => {
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

  const features = ['Project Management', 'Advanced Search', 'Unlimited Storage', 'Privacy & Security', 'High Performance']
  const support = ['FAQ', 'Documentation', 'Community', 'Bug Reports', 'Feature Requests']

  const FeaturesList = () => (
    <div>
      <h4 className="text-heading-3 mb-4">Features</h4>
      <ul className="space-y-2 text-body">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  )

  const SupportList = () => (
    <div>
      <h4 className="text-heading-3 mb-4">Support</h4>
      <ul className="space-y-2 text-body">
        {support.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="section-compact border-t" style={{ background: 'var(--color-footer)', borderColor: 'var(--color-border)' }}>
      <div className="container mx-auto px-4">
        <div className="space-y-8 md:space-y-0">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            <div>
              <h4 className="text-heading-3 mb-4">
                Excali{' '}
                <span className="gradient-text-static">Organizer</span>
              </h4>
              <p className="text-body mb-6">
                Transform your Excalidraw experience with professional organization tools.
                Completely free, privacy-focused, and open source.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCTAClick('Get Started', 'footer')}
                  className="btn-primary"
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleCTAClick('GitHub', 'footer')}
                  className="btn-secondary"
                >
                  GitHub
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <FeaturesList />
              <SupportList />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex md:gap-16">
            <div className="flex-1">
              <h4 className="text-heading-2 mb-4">
                Excali{' '}
                <span className="gradient-text-static">Organizer</span>
              </h4>
              <p className="text-body mb-6">
                Transform your Excalidraw experience with professional organization tools.
                Completely free, privacy-focused, and open source.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCTAClick('Get Started', 'footer')}
                  className="btn-primary"
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleCTAClick('GitHub', 'footer')}
                  className="btn-secondary"
                >
                  GitHub
                </button>
              </div>
            </div>

            <div className="flex gap-16">
              <FeaturesList />
              <SupportList />
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-body-small">
            © 2025 Excali Organizer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/policies/privacy-policy" className="text-body-small hover:text-primary transition-colors link-hover">Privacy Policy</Link>
            <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Terms of Service</a>
            <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Open Source</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
