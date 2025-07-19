export const FeaturesSection = () => {
  return (
    <section id="features" className="section" style={{ backgroundColor: 'var(--color-workflow)' }}>
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
          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">🗂️</div>
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
          </div>

          {/* Advanced Search */}
          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">🔍</div>
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
          </div>

          {/* Unlimited Storage */}
          <div className="animate-fade-in-up animate-delay-300">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">💾</div>
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
          </div>

          {/* Enhanced Workflow */}
          <div className="animate-fade-in-up animate-delay-400">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">✨</div>
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
          </div>

          {/* Privacy & Security */}
          <div className="animate-fade-in-up animate-delay-500">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">🔐</div>
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
          </div>

          {/* High Performance */}
          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">⚡</div>
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
      </div>
    </section>
  )
}