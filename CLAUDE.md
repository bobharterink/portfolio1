# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview built output
```

## Architecture

Vanilla JS + Vite multi-page site (no framework). Two entry points:
- `index.html` — main portfolio page
- `cv/index.html` — CV viewer (embeds PDF from `public/`)

**Core files:**
- [script.js](script.js) — All UI logic: marquee carousel, drag/swipe, pill→details flow, state, GSAP animations
- [styles.css](styles.css) — All styles, layout, responsive breakpoints
- [translate.js](translate.js) — i18n system + NL/EN dropdown; persists to `localStorage`
- [three.js](three.js) — Rotating logo: loads `logo.glb`, renders to `.logo-3d` container
- [three-bg.js](three-bg.js) — Hover effect on Studio Harterink pill: loads `Untitled111.glb` + `baked1.jpg` from `public/`, renders fullscreen canvas (`mix-blend-mode: normal`)

## Static Assets

Vite only serves `public/` as the static root. GLB files and textures used at runtime must live in `public/`, not the project root. GLB files in the project root (e.g. `logo.glb`, `golfv2-transformed.glb`) are bundled by Vite at build time via imports; runtime-loaded assets (loaded via string path in Three.js) must be in `public/`.

## Key Patterns

**Pill flow:** Clicking a pill goes directly to `openDetails()` — there is no intermediate expanded state. `closeDetails()` calls `initMarquee()` on complete to resume the loop.

**Marquee:** HTML is quadruplicated on init (`origBarHTML * 4`). `initMarquee()` positions the bar at the second copy (`-singleWidth`) so there is always one full copy available left and right for drag. `normalizeX()` keeps the bar in `[-2*singleWidth, -singleWidth]` during drag and momentum.

**Drag:** Uses `pointerdown/pointermove/pointerup` on `window`. `wasDragging` prevents a drag from firing a pill click. Per-frame `normalizeX()` on both drag and momentum tween prevents empty-screen gaps.

**Project colors:** Each project has a `data-project` attribute (`studio`, `oog`, `fizzi`, `dirk`) on both `.bar-inner` pills and `.overview-card` elements. CSS targets `[data-project="x"]` for background color. The bar HTML is quadruplicated so `data-project` must be on the original HTML — it gets copied automatically.

**State:** Global booleans `isDetailsOpen`, `isOverviewOpen`, `isAnimating`, `activePill` and offset `detailsShift` in `script.js`.

**Translations:** DOM elements use `data-i18n="key"`. Language stored in `localStorage` under key `"lang"`.

**Responsive:** Breakpoints at 600px and 1025px checked via `window.innerWidth` in GSAP callbacks and CSS media queries.
