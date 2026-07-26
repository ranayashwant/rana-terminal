/* ProjectCard.jsx — window-chrome project card (spec §3.2).
   
   Window chrome: three dots + mono fake file path + top-right SCREENSHOT modal trigger button.
   Screenshot area: 16:10 aspect-ratio with real image.
   Hover: metrics row slides up from bottom. */

import { useState } from 'react'
import '../styles/projects.css'

function ProjectCard({ project }) {
  const { ticker, name, pitch, stack, metrics, github, live, image } = project
  const [showModal, setShowModal] = useState(false)

  /* Fake file path used in the window chrome tab — mimics code-editor appearance */
  const chromePath = `~/projects/${ticker.toLowerCase()}/preview`

  return (
    <article className="project-card" aria-label={`${ticker} — ${name}`}>

      {/* ── Window chrome bar ── */}
      <div className="card-chrome">
        <div className="chrome-dots" aria-hidden="true">
          <span className="chrome-dot chrome-dot--red"   />
          <span className="chrome-dot chrome-dot--amber" />
          <span className="chrome-dot chrome-dot--green" />
        </div>
        <span className="chrome-path">{chromePath}</span>

        {/* Top-Right Screenshot Modal Button */}
        {image && (
          <button
            onClick={() => setShowModal(true)}
            className="chrome-screenshot-btn"
            title="View full project screenshot"
          >
            📷 [ SCREENSHOT ↗ ]
          </button>
        )}
      </div>

      {/* ── Screenshot area (16:10) ── */}
      <div className="card-screenshot" onClick={() => image && setShowModal(true)}>
        {image ? (
          <img
            src={image}
            alt={`${name} preview`}
            className="card-screenshot-img"
            loading="lazy"
          />
        ) : (
          <div className="card-screenshot-placeholder">
            <span className="placeholder-ticker">{ticker}</span>
            <span className="placeholder-name">screenshot pending</span>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="card-body">
        <div className="card-ticker">{ticker}</div>
        <div className="card-name">{name}</div>
        <p className="card-pitch">{pitch}</p>

        {/* Stack tags — mono pills */}
        <div className="card-stack" aria-label="Tech stack">
          {stack.map(tech => (
            <span key={tech} className="stack-tag">{tech}</span>
          ))}
        </div>
      </div>

      {/* ── Metrics row — hidden, slides in on hover ── */}
      <div className="card-metrics" aria-label="Project metrics">
        {metrics.map(({ label, value }) => (
          <div key={label} className="card-metric">
            <span className="metric-label">{label}</span>
            <span className="metric-value">{value}</span>
          </div>
        ))}
      </div>

      {/* ── Links ── */}
      <div className="card-links">
        <a
          href={github}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source code on GitHub`}
        >
          SOURCE ↗
        </a>

        {image && (
          <button
            onClick={() => setShowModal(true)}
            className="card-link"
            style={{ cursor: 'pointer' }}
          >
            SCREENSHOT ↗
          </button>
        )}

        {live && (
          <a
            href={live}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} live demo`}
          >
            LIVE DEMO ↗
          </a>
        )}
      </div>

      {/* ── Screenshot Full View Modal ── */}
      {showModal && image && (
        <div className="screenshot-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="screenshot-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{ticker} — {name} PREVIEW</span>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>[ CLOSE ✕ ]</button>
            </div>
            <img src={image} alt={`${name} full resolution preview`} className="modal-full-img" />
          </div>
        </div>
      )}
    </article>
  )
}

export default ProjectCard
