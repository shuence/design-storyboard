---
name: design-concept-voice
description: Use when design-storyboard is writing product copy, empty states, errors, buttons, or content packs inside a design folder.
---

# Voice

Copy is a material in the folder, not a layer you add later. It lives in the screens, the landing page, the store headlines, and — when the product shows a deck — `design/question-packs/`. Pack shape: [references/08-content-packs.md](../../references/08-content-packs.md).

## From the interview

Write in the three adjectives. Refuse the banned feeling. One vocabulary: the same object has the same name on every screen.

- Buttons are verbs (`Save note`, `Start trial`). Not `OK`, `Submit`, or `Click here`.
- The empty state says what this place is for and the one action that fills it.
- The error says what happened and the action that fixes it. It does not say "Oops" or "Something went wrong".
- Permission copy names the benefit, then the system ask.
- Paywall copy, if the model needs one, shows what they already have. No confirmshaming, no fake scarcity, no fake counts.
- Store headlines are 3–6 words, sentence case, one claim each. No exclamation marks.
- Lengths are realistic: a long name, a two-line title, a short one. If it only works with "Hi" it doesn't work.

No lorem ipsum. No placeholder people. If you had to invent a string, mark the screen `Planned` and keep the voice anyway.

Question packs: `packs.json` index, one file per pack, stable item ids, and a real `tone` that matches the adjectives.
