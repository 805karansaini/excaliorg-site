export const UseCasesSection = () => {
  return (
    <section id="use-cases" className="section" style={{ background: 'var(--color-usecases)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-heading-1 mb-6 animate-fade-in-up">
            Perfect for{' '}
            <span className="gradient-text-static">Every Creative Professional</span>
          </h2>
          <p className="text-body-large mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            See how Excali Organizer transforms workflows across different industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* For Designers */}
          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">🎨</div>
              <h3 className="text-2xl font-bold mb-4">For Designers</h3>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">
                Create design systems, wireframes, and prototypes with organized project management. Keep all your design iterations in one place.
              </p>
            </div>
          </div>

          {/* For Educators */}
          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">📚</div>
              <h3 className="text-2xl font-bold mb-4">For Educators</h3>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">
                Organize lesson plans, create educational diagrams, and manage course materials. Perfect for teachers and educational content creators.
              </p>
            </div>
          </div>

          {/* For Teams */}
          <div className="animate-fade-in-up animate-delay-300">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">👥</div>
              <h3 className="text-2xl font-bold mb-4">For Teams</h3>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">
                Collaborate on projects, share organized workspaces, and maintain consistent documentation across your team.
              </p>
            </div>
          </div>

          {/* For Consultants */}
          <div className="animate-fade-in-up animate-delay-400">
            <div className="card-modern h-full text-center">
              <div className="text-5xl mb-6 feature-icon emoji">💼</div>
              <h3 className="text-2xl font-bold mb-4">For Consultants</h3>
              <p className="text-body text-gray-600 dark:text-gray-400 leading-relaxed">
                Manage client projects, create professional presentations, and maintain organized portfolios of your consulting work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
