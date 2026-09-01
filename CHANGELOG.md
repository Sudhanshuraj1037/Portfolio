# Changelog

All notable changes to this project are documented here.

## [0.2.0] — Milestone 2: Production Readiness

### Added
- Active section highlighting in the navbar (sliding underline, IntersectionObserver-based)
- Mobile navigation drawer with focus trap, Escape-to-close, body scroll lock
- Mobile-native architecture diagram (portrait, condensed) + fullscreen expand for the desktop diagram
- What I Build section (3 specialization pillars)
- Loading screen (first-visit only, session-gated)
- Error boundary around the R3F canvas — WebGL failure now falls back gracefully instead of a blank screen
- Full SEO: Open Graph, Twitter Card, canonical, theme-color, robots.txt, sitemap.xml, manifest.webmanifest
- GitHub Actions CI: typecheck, lint, build on every push/PR
- LICENSE (MIT), professional README

### Changed
- Hero headline: "Engineering AI that solves real problems." — restructured to mission → person → skills ordering
- Hero fixed a broken Tailwind arbitrary-value bug (`text-[color:var(--text-5xl)]` was setting an invalid `color`, not `font-size` — verified via compiled CSS output) and given a proper 3-step mobile-first size progression
- Contrast: 8 instances of `text-tertiary` on real content swapped to `text-secondary` (2.89:1 → 5.76:1, passes WCAG AA)
- `FadeIn` (used ~15+ times sitewide) now respects `prefers-reduced-motion`
- `FeaturedProject.tsx` refactored into 7 subcomponents split by responsibility (`featured-project/`)
- Architecture diagram system refactored into `architecture/` with shared SVG primitives (no duplication between desktop/mobile versions)
- Removed 2 genuinely-unused dependencies (`@radix-ui/react-slot`, `class-variance-authority`)

### Fixed
- Dead navigation links (`WhatIBuild` had no `id`, `Skills`'s id didn't match its nav label)
- Fixed-navbar content clipping on anchor jumps (`scroll-padding-top`)
- One touch-target below WCAG 2.5.8 minimum (MobileNav close button)
- A duplicate `<caption>` element introduced mid-session (invalid HTML5, caught and fixed same session)

## [0.1.0] — Milestone 1: Core Portfolio

### Added
- Project foundation: Vite + React 19 + TypeScript + Tailwind v4, design token system
- Hero with R3F neural network background (lazy-loaded, motion-gated)
- Flagship AI System case study (Blind Assistant): problem, architecture, fusion engine, deployment, challenges, roadmap — grounded in the real repository
- About (engineering journey), Skills, Projects, Contact, Footer
- Navbar with scroll-aware backdrop blur
