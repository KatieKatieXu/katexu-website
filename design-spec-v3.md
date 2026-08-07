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
| accent | `#00bc7d` | the `+` glyph, case-study pill border |
| accent-deep | `#00915f` | case-study pill text |
| accent-wash | `#e6f7f0` | case-study pill hover |

Accent is used sparingly and deliberately — one glyph and one outline. It is not a
fill color anywhere.

---

## Type scale

**Three sizes. Plus one exception.** Weight and color carry the hierarchy that size
used to. Do not add a fourth.

| Step | Size | Used for |
|---|---|---|
| display | `clamp(112px, 13.3vw, 191px)` | "Kate Xu" — the exception, nothing else |
| **1 · title** | 22px | project names — the biggest thing on the page |
| **2 · body** | 15px | everything else: nav, section labels, workflow titles, "Based in the U.S.", role line, "More", pills, arrows, decision titles, footer links |
| **3 · description** | 13px | descriptions only: slide captions, workflow flow lines, decision bodies, collaborators, copyright |

Weight and color per role:

| Role | Step | Weight | Tracking | Leading | Color |
|---|---|---|---|---|---|
| Name | display | 600 | -0.02em | 1.2 | `#111` |
| Project title | 1 | 600 | -0.4px | — | `#111` |
| Nav link | 2 | 400 | — | — | `#555` |
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

---

## Radius

| Token | Value | Applies to |
|---|---|---|
| media | 20px | carousel slide wells |
| card | 16px | workflow card |
| pill | full | all buttons |
| circle | full | carousel arrows (32×32) |

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

Rebuilt in Figma (`headerkatexu`, node `9:2`) and brought back into code. The name is
now the whole gesture: **191px display type**, with everything else deliberately small
around it. Two columns, top-aligned.

```
padding-top          24px
padding-bottom       40px
frame height        537px @ 1440
```

### Left column

```
name            clamp(112px, 13.3vw, 191px), 600, leading 1.2, tracking -0.02em
                nowrap — "Kate Xu" must never break
name → nav       -2px  (nav sits just inside the name's line-height slack)
nav             15px, underlined, justify-between across the NAME'S INK WIDTH
                ~668px at 191px — ratio 3.4955 x font-size, measured in Figma.
                Implemented as w-fit on the column + w-full on the nav, so it
                tracks the clamp automatically. Never hardcode 760px: that was
                the Figma text box, not the glyphs, and it overhung "Xu" by 92px.
nav → workflow   65px
workflow block  348px wide
  label          15px / 600 / uppercase / 1.5px tracking / #888
  label → items  11px
  items gap      11px
  title → flow    2px
  items → More   16px
  More           15px, underlined, #777
```

No tagline. No card, no white fill, no shadow — the workflow list is plain text now.

### Right column

```
gap to photo     17px
text column      right-aligned, justify-between over the photo's height
  "Based in the U.S."          15px, #000, top
  "Product Designer & Builder" 15px, #111, bottom
photo            187 × 187, object-cover, square, no radius
```

---

## Project section

```
padding-top      8px  (+32px on the h2)
padding-bottom  48px
divider         1px #f2f2f4, omitted on the last section
title → rail    16px
```

### Carousel rail

Horizontal scroll, snap-x mandatory, scrollbar hidden.

```
slide gap        16px
slide width      74% of container, capped at 1080px
phone slide      340px fixed
media well       radius 20, fill #f5f5f7, shadow as above
caption offset   28px below the well
caption width    max 460px
scroll step      76% of rail width, smooth
```

The caption sits **below** the slide, not beside it, and only on the first slide of
each project. Title runs inline in `#111` semibold, description follows in `#777`.

### Arrows

32×32 circles, `#f5f5f7` → `#ebebef` on hover, glyphs `‹` `›` at 15px `#6e6e73`.
Right-aligned, 12px under the rail. Hidden when a project has one slide.

### Action pills

All 15px/500, `px-16 py-6`, full radius, 10px apart.

| Pill | Fill | Text | Note |
|---|---|---|---|
| Key decisions | `#111` | white | primary, leftmost; leading `+` in `#00bc7d` rotates 45° when open |
| Full case study | none, 1px `#00bc7d` | `#00915f` | currently hidden — `caseStudyUrl` commented out |
| Try it live | `#f5f5f7` | `#555` | trailing `↗` |

### Decisions drawer

Collapsed by default. Expands height `0 → auto` with opacity, **320ms**, easing
`cubic-bezier(0.16, 1, 0.3, 1)`. Three decisions per project, 16px apart, 20px top
padding, 760px max width, collaborators line last.

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

1. Jobpilot
2. BofA Cloud
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
