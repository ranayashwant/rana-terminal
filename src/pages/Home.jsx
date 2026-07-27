/* Home.jsx — / route. Single page experience with merged Projects section.
   
   Section order:
   1. Hero (typewriter + count-up stats + CTAs)
   2. Ticker strip (auto-scroll stats)
   3. About ("Asset Reallocation" two panels)
   4. Experience (work rows + education + certs)
   5. Projects (Flagship MFSC + Flagship SLTC Detail) — anchored #projects
   6. Skills (Order Book + live GitHub calendar API)
   7. Career NAV Timeline (SVG milestone chart)
   8. Footer */

import Hero          from '../components/Hero.jsx'
import Ticker        from '../components/Ticker.jsx'
import About         from '../components/About.jsx'
import Experience    from '../components/Experience.jsx'
import MFScreener    from '../components/MFScreener.jsx'
import SLTCDetail    from '../components/SLTCDetail.jsx'
import Skills        from '../components/Skills.jsx'
import NAVTimeline   from '../components/NAVTimeline.jsx'
import TradeTicket    from '../components/TradeTicket.jsx'
import Footer        from '../components/Footer.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import '../styles/projects.css'

function Home() {
  useDocumentTitle('Rana Yashwant — Software & Fintech Engineer')
  const projectsRef = useReveal()

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

      {/* 5. Projects — Flagship MFSC + Flagship SLTC Detail (placed right after Experience) */}
      <section id="projects" className="projects-section reveal" ref={projectsRef} aria-label="Featured Projects">
        <div className="section-label">PROJECTS — FEATURED WORK</div>
        
        {/* MF Screener (MFSC) Flagship Section */}
        <MFScreener />

        {/* Sign Language to Text (SLTC) Flagship Section */}
        <div style={{ marginTop: '2.5rem' }}>
          <SLTCDetail />
        </div>
      </section>

      {/* 6. Skills — Order Book (Bids/Asks) + live GitHub calendar API */}
      <Skills />

      {/* 7. Career NAV Timeline — SVG line chart */}
      <NAVTimeline />

      {/* 8. Initiate Contact — Place an Order trade ticket */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 2rem' }}>
        <TradeTicket isContactPage={false} />
      </div>

      {/* 9. Footer */}
      <Footer />
    </main>
  )
}

export default Home
