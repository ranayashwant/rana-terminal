/* ProjectCard.jsx — window-chrome project card (spec §3.2).
   
   Window chrome: three dots (close/minimize/maximize) + mono fake file path.
   Screenshot area: 16:10 aspect-ratio, object-fit cover (or placeholder if no img).
   Hover: metrics row slides up from bottom.
   No device-frame mockups — just the window-chrome wrapper (spec §7). */

import '../styles/projects.css'

function ProjectCard({ project }) {
  const { ticker, name, pitch, stack, metrics, github, live } = project

  /* Fake file path used in the window chrome tab — mimics code-editor appearance */
  const chromePath = `~/projects/${ticker.toLowerCase()}/preview`

  return (
    <article className="project-card" aria-label={`${ticker} — ${name}`}>

      {/* ── Window chrome bar ── */}
      <div className="card-chrome" aria-hidden="true">
        <div className="chrome-dots">
          <span className="chrome-dot chrome-dot--red"   />
          <span className="chrome-dot chrome-dot--amber" />
          <span className="chrome-dot chrome-dot--green" />
        </div>
        <span className="chrome-path">{chromePath}</span>
      </div>

      {/* ── Screenshot area (16:10) ── */}
      {/* No screenshots available yet — placeholder until real PNGs are dropped in.
          When adding a screenshot: replace the div with
          <img src="/screenshots/mfsc.png" alt="..." className="..." /> */}
      <div className="card-screenshot">
        <div className="card-screenshot-placeholder">
          <span className="placeholder-ticker">{ticker}</span>
          <span className="placeholder-name">screenshot pending</span>
        </div>
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
        {/* GitHub — always present */}
        <a
          href={github}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source code on GitHub`}
        >
          SOURCE ↗
        </a>

        {/* Live demo — only rendered if a URL exists (spec: omit if null) */}
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
    </article>
  )
}

export default ProjectCard
