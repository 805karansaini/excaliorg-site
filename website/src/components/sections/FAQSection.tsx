import { useState } from 'react'
import { trackFAQInteraction } from '../../utils/analytics'

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does Excali Organizer enhance my Excalidraw experience?",
      answer: "Excali Organizer transforms Excalidraw into a professional workspace by adding unlimited storage, project management, advanced search, and organization features. You can create color-coded projects, instantly search through all your canvases, and never lose your work with automatic saving."
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
      question: "Can I organize my existing Excalidraw canvases?",
      answer: "Yes! Excali Organizer automatically detects all your existing canvases and lets you organize them into projects. You can drag and drop canvases into color-coded projects, add descriptions, and search through everything instantly."
    },
    {
      question: "Does it affect Excalidraw's performance?",
      answer: "Not at all! Excali Organizer is built with performance in mind. It uses minimal memory, runs in the background, and doesn't interfere with Excalidraw's core functionality. You'll experience the same smooth canvas experience with added organization power."
    },
    {
      question: "What happens if I switch devices or browsers?",
      answer: "Your projects can be exported as ZIP files for backup and migration. While data is stored locally for privacy, you can easily export everything and import it on another device. We're also working on optional secure sync features."
    },
    {
      question: "Are there any storage limits?",
      answer: "No storage limits! Excali Organizer uses advanced storage APIs that can handle thousands of canvases and projects without performance issues."
    },
    {
      question: "Is this really completely free?",
      answer: "Yes, 100% free forever! No premium features, no subscriptions, no hidden costs. This is an open-source project built by creators for creators. All features are available to everyone without any limitations."
    }
  ]

  const toggleFAQ = (index: number) => {
    const isOpening = openFAQ !== index
    setOpenFAQ(openFAQ === index ? null : index)

    if (faqs[index]) {
      trackFAQInteraction(faqs[index].question, isOpening)
    }
  }

  return (
    <section id="faq" className="section" style={{ background: 'var(--color-faq)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-heading-1 mb-6 animate-fade-in-up">
            Frequently Asked{' '}
            <span className="gradient-text-static">Questions</span>
          </h2>
          <p className="hero-subtitle mb-12 animate-fade-in-up animate-delay-100">
            Everything you need to know about Excali Organizer
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className={`mb-6 animate-fade-in-up animate-delay-${(index % 5) + 1}00`}>
              <div className={`faq-item group ${openFAQ === index ? 'faq-expanded' : ''}`}>
                <button
                  className="w-full py-6 px-8 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-heading-3 pr-4 group-hover:text-primary">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 faq-chevron transition-transform duration-300 ease-out ${openFAQ === index ? 'rotate-180 text-primary' : 'text-text-muted group-hover:text-primary'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${openFAQ === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-body leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
