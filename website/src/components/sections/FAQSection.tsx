import { useState } from 'react'
import { trackFAQInteraction } from '../../utils/analytics'

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How do I install it?",
      answer: "Add the Chrome extension from the Web Store (or load it manually). Open excalidraw.com and the panel appears-no setup needed."
    },
    {
      question: "How does Excali Organizer improve Excalidraw?",
      answer: "It adds local unlimited storage, project grouping, fast search and auto‑save-turning Excalidraw into a full workspace."
    },
    // {
    //   question: "Can I organize existing canvases?",
    //   answer: "Yes-Excali Organizer finds your canvases automatically so you can drag them into projects, label them and search instantly."
    // },
    {
      question: "Is my data private?",
      answer: "Yes-everything stays on your device. We don’t collect, send or store any of your work."
    },
    {
      question: "Will it slow down Excalidraw?",
      answer: "No-it's lightweight, runs quietly in the background and doesn’t affect the canvas performance."
    },
    // {
    //   question: "Are there storage limits?",
    //   answer: "No-it can handle thousands of canvases and projects without issues."
    // },
    // {
    //   question: "How do I move my projects to another device?",
    //   answer: "Export your projects as a ZIP, then import on any device. (Secure sync is coming soon.)"
    // },
    {
      question: "Is it really free?",
      answer: "Yes-100% free and open source. All features are available to everyone, always."
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
          <h2 className="text-heading-1 mb-6">
            Frequently Asked{' '}
            <span className="gradient-text-static">Questions</span>
          </h2>
          <p className="hero-subtitle mb-12">
            Everything you need to know about Excali Organizer
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <div className={`faq-item ${openFAQ === index ? 'faq-expanded' : ''}`}>
                <button
                  className="w-full py-6 px-8 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-heading-3 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ease-out ${openFAQ === index ? 'rotate-180 text-primary' : 'text-text-muted'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`grid ${openFAQ === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`} style={{ transition: 'grid-template-rows 300ms ease-out, opacity 300ms ease-out' }}>
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
