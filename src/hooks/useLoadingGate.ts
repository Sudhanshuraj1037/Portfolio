import { useCallback, useState } from "react";

const SESSION_KEY = "sudhanshu-labs:visited";

function shouldShowLoader() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return sessionStorage.getItem(SESSION_KEY) !== "1";
}

/**
 * Gates the main app behind the loading screen on first visit only.
 * Main content doesn't mount until the gate opens — so its entrance
 * animations play *after* the loading screen, not hidden behind it.
 */
export function useLoadingGate() {
  const [showLoader] = useState(shouldShowLoader);
  const [ready, setReady] = useState(() => !shouldShowLoader());

  const markDone = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setReady(true);
  }, []);

  return { showLoader, ready, markDone };
}
