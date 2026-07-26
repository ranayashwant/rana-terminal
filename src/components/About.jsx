/* About.jsx — "Asset Reallocation" section (spec §3.1).
   MFD → SWE career story. Two panels: Fundamental Analysis (domain) on the left,
   Technical Analysis (engineering) on the right. Uses IntersectionObserver 
   to dim the finance panel and brighten the tech panel as the section enters view. */

import { useRef, useEffect } from 'react'
import { aboutContent } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/about.css'

function About() {
  const sectionRef = useReveal()  /* fade-up on scroll entry */
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  /* Dim the finance panel and brighten the tech panel when section enters view.
     Simple one-time toggle — more theatrical cross-fade is deferred to Step 11 GSAP pass. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* After a short delay, start the dim — finance → engineering pivot visual */
          setTimeout(() => {
            if (leftRef.current)  leftRef.current.classList.add('about__panel--dim')
          }, 600)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section className="about reveal" ref={sectionRef} aria-label="About — Asset Reallocation">
      <div className="section-label">ABOUT — ASSET REALLOCATION</div>

      <h2 className="about__headline">{aboutContent.headline}</h2>
      <p className="about__subline">{aboutContent.subline}</p>

      <div className="about__panels">

        {/* Left panel — Fundamental Analysis (finance/domain side) */}
        <div className="about__panel about__panel--left" ref={leftRef}>
          <div className="panel-label">{aboutContent.fundamentalAnalysis.label}</div>
          <div className="panel-subtitle">{aboutContent.fundamentalAnalysis.subtitle}</div>

          {aboutContent.fundamentalAnalysis.points.map(({ stat, desc }) => (
            <div key={stat} className="about__metric">
              <span className="metric-stat">{stat}</span>
              <span className="metric-desc">{desc}</span>
            </div>
          ))}
        </div>

        {/* Arrow divider — visually signals the direction of the career move */}
        <div className="about__divider" aria-hidden="true">→</div>

        {/* Right panel — Technical Analysis (engineering side) */}
        <div className="about__panel about__panel--right" ref={rightRef}>
          <div className="panel-label">{aboutContent.technicalAnalysis.label}</div>
          <div className="panel-subtitle">{aboutContent.technicalAnalysis.subtitle}</div>

          {aboutContent.technicalAnalysis.points.map(({ stat, desc }) => (
            <div key={stat} className="about__metric">
              <span className="metric-stat">{stat}</span>
              <span className="metric-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
