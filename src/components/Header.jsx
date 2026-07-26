/* Header.jsx — sticky navigation bar rendered once in App.jsx above <Routes>.
   Lives above Routes so it persists across all page navigations without unmounting.
   Must be inside <BrowserRouter> so NavLink can access the router context. */

import { NavLink } from 'react-router-dom'
import { navLinks, heroContent } from '../data/content.js'
import '../styles/header.css'

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__inner">

        {/* Brand — links back to home. Uses heroContent.name so the value
            stays in one place (content.js) rather than duplicated here. */}
        <NavLink to="/" className="header__brand" aria-label="Home">
          {heroContent.name}
        </NavLink>

        {/* Nav + status — flex row on the right */}
        <nav className="header__nav" aria-label="Main navigation">

          {/* Render each nav link from content.js.
              NavLink's className prop accepts a function that receives { isActive }.
              We use this to conditionally apply the --active modifier class.
              
              The 'end' prop on the HOME link is critical: without it, the '/' path
              would match every route (all paths start with '/') and HOME would always
              appear active. 'end' makes it only match when the URL is exactly '/'. */}
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Status indicator — green dot + text, separated from links by a hairline.
              Green = active/open-to-work per spec §5. Never used for decoration elsewhere. */}
          <div className="header__status" aria-label="Availability status">
            {/* aria-hidden: the dot is visual-only; the text label carries the meaning */}
            <span className="status__dot" aria-hidden="true" />
            <span className="status__text">OPEN TO WORK</span>
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Header
