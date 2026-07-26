/* NAVTimeline.jsx — Career milestone chart styled like a mutual fund NAV chart (spec §5, §8).
   Implemented as inline SVG: polyline + area fill + milestone dots + labels.
   Real data only — self-taught dev start date omitted (not confirmed by owner).
   
   SVG coordinate system:
   - viewBox: "0 0 700 280"
   - Chart area: x 60–680, y 40–220 (x-axis at y=220, y-axis at x=60)
   - X maps to months elapsed since Jan 2023 (total: 37 months to Feb 2026)
   - Y maps to milestone "career NAV" value (10–100), inverted (SVG y grows down) */

import { navTimeline } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/nav-timeline.css'

/* ── Chart layout constants ── */
const SVG_W   = 700
const SVG_H   = 280
const CHART_X1 = 60    /* left edge of plot area */
const CHART_X2 = 680   /* right edge */
const CHART_Y1 = 40    /* top (max value) */
const CHART_Y2 = 220   /* bottom (zero baseline) */

/* Total time span: Jan 2023 to Feb 2026 = 37 months */
const TOTAL_MONTHS = 37

/* Converts a milestone's month-offset and NAV value to SVG coordinates */
function toSVG(monthOffset, value) {
  const x = CHART_X1 + (monthOffset / TOTAL_MONTHS) * (CHART_X2 - CHART_X1)
  /* Invert Y: higher value = higher on chart (lower SVG y) */
  const y = CHART_Y2 - (value / 110) * (CHART_Y2 - CHART_Y1)
  return { x: Math.round(x), y: Math.round(y) }
}

/* Month-offset from Jan 2023 for each milestone date */
function monthOffset(dateStr) {
  const map = {
    'JAN 2023':  0,
    'SEPT 2023': 8,
    'JUN 2024':  17,
    'AUG 2024':  19,
    'FEB 2025':  25,
    'FEB 2026':  37,
  }
  return map[dateStr] ?? 0
}

/* Pre-compute all SVG points once */
const points = navTimeline.map(m => ({
  ...m,
  ...toSVG(monthOffset(m.date), m.value),
}))

/* Polyline points string */
const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ')

/* Area fill: chart line + drop to baseline + back to start */
const areaPath = [
  `M ${points[0].x} ${points[0].y}`,
  ...points.slice(1).map(p => `L ${p.x} ${p.y}`),
  `L ${points[points.length - 1].x} ${CHART_Y2}`,
  `L ${points[0].x} ${CHART_Y2}`,
  'Z',
].join(' ')

/* Mono font used in SVG text elements — must match tokens.css */
const MONO = "'IBM Plex Mono', monospace"
const AMBER  = '#E8A33D'
const MUTED  = '#8A9098'
const FAINT  = '#5A6169'
const HAIRLINE = '#262B30'

function NAVTimeline() {
  const sectionRef = useReveal()

  return (
    <section className="nav-timeline reveal" ref={sectionRef} aria-label="Career NAV Timeline">
      <div className="section-label">CAREER NAV — TIMELINE</div>
      <h2 className="about__headline" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Milestones
      </h2>
      <p className="nav-timeline__intro">
        Career progression plotted as a NAV chart — every milestone is a real dated event.
        Self-taught dev start date omitted (date not yet confirmed).
      </p>

      <div className="nav-timeline__chart-wrap">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="nav-timeline__svg"
          role="img"
          aria-label="Career NAV timeline chart"
        >
          <defs>
            {/* Gradient fill under the line — amber fade to transparent */}
            <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={AMBER} stopOpacity="0.18" />
              <stop offset="100%" stopColor={AMBER} stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* ── Horizontal grid lines ── */}
          {[25, 50, 75, 100].map(val => {
            const y = CHART_Y2 - (val / 110) * (CHART_Y2 - CHART_Y1)
            return (
              <g key={val}>
                <line
                  x1={CHART_X1} y1={Math.round(y)}
                  x2={CHART_X2} y2={Math.round(y)}
                  stroke={HAIRLINE} strokeWidth="1" strokeDasharray="4 4"
                />
                <text
                  x={CHART_X1 - 8} y={Math.round(y) + 4}
                  fontFamily={MONO} fontSize="9" fill={FAINT} textAnchor="end"
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* ── X-axis baseline ── */}
          <line x1={CHART_X1} y1={CHART_Y2} x2={CHART_X2} y2={CHART_Y2} stroke={HAIRLINE} strokeWidth="1" />

          {/* ── Area fill under the line ── */}
          <path d={areaPath} fill="url(#navGradient)" className="nav-area" />

          {/* ── NAV line (draw-on animation triggered by .revealed class) ── */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke={AMBER}
            strokeWidth="2"
            strokeLinejoin="round"
            className="nav-line"
          />

          {/* ── Milestone dots + labels ── */}
          {points.map((p, i) => {
            /* Alternate label above/below to avoid overlap */
            const labelAbove = i % 2 === 0
            const labelY     = labelAbove ? p.y - 22 : p.y + 32
            const dateY      = labelAbove ? p.y - 10 : p.y + 20

            return (
              <g key={p.date}>
                {/* Dot */}
                <circle
                  cx={p.x} cy={p.y} r="5"
                  className="nav-dot"
                  aria-label={`${p.date}: ${p.label}`}
                />

                {/* Vertical connector to label */}
                <line
                  x1={p.x} y1={labelAbove ? p.y - 6 : p.y + 6}
                  x2={p.x} y2={dateY}
                  stroke={HAIRLINE} strokeWidth="1"
                />

                {/* Date */}
                <text
                  x={p.x} y={dateY + (labelAbove ? -2 : 0)}
                  fontFamily={MONO} fontSize="8.5" fill={FAINT} textAnchor="middle"
                >
                  {p.date}
                </text>

                {/* Milestone label */}
                <text
                  x={p.x} y={labelY}
                  fontFamily={MONO} fontSize="9" fill={MUTED} textAnchor="middle"
                >
                  {p.label.length > 28 ? p.label.slice(0, 28) + '…' : p.label}
                </text>
              </g>
            )
          })}

          {/* Y-axis label */}
          <text
            x={14} y={130}
            fontFamily={MONO} fontSize="9" fill={FAINT}
            transform={`rotate(-90, 14, 130)`} textAnchor="middle"
          >
            CAREER NAV
          </text>
        </svg>
      </div>
    </section>
  )
}

export default NAVTimeline
