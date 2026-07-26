/* NotFound.jsx — custom 404 page styled with terminal theme (spec Phase 4).
   Header: SIGNAL LOST, message: "This route doesn't exist in the system". */

import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import Footer from '../components/Footer.jsx'

function NotFound() {
  /* Set per-page title for 404 */
  useDocumentTitle('Rana Yashwant — 404 Signal Lost')

  return (
    <main>
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '6rem 2rem 8rem',
          textAlign: 'center',
        }}
      >
        <div className="section-label" style={{ color: 'var(--color-red)' }}>
          ERROR 404 — SIGNAL LOST
        </div>

        <div
          style={{
            border: '1px solid var(--color-hairline)',
            backgroundColor: 'var(--color-panel)',
            padding: '3rem 2rem',
            marginTop: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 600,
              color: 'var(--color-amber)',
              marginBottom: '1rem',
              letterSpacing: '0.08em',
            }}
          >
            SIGNAL LOST
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}
          >
            This route doesn't exist in the system. Check the address or return to active nodes.
          </p>

          <Link
            to="/"
            className="btn btn--primary"
            style={{ display: 'inline-flex' }}
          >
            [ RETURN TO HOME ]
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default NotFound
