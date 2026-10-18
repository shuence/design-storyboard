# 05 · Logo, wordmark and launcher icons

Three separate deliverables that people wrongly conflate. Do them in this order.

---

## 1. Logo concepts — `store/logo-icon.html`

Present **3–6 genuinely different marks** in one review page. "Different" means different *ideas*,
not different corner radii:

| Kind | Example idea |
|---|---|
| Literal | two overlapping circles = two people |
| Abstract | an open bracket, a knot, a folded plane |
| Typographic | a monogram cut from the wordmark's letters |
| Negative space | the shape is formed by what's removed |
| Object | a seal, a jar, a letter flap |

Each candidate must be shown at **16, 32, 64, 128, 1024 px**, in **light and dark**, on the brand
ground. If it dies at 16 px, it is not a launcher icon.

**Also show misuse**, because this is where a design system actually gets protected:
stretched, rotated, outlined, on a busy photo, with a drop shadow, in a colour it doesn't own,
without its clear space, with the wordmark re-typed in the wrong font.

**Aim for the mark to be constructible from a formula**, not hand-drawn: two circles, radius `r`,
centres offset `±d`. Formulas survive resizing, localisation and new variants; vector art does not.

---

## 2. Wordmark

Define it once, in `store/README.md`, as a table. There is exactly one wordmark — no secondary
lockup, no monogram, no outlined version. The moment there are two, they diverge.

| Attribute | Decision to record |
|---|---|
| Family | e.g. the UI sans, never the display serif |
| Weight | e.g. 600 |
| Tracking | e.g. `-.03em` |
| Casing | e.g. always lowercase |
| Punctuation | e.g. always closed by a full stop in the accent colour |
| Ground | e.g. light grounds only |
| Minimum size | in px, at which it is still legible |

Then name the **source of truth** for it — the CSS rule and line in `landing.html` — so a change is
one edit, not a hunt.

Everything downstream (store listings, landing page, app bars, email) must reference the table. If
someone types the brand name in Newsreader Italic, that's a miss, not a variation.

---

## 3. Launcher icons

`design/app-icons.mjs` writes review SVGs **and** the real platform assets in one run.

```bash
node design/app-icons.mjs
```

Template: [`../assets/app-icons.mjs`](../assets/app-icons.mjs).

### Variant set
Ship at least four, driven by one `variants` array:

| id | Ground | Mark | Purpose |
|---|---|---|---|
| `default` | brand ground | two-tone mark | the shipped icon |
| `<brandDeep>` | solid brand | light mark | more presence on light home screens |
| `night` | near-black | accent mark | dark/OLED home screens, iOS dark appearance |
| `mono` | light ground | single-ink mark | the conservative / print-adjacent option |

In-app appearance pickers should let the user choose. Preview thumbnails need **ordinary
`.imageset`s**, not `.appiconset`s — app-icon renditions cannot be loaded with `UIImage(named:)`.

### iOS
- **Opaque.** App icons must not contain alpha. Rasterise with `magick -alpha off`; strip it, don't
  trust the source.
- **Full-bleed 1024.** No rounded corners drawn by you — the OS masks it.
- Ship `AppIcon.appiconset` with a single 1024 `universal` entry and let Xcode derive the rest.
- `Contents.json` per set:
  ```json
  { "images": [{ "filename": "AppIcon-1024.png", "idiom": "universal", "platform": "ios", "size": "1024x1024" }],
    "info": { "author": "xcode", "version": 1 } }
  ```

### Android
- **Adaptive icon** = `<adaptive-icon>` with `<background>` + `<foreground>` + `<monochrome>`.
- Layer is **108 dp**; keep the mark inside a centred **~66 dp circle** — that is the safe zone that
  survives circle, squircle and rounded-square masks. Draw the content in the middle two thirds and
  let the edges be background.
- Emit the foreground as a **VectorDrawable** (`android:width/height/viewportWidth/viewportHeight`
  all 108). Circles as two arcs:
  ```
  M<cx>,<cy> m-<r>,0 a<r>,<r> 0,1 1,<2r>,0 a<r>,<r> 0,1 1,<-2r>,0
  ```
- Colours come from `@color/*` resources, never inline hex — the theme and the icon must be able to
  move together.
- Ship the `<monochrome>` layer as a real drawable; if you stub it, Android 13+ themed icons
  silently break.
- Adaptive icon XML goes in `res/mipmap-anydpi/`. Also provide a legacy `res/mipmap-*/ic_launcher.png`
  if `minSdk` predates API 26.

### Both platforms
- **Test the masks.** Render the mark inside a circle, a squircle, a rounded square, and a 16 px
  favicon before shipping.
- **No text in the icon.** It is illegible at real sizes and untranslatable.
- **No transparency, no thin strokes.** A 1 px hairline disappears at 32 px.
- **Consistent optical weight with the wordmark.** If the icon reads heavier than the wordmark, one
  of them is wrong.
- **One generator, one run, both platforms.** If iOS and Android ever need separate hand-edits, the
  generator is missing a rule.

### Play Store / App Store extras
| Asset | Size | Notes |
|---|---|---|
| Play icon | 512 × 512 PNG32 | ≤ 1 MB, opaque, no shadow |
| Play feature graphic | 1024 × 500 | separate art, not a screenshot |
| App Store icon | 1024 × 1024 | no alpha, flattened |
| Android TV banner (if applicable) | 1280 × 720 | |

These are rendered from the store artboard pipeline — see
[`07-store-and-marketing.md`](07-store-and-marketing.md) — using the *same* generator output, so the
icon on the listing is provably the icon in the app.
