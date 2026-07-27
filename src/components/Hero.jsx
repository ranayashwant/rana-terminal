/* Hero.jsx — the first thing visitors see on the home page (route: /).
   Contains:
   1. Typewriter headline — plain React state + setInterval, no library
   2. Subline — static Inter body copy
   3. Count-up stats — requestAnimationFrame loop, no library
   4. CTA buttons — View Projects & GitHub on left, BUY (Hire/Collaborate) on far right */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { heroContent } from '../data/content.js'
import '../styles/hero.css'

/* ── Typewriter speed & count-up duration ── */
const TYPING_SPEED_MS = 42
const COUNTUP_DURATION_MS = 1800

function Hero() {

  /* ── Typewriter state ── */
  const [displayedText, setDisplayedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  /* ── Count-up state ── */
  const [counts, setCounts] = useState(heroContent.stats.map(() => 0))

  /* ── Typewriter effect ── */
  useEffect(() => {
    const full = heroContent.headline
    let index = 0

    const interval = setInterval(() => {
      index++
      setDisplayedText(full.slice(0, index))

      if (index >= full.length) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, TYPING_SPEED_MS)

    return () => clearInterval(interval)
  }, [])

  /* ── Count-up effect ── */
  useEffect(() => {
    const targets = heroContent.stats.map(s => s.value)
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / COUNTUP_DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - rawProgress, 3)

      setCounts(targets.map(target => Math.floor(target * eased)))

      if (rawProgress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCounts(targets)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <section className="hero" aria-label="Introduction">

      {/* ── Headline with typewriter cursor ── */}
      <h1 className="hero__headline">
        <span>{displayedText}</span>
        <span
          className={`hero__cursor${typingDone ? ' hero__cursor--done' : ''}`}
          aria-hidden="true"
        >
          |
        </span>
      </h1>

      {/* ── Subline ── */}
      <p className="hero__subline">{heroContent.subline}</p>

      {/* ── Count-up stats ── */}
      <div className="hero__stats" role="list" aria-label="Key statistics">
        {heroContent.stats.map((stat, i) => (
          <div key={stat.label} className="hero__stat" role="listitem">
            <span className="stat__value" aria-live="off">
              {counts[i].toLocaleString()}{stat.suffix}
            </span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── CTA buttons ── */}
      <div className="hero__cta">

        {/* Left CTA group */}
        <div className="hero__cta-left">
          <a href="#projects" className="btn btn--primary">
            VIEW PROJECTS
          </a>

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

        {/* Far-right primary BUY button */}
        <Link to="/contact" className="btn btn--buy">
          ▲ BUY — HIRE / COLLABORATE ↗
        </Link>

      </div>
    </section>
  )
}

export default Hero
