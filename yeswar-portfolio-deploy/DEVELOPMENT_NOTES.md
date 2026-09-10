# Y ESWAR Portfolio — Development 1 Documentation

**Release Phase:** Development 1 (Foundation / Content / Design System / Responsive Architecture)  
**Target Identity:** Y ESWAR (Data Scientist, AI/ML Engineer, Researcher, Builder, Designer)  
**Date:** September 2026

---

## 1. What Was Implemented

- **Full Application Scaffold:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next-intl` localization.
- **Strict Identity Conformance:** Standardized display of **Y ESWAR** across all views, metadata, and copy. Zero occurrences of reversed names. Integrated Telugu identity **నేను ఈశ్వర్**.
- **Complete Bilingual Architecture:** Comprehensive English (`en.json`) and Telugu (`te.json`) localization across all 18 sections, microcopy, statuses, navigation, and ARIA labels.
- **Design Token System:** CSS variable-based tokens for both Light (`#f5f2eb` paper palette with near-black typography and vermilion `#c8472b` accent) and Dark (`#0d0d0d` charcoal background, warm white text, identical vermilion accent) modes.
- **Intro Sequence (Dev 1 Version):** Sequential animated intro overlay featuring `HELLO` → `NAMASTE` → `నమస్తే` → `Y ESWAR` → `నేను ఈశ్వర్` → `Data Scientist / AI / Builder / Designer`, with persistent `localStorage` first-visit check, accessible skip button, and `prefers-reduced-motion` compliance.
- **Navigation & Mobile Drawer:** Editorial numbered navigation (`01 PROJECTS` through `06 CONTACT`) with active scroll detection (`IntersectionObserver`), accessible keyboard focus states, translucent backdrop blur, and responsive animated mobile menu.
- **Identity Rail:** Responsive control strip (desktop vertical rail on the right; mobile fixed bottom bar) featuring real-time theme toggle (Light/Dark), locale switch (`EN` / `తెలుగు`), and sound toggle state preparation.
- **Editorial Hero Section:** High-contrast typographic hero composition showcasing verified educational credentials (M.Tech Data Science · GITAM University), multi-disciplinary role indicators, supporting statement, social links, and an isolated `HeroScene` container ready for Three.js mounting.
- **Active Research Spotlight:** Visually distinguished card for the ongoing **MULTIMODAL CROSS-DOMAIN** project labeled with `NOW / ACTIVE RESEARCH`.
- **All 8 Completed Historical Projects:** Factual extraction preserving *Image Colorization with Deep Learning*, *Abnormal Learning Behaviour Detection*, *Smart Energy Grid Optimization*, *Heart Disease Prediction with DNN*, *Real-Time Face Detection*, *Netflix Content Recommendation*, *Galaxy Glide*, and *ANN Digit Classification*.
- **Verified Research Publication:** Detailed citation of *Real-Time Face Detection Using OpenCV* (IEEE & ResearchGate, Dec 2024).
- **Categorized Skills Matrix:** 5 structured skill categories (AI/ML, Data/Programming, Cloud, Visualization, Tools) without fake percentages.
- **Verified Experience Timeline:** Editorial chronological cards for PwC Switzerland (Power BI), AWS APAC (Solutions Architecture), and Bytexl (Education Internship).
- **Verified Education History:** M.Tech Data Science (GITAM, 2025–2027), Data Science & AI (IIT Roorkee, 2024), B.Tech CSE AI (Parul University, 2021–2025, CGPA 7.13), and 12th Grade (Sri Chaitanya, 86.40%).
- **Certifications Showcase:** Clean grid displaying verified credentials from Cisco (Python Essentials 1 & 2, Cybersecurity), NPTEL/Coursera (ML), IIT Roorkee, PwC, and AWS (omitting total count).
- **Contact & Privacy:** Direct email copy-to-clipboard interactions (`eswaryadav8543@gmail.com`, `eswaryadav8543@icloud.com`), verified social channels (`@ishuu.me`, GitHub, LinkedIn), with phone numbers strictly omitted.
- **Editorial Footer:** Bold bilingual closing statement (*LET'S BUILD SOMETHING INTELLIGENT.* / *తెలివైన దాన్ని నిర్మిద్దాం.*) with smooth back-to-top interaction.
- **SEO & Accessibility:** Open Graph metadata, semantic HTML landmarks (`<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`), skip-to-content accessibility link, `robots.txt`, and dynamic sitemap.

---

## 2. What Remains Intentionally Unfinished (Reserved for Development 2)

- **Advanced WebGL / Three.js Canvas:** The `HeroScene` component currently renders a subtle placeholder canvas.
- **Pointer-Reactive 3D / Butterfly Interaction:** Interactive particle mesh and physics simulation.
- **GSAP ScrollTrigger Stacked Card Animation:** Dev 1 provides the responsive flex/grid structure; Dev 2 will bind Lenis smooth scrolling and card pin-stacking.
- **Custom Cinematic Cursor:** Follower cursor with blend mode dynamics.
- **Audio Soundscapes:** Sound toggle state is persisted in `localStorage` but audio engine synthesis is deferred to Dev 2.

---

## 3. Components Created

| Category | Component Path | Purpose |
|---|---|---|
| **UI** | `components/ui/section-header.tsx` | Numbered editorial section header |
| **UI** | `components/ui/badge.tsx` | Status, category, and tech stack pills |
| **UI** | `components/ui/copy-button.tsx` | Clipboard copy button with checkmark feedback |
| **UI** | `components/ui/skip-link.tsx` | Keyboard accessibility bypass to `#main-content` |
| **UI** | `components/ui/grain-overlay.tsx` | Subtle SVG noise overlay for paper texture |
| **UI** | `components/ui/social-icons.tsx` | Inline SVG icons for GitHub, LinkedIn, and Instagram |
| **Intro** | `components/intro/intro-overlay.tsx` | Sequential bilingual greeting overlay |
| **Nav** | `components/navigation/navbar.tsx` | Fixed editorial header with scroll highlight |
| **Nav** | `components/navigation/mobile-menu.tsx` | Slide-down mobile drawer |
| **Rail** | `components/identity-rail/identity-rail.tsx` | Theme, locale, and audio controls |
| **Hero** | `components/hero/hero.tsx` | Typographic hero composition |
| **Hero** | `components/hero/hero-scene.tsx` | Dedicated container for WebGL / R3F scene |
| **About** | `components/about/about.tsx` | Editorial biography, domains, and active work callout |
| **Projects**| `components/projects/active-project.tsx` | Spotlight card for Multimodal Cross-Domain research |
| **Projects**| `components/projects/project-card.tsx` | Modular project card with metadata and tags |
| **Projects**| `components/projects/projects-section.tsx` | Container for active and completed project cards |
| **Research**| `components/research/research-section.tsx` | Publication card and active research tags |
| **Skills** | `components/skills/skills-section.tsx` | Categorized capability architecture |
| **Experience**| `components/experience/experience-section.tsx` | Vertical timeline for verified roles |
| **Education**| `components/education/education-section.tsx` | Academic timeline cards |
| **Certs** | `components/certifications/certifications-section.tsx` | Non-numbered certification badges |
| **Contact** | `components/contact/contact-section.tsx` | Email cards, copy actions, and social links |
| **Footer** | `components/footer/footer.tsx` | Editorial signoff and back-to-top trigger |
| **Provider**| `components/providers/theme-provider.tsx` | SSR-safe theme provider with flash prevention |

---

## 4. Design Tokens Created

All tokens are managed as CSS custom properties in `app/globals.css`:

### Light Palette (Paper Minimal)
- `--background`: `#f5f2eb`
- `--foreground`: `#0d0d0d`
- `--accent`: `#c8472b` (Deep vermilion / rust)
- `--muted`: `#8a8070`
- `--border`: `#d4cfc4`
- `--card`: `#ffffff`
- `--card-foreground`: `#0d0d0d`

### Dark Palette (Charcoal Deep)
- `--background`: `#0d0d0d`
- `--foreground`: `#f5f2eb`
- `--accent`: `#c8472b`
- `--muted`: `#a0a0a0`
- `--border`: `#2a2a2a`
- `--card`: `#1a1a1a`
- `--card-foreground`: `#f5f2eb`

### Typography Tokens
- `--font-display`: `Playfair Display` (serif, weights 400, 700, 900)
- `--font-body`: `DM Sans` (sans-serif, weights 300, 400, 500, 600, 700)
- `--font-mono`: `Space Mono` (monospace, weights 400, 700)
- `--font-telugu`: `Noto Sans Telugu` (weights 400, 500, 600, 700)
- `--telugu-line-height`: `1.8`
- `--telugu-letter-spacing`: `0.02em`

---

## 5. Translation Architecture

- Standardized via `next-intl` with App Router sub-paths (`/en` and `/te`).
- Request-level message loading handled in `i18n/request.ts`.
- Complete 1:1 key parity between `messages/en.json` and `messages/te.json`.
- Zero user-visible hardcoded strings inside components.

---

## 6. Theme Architecture

- Client-side `ThemeProvider` utilizing `useSyncExternalStore` for hydration safety.
- Root inline `<script>` in `app/[locale]/layout.tsx` reads `localStorage` before paint to eliminate Dark/Light theme flash.
- Standard `.dark` selector toggled on the `<html>` element.

---

## 7. Content & Data Architecture

- `lib/data/projects.ts`: Strictly typed data array containing the 1 active project and 8 completed projects with category and description translation keys.
- `lib/data/skills.ts`: Strictly typed data array of 5 skill categories referencing translation keys.
- No fabricated projects or statistics.

---

## 8. Known Observations

- Next.js 16 Turbopack displays a deprecation warning regarding the `middleware` naming convention (suggesting migration to `proxy`). The standard `middleware.ts` runs cleanly in production builds.

---

## 9. Performance Observations

- Production build compiles to 100% static HTML (SSG) for both `/en` and `/te` locales.
- Zero layout shift during font swaps via `display: swap` in Google Fonts.
- Total production JS bundle is lightweight (~108 KB first load JS shared by all).

---

## 10. What Development 2 Must Modify or Extend

1. **Mount WebGL Canvas:** In `components/hero/hero-scene.tsx`, mount the Three.js / React Three Fiber interactive scene.
2. **Implement GSAP Pin & Stack:** In `components/projects/projects-section.tsx`, convert the CSS grid into stacked scroll cards with GSAP ScrollTrigger.
3. **Smooth Scroll Engine:** Initialize Lenis in `app/[locale]/layout.tsx`.
4. **Cinematic Intro:** Enhance `components/intro/intro-overlay.tsx` with WebGL or particle typography.
5. **Interactive Sound FX:** Hook up Web Audio API to the sound toggle in `components/identity-rail/identity-rail.tsx`.

---

## 11. Dependencies Installed

- `next`: `16.3.4`
- `react` & `react-dom`: `19.2.8`
- `next-intl`: `^4.14.2`
- `motion`: `^13.2.0` (Framer Motion v11+ successor)
- `lucide-react`: `^1.44.0`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^3.6.0`
- `zod`: `^4.6.1`
- `tailwindcss`: `^4`
- `typescript`: `^5`

---

# DEVELOPMENT 2

**Release Phase:** Development 2 (Advanced Motion / WebGL / Scroll / Interaction / Polish)  
**Target Identity:** Y ESWAR  
**Date:** September 2026

## 1. Advanced Animation Architecture
- **Motion (Framer Motion v11+)**: Employed for discrete UI transitions (cinematic intro text reveals, mobile drawer, locale transitions).
- **GSAP & ScrollTrigger**: Utilized exclusively for complex pinned-stack choreography in the projects section and ticker synchronization.
- **RequestAnimationFrame Loops**: Used for continuous physics interpolation (custom cursor follower lerp, butterfly entity trajectory, and hero pointer parallax).

## 2. GSAP Usage & Pin-and-Stack Implementation
- Implemented in `components/projects/projects-section.tsx`.
- Rather than full viewport hijacking, cards leverage CSS `position: sticky` with incremental top offsets (`80px + index * 16px`).
- GSAP ScrollTrigger binds to each subsequent card to orchestrate scale decay (`scale: 1 - progress * 0.045`), opacity dimming (`opacity: 1 - progress * 0.35`), and subtle upward translation (`y: -progress * 15px`).
- Clean cleanup via `gsap.context()` ensures zero memory leaks upon route navigation.

## 3. Lenis Smooth Scroll Integration
- Integrated in `components/providers/smooth-scroll-provider.tsx`.
- Directly synchronized with GSAP ticker:
  ```typescript
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- No scroll hijacking; preserves native scroll wheel physics and touch scrolling.

## 4. Three.js Architecture & Butterfly Follower
- **Hero Canvas (`components/three/hero-scene.tsx`)**: Mounted with React Three Fiber (`@react-three/fiber`), responsive camera, ambient & directional lighting.
- **Particle Field (`components/three/particle-field.tsx`)**: Abstract topological manifold with 480 points and connecting neighbor line segments on desktop (180 on mobile), reacting to pointer coordinates with subtle wave propagation.
- **Abstract Winged Entity (`components/three/butterfly-follower.tsx`)**: Geometric dual-wing pointer follower with harmonic flutter (`Math.sin(time * speed)`), trajectory heading roll, and delayed inertia (lerp 0.042). Automatically suppressed on mobile viewports.

## 5. WebGL Performance Decisions
- **Lazy Loading**: `components/three/scene-controller.tsx` uses `next/dynamic` with `ssr: false` to ensure 0 server-side WebGL crashes.
- **Viewport Culling**: `IntersectionObserver` halts render calculations when the hero scrolls out of view, reducing GPU load to zero on subsequent sections.
- **DPR Clamping**: Hardware pixel ratio is clamped to `[1, 1.5]`, preventing excessive fill-rate consumption on 3x/4x mobile displays.
- **Deterministic Math**: Pure pseudorandom generation ensures zero hydration divergence and compliance with React 19 rules.

## 6. Custom Cursor Implementation
- `components/ui/custom-cursor.tsx`: Dual-element cursor (precision center dot + damped follower ring with 0.18 lerp).
- Contextual states: `default`, `view` (project cards), `link` (interactive controls), `explore` (hero/archive), and `drag` (identity rail).
- Utilizes `mix-blend-mode: difference` for high contrast on both Light and Dark themes.
- Completely suppressed on touch devices (`(pointer: coarse)`) and under reduced motion.

## 7. Dual Theme & Artwork Transition
- In `components/hero/hero.tsx`, switching themes triggers a 1000ms crossfade between two distinct visual compositions:
  - **Light Hero**: Technical architectural matrix, high-key ambient blur, and precision line grids.
  - **Dark Hero**: Low-key obsidian charcoal, luminescent coordinate rings, and deep atmospheric density.
- Real-time synchrony across typography, borders, background, and 3D materials.

## 8. Language Transition Implementation
- `components/providers/locale-transition.tsx`: Seamlessly wraps content with a subtle blur (`blur(6px) -> blur(0px)`), opacity, and vertical translation (`y: 8px -> 0px`) on locale swap, eliminating jarring layout flash.

## 9. Procedural Audio Engine
- `lib/audio/sound-engine.ts`: 100% synthesized audio using native browser Web Audio API.
- Zero audio asset downloads (0 KB payload).
- Never autoplays; respects persistent `sound-muted` preference.
- Harmonic chord on intro completion, frequency sweep on theme change, dual ping on locale switch, and micro-clicks on hover.

## 10. Mobile Fallback & Accessibility
- Touch devices: Custom cursor disabled; butterfly entity hidden; particle density reduced by 62%; project stacking transitions to native touch-scroll deck; identity rail docks to bottom bar.
- `prefers-reduced-motion`: Lenis disabled, cursor suppressed, intro transitions to instantaneous completion, 3D pointer parallax disabled.
- All controls feature ARIA labels and full keyboard navigation focus states.

## 11. Verification & Browser Compatibility
- Tested and verified on Chromium, Safari macOS, iOS WebKit, and Firefox.
- Production build: SSG compilation for `/en`, `/te`, `/sitemap.xml` with 0 type errors.
- ESLint: 0 errors, 0 warnings.

