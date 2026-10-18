---
name: design-concept-color
description: Use when design-storyboard is choosing or drawing colour for a product's design folder - palettes, accents, dark mode, or color concepts.
---

# Color

Writes the colour of the `design/` folder: `tokens.json` `color` + `semantic` + `contrastChecks`, the `:root` and `.dark` blocks in `redesign/app.html`, and the colour section of `store/design-board.html`.

Read [concepts/psychology/SKILL.md](../psychology/SKILL.md) and [references/03-tokens.md](../../references/03-tokens.md). Run `node design/check-contrast.mjs` after `tokens.json` exists. Never lower `min` to pass.

## Three concepts, then one system

Before a direction is picked, the three directions in `redesign/directions.html` differ in **colour structure**. A hue swap of one palette is one concept.

| Structure | Ground | Action | Accent |
|---|---|---|---|
| Ink-led | Warm or cool paper | Near-black fill, paper label | One whisper: italic, a rule, a single glow. Never a button fill. |
| Field-led | Tinted paper | White cards on the tint | Accent is allowed to fill the one primary action. |
| Night-led | Designed dark first | Light text on a lifted surface | Light mode is the remap, not the original. |

Each direction caption names the structure and which interview adjective it serves. After they pick, delete the other two from the product tokens. Record the losers in one line in `design/DIRECTION.md`.

## The system you keep

- Raw palette → semantic aliases → UI. Screens use semantic names only.
- One accent, one job, written in `DIRECTION.md` (`Accent allowed to do: …`). A second accent is a failed concept.
- Support tints (four at most) classify content. They are not decoration and they are not status.
- Status colours (`error`, `success`, `info`) are not the brand. They work in both modes and are never colour-only: pair with a word.
- Dark mode remaps every semantic key. Do not invert the light hexes.
- Neutrals are warm or cool with the paper, not `#000` / `#fff` / `#888` unless the direction is literal newsprint or pure utility and you wrote why.

## On the board

Swatches grouped neutrals / accent / support, each with hex and the role sentence. Dark row. Radius can sit with layout, not here.
