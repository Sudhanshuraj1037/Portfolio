# Sudhanshu Labs — Roadmap

Milestone-based plan. Each milestone leaves the site in a deployable,
demo-able state — no half-wired features between checkpoints.

## Milestone 1 — Core Portfolio (in progress)
The narrative a recruiter needs in their first 90 seconds.
- [x] Foundation: folder structure, design tokens, Tailwind v4 setup
- [x] Navbar
- [x] Hero — R3F neural network background (signature element)
- [ ] Featured Project (case study format: Problem → Architecture → Stack → Roadmap)
- [ ] About / Engineering journey
- [ ] Projects grid (case-study cards, not screenshots)
- [ ] Skills (dependency graph, not progress bars)
- [ ] Contact
- [ ] Responsive pass + deploy to Vercel

## Milestone 2 — Engineering Content
Proof over claims.
- [ ] Interactive architecture diagrams per project
- [ ] GitHub dashboard (server-cached, not raw client-side API calls)
- [ ] Timeline / journey visualization
- [ ] Skills visualization refinement

## Milestone 3 — Premium Interactions
- [ ] GSAP scroll orchestration
- [ ] Lenis smooth scroll
- [ ] Glassmorphism surfaces where they earn their place
- [ ] Micro-interactions (hover states, button feedback)

## Milestone 4 — AI-Specific Features
- [ ] AI Playground (small, contained, sandboxed demos)
- [ ] AI Recruiter Assistant — backend-proxied, prompt strictly grounded in
      real resume/project data, rate-limited (never a client-exposed API key)
- [ ] Resume Q&A

## Milestone 5 — Production Polish
- [ ] SEO (meta tags, OG images, sitemap)
- [ ] Accessibility audit (target: Lighthouse 100)
- [ ] Performance audit (target: Lighthouse 95+, mobile included)
- [ ] Analytics
- [ ] Deployment hardening

---
### Standing decisions
- Hero signature element: R3F neural network (chosen over reasoning-trace
  text). The typed reasoning-trace hook (`src/hooks/useReasoningTrace.ts`)
  stays in the codebase — earmarked for reuse in the Milestone 4 terminal
  easter egg / AI Playground, not deleted.
- Design direction: dark, restrained, Apple × OpenAI. One accent color.
  Boldness spent in one place per section, not scattered.
- No inflated skill percentages, no cloned templates — borrow techniques,
  not whole designs.
