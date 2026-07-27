# ⚡ RANA_TERMINAL — Software & Fintech Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-rana--terminal.vercel.app-E8A33D?style=for-the-badge&logo=vercel&logoColor=white)](https://rana-terminal.vercel.app/)
[![MF Screener Demo](https://img.shields.io/badge/Flagship_Demo-MF_Screener-3ECF8E?style=for-the-badge&logo=react&logoColor=white)](https://mf-screener-three.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A high-performance, terminal-inspired portfolio website for **Rana Yashwant Singh** — Software & Fintech Engineer, ex-Mutual Fund Distributor.

Built from scratch using **React 18, Vite, Vanilla CSS Design System, GSAP ScrollTrigger, and Vercel Serverless Functions**. Designed with a strict Bloomberg/Kite trading software aesthetic — monospace typography, dark paneling (`#0B0D0F`), amber signal accents (`#E8A33D`), and real-time financial market telemetry.

---

## 🎯 Engineering Philosophy & Spec §0 Rule

> **"Every number on this site is real — zero fabricated stats."**

Unlike typical portfolios with arbitrary skill percentages (e.g. *"90% C++"*), every statistic on this site maps to verifiable real-world metrics:
- **11,000+** Mutual fund schemes tracked via live AMFI REST API.
- **89TH %ILE** GATE CSE 2026 examination percentile score.
- **2+ YRS** Real fintech domain experience as an AMFI-certified MFD managing ₹40L+ AUM across 6 client portfolios.

---

## ✨ Key Features & Architecture

### 📊 1. Real-Time Live Financial Market Ticker (`/api/ticker`)
- **Serverless API Proxy:** Custom Node.js Vercel serverless function (`/api/ticker.js`) fetching real-time market data from Yahoo Finance & Open Exchange Rates.
- **Bypasses CORS:** Server-side fetching avoids browser CORS restrictions while serving fresh quotes for:
  - `NIFTY 50` (`▼ -0.43%`)
  - `SENSEX` (`▼ -0.43%`)
  - `NIFTY BANK` (`▲ +0.18%`)
  - `USD/INR` (`▲ +0.04%`)
- **Live Visual Ticks:** 15-second polling with soft green (`flash-green`) & red (`flash-red`) micro-tick highlights.

### 💼 2. Flagship Project: Mutual Fund Screener (`MFSC`)
- **Live Demo:** [mf-screener-three.vercel.app](https://mf-screener-three.vercel.app/)
- **Repository:** [github.com/ranayashwant/mf-screener](https://github.com/ranayashwant/mf-screener)
- **Features:**
  - **Live AMFI REST API Feed:** Filters 11,000+ active mutual fund schemes by category, risk, returns, and expense ratio under 50ms.
  - **SIP Deployment Planner:** Calculates optimal lump-sum vs. SIP installment splits.
  - **Fund Switch Planner:** Logic derived from 2+ years of real MFD practice, addressing features absent on Zerodha Coin & Groww.
  - **Interactive DevTools:** Built-in MySQL ER Diagram, Competitor Table, JSON Payload Inspector, and Screenshot Modal.

### 🤟 3. Flagship Project: Sign Language to Text Conversion (`SLTC`)
- **Repository:** [github.com/ranayashwant/Sign-Language-to-Text-Conversion](https://github.com/ranayashwant/Sign-Language-to-Text-Conversion)
- **Features:**
  - **Real-Time Webcam Inference:** Computer vision pipeline converting 21 hand gesture landmarks to live text.
  - **Pipeline Breakdown:** `Webcam Feed → MediaPipe 21 Landmarks (42 x,y normalized features) → Random Forest Classifier → Bounding Box Display`.
  - **Custom Dataset:** 400 manually captured gesture images across 4 classes.

### 📈 4. Financial Order Book Skills Section
- Modeled as a trading terminal **Order Book**:
  - **Bids (Core Stack):** JavaScript (ES6+), Node.js, Express.js, React, MySQL, C/C++, Git.
  - **Asks (Learning Stack):** Python (ML/CV), Cloud (Vertex AI), GSAP, Docker.
- Uses defensible status tags (`CORE / 3+ YRS`, `BACKEND API`, `PRODUCTION`, `GATE CSE`) instead of fake percentages.

### 📈 5. Interactive Career NAV Timeline
- Custom SVG line chart plotting career progression from MFD licensing (Jan 2023) to Industrial Training (UPRVUNL), B.Tech ECE (7.95 CGPA), and GATE CSE 2026.
- Staggered offset leader lines and mobile-responsive viewport scaling.

### ⌨️ 6. Terminal Command Palette (`Cmd/Ctrl+K`)
- Global modal triggerable via `Cmd+K` / `Ctrl+K`.
- Features real-time fuzzy search filtering, arrow key selection (`↑`/`↓`), `Enter` execution, and `Esc` close.

### 📬 7. Trade Ticket Contact Form (`/contact`)
- Framed as a trading order ticket (`SYMBOL: RANA_YASHWANT`, `STATUS: OPEN TO WORK`).
- Formspree AJAX endpoint integration with optional **Phone Number** and **Enquiry Type** dropdown (`Hiring`, `Backend Architecture`, `Freelance`, `Tech Chat`).

### 🍏 8. Apple-Style Scale & Depth Motion
- Hardware-accelerated GSAP & IntersectionObserver scroll reveals.
- Sections pop into view with scale expansion (`scale(0.96) → scale(1.0)`), depth blur, and cubic-bezier spring curves.
- Full `prefers-reduced-motion` compliance for accessibility.

---

## 🛠️ Tech Stack

- **Core:** JavaScript (ES6+), HTML5, Vanilla CSS3 (Tokens System)
- **Framework:** React 18, Vite, React Router DOM v6
- **Animations:** GSAP 3, ScrollTrigger, CSS Hardware Acceleration
- **Serverless / Backend API:** Node.js (Vercel API Functions)
- **Forms & Integration:** Formspree AJAX
- **Deployment:** Vercel (SPA Rewrite Configuration)

---

## 📁 Repository Structure

```text
rana-terminal/
├── api/
│   └── ticker.js                 # Vercel serverless function for live market API
├── public/
│   ├── favicon.svg               # Theme prompt favicon (amber '>')
│   ├── screenshots/              # High-res project previews
│   └── RANA YASHWANT SINGH Resume.pdf
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Sticky nav + Live Market Ticker bar
│   │   ├── MarketTicker.jsx      # Live NIFTY 50 / SENSEX / USD/INR ticker
│   │   ├── Hero.jsx              # Typewriter headline + count-up stats + CTAs
│   │   ├── Ticker.jsx            # Auto-scrolling ticker strip
│   │   ├── About.jsx             # "Asset Reallocation" split panel
│   │   ├── Experience.jsx        # Work history, education, certifications
│   │   ├── MFScreener.jsx        # Flagship MFSC detailed section & devtools
│   │   ├── SLTCDetail.jsx        # Flagship SLTC computer vision detail section
│   │   ├── Skills.jsx            # Order Book (Bids/Asks) + GitHub calendar API
│   │   ├── NAVTimeline.jsx       # SVG milestone line chart
│   │   ├── TradeTicket.jsx       # Reusable "Place an Order" CTA ticket
│   │   ├── CommandPalette.jsx    # Cmd/Ctrl+K terminal jump modal
│   │   └── Footer.jsx            # Build credit & copy-to-clipboard email link
│   ├── pages/
│   │   ├── Home.jsx              # Merged single-page layout
│   │   ├── Contact.jsx           # Trade ticket contact form page
│   │   ├── Resume.jsx            # Terminal-boot PDF viewer page
│   │   └── NotFound.jsx         # Custom 404 "SIGNAL LOST" page
│   ├── data/
│   │   └── content.js            # Single source of truth for all real site data
│   ├── hooks/
│   │   ├── useReveal.js          # GSAP & IntersectionObserver scroll hook
│   │   └── useDocumentTitle.js   # Dynamic per-route tab title hook
│   ├── styles/
│   │   ├── tokens.css            # CSS variables (colors, typography, grid)
│   │   ├── animations.css        # Apple-style scale & fade utility classes
│   │   └── [component].css
│   ├── App.jsx                   # Router root & global layout
│   └── main.jsx                  # React 18 entry point
├── index.html                    # SEO & Open Graph meta tags
├── vercel.json                   # SPA rewrite routing rules
└── package.json
```

---

## ⚡ Quick Start & Local Development

### Prerequisites
- **Node.js** v18+ 
- **npm** v9+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ranayashwant/rana-terminal.git
   cd rana-terminal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📬 Contact & Connect

- **Email:** [ranayashwant.dev@gmail.com](mailto:ranayashwant.dev@gmail.com)
- **LinkedIn:** [linkedin.com/in/ranayashwant](https://linkedin.com/in/ranayashwant)
- **GitHub:** [github.com/ranayashwant](https://github.com/ranayashwant)
- **Location:** India · Remote Open

---

*Designed & engineered by Rana Yashwant Singh.*
