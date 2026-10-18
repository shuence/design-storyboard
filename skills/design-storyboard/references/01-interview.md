# 01 · Interview

Ask in two rounds. Round 1 is blocking — you cannot design without it. Round 2 sets the visual direction.

**How to ask:** put the questions in one message, numbered, with a guess for each so the user can reply "yes, but…" instead of writing an essay. Ask "you decide" as an explicit option on any question they don't care about.

Never start Phase 2 with unanswered Round 1 questions. Never ask again after "you decide".

---

## Round 1 — Product (blocking)

1. **Name + working wordmark.** What is the app called, how is it capitalised, and does the name want punctuation (a full stop, an accent)?
2. **One-sentence promise.** "It's the app that ______." If the user gives three sentences, ask them to pick one.
3. **Who exactly.** The most specific user you can name — not "everyone who…" but "a couple who live apart and message through the day". One primary, at most two.
4. **The moment of use.** When does someone open it? Morning, 11pm in bed, in the car, one-handed while walking? This sets type size, contrast and tap targets.
5. **The job it replaces.** What are they doing today instead — a notes app, a group chat, paper, nothing?
6. **The feeling it must produce in the first 10 seconds.** Three adjectives, and one it must *not* produce. (e.g. "warm, quiet, considered — never gamified".)
7. **What the app must never do.** Streaks, red badges, guilt, ads, leaderboards, endless feed. Get this explicitly; it is usually where the brand lives.
8. **Platforms.** Android only, iOS only, both, plus tablet / watch / widget / web? Each one adds real asset work — get it now, not at Phase 8.
9. **Business model that touches the UI.** Free, trial, subscription, one-time. This decides whether you need paywall, upgrade and restore screens in the board.
10. **Privacy posture.** Is content private by default, end-to-end encrypted, shareable? It changes copy and often the whole tone.
11. **Market + language.** Which countries, which languages, right-to-left? Affects store sizes, font coverage, and line lengths.
12. **Competitors to beat.** Ask for 2–4 named apps, and *what they get wrong*. Ask for URLs or screenshots if they have them.
13. **Existing assets.** Is there a logo, a colour, a typeface, a name style already locked? Anything already shipped that must be matched?
14. **Deadline and review path.** Who approves the direction, and when do they need to see it?

---

## Round 2 — Direction

Pick the answer shape you want for each: a moodboard reference, or a letter (A/B/C).

15. **Typography mood.** Editorial serif and quiet, or geometric sans and modern, or humanist and warm, or monospaced and technical? Ask which one *feels* like the promise in Q2.
16. **Colour temperature.** Warm paper / cool clinical / deep night / high-contrast mono. Then: what is the **one** accent colour allowed to do? Reserve it — accent creep is the most common way this system dies.
17. **Light versus dark first.** Which mode do you design first? (Designing dark first is a different product.)
18. **Density.** Generous and editorial (large type, much space, few elements per screen) or efficient and information-dense?
19. **Elevation and borders.** Cards with borders, or shadowless white on tinted ground? Flat or layered?
20. **Shape language.** Sharp, soft-rounded, pill, or geometric? Give a radius feel, not a number.
21. **The signature element.** What is the one thing that is unmistakably *this* app — a gradient, a texture, a motion, a repeating shape?
22. **Photography.** Real photos, illustrations, abstract shapes, or type-only? If photos: of what, and cropped how?
23. **Motion.** Still, subtle, or expressive? Ask explicitly about reduced-motion behaviour.
24. **Iconography.** Outlined, filled, duotone, or custom-drawn? Stroke weight?
25. **Anti-references.** "Make it not look like ___." Often the most useful answer in the whole interview.

---

## Supporting materials to request

Ask for these **in the same message** as Round 2, ideally in this order of value:

| # | Material | Why it matters | If missing |
|---|---|---|---|
| 1 | Product spec / PRD, or a plain description | Names the real screens | Interview Q1–5 becomes the spec |
| 2 | Screens of the app as it exists today | Baseline to keep or break | Treat as greenfield |
| 3 | 2–4 competitor apps (links or screenshots) | Calibrates the category | Ask for category + do a teardown into `redesign/reference/` |
| 4 | Brand assets: logo, typeface files/licence, brand hexes | Avoids invalid invention | Invent, and flag that type must be licensed before ship |
| 5 | Moodboard or "I like how this looks" references | Fastest path to a direction | Build `directions.html` and let them pick |
| 6 | Copy the app will actually show | Real strings beat lorem ipsum; catches overflow | Write placeholder copy in the app's voice |
| 7 | Photography or a photo source/shoot plan | Photo-led designs die without photos | Use a licensed stock source and log it in `IMAGE_CREDITS.md` |
| 8 | Store listing copy, app name variants, subtitle | Needed for screenshot captions | Draft it, mark as draft |
| 9 | Legal/required text: privacy policy URL, terms, support URL, account deletion path | Required on the real listing | Placeholder, list as a blocker |
| 10 | Screens/features that are **not** shipped yet | So the board can label Live vs Planned honestly | Ask once; default everything to Planned |
| 11 | Existing Figma / sketch files | Avoids redoing work | Proceed |
| 12 | Any constraint: accessibility mandate, brand guideline, store rejection history | Prevents a full redesign of a fixed thing | Assume WCAG 2.2 AA |

**Also ask for a decision-maker contact and a direction deadline** — this pipeline has a naturally expensive fork at Phase 2, and you want a human to close it.

---

## Handling "you decide"

Write every self-made decision into `design/DIRECTION.md`:

```markdown
# Direction decisions
- Chosen direction: B · Quiet luxury (Newsreader + Geist) — closest to "warm, quiet, considered"; A read playful, C read cold.
- Accent allowed to do: rose is italic emphasis + one glow per screen. Never a fill.
- Light first. Dark is a mirror, not a separate design.
- Photos: real people, cropped close, warm grade. Sourced so far: none. **BLOCKER** for store shots.
- Typefaces: Newsreader (OFL), Geist (OFL) — both shippable. **Confirmed**.
```

Then continue. A recorded guess is worth more than a stalled pipeline.

---

## Red flags worth one clarifying question

- **"Everyone"** as the audience → ask for the single most likely first user.
- **Six platforms** on a first design → ask which one ships first.
- **A competitor's exact brand colours** → ask what they actually liked about it.
- **A name that will not survive a store search** → flag it once, then move on.
- **No photography and a photo-led moodboard** → resolve before Phase 4, not Phase 8.
