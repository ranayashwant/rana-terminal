/* Contact.jsx — /contact route. "Place an Order" trade-ticket framing (spec §3.3).
   
   Structure:
   1. Trade ticket header: SYMBOL, ACTION (BUY + WATCHLIST buttons)
   2. Working contact form — Formspree backend (spec §3.3 option 1)
   3. Direct links row: email, GitHub, LinkedIn, resume PDF
   
   BEFORE LAUNCH: Create a Formspree account at formspree.io, create a new form,
   and replace FORMSPREE_FORM_ID below with your real form ID (8-char alphanumeric). */

import { useState } from 'react'
import { contactInfo } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import Footer from '../components/Footer.jsx'
import '../styles/contact.css'

/* ── Replace this with your real Formspree form ID ── */
/* Get it from formspree.io → New Form → copy the 8-char ID from the endpoint */
const FORMSPREE_FORM_ID = 'YOUR_FORM_ID'

function Contact() {
  const sectionRef = useReveal()

  /* Controlled form state */
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')

  /* Submission status: 'idle' | 'submitting' | 'success' | 'error' */
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    try {
      /* Formspree accepts JSON POST — no page reload, clean UX */
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <div className="contact-page">

        {/* ── Trade ticket header ── */}
        <div className="reveal" ref={sectionRef}>
          <div className="section-label">PLACE AN ORDER</div>

          <div className="ticket-header">
            {/* Ticker tape row: symbol, exchange, status */}
            <div className="ticket-symbol-row">
              <div className="ticket-field">
                <span className="ticket-field-label">SYMBOL</span>
                <span className="ticket-field-value ticket-field-value--amber">RANA_YASHWANT</span>
              </div>
              <div className="ticket-field">
                <span className="ticket-field-label">EXCHANGE</span>
                <span className="ticket-field-value">BACKEND / FINTECH</span>
              </div>
              <div className="ticket-field">
                <span className="ticket-field-label">STATUS</span>
                <span className="ticket-field-value ticket-field-value--green">OPEN TO WORK</span>
              </div>
              <div className="ticket-field">
                <span className="ticket-field-label">LOCATION</span>
                <span className="ticket-field-value">INDIA · REMOTE OPEN</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="ticket-actions">
              {/* BUY — primary hire action. Scrolls down to the form. */}
              <a href="#contact-form" className="btn-buy">
                ▲ BUY — HIRE / COLLABORATE
              </a>

              {/* WATCHLIST — secondary, refer / stay-in-touch → LinkedIn */}
              <a
                href={contactInfo.linkedin}
                className="btn-watchlist"
                target="_blank"
                rel="noopener noreferrer"
              >
                ☆ WATCHLIST — CONNECT ON LINKEDIN
              </a>
            </div>
          </div>
        </div>

        {/* ── Contact form ── */}
        <div id="contact-form" className="contact-form-wrap">
          <div className="form-label-row">SEND A MESSAGE</div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">

              {/* Name */}
              <div className="form-field">
                <label className="form-label" htmlFor="contact-name">NAME</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="contact-email">EMAIL</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              {/* Message */}
              <div className="form-field form-field--full">
                <label className="form-label" htmlFor="contact-message">MESSAGE</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="What are you working on?"
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="form-submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'SENDING...' : '[ EXECUTE ORDER ]'}
            </button>

            {/* Success / error banners */}
            {status === 'success' && (
              <div className="form-success" role="alert">
                ORDER RECEIVED — will respond within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div className="form-error" role="alert">
                TRANSMISSION FAILED — try emailing directly: {contactInfo.email}
              </div>
            )}
          </form>
        </div>

        {/* ── Direct links row ── */}
        <div className="direct-links" aria-label="Direct contact links">
          <a href={`mailto:${contactInfo.email}`}     className="direct-link">EMAIL ↗</a>
          <a href={contactInfo.github}    target="_blank" rel="noopener noreferrer" className="direct-link">GITHUB ↗</a>
          <a href={contactInfo.linkedin}  target="_blank" rel="noopener noreferrer" className="direct-link">LINKEDIN ↗</a>
          <a href="/RANA%20YASHWANT%20SINGH%20Resume.pdf" className="direct-link" download="RANA_YASHWANT_SINGH_Resume.pdf">RESUME PDF ↓</a>
        </div>

      </div>
      <Footer />
    </main>
  )
}

export default Contact
