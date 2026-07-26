/* Projects.jsx — /projects route.
   Full project grid + MF Screener flagship section (spec §3.2, §4).
   Standard cards first, then the expanded flagship treatment. */

import { projects } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import ProjectCard from '../components/ProjectCard.jsx'
import MFScreener from '../components/MFScreener.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/projects.css'

function Projects() {
  const headerRef = useReveal()

  return (
    <main>
      <div className="projects-page">
        {/* Page header */}
        <div className="reveal" ref={headerRef}>
          <div className="section-label">PROJECTS</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
            Work
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)',
              maxWidth: '520px',
              lineHeight: '1.65',
              marginBottom: '0',
            }}
          >
            Two projects built from real domain experience. No tutorial clones — each one was built to solve a problem Rana encountered while working in fintech or studying machine learning.
          </p>
        </div>

        {/* ── Standard project cards grid ── */}
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── MF Screener flagship treatment ── */}
        {/* Renders the full expanded section with toggle, ER diagram, payload inspector */}
        <MFScreener />
      </div>

      <Footer />
    </main>
  )
}

export default Projects
