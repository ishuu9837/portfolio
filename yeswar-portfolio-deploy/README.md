# Y ESWAR — Interactive Portfolio

Official portfolio of **Y ESWAR** — Data Scientist, AI/ML Engineer, Researcher, Builder, Designer.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis Smooth Scroll, and `next-intl` bilingual support (English & Telugu).

---

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## Production Build & Verification

```bash
# Build static production bundle
npm run build

# Run linter
npm run lint

# Start production server
npm run start
```

---

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Create a new repository on GitHub (e.g. `yeswar-portfolio`).
2. Push this project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Y Eswar Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Go to [Vercel](https://vercel.com/new).
4. Select your GitHub repository and click **Import**.
5. Vercel automatically detects Next.js:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** Next.js default (`.next`)
   - **Install Command:** `npm install`
6. Click **Deploy**. Your portfolio will be live in ~1 minute!

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy directly from terminal
vercel
```

---

## Tech Stack & Architecture

- **Framework:** Next.js 16 App Router & React 19
- **Styling:** Tailwind CSS v4 with CSS variable design tokens
- **Bilingual i18n:** `next-intl` with English (`/en`) & Telugu (`/te`) routing
- **3D / WebGL:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Choreography:** GSAP ScrollTrigger & Motion (`motion/react`)
- **Smooth Scroll:** Lenis smooth scrolling synchronized with GSAP ticker
- **Audio Engine:** Native browser Web Audio API procedural synthesis
- **Typography:** Playfair Display, DM Sans, Space Mono, Noto Sans Telugu

---

## Documentation

- [DEVELOPMENT_NOTES.md](./DEVELOPMENT_NOTES.md) — Architecture, tokens, and technical decisions
- [TODO_DEVELOPMENT_2.md](./TODO_DEVELOPMENT_2.md) — Feature delivery record
- [FINAL_POLISH.md](./FINAL_POLISH.md) — Browser, accessibility, and performance audit
