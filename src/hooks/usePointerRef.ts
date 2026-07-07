import { useEffect, useRef } from "react";

/**
 * Tracks normalized pointer position (-1 to 1) in a ref, not state —
 * so consumers (like an R3F useFrame loop) can read it every frame
 * without triggering React re-renders.
 */
export function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(clientX: number, clientY: number) {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((clientY / window.innerHeight) * 2 - 1);
    }

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return pointer;
}
