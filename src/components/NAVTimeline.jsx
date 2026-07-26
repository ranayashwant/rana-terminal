/* NAVTimeline.jsx — Clean, un-clustered Career NAV milestone timeline.
   Custom layout offsets and leader lines prevent any overlapping between close dates. */

import { navTimeline } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/nav-timeline.css'

/* ── Chart layout constants ── */
const SVG_W    = 920
const SVG_H    = 380
const CHART_X1 = 70     /* left edge of plot area */
const CHART_X2 = 850    /* right edge */
const CHART_Y1 = 50     /* top (max value) */
const CHART_Y2 = 300    /* bottom (zero baseline) */

/* Total time span: Jan 2023 to Feb 2026 = 37 months */
const TOTAL_MONTHS = 37

/* Converts a milestone's month-offset and NAV value to SVG coordinates */
function toSVG(monthOffset, value) {
  const x = CHART_X1 + (monthOffset / TOTAL_MONTHS) * (CHART_X2 - CHART_X1)
  const y = CHART_Y2 - (value / 110) * (CHART_Y2 - CHART_Y1)
  return { x: Math.round(x), y: Math.round(y) }
}

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

/* Custom label layout parameters per milestone index to guarantee zero overlap */
const LABEL_CONFIGS = [
  { anchor: 'start',  dx: 0,   dyDate: -24, dyText: -38, side: 'above' }, /* JAN 2023 */
  { anchor: 'middle', dx: 0,   dyDate: 22,  dyText: 36,  side: 'below' }, /* SEPT 2023 */
  { anchor: 'end',    dx: -16, dyDate: -42, dyText: -56, side: 'above' }, /* JUN 2024 — high offset left */
  { anchor: 'start',  dx: 16,  dyDate: 35,  dyText: 49,  side: 'below' }, /* AUG 2024 — low offset right */
  { anchor: 'middle', dx: 0,   dyDate: -26, dyText: -40, side: 'above' }, /* FEB 2025 */
  { anchor: 'end',    dx: -10, dyDate: 22,  dyText: 36,  side: 'below' }, /* FEB 2026 */
]

const points = navTimeline.map((m, i) => {
  const coords = toSVG(monthOffset(m.date), m.value)
  return {
    ...m,
    ...coords,
    config: LABEL_CONFIGS[i] || { anchor: 'middle', dx: 0, dyDate: -20, dyText: -34, side: 'above' },
  }
})

const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ')

const areaPath = [
  `M ${points[0].x} ${points[0].y}`,
  ...points.slice(1).map(p => `L ${p.x} ${p.y}`),
  `L ${points[points.length - 1].x} ${CHART_Y2}`,
  `L ${points[0].x} ${CHART_Y2}`,
  'Z',
].join(' ')

const MONO = "'IBM Plex Mono', monospace"
const AMBER    = '#E8A33D'
const MUTED    = '#A0A7B0'
const FAINT    = '#5A6169'
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
      </p>

      <div className="nav-timeline__chart-wrap">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="nav-timeline__svg"
          role="img"
          aria-label="Career NAV timeline chart"
        >
          <defs>
            <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={AMBER} stopOpacity="0.22" />
              <stop offset="100%" stopColor={AMBER} stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* ── Grid lines & Y-axis ticks ── */}
          {[25, 50, 75, 100].map(val => {
            const y = CHART_Y2 - (val / 110) * (CHART_Y2 - CHART_Y1)
            return (
              <g key={val}>
                <line
                  x1={CHART_X1} y1={Math.round(y)}
                  x2={CHART_X2} y2={Math.round(y)}
                  stroke={HAIRLINE} strokeWidth="1" strokeDasharray="3 3"
                />
                <text
                  x={CHART_X1 - 10} y={Math.round(y) + 4}
                  fontFamily={MONO} fontSize="10" fill={FAINT} textAnchor="end"
                >
                  {val}
                </text>
              </g>
            )
          })}

          {/* ── Baseline ── */}
          <line x1={CHART_X1} y1={CHART_Y2} x2={CHART_X2} y2={CHART_Y2} stroke={HAIRLINE} strokeWidth="1" />

          {/* ── Gradient area under line ── */}
          <path d={areaPath} fill="url(#navGradient)" className="nav-area" />

          {/* ── Polyline chart ── */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke={AMBER}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="nav-line"
          />

          {/* ── Milestone nodes & callouts ── */}
          {points.map((p) => {
            const { anchor, dx, dyDate, dyText, side } = p.config
            const targetY = side === 'above' ? p.y + dyText - 4 : p.y + dyText + 4

            return (
              <g key={p.date} className="nav-node-group">
                {/* Connector line from node to callout */}
                <line
                  x1={p.x} y1={p.y}
                  x2={p.x + dx} y2={targetY}
                  stroke="rgba(232, 163, 61, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Node circle */}
                <circle
                  cx={p.x} cy={p.y} r="5"
                  className="nav-dot"
                  aria-label={`${p.date}: ${p.label}`}
                />

                {/* Date Label */}
                <text
                  x={p.x + dx} y={p.y + dyDate}
                  fontFamily={MONO} fontSize="9.5" fontWeight="600" fill={AMBER} textAnchor={anchor}
                  letterSpacing="0.06em"
                >
                  {p.date}
                </text>

                {/* Milestone Description Label */}
                <text
                  x={p.x + dx} y={p.y + dyText}
                  fontFamily={MONO} fontSize="10" fill={MUTED} textAnchor={anchor}
                >
                  {p.label}
                </text>
              </g>
            )
          })}

          {/* Y-axis Title */}
          <text
            x={18} y={175}
            fontFamily={MONO} fontSize="10" fill={FAINT} letterSpacing="0.12em"
            transform={`rotate(-90, 18, 175)`} textAnchor="middle"
          >
            CAREER NAV INDEX
          </text>
        </svg>
      </div>
    </section>
  )
}

export default NAVTimeline
