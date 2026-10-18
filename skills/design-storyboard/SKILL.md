---
name: design-storyboard
description: Interview an app idea, collect supporting materials, then build the complete `design/` folder, including the design storyboard board, hi-fi HTML app mockups, launch landing page, logo concepts + wordmark, launcher app icons, illustrations, question/copy packs, and every App Store / Play / marketing asset, as generated, re-runnable files rather than hand-drawn exports. Use when asked to "build the design folder", "replicate the design folder", "design this app from scratch", "make a design storyboard", "create app icons / logo concepts", "make store screenshots", "build a landing page", or when starting a new app and there is no `design/` directory yet.
---

# design-storyboard

Build the whole `design/` folder for an app: one directory that is the visual source of truth, the review surface, and the asset factory, all at once.

This skill is the generic form of a recipe proven on a real app. Read a worked example in the wild when you need a reference implementation; it is the canonical demonstration for every section below.

## The one rule

**Nothing in `design/` is drawn by hand or exported from Figma.** Every artifact is generated from a small number of source files, so a token change propagates everywhere:

| Generated | From |
|---|---|
| `redesign/app.html` screens, `store/*/*.png` | `tokens.json` + component CSS in `app.html` |
| iOS `.appiconset` PNGs, Android VectorDrawables | `app-icons.mjs` |
| iOS `.imageset`, Android `drawable/*.xml` | `illustrations.mjs` |
| `docs/DESIGN_SYSTEM.md`, `<App>Tokens.kt`, `<App>Tokens.swift` | `tokens.json` |

If you catch yourself writing a PNG into git, stop and write the generator instead.

## What you ship

The complete `design/` folder, in the product repo. `store/design-board.html` is the one-page review of that folder. It is not a substitute for `tokens.json`, `redesign/app.html`, the icon and illustration generators, the landing page, or the store kit.

A concept skill is how you design one part of the folder. Read it at the phase named in the table below, then write the files that phase already names.

If they name one part ("color concepts", "font concepts", "just the screens", "illustration of …", "render this png"), do that part only, and still write it into `design/`. Say which folder files you did not generate.

## Concept packs: `concepts/`
Ten short constraint files. They are not chapters; each owns one slice of `tokens.json` (or one artifact) and names the exact files it writes. Read the one the current phase needs, not all ten.

| File | Owns | Read at |
|---|---|---|
| [`concepts/psychology/SKILL.md`](concepts/psychology/SKILL.md) | perception, attention, trust, manipulation limits | Phase 2, re-check at 11 |
| [`concepts/type/SKILL.md`](concepts/type/SKILL.md) | `typography`, font loading, the wordmark's family | Phase 2 → 3 |
| [`concepts/color/SKILL.md`](concepts/color/SKILL.md) | `color`, `semantic`, `contrastChecks`, dark remap | Phase 3 |
| [`concepts/layout/SKILL.md`](concepts/layout/SKILL.md) | `spacing`, `radius`, `size`, component CSS | Phase 3 → 4 |
| [`concepts/motion/SKILL.md`](concepts/motion/SKILL.md) | `motion`, reduced-motion behaviour | Phase 3 → 4 |
| [`concepts/screens/SKILL.md`](concepts/screens/SKILL.md) | `directions.html` structures, `app.html` screens | Phase 4 |
| [`concepts/logo/SKILL.md`](concepts/logo/SKILL.md) | `logo-icon.html`, `app-icons.mjs` | Phase 5 |
| [`concepts/illustration/SKILL.md`](concepts/illustration/SKILL.md) | `illustrations.mjs` | Phase 6 |
| [`concepts/voice/SKILL.md`](concepts/voice/SKILL.md) | screen copy, empty/error states, packs, landing copy | Phase 7 → 8 |
| [`concepts/board/SKILL.md`](concepts/board/SKILL.md) | `store/design-board.html` | Phase 9 |

Rule for all ten: they may add a constraint, never a second scale. If a concept file and `tokens.json` disagree, `tokens.json` wins and the concept file is wrong.


## Workflow

### Phase 0: Interview (do not skip)
Ask before you build. Use [`references/01-interview.md`](references/01-interview.md) as the question bank, and ask it in **two rounds**:
- **Round 1 (blocking):** product, audience, promise, competitive frame, platform, tone.
- **Round 2 (direction):** typography mood, colour temperature, density, motion, what to avoid.

Then **request supporting materials**: see the checklist at the end of the same reference. Do not start Phase 2 until you have either the materials or an explicit "invent it".

If the user says "you decide", decide, write the decision into `design/DIRECTION.md` with a one-line rationale, and keep going. Don't keep asking.

### Phase 1: Orient
Read anything that already exists: `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, screenshots, store listing copy, brand assets, competitor apps the user named. Inventory what's reusable (fonts already licensed? an existing logo? a brand hex?) and what must be invented.

### Phase 2: Three directions, then pick one
Before drawing, read [`concepts/psychology/SKILL.md`](concepts/psychology/SKILL.md) and pick **at most five** constraints the interview makes mandatory. Write them into `design/DIRECTION.md` as `Principle: decision`, one line each, no lecture. Check them again at Phase 11.

Write `redesign/directions.html`: the same three screens rendered **three ways**, each with its own type pairing and palette, side by side. This is the cheapest decision in the whole pipeline and the most expensive to undo.

Present it, get a pick, and record the loser directions in one line each; future you will ask "why isn't this Fraunces?".

Reference: [`references/04-storyboard-and-mockups.md`](references/04-storyboard-and-mockups.md).

### Phase 3: Tokens and the contrast gate
Write `design/tokens.json` (W3C DTCG style): raw palette → semantic aliases → typography / spacing / radius / size / motion → `contrastChecks.pairs`.

Then **run the gate** before writing a single screen:

```bash
node design/check-contrast.mjs   # exits 1 on any failure
```

A copy of the checker is in [`assets/check-contrast.mjs`](assets/check-contrast.mjs). Fix tokens until it passes. Never fix it by loosening `min`.

Reference: [`references/03-tokens.md`](references/03-tokens.md).

### Phase 4: Storyboard and mockups
`redesign/app.html` is both the storyboard **and** the hi-fi mockup: a scrollable board of every screen, grouped by user journey, each in a device frame, each captioned with a title, a state label, and **why this screen exists**.

Rules that make this file worth having:
- Screens are grouped by job (`Getting in`, `Every day`, …), not by alphabet or team.
- Every screen carries a `Live` / `Planned` label so the board never lies about the build.
- Every caption names the user problem the screen answers, sourced from research, not vibes.
- Include the ugly states: empty, loading, error, offline, dark mode, long content, no-permission.

Reference: [`references/04-storyboard-and-mockups.md`](references/04-storyboard-and-mockups.md).

### Phase 5: Logo, wordmark, icons
- **Logo concepts:** 3–6 genuinely different marks in `store/logo-icon.html`, shown at 16 / 32 / 128 / 1024 px, in light and dark, plus clear-space and misuse rules (stretched, recoloured, on busy photo, with a drop shadow).
- **Wordmark:** define it once (family, weight, tracking, casing, and whether it takes a coloured full stop), and echo that exact definition everywhere.
- **Launcher icons:** `design/app-icons.mjs` emits `design/app-icons/<variant>.svg` for review **and** the real platform assets.

Non-negotiables the generator must honour:
- iOS app icons must be **opaque** (strip alpha) and full-bleed; ship 1024 only, let Xcode derive the rest.
- Android adaptive icons are a **108 dp layer with a ~66 dp safe zone**; the mark must survive the circle/squircle/rounded-square masks. Emit a `<monochrome>` layer too.
- Ship light **and** dark tint variants, plus one mono.

Reference: [`references/05-logo-and-icons.md`](references/05-logo-and-icons.md). Template: [`assets/app-icons.mjs`](assets/app-icons.mjs).

### Phase 6: Illustrations
`design/illustrations.mjs` is the single source for spot art (empty states, onboarding, success moments).

Constraint that keeps one file powering both platforms: use **only** features Android VectorDrawable and SVG both support: paths, fills, round strokes, opacity, group rotation. No filters, no masks, no gradients with multiple stops, no text.

Reference: [`references/06-illustrations.md`](references/06-illustrations.md). Template: [`assets/illustrations.mjs`](assets/illustrations.mjs).

### Phase 7: Content packs
If the app shows the user content (questions, prompts, tips, notification lines), the design folder owns the deck: `design/question-packs/packs.json` + one JSON per pack. Copy is a design material. Keep tone per pack explicit.

Reference: [`references/08-content-packs.md`](references/08-content-packs.md).

### Phase 8: Landing page
`redesign/landing.html` is the marketing page for the app **and** the proof that the design system generalises. Build it in the same CSS blocks and tokens as `app.html`. If the landing page needs a colour, font or radius the app doesn't have, one of the two is wrong.

It must earn its own place in the folder:
- A hero that states the promise in ≤ 8 words, with the single primary CTA above the fold.
- Real device frames or real screenshots, never a fabricated UI.
- One section per objection, not one section per feature.
- Working metadata: `<title>`, description, canonical, OG/Twitter card, favicon, JSON-LD.
- Mobile-first at 360 px, readable at 1440 px, no layout shift, and a performance budget (LCP < 2.5 s on 4G).

Reference: [`references/09-landing-page.md`](references/09-landing-page.md). Template: [`assets/landing.html`](assets/landing.html).

### Phase 9: Store and marketing
Generate, don't assemble. `store/build/gen_store.py` (or `.mjs`) writes the artboard HTML **and** a `render.sh` that headless-Chrome-screenshots every required size.

Required sizes are a hard contract per channel: see [`references/07-store-and-marketing.md`](references/07-store-and-marketing.md) for the table. Add platform chrome (Dynamic Island vs punch-hole camera, 9:41, correct battery orientation) and reuse tokens so screenshots can never drift from the app.

### Phase 10: Mirror into the codebases
Emit platform token files from `tokens.json` (Kotlin `<App>Tokens.kt`/`Type.kt`/`Theme.kt`, Swift `<App>Tokens.swift`) and write `docs/DESIGN_SYSTEM.md`. UI code must reference **semantic** tokens only; raw hex belongs in the token files and the generators.

### Phase 11: Verify, then report
Run all of it and paste the real output:
```bash
node design/check-contrast.mjs
node design/app-icons.mjs
node design/illustrations.mjs
node design/render-png.mjs design/illustrations/<name>.svg design/illustrations/<name>.png --width 960 --height 800
node design/store/build/gen_store.py && bash design/store/build/render.sh
```
Open `redesign/directions.html`, `redesign/app.html`, `redesign/landing.html`, `store/design-board.html`, `store/logo-icon.html` and check them at real device widths. Report what ran, what failed, and what is still hand-waved.

## Folder contract

```
design/
├── tokens.json                 # source of truth (DTCG)
├── check-contrast.mjs          # WCAG gate, exits 1
├── app-icons.mjs               # → app-icons/*.svg + both platforms
├── illustrations.mjs           # → illustrations/*.svg + both platforms
├── render-png.mjs              # one SVG or HTML artboard → PNG
├── app-icons/<variant>.svg     # review copies
├── illustrations/<name>.svg    # review copies
├── fonts/                      # licensed, committed, subset
├── question-packs/             # content decks
├── redesign/
│   ├── directions.html         # 3 directions, pick one
│   ├── app.html                # storyboard + hi-fi mockups
│   ├── landing.html            # marketing page in the same system
│   ├── og.html + og.png        # social card, rendered headless
│   └── reference/              # research, competitor teardowns, specs
├── store/
│   ├── README.md               # sizes, regen commands, brand definition
│   ├── logo-icon.html          # logo concepts + icon review
│   ├── design-board.html       # everything, on one page
│   ├── build/gen_store.py      # artboard generator + render.sh
│   └── ios/ android/ marketing/
└── IMAGE_CREDITS.md            # licence + source for every bundled photo
```

Full responsibilities per file: [`references/02-folder-contract.md`](references/02-folder-contract.md).

## Prompt-only variant
If the user just wants a prompt to paste elsewhere, hand them [`prompt.md`](prompt.md).

## Don't
- Don't invent a brand and then build 60 screens on it without showing directions first.
- Don't ship screenshots that show a status bar, clock, or device chrome the real app wouldn't have.
- Don't let the store kit, the landing page and the app drift; all three render from the same tokens.
- Don't let the landing page become a feature list. One section per objection the buyer has.
- Don't ship a landing page without its metadata, OG card and a mobile pass.
- Don't commit unlicensed fonts or uncredited photos. Record them.
- Don't claim a generator ran if it didn't. Paste the command output.
