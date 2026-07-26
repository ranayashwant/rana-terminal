/* App.jsx — root component. Its only job at this stage is to own the router.
   All visual layout lives inside the page components (src/pages/).
   Header/nav will be added here in Step 3, wrapping the Routes. */

import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* Page components — one per route, all placeholders until their build step */
import Home     from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Contact  from './pages/Contact.jsx'
import Resume   from './pages/Resume.jsx'

function App() {
  /* BrowserRouter  — enables client-side routing via the HTML5 History API.
                       No full-page reloads on navigation.
     Routes          — renders only the first <Route> whose path matches the URL.
     Route path="/"  — exact root match (React Router v6+ defaults to exact).
     The vercel.json rewrite rule ensures that direct visits to /projects etc.
     still land on index.html so React Router can take over. */
  return (
    <BrowserRouter>
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