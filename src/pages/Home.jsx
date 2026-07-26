/* Home.jsx — / route. Composes all home page sections in order (spec §3.1).
   
   Section order:
   1. Hero (typewriter + count-up stats + CTAs)   — Step 3 ✓
   2. Ticker strip (auto-scroll stats)             — Step 4
   3. About ("Asset Reallocation" two panels)     — Step 5
   4. Experience (rows + education + certs)       — Step 5
   5. Skills (Order Book + GitHub calendar)       — Step 6
   6. Career NAV Timeline (SVG milestone chart)   — Step 8
   7. Projects preview (2 cards + VIEW ALL link)  — Step 7
   8. Footer
   
   Header is in App.jsx — NOT here. It persists across all routes. */

import Hero          from '../components/Hero.jsx'
import Ticker        from '../components/Ticker.jsx'
import About         from '../components/About.jsx'
import Experience    from '../components/Experience.jsx'
import Skills        from '../components/Skills.jsx'
import NAVTimeline   from '../components/NAVTimeline.jsx'
import ProjectCard   from '../components/ProjectCard.jsx'
import Footer        from '../components/Footer.jsx'
import { projects }  from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { Link }      from 'react-router-dom'
import '../styles/projects.css'   /* for .projects-preview, .projects-grid, .preview-link */

function Home() {
  const previewRef = useReveal()

  return (
    <main>
      {/* 1. Hero — typewriter headline, count-up stats, CTA buttons */}
      <Hero />

      {/* 2. Ticker — auto-scrolling skill/stat strip */}
      <Ticker />

      {/* 3. About — "Asset Reallocation" two-panel split */}
      <About />

      {/* 4. Experience — work rows, education, certifications */}
      <Experience />

      {/* 5. Skills — Order Book (Bids/Asks) + GitHub calendar */}
      <Skills />

      {/* 6. Career NAV Timeline — SVG line chart */}
      <NAVTimeline />

      {/* 7. Projects preview — 2 cards + link to full /projects page */}
      <section className="projects-preview reveal" ref={previewRef} aria-label="Projects preview">
        <div className="section-label">PROJECTS</div>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="preview-footer">
          <Link to="/projects" className="preview-link">
            VIEW ALL PROJECTS + FLAGSHIP DETAIL →
          </Link>
        </div>
      </section>

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}

export default Home
