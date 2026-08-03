"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

const EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -20 * t));

/**
 * Smooth scrolling via Lenis.
 *
 * - Call with no ref usage (ignore the return) is not supported; either:
 *   attach the returned ref to an inner scroll container, or
 *   render <SmoothScroll /> once for window-level smoothing.
 */
export function useSmoothScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    const lenis = target
      ? new Lenis({
          wrapper: target,
          content: target,
          duration: 0.7,
          easing: EASING,
        })
      : new Lenis({ duration: 0.7, easing: EASING });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return ref;
}
