---
name: design-concept-layout
description: Use when design-storyboard is setting spacing, radius, density, or screen composition in a product's design folder.
---

# Layout

Writes `tokens.json` `spacing`, `radius`, and `size`, and the component CSS block of `redesign/app.html`. Screens consume these. They do not invent a second spacing scale.

## From the interview

| They said | Spacing | Radius | Composition |
|---|---|---|---|
| Generous, editorial | `screen` 20–24, section gaps 32–48, few elements per view | 16–28, sheets larger than buttons | One focal point, large type, lots of paper |
| Efficient, dense | 4-based scale, `screen` 16, lists not cards | 8–12, or sharp if the direction is technical | Aligned to one grid, metadata visible without a tap |
| Soft, friendly | Same scale, more air inside controls | Pill for chips and the primary button only | Cards share one radius; don't round the phone and the type |

`minTouchTarget` stays ≥48. Button and field height stay ≥48, 52 when the moment of use is one-handed.

## Composition rules that change the screen

- One focal point. A second hero is a second screen.
- Group by proximity. Related items share a smaller gap than the gap between groups. A box around every row means you didn't use space.
- Primary action sits in the thumb zone (bottom half of the phone), full width, after the thing it acts on.
- Align to one edge. Centred body text is for a single promise line, not for forms or lists.
- Safe areas: status inset, home indicator, nothing interactive under the gesture bar.
- The landing page and the store artboards use the same spacing and radius tokens. If they need a new one, add it to `tokens.json` first.

## On the board

Four radius specimens with the token name and what it is for. Do not draw a spacing poster unless a value is doing something surprising.
