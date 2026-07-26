/* content.js — single source of truth for ALL static site content.
   Spec §0 rule: every number and fact here is real and defensible.
   Comments mark anything that needs owner confirmation before final launch.
   
   Imports: navLinks, heroContent, tickerItems, aboutContent, experience,
            education, certifications, skills, navTimeline, projects,
            mfScreenerDetail, contactInfo */

/* ─── Navigation ──────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: 'HOME',     path: '/' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'CONTACT',  path: '/contact' },
  { label: 'RESUME',   path: '/resume' },
]

/* ─── Contact Info ────────────────────────────────────────────────────────── */

export const contactInfo = {
  name:     'Rana Yashwant Singh',
  email:    'ranayashwant.dev@gmail.com',
  phone:    '+91 83170 76541',
  linkedin: 'https://linkedin.com/in/ranayashwant',
  github:   'https://github.com/ranayashwant',
}

/* ─── Hero Section ────────────────────────────────────────────────────────── */

export const heroContent = {
  name:     'RANA_YASHWANT',
  headline: 'Backend & fintech engineer, ex-mutual fund distributor.',
  subline:  'Building real financial tools — from managing client portfolios as a licensed MFD to engineering the systems that power them.',
  stats: [
    { value: 11000, suffix: '+',       label: 'SCHEMES TRACKED'  },
    { value: 89,    suffix: 'TH %ILE', label: 'GATE CSE 2026'    },
    { value: 2,     suffix: '+ YRS',   label: 'FINTECH DOMAIN'   },
  ],
  cta: {
    projects: '/projects',
    resume:   '/RANA%20YASHWANT%20SINGH%20Resume.pdf',
    github:   'https://github.com/ranayashwant',
  },
}

/* ─── Ticker Strip ────────────────────────────────────────────────────────── */

export const tickerItems = [
  'NODE.JS',
  'MYSQL',
  'REACT',
  'JAVASCRIPT (ES6+)',
  'EXPRESS.JS',
  'NISM-V-A CERTIFIED',
  'GATE CSE 2026 — 89TH %ILE',
  '11,000+ SCHEMES TRACKED',
  'C / C++',
  'GIT',
  'HTML / CSS',
]

/* ─── About — "Asset Reallocation" ───────────────────────────────────────── */

export const aboutContent = {
  headline: 'Asset Reallocation',
  subline:  'A calculated move from managing capital to engineering the systems that move it.',
  fundamentalAnalysis: {
    label:    'FUNDAMENTAL ANALYSIS',
    subtitle: 'The Domain Side',
    points: [
      { stat: '₹40L',  desc: 'AUM managed across 6 client portfolios'                },
      { stat: '100%',  desc: 'Client retention through 2 market downturns'            },
      { stat: '8–10',  desc: 'Clients onboarded to Zerodha/BSE StarMF/MF Utility'    },
      { stat: 'NISM',  desc: 'Series V-A certified — AMFI Registered MF Distributor' },
    ],
  },
  technicalAnalysis: {
    label:    'TECHNICAL ANALYSIS',
    subtitle: 'The Engineering Side',
    points: [
      { stat: '11K+',  desc: 'Mutual fund schemes screened via self-built REST API'   },
      { stat: '2',     desc: 'Production projects with real logic, no tutorial clones' },
      { stat: '89th',  desc: 'Percentile in GATE CSE 2026 — switching lane to CS'     },
      { stat: '7.95',  desc: 'B.Tech ECE CGPA, Dr. SMNRU 2024'                        },
    ],
  },
}

/* ─── Experience ──────────────────────────────────────────────────────────── */

export const experience = [
  {
    id:      'mfd',
    period:  'JAN 2023 — FEB 2025',
    title:   'Mutual Fund Distributor & Client Technology Advisor',
    org:     'Self-Employed · NISM-Certified',
    status:  'completed',   /* green = active, amber = in-progress, gray = completed */
    tag:     'FINTECH / MFD',
    bullets: [
      'Managed ₹40L AUM across 6 client portfolios; converted 3 clients from lump-sum to SIP investing.',
      'Scaled individual portfolios from ₹5K to ₹3–5L through systematic rebalancing.',
      'Onboarded 8–10 clients to digital platforms: Zerodha, BSE Star MF, MF Utility.',
      'Retained 100% client base through 2 market downturns via data-driven communication.',
      'Domain experience directly drove design of the MF Screener — built tools existing platforms lacked.',
    ],
  },
  {
    id:      'uprvunl',
    period:  'SEPT 2023 — NOV 2023',
    title:   'Industrial Trainee',
    org:     'UPRVUNL — Uttar Pradesh Rajya Vidyut Utpadan Nigam Ltd.',
    status:  'completed',
    tag:     'INDUSTRIAL / PLC',
    bullets: [
      'PLC-based industrial automation using Ladder Logic at a thermal power generation facility.',
      'Exposure to real-time control systems and industrial-scale electrical infrastructure.',
    ],
  },
]

/* ─── Education ───────────────────────────────────────────────────────────── */

export const education = [
  {
    period:      '2020 — 2024',
    degree:      'B.Tech · Electronics & Communication Engineering',
    institution: 'Dr. Shakuntala Misra National Rehabilitation University',
    score:       '7.95 / 10 CGPA',
  },
  {
    period:      '2026',
    degree:      'GATE CSE',
    institution: 'Graduate Aptitude Test in Engineering — Computer Science',
    score:       '~89TH PERCENTILE',
  },
]

/* ─── Certifications ──────────────────────────────────────────────────────── */

export const certifications = [
  { badge: 'NISM',  name: 'NISM Series V-A',                         issuer: 'AMFI-Registered Mutual Fund Distributor' },
  { badge: 'GCP',   name: 'Google Cloud — Prompt Design in Vertex AI', issuer: 'Credly Verified'                         },
  { badge: 'HR 3★', name: 'HackerRank Problem-Solving',               issuer: '3 Star'                                  },
]

/* ─── Skills — Order Book ─────────────────────────────────────────────────── */

export const skills = {
  /* Bids = proficient — things Rana can defend in a technical interview */
  bids: [
    { name: 'JavaScript (ES6+)',  level: 90 },
    { name: 'Node.js',            level: 85 },
    { name: 'Express.js',         level: 82 },
    { name: 'React.js',           level: 78 },
    { name: 'MySQL / SQL',        level: 80 },
    { name: 'Git',                level: 85 },
    { name: 'HTML / CSS',         level: 88 },
    { name: 'C / C++',            level: 70 },
  ],
  /* Asks = currently learning
     ⚠ PLACEHOLDER — confirm with Rana before final launch.
     These are reasonable guesses based on project context, NOT confirmed by owner. */
  asks: [
    { name: 'GSAP / Animation',           level: 30 },
    { name: 'Advanced React Patterns',    level: 35 },
    { name: 'Cloud Deployment (AWS/GCP)', level: 25 },
    { name: 'Python (ML/CV)',             level: 45 },
    { name: 'Docker / DevOps',            level: 20 },
  ],
}

/* ─── Career NAV Timeline ─────────────────────────────────────────────────── */
/* Milestones with real dates only — no guessed or placeholder dates.
   Self-taught dev start deliberately omitted (date not confirmed by owner).
   'value' is the "career NAV" — a relative progress index, styled like a stock chart. */

export const navTimeline = [
  { date: 'JAN 2023',  label: 'MFD — Licensed & Operational',          value: 10  },
  { date: 'SEPT 2023', label: 'Industrial Trainee · UPRVUNL',           value: 22  },
  { date: 'JUN 2024',  label: 'B.Tech ECE Complete · 7.95 CGPA',        value: 42  },
  { date: 'AUG 2024',  label: 'MF Screener — First Commit',             value: 58  },
  { date: 'FEB 2025',  label: 'MFD Wrap · Full-time Engineering Pivot',  value: 72  },
  { date: 'FEB 2026',  label: 'GATE CSE 2026 · ~89th Percentile',        value: 100 },
]

/* ─── Projects ────────────────────────────────────────────────────────────── */

export const projects = [
  {
    id:       'mfsc',
    ticker:   'MFSC',
    name:     'MF Screener & Portfolio Tracker',
    pitch:    'Screens 11,000+ mutual funds and builds SIP Deployment Plans — addressing a gap not available on Zerodha Coin or Groww.',
    stack:    ['JavaScript', 'Node.js', 'Express', 'MySQL', 'React'],
    metrics: [
      { label: 'SCHEMES', value: '11,000+' },
      { label: 'STATUS',  value: 'ACTIVE'  },
      { label: 'YEAR',    value: '2024'    },
    ],
    github:   'https://github.com/ranayashwant/mf-screener',
    live:     null,     /* no live demo yet — link omitted per spec §3.2 */
    flagship: true,
    description: [
      'Screens 11,000+ mutual fund schemes by category, risk, returns, and expense ratio via live AMFI data REST API.',
      'SIP Deployment Planner calculates optimal lump sum/SIP split and installment count per fund.',
      'Fund Switch Planner for systematic portfolio rebalancing — logic derived from 2+ years of real MFD practice.',
      'Addresses a gap not available on Zerodha Coin or Groww — motivation came from serving real clients.',
    ],
  },
  {
    id:       'sltc',
    ticker:   'SLTC',
    name:     'Sign Language to Text Conversion',
    pitch:    'Custom CNN + MediaPipe pipeline converting hand gestures to real-time text for hearing-impaired users.',
    stack:    ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV'],
    metrics: [
      { label: 'DATASET',  value: '400 IMG' },
      { label: 'CLASSES',  value: '4'       },
      { label: 'YEAR',     value: '2024'    },
    ],
    github:   'https://github.com/ranayashwant/Sign-Language-to-Text-Conversion',
    live:     null,     /* Python/CV project — not web-deployed, link omitted */
    flagship: false,
    description: [
      'Custom CNN trained on a self-built dataset: 400 images across 4 gesture classes (100 images each).',
      'MediaPipe hand-landmark detection feeds into the classifier for real-time inference.',
      'Deployed as an accessibility tool for hearing-impaired users, outputting live text.',
    ],
  },
]

/* ─── MF Screener Flagship Detail ─────────────────────────────────────────── */

/* Competitor feature comparison — Zerodha Coin vs MFSC */
export const mfscCompetitorTable = [
  { feature: 'Scheme Search',        zerodha: true,  mfsc: true  },
  { feature: 'Category Filter',      zerodha: true,  mfsc: true  },
  { feature: 'Returns Comparison',   zerodha: true,  mfsc: true  },
  { feature: 'Live AMFI Data Feed',  zerodha: true,  mfsc: true  },
  { feature: 'Expense Ratio Filter', zerodha: false, mfsc: true  },
  { feature: 'SIP Deployment Plan',  zerodha: false, mfsc: true  },
  { feature: 'Fund Switch Planner',  zerodha: false, mfsc: true  },
]

/* Sample JSON payload — representative shape of the actual API response.
   Labeled SAMPLE — not live data (no backend connected to this static site). */
export const mfscSamplePayload = {
  schemeCode:   '120503',
  schemeName:   'Axis Bluechip Fund — Direct Plan Growth',
  category:     'Equity — Large Cap',
  nav:          '62.43',
  expenseRatio: '0.42%',
  riskLevel:    'Moderately High',
  amc:          'Axis Mutual Fund',
  returns: {
    oneYear:   '14.2%',
    threeYear: '11.8%',
    fiveYear:  '16.3%',
  },
  sipDeploymentPlan: {
    recommendedSplit: '60% SIP / 40% Lump Sum',
    installments:     12,
    monthlyAmount:    5000,
    totalDeployment:  100000,
    note:             'Calculated by MFSC SIP Deployment Planner — not available on Zerodha Coin.',
  },
}
