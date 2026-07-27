# ⚡ Financial Trading Terminal Portfolio Template

A high-performance, Bloomberg/Kite-inspired developer portfolio template built with **React 18, Vite, Vanilla CSS Tokens, GSAP ScrollTrigger, and Vercel Serverless Functions**.

Designed for software, backend, and fintech engineers who want a sleek trading-terminal aesthetic — featuring monospace typography, dark paneling (`#0B0D0F`), amber signal accents (`#E8A33D`), and real-time market data telemetry.

*Designed & engineered by **Rana Yashwant** ([@ranayashwant](https://github.com/ranayashwant)).*

---

## 🎯 Design Philosophy

- **Zero Generic UI:** Built with custom Vanilla CSS variables (`tokens.css`), sharp 0px border-radii, hairline dividers, and high-contrast dark themes.
- **Data Integrity First:** All statistics and metrics are backed by defensible status tags rather than arbitrary skill percentages.
- **Restrained Motion:** Apple-style hardware-accelerated scroll reveals (`scale(0.96) → scale(1.0)` with depth blur) and GSAP micro-interactions with full `prefers-reduced-motion` compliance.

---

## ✨ Features & Architecture

### 📊 1. Real-Time Live Financial Market Ticker (`/api/ticker`)
- **Vercel Serverless Function:** Node.js serverless proxy at `api/ticker.js` that fetches market quotes server-side from Yahoo Finance & Open Exchange Rates.
- **Bypasses CORS:** Eliminates browser CORS issues while serving live market data (`NIFTY 50`, `SENSEX`, `NIFTY BANK`, `USD/INR`).
- **Live Visual Ticks:** 15-second polling with soft green (`flash-green`) & red (`flash-red`) micro-tick highlights.

### 💼 2. Flagship Project Detailed Views
- Detailed project section supporting live REST API demonstrations, feature comparison tables, interactive SQL ER diagrams, and JSON payload code inspectors.
- Modal image screenshot viewer for high-resolution project previews.

### 📈 3. Financial Order Book Skills Section
- Skills presented as a trading **Order Book**:
  - **Bids (Core Stack):** Primary languages, backend frameworks, and database engines.
  - **Asks (Learning Stack):** Emerging tools, cloud services, and exploratory technologies.

### 📈 4. Interactive SVG Career Timeline
- Custom SVG line chart plotting milestone metrics over time with responsive viewport scaling and offset leader lines.

### ⌨️ 5. Terminal Command Palette (`Cmd/Ctrl+K`)
- Site-wide modal keyboard navigation (`Cmd+K` / `Ctrl+K`).
- Supports fuzzy search filtering, arrow key selection (`↑`/`↓`), `Enter` navigation, and `Esc` close.

### 📬 6. Trade Ticket Contact Form
- Trade-ticket styled contact card integrated with Formspree AJAX (`POST`).
- Features optional phone number input and custom enquiry type dropdown (`Hiring`, `System Architecture`, `Consulting`, `Tech Chat`).

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router DOM v6
- **Styling:** Vanilla CSS Tokens (`tokens.css`, `animations.css`) — Zero utility-first CSS dependencies
- **Animations:** GSAP 3, ScrollTrigger, CSS Hardware Acceleration
- **Serverless / Backend:** Node.js (Vercel Serverless API Functions)
- **Forms:** Formspree AJAX API
- **Deployment:** Vercel (SPA Rewrite Configuration)

---

## 📁 Repository Structure

```text
rana-terminal/
├── api/
│   └── ticker.js                 # Serverless Node.js function for live market data
├── public/
│   ├── favicon.svg               # Theme prompt favicon (amber '>')
│   └── screenshots/              # Project preview images
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Sticky navigation bar
│   │   ├── MarketTicker.jsx      # Live market index ticker bar
│   │   ├── Hero.jsx              # Typewriter headline & count-up stats
│   │   ├── Ticker.jsx            # Auto-scrolling skill strip
│   │   ├── About.jsx             # "Asset Reallocation" split panel
│   │   ├── Experience.jsx        # Work history & education timeline
│   │   ├── MFScreener.jsx        # Flagship detailed section & devtools
│   │   ├── SLTCDetail.jsx        # Computer vision project detail section
│   │   ├── Skills.jsx            # Order Book (Bids/Asks) + GitHub calendar
│   │   ├── NAVTimeline.jsx       # SVG milestone line chart
│   │   ├── TradeTicket.jsx       # Reusable "Place an Order" CTA ticket
│   │   ├── CommandPalette.jsx    # Cmd/Ctrl+K terminal jump modal
│   │   └── Footer.jsx            # Build credit & copy-to-clipboard email link
│   ├── pages/
│   │   ├── Home.jsx              # Single-page merged home route
│   │   ├── Contact.jsx           # Trade ticket contact form page
│   │   ├── Resume.jsx            # Terminal boot sequence & PDF viewer page
│   │   └── NotFound.jsx         # Custom 404 "SIGNAL LOST" page
│   ├── data/
│   │   └── content.js            # SINGLE SOURCE OF TRUTH for all website data
│   ├── hooks/
│   │   ├── useReveal.js          # GSAP & IntersectionObserver scroll hook
│   │   └── useDocumentTitle.js   # Dynamic route tab title hook
│   ├── styles/
│   │   ├── tokens.css            # Design tokens (colors, typography, grid)
│   │   ├── animations.css        # Apple-style scale & fade utility classes
│   │   └── [component].css
│   ├── App.jsx                   # Router root & layout
│   └── main.jsx                  # React 18 entry point
├── index.html                    # SEO & Open Graph meta tags
├── vercel.json                   # SPA rewrite rules
└── package.json
```

---

## ⚙️ Customization Guide

All portfolio content is decoupled from components and stored in a single source of truth:

👉 **`src/data/content.js`**

To customize this template for your own portfolio:
1. Update `heroContent` with your name, headline, subline, and key statistics.
2. Update `experience`, `education`, and `certifications` arrays.
3. Update `skills.bids` and `skills.asks` in the Order Book section.
4. Update `projects` array with your flagship tools and repository URLs.
5. Replace `FORMSPREE_FORM_ID` in `src/pages/Contact.jsx` with your Formspree form ID.

---

## ⚡ Quick Start & Setup

### Prerequisites
- **Node.js** v18+
- **npm** v9+

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ranayashwant/rana-terminal.git
   cd rana-terminal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🚀 Deployment (Vercel)

This repository includes a pre-configured `vercel.json` file for single-page routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Simply import the repository on [Vercel](https://vercel.com/), keep default build settings (`npm run build`, output `dist`), and deploy!

---

## 👤 Author & Credits

- Designed & engineered by **Rana Yashwant** ([@ranayashwant](https://github.com/ranayashwant)).
- Built with AI pair programming assistance from **Google Antigravity** (powered by **Gemini 3.6 Flash** & **Claude 3.7 Sonnet**).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
