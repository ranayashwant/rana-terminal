/* Contact.jsx — /contact route. "Place an Order" trade-ticket framing (spec §3.3).
   Form includes Name, Email, optional Phone number, optional Enquiry type select, and Message. */

import { useState } from 'react'
import { contactInfo } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import Footer from '../components/Footer.jsx'
import '../styles/contact.css'

/* ── Live Formspree form ID ── */
const FORMSPREE_FORM_ID = 'meeyvzve'

function Contact() {
  useDocumentTitle('Rana Yashwant — Contact & Trade Ticket')
  const sectionRef = useReveal()

  /* Controlled form state */
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [phone,       setPhone]       = useState('')
  const [enquiryType, setEnquiryType] = useState('Select one')
  const [message,     setMessage]     = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)

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
        body: JSON.stringify({
          name,
          email,
          phone: phone || 'Not provided',
          enquiryType,
          message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setPhone(''); setEnquiryType('Select one'); setMessage('')
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
                <label className="form-label" htmlFor="contact-name">YOUR NAME *</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="contact-email">EMAIL ADDRESS *</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {/* Phone number (Optional) */}
              <div className="form-field">
                <label className="form-label" htmlFor="contact-phone">PHONE NUMBER (OPTIONAL)</label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                />
              </div>

              {/* Enquiry type (Optional Dropdown) */}
              <div className="form-field">
                <label className="form-label" htmlFor="contact-enquiry">ENQUIRY TYPE (OPTIONAL)</label>
                <select
                  id="contact-enquiry"
                  className="form-select"
                  value={enquiryType}
                  onChange={e => setEnquiryType(e.target.value)}
                >
                  <option value="Select one">Select one</option>
                  <option value="Hiring / Full-Time Role">Hiring / Full-Time Role</option>
                  <option value="Backend / Fintech Architecture">Backend / Fintech Architecture</option>
                  <option value="Freelance / Consulting Project">Freelance / Consulting Project</option>
                  <option value="Technical Advisory / MFD Domain">Technical Advisory / MFD Domain</option>
                  <option value="Just up for a tech chat">Just up for a tech chat</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-field form-field--full">
                <label className="form-label" htmlFor="contact-message">YOUR MESSAGE *</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="What do you need, what is the goal, and when do you want to launch?"
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="form-submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'SENDING...' : '[ EXECUTE ORDER ↗ ]'}
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
          <button
            onClick={(e) => {
              e.preventDefault()
              navigator.clipboard.writeText(contactInfo.email)
              setCopiedEmail(true)
              setTimeout(() => setCopiedEmail(false), 2400)
            }}
            className="direct-link"
            style={{ cursor: 'pointer' }}
          >
            {copiedEmail ? '$ COPIED TO CLIPBOARD' : 'EMAIL (COPY)'}
          </button>
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
