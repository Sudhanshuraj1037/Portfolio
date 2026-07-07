import { useEffect, useRef, useState } from "react";

/**
 * Streams an array of lines character-by-character, like watching
 * inference tokens resolve. This is the hero's signature element —
 * grounded in what the subject (an AI engineer) actually works with,
 * not a decorative animation.
 */
export function useReasoningTrace(lines: string[], charDelayMs = 14) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduceMotion.current) {
      setDisplayedLines(lines);
      setDone(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    const output: string[] = [];

    function tick() {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex];
      charIndex++;
      output[lineIndex] = currentLine.slice(0, charIndex);
      setDisplayedLines([...output]);

      if (charIndex >= currentLine.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 240); // pause between lines
      } else {
        setTimeout(tick, charDelayMs);
      }
    }

    const start = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines, charDelayMs]);

  return { displayedLines, done };
}
