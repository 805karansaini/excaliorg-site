export const ProblemSolutionSection = () => {
  return (
    <section id="problem-solution" className="section relative" style={{ backgroundColor: 'var(--color-features)' }}>
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4 animate-fade-in-up">
            The Problem with Excalidraw
          </h2>
          <p className="text-body-large max-w-3xl mx-auto animate-fade-in-up animate-delay-100">
            Excalidraw is perfect for creating diagrams, but managing multiple drawings becomes chaotic.
            Users struggle with lost drawings, no organization system, and limited storage.
          </p>
        </div>

        {/* Before/After Comparison - Compact Side by Side */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Before */}
            <div className="animate-fade-in-up animate-delay-200">
              <div className="card-modern p-6 h-full">
                <div className="text-center mb-4">
                  <h3 className="text-heading-3 mb-2 flex items-center justify-center">
                    <div className="text-2xl mr-2">😓</div>
                    Before Excali Organizer
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 text-lg mt-0.5 flex-shrink-0">✗</div>
                    <span className="text-body-small">Limited local storage that can be lost</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 text-lg mt-0.5 flex-shrink-0">✗</div>
                    <span className="text-body-small">No way to organize related drawings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 text-lg mt-0.5 flex-shrink-0">✗</div>
                    <span className="text-body-small">Difficult to find specific drawings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 text-lg mt-0.5 flex-shrink-0">✗</div>
                    <span className="text-body-small">No project management capabilities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="text-red-500 text-lg mt-0.5 flex-shrink-0">✗</div>
                    <span className="text-body-small">Risk of losing work with browser clearing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* After */}
            <div className="animate-fade-in-up animate-delay-300">
              <div className="card-modern p-6 h-full" style={{ background: 'linear-gradient(135deg, var(--color-primary)/10, var(--color-primary)/5)' }}>
                <div className="text-center mb-4">
                  <h3 className="text-heading-3 mb-2 flex items-center justify-center">
                    <div className="text-2xl mr-2">✨</div>
                    After Excali Organizer
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div style={{ color: 'var(--color-success)' }} className="text-lg mt-0.5 flex-shrink-0">✓</div>
                    <span className="text-body-small">Unlimited storage that never gets lost</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div style={{ color: 'var(--color-success)' }} className="text-lg mt-0.5 flex-shrink-0">✓</div>
                    <span className="text-body-small">Color-coded project organization</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div style={{ color: 'var(--color-success)' }} className="text-lg mt-0.5 flex-shrink-0">✓</div>
                    <span className="text-body-small">Powerful search across all drawings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div style={{ color: 'var(--color-success)' }} className="text-lg mt-0.5 flex-shrink-0">✓</div>
                    <span className="text-body-small">Professional project management</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div style={{ color: 'var(--color-success)' }} className="text-lg mt-0.5 flex-shrink-0">✓</div>
                    <span className="text-body-small">Complete data privacy and security</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}