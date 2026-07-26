/* Hero.jsx — the first thing visitors see on the home page (route: /).
   Contains:
   1. Typewriter headline — plain React state + setInterval, no library
   2. Subline — static Inter body copy
   3. Count-up stats — requestAnimationFrame loop, no library
   4. CTA buttons — View Projects, Download Prospectus, GitHub */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { heroContent } from '../data/content.js'
import '../styles/hero.css'

/* ── Typewriter speed & count-up duration ── */
const TYPING_SPEED_MS = 42    /* ms per character — fast enough to feel snappy, not rushed */
const COUNTUP_DURATION_MS = 1800  /* ms total for all stats to count up */

function Hero() {

  /* ── Typewriter state ──────────────────────────────────────────────────── */
  /* displayedText: the portion of the headline revealed so far */
  const [displayedText, setDisplayedText] = useState('')
  /* typingDone: true once the last character is typed — dims the cursor */
  const [typingDone, setTypingDone] = useState(false)

  /* ── Count-up state ────────────────────────────────────────────────────── */
  /* counts: array matching heroContent.stats, starts at all-zeros,
     animates to each stat's real value on mount */
  const [counts, setCounts] = useState(heroContent.stats.map(() => 0))

  /* ── Typewriter effect ─────────────────────────────────────────────────── */
  useEffect(() => {
    const full = heroContent.headline
    let index = 0

    /* setInterval fires every TYPING_SPEED_MS ms.
       Each tick slices one more character off the full string. */
    const interval = setInterval(() => {
      index++
      setDisplayedText(full.slice(0, index))

      /* Once we've revealed every character, stop the interval and signal done */
      if (index >= full.length) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, TYPING_SPEED_MS)

    /* Cleanup: if Home unmounts while typing (user navigates away), cancel
       the interval so it doesn't try to call setState on an unmounted component */
    return () => clearInterval(interval)
  }, []) /* [] = run once on mount, never re-run */

  /* ── Count-up effect ───────────────────────────────────────────────────── */
  useEffect(() => {
    const targets = heroContent.stats.map(s => s.value)
    const startTime = performance.now()

    /* requestAnimationFrame loop — runs each animation frame (~60fps).
       We calculate elapsed time and derive a 0→1 progress value each frame,
       apply an ease-out curve so it decelerates near the end (feels natural),
       then map that progress back to each stat's integer value. */
    function tick(now) {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / COUNTUP_DURATION_MS, 1) /* clamp to [0, 1] */

      /* Ease-out cubic: progress decelerates as it approaches 1.
         Formula: 1 - (1 - t)^3  produces a smooth slowdown. */
      const eased = 1 - Math.pow(1 - rawProgress, 3)

      /* Update all stat counts simultaneously in one setState call —
         batching prevents multiple re-renders per frame */
      setCounts(targets.map(target => Math.floor(target * eased)))

      if (rawProgress < 1) {
        /* Not done — schedule another frame */
        requestAnimationFrame(tick)
      } else {
        /* Snap to exact final values on the last frame — floor() could leave them 1 short */
        setCounts(targets)
      }
    }

    requestAnimationFrame(tick)
    /* No cleanup needed — rAF stops naturally when rawProgress reaches 1 */
  }, []) /* [] = run once on mount */

  return (
    <section className="hero" aria-label="Introduction">

      {/* ── Headline with typewriter cursor ── */}
      {/* h1: one per page — this is the primary heading for the Home page */}
      <h1 className="hero__headline">
        <span>{displayedText}</span>
        {/* Cursor: always rendered but fades when typing is done via --done class.
            aria-hidden: screen readers don't need to hear "|" read out loud */}
        <span
          className={`hero__cursor${typingDone ? ' hero__cursor--done' : ''}`}
          aria-hidden="true"
        >
          |
        </span>
      </h1>

      {/* ── Subline — Inter, comfortable reading width ── */}
      <p className="hero__subline">{heroContent.subline}</p>

      {/* ── Count-up stats ── */}
      {/* role="list" on <dl> equivalent — using plain divs for simplicity here */}
      <div className="hero__stats" role="list" aria-label="Key statistics">
        {heroContent.stats.map((stat, i) => (
          <div key={stat.label} className="hero__stat" role="listitem">
            {/* The animated value — mono, amber, large (spec §1.2: numbers → Plex Mono) */}
            <span className="stat__value" aria-live="off">
              {/* toLocaleString adds commas (11,000+) — important for readability at 4+ digits */}
              {counts[i].toLocaleString()}{stat.suffix}
            </span>
            {/* Label — uppercase mono caption, letter-spaced (ticker-tape style, spec §1.3) */}
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── CTA buttons ── */}
      {/* Three actions per spec §3.1: internal link, PDF download, external GitHub */}
      <div className="hero__cta">

        {/* Internal link — React Router <Link> for no page reload */}
        <Link to={heroContent.cta.projects} className="btn btn--primary">
          VIEW PROJECTS
        </Link>

        {/* PDF download — plain <a> tag (not React Router Link) because it targets
            a static file in /public, not a React route.
            'download' attribute prompts Save-As dialog instead of opening in tab. */}
        <a
          href={heroContent.cta.resume}
          className="btn btn--outline"
          download
        >
          DOWNLOAD PROSPECTUS
        </a>

        {/* External link — opens in new tab.
            rel="noopener noreferrer": security best practice for target="_blank" —
            prevents the new tab from accessing window.opener on this site. */}
        <a
          href={heroContent.cta.github}
          className="btn btn--outline"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
        >
          GITHUB ↗
        </a>

      </div>
    </section>
  )
}

export default Hero
