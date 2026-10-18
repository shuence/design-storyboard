---
name: design-concept-type
description: Use when design-storyboard is choosing typefaces, a type scale, or font concepts for a product's design folder.
---

# Type

Writes `tokens.json` `typography`, the font link and type styles in `redesign/app.html`, the wordmark's family, and the type section of `store/design-board.html`. Licensed files go in `design/fonts/` when you ship offline; until then use a real family the HTML can load. Record the licence in `DIRECTION.md`.

## Three concepts, then one pairing

Directions differ in **voice**, not in size. Pick the pairing that matches the three adjectives from the interview.

| Voice | Display | UI | When |
|---|---|---|---|
| Editorial | A text serif (Newsreader, Fraunces, Source Serif 4, Literata, Instrument Serif) | A grotesque (Geist, Schibsted Grotesk, IBM Plex Sans) | Warm, quiet, considered |
| Humanist | One humanist family for both, or a soft serif plus a humanist sans (Source Sans 3, Nunito Sans) | Same, or the sans | Friendly, everyday |
| Technical | A grotesque | The same grotesque, plus a mono for data only (IBM Plex Mono, Fragment Mono) | Precise, operational |

Two families. A mono is a third only when the product shows data, code, or money. Do not reach for Inter, Roboto, Arial, or Open Sans unless `DIRECTION.md` says a neutral grotesque is the point.

## Scale

Set sizes from the moment of use, not from a default ramp.

- One-handed, night, walking: body ≥17px, comfortable line-height, primary label ≥15px.
- Desk, dense, operational: body 14–15px is allowed; numbers are tabular.
- Display is for the promise and the one number that matters. It is not for buttons.
- Wordmark is the UI face, not the display face, unless the interview locked a lettered logo. One weight, one tracking, one casing. Echo that definition in `store/README.md`.

Use a weight and an axis the family actually ships. Do not invent `opsz` or a weight the file doesn't have.

## On the board

One card per role (display, title, body, caption, wordmark) set in real copy from the product, with family, weight, size, line-height, tracking. The accent colour appears on one italic or one word, matching the accent's job.
