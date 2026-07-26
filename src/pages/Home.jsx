/* Home.jsx — the / route page.
   Composes the sections that live on the home page.
   Header is NOT here — it lives in App.jsx and persists across all routes.
   
   Current sections (Step 3): Hero
   Coming in later steps: Ticker (Step 4), About, Experience (Step 5),
   Skills (Step 6), Projects preview (Step 7), Footer. */

import Hero from '../components/Hero.jsx'

function Home() {
  return (
    /* main: semantic HTML landmark for the primary page content.
       Screen readers use this to skip past the sticky header. */
    <main>
      <Hero />
    </main>
  )
}

export default Home
