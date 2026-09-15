# Y ESWAR Portfolio — Revised Design System & Architecture

## Design Read
- **Artifact**: Interactive Editorial Portfolio
- **Audience**: AI/ML Researchers, Tech Leads, Creative Engineers
- **Visual Language**: High-end Editorial Tech (Mix of Swiss-Modernist and Experimental WebGL)
- **Mode**: Overhaul (Upgrading existing content to a premium experience)
- **Dials**: Visual Variance (9), Motion Intensity (8), Information Density (7), Asset Dependence (9), Brand Fidelity (10)

## Design Decisions

### 1. Identity & Naming
- **Primary Name**: **Y ESWAR** (Strictly this order).
- **Telugu Identity**: **నేను ఈశ్వర్**.
- **Logotype**: Custom terracotta monogram symbol + Y ESWAR in all-caps editorial serif.

### 2. The Mode Rail (Signature Interaction)
- **Placement**: Persistent vertical rail on the left or right viewport edge.
- **Controls**:
  - **Visual Mode**: Light / Dark (Smooth crossfade + displacement).
  - **Language**: English / తెలుగు (Instant content swap).
- **Interaction**: Vertical slider with subtle haptic-like animations and registration marks.

### 3. Visual Themes (Art-Directed Modes)
- **Light Mode**: Warm off-white paper (#F4F0E8), charcoal type, vermilion/terracotta accent (#B74E35). Editorial photographic treatment.
- **Dark Mode**: Near-black charcoal (#121212), warm white type, vermilion accent. Cinematic photographic treatment.
- **Hero Artwork**: Two distinct generated assets that crossfade/morph on mode toggle.

### 4. Typography System
- **Display**: **Cormorant Garamond** (Editorial serif) for headlines, oversized names, and Telugu script.
- **Body**: **IBM Plex Sans** (Modernist sans) for technical descriptions, metadata, and labels.
- **Telugu Typography**: Balanced weights to match the English editorial rhythm.

### 5. Motion & Interaction Architecture
- **Intro Sequence**: Cinematic sequence (HELLO → NAMASTE → నమస్తే → Y ESWAR → నేను ఈశ్వర్ → Identity) with blur, tracking, and displacement. Skip-intro logic with session storage.
- **Page Transitions**: Smooth staggered reveals, research-artifact indexing, and subtle parallax.
- **Research Archive**: Interactive research spread with "Question/Method/Outcome" metadata stamps.

### 6. Bilingual Content Logic
- **Mechanism**: React context-based translation provider.
- **Scope**: Navigation, Hero, Projects, Research, Skills, Experience, Education, Contact, and all microcopy.

## References
- Style Recipes: `references/style-recipes/linear.md` (for motion and spacing discipline).
- Design Calibration: `references/design-calibration.md`.
- Attached Master Build Prompt: `pasted_content.txt`.
