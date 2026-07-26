/* Footer.jsx — site-wide footer (spec §3.1): "BUILT BY RANA YASHWANT · {YEAR}" in mono. */

import { contactInfo } from '../data/content.js'
import '../styles/footer.css'

function Footer() {
  return (
    /* footer-outer: full-width border wrapper.
       footer: max-width container for the actual content. */
    <div className="footer-outer">
      <footer className="footer">
        {/* Copyright / build credit — mono, faint */}
        <span className="footer__text">
          BUILT BY RANA YASHWANT · {new Date().getFullYear()}
        </span>

        {/* Quick links — GitHub + LinkedIn */}
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
          <a
            href={`mailto:${contactInfo.email}`}
            className="footer__link"
          >
            EMAIL
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default Footer
