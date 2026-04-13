"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_qntwD9D3rMVSYUqZBkgqQsooxS43EZYNVtJgnYQ29mVv", {
      api_host: "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true, // enables time-on-page tracking
      person_profiles: "identified_only",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
