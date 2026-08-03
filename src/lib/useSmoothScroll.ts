"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Asymmetric feel: soft clutch, hard brake.
// GLIDE_LERP applies while input is active (the pleasant resistance on start);
// once input goes idle, BRAKE_LERP takes over so the tail dies fast.
const GLIDE_LERP = 0.09;
const BRAKE_LERP = 0.45;
const INPUT_IDLE_MS = 90;

// macOS fires a zero-delta wheel event the moment fingers rest on the
// trackpad; without this filter Lenis cancels the in-flight glide sharply.
const ignoreRestingFingers = (data: { deltaX: number; deltaY: number }) =>
  !(data.deltaX === 0 && data.deltaY === 0);

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
          lerp: GLIDE_LERP,
          wheelMultiplier: 1,
          virtualScroll: ignoreRestingFingers,
        })
      : new Lenis({
          lerp: GLIDE_LERP,
          wheelMultiplier: 1,
          virtualScroll: ignoreRestingFingers,
        });

    // Engage the brake when wheel input stops: re-arm the in-flight
    // animation toward the same target with a much faster lerp.
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const onWheel = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        lenis.scrollTo(lenis.targetScroll, { lerp: BRAKE_LERP });
      }, INPUT_IDLE_MS);
    };
    const listenTarget: EventTarget = target ?? window;
    listenTarget.addEventListener("wheel", onWheel, { passive: true });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      clearTimeout(idleTimer);
      listenTarget.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return ref;
}
