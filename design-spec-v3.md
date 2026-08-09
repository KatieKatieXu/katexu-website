# katexu.com V3 — Design Spec

Extracted from `src/components/KatesWebsiteV3.tsx`. This is the source of truth for
rebuilding V3 in Figma and for validating any design that comes back out.
Desktop only (`md` and up); below `md` the page renders V2 untouched.

---

## Canvas

| Token | Value |
|---|---|
| Page background | `#ffffff` |
| Base text | `#111111` |
| Container max width | `1440px` |
| Container side padding | `40px` |
| Font family | Instrument Sans (single family, sitewide) |

Build Figma frames at **1440 wide** with 40px side padding, so the content column
is **1360px**.

---

## Color

| Name | Hex | Used for |
|---|---|---|
| ink | `#111111` | headings, body, primary button fill |
| ink-secondary | `#555555` | nav links |
| ink-tertiary | `#666666` | decision body copy |
| ink-quaternary | `#777777` | slide captions, workflow flow text |
| ink-muted | `#888888` | tagline, section label |
| ink-faint | `#999999` | collaborators line |
| ink-ghost | `#aaaaaa` | copyright |
| surface | `#f5f5f7` | media wells, arrow buttons, tertiary pill |
| surface-hover | `#ebebef` | arrow + tertiary pill hover |
| hairline | `#f2f2f4` | section divider |
| hairline-footer | `#f0f0f0` | footer top border |
| underline | `#d8d8d8` | nav link underline, resting |
**There is no accent colour.** The green (`#00bc7d` / `#00915f` / `#e6f7f0`) is gone
from the homepage, /lab, /resume and /how-i-think — replaced by ink and surface.
The page is now entirely black, greys and white. Hierarchy comes from weight,
size and value, never hue.

---

## Type scale

**Three sizes. Plus one exception.** Weight and color carry the hierarchy that size
used to. Do not add a fourth.

| Step | Size | Used for |
|---|---|---|
| display | `clamp(96px, 11.1vw, 160px)` | "Kate Xu" — the exception, nothing else |
| **1 · title** | 22px | project names — the biggest thing on the page |
| **2 · body** | 15px | everything else: nav, section labels, workflow titles, "Based in the U.S.", role line, "More", pills, arrows, decision titles, footer links |
| **3 · description** | 14px | descriptions only: slide captions, workflow flow lines, decision bodies, collaborators, copyright |

Weight and color per role:

| Role | Step | Weight | Tracking | Leading | Color |
|---|---|---|---|---|---|
| Name | display | 600 | -0.02em | 1.2 | `#111` |
| Project title | 1 | 600 | -0.4px | — | `#111` |
| Nav link | 2 | 400 | — | 1.45 | `#111`, no underline, hover `#777` |
| Section label | 2 | 600 | 1.5px, uppercase | — | `#888` |
| Workflow title | 2 | 600 | — | 1.375 | `#1a1a1a` |
| Role line / Based in the U.S. | 2 | 400 | — | 1.2 | `#111` / `#000` |
| Pill label | 2 | 500 | — | — | varies |
| Decision title | 2 | 600 | — | — | `#111` |
| Slide caption | 3 | 400 (name 600) | — | 1.55 | `#777` |
| Workflow flow | 3 | 400 | — | 1.375 | `#777` |
| Decision body | 3 | 400 | — | 1.6 | `#666` |
| Collaborators | 3 | 400 | — | — | `#999` |
| Copyright | 3 | 400 | — | — | `#aaa` |

The earlier half-pixel sizes (13.5, 12.5, 11.5, 10.5) are gone — collapsed into the
three steps above.

**14px is a hard floor.** Nothing on the page renders smaller, including the
decorative arrow on external links (`0.93em` of 15px = 13.95px, and it is
`aria-hidden` anyway). The gap between step 2 and step 3 is now only 1px, so the
two steps are separated by weight and colour, not size — which was already true
in practice.

---

## Radius

**Surfaces are sharp, controls are round.** Two values, and which one applies is
never a judgement call.

| | Radius | What |
|---|---|---|
| **Surface** | 4px | carousel media wells, the header portrait |
| **Control** | full | Key decisions / Full case study / Try it live, carousel arrows, the floating glass nav and everything inside it |

Anything that holds content gets the sharp corner. Anything you press stays
round. The rule is what keeps it from drifting back into a mix.

---

## Elevation

One shadow, used on both the workflow card and every media well. Learned from
apple.com/store — a tight contact shadow plus a wide, soft, heavily-offset ambient:

```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 18px 36px -24px rgba(0, 0, 0, 0.18);
```

No borders anywhere on cards. The shadow does all the separating.

---

## Header

Built from Figma node `33:61` (`headerkatexu`). Title-case name, a full-width rule
just under its baseline, nav hanging off the rule, then the workflow block.

```
padding-top     24px
padding-bottom   0px   — the project section supplies the gap below (40px total)
```

### The two custom properties

Set on the `<header>` so the name and the nav beneath it are driven by one number:

```css
--name-size:  clamp(96px, 11.1vw, 160px);
--name-width: calc(clamp(96px, 11.1vw, 160px) * 3.4955);
```

**3.4955** is the measured ink width of "Kate Xu" in Instrument Sans SemiBold at
**zero** tracking, per unit of font-size (Figma node 33:62). At 160px the name is
559px. Re-measure if the family, weight, tracking, or the name changes — the
uppercase variant is 3.9797, and -0.02em tracking gives different numbers again.

### Row 1 — name and identity

```
name        var(--name-size), 600, TITLE CASE, leading 1, tracking 0
            nowrap — must never break
right block items-stretch, 13px gap to the photo, right-aligned,
            justify-between over the photo height
  "Based in the U.S."                    15px  #111  top
  "8+ yrs - Product Designer & Builder"  15px  #111  bottom
photo       136 x 136, object-cover, radius 4, flush to the right edge
```

### Optical alignment — the whole point of this header

Both edges align to the **ink**, not the glyph box. Measured bearings in
Instrument Sans (Figma):

| Text | size | left bearing | right bearing |
|---|---|---|---|
| Kate Xu (SemiBold) | 160px | 9.92px = **0.062em** | 10.80px |
| Resume | 15px | 1.29px | 1.43px |
| Visual Lab | 15px | 0.54px | **1.24px** |
| LinkedIn arrow | 15px | 1.29px | **1.04px** |

So:

```
h1            margin-left: calc(var(--name-size) * -0.062)
              cancels the K's bearing; the ink starts at the column edge, and
              because it is em-relative it survives the clamp
nav left grp  margin-left: -1.29px
              width: calc(var(--name-width) + 2.53px)   (1.29 + 1.24)
              the R starts and the b ends on the same verticals as the name ink
nav right grp margin-right: -1.04px
              LinkedIn arrow ends on the column right edge
```

Geometric alignment is visibly wrong here — the name bearing alone is ~10px.

### Row 2 — the rule and the nav

```
rule        1px #e6e6e6, full width of the content column
            margin-top -10px   (~10px below the name baseline)
nav pt      20px
left group  width: calc(var(--name-width) + 2.53px), justify-between
            Resume / How I Think / Visual Lab
right group pinned to the far edge, 16px apart
            Email / LinkedIn, each with a trailing arrow

ALL nav links: 15px, NO underline, #111 ink, hover fades to #777.
The hover fade is the affordance the underline used to carry. Email and LinkedIn
use a V3-local ExternalLinkV3, NOT the ExternalLink exported from V2 — that one
is shared with the mobile site and keeps its underline.
```

**Why the negative margin.** "Kate Xu" contains no descenders, so the font descender
box overhangs the visible ink by ~12px at 160px. The -12px trims dead box so the
rule sits ~9px under the baseline, matching Figma. This is trimming, not
compensating for wrong leading — the distinction matters. If CSS `text-box:
trim-both cap alphabetic` becomes safe to rely on, that replaces this.

### Row 3 — workflow

```
rule -> workflow  250px
block width      348px
  label           15px / 600 / uppercase / 0.9px tracking / #888
  label -> items  13px
  items gap       11px
  title -> flow    3px
```

No tagline, no card, no shadow, and no "More" link.

---

## Project section

### Scroll reveal (learned from apple.com/mac)

Apple's sequence is always the same: the heading resolves first, the media
follows a beat later. Nothing arrives together, nothing bounces — one long
ease-out, no spring.

```
ease      cubic-bezier(0.28, 0.11, 0.32, 1)   long tail, no overshoot
trigger   whileInView, once: true, amount: 0.2
title     opacity 0->1, y 24->0        0.7s
rail      staggerChildren 0.12s
  slide   opacity 0->1, x -40->0       0.9s   — the row assembles left to right
actions   same as title, arriving after the media (section stagger 0.14s)
```

Wrapped in `<MotionConfig reducedMotion="user">`, so the whole page drops
transforms when the OS asks for it.

### Spacing

```
padding-top      8px on the FIRST section, 80px on every one after
                 (the first stays tight so the workflow block does not float)
                 (+32px on the h2)
padding-bottom  48px
divider         1px #f2f2f4, omitted on the last section
title row       full column width, items-center
                left:  project title (22px) + the action pills, 16px apart —
                       they read as one unit
                right: "Selected work @ 2026" — pinned to the far right edge,
                       FIRST PROJECT ONLY. Two-tone, same idea as the slide
                       caption: "Selected work" bold #111, " @ 2026" regular #777
decisions       expand directly under the title row, ABOVE the media, so the
                trigger and its content are adjacent
title → rail    16px
```

### Carousel rail

Horizontal scroll, snap-x mandatory, scrollbar hidden.

```
slide gap        16px
slide width      74% of container, capped at 1080px
phone slide      340px fixed
media well       radius 4 (surface), fill #f5f5f7, shadow as above
caption offset   28px below the well
caption width    max 460px
scroll step      76% of rail width, smooth
```

The caption sits **below** the slide, not beside it, and only on the first slide of
each project. Title runs inline in `#111` semibold, description follows in `#777`.

### Arrows

48×48 circles (control), `#f5f5f7` → `#ebebef` on hover, glyphs `‹` `›` at 22px/600 `#3a3a3c`,
with their own softer shadow `0 2px 8px rgba(0,0,0,0.12)` — the only place that
does not use the standard two-layer shadow. Right-aligned, 12px under the rail,
8px apart. Hidden when a project has one slide.

### Action pills

All 15px/500, `px-16 py-6`, full radius (control), 10px apart.

| Pill | Fill | Text | Note |
|---|---|---|---|
| Key decisions | `#111` | white | primary, leftmost; leading `+` in WHITE (ink is invisible on ink) rotates 45° when open |
| Full case study | none — Apple-style text link, no capsule | `#111` | trailing `›` chevron that nudges right on hover, underline on hover. Live on BofA Cloud → `/decks/bofa-cloud-v3.html`. Plain `<a target="_blank">`, NOT next/link — the deck is a static file in `public/` |
| Try it live | `#f5f5f7` | `#555` | trailing `↗` |

### Decisions drawer

Collapsed by default. Expands height `0 → auto` with opacity, **320ms**, easing
`cubic-bezier(0.16, 1, 0.3, 1)`. Sits between the title row and the media, with
24px bottom padding. Three decisions per project, 16px apart, 760px max width,
collaborators line last.

---

## Footer

```
padding      40px vertical
border-top   1px #f0f0f0
left         Email · LinkedIn, 15px, 20px gap
right        © Kate Xu 2026, 13px #aaa
```

---

## Project order

1. BofA Cloud
2. Jobpilot
3. PawPaw Story
4. ionboard
5. WorkIT
6. OneCo

---

## Notes for the Figma build

- Build the header, one carousel slide, and the workflow card as **components**, not
  loose frames. Layout changes should propagate.
- Media wells become static placeholders — the Jobpilot demos are MP4s and don't
  round-trip. Size the placeholder to the real video's aspect so spacing stays honest.
- Bind every color and size above to a **variable**, otherwise nothing that comes back
  out of Figma is diffable against this file.
- Name frames after the code, not after their position. `header/portrait`,
  `carousel/slide`, `pill/key-decisions`. That's what makes the return trip readable.
