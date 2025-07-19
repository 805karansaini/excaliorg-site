import React from 'react'
import { HeaderBar } from '../components/HeaderBar'
import { trackCTAClick, trackStoreRedirect } from '../utils/analytics'
import { useScrollTracking } from '../hooks/useScrollTracking'
import { privacyManager } from '../utils/privacy'
import {
  HeroSection,
  FeaturesSection,
  ProblemSolutionSection,
  WorkflowSection,
  UseCasesSection,
  FAQSection,
  FooterSection
} from '../components/sections'

export const Home = () => {

  // Enable scroll tracking
  useScrollTracking()

  // Initialize privacy manager
  React.useEffect(() => {
    privacyManager.initialize()

    // Expose privacy utilities to window for debugging (development only)
    if (import.meta.env.DEV) {
      (window as typeof window & { privacyDebug?: object }).privacyDebug = {
        clearConsent: () => {
          localStorage.removeItem('privacy_consent')
          privacyManager.revokeConsent()
        },
        getConsent: () => privacyManager.getConsent(),
        showBanner: () => {
          localStorage.removeItem('privacy_consent')
          window.location.reload()
        }
      }
    }
  }, [])


  const handleCTAClick = (buttonText: string, location: string) => {
    trackCTAClick(buttonText, location)
    trackStoreRedirect(location)
    // Open download page in new tab
    window.open('https://excali.org', '_blank', 'noopener,noreferrer')
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Modern Header with Glassmorphism */}
      <HeaderBar />

      {/* Hero Section */}
      <HeroSection onCTAClick={handleCTAClick} />

      {/* Problem/Solution Section */}
      <ProblemSolutionSection />

      {/* Core Features Section */}
      <FeaturesSection />

      {/* Getting Started Section */}
      <WorkflowSection onCTAClick={handleCTAClick} />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <FooterSection onCTAClick={handleCTAClick} />

    </div>
  )
}
