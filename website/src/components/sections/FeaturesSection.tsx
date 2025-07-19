export const FeaturesSection = () => {
  return (
    <section id="features" className="section" style={{ background: 'var(--color-features)' }}>
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
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">🗂️</div>
              <h3 className="text-2xl font-bold mb-2">Project Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Organize your creative work like a professional</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Create unlimited projects with custom names and colors</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Organize related canvases into logical groups</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Visual color coding for instant project identification</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Project descriptions for context and documentation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Advanced Search */}
          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Advanced Search</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Find anything in your creative library instantly</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Instant fuzzy search across all your canvases</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Search by project or across everything</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Keyboard shortcuts for rapid navigation</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Real-time results as you type</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Unlimited Storage */}
          <div className="animate-fade-in-up animate-delay-300">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">💾</div>
              <h3 className="text-2xl font-bold mb-2">Unlimited Storage</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Never worry about losing your creative work</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>No storage limits unlike browser localStorage</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Automatic saving every second</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Complete offline functionality</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Export projects as ZIP files for backup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enhanced Workflow */}
          <div className="animate-fade-in-up animate-delay-400">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">✨</div>
              <h3 className="text-2xl font-bold mb-2">Enhanced Workflow</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Streamlined creative process for maximum productivity</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>VS Code-style panel with pin/unpin functionality</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Comprehensive keyboard shortcuts for power users</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Instant theme sync with Excalidraw</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Resizable interface to fit your workflow</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="animate-fade-in-up animate-delay-500">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">🔐</div>
              <h3 className="text-2xl font-bold mb-2">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Your creative work stays completely private</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Local-first architecture - data never leaves your device</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>No tracking or analytics - complete privacy</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Open source - fully auditable code</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>No account required - works immediately</span>
                </li>
              </ul>
            </div>
          </div>

          {/* High Performance */}
          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">⚡</div>
              <h3 className="text-2xl font-bold mb-2">High Performance</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Optimized for speed and efficiency</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Optimized for speed with minimal memory usage</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Smooth performance with thousands of canvases</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Non-blocking operations - no lag while canvas</span>
                </li>
                <li className="flex items-start space-x-3 text-body">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
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
