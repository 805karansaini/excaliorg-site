export const UseCasesSection = () => {
  return (
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
          <div className="animate-fade-in-up animate-delay-100">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">🎨</div>
              <h3 className="text-heading-3 mb-3">For Designers</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Organize client projects with color-coded folders</li>
                <li>• Quickly find specific wireframes or mockups</li>
                <li>• Export complete project collections</li>
                <li>• Never lose work with unlimited storage</li>
              </ul>
            </div>
          </div>

          {/* For Educators */}
          <div className="animate-fade-in-up animate-delay-200">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">📚</div>
              <h3 className="text-heading-3 mb-3">For Educators</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Create organized lesson plans with multiple diagrams</li>
                <li>• Search through teaching materials instantly</li>
                <li>• Share project collections with colleagues</li>
                <li>• Keep student work organized by class/subject</li>
              </ul>
            </div>
          </div>

          {/* For Teams */}
          <div className="animate-fade-in-up animate-delay-300">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">👥</div>
              <h3 className="text-heading-3 mb-3">For Teams</h3>
              <ul className="space-y-2 text-body-small">
                <li>• Collaborate on technical documentation</li>
                <li>• Organize system architecture diagrams</li>
                <li>• Share project exports with stakeholders</li>
                <li>• Maintain design systems and component libraries</li>
              </ul>
            </div>
          </div>

          {/* For Consultants */}
          <div className="animate-fade-in-up animate-delay-400">
            <div className="card-modern h-full">
              <div className="text-4xl mb-4 feature-icon emoji">💼</div>
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
      </div>
    </section>
  )
}