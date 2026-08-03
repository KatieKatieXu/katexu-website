"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Asymmetric feel: soft clutch, hard brake.
// GLIDE_LERP applies while input is active (the pleasant resistance on start);
// once input goes idle, BRAKE_LERP takes over so the tail dies fast.
const GLIDE_LERP = 0.09;
const BRAKE_LERP = 0.45;
const INPUT_IDLE_MS = 90;

// Trackpads already have native OS inertia — smoothing on top of it stacks
// two physics systems and causes motion sickness. So Lenis only handles
// discrete mouse-wheel ticks; trackpad events fall through to native scroll.
// Heuristic: discrete wheels report legacy wheelDeltaY in multiples of 120.
function isTrackpad(event: WheelEvent): boolean {
  if (event.deltaMode !== 0) return false;
  const wdy = (event as WheelEvent & { wheelDeltaY?: number }).wheelDeltaY;
  if (typeof wdy === "number" && wdy !== 0) return Math.abs(wdy) % 120 !== 0;
  return Math.abs(event.deltaY) < 40;
}

// Also ignore zero-delta events (fingers resting on the trackpad) so they
// never chop an in-flight glide.
const smoothMouseOnly = (data: {
  deltaX: number;
  deltaY: number;
  event: Event;
}) => {
  if (data.deltaX === 0 && data.deltaY === 0) return false;
  const e = data.event;
  if (e instanceof WheelEvent && isTrackpad(e)) return false;
  return true;
};

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
          virtualScroll: smoothMouseOnly,
        })
      : new Lenis({
          lerp: GLIDE_LERP,
          wheelMultiplier: 1,
          virtualScroll: smoothMouseOnly,
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
