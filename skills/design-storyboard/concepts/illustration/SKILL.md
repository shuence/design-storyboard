---
name: design-concept-illustration
description: Use when design-storyboard is drawing spot illustrations, SVG assets, or PNG renders for a product's design folder.
---

# Illustration

Writes `design/illustrations.mjs`, `design/illustrations/<name>.svg`, and the platform outputs that script already emits. Rules and the allowed SVG subset are in [references/06-illustrations.md](../../references/06-illustrations.md). Start from [assets/illustrations.mjs](../../assets/illustrations.mjs).

If the direction is type-only, do not illustrate. Write that in `DIRECTION.md` and leave the script uncreated.

## When they name one

"Illustration of …" or "svg of …" adds one scene to the existing script and runs it. It does not start a new style.

- Filename: `illustration_<moment>` (`illustration_empty`, `illustration_welcome`).
- One canvas for the whole set.
- Palette values trace to `tokens.json`. No new hex.
- One metaphor for the set (the same people, the same object). A new scene reuses the geometry helpers.
- Paths, fills, round strokes, opacity, group rotation only. No text, no filters, no masks, no multi-stop gradients.
- The scene is a moment in the product (empty, first run, success), not a generic blob.

## PNG

Copy [assets/render-png.mjs](../../assets/render-png.mjs) to `design/render-png.mjs` the first time a product needs a raster.

```bash
node design/illustrations.mjs
node design/render-png.mjs design/illustrations/<name>.svg design/illustrations/<name>.png --width 960 --height 800
```

Paste both outputs. The SVG is the source. The PNG is a render. iOS app icons do not use this script; they go through `app-icons.mjs`.

## On the board

Inline the review SVGs, one row, captioned with the moment. Do not paste a PNG as the only copy.
