"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider
      apiKey="phc_qntwD9D3rMVSYUqZBkgqQsooxS43EZYNVtJgnYQ29mVv"
      options={{
        api_host: "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: "identified_only",
      }}
    >
      {children}
    </PHProvider>
  );
}
