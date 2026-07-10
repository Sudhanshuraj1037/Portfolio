import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in the "active zone" of the viewport
 * (below the fixed navbar, within the upper ~40% of the screen) and
 * returns its id. Used to highlight the matching nav link while scrolling.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Shrink the observed viewport: 96px off the top (fixed navbar +
        // breathing room) and 60% off the bottom, so a section only counts
        // as "active" while it occupies the upper-middle of the screen.
        rootMargin: "-96px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
