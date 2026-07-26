/* CommandPalette.jsx — Cmd/Ctrl+K terminal command palette (spec Phase 6).
   Supports fuzzy search filtering, arrow key navigation, Enter to execute, Esc to close. */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/command-palette.css'

const COMMANDS = [
  { id: 'home',       label: 'HOME — TOP',                 type: 'NAVIGATE', action: { kind: 'scroll', target: 'top' } },
  { id: 'about',      label: 'SECTION — ABOUT (REALLOCATION)', type: 'JUMP',     action: { kind: 'scroll', target: 'about' } },
  { id: 'experience', label: 'SECTION — EXPERIENCE & CERTS',   type: 'JUMP',     action: { kind: 'scroll', target: 'experience' } },
  { id: 'projects',   label: 'SECTION — FEATURED PROJECTS',   type: 'JUMP',     action: { kind: 'scroll', target: 'projects' } },
  { id: 'skills',     label: 'SECTION — SKILLS ORDER BOOK',    type: 'JUMP',     action: { kind: 'scroll', target: 'skills' } },
  { id: 'nav',        label: 'SECTION — CAREER NAV TIMELINE',  type: 'JUMP',     action: { kind: 'scroll', target: 'nav-timeline' } },
  { id: 'contact',    label: 'PAGE — CONTACT & TRADE TICKET',  type: 'ROUTE',    action: { kind: 'route',  target: '/contact' } },
  { id: 'resume',     label: 'PAGE — RESUME PDF',              type: 'ROUTE',    action: { kind: 'route',  target: '/resume' } },
]

function CommandPalette() {
  const [open, setOpen]         = useState(false)
  const [query, setQuery]       = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef  = useRef(null)
  const navigate  = useNavigate()

  /* Toggle command palette via Cmd+K or Ctrl+K */
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  /* Filter commands based on search query */
  const filtered = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.type.toLowerCase().includes(query.toLowerCase())
  )

  function executeCommand(cmd) {
    if (!cmd) return
    setOpen(false)

    if (cmd.action.kind === 'route') {
      navigate(cmd.action.target)
    } else if (cmd.action.kind === 'scroll') {
      if (cmd.action.target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(cmd.action.target) || document.querySelector(`.${cmd.action.target}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          navigate(`/#${cmd.action.target}`)
        }
      }
    }
  }

  function handleInputKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex])
      }
    }
  }

  if (!open) return null

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()} role="dialog" aria-label="Command Palette">
        <div className="cmd-header">
          <span className="cmd-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or section..."
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
          />
          <span className="cmd-kbd">ESC</span>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">NO MATCHING COMMANDS FOUND</div>
          ) : (
            filtered.map((cmd, index) => (
              <div
                key={cmd.id}
                className={`cmd-item ${index === selectedIndex ? 'cmd-item--selected' : ''}`}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="cmd-item-label">{cmd.label}</span>
                <span className="cmd-item-type">[{cmd.type}]</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>NAVIGATION: <kbd>↑</kbd><kbd>↓</kbd> SELECT · <kbd>↵</kbd> EXECUTE</span>
          <span>PRESS <kbd>CMD</kbd>+<kbd>K</kbd> ANYTIME</span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
