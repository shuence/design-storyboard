# 08 · Content packs (copy decks)

If the app shows the user *content* (questions, prompts, tips, exercises, notification lines,
microcopy), the design folder owns that deck, alongside the tokens. Copy is a design material: it
sets line length, card height and the type scale's stress test.

```
design/question-packs/
├── packs.json            # the index: id, emoji, title, tone
├── know.json
├── firsts.json
└── …
```

---

## `packs.json`: the index

```json
{
  "version": 2,
  "packs": [
    { "id": "know",     "emoji": "🌱", "title": "Getting to know you", "tone": "light" },
    { "id": "deep",     "emoji": "🕯",  "title": "Deep talks",          "tone": "slow" },
    { "id": "distance", "emoji": "✈️", "title": "Miles apart",          "tone": "long distance" }
  ]
}
```

Rules:
- **`id` is the filename stem.** No lookup table, no drift, no "is it `deep-talk` or `deeptalk`".
- **`tone` is a real field.** It is the instruction the app uses to pick and order content, and the
  constraint the writer has to honour. "Gently", "slow", "light", "playful", "looking ahead" are all
  usable tones; "general" is not.
- **Emoji are content, not decoration.** Pick them for meaning; they are often the only visual in a
  row.
- **Version the index.** Content decks change; a version number lets a migration be reasoned about.

## `<pack>.json`: the pack

Keep one flat, obvious shape:

```json
{
  "id": "deep",
  "title": "Deep talks",
  "tone": "slow",
  "description": "For the nights that go longer than planned.",
  "items": [
    { "id": "deep-01", "text": "What do you think I misunderstand about you?", "tier": "deep" },
    { "id": "deep-02", "text": "…", "tier": "deep", "followUp": "…" }
  ]
}
```

- **Stable ids per item** (`<pack>-NN`) so analytics, favourites and saved answers survive an edit.
- **`tier` or `intensity`** lets the app pace the deck instead of dumping everything.
- **Optional fields are optional**: don't stub `followUp: ""` everywhere; it makes the real ones
  invisible.

---

## Writing rules

| Rule | Why |
|---|---|
| Sentence case, no all-caps | all-caps breaks in other languages |
| One question mark per item | two questions get one answer, or none |
| Under ~90 characters where possible | the card is the layout unit; check the longest item on the real screen |
| Never ask for a secret the user might regret | the failure mode of a private app is a screenshot |
| No streak/guilt language | if the product forbids it, the copy deck must too |
| No "just" and no "simply" | minimises the user's problem |
| Second person, plural-friendly | "the two of you", not "you and your partner" |
| Terms the user can say out loud | if it sounds like a workbook, rewrite it |

**Always test the longest item in the pack** on the real screen. Then test it in the longest
supported language. Overflow is a design bug the copy deck hides.

---

## Related decks worth putting here
- **Notification lines**: the words on a push. Same tone rules; the most-seen copy in the product.
- **Empty-state copy**: pairs with every illustration in [`06-illustrations.md`](06-illustrations.md).
- **Onboarding microcopy**: the first five strings a user ever reads.
- **Error copy**: what went wrong, what to do, no blame.

These can live as `design/question-packs/*.json` siblings or as a `copy/` folder, but they belong
in `design/`, not scattered into platform string files first. Platform strings are generated or
translated *from* here.

---

## Checklist
- [ ] Every id in `packs.json` has a matching file
- [ ] No pack file references an id that isn't in the index
- [ ] Every pack declares a real tone
- [ ] Item ids are stable and unique across the deck
- [ ] Longest item fits the real screen
- [ ] Tone is consistent within a pack and genuinely different between packs
- [ ] Nothing in the deck contradicts a "never do this" from the interview
