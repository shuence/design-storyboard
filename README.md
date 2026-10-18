# <img src="assets/generated/icons/default.svg" width="38" height="38" valign="middle" alt=""> design-storyboard

[![skills.sh](https://skills.sh/b/shuence/design-storyboard)](https://skills.sh/shuence/design-storyboard)

**Your app deserves a design folder.**

An agent skill that interviews you about your app, then generates the complete `design/` directory: a design storyboard, hi-fi HTML mockups, a launch landing page, logo concepts and wordmark, launcher icons for both platforms, illustrations, content packs, and every App Store / Play store asset.

Everything is produced by small, re-runnable scripts. Nothing is hand-drawn, nothing is exported from Figma, and nothing can drift from the tokens.

```
design/
├── tokens.json            one source of truth
├── check-contrast.mjs     a gate that fails, not an opinion
├── app-icons.mjs          iOS + Android from one file
├── illustrations.mjs      SVG + VectorDrawable from one canvas
├── redesign/
│   ├── directions.html    three systems, pick one
│   ├── app.html           storyboard + hi-fi mockups
│   ├── landing.html       marketing, same tokens
│   └── og.png
├── store/                 logo review, design board, every required size
└── question-packs/        the copy decks
```

---

## The one rule

A design folder that is drawn by hand rots the first time a colour changes. Here every artifact is output of a script:

| Artifact | Generated from |
|---|---|
| The mark, the favicon, the launcher icons | `scripts/brand.mjs` |
| Every screen, every store PNG | `tokens.json` + the mockup CSS |
| iOS `.appiconset` | `app-icons.mjs` |
| Android adaptive icon + real `<monochrome>` layer | `app-icons.mjs` |
| Illustrations, both platforms | `illustrations.mjs` |
| Landing page + OG card | the same tokens |
| `DESIGN_SYSTEM.md`, Kotlin tokens, Swift tokens | `tokens.json` |

If iOS and Android ever need separate hand edits, the generator is missing a rule.

---

## Install

**One command**, from the skills.sh registry:

```bash
npx skills add shuence/design-storyboard
```

That finds your agents and wires the skill into each one. `skills add` also lists it on [skills.sh](https://skills.sh/shuence/design-storyboard), and `npx skills update` keeps it current.

**Or manually**: drop it where your agent looks for skills:

```bash
git clone --depth 1 https://github.com/shuence/design-storyboard.git /tmp/ds
mkdir -p ~/.agents/skills
cp -R /tmp/ds/skills/design-storyboard ~/.agents/skills/
```

Claude Code and OpenCode read `~/.claude/skills`:

```bash
ln -sfn ../../.agents/skills/design-storyboard ~/.claude/skills/design-storyboard
```

**Or just the prompt.** [`skills/design-storyboard/prompt.md`](skills/design-storyboard/prompt.md) is a paste-in version for any agent that can write files.

Then say:

> build the design folder for my app

---

## What happens

Eleven phases, with two deliberate stops.

| # | Phase | Output |
|---|---|---|
| 00 | **Interview** | Product, audience, moment of use, must-nevers, platforms, competitors, then direction questions |
| 01 | **Orient** | Read what exists; inventory what's reusable vs. what must be invented |
| 02 | **Three directions** | Same screens, three real type-and-colour systems. **You pick one.** |
| 03 | **Tokens + gate** | W3C DTCG tokens, then the contrast checker must exit `0` |
| 04 | **Storyboard** | Every screen, grouped by journey, captioned with *why* it exists |
| 05 | **Logo + icons** | Ideas at real sizes, then one generator for both platforms |
| 06 | **Illustrations** | Paths only, so one file serves SVG and VectorDrawable |
| 07 | **Content packs** | Questions, prompts, notifications, with a real tone per pack |
| 08 | **Landing page** | Same tokens, real metadata, objection-led sections, OG card |
| 09 | **Store kit** | Every required size, rendered by headless Chrome |
| 10 | **Mirror** | Kotlin, Swift and the design doc emitted from one file |
| 11 | **Verify** | Run it all, paste the real output, name what's still a placeholder |

The two stops are the two decisions that are expensive to undo: the direction, and the tokens.

---

## What's in the skill

```
skills/design-storyboard/
├── SKILL.md                    the workflow the agent follows
├── prompt.md                   paste-in prompt, long and one-paragraph
├── references/
│   ├── 01-interview.md         question bank + supporting-materials checklist
│   ├── 02-folder-contract.md   every file, its job, and how to test it
│   ├── 03-tokens.md            DTCG shape, semantic layers, contrast minimums
│   ├── 04-storyboard-and-mockups.md
│   ├── 05-logo-and-icons.md
│   ├── 06-illustrations.md
│   ├── 07-store-and-marketing.md
│   ├── 08-content-packs.md
│   └── 09-landing-page.md      structure, copy, metadata, performance budget
├── concepts/
│   ├── psychology/SKILL.md     5 constraints max, chosen before you draw
│   ├── type/SKILL.md           pairing, scale, font loading
│   ├── color/SKILL.md          palette, dark remap, contrast checks
│   ├── layout/SKILL.md         spacing, radius, density, composition
│   ├── motion/SKILL.md         duration, easing, reduced motion
│   ├── screens/SKILL.md        three structures, then every screen
│   ├── logo/SKILL.md           mark, wordmark, launcher icon
│   ├── illustration/SKILL.md   the SVG ∩ VectorDrawable subset
│   ├── voice/SKILL.md          one vocabulary, empty and error states
│   └── board/SKILL.md          the one-page review
└── assets/
    ├── check-contrast.mjs      WCAG gate (run it, don't trust it)
    ├── app-icons.mjs           working launcher-icon generator
    ├── illustrations.mjs       working illustration generator
    ├── render-png.mjs          SVG or HTML artboard → PNG
    ├── landing.html            landing page skeleton in the design system
    └── design-board.html       store review board skeleton
```

The `assets/` scripts are real, runnable templates, not pseudocode. Point them at a `tokens.json` and they emit SVG, `.appiconset`, VectorDrawable, and `mipmap-anydpi` XML.

`assets/generated/` holds the output used on the launch page: four launcher variants and four illustrations produced by those scripts, so the page shows real artifacts instead of drawings of artifacts.

---

## Requirements

- Node 18+ for the generators
- Google Chrome for store screenshots and the OG card
- Optional: ImageMagick (`magick`) to rasterise and verify icon sizes

No npm install. No build step. The design folder has to render offline with `file://`. That's a feature.

---

## Landing page

`index.html` is the launch page for this skill. It is its own demo: same tokens, same contrast discipline, real metadata, an OG card rendered from `og.html`.

```bash
node scripts/brand.mjs   # the mark → favicon.svg, launcher icons, nav lock-up
node scripts/brand.mjs --check   # fail if any of them drifted
./scripts/render-og.sh   # regenerates og.png at 1200×628
```

The mark is one string in `scripts/brand.mjs`. `favicon.svg`, the four launcher icons on the landing page, the OG card, the README header and the whole `launch/` kit are all output of it, so the site and the launch assets cannot show two different logos.

---

## Docs

- [Naming research](docs/NAMING_RESEARCH.md): what the installed-skill ecosystem actually names things, and why this is called `design-storyboard`
- [skills.sh listing](https://skills.sh/shuence/design-storyboard): the registry page, install command and the badge above

---

## License

MIT. See [LICENSE](LICENSE).
