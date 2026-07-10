export const NAV_LINKS = [
  { label: "Build", href: "#build" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

// Stable reference (module-level, computed once) — passing a freshly
// `.map()`'d array as a hook dependency would re-run the IntersectionObserver
// effect on every render.
export const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));
