import React, { useState } from 'react'
import './App.css'
import { HeaderBar } from './components/HeaderBar'
import { trackFAQInteraction, trackCTAClick, trackStoreRedirect } from './utils/analytics'
import { useScrollTracking } from './hooks/useScrollTracking'
import { privacyManager } from './utils/privacy'

function App() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  // Enable scroll tracking
  useScrollTracking()

  // Initialize privacy manager
  React.useEffect(() => {
    privacyManager.initialize()

    // Expose privacy utilities to window for debugging (development only)
    if (import.meta.env.DEV) {
      (window as any).privacyDebug = {
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

  const toggleFAQ = (index: number) => {
    const isOpening = openFAQ !== index
    setOpenFAQ(openFAQ === index ? null : index)

    if (faqs[index]) {
      trackFAQInteraction(faqs[index].question, isOpening)
    }
  }

  const handleCTAClick = (buttonText: string, location: string) => {
    trackCTAClick(buttonText, location)
    trackStoreRedirect(location)
    // Open download page in new tab
    window.open('https://dev.excali.org', '_blank', 'noopener,noreferrer')
  }

  const faqs = [
    {
      question: "How does Excali Organizer enhance my Excalidraw experience?",
      answer: "Excali Organizer transforms Excalidraw into a professional workspace by adding unlimited storage, project management, advanced search, and organization features. You can create color-coded projects, instantly search through all your drawings, and never lose your work with automatic saving."
    },
    {
      question: "Is my data completely private and secure?",
      answer: "Absolutely! Your data never leaves your device. Everything is stored locally using advanced browser storage APIs. We don't collect, track, or transmit any of your creative work. No accounts, no cloud storage, no privacy concerns."
    },
    {
      question: "How do I install and get started?",
      answer: "Simply install the Chrome extension from the Web Store (coming soon) or load it manually. Once installed, visit excalidraw.com and you'll see the organization panel automatically appear. No setup required - start creating projects immediately!"
    },
    {
      question: "Can I organize my existing Excalidraw drawings?",
      answer: "Yes! Excali Organizer automatically detects all your existing drawings and lets you organize them into projects. You can drag and drop drawings into color-coded projects, add descriptions, and search through everything instantly."
    },
    {
      question: "Does it affect Excalidraw's performance?",
      answer: "Not at all! Excali Organizer is built with performance in mind. It uses minimal memory, runs in the background, and doesn't interfere with Excalidraw's core functionality. You'll experience the same smooth drawing experience with added organization power."
    },
    {
      question: "What happens if I switch devices or browsers?",
      answer: "Your projects can be exported as ZIP files for backup and migration. While data is stored locally for privacy, you can easily export everything and import it on another device. We're also working on optional secure sync features."
    },
    {
      question: "Are there any storage limits?",
      answer: "No storage limits! Excali Organizer uses advanced storage APIs that can handle thousands of drawings and projects without performance issues."
    },
    {
      question: "Is this really completely free?",
      answer: "Yes, 100% free forever! No premium features, no subscriptions, no hidden costs. This is an open-source project built by creators for creators. All features are available to everyone without any limitations."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Modern Header with Glassmorphism */}
      <HeaderBar />

      {/* Hero Section with Modern Background */}
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
            <div className="card-modern animate-fade-in-up animate-delay-200 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">💾</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Unlimited Storage</h3>
                  <p className="text-body-small">Never lose your work again</p>
                </div>
              </div>
            </div>

            <div className="card-modern animate-fade-in-up animate-delay-300 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">🗂️</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Smart Organization</h3>
                  <p className="text-body-small">Group drawings into color-coded projects</p>
                </div>
              </div>
            </div>

            <div className="card-modern animate-fade-in-up animate-delay-400 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">🔍</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Instant Search</h3>
                  <p className="text-body-small">Find any drawing in seconds</p>
                </div>
              </div>
            </div>

            <div className="card-modern animate-fade-in-up animate-delay-500 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">🔐</div>
                <div className="text-left">
                  <h3 className="text-heading-3">100% Private</h3>
                  <p className="text-body-small">All data stays on your device</p>
                </div>
              </div>
            </div>

            <div className="card-modern animate-fade-in-up animate-delay-100 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">📱</div>
                <div className="text-left">
                  <h3 className="text-heading-3">Works Offline</h3>
                  <p className="text-body-small">No internet required</p>
                </div>
              </div>
            </div>

            <div className="card-modern animate-fade-in-up animate-delay-200 mobile-tap-feedback">
              <div className="flex items-center space-x-3">
                <div className="text-2xl feature-icon">⚡</div>
                <div className="text-left">
                  <h3 className="text-heading-3">High Performance</h3>
                  <p className="text-body-small">Optimized for speed and efficiency</p>
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
            {/* TODO Later
            <button
              onClick={() => handleCTAClick('Try It Free', 'hero')}
              className="btn-secondary animate-fade-in-up animate-delay-400 mobile-tap-feedback"
            >
              Try It Free
            </button> */}
          </div>
        </div>
      </section>

      {/* Core Features Section with Modern Cards */}
      <section id="features" className="section" style={{ backgroundColor: 'var(--color-features)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4 animate-fade-in-up">
              Everything You Need to Organize Your Creative Work
            </h2>
            <p className="text-body-large max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              Transform your Excalidraw experience with professional-grade tools that keep your creativity flowing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Management */}
            <div className="card-modern animate-fade-in-up animate-delay-100">
              <div className="text-4xl mb-4 feature-icon">🗂️</div>
              <h3 className="text-heading-3 mb-3">Project Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Create unlimited projects with custom names and colors</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Organize related drawings into logical groups</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Visual color coding for instant project identification</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Project descriptions for context and documentation</span>
                </li>
              </ul>
            </div>

            {/* Advanced Search */}
            <div className="card-modern animate-fade-in-up animate-delay-200">
              <div className="text-4xl mb-4 feature-icon">🔍</div>
              <h3 className="text-heading-3 mb-3">Advanced Search</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Instant fuzzy search across all your drawings</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Search by project or across everything</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Keyboard shortcuts for rapid navigation</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Real-time results as you type</span>
                </li>
              </ul>
            </div>

            {/* Unlimited Storage */}
            <div className="card-modern animate-fade-in-up animate-delay-300">
              <div className="text-4xl mb-4 feature-icon">💾</div>
              <h3 className="text-heading-3 mb-3">Unlimited Storage</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>No storage limits unlike browser localStorage</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Automatic saving every second</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Complete offline functionality</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Export projects as ZIP files for backup</span>
                </li>
              </ul>
            </div>

            {/* Enhanced Workflow */}
            <div className="card-modern animate-fade-in-up animate-delay-400">
              <div className="text-4xl mb-4 feature-icon">✨</div>
              <h3 className="text-heading-3 mb-3">Enhanced Workflow</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>VS Code-style panel with pin/unpin functionality</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Comprehensive keyboard shortcuts for power users</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Instant theme sync with Excalidraw</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Resizable interface to fit your workflow</span>
                </li>
              </ul>
            </div>

            {/* Privacy & Security */}
            <div className="card-modern animate-fade-in-up animate-delay-500">
              <div className="text-4xl mb-4 feature-icon">🔐</div>
              <h3 className="text-heading-3 mb-3">Privacy & Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Local-first architecture - data never leaves your device</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>No tracking or analytics - complete privacy</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Open source - fully auditable code</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>No account required - works immediately</span>
                </li>
              </ul>
            </div>

            {/* High Performance */}
            <div className="card-modern animate-fade-in-up animate-delay-100">
              <div className="text-4xl mb-4 feature-icon">⚡</div>
              <h3 className="text-heading-3 mb-3">High Performance</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Optimized for speed with minimal memory usage</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Smooth performance with thousands of drawings</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Non-blocking operations - no lag while drawing</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div style={{ color: 'var(--color-success)' }} className="text-sm mt-1 flex-shrink-0">✓</div>
                  <span>Efficient indexing for instant search results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="section" style={{ backgroundColor: 'var(--color-workflow)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4 animate-fade-in-up">
              Get Started in Minutes
            </h2>
            <p className="text-body-large max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              No account required - works immediately after installation
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-6 justify-center animate-fade-in-up animate-delay-100">
                <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg step-number" style={{ backgroundColor: 'var(--color-primary)' }}>
                  1
                </div>
                <div className="flex-1 max-w-md">
                  <h3 className="text-heading-3 mb-2">
                    Install from Chrome Web Store
                  </h3>
                  <p className="text-body">
                    Click the install button and add the extension to your browser (coming soon)
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-6 justify-center animate-fade-in-up animate-delay-200">
                <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg step-number" style={{ backgroundColor: 'var(--color-primary)' }}>
                  2
                </div>
                <div className="flex-1 max-w-md">
                  <h3 className="text-heading-3 mb-2">
                    Visit excalidraw.com
                  </h3>
                  <p className="text-body">
                    The management panel appears automatically - no setup required
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-6 justify-center animate-fade-in-up animate-delay-300">
                <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg step-number" style={{ backgroundColor: 'var(--color-primary)' }}>
                  3
                </div>
                <div className="flex-1 max-w-md">
                  <h3 className="text-heading-3 mb-2">
                    Create your first project
                  </h3>
                  <p className="text-body">
                    Click "New Project" and give it a name and color
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-6 justify-center animate-fade-in-up animate-delay-400">
                <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg step-number" style={{ backgroundColor: 'var(--color-primary)' }}>
                  4
                </div>
                <div className="flex-1 max-w-md">
                  <h3 className="text-heading-3 mb-2">
                    Start organizing
                  </h3>
                  <p className="text-body">
                    Drag your drawings into projects and watch the magic happen
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start space-x-6 justify-center animate-fade-in-up animate-delay-500">
                <div className="flex-shrink-0 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg step-number" style={{ backgroundColor: 'var(--color-primary)' }}>
                  5
                </div>
                <div className="flex-1 max-w-md">
                  <h3 className="text-heading-3 mb-2">
                    Master the shortcuts
                  </h3>
                  <p className="text-body">
                    Press F1 for help and discover all the time-saving features
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="section relative overflow-hidden" style={{ backgroundColor: 'var(--color-cta)' }}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-6 gap-4 transform rotate-12 scale-150">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)', animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-heading-2 mb-4 animate-fade-in-up">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-body-large mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Join thousands of creators who've already upgraded their Excalidraw experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button
              onClick={() => handleCTAClick('Install from Chrome Web Store', 'installation')}
              className="btn-primary animate-fade-in-up animate-delay-200 group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Install from Chrome Web Store</span>
            </button>
            {/* TODO Later
            <button
              onClick={() => handleCTAClick('Try Manual Install', 'installation')}
              className="btn-secondary animate-fade-in-up animate-delay-300"
            >
              Try Manual Install
            </button> */}
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
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="section" style={{ backgroundColor: 'var(--color-showcase)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4 animate-fade-in-up">
              Perfect for Every Creative Professional
            </h2>
            <p className="text-body-large mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              See how Excali Organizer transforms workflows across different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* For Designers */}
            <div className="card-modern animate-fade-in-up animate-delay-100">
              <div className="text-4xl mb-4 feature-icon">🎨</div>
              <h3 className="text-heading-3 mb-3">For Designers</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Organize client projects with color-coded folders</li>
                <li>• Quickly find specific wireframes or mockups</li>
                <li>• Export complete project collections</li>
                <li>• Never lose work with unlimited storage</li>
              </ul>
            </div>

            {/* For Educators */}
            <div className="card-modern animate-fade-in-up animate-delay-200">
              <div className="text-4xl mb-4 feature-icon">📚</div>
              <h3 className="text-heading-3 mb-3">For Educators</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Create organized lesson plans with multiple diagrams</li>
                <li>• Search through teaching materials instantly</li>
                <li>• Share project collections with colleagues</li>
                <li>• Keep student work organized by class/subject</li>
              </ul>
            </div>

            {/* For Teams */}
            <div className="card-modern animate-fade-in-up animate-delay-300">
              <div className="text-4xl mb-4 feature-icon">👥</div>
              <h3 className="text-heading-3 mb-3">For Teams</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Collaborate on technical documentation</li>
                <li>• Organize system architecture diagrams</li>
                <li>• Share project exports with stakeholders</li>
                <li>• Maintain design systems and component libraries</li>
              </ul>
            </div>

            {/* For Consultants */}
            <div className="card-modern animate-fade-in-up animate-delay-400">
              <div className="text-4xl mb-4 feature-icon">💼</div>
              <h3 className="text-heading-3 mb-3">For Consultants</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Organize client presentations by project</li>
                <li>• Quickly access relevant process diagrams</li>
                <li>• Professional project exports for clients</li>
                <li>• Maintain confidentiality with local storage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" style={{ backgroundColor: 'var(--color-faq)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-body-large mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
              Everything you need to know about Excali Organizer
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className={`mb-6 animate-fade-in-up animate-delay-${(index % 5) + 1}00`}>
                <div className="faq-item group">
                  <button
                    className="w-full py-6 px-8 text-left flex justify-between items-center transition-all duration-300 ease-out"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-heading-3 pr-4 transition-colors duration-300 group-hover:text-primary">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 faq-chevron transition-all duration-300 ease-out ${openFAQ === index ? 'rotate-180 text-primary' : 'text-text-muted group-hover:text-primary'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-body leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-compact border-t" style={{ backgroundColor: 'var(--color-footer)', borderColor: 'var(--color-border)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-heading-2 mb-4 gradient-text-static">Excali Organizer</h3>
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

            <div>
              <h4 className="text-heading-3 mb-4">Features</h4>
              <ul className="space-y-2 text-body">
                <li>Project Management</li>
                <li>Advanced Search</li>
                <li>Unlimited Storage</li>
                <li>Enhanced Workflow</li>
                <li>Privacy & Security</li>
              </ul>
            </div>

            <div>
              <h4 className="text-heading-3 mb-4">Support</h4>
              <ul className="space-y-2 text-body">
                <li>Documentation</li>
                <li>FAQ</li>
                <li>Community</li>
                <li>Bug Reports</li>
                <li>Feature Requests</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-body-small">
              © 2025 Excali Organizer. Open source under MIT license.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => setShowPrivacyPolicy(true)} className="text-body-small hover:text-primary transition-colors link-hover">Privacy Policy</button>
              <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Terms of Service</a>
              <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Open Source</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="whitespace-pre-line">
                  {privacyManager.generatePrivacyPolicy()}
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
