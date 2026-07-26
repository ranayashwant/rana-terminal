/* Header.jsx — sticky navigation bar with responsive mobile menu toggle. */

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks, heroContent } from '../data/content.js'
import '../styles/header.css'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="header" role="banner">
      <div className="header__inner">

        {/* Brand */}
        <NavLink to="/" className="header__brand" aria-label="Home" onClick={() => setMobileOpen(false)}>
          {heroContent.name}
        </NavLink>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="header__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? '[ CLOSE ✕ ]' : '[ MENU ☰ ]'}
        </button>

        {/* Nav + status */}
        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`} aria-label="Main navigation">

          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Status indicator */}
          <div className="header__status" aria-label="Availability status">
            <span className="status__dot" aria-hidden="true" />
            <span className="status__text">OPEN TO WORK</span>
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Header
