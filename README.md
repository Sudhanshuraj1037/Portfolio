# Sudhanshu Labs

The portfolio of Sudhanshu Raj, an AI Systems Engineer — applied ML, computer
vision, and full-stack engineering, shown through real production systems
instead of a project list.

**Live:** _deploy pending_ · **Flagship case study:** [Blind Assistant](https://github.com/Sudhanshuraj1037/Blind-AI)

## Why this exists

Most portfolios describe skills. This one demonstrates systems — the
flagship section walks through a real engineering decision (a priority-
scheduled fusion engine arbitrating seven concurrent perception models on
CPU-only hardware), not a screenshot and a tech-stack badge list.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Three Fiber ·
Framer Motion

Every dependency in `package.json` is either in active use or reserved for
a specific, planned Milestone 3 feature — see [`ROADMAP.md`](./ROADMAP.md)
for which is which.

## Engineering principles

- **No fabricated content.** No placeholder metrics, no fake demo links, no
  invented project names. If real data doesn't exist yet, the section stays
  unbuilt rather than filled with plausible-sounding filler.
- **Honest capability labeling.** Skills are marked shipped vs. actively
  in-progress — never inflated.
- **Every animation has a stated reason.** Prefers-reduced-motion is
  respected throughout, including the WebGL scene.
- **No decorative 3D.** The neural network in the hero represents a real
  data-flow concept, not a stock Three.js scene.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (tsc -b && vite build)
npm run lint      # oxlint
```

## Project structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, LoadingScreen, MobileNav
│   ├── sections/       # Hero, FeaturedProject, About, Skills, Projects, Contact
│   │   ├── architecture/   # diagram system: desktop, mobile, fullscreen modal
│   │   └── featured-project/  # case-study subsections
│   ├── three/          # R3F neural network scene, lazy-loaded, error-bounded
│   └── ui/              # shared primitives (FadeIn, etc.)
├── hooks/               # usePrefersReducedMotion, useActiveSection, etc.
├── lib/                 # navigation data, utils
└── styles/               # design tokens (tokens.css) — single source of truth
                          # for color, type, spacing, motion
```

## Status

Milestone 1 (foundation) and Milestone 2 (production-readiness — nav,
responsive, accessibility, performance, error handling, SEO) complete.
See [`ROADMAP.md`](./ROADMAP.md) for the full milestone plan and standing
decisions, and [`CHANGELOG.md`](./CHANGELOG.md) for release history.

## License

MIT
