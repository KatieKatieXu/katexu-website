# Desktop Scroll Bug — Research Notes

## Symptom
Trackpad two-finger scroll doesn't work when cursor is over the main content area (showcase panel, background, orbit rings). Only works on the scrollbar.

## Root cause hypothesis
`pointerEvents: "none"` on the Framer Motion wrapper div does NOT reliably forward **wheel events** to `window`. Wheel events have different propagation behavior than click events — they don't bubble past an element that has any scroll context, and Framer Motion may add internal listeners that intercept them.

## What we've tried
- `overflowY: auto` on inner div → trackpad didn't work (scroll captured by div, not window)
- `pointerEvents: none` on wrapper → trackpad still didn't work (wheel events not forwarded)
- `overflowX: hidden` on root div → no change

## Correct fix approach
The page should scroll via the **document/window naturally** — not via any div's overflow. To achieve this:

1. Remove `pointerEvents: none` from the motion wrapper entirely
2. Ensure the root `<div>` has NO overflow property set (not hidden, not auto, not scroll)
3. The `fixed inset-0` background already has `pointer-events-none` ✓
4. The showcase glass panel has `overflow: hidden` internally — that's fine, it's not the scroll container
5. Make sure `<html>` and `<body>` have `overflow: auto` or default (check globals.css)

## Check globals.css
```css
/* If this exists, it kills page scroll: */
html, body { overflow: hidden; }
/* Should be: */
html, body { height: 100%; } /* or just nothing */
```

## Plan
1. Check globals.css for any overflow:hidden on html/body
2. Remove pointerEvents:none from the motion wrapper  
3. Remove overflowX:hidden from root div
4. Test — page should scroll naturally via window
5. If showcase inner content still needs scroll on short viewports, add a CSS class with overflow-y:auto only on the inner content div, not the page wrapper
