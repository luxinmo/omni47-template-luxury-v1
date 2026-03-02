import { useState, useEffect } from "react";

/**
 * Tracks whether a scrollable container has been scrolled past a threshold.
 */
export function useContainerScrolled(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 60
) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > threshold);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [ref, threshold]);

  return scrolled;
}
