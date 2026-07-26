/* content.js — single source of truth for all static site content.
   Keeping data here (not inline in components) means:
   - Changing copy/stats only requires editing this one file
   - Components stay clean and logic-focused
   - Easy to audit "are all values real?" in one place (spec §0 rule) */

/* ─── Navigation ──────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: 'HOME',     path: '/' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'CONTACT',  path: '/contact' },
  { label: 'RESUME',   path: '/resume' },
]

/* ─── Hero Section ────────────────────────────────────────────────────────── */

export const heroContent = {
  /* Brand name shown in header — mono uppercase, defines the "call sign" */
  name: 'RANA_YASHWANT',

  /* Typewriter headline — the single sentence that types out on load.
     Keep it role-first, not name-first, per spec §3.1. */
  headline: 'Backend & fintech engineer, ex-mutual fund distributor.',

  /* Supporting line — Inter body copy, one sentence, no fluff */
  subline:
    'Building real financial tools — from managing client portfolios as a licensed MFD to engineering the systems that power them.',

  /* Count-up stats — every number here is real and defensible (spec §0).
     value: the integer to count up to
     suffix: displayed immediately after the number
     label: mono uppercase caption below the number */
  stats: [
    { value: 11000, suffix: '+',       label: 'SCHEMES TRACKED'  },
    { value: 89,    suffix: 'TH %ILE', label: 'GATE CSE 2026'    },
    { value: 2,     suffix: '+ YRS',   label: 'FINTECH DOMAIN'   },
  ],

  /* CTA buttons — paths/URLs only; labels live in the component */
  cta: {
    projects: '/projects',
    resume:   '/resume.pdf',    /* served from public/ */
    github:   'https://github.com/ranayashwant',
  },
}
