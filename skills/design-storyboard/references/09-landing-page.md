# 09 · Landing page

`redesign/landing.html` is the app's marketing page. It lives in the design folder for two reasons:

1. **It proves the design system generalises.** A system that only works inside a 390 px phone frame isn't a system.
2. **It's the page every campaign points at.** Store screenshots, ads, press and social all land here, so it has to be built from the same tokens or the brand visibly wobbles.

Build it with the same CSS blocks as `app.html` (`:root` tokens, page, device, components). Never fork a second palette for marketing.

---

## 1. What the page is for

One job, named before you write a line:

| Job | Primary CTA | Success |
|---|---|---|
| Get the app installed | App Store / Play badge | store click |
| Get an email | email field | submitted |
| Get a demo / call | book a time | meeting |
| Get a signup | create account | account |

If the page tries to do two, the hero will say neither well. Pick one; put the second in the footer.

**One primary CTA.** It appears in the hero, again after the proof section, and once at the end. Secondary actions are text links, not buttons: a page with two equal buttons has no call to action.

---

## 2. Structure

The order is not decoration. Each section answers the question the previous one creates.

```
1  Hero            what it is, who it's for, the one action
2  Proof strip     logos, numbers, ratings, or a single hard claim
3  The problem     the status quo, in the user's words
4  How it works    3 steps, one sentence each
5  The payoff      what they get back: the section that converts
6  Objections      1 section each: price, privacy, effort, switching cost
7  Social proof    quotes with a name and a face, or nothing
8  Pricing         (if it has a price) or a single honest "free" line
9  FAQ             5–8 real questions, matching what support actually gets
10 Final CTA       restate the promise, repeat the button
11 Footer          legal, contact, store links, language
```

### Hero rules
- Headline ≤ 8 words. It states the outcome, not the category ("A little world for the two of you", not "Couples communication platform").
- Supporting line: one sentence, ≤ 25 words, explains *how*.
- CTA above the fold on a 360 × 640 viewport. If it needs a scroll, it doesn't exist.
- Show the product. A real device frame with a real screen beats an abstract illustration every time.
- No carousel. No autoplay video above the fold. No cookie wall over the hero.
- One accent word may be italic/coloured. Not three.

### Section rules
- **One idea per section.** If a section needs two subheads, it's two sections.
- **Alternate rhythm.** Full-bleed → contained → full-bleed keeps a long page from turning into a stack.
- **No feature grid longer than 6.** A 12-tile grid is a spec sheet, not an argument.
- **Objections, not features.** "Won't this be another app I forget?" → answer it. A feature list doesn't.
- **Proof beats adjectives.** "Used by 12,000 couples" > "loved by thousands". If you have no proof, use a specific, verifiable claim instead.
- **Quotes need attribution.** Name, role, and a real face. An unattributed quote is worse than none.

---

## 3. Copy

| Do | Don't |
|---|---|
| Say the outcome | "revolutionise", "seamlessly", "empower" |
| Use the user's words from research | internal product nouns |
| Numbers with a source | "thousands", "many" |
| Sentence case | Title Case In Every Heading |
| 2nd person | "users can…", "the platform allows…" |
| One promise repeated 3× | a new promise per section |

Read the whole page aloud. If a sentence couldn't be said to a friend, cut it.

**Length:** a consumer app page is 600–1000 words. A B2B page is 900–1600. Longer is fine if every section earns the scroll; length is not a virtue.

---

## 4. Metadata and social

Every page ships these, or it will look broken when shared:

```html
<title>App: the promise, in a few words</title>
<meta name="description" content="One sentence, ≤ 155 chars, with the outcome and the audience.">
<link rel="canonical" href="https://example.com/">
<meta property="og:title"       content="App: the promise">
<meta property="og:description" content="Same sentence, no truncation surprises.">
<meta property="og:image"       content="https://example.com/og.png">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="628">
<meta property="og:type"        content="website">
<meta name="twitter:card"       content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

Plus:
- **OG image rendered from code**, not hand-made: `redesign/og.html` at 1200 × 628, screenshotted by the same headless-Chrome pass as the store kit. It stays in sync automatically.
- **JSON-LD** for the product/app (`SoftwareApplication` or `MobileApplication`) with name, description, operatingSystem, offers, and `aggregateRating` only if real.
- **`lang` on `<html>`**, and a real `<h1>`, one per page.
- Favicon must survive 16 px. Test it in a tab, not at 512.

---

## 5. Performance and accessibility

The landing page is the one page that gets judged on a cold 4G phone.

| Budget | Target |
|---|---|
| LCP | < 2.5 s on a simulated 4G |
| CLS | < 0.1, reserve space for every image and embed |
| INP | < 200 ms |
| JS shipped | ideally 0; hard cap ~50 KB for a marketing page |
| Images | AVIF/WebP, `width`/`height` set, `loading="lazy"` below the fold, hero preloaded |
| Fonts | `font-display: swap`, preconnect, at most 2 families, subset |

Accessibility floor (this is also SEO):
- Contrast passes the same `check-contrast.mjs` token pairs.
- Every image has meaningful `alt`, or `alt=""` if decorative.
- Focus is visible on every interactive element; tab order matches visual order.
- Tap targets ≥ 44 px.
- Motion respects `prefers-reduced-motion`.

---

## 6. Measurement

Define the events before launch, not after:

| Event | Fires when |
|---|---|
| `page_view` | load |
| `cta_click` | any primary button, with `location` = hero / mid / final |
| `store_click` | platform badge, with `platform` |
| `faq_open` | accordion opened, with the question id |
| `scroll_75` | 75% depth |

No PII, no email in event properties. If analytics is consent-gated, wire the gate, not a workaround.

---

## 7. Deploy

Static output is enough: one HTML file, one CSS block, a few images, the OG card. That means:
- `python3 -m http.server` locally; any static host in production (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
- No build step is a feature: the design folder must render offline with `file://`.
- If fonts or images are remote, note the network dependency in `store/README.md` so a bad offline render isn't a mystery.

---

## 8. Review checklist

- [ ] The primary CTA is above the fold at 360 × 640
- [ ] Exactly one primary CTA, repeated 3×
- [ ] Headline ≤ 8 words, states an outcome
- [ ] Every section answers a question the previous section raised
- [ ] At least one piece of real proof (or a verifiable specific claim)
- [ ] Screenshots are real, current, and match the shipped app
- [ ] `Live`/`Planned` discipline carries over, no marketing a feature that isn't shipped
- [ ] All metadata present; OG card renders at 1200 × 628
- [ ] Favicon legible at 16 px
- [ ] Loads with JS disabled (content and CTA still work)
- [ ] Passes the contrast gate and keyboard navigation
- [ ] LCP < 2.5 s and CLS < 0.1 on a throttled phone
- [ ] Events fire with the right `location` values
- [ ] Footer has legal, support and the store links

---

## 9. Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Pretty, doesn't convert | No single job | Name the CTA job, cut competing actions |
| Hero says nothing | Category headline ("The #1 platform for…") | Rewrite as the outcome the user gets |
| Page feels long and thin | Sections restate the hero | Delete anything that doesn't answer an objection |
| Screenshots look off-brand | Rebuilt outside the tokens | Render from `app.html`'s CSS blocks |
| Shares look broken | No OG image | Render `og.html` in the same pass as the store kit |
| Slow on mobile | Unoptimised hero image, 3 font families | Compress, subset, preload one image only |
| Looks like every other AI site | Default gradient + centred everything | Use the app's real type pairing and one accent, left-aligned, generous space |
