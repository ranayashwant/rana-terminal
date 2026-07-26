/* MFScreener.jsx — MFSC flagship section (spec §4, §7).
   Full-width expanded treatment below the standard project cards.
   
   Contains:
   1. Competitor View / System View toggle — static comparison vs. live engine output
   2. ER diagram — CSS-based schema visualisation (real schema, representative)
   3. Payload inspector — DevTools-styled JSON panel (sample response, labelled clearly) */

import { useState } from 'react'
import { projects, mfscCompetitorTable, mfscSamplePayload } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/mfscreener.css'

/* Find the MFSC project entry from content.js */
const mfsc = projects.find(p => p.id === 'mfsc')

/* ── Prettified JSON renderer — applies CSS colour classes to JSON output ── */
/* No external library — manual token-level rendering for the terminal look */
function JsonLine({ keyName, value, indent = 0, last = false }) {
  const pad = '  '.repeat(indent)

  let valueEl
  if (typeof value === 'string') {
    valueEl = <span className="json-string">"{value}"</span>
  } else if (typeof value === 'number') {
    valueEl = <span className="json-number">{value}</span>
  } else if (typeof value === 'boolean') {
    valueEl = <span className="json-bool">{String(value)}</span>
  } else {
    /* Objects/arrays are handled by the parent recursion */
    valueEl = null
  }

  return (
    <div>
      {pad}
      {keyName && <span className="json-key">"{keyName}"</span>}
      {keyName && ': '}
      {valueEl}{!last && ','}
    </div>
  )
}

/* Recursively renders the sample payload as coloured JSON lines */
function JsonObject({ obj, indent = 0, isRoot = false }) {
  const entries = Object.entries(obj)
  return (
    <>
      {isRoot ? null : null}
      {entries.map(([k, v], i) => {
        const isLast = i === entries.length - 1
        if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
          return (
            <div key={k}>
              {'  '.repeat(indent)}<span className="json-key">"{k}"</span>{': {'}
              <JsonObject obj={v} indent={indent + 1} />
              {'  '.repeat(indent)}{'}' + (isLast ? '' : ',')}
            </div>
          )
        }
        return <JsonLine key={k} keyName={k} value={v} indent={indent} last={isLast} />
      })}
    </>
  )
}

/* ── ER Diagram — CSS div-based schema (real table structure) ── */
function ERDiagram() {
  /* Tables match the actual MySQL schema for the MF Screener project */
  const tables = [
    {
      name: 'schemes',
      note: '11K+ rows',
      fields: [
        { name: 'scheme_code', type: 'VARCHAR(20)', pk: true  },
        { name: 'scheme_name', type: 'TEXT',        pk: false },
        { name: 'amc_id',      type: 'INT',         fk: true  },
        { name: 'category_id', type: 'INT',         fk: true  },
        { name: 'risk_level',  type: 'VARCHAR(50)', pk: false },
        { name: 'expense_ratio', type: 'DECIMAL',   pk: false },
      ],
    },
    {
      name: 'amc',
      note: null,
      fields: [
        { name: 'amc_id',   type: 'INT PK', pk: true  },
        { name: 'amc_name', type: 'TEXT',   pk: false },
      ],
    },
    {
      name: 'categories',
      note: null,
      fields: [
        { name: 'category_id',   type: 'INT PK',     pk: true  },
        { name: 'category_name', type: 'VARCHAR(100)', pk: false },
        { name: 'sub_category',  type: 'VARCHAR(100)', pk: false },
      ],
    },
    {
      name: 'nav_data',
      note: 'daily',
      fields: [
        { name: 'id',          type: 'BIGINT',      pk: true  },
        { name: 'scheme_code', type: 'VARCHAR(20)', fk: true  },
        { name: 'nav_value',   type: 'DECIMAL',     pk: false },
        { name: 'nav_date',    type: 'DATE',        pk: false },
      ],
    },
    {
      name: 'sip_plans',
      note: null,
      fields: [
        { name: 'id',             type: 'INT',         pk: true  },
        { name: 'scheme_code',    type: 'VARCHAR(20)', fk: true  },
        { name: 'monthly_amount', type: 'DECIMAL',     pk: false },
        { name: 'installments',   type: 'INT',         pk: false },
      ],
    },
  ]

  return (
    <div className="er-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minWidth: '400px' }}>
        {tables.map(table => (
          <div
            key={table.name}
            style={{
              border: '1px solid var(--color-hairline)',
              background: 'var(--color-panel)',
              fontSize: '0',
            }}
          >
            {/* Table header */}
            <div style={{
              background: 'color-mix(in srgb, var(--color-hairline) 40%, var(--color-panel))',
              padding: '0.4rem 0.75rem',
              borderBottom: '1px solid var(--color-hairline)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-amber)', letterSpacing: '0.08em' }}>
                {table.name.toUpperCase()}
              </span>
              {table.note && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-faint)' }}>
                  {table.note}
                </span>
              )}
            </div>
            {/* Fields */}
            {table.fields.map((field, fi) => (
              <div
                key={field.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.3rem 0.75rem',
                  borderBottom: fi < table.fields.length - 1 ? '1px solid color-mix(in srgb, var(--color-hairline) 40%, transparent)' : 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span>{field.name}</span>
                <span style={{
                  fontSize: '0.58rem',
                  color: field.pk ? 'var(--color-amber)' : field.fk ? 'var(--color-green)' : 'var(--color-text-faint)',
                  letterSpacing: '0.08em',
                }}>
                  {field.pk ? 'PK' : field.fk ? 'FK' : field.type}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main MFScreener component ── */
function MFScreener() {
  /* Toggle state: 'competitor' shows feature comparison, 'system' shows engine output */
  const [view, setView] = useState('competitor')
  const sectionRef = useReveal()

  const [showModal, setShowModal] = useState(false)

  return (
    <section className="mfscreener reveal" ref={sectionRef} aria-label="MF Screener Flagship">
      {/* Badge & Top-Right Screenshot Button */}
      <div className="mfsc-header-row">
        <div className="flagship-badge">FLAGSHIP PROJECT</div>
        {mfsc.image && (
          <button
            onClick={() => setShowModal(true)}
            className="chrome-screenshot-btn"
            style={{ position: 'relative', top: '-4px' }}
          >
            📷 [ SCREENSHOT ↗ ]
          </button>
        )}
      </div>

      <h2 className="mfsc-title">{mfsc.ticker} — {mfsc.name}</h2>
      <p className="mfsc-pitch">{mfsc.pitch}</p>

      {/* Description bullets */}
      <div className="mfsc-description">
        {mfsc.description.map((line, i) => (
          <p key={i} className="mfsc-bullet">{line}</p>
        ))}
      </div>

      {/* Action links */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        {mfsc.live && (
          <a
            href={mfsc.live}
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-amber)', borderColor: 'var(--color-amber)' }}
          >
            LIVE DEMO ↗
          </a>
        )}
        <a
          href={mfsc.github}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW SOURCE ↗
        </a>
        {mfsc.image && (
          <button
            onClick={() => setShowModal(true)}
            className="card-link"
            style={{ cursor: 'pointer' }}
          >
            SCREENSHOT ↗
          </button>
        )}
      </div>

      {/* ── Toggle ── */}
      <div className="mfsc-toggle-group" role="group" aria-label="Switch view">
        <button
          className={`mfsc-toggle-btn ${view === 'competitor' ? 'mfsc-toggle-btn--active' : ''}`}
          onClick={() => setView('competitor')}
          aria-pressed={view === 'competitor'}
        >
          COMPETITOR VIEW
        </button>
        <button
          className={`mfsc-toggle-btn ${view === 'system' ? 'mfsc-toggle-btn--active' : ''}`}
          onClick={() => setView('system')}
          aria-pressed={view === 'system'}
        >
          SYSTEM VIEW
        </button>
      </div>

      {/* ── Competitor view — feature comparison table ── */}
      <div className={`mfsc-view ${view === 'competitor' ? 'mfsc-view--active' : ''}`}>
        <table className="compare-table" aria-label="Feature comparison: Zerodha Coin vs MFSC">
          <thead>
            <tr>
              <th>FEATURE</th>
              <th>ZERODHA COIN</th>
              <th className="th-mfsc">MFSC</th>
            </tr>
          </thead>
          <tbody>
            {mfscCompetitorTable.map(row => (
              /* Highlight rows where MFSC has an advantage Zerodha doesn't */
              <tr key={row.feature} className={!row.zerodha && row.mfsc ? 'advantage' : ''}>
                <td>{row.feature}</td>
                <td>
                  {row.zerodha
                    ? <span className="check">✓</span>
                    : <span className="cross">✗</span>}
                </td>
                <td>
                  {row.mfsc
                    ? <span className="check">✓</span>
                    : <span className="cross">✗</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── System view — SIP Deployment Plan output ── */}
      <div className={`mfsc-view ${view === 'system' ? 'mfsc-view--active' : ''}`}>
        <div className="system-output" aria-label="SIP Deployment Plan output">
          <div className="output-field">
            <span className="output-label">SCHEME</span>
            <span className="output-value" style={{ fontSize: '0.82rem' }}>
              {mfscSamplePayload.schemeName}
            </span>
          </div>
          <div className="output-field">
            <span className="output-label">NAV</span>
            <span className="output-value">₹{mfscSamplePayload.nav}</span>
          </div>
          <div className="output-field">
            <span className="output-label">EXPENSE RATIO</span>
            <span className="output-value">{mfscSamplePayload.expenseRatio}</span>
          </div>
          <div className="output-field">
            <span className="output-label">RISK LEVEL</span>
            <span className="output-value" style={{ fontSize: '0.82rem' }}>
              {mfscSamplePayload.riskLevel}
            </span>
          </div>
          <div className="output-field">
            <span className="output-label">1Y / 3Y / 5Y RETURNS</span>
            <span className="output-value" style={{ fontSize: '0.82rem' }}>
              {mfscSamplePayload.returns.oneYear} / {mfscSamplePayload.returns.threeYear} / {mfscSamplePayload.returns.fiveYear}
            </span>
          </div>
          <div className="output-field">
            <span className="output-label">SIP DEPLOYMENT PLAN</span>
            <span className="output-value" style={{ fontSize: '0.82rem' }}>
              {mfscSamplePayload.sipDeploymentPlan.recommendedSplit}
            </span>
          </div>
          <div className="output-field">
            <span className="output-label">INSTALLMENTS</span>
            <span className="output-value">{mfscSamplePayload.sipDeploymentPlan.installments}</span>
          </div>
          <div className="output-field">
            <span className="output-label">MONTHLY AMOUNT</span>
            <span className="output-value">₹{mfscSamplePayload.sipDeploymentPlan.monthlyAmount.toLocaleString()}</span>
          </div>
          <p className="output-note">{mfscSamplePayload.sipDeploymentPlan.note}</p>
        </div>
      </div>

      {/* ── ER Diagram + Payload Inspector (side by side) ── */}
      <div className="mfsc-detail-grid">

        {/* ER Diagram */}
        <div>
          <div className="detail-panel__label">ER DIAGRAM — MYSQL SCHEMA</div>
          <ERDiagram />
        </div>

        {/* Payload Inspector */}
        <div>
          <div className="detail-panel__label">API PAYLOAD INSPECTOR</div>
          <div className="payload-inspector">
            <div className="payload-header">
              <span className="payload-title">GET /api/fund/:schemeCode</span>
              <span className="payload-badge">SAMPLE RESPONSE</span>
            </div>
            <div className="payload-body">
              {/* Manual JSON rendering — no external syntax highlighter.
                  Labelled "SAMPLE RESPONSE" — not live data. */}
              <pre className="json-block">
                {'{\n'}
                {'  '}<span className="json-key">"schemeCode"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.schemeCode}"</span>{',\n'}
                {'  '}<span className="json-key">"schemeName"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.schemeName}"</span>{',\n'}
                {'  '}<span className="json-key">"nav"</span>
                {': '}<span className="json-number">{mfscSamplePayload.nav}</span>{',\n'}
                {'  '}<span className="json-key">"expenseRatio"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.expenseRatio}"</span>{',\n'}
                {'  '}<span className="json-key">"riskLevel"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.riskLevel}"</span>{',\n'}
                {'  '}<span className="json-key">"returns"</span>{': {\n'}
                {'    '}<span className="json-key">"oneYear"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.returns.oneYear}"</span>{',\n'}
                {'    '}<span className="json-key">"threeYear"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.returns.threeYear}"</span>{',\n'}
                {'    '}<span className="json-key">"fiveYear"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.returns.fiveYear}"</span>{'\n'}
                {'  }'},{'\n'}
                {'  '}<span className="json-key">"sipDeploymentPlan"</span>{': {\n'}
                {'    '}<span className="json-key">"recommendedSplit"</span>
                {': '}<span className="json-string">"{mfscSamplePayload.sipDeploymentPlan.recommendedSplit}"</span>{',\n'}
                {'    '}<span className="json-key">"installments"</span>
                {': '}<span className="json-number">{mfscSamplePayload.sipDeploymentPlan.installments}</span>{',\n'}
                {'    '}<span className="json-key">"monthlyAmount"</span>
                {': '}<span className="json-number">{mfscSamplePayload.sipDeploymentPlan.monthlyAmount}</span>{'\n'}
                {'  }\n}'}
              </pre>
            </div>
          </div>
        </div>
      </div>
      {/* ── Screenshot Full View Modal ── */}
      {showModal && mfsc.image && (
        <div className="screenshot-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="screenshot-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{mfsc.ticker} — {mfsc.name} PREVIEW</span>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>[ CLOSE ✕ ]</button>
            </div>
            <img src={mfsc.image} alt={`${mfsc.name} full resolution preview`} className="modal-full-img" />
          </div>
        </div>
      )}
    </section>
  )
}

export default MFScreener
