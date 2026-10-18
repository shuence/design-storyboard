# 06 · Illustrations

`design/illustrations.mjs` is the single source for spot art: empty states, onboarding moments,
success and celebration, first-run, "nothing here yet".

Same pattern as the icon generator: it writes review SVGs **and** both platforms' assets in one run,
so iOS and Android can never disagree.

```bash
node design/illustrations.mjs
```
Template: [`../assets/illustrations.mjs`](../assets/illustrations.mjs).

---

## The compatibility constraint

A VectorDrawable is a *subset* of SVG. Support only what both formats implement, and the one file
powers both platforms:

| Allowed | Forbidden |
|---|---|
| `<path d>` with fills | `<text>` - no text in illustrations, ever |
| `stroke` with round caps/joins | CSS in `<style>` - inline attributes only |
| `fill-opacity`, `stroke-opacity` | Multi-stop gradients, `<mask>`, `<filter>` |
| Group transform: translate, scale, rotate | `clip-path`, non-uniform scale |
| `fill-rule="evenodd"` | `<use>` with complex inheritance |

If a design needs a filter or a gradient, either bake it into paths or accept a rasterised asset and
log the exception.

---

## Geometry helpers, not hand-drawn paths

Every shape is a function returning path data. This is what makes the set feel designed rather than
traced, and lets a size change be one number.

```js
const n = (v) => +v.toFixed(2);
const circle  = (cx, cy, r) => `M${n(cx-r)},${n(cy)} a${r},${r} 0 1,0 ${2*r},0 a${r},${r} 0 1,0 ${-2*r},0 Z`;
const ellipse = (cx, cy, rx, ry) => `M${n(cx-rx)},${n(cy)} a${rx},${ry} 0 1,0 ${2*rx},0 a${rx},${ry} 0 1,0 ${-2*rx},0 Z`;
const rrect   = (x, y, w, h, r) => `M${x+r},${y} H${x+w-r} A${r},${r} 0 0 1 ${x+w},${y+r} V${y+h-r} …`;
```

Build richer shapes by composing: a bucket is a trapezoid plus an ellipse pupil; a letter is a
rounded rect plus a folded triangle; a jar is a rect with a lid.

---

## Drawing rules

### One canvas, one optical size
Pick a fixed viewBox (e.g. `240 × 200`) and use it for every illustration. A set where each piece
has its own canvas cannot be laid out in a row.

### One palette, shared with the app
Pull the illustration palette from the same token values as the app. Illustrations that use their
own colours are the single most common source of "the app looks inconsistent".

### Flat fills, one line weight
Round strokes at 2–3 units, one colour (`--line`-ish) for structure. No gradients, no shadows, no
texture.

### Read at the size it ships
Empty states render ~120–200 px wide. Check every illustration at that size; detail under 4 units
vanishes.

### Theme by remapping, not redrawing
Emit one SVG per illustration and let the platform recolour. Do not generate a second dark file -
give the composition a `currentColor`-style slot or a `data-theme` variant in the generator if dark
needs genuinely different values.

### Name by moment, not by object
`illustration_paired`, `illustration_welcome`, `illustration_bucket` - the name should map to the
screen moment it serves, not the shape it draws. `illustration_circle_v2` is unsearchable.

---

## Which illustrations to draw

Derive the list from the storyboard: every screen with an empty state, every onboarding step, every
success confirmation. Typically 8–12 pieces for a consumer app:

| Moment | Why it earns a drawing |
|---|---|
| First run / welcome | the only place a user sees the brand before using it |
| Empty list | the most-seen screen on day one |
| Paired / connected | the emotional payoff of setup |
| Waiting on the other person | turns a dead end into anticipation |
| Success / milestone | celebration, replaces a confetti library |
| No results / not found | avoids a blank error |
| Offline | avoids a scary error |
| Add-your-first-X | drives the second action |

---

## Outputs per illustration
| Target | Path |
|---|---|
| Review | `design/illustrations/<name>.svg` |
| iOS | `ios/<App>/Resources/Assets.xcassets/Illustrations/<name>.imageset/` (+ `Contents.json`, vector-preserving `preserves-vector-representation: true`) |
| Android | `android/app/src/main/res/drawable/<name>.xml` (VectorDrawable) |

## Checklist
- [ ] Every illustration on the same viewBox
- [ ] Every colour traceable to a token
- [ ] Readable at empty-state size
- [ ] No `<text>`, no filters, no multi-stop gradients
- [ ] Both platform outputs regenerate cleanly from scratch
- [ ] Names map to moments in the storyboard
- [ ] Nothing in the set is a one-off that only appears on one unreachable screen
