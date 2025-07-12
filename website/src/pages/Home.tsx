import { useState, useEffect } from 'react'
import { HeaderBar } from '../components/HeaderBar'
import { trackFAQInteraction, trackCTAClick, trackStoreRedirect } from '../utils/analytics'
import { useScrollTracking } from '../hooks/useScrollTracking'
import { privacyManager } from '../utils/privacy'
import { Link } from 'react-router-dom'

declare global {
  interface Window {
    privacyDebug?: {
      clearConsent: () => void
      getConsent: () => unknown
      showBanner: () => void
    }
  }
}

export const Home = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Enable scroll tracking
  useScrollTracking()

  // Initialize privacy manager
  useEffect(() => {
    privacyManager.initialize()

    // Expose privacy utilities to window for debugging (development only)
    if (import.meta.env.DEV) {
      window.privacyDebug = {
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

      {/* Hero Section with Enhanced Visual Hierarchy */}
      <section id="hero" className="section pt-32 pb-20" style={{ backgroundColor: 'var(--color-hero)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-heading-1 mb-8 animate-fade-in-up">
              Transform Excalidraw into a
              <span className="gradient-text block mt-2">Professional Workspace</span>
            </h1>
            <p className="text-body-large mb-12 max-w-3xl mx-auto animate-fade-in-up animate-delay-100">
              Organize your drawings with unlimited projects, instant search, and powerful management tools.
              Keep your creative workflow smooth and your ideas perfectly organized.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animate-delay-200">
              <button
                onClick={() => handleCTAClick('Add to Chrome - Free', 'hero_primary')}
                className="btn-primary group px-8 py-4 text-lg mobile-tap-feedback"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Add to Chrome - Free</span>
                <svg className="w-5 h-5 ml-2 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn-secondary px-8 py-4 text-lg mobile-tap-feedback">
                Watch Demo
              </button>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card animate-fade-in-up animate-delay-200 mobile-tap-feedback">
                <div className="text-2xl feature-icon">💾</div>
                <h3 className="text-heading-3">Unlimited Storage</h3>
                <p className="text-body">Never lose your drawings again with automatic local storage and project organization</p>
              </div>
              <div className="card animate-fade-in-up animate-delay-300 mobile-tap-feedback">
                <div className="text-2xl feature-icon">🔍</div>
                <h3 className="text-heading-3">Instant Search</h3>
                <p className="text-body">Find any drawing in seconds with powerful search across all your projects and content</p>
              </div>
              <div className="card animate-fade-in-up animate-delay-400 mobile-tap-feedback">
                <div className="text-2xl feature-icon">🎨</div>
                <h3 className="text-heading-3">Smart Organization</h3>
                <p className="text-body">Create color-coded projects, add descriptions, and keep your creative work perfectly organized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="section" style={{ backgroundColor: 'var(--color-features)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-6 animate-fade-in-up">
              Everything You Need for Professional Creative Work
            </h2>
            <p className="text-body-large animate-fade-in-up animate-delay-100">
              Transform your creative process with powerful organization and management features
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div className="space-y-8">
              {[
                {
                  icon: "📁",
                  title: "Project Management",
                  description: "Create unlimited projects with custom colors, descriptions, and smart categorization. Keep related drawings grouped together for easy access.",
                  highlight: "Unlimited Projects"
                },
                {
                  icon: "⚡",
                  title: "Lightning-Fast Search",
                  description: "Instantly find any drawing with advanced search that looks through project names, descriptions, and even drawing content.",
                  highlight: "Search Everything"
                },
                {
                  icon: "🔄",
                  title: "Automatic Sync",
                  description: "Your work is automatically saved and synced across your Excalidraw sessions. Never lose progress again.",
                  highlight: "Auto-Save"
                },
                {
                  icon: "📊",
                  title: "Advanced Analytics",
                  description: "Track your creative productivity with insights into your drawing habits, project progress, and workflow optimization.",
                  highlight: "Productivity Insights"
                }
              ].map((feature, index) => (
                <div key={index} className={`card-feature animate-fade-in-up animate-delay-${(index + 1) * 100} mobile-tap-feedback`}>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl feature-icon">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-heading-3">{feature.title}</h3>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-body">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Preview */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl animate-fade-in-up animate-delay-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-body-small font-medium ml-auto">Excalidraw + Organizer</span>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-3 text-center">
                        <div className="w-full h-16 bg-blue-200 dark:bg-blue-800 rounded mb-2"></div>
                        <span className="text-body-small">Project Alpha</span>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 rounded p-3 text-center">
                        <div className="w-full h-16 bg-green-200 dark:bg-green-800 rounded mb-2"></div>
                        <span className="text-body-small">Design System</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-body-small">Search drawings...</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="w-8 h-8 bg-purple-200 dark:bg-purple-800 rounded"></div>
                          <span className="text-body-small">Login Flow Diagram</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="section" style={{ backgroundColor: 'var(--color-workflow)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-6 animate-fade-in-up">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-body-large animate-fade-in-up animate-delay-100">
              Transform your Excalidraw workflow in minutes, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Install Extension",
                description: "Add Excali Organizer to Chrome with one click. No account needed, no complex setup required."
              },
              {
                step: "2",
                title: "Open Excalidraw",
                description: "Visit excalidraw.com and see the organization panel automatically appear alongside your canvas."
              },
              {
                step: "3",
                title: "Start Organizing",
                description: "Create your first project, organize existing drawings, and experience the power of professional creative workflow."
              }
            ].map((item, index) => (
              <div key={index} className={`text-center animate-fade-in-up animate-delay-${(index + 1) * 100}`}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto step-number">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  )}
                </div>
                <h3 className="text-heading-3 mb-4">{item.title}</h3>
                <p className="text-body">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => handleCTAClick('Get Started Now', 'workflow')}
              className="btn-primary group px-8 py-4 text-lg mobile-tap-feedback"
            >
              <span>Get Started Now</span>
              <svg className="w-5 h-5 ml-2 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="section" style={{ backgroundColor: 'var(--color-cta)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading-2 mb-6 animate-fade-in-up">
            Ready to Transform Your Creative Workflow?
          </h2>
          <p className="text-body-large mb-8 animate-fade-in-up animate-delay-100">
            Join thousands of creators who have already upgraded their Excalidraw experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up animate-delay-200">
            <button
              onClick={() => handleCTAClick('Add to Chrome - Free', 'installation')}
              className="btn-primary group px-8 py-4 text-lg mobile-tap-feedback"
            >
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Add to Chrome - Free</span>
              <svg className="w-5 h-5 ml-2 cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="btn-secondary px-8 py-4 text-lg mobile-tap-feedback">
              View on GitHub
            </button>
          </div>

          <p className="text-body-small animate-fade-in-up animate-delay-300">
            ⭐ Free forever • ⭐ No account required • ⭐ Open source • ⭐ Privacy-first
          </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="section" style={{ backgroundColor: 'var(--color-showcase)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-6 animate-fade-in-up">
              Perfect for Every Creative Professional
            </h2>
            <p className="text-body-large animate-fade-in-up animate-delay-100">
              See how Excali Organizer transforms workflows across different disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Product Designers",
                description: "Organize wireframes, user flows, and design systems. Keep client projects separate and easily accessible.",
                icon: "🎨",
                benefits: ["Project separation", "Design system management", "Client presentation ready"]
              },
              {
                title: "Software Engineers",
                description: "Create and organize system architecture diagrams, API designs, and technical documentation.",
                icon: "💻",
                benefits: ["Architecture diagrams", "Technical documentation", "Team collaboration"]
              },
              {
                title: "Educators & Students",
                description: "Organize course materials, create structured lesson plans, and manage academic projects effortlessly.",
                icon: "📚",
                benefits: ["Course organization", "Lesson planning", "Student portfolios"]
              },
              {
                title: "Business Analysts",
                description: "Map business processes, create flowcharts, and organize stakeholder presentations.",
                icon: "📊",
                benefits: ["Process mapping", "Stakeholder alignment", "Professional presentations"]
              },
              {
                title: "Consultants",
                description: "Manage multiple client projects, create professional deliverables, and maintain organized workflows.",
                icon: "💼",
                benefits: ["Client project separation", "Professional deliverables", "Efficient workflows"]
              },
              {
                title: "Creative Teams",
                description: "Collaborate on creative projects, share inspiration boards, and maintain team creative standards.",
                icon: "👥",
                benefits: ["Team collaboration", "Creative standards", "Inspiration management"]
              }
            ].map((useCase, index) => (
              <div key={index} className={`card animate-fade-in-up animate-delay-${(index + 1) * 100} mobile-tap-feedback`}>
                <div className="text-3xl feature-icon mb-4">{useCase.icon}</div>
                <h3 className="text-heading-3 mb-3">{useCase.title}</h3>
                <p className="text-body mb-4">{useCase.description}</p>
                <ul className="space-y-1">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-body-small">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" style={{ backgroundColor: 'var(--color-faq)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-6 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-body-large animate-fade-in-up animate-delay-100">
              Everything you need to know about Excali Organizer
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`card animate-fade-in-up animate-delay-${(index + 1) * 50}`}>
                <button
                  className="w-full text-left p-6 focus:outline-none mobile-tap-feedback"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-heading-3 pr-8">{faq.question}</h3>
                    <svg
                      className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 faq-chevron ${openFAQ === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {openFAQ === index && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <p className="text-body">{faq.answer}</p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-compact" style={{ backgroundColor: 'var(--color-footer)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/vite.svg" alt="Excali Organizer" className="w-8 h-8" />
                <span className="text-xl font-bold gradient-text-static">Excali Organizer</span>
              </div>
              <p className="text-body mb-4">
                Transform your Excalidraw experience with professional organization, unlimited storage, and powerful project management tools.
              </p>
              <p className="text-body-small">
                Open source, privacy-first, and completely free forever.
              </p>
            </div>

            <div>
              <h4 className="text-heading-3 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-body-small hover:text-primary transition-colors link-hover">Features</a></li>
                <li><a href="#workflow" className="text-body-small hover:text-primary transition-colors link-hover">How it Works</a></li>
                <li><a href="#use-cases" className="text-body-small hover:text-primary transition-colors link-hover">Use Cases</a></li>
                <li><a href="#faq" className="text-body-small hover:text-primary transition-colors link-hover">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-heading-3 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Documentation</a></li>
                <li><a href="#" className="text-body-small hover:text-primary transition-colors link-hover">GitHub</a></li>
                <li><a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Community</a></li>
                <li><a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-body-small">
              © 2025 Excali Organizer. Open source under MIT license.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/policies/privacy-policy" className="text-body-small hover:text-primary transition-colors link-hover">Privacy Policy</Link>
              <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Terms of Service</a>
              <a href="#" className="text-body-small hover:text-primary transition-colors link-hover">Open Source</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
