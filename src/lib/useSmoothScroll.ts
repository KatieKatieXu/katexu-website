"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Asymmetric feel for mouse wheels: soft clutch, hard brake.
const GLIDE_LERP = 0.09;
const BRAKE_LERP = 0.45;
const INPUT_IDLE_MS = 90;

// Once trackpad input is seen, treat everything within this window as
// trackpad too — per-event heuristics misfire on fast flicks (Chrome's
// wheelDeltaY = deltaY * 3 collides with the 120-multiple mouse signature).
const TRACKPAD_LATCH_MS = 300;

// Per-event guess: discrete wheels report legacy wheelDeltaY in multiples
// of 120; trackpads usually don't. Fractional or small deltas → trackpad.
function looksLikeTrackpad(event: WheelEvent): boolean {
  if (event.deltaMode !== 0) return false;
  if (!Number.isInteger(event.deltaY)) return true;
  const wdy = (event as WheelEvent & { wheelDeltaY?: number }).wheelDeltaY;
  if (typeof wdy === "number" && wdy !== 0) return Math.abs(wdy) % 120 !== 0;
  return Math.abs(event.deltaY) < 40;
}

/**
 * Smooth scrolling via Lenis — mouse wheels only.
 * Trackpads get fully native scrolling (their OS inertia is already ideal;
 * smoothing on top stacks two physics systems and causes motion sickness).
 *
 * Attach the returned ref to an inner scroll container, or render
 * <SmoothScroll /> once (no ref) for window-level smoothing.
 */
export function useSmoothScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    let lastTrackpadAt = -Infinity;

    const isTrackpadNow = (e: WheelEvent) => {
      const now = performance.now();
      if (looksLikeTrackpad(e) || now - lastTrackpadAt < TRACKPAD_LATCH_MS) {
        lastTrackpadAt = now;
        return true;
      }
      return false;
    };

    const virtualScroll = (data: {
      deltaX: number;
      deltaY: number;
      event: Event;
    }) => {
      if (data.deltaX === 0 && data.deltaY === 0) return false;
      const e = data.event;
      if (e instanceof WheelEvent && isTrackpadNow(e)) {
        // Native scroll owns this stream. If Lenis has a leftover mouse
        // animation in flight, kill it so two systems never fight.
        if (lenis.isScrolling === "smooth") lenis.stop();
        return false;
      }
      return true;
    };

    const lenis = target
      ? new Lenis({
          wrapper: target,
          content: target,
          lerp: GLIDE_LERP,
          wheelMultiplier: 1,
          virtualScroll,
        })
      : new Lenis({ lerp: GLIDE_LERP, wheelMultiplier: 1, virtualScroll });

    // Mouse-only brake: when wheel ticks stop, re-arm the in-flight
    // animation toward the same target with a much faster lerp.
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: Event) => {
      if (e instanceof WheelEvent && isTrackpadNow(e)) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (lenis.isScrolling === "smooth") {
          lenis.scrollTo(lenis.targetScroll, { lerp: BRAKE_LERP });
        }
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
