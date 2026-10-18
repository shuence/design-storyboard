# 07 · Store and marketing assets

Store assets are the only part of the design system a stranger sees before the product. Generate
them from the same tokens and the same component CSS as the app, because a screenshot kit that
drifts from the app is worse than no kit.

---

## Required sizes (hard contract)

### Apple App Store
| Asset | Size | Notes |
|---|---|---|
| iPhone 6.9″ | 1320 × 2868 | **required** |
| iPhone 6.5″ | 1242 × 2688 | required if you support older devices |
| iPad 13″ | 2064 × 2752 | required if the app runs on iPad |
| App icon | 1024 × 1024 | no alpha |
| App preview video | 886 × 1920 or 1920 × 886 | optional |
| Screenshot count | 3–10 | first 2 carry the most weight |

### Google Play
| Asset | Size | Notes |
|---|---|---|
| Phone screenshots | min 320, max 3840, 16:9-ish, ≤ 8 MB | 2–8, at least 4 recommended |
| 7″ tablet | 1024×600 … | if supported |
| 10″ tablet | 1280×800 … | if supported |
| Feature graphic | 1024 × 500 | **required**, no alpha, not a screenshot |
| App icon | 512 × 512 PNG32 | ≤ 1 MB, no shadow |
| TV banner | 1280 × 720 | only for TV |
| Short description | ≤ 80 chars | truncation is real; test it |

*(Verify current requirements at build time — both stores change them. If a size is uncertain, ask
the user rather than guessing silently.)*

---

## Pipeline

```
store/build/gen_store.py     →  store/build/html/*.html  +  render.sh
store/build/render.sh        →  store/{ios,android}/**/*.png + store/marketing/*.png
```

### `gen_store.py` shape
```python
STORE_CSS    = """  … platform chrome that app.html deliberately omits … """
STORE_SCRIPT = """  … rewrites the status bar per device … """

def page(title, art, extra="", device="android", form="phone"):  # one artboard
def phone_art(w, h, kick, head, screen, frac=0.86, top_frac=0.175, bleed=False):
def tablet_art(w, h, kick, head, screen):
def icon_art(size, cid):
def wordmark(em, color=None):
def banner_art(w, h):
def add(out, title, art, form="phone"):        # register an artboard + its output path
def pixsize(out):
def main():                                     # write html/ and render.sh

if __name__ == "__main__": main()
```

Two modes of artboard:
- **Framed** — headline + device, on a tinted ground. Good for "what it is".
- **Full-bleed** — the screen cropped to the top ~70% of the board, bleeding off the edges. Only use
  for a screen whose point lands inside that band; check the bottom of the content is inside the
  crop before shipping.

### `render.sh`
Generated, not hand-maintained. One line per artboard:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=old --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1320,2868 --virtual-time-budget=30000 \
  --user-data-dir=/tmp/<app>-chrome-ios__iphone-6.9__01-welcome \
  --screenshot="<abs>/store/ios/iphone-6.9/01-welcome.png" \
  "file://<abs>/store/build/html/ios__iphone-6.9__01-welcome.html" >/dev/null 2>&1
```
Needs network if the artboards pull web fonts or stock photos. Note that in the README rather than
being surprised by a bad render.

---

## Platform chrome

`app.html` draws **one** generic status bar, because it's a design document. On a store listing the
bar is a *claim* — "this is the Android app", "this is the iPhone app" — so the store pipeline adds
the real thing.

| | Cut-out | Right-hand icons |
|---|---|---|
| Android phone / 7″ | centred punch-hole camera | signal · wifi · **vertical** battery |
| iPhone | Dynamic Island | signal · wifi · **horizontal** battery |
| Tablets | none; camera in the bezel | as per platform |

Clock stays `9:41` on both. Drive the differences with `data-device` / `data-form` on `<body>` so the
artboard HTML stays one template.

Also store-only: the launcher ground behind a widget board. If the app's real wallpaper gradient reads
dirty behind porcelain widgets, override it **in `STORE_CSS` only** — never change the app to suit a
screenshot.

---

## Screenshot story (the part people skip)

2–8 screenshots are a pitch, not an inventory. Sequence:

1. **The promise** — what it is, in one line. Often not a screenshot at all.
2. **The core loop** — the thing you do daily.
3. **The payoff** — what you get back. This is the one that converts.
4. **The private/safe angle** — if trust is a differentiator.
5. **The breadth** — a second surface (widget, share, plan).
6. **Privacy / no-ads / no-dark-patterns**, as a claim.

Rules:
- One headline per board, 3–6 words, sentence case, no exclamation marks.
- Headline in the display face, supporting line in the UI face, one accent word at most.
- No marketing chrome floating over a real screenshot — no fake buttons, no fake ratings.
- The story must survive being viewed as thumbnails at ~200 px wide.

---

## Marketing variants
From the same generator, produce:
| Asset | Size |
|---|---|
| Social landscape / OG card | 1200 × 628 |
| Social portrait / story | 1080 × 1920 |
| Header / hero | 1920 × 1080 |

These are the ones people will screenshot and post; give them the brand ground, the wordmark, one
line of copy, no device frame.

---

## Review page and README

- **`store/design-board.html`** — every asset on one page, with the wordmark spec and the icon at
  real sizes. Generated (`build/design_board.py`) so it cannot go stale. This is the page you show.
- **`store/README.md`** — must contain: the brand definition table (wordmark + icon, each with a
  source-of-truth link), the required-sizes table, both regenerate commands, and the platform-chrome
  notes.

## Checklist
- [ ] Every required size for every supported channel exists
- [ ] Icons opaque, correct dimensions, no shadow
- [ ] Screenshots ordered and named `NN-slug`
- [ ] Platform chrome correct per device
- [ ] Every screenshot regenerates from `app.html`'s tokens
- [ ] No screenshot shows a feature not actually shipped
- [ ] Photos/licences recorded
- [ ] `design-board.html` opens and shows all of it
- [ ] README lets a stranger regenerate everything
