import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderBar } from '../components/HeaderBar';
import { ScrollToTop } from '../components/ScrollToTop';
import { FooterSection } from '../components/sections/FooterSection';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Update document title
    document.title = 'Privacy Policy - Excali Organizer';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <HeaderBar />

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-body hover:text-primary transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-heading-1 mb-4">Privacy Policy</h1>
            <p className="text-body-large text-gray-600 dark:text-gray-400">
              Effective Date: January 12, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Introduction</h2>
              <p className="text-body mb-4">
                Excali Organizer is a Chrome extension that enhances your Excalidraw experience with organization and project management features. We are committed to protecting your privacy and being transparent about our data practices.
              </p>
            </section>

            {/* Core Privacy Principles */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Core Privacy Principles</h2>
              <div className="grid gap-4">
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                    Local-First
                  </h3>
                  <p className="text-body">Your canvases and projects are stored locally on your device</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                    No Account Required
                  </h3>
                  <p className="text-body">We don't collect personal information or require account creation</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                    Minimal Data Collection
                  </h3>
                  <p className="text-body">We only collect anonymous usage analytics to improve the extension</p>
                </div>
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                    Your Control
                  </h3>
                  <p className="text-body">You have full control over your data and privacy preferences</p>
                </div>
              </div>
            </section>

            {/* What Data We Collect */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">What Data We Collect</h2>

              <div className="mb-8">
                <h3 className="text-heading-3 mb-4">Website Analytics (This Website Only)</h3>
                <p className="text-body mb-4">
                  When you visit this website (excali.org), we use Google Analytics to understand how users interact with our site:
                </p>
                <ul className="list-disc list-inside text-body space-y-2 ml-4">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on pages and bounce rates</li>
                  <li>Device type, browser, and approximate location (country/region)</li>
                  <li>Referral sources and search terms</li>
                </ul>
                <p className="text-body mt-4">
                  This data is anonymous and aggregated. We use it to improve the website experience and understand user interest in the extension.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-3 mb-4">Extension Usage (Excali Organizer Extension)</h3>
                <p className="text-body mb-4">
                  The Excali Organizer extension operates with a privacy-first approach:
                </p>
                <ul className="list-disc list-inside text-body space-y-2 ml-4">
                  <li><strong>Your Canvases:</strong> Never collected, transmitted, or stored on our servers</li>
                  <li><strong>Project Data:</strong> Stored locally in your browser using secure storage APIs</li>
                  <li><strong>Preferences:</strong> Theme settings and organizational preferences stored locally</li>
                  <li><strong>Usage Analytics:</strong> We may collect anonymous feature usage to improve the extension (with your consent)</li>
                </ul>
              </div>
            </section>

            {/* What We Don't Collect */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">What We Don't Collect</h2>
              <div className="card-feature p-6">
                <ul className="list-disc list-inside text-body space-y-2">
                  <li>Personal identifying information (name, email, etc.)</li>
                  <li>Your Excalidraw canvases or creative content</li>
                  <li>Login credentials or account information</li>
                  <li>Detailed browsing history outside of excalidraw.com usage</li>
                  <li>Any data that could identify you personally</li>
                </ul>
              </div>
            </section>

            {/* Your Rights and Choices */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Your Rights and Choices</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-4">Cookie Preferences</h3>
                  <p className="text-body mb-3">You can control analytics cookies through:</p>
                  <ul className="list-disc list-inside text-body space-y-1 ml-4">
                    <li>Our cookie consent banner</li>
                    <li>Your browser settings</li>
                    <li>Google Analytics opt-out tools</li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="text-heading-3 mb-4">Extension Data</h3>
                  <p className="text-body mb-3">Control your extension data:</p>
                  <ul className="list-disc list-inside text-body space-y-1 ml-4">
                    <li><strong>Export:</strong> Export all your projects and data</li>
                    <li><strong>Delete:</strong> Remove the extension to delete all data</li>
                    <li><strong>Control:</strong> Manage privacy settings within the extension</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-heading-3 mb-4">Your GDPR Rights</h3>
                <p className="text-body mb-4">If you're in the EU, you have additional rights:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-body">Access</h4>
                      <p className="text-body-small">Request information about data we process</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-body">Rectification</h4>
                      <p className="text-body-small">Correct inaccurate data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-body">Erasure</h4>
                      <p className="text-body-small">Request deletion of your data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-body">Portability</h4>
                      <p className="text-body-small">Export your data in a standard format</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Third-Party Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-4">Google Analytics</h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>Used only for website analytics (not in the extension)</li>
                    <li>Governed by Google's Privacy Policy</li>
                    <li>You can opt-out using Google's tools or browser settings</li>
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="text-heading-3 mb-4">Chrome Web Store</h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>Extension distribution is handled by Google</li>
                    <li>Subject to Google's Chrome Web Store policies</li>
                    <li>Installation and update data may be processed by Google</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Contact Us</h2>
              <div className="card-feature p-6">
                <p className="text-body mb-4">
                  If you have questions about this privacy policy or our data practices:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-body-small font-medium min-w-16">Email:</span>
                    <a href="mailto:privacy@excali.org" className="text-primary hover:underline">privacy@excali.org</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-body-small font-medium min-w-16">GitHub:</span>
                    <span className="text-body">Open an issue on our repository for public discussions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-body-small font-medium min-w-16">Website:</span>
                    <Link to="/" className="text-primary hover:underline">excali.org</Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Open Source */}
            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Open Source Commitment</h2>
              <div className="card p-6">
                <p className="text-body">
                  Excali Organizer is an open-source project. You can review our code, contribute improvements,
                  and verify our privacy practices at our GitHub repository.
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="text-center py-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-body-small text-gray-600 dark:text-gray-400">
                Last Updated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <FooterSection />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};
