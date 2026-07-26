import './App.css'

function App() {
  return (
    <div className="app">
      {/* Temporary test content — confirms fonts/colors from tokens.css are working.
          Will be replaced with real routing + page components next step. */}
      <h1 style={{ fontFamily: 'var(--font-display)' }}>Rana Terminal</h1>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>
        SYSTEM ONLINE
      </p>
    </div>
  )
}

export default App