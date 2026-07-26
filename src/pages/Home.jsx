/* Home.jsx — placeholder for the / route.
   Step 3 will replace this with the real Hero section (typewriter headline,
   count-up stats) and Ticker strip. For now, just confirms routing works
   and text renders in theme colors. */

function Home() {
  return (
    /* main: semantic HTML landmark — signals "primary content" to browsers/screen readers */
    <main>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
        HOME
      </h1>
    </main>
  )
}

export default Home
