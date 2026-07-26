/* Ticker.jsx — full-width auto-scrolling strip of skills/stats/certs (spec §4, §5 sig-element #1).
   Placed directly below the Hero section on the Home page.
   Content is aria-hidden — it's decorative, not primary navigation. */

import { tickerItems } from '../data/content.js'
import '../styles/ticker.css'

function Ticker() {
  /* Double the items array so the CSS -50% translateX loop is seamless.
     When the first copy has scrolled fully out of view, the second copy is
     visually identical to the first at position 0 → no visible jump/reset. */
  const doubled = [...tickerItems, ...tickerItems]

  return (
    /* aria-hidden: decorative marquee — screen readers don't need to read this */
    <div className="ticker" aria-hidden="true" role="presentation">
      <div className="ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker__item">
            {/* Diamond separator — amber accent as a visual bullet */}
            <span className="ticker__sep" aria-hidden="true">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Ticker
