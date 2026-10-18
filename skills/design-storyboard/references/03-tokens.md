# 03 · Tokens

`tokens.json` is W3C Design Tokens (DTCG) shaped. Three layers, strict direction of dependency:

```
raw palette  →  semantic aliases  →  UI code
   #C93C55        accent                var(--accent)
```

UI code **only** ever sees the semantic layer. Raw hex appears in exactly three places: the token
file, platform window/launch colour resources, and the asset generators.

---

## File shape

```jsonc
{
  "$description": "…what this file is, which direction it encodes, and the command to validate it…",
  "$version": "0.1.0",

  "color": {
    "$type": "color",
    "brand":     { "primary": { "$value": "#…", "$description": "where it may and may not be used" } },
    "neutral":   { "paper": {}, "white": {}, "soft": {}, "line": {}, "ink": {}, "ink2": {}, "ink3": {},
                   "night": {}, "nightSurface": {}, "nightSoft": {}, "nightLine": {}, "moon": {}, "moon2": {}, "moon3": {} },
    "support":   { "petal": {}, "butter": {}, "sage": {}, "sky": {}, "lilac": {} },
    "utility":   { "error": {}, "success": {}, "info": {}, "errorDark": {}, "successDark": {}, "infoDark": {} }
  },

  "semantic": {
    "$description": "UI code references these names only, never raw palette values.",
    "light": {
      "background": "{color.neutral.paper}",
      "surface": "{color.neutral.white}",
      "surfaceMuted": "{color.neutral.soft}",
      "surfaceTint": "{color.neutral.blush}",
      "textPrimary": "{color.neutral.ink}",
      "textSecondary": "{color.neutral.ink2}",
      "textTertiary": "{color.neutral.ink3}",
      "accent": "{color.brand.primary}",
      "actionPrimary": "{color.neutral.ink}",
      "onActionPrimary": "{color.neutral.paper}",
      "actionSecondary": "{color.neutral.soft}",
      "onActionSecondary": "{color.neutral.ink}",
      "border": "{color.neutral.line}",
      "borderStrong": "{color.neutral.ink3}",
      "error": "…", "success": "…", "info": "…",
      "categoryA": "{color.support.petal}", "onCategory": "{color.neutral.ink}",
      "glowBase": "…", "glowLight": "…", "glowDeep": "…", "onGlow": "{color.neutral.white}"
    },
    "dark": { "…every light key, remapped…" }
  },

  "typography": {
    "fontFamily": {
      "serif": { "$type": "fontFamily", "$value": ["Newsreader", "Georgia", "serif"] },
      "ui":    { "$type": "fontFamily", "$value": ["Geist", "system-ui"] }
    },
    "style": {
      "wordmark":  { "family": "ui", "weight": 600, "size": 18, "lineHeight": 22, "tracking": -0.03, "iosTextStyle": "headline" },
      "displayXL": { "family": "serif", "weight": 400, "size": 44, "lineHeight": 44, "tracking": -0.02, "iosTextStyle": "largeTitle" },
      "body":      { "family": "ui", "weight": 400, "size": 15, "lineHeight": 23, "iosTextStyle": "body" },
      "caption":   { "family": "ui", "weight": 400, "size": 12, "lineHeight": 16, "iosTextStyle": "caption" }
    }
  },

  "spacing": { "$type": "dimension", "xxs": {"$value":4}, "xs": {"$value":8}, "sm": {"$value":12},
               "md": {"$value":16}, "screen": {"$value":20}, "lg": {"$value":24}, "xl": {"$value":32}, "xxl": {"$value":48} },

  "radius":  { "$type": "dimension", "xs": {"$value":8}, "sm": {"$value":12}, "md": {"$value":16},
               "lg": {"$value":22}, "xl": {"$value":28}, "pill": {"$value":999} },

  "size":    { "$type": "dimension", "minTouchTarget": {"$value":48}, "buttonHeight": {"$value":52},
               "fieldHeight": {"$value":52}, "chipHeight": {"$value":34} },

  "motion":  { "$type": "duration", "quick": {"$value":150}, "standard": {"$value":250},
               "gentle": {"$value":400, "$description": "skip when Reduce Motion is on"} },

  "contrastChecks": {
    "$description": "Validated by check-contrast.mjs in both modes. 4.5 = normal text, 3.0 = large text / UI components.",
    "pairs": [ ["textPrimary","background",4.5], ["textSecondary","surface",4.5], ["accent","surface",4.5] ]
  }
}
```

---

## Rules

### Semantic names describe *role*, not appearance
`textSecondary`, not `grey600`. The moment a name encodes a value, a redesign becomes a rename.

### Reservations get written down
If the accent colour may only be used for emphasis and one gradient, put that in the token's
`$description`. Undocumented reservations do not survive contact with a second designer.

**Pattern worth copying** - primary actions are *ink*, not the accent:
> `actionPrimary` is ink, not rose: rose is reserved for accent text and the glow.

This is the single highest-leverage decision in a one-accent system. The accent stays special
because nothing large is allowed to use it.

### Dark mode is a remap, not an inversion
Write the dark block in full and check every pair. Do not derive it. Accents that pass on paper
usually fail on near-black; ship a `*Dark` variant of utility colours rather than nudging opacity.

### Category tints are one family, one text colour
Pastel chips share `onCategory`. If any pastel needs its own text colour, the pastels are too
saturated.

### Sizes are strings, not magic numbers
`buttonHeight`, `fieldHeight`, `chipHeight`, `minTouchTarget` live in tokens so a platform audit
can check accessibility (48dp / 44pt) against a value instead of a screenshot.

### Motion has three durations, not six
`quick` (state change), `standard` (transition), `gentle` (a reveal worth waiting for). Anything
longer than `gentle` needs a reason and a reduced-motion path.

---

## The contrast gate

`check-contrast.mjs` resolves `{dot.path}` aliases, computes WCAG 2.x relative luminance, and
checks every pair in both modes. Exit code 1 on any failure - wire it into CI.

Minimums:
| Pair kind | Min |
|---|---|
| Body and secondary text | 4.5 |
| Large text (≥24px, or ≥19px bold), UI component boundaries | 3.0 |
| Text on an accent fill (buttons, chips, glow) | 4.5 |

Include at minimum: every `textPrimary` / `textSecondary` pair against `background`, `surface`,
`surfaceMuted`, `surfaceTint`; `textTertiary` at 3.0; `accent` on background and surface;
`onActionPrimary` on `actionPrimary`; `onCategory` on every category tint; `onGlow` on
`glowBase` **and** `glowDeep`; `error`/`success`/`info` on background and surface.

**When a pair fails, change the token.** Never lower `min`. Never add an exemption.

### Gradients need their own pair
Text on a gradient is only as legible as its worst corner. Check `onGlow` against both the base and
the darkest stop, not the average.

---

## Typography rules that survive design review
- **Sentences, not all-caps.** All-caps breaks the moment copy is translated.
- **Serif for voice, sans for interface.** Display, numbers, questions and user-written content get
  the serif; everything navigational gets the sans.
- **Tabular figures on the serif** so counts don't jitter as they tick.
- **Map every style to a platform text style** (`iosTextStyle`) so Dynamic Type scales it. A style
  with no mapping silently ignores accessibility settings.
- **Tracking in em, on the style.** Negative tracking on large serif is what makes it read as
  editorial rather than default.

## Mirroring to platforms
Generate, don't retype:
| Target | Path |
|---|---|
| Kotlin | `android/app/src/main/java/<app>/core/design/<App>Tokens.kt` (+ `Type.kt`, `Theme.kt`) |
| Swift | `ios/<App>/Core/DesignSystem/<App>Tokens.swift` |
| Docs | `docs/DESIGN_SYSTEM.md` - palette table, semantic table, the accent reservation, the glow spec |

Then add a check: grep the UI source for hex literals. Zero hits outside the token files.
