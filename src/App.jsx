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

/* Page components — one per route */
import Home     from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Contact  from './pages/Contact.jsx'
import Resume   from './pages/Resume.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* Header renders here — above Routes — so it never unmounts on navigation */}
      <Header />

      {/* Routes renders only the matched page component.
          Everything inside here swaps when the URL changes. */}
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact"  element={<Contact />}  />
        <Route path="/resume"   element={<Resume />}   />
      </Routes>
    </BrowserRouter>
  )
}

export default App