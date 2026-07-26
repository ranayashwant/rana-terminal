/* Skills.jsx — "Order Book" skill depth display (spec §3.1, §5 sig-element #7).
   Left column = Bids (proficient). Right column = Asks (currently learning).
   Each row has a depth bar behind it set via CSS custom property --skill-level.
   Uses defensible skill status badges instead of fabricated percentages per Spec §0.
   Embedded GitHub contribution calendar fetches real-time data directly from GitHub's REST API. */

import { skills, contactInfo } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import GitHubCalendar from './GitHubCalendar.jsx'
import '../styles/skills.css'

/* ── OrderColumn — renders one side (Bids or Asks) of the order book ── */
function OrderColumn({ side, label, items }) {
  return (
    <div className={`order-col order-col--${side}`}>
      {/* Column header */}
      <div className="order-col__header">
        <span className="order-col__label">{label}</span>
        <span className="order-col__side">{side.toUpperCase()}</span>
      </div>

      {/* Skill rows */}
      <div className="order-rows">
        {items.map(skill => (
          <div
            key={skill.name}
            className="skill-row"
            style={{ '--skill-level': skill.depth }}
          >
            <span className="skill-name">{skill.name}</span>
            {/* Real defensible status tag instead of arbitrary % numbers */}
            <span className="skill-level">{skill.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const sectionRef = useReveal()
  const githubUser = contactInfo.github.split('/').pop()

  return (
    <section className="skills reveal" ref={sectionRef} aria-label="Skills Order Book">
      <div className="section-label">SKILLS — ORDER BOOK</div>

      {/* Two-column order book — Bids (proficient) | Asks (acquiring) */}
      <div className="skills__book" role="table" aria-label="Skill depth table">
        <OrderColumn
          side="bids"
          label="PROFICIENT STACK"
          items={skills.bids}
        />
        <OrderColumn
          side="asks"
          label="ACQUIRING / LEARNING"
          items={skills.asks}
        />
      </div>

      {/* GitHub contribution calendar — real live API component */}
      <div className="skills__calendar">
        <div className="calendar-label">
          <span className="live-api-dot" /> LIVE GITHUB CONTRIBUTION API · @{githubUser}
        </div>
        <GitHubCalendar username={githubUser} />
        <a
          href={contactInfo.github}
          className="calendar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW REAL-TIME PROFILE ON GITHUB.COM ↗
        </a>
      </div>
    </section>
  )
}

export default Skills
