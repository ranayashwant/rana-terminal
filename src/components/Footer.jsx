/* Footer.jsx — site-wide footer (spec §3.1) with copy-to-clipboard email link. */

import { useState } from 'react'
import { contactInfo } from '../data/content.js'
import '../styles/footer.css'

function Footer() {
  const [copied, setCopied] = useState(false)

  function handleCopyEmail(e) {
    e.preventDefault()
    navigator.clipboard.writeText(contactInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <div className="footer-outer">
      <footer className="footer">
        <span className="footer__text">
          BUILT BY RANA YASHWANT · {new Date().getFullYear()}
        </span>

        <nav className="footer__links" aria-label="Footer links">
          <a
            href={contactInfo.github}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB ↗
          </a>
          <a
            href={contactInfo.linkedin}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN ↗
          </a>
          <button
            onClick={handleCopyEmail}
            className="footer__link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            title="Click to copy email address"
          >
            {copied ? <span style={{ color: 'var(--color-green)' }}>$ COPIED TO CLIPBOARD</span> : 'EMAIL (COPY)'}
          </button>
        </nav>
      </footer>
    </div>
  )
}

export default Footer
