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
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <HeaderBar />

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-body hover:text-primary group"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-heading-1 mb-4">Privacy Policy</h1>
            <p className="text-body-large">
              Effective Date: July 20, 2025
            </p>
          </div>

          {/* Content */}
          <div className="max-w-none">

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">What This Is About</h2>
              <p className="text-body mb-4">
                This privacy policy explains what data we collect when you use our website. We keep things simple - we don't collect much, and what we do collect is anonymous.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">The Basics</h2>
              <div className="space-y-4">
                <p className="text-body"><strong>Personal info:</strong> We don't collect names, emails, or any personal details.</p>
                <p className="text-body"><strong>Website analytics:</strong> We track anonymous data about how people use this website to make it better.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">What We Track</h2>

              <div className="mb-8">
                <p className="text-body mb-4">
                  We use Google Analytics to see how people use the website. This helps us make the site better. We track:
                </p>
                <ul className="list-disc list-inside text-body space-y-2 ml-4">
                  <li>Which pages you visit and how long you stay</li>
                  <li>What device and browser you're using</li>
                  <li>What country you're visiting from (not your exact location)</li>
                  <li>How you found our website</li>
                  <li>When you click buttons like "Add to Browser"</li>
                  <li>How far you scroll down pages</li>
                  <li>When you switch between light and dark mode</li>
                </ul>
                <p className="text-body mt-4">
                  All of this is anonymous - we can't tell who you are personally.
                </p>
              </div>

            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">What We Don't Track</h2>
              <p className="text-body mb-4">We specifically don't collect:</p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Your name, email, or any personal details</li>
                <li>Passwords or login information</li>
                <li>What other websites you visit</li>
                <li>Anything that could identify you personally</li>
              </ul>
            </section>

            {/* <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Your Control</h2>

              <p className="text-body mb-6">You can control what data we collect:</p>

              <div className="mb-6">
                <h3 className="text-heading-3 mb-4">Website Analytics</h3>
                <ul className="list-disc list-inside text-body space-y-2 ml-4">
                  <li>Use the cookie banner to opt out</li>
                  <li>Block cookies in your browser settings</li>
                  <li>Use Google's opt-out tool</li>
                </ul>
              </div>
            </section> */}

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Third-Party Services</h2>

              <div className="mb-6">
                <h3 className="text-heading-3 mb-4">Google Analytics</h3>
                <p className="text-body">We use Google Analytics on this website. Google has their own privacy policy that governs how they handle the data.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Questions?</h2>
              <p className="text-body mb-4">
                If you have questions about this privacy policy, you can reach us at:
              </p>
              <p className="text-body">
                <strong>Email:</strong> <a href="mailto:privacy@excali.org" className="text-primary hover:underline">privacy@excali.org</a>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Open Source</h2>
              <p className="text-body">
                This website is open source. You can review our code and verify our privacy practices on <a href="https://github.com/805karansaini" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-heading-2 mb-6">Policy Changes</h2>
              <p className="text-body">
                We may update this privacy policy from time to time. Any changes will be posted on this page. We recommend checking this page occasionally to stay informed about our privacy practices.
              </p>
            </section>

            <section className="text-center py-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Last Updated: July 20, 2025
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
