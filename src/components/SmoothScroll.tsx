"use client";

import { useSmoothScroll } from "@/lib/useSmoothScroll";

/** Window-level Lenis smooth scroll. Render once in the root layout. */
export function SmoothScroll() {
  useSmoothScroll<HTMLElement>();
  return null;
}
