import { useRef, useState, type MouseEvent } from "react";
import { User } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNERS: CornerPosition[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

function CornerBracket({ position }: { position: CornerPosition }) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const path =
    isTop && isLeft
      ? "M1 8 V1 H8"
      : isTop && !isLeft
        ? "M12 1 H19 V8"
        : !isTop && isLeft
          ? "M1 12 V19 H8"
          : "M12 19 H19 V12";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="absolute h-5 w-5"
      style={{
        top: isTop ? 8 : undefined,
        bottom: !isTop ? 8 : undefined,
        left: isLeft ? 8 : undefined,
        right: !isLeft ? 8 : undefined,
      }}
    >
      <path
        d={path}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Editorial/technical portrait treatment — a framed panel with viewfinder-
 * style corner brackets, not a generic circular avatar. Pass `src` once a
 * real photo exists; until then it renders a polished "pending" state.
 * Tilt + light-sweep are desktop-only and explicitly disabled under
 * prefers-reduced-motion (parallax/tilt is a common vestibular trigger,
 * so this is gated in JS, not left to rely on the global transition-
 * duration override alone).
 */
export function PortraitPanel({ src, alt }: { src?: string; alt?: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tiltRange = 4; // degrees — subtle, not a gimmick
    setTilt({ x: (py - 0.5) * -tiltRange * 2, y: (px - 0.5) * tiltRange * 2 });
    setGlow({ x: px * 100, y: py * 100, active: true });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, active: false }));
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto aspect-[4/5] w-full max-w-xs [perspective:1000px] sm:mx-0"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[var(--radius-md)] border transition-transform duration-300 ease-out"
        style={{
          borderColor: "var(--color-border-strong)",
          backgroundColor: "var(--color-surface)",
          transform: reducedMotion
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {src ? (
          <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <User
              className="h-10 w-10"
              style={{ color: "var(--color-text-tertiary)" }}
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
              Portrait — pending
            </p>
          </div>
        )}

        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glow.active ? 1 : 0,
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--color-signal) 12%, transparent), transparent 55%)`,
            }}
          />
        )}

        {CORNERS.map((corner) => (
          <CornerBracket key={corner} position={corner} />
        ))}
      </div>
    </div>
  );
}
