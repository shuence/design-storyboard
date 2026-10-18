---
name: design-concept-motion
description: Use when design-storyboard is defining motion, duration, easing, or reduced-motion behaviour for a product's design folder.
---

# Motion

Writes `tokens.json` `motion` and the one sentence in `design/DIRECTION.md` that says which concept you kept. Motion is not a page of demos unless the signature element from the interview is a motion.

## Pick one

| Concept | What moves | Durations |
|---|---|---|
| Still | State changes are instant. No travel. | `quick` 150 for opacity only |
| Functional | The surface you opened, the control you pressed. Enter ease-out, exit ease-in. | `quick` 150, `standard` 250 |
| Expressive | One signature moment (the daily card, the success). Everything else is functional. | `gentle` 400 on that moment only |

`gentle` is skipped when Reduce Motion is on. Reduced motion keeps the state change (colour, text, position snap) and drops travel, parallax, and the signature.

Animate `transform` and `opacity` only. Do not animate layout properties. Pressed controls may scale to 0.98. Nothing loops unless the product's job is a live status, and then it pauses under reduced motion.

## Where it shows up

- `tokens.json` `motion.quick`, `standard`, `gentle` with a `$description` on `gentle`.
- Component CSS in `app.html` uses those values, not raw milliseconds scattered per screen.
- The board's direction line names the concept. Do not add a motion section that is only a caption.
