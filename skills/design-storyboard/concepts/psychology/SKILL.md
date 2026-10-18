---
name: design-concept-psychology
description: Use when a design-storyboard command is about to choose type, color, layout, motion, screens, logo, or copy, and the decision needs a perception, attention, action, emotion, or trust constraint.
---

# Psychology

Read this before drawing. It is a constraint list, not a chapter to paste onto the board. Each principle earns its place only if it changes a pixel, a word, or a state.

Write the few that fired into `design/DIRECTION.md` as `Principle: decision`. On the board, one line per decision. No lecture.

Color names ("blue means trust") are not principles. Colour meaning is cultural and weak. Use colour for role: brand, wayfinding, status. Status colours stay status colours.

## Perception

| Principle | The move | If you skip it |
|---|---|---|
| Figure–ground | One surface is the page, one is the object. They differ in value, not in a 1px grey line alone. | Everything is a card on a card. |
| Proximity | Related items share a gap smaller than the gap between groups. Space is the grouper. | Labels float halfway between two fields. |
| Similarity | Same role, same weight, same colour. A different treatment means a different role. | Three greys that all mean "secondary". |
| Common region | A group that must be read as one gets a surface or a shared alignment, not a box around every row. | Boxed rows that are one list. |
| Continuation | A list, a timeline, a stepper reads along one axis. Don't break it with a centred hero in the middle. | The eye restarts every block. |
| Von Restorff | One accent, one job, written down. Everything else is quiet. | Rainbow chips, all of them shouting. |
| Aesthetic–usability | The first screen is finished, not sketched. Polish does not replace the job: the primary action is still obvious in one second. | A beautiful screen with no verb. |

## Attention and memory

| Principle | The move | If you skip it |
|---|---|---|
| Hick | The primary screen offers one decision. Secondary paths are present but quieter. | A home that is a menu of the whole app. |
| Chunking | Group into sets of 3–5. Seven naked options is a wall. | Settings as one undifferentiated list of 20. |
| Recognition over recall | Show the current value, the recent items, the chosen plan. Don't ask them to remember a code, a mode, or a gesture you never taught. | "As mentioned earlier". |
| Serial position | The first and last items in a row carry the important actions. The middle is for the rest. | Destructive action in the most comfortable slot. |
| Banner blindness | The only call to action is an object in the layout, not a strip that looks like an ad. | A full-width coloured bar that everyone skips. |
| Selective attention | One focal point per screen. A second focal point is a second screen. | Two equal heroes. |

## Action

| Principle | The move | If you skip it |
|---|---|---|
| Fitts | Primary action is in the thumb zone: bottom half on a phone, large target (≥48px), close to the last thing they read. | A 28px text link at the top for the main job. |
| Defaults | The default state is the recommended state, and it is labelled as such. | A blank form that implies a choice they didn't make. |
| Progressive disclosure | The first view does the job. Advanced, rare, and dangerous live one step deeper. | Every setting on the main screen. |
| Feedback (Doherty) | Every tap answers within the `quick` motion token. If work takes longer, show a specific status, not a frozen screen. | Spinner with no noun. |
| Jakob | Follow the platform convention (back, tab bar, sheet, share) unless the product's job is to break exactly one convention. Name that one in `DIRECTION.md`. | A custom back gesture nobody can find. |
| Error recovery | The error names what happened and the one action that fixes it. The field keeps what they typed. | "Something went wrong" and a cleared form. |

## Emotion

Norman's three levels, mapped to the interview:

- **Visceral**: the first 10 seconds. Type, temperature, density, and motion must produce the three adjectives and must not produce the banned one.
- **Behavioural**: the job completes with no puzzle. Speed, forgiveness, obvious primary action.
- **Reflective**: the peak moment and the last screen are designed on purpose (peak–end). A success, a goodbye, a saved state. Not a dead end.

| Signal from the interview | Constrain |
|---|---|
| Quiet, calm, considered | Low chroma, long line-height, no badges, no count-up, motion stays under `standard`. |
| Urgent, operational | High contrast, tabular numbers, status colour only for status, density up, motion `quick` only. |
| Warm, human | Warm paper, humanist or serif display, real names, illustrations of people or objects (not abstract blobs) if illustration is allowed. |
| Precise, technical | One grotesque, a mono for data, sharp or small radius, no gradient hero. |
| Must never guilt, streak, or gamify | No incomplete-ring nag, no red badge for inactivity, no "don't break the chain". Zeigarnik progress is allowed only when finishing is the user's job (a form, a setup), and it ends. |

## Motivation without manipulation

Allowed: showing progress through a task they chose, reminding them of something they already created (endowment) on a paywall, a clear default.

Not allowed unless they explicitly ask, and even then flag it in `DIRECTION.md`: confirmshaming, fake scarcity, fake social proof, hidden costs, pre-ticked extras, guilt copy, streak punishment. The must-never list from the interview wins over any growth pattern.

## Trust and access

- Live / Planned labels are honest. A screen that is not shipped is Planned.
- The same word means the same thing on every screen (one vocabulary).
- Contrast meets the pairs in `tokens.json` (WCAG 2.2 AA unless the interview set a higher bar).
- Reduced motion kills travel and parallax; state change stays instant and visible.
- Tap targets stay ≥48px. Body text stays readable at the moment of use (night, one-handed, walking → 17px body, not 13).
- Don't encode state by colour alone. Pair it with a word or an icon.

## How to apply

Before the artifact, pick at most five rows that the interview makes mandatory. Design against those. After the artifact, check each chosen row still holds. If a row failed, change the artifact. Do not add a caption that apologises for it.

Record the rows that fired in `design/DIRECTION.md` as `Principle: decision`. The board may show those lines. The rest of the `design/` folder still gets built.
