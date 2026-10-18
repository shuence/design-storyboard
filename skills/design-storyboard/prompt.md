# `design-storyboard` - paste-in prompt

Use this when you want the whole thing in one shot, without loading the skill. The skill
(`SKILL.md` + `references/`) is the better path when you want it done properly; this is the
short version to paste into any agent.

---

## Prompt

> Build the complete `design/` folder for **[APP NAME]** - a **[one-line description]** for
> **[specific audience]**.
>
> **Step 1 - Interview me first.** Ask me, in one numbered message, with your best guess next to each
> so I can just correct them:
> product promise, exact target user, the moment of use, what it replaces, the feeling in the first
> 10 seconds, what it must never do, platforms (phone/tablet/watch/widget/web), business model that
> touches the UI, privacy posture, market + languages, 2–4 competitors and what they get wrong,
> existing brand assets, who approves the direction and by when. Then a second round of direction
> questions: type mood, colour temperature, light-vs-dark first, density, borders vs shadow, shape
> language, the one signature element, photography, motion, icon style, and anti-references.
>
> **Step 2 - Ask me for supporting materials**, as a checklist: product spec/PRD, current screens,
> competitor links, logo + licensed typefaces + brand hexes, a moodboard, the real copy the app will
> show, a photo source, store listing copy, legal URLs, and which screens are actually shipped vs
> planned. Tell me which ones you'll invent if I don't have them, and what each missing one blocks.
>
> **Step 3 - Build** `design/` **in this exact order**, pausing after each for my OK:
>
> 1. `redesign/directions.html` - the same three screens rendered three genuinely different ways
>
>    (different type pairing + colour logic, not just a hue swap). I pick one. Keep the file.
> 2. `design/tokens.json` - W3C DTCG: raw palette → semantic aliases → typography, spacing, radius,
>
>    size, motion → a `contrastChecks.pairs` table. Plus `design/check-contrast.mjs`, and **run it**
>     so it exits 0 before you draw anything. Never loosen a minimum to make it pass.
> 3. `redesign/app.html` - the storyboard *and* the hi-fi mockup: every screen in a device frame,
>
>    grouped by user journey, each captioned with a title, a `Live`/`Planned` label, and *why this
>     screen exists*. Include empty, loading, error, offline, dark-mode and long-content states.
> 4. `design/app-icons.mjs` → review SVGs + iOS `.appiconset` (opaque, full-bleed 1024) + Android
>
>    adaptive icon XML (108dp layer, ~66dp safe zone, real `<monochrome>` drawable). Ship default,
>     deep, night and mono variants. Also `store/logo-icon.html` with 3–6 different logo *ideas*,
>     shown at 16→1024px in light and dark, plus a misuse section.
> 5. `design/illustrations.mjs` → SVG + iOS vector-preserving `.imageset` + Android VectorDrawable,
>
>    using only paths, fills, round strokes and opacity. One canvas for the whole set.
> 6. `design/question-packs/` - `packs.json` index (id = filename stem, real `tone` per pack) + one
>
>    file per pack with stable item ids, if the app shows the user content.
> 7. `design/store/` - `build/gen_store.py` that generates the artboard HTML **and** `render.sh`,
>
>    then headless-Chrome renders every required Apple and Google size, with platform-correct chrome
>     (Dynamic Island vs punch-hole, 9:41, correct battery orientation). Plus `design-board.html`,
>     `README.md` with the brand table + sizes + regen commands, and social/OG variants.
> 8. Mirror `tokens.json` into the platform token files and `docs/DESIGN_SYSTEM.md`.
>
> **Rules:**
>
> - Nothing is hand-drawn or exported from Figma. Every asset is generated and re-runnable.
> - UI code uses semantic tokens only; raw hex lives only in the token files and the generators.
> - Commit licensed fonts (`design/fonts/`) and log every bundled photo in `design/IMAGE_CREDITS.md`.
> - Real strings, real names, realistic lengths - no lorem ipsum.
> - Add `.gitignore` entries for generated build output.
> - **Run every script and paste the real output.** Never claim something ran if it didn't. Report
> what passed, what failed, and what is still a placeholder.
> - Stop and show me after step 1 and step 2. Don't build 60 screens on an unapproved direction.

---

## One part of the folder

The same prompt, scoped. Still write into `design/`. Do not invent a second output location.

> Only the **[color / type / screens / logo / illustrations / board]** part of the `design/` folder for **[APP]**. Interview me first if Round 1 is unanswered. Three concepts means three structures, not three hues. Leave the other folder files ungenerated and say so.

An illustration or PNG request is still a folder file:

> Add an illustration named **[name]** to `design/illustrations.mjs` showing **[what]**, using only paths, fills, round strokes and opacity, coloured from `tokens.json`. Run the generator. If I asked for a PNG, render it with `design/render-png.mjs`.

## Short version (one paragraph)

> Interview me about the app (promise, user, moment of use, platforms, must-nevers, competitors,
> existing brand assets), then ask for supporting materials (PRD, current screens, competitor links,
> logo, licensed fonts, moodboard, real copy, photos, listing copy, legal URLs, what's shipped vs
> planned). Then build the full `design/` folder for **[APP]**: 3 directions in `directions.html`,
> `tokens.json` + a contrast checker that must pass, `app.html` as both storyboard and hi-fi mockup
> with a *why* on every screen, `app-icons.mjs` emitting iOS + Android launcher assets, a logo +
> wordmark review page, `illustrations.mjs` for empty states, content packs, and a store pipeline
> that generates and headless-renders every App Store and Play size. Everything generated and
> re-runnable - nothing hand-drawn. Pause for my sign-off after the directions and after the tokens,
> and paste real command output, never a claim.
