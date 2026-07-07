import { lazy, Suspense, useEffect, useState } from "react";
import { usePointerRef } from "@/hooks/usePointerRef";

// Lazy boundary drawn here — before any @react-three/fiber or three import,
// so the ~340KB of library weight never enters the main bundle and only
// downloads if motion is actually allowed.
const NeuralNetworkCanvasInner = lazy(
  () => import("./NeuralNetworkCanvasInner")
);

/**
 * Hero background. Mounts the R3F scene only when motion is allowed —
 * on prefers-reduced-motion, renders nothing (and never fetches the
 * three.js chunk at all) so the CSS ambient glow in Hero.tsx carries
 * the visual on its own.
 */
export function NeuralNetworkBackground() {
  const pointerRef = usePointerRef();
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAllowMotion(!query.matches);
    const onChange = () => setAllowMotion(!query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  if (!allowMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 65% at 72% 42%, black 0%, black 35%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 65% at 72% 42%, black 0%, black 35%, transparent 78%)",
      }}
    >
      <Suspense fallback={null}>
        <NeuralNetworkCanvasInner pointerRef={pointerRef} />
      </Suspense>
    </div>
  );
}
