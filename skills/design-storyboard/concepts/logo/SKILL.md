---
name: design-concept-logo
description: Use when design-storyboard is designing a logo, wordmark, or launcher icon for a product's design folder.
---

# Logo

Writes `store/logo-icon.html`, `design/app-icons.mjs`, and `design/app-icons/<variant>.svg`. Platform rules, sizes, and the misuse section are in [references/05-logo-and-icons.md](../../references/05-logo-and-icons.md). Start from [assets/app-icons.mjs](../../assets/app-icons.mjs).

The wordmark, the mark, and the launcher icon are three decisions. Do them in that order. The board shows the one you kept. The logo page shows the alternatives.

## Concepts

3–6 marks, different ideas, not different corner radii: literal, abstract, monogram, negative space, object. Each is a formula (circles, radii, offsets), so a size change is one number. Show each at 16, 32, 64, 128, and 1024, on light and on dark. If it dies at 16px it is not a launcher icon.

Also show misuse: stretched, rotated, drop shadow, recoloured, on a photo, missing clear space, wordmark retyped in the display face.

## The one you keep

- One wordmark. Family, weight, tracking, casing, and whether it has a coloured stop. No second lockup.
- iOS icon: opaque, full-bleed, 1024 only. No drawn corners, no alpha.
- Android: 108dp layer, mark inside the ~66dp safe zone, plus a monochrome layer.
- Variants: light, dark, and one mono. Named `default`, `night`, `mono`, not the brand name.

Run `node design/app-icons.mjs` and paste the output. Rejected marks get one line each in `DIRECTION.md` and on the board under "Drawn and not adopted".
