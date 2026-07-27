/* TradeTicket.jsx — reusable "Place an Order" trade-ticket component (spec §3.3).
   Rendered at the bottom of Home page (linking to /contact) and at the top of Contact page. */

import { Link } from 'react-router-dom'
import { contactInfo } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/contact.css'

function TradeTicket({ isContactPage = false }) {
  const sectionRef = useReveal()

  return (
    <div className="reveal" ref={sectionRef}>
      <div className="section-label">PLACE AN ORDER — INITIATE CONTACT</div>

      <div className="ticket-header">
        {/* Ticker tape row: symbol, exchange, status, location */}
        <div className="ticket-symbol-row">
          <div className="ticket-field">
            <span className="ticket-field-label">SYMBOL</span>
            <span className="ticket-field-value ticket-field-value--amber">RANA_YASHWANT</span>
          </div>
          <div className="ticket-field">
            <span className="ticket-field-label">EXCHANGE</span>
            <span className="ticket-field-value">SOFTWARE / FINTECH</span>
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
          {isContactPage ? (
            <a href="#contact-form" className="btn-buy">
              ▲ BUY — HIRE / COLLABORATE
            </a>
          ) : (
            <Link to="/contact" className="btn-buy">
              ▲ BUY — HIRE / COLLABORATE ↗
            </Link>
          )}

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
  )
}

export default TradeTicket
