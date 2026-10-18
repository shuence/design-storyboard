# Naming research

Why this is called `design-storyboard` rather than `foundry`, `atelier`, or `design-folder`.

## Method (and its limits)

There is no public download counter for agent skills. The closest available proxy was the
install manifest on this machine — `~/.agents/.skill-lock.json` plus the Codex curated-skill
cache — which records the upstream repository every installed skill came from.

Snapshot: **270 installed skills from 56 upstream repositories.** This measures what one
well-stocked machine has accumulated, not global popularity. Treat it as a sample of the
ecosystem's conventions, not a ranking.

Codex's curated list (`skills-curated-cache.json`) is a second, smaller signal: **39 skills**
that the vendor chose to feature.

## The biggest upstream repositories

| Skills | Repository |
|---:|---|
| 50 | `coreyhaines31/marketingskills` |
| 38 | `mattpocock/skills` |
| 14 | `obra/superpowers` |
| 13 | `firebase/agent-skills` |
| 12 | `expo/skills` |
| 10 | `chrisbanes/skills` |
| 9 | `wshobson/agents` |
| 9 | `emilkowalski/skills` |
| 9 | `new-silvermoon/awesome-android-agent-skills` |
| 8 | `jakubkrehel/skills` |
| 8 | `wondelai/skills` |
| 7 | `figma/mcp-server-guide` |
| 6 | `ibelick/ui-skills` |
| 6 | `julianoczkowski/designer-skills` |
| 5 | `vercel/next.js` |

Note how concentrated it is: the two largest repositories account for a third of everything
installed. A name has to survive being one entry in a long alphabetical list.

## Naming conventions among the design skills

| Pattern | Examples | Source |
|---|---|---|
| `design-*` family | `design-tokens`, `design-review`, `design-flow`, `design-brief`, `design-handoff` | julianoczkowski, Vercel |
| `better-*` family | `better-ui`, `better-colors`, `better-typography`, `better-layout` | jakubkrehel |
| `fixing-*` / `improve-*` / `create-*` | `fixing-accessibility`, `improve-ui`, `create-design-md`, `extract-design-system` | ibelick, arvindrk |
| Plain noun | `frontend-design`, `canvas-design`, `pdf`, `screenshot`, `speech` | anthropics, Codex curated |
| `-to-` bridge | `brief-to-tasks`, `image-to-code`, `figma-design-to-code` | several |
| Branded one-word | `impeccable`, `graphify`, `rageprompt`, `brag`, `hatch-pet`, `yeet` | rarer |

Two observations:

1. **Literal, hyphenated names dominate installs.** `design-tokens`, `improve-ui` and
   `fixing-accessibility` say exactly what they do, so they are findable in a listing where
   the only context is a one-line description.
2. **Branded one-worders dominate memory.** `impeccable` and `rageprompt` are the ones people
   repeat to each other. But they need the description to do all the discovery work.

Also relevant: Codex's curated entries all pair an `id` with a `shortDescription` of roughly
40–55 characters ("Build and scaffold ChatGPT apps"). Whatever the name, the one-liner is
carried alongside it, so the name does not have to explain everything — but it should not
fight the one-liner either.

## The shortlist

| Name | Kind | Reads as | Weakness |
|---|---|---|---|
| `design-storyboard` | literal + specific | the headline artifact | two words, but both are searchable |
| `design-folder` | literal | the output | describes the container, not the value |
| `design-forge` | literal head + evocative verb | generates assets | "forge" is doing marketing work, not search work |
| `design-kit` | literal | a bundle | vague; every bundle is a kit |
| `foundry` | branded | marks are cast | doesn't say design |
| `loom` | branded | weaving tokens into assets | collision risk; common word |
| `proof` | branded | design proofs | overloaded (proofing, security) |
| `atelier` | branded | a designer's workshop | spelling friction |
| `folio` | branded | the collection | reads as a portfolio product |
| `press` | branded | print press | overloaded |

## Decision

**`design-storyboard`.**

- It sits in the `design-*` family that already dominates installed design skills, so it is
  findable by the same instinct that searches for `design-tokens`.
- "Storyboard" names the single most distinctive artifact — not another token file or icon
  generator, but the board that shows every screen and *why it exists*. That is the thing this
  skill does that the others don't.
- It pairs cleanly with the one-liner: *"An agent skill for people who ship apps."*
- It survives alphabetisation and is unambiguous when spoken aloud.

Rejected `design-forge` (better logo story, weaker search), `foundry` (memorable, but the
brand would have to carry the category), and `design-folder` (accurate about the output,
silent about the value).
