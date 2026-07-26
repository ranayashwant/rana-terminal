/* App.jsx — root component. Owns the router and the Header.
   
   Structure:
     <BrowserRouter>       — provides router context to everything inside
       <Header />          — sticky nav, rendered once, persists across all routes
       <Routes>            — swaps the active page component on navigation
         <Route ... />
       </Routes>
     </BrowserRouter>
   
   Header must be INSIDE BrowserRouter (NavLink needs router context)
   but OUTSIDE Routes (so it doesn't unmount/remount on every navigation). */

import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Global animation utilities — .reveal / .revealed / stagger delays.
   Must be imported here (not in individual components) so the classes
   are available before any component's IntersectionObserver fires. */
import './styles/animations.css'

/* Persistent layout component */
import Header from './components/Header.jsx'
import CommandPalette from './components/CommandPalette.jsx'

/* Page components — one per route */
import Home     from './pages/Home.jsx'
import Contact  from './pages/Contact.jsx'
import Resume   from './pages/Resume.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* Header renders here — above Routes — so it never unmounts on navigation */}
      <Header />
      <CommandPalette />

      {/* Routes renders only the matched page component.
          Everything inside here swaps when the URL changes. */}
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/contact"  element={<Contact />}  />
        <Route path="/resume"   element={<Resume />}   />
        <Route path="*"         element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App