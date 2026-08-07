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

| Role | Size | Weight | Tracking | Leading | Color |
|---|---|---|---|---|---|
| Name (h1) | 19px | 600 | — | tight | `#111` |
| Tagline | 13.5px | 400 | — | snug | `#888` |
| Nav link | 13.5px | 400 | — | — | `#555` |
| Project title (h2) | 22px | 600 | -0.4px | — | `#111` |
| Slide caption | 13px | 400 (title 600) | — | 1.55 | `#777` |
| Section label | 10.5px | 600 | 1.5px, uppercase | — | `#888` |
| Workflow title | 13px | 600 | — | snug | `#1a1a1a` |
| Workflow flow | 11.5px | 400 | — | snug | `#777` |
| Decision title | 14px | 600 | — | — | `#111` |
| Decision body | 13.5px | 400 | — | 1.6 | `#666` |
| Collaborators | 12.5px | 400 | — | — | `#999` |
| Pill label | 12px | 500 | — | — | varies |
| Copyright | 12.5px | 400 | — | — | `#aaa` |

Half-pixel sizes (13.5, 12.5, 11.5, 10.5) are intentional. Round them in Figma and
the rhythm shifts visibly.

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

Everything flush left against the container's inner edge — portrait, name, tagline,
nav, workflow card all share one left edge.

```
padding-top          64px
padding-bottom       40px
portrait width      116px   (transparent PNG cut-out, no frame, no circle)
  hello bubble      42% of portrait width, at left 68% / top -2%
  spring in         stiffness 340, damping 10, mass 0.8, delay 0.3s
  plays once        per session (sessionStorage)
portrait → name      12px
name → tagline        4px
tagline → nav        16px
nav gaps             20px horizontal / 6px vertical
nav → card           20px
text column max     760px
```

### Workflow card

```
max-width  760px
radius      16px
fill       #ffffff
padding    20px horizontal / 16px vertical
label → grid   12px
grid       2 columns, 24px column gap, 12px row gap
title → flow    2px
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

32×32 circles, `#f5f5f7` → `#ebebef` on hover, glyphs `‹` `›` at 14px `#6e6e73`.
Right-aligned, 12px under the rail. Hidden when a project has one slide.

### Action pills

All 12px/500, `px-16 py-6`, full radius, 10px apart.

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
left         Email · LinkedIn, 13.5px, 20px gap
right        © Kate Xu 2026, 12.5px #aaa
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
