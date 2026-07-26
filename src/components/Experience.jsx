/* Experience.jsx — Work experience rows, education, certifications (spec §3.1).
   Rows stagger in on scroll using CSS delay classes + a single section-level observer.
   Rules of Hooks: no hooks inside loops — stagger is achieved with CSS delay only. */

import { experience, education, certifications } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/experience.css'

/* Maps status string → CSS modifier for the status dot */
function statusClass(status) {
  if (status === 'active')   return 'exp-dot--active'
  if (status === 'progress') return 'exp-dot--progress'
  return 'exp-dot--completed'
}

function Experience() {
  /* One observer for the whole section — rows stagger via CSS delay classes */
  const sectionRef = useReveal()

  return (
    <section className="experience reveal" ref={sectionRef} aria-label="Experience">
      <div className="section-label">EXPERIENCE</div>

      {/* Work experience rows — each gets a stagger delay via CSS class */}
      {experience.map((job, i) => (
        <article
          key={job.id}
          className={`exp-row reveal reveal--d${Math.min(i + 1, 6)}`}
          aria-label={job.title}
        >
          {/* Left column: period */}
          <div className="exp-period">{job.period}</div>

          {/* Right column: all content */}
          <div className="exp-content">
            <div className="exp-header">
              <div>
                <div className="exp-title">{job.title}</div>
                <div className="exp-org">{job.org}</div>
              </div>
              <div className="exp-tag-group">
                <span
                  className={`exp-dot ${statusClass(job.status)}`}
                  aria-label={`Status: ${job.status}`}
                />
                <span className="exp-tag">{job.tag}</span>
              </div>
            </div>

            <ul className="exp-bullets">
              {job.bullets.map((bullet, bi) => (
                <li key={bi} className="exp-bullet">{bullet}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}

      {/* ── Education ── */}
      <div className="section-label" style={{ marginTop: '3rem' }}>EDUCATION</div>

      {education.map((edu) => (
        <article key={edu.degree} className="exp-row">
          <div className="exp-period">{edu.period}</div>
          <div className="exp-content">
            <div className="exp-header">
              <div>
                <div className="exp-title">{edu.degree}</div>
                <div className="exp-org">{edu.institution}</div>
              </div>
              <div className="exp-tag-group">
                <span className="exp-tag">{edu.score}</span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* ── Certifications ── */}
      <div className="section-label" style={{ marginTop: '3rem' }}>CERTIFICATIONS</div>

      <div className="exp-certs">
        {certifications.map(cert => (
          <div key={cert.badge} className="exp-cert-row">
            <span className="cert-badge">{cert.badge}</span>
            <div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
