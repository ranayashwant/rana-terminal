/* Skills.jsx — "Order Book" skill depth display (spec §3.1, §5 sig-element #7).
   Left column = Bids (proficient). Right column = Asks (currently learning).
   Each row has a depth bar behind it set via CSS custom property --skill-level.
   GitHub contribution calendar is embedded below the order book via ghchart.rshah.org. */

import { skills, contactInfo } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/skills.css'

/* ── OrderColumn — renders one side (Bids or Asks) of the order book ── */
function OrderColumn({ side, label, items, isAsks }) {
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
            /* --skill-level drives the depth-bar width via CSS pseudo-element */
            style={{ '--skill-level': skill.level }}
          >
            <span className="skill-name">{skill.name}</span>
            <span className="skill-level">{skill.level}%</span>
          </div>
        ))}

        {/* Placeholder warning — only on the Asks column. Confirm with owner before launch. */}
        {isAsks && (
          <p className="skill-placeholder-note">
            ⚠ Placeholder — confirm with Rana before final launch
          </p>
        )}
      </div>
    </div>
  )
}

function Skills() {
  const sectionRef = useReveal()

  return (
    <section className="skills reveal" ref={sectionRef} aria-label="Skills Order Book">
      <div className="section-label">SKILLS — ORDER BOOK</div>

      {/* Two-column order book — Bids (proficient) | Asks (acquiring) */}
      <div className="skills__book" role="table" aria-label="Skill depth table">
        <OrderColumn
          side="bids"
          label="PROFICIENT STACK"
          items={skills.bids}
          isAsks={false}
        />
        <OrderColumn
          side="asks"
          label="ACQUIRING"
          items={skills.asks}
          isAsks={true}
        />
      </div>

      {/* GitHub contribution calendar — real data via ghchart.rshah.org.
          Color 39d353 = GitHub's level-4 green (dark mode) — the service auto-generates
          all 5 intensity shades from this base, matching GitHub's real green palette.
          Shades produced: ~0e4429 → 196430 → 26a641 → 30c956 → 39d353 (dark to bright) */}
      <div className="skills__calendar">
        <div className="calendar-label">GITHUB CONTRIBUTION CALENDAR · @{contactInfo.github.split('/').pop()}</div>
        <img
          src={`https://ghchart.rshah.org/39d353/${contactInfo.github.split('/').pop()}`}
          alt={`GitHub contribution calendar for ${contactInfo.github.split('/').pop()}`}
          className="github-calendar"
          loading="lazy"
        />
        <a
          href={contactInfo.github}
          className="calendar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW GITHUB PROFILE ↗
        </a>
      </div>
    </section>
  )
}

export default Skills
