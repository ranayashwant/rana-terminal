/* GitHubCalendar.jsx — Renders a contribution calendar that matches GitHub's exact spec:
   - Real contribution data fetched from github-contributions-api.jogruber.de (public, no auth)
   - GitHub's exact dark-mode level colours
   - 10×10px cells, 3px gap, 2px border radius
   - Month labels above, Mon/Wed/Fri day labels on the left
   - Loading / error / fallback states
   - Legend (Less → More) at bottom */

import { useState, useEffect } from 'react'

/* ── GitHub's exact dark-mode contribution level colours ──────────────────── */
/* Source: GitHub's own CSS variables for --color-calendar-graph-day-*-bg */
const LEVEL_COLORS = {
  '-1': 'transparent',   /* padding cells after today */
  0:    '#161b22',        /* empty day */
  1:    '#0e4429',        /* 1–9 contributions */
  2:    '#006d32',        /* 10–19 */
  3:    '#26a641',        /* 20–29 */
  4:    '#39d353',        /* 30+ */
}

/* ── GitHub's exact grid dimensions (scaled up for clear visibility) ──────── */
const CELL_SIZE = 11.5 /* px — increased cell size */
const CELL_GAP  = 3.5  /* px — 3.5px gap */
const CELL_STEP = CELL_SIZE + CELL_GAP   /* 15px per cell + gap */

const MONTH_LABEL_H = 22  /* px — row height for month labels at top */
const DAY_LABEL_W   = 32  /* px — column width for Mon/Wed/Fri labels on left */

/* ── Which weekday rows show a label (0 = Sun … 6 = Sat) ─────────────────── */
const DAY_LABELS = { 1: 'Mon', 3: 'Wed', 5: 'Fri' }

/* ── Derive ISO date string without timezone offset issues ────────────────── */
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function GitHubCalendar({ username }) {
  const [weeks,       setWeeks]       = useState([])
  const [monthLabels, setMonthLabels] = useState([])
  const [yearTotal,   setYearTotal]   = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(false)

  useEffect(() => {
    /* Fetch last year's contributions — public endpoint, no API token needed */
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => {
        if (!r.ok) throw new Error('non-2xx')
        return r.json()
      })
      .then(data => {
        /* Build a date → {count, level} lookup map */
        const map = {}
        data.contributions.forEach(c => { map[c.date] = { count: c.count, level: c.level } })

        /* ── Compute the 52-week window ── */
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        /* Start from the Sunday on or before (today − 52 weeks) */
        const windowStart = new Date(today)
        windowStart.setDate(today.getDate() - 52 * 7)
        windowStart.setDate(windowStart.getDate() - windowStart.getDay())  /* back to Sunday */

        /* ── Walk day-by-day, grouping into weeks (Sun–Sat) ── */
        const allWeeks = []
        const current  = new Date(windowStart)
        let week       = []

        while (current <= today || week.length > 0) {
          if (current > today) {
            /* Pad remaining days of the final week with transparent cells */
            while (week.length < 7) week.push({ date: null, count: 0, level: -1 })
            allWeeks.push(week)
            break
          }

          const ds     = toDateStr(current)
          const contrib = map[ds]
          week.push({ date: ds, count: contrib?.count ?? 0, level: contrib?.level ?? 0 })

          if (current.getDay() === 6) {  /* Saturday — end of week */
            allWeeks.push(week)
            week = []
          }

          current.setDate(current.getDate() + 1)
        }

        /* Handle case where today is not a Saturday (final partial week) */
        if (week.length > 0) {
          while (week.length < 7) week.push({ date: null, count: 0, level: -1 })
          allWeeks.push(week)
        }

        /* ── Compute month label positions ── */
        const labels  = []
        let lastMonth = -1
        allWeeks.forEach((wk, wi) => {
          const firstReal = wk.find(d => d.date)
          if (!firstReal) return
          const d     = new Date(firstReal.date)
          const month = d.getMonth()
          if (month !== lastMonth) {
            labels.push({
              name:      d.toLocaleString('en-US', { month: 'short' }),
              weekIndex: wi,
            })
            lastMonth = month
          }
        })

        /* ── Year total — current calendar year ── */
        const thisYear = new Date().getFullYear()
        const total    = typeof data.total === 'object'
          ? (data.total[thisYear] ?? data.total['lastYear'] ?? null)
          : null

        setWeeks(allWeeks)
        setMonthLabels(labels)
        setYearTotal(total)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [username])

  /* ── Loading / error states ── */
  if (loading) {
    return (
      <div className="gh-cal-loading" aria-label="Loading contribution calendar">
        <span className="gh-cal-status-text">LOADING CONTRIBUTIONS...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gh-cal-error">
        <span className="gh-cal-status-text">
          CALENDAR UNAVAILABLE —{' '}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-cal-fallback-link"
          >
            VIEW ON GITHUB ↗
          </a>
        </span>
      </div>
    )
  }

  /* ── SVG dimensions ── */
  const svgW = DAY_LABEL_W + weeks.length * CELL_STEP
  const svgH = MONTH_LABEL_H + 7 * CELL_STEP

  return (
    <div className="gh-cal-wrap">
      {/* ── Total contributions badge + Legend Header ── */}
      <div className="gh-cal-header">
        {yearTotal !== null && (
          <div className="gh-cal-total">
            <span className="gh-cal-total-count">{yearTotal.toLocaleString()}</span>
            <span className="gh-cal-total-label">CONTRIBUTIONS THIS YEAR</span>
          </div>
        )}

        {/* ── Legend ── */}
        <div className="gh-cal-legend" aria-label="Contribution level legend">
          <span className="gh-legend-label">Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <svg key={level} width={CELL_SIZE} height={CELL_SIZE} style={{ flexShrink: 0 }}>
              <rect
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={2}
                ry={2}
                fill={LEVEL_COLORS[level]}
              />
            </svg>
          ))}
          <span className="gh-legend-label">More</span>
        </div>
      </div>

      {/* ── Calendar SVG ── */}
      <div className="gh-cal-scroll" aria-label="GitHub contribution calendar">
        <svg
          width={svgW}
          height={svgH}
          style={{ display: 'block', overflow: 'visible' }}
          role="img"
          aria-label={`GitHub contribution calendar for ${username}`}
        >
          {/* Month labels */}
          {monthLabels.map(({ name, weekIndex }, i) => (
            <text
              key={`${name}-${i}`}
              x={DAY_LABEL_W + weekIndex * CELL_STEP}
              y={13}
              fontSize="10"
              fontFamily="'IBM Plex Mono', monospace"
              fill="#8A9098"
              letterSpacing="0.5"
            >
              {name}
            </text>
          ))}

          {/* Day-of-week labels — Mon, Wed, Fri only */}
          {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
            const label = DAY_LABELS[dayIndex]
            if (!label) return null
            return (
              <text
                key={dayIndex}
                x={0}
                y={MONTH_LABEL_H + dayIndex * CELL_STEP + CELL_SIZE - 1}
                fontSize="9.5"
                fontFamily="'IBM Plex Mono', monospace"
                fill="#5A6169"
              >
                {label}
              </text>
            )
          })}

          {/* Contribution cells */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const fill = LEVEL_COLORS[day.level]
              if (fill === 'transparent') {
                return (
                  <rect
                    key={`${wi}-${di}`}
                    x={DAY_LABEL_W + wi * CELL_STEP}
                    y={MONTH_LABEL_H + di * CELL_STEP}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    rx={2}
                    ry={2}
                    fill="none"
                  />
                )
              }
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={DAY_LABEL_W + wi * CELL_STEP}
                  y={MONTH_LABEL_H + di * CELL_STEP}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  ry={2}
                  fill={fill}
                >
                  {day.date && (
                    <title>
                      {day.count} contribution{day.count !== 1 ? 's' : ''} on {day.date}
                    </title>
                  )}
                </rect>
              )
            })
          )}
        </svg>
      </div>
    </div>
  )
}

export default GitHubCalendar
