/* Resume.jsx — /resume route (spec §3.4).
   Terminal-boot animation on load:
   1. Lines print one-by-one (setInterval, 600ms per line)
   2. When done: '[ DOWNLOAD ]' button fades in
   
   resume.pdf must be placed in /public/ before the download button works.
   If the file isn't there yet, the browser will show a 404 on click — 
   intentional placeholder until the real PDF is dropped in (Step 13). */

import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import Footer from '../components/Footer.jsx'
import '../styles/resume.css'

/* Boot sequence lines — typed out one per tick */
const BOOT_LINES = [
  { text: '> system init...',                type: 'prompt' },
  { text: '✓ authenticated: rana_yashwant',  type: 'ok'     },
  { text: '> loading resume file...',        type: 'prompt' },
  { text: 'seeking /public/RANA YASHWANT SINGH Resume.pdf...', type: 'info' },
  { text: '✓ file located — 1 page',         type: 'ok'     },
  { text: '> decrypting contents...',        type: 'prompt' },
  { text: 'B.Tech ECE · NISM V-A · GATE CSE 2026', type: 'info' },
  { text: 'MFD 2023–2025 · ₹40L AUM · 100% retention', type: 'info' },
  { text: 'MF Screener · Sign Lang. CNN',    type: 'info'   },
  { text: '✓ resume ready for download',     type: 'ok'     },
]

const LINE_INTERVAL_MS  = 420   /* ms between each new boot line */
const DOWNLOAD_DELAY_MS = 320   /* small pause after last line before button appears */

function Resume() {
  const sectionRef = useReveal()

  /* visibleCount: how many boot lines are currently shown */
  const [visibleCount, setVisibleCount]   = useState(0)
  /* showDownload: controls the fade-in of the download button */
  const [showDownload, setShowDownload]   = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    /* Print one line per interval tick */
    timerRef.current = setInterval(() => {
      setVisibleCount(prev => {
        const next = prev + 1
        if (next >= BOOT_LINES.length) {
          /* All lines printed — clear interval and show download button */
          clearInterval(timerRef.current)
          setTimeout(() => setShowDownload(true), DOWNLOAD_DELAY_MS)
        }
        return next
      })
    }, LINE_INTERVAL_MS)

    /* Cleanup: stop interval if user navigates away before animation completes */
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <main>
      <div className="resume-page">
        <div className="section-label">RESUME</div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '2rem',
            marginTop: '0.5rem',
          }}
        >
          Rana Yashwant Singh
        </h1>

        {/* Terminal boot window */}
        <div className="resume-terminal" ref={sectionRef} aria-live="polite" aria-label="Resume loading terminal">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={`terminal-line terminal-line--${line.type}`}
            >
              {line.text}
            </div>
          ))}

          {/* Blinking block cursor — only shown while still printing */}
          {visibleCount < BOOT_LINES.length && (
            <div className="terminal-line terminal-line--prompt">
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Download button — fades in after boot completes */}
        <div className={`resume-download-wrap ${showDownload ? 'visible' : ''}`}>
          {/* Plain <a> tag — not React Router Link — targets a static file in /public/ */}
          <a
            href="/RANA%20YASHWANT%20SINGH%20Resume.pdf"
            className="resume-download-btn"
            download="RANA_YASHWANT_SINGH_Resume.pdf"
            aria-label="Download resume as PDF"
          >
            {'> '}[ DOWNLOAD RESUME.PDF ]
          </a>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Resume
