---
name: design-concept-screens
description: Use when design-storyboard is designing app screens, a storyboard, screen concepts, or hi-fi mockups in a product's design folder.
---

# Screens

Writes `redesign/directions.html` (three structures, before the pick) and `redesign/app.html` (every screen, after the pick). The HTML shape, device chrome, and caption rules are in [references/04-storyboard-and-mockups.md](../../references/04-storyboard-and-mockups.md). Follow that skeleton. This file is the product judgement.

Read psychology, layout, and voice before drawing a screen.

## What a screen concept is

Three directions show the **same three screens** in three structures. Colour and type may differ, and they must, but the layout has to differ or it is one concept.

| Structure | The hero is | Primary action |
|---|---|---|
| Object | The thing they came for (the question, the photo, the balance) | On that object |
| Collection | The list or grid of those things | On the row, plus one create |
| Single task | One decision and nothing else | The only button |

Caption each direction with the structure name and the interview answer it serves. After the pick, `app.html` builds only the winner, across every journey.

## Every screen in `app.html`

Group by job (`Getting in`, `Every day`, …), not by component and not by alphabet.

Each figure has:

- A device frame with the platform chrome from the reference (punch-hole or Dynamic Island, 9:41, correct battery side).
- Real markup from the shared component CSS. A screen may add a local class only for something that component CSS cannot do.
- Real copy from [concepts/voice/SKILL.md](../voice/SKILL.md). No lorem, no "John Doe", no "42" unless 42 is the real number.
- A caption: title, `Live` or `Planned`, and why the screen exists: the user problem, one sentence.
- One job. One primary action in the thumb zone.

Include the states or the board is a pitch, not a design: empty, loading, error (keeps their input, names the fix), offline, permission denied, long content, dark mode. Paywall, upgrade, and restore only if the business model touches the UI.

## Done

A stakeholder can find any screen from the table of contents in under 20 seconds. Every `Live` / `Planned` label matches what is actually shipped. The same tokens as `tokens.json`.
