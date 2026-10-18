# 04 · Storyboard and mockups

`redesign/app.html` is one file that is three things at once:

1. **The storyboard** - every screen in the product, grouped by user journey.
2. **The hi-fi mockup** - real CSS, real tokens, real type; the visual source of truth.
3. **The spec** - the component CSS in it is what gets ported to Compose and SwiftUI.

It beats Figma for this job because it is diffable, greppable, renders offline, and cannot silently
drift from the tokens.

---

## Page skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>App · Android design (Direction B)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:…&family=Geist:wght@400..700&display=swap" rel="stylesheet">
  <style>
    /* ============ tokens ============ */   /* 1 */
    :root{ --bg:#…; --surface:#…; --ink:#…; --accent:#…; --r-md:16px; --serif:"…"; --sans:"…"; }
    .dark{ --bg:#…; /* full remap */ }

    /* ============ page ============ */      /* 2 */
    .page-head{ …grid, big serif h1 with one <em> in the accent… }
    .tokens{ …live swatches + an Aa in each family + radius list… }
    .toc{ …one link per group, with a screen count… }
    .legend{ …Live / Planned / "Why:" key… }
    .group{ max-width:1480px; margin:0 auto; padding:56px 40px 8px }
    .group-title h2{ font-family:var(--serif); font-size:40px }
    .row{ display:flex; gap:36px; overflow-x:auto; padding:32px 4px }
    figure{ flex:none; width:360px; display:flex; flex-direction:column; gap:14px }

    /* ============ device ============ */     /* 3 */
    .phone{ width:360px; height:780px; border-radius:44px; padding:9px; background:#121110;
            box-shadow:0 1px 0 rgba(255,255,255,.07) inset, 0 40px 70px -32px rgba(40,20,15,.5) }
    .screen{ position:relative; width:100%; height:100%; border-radius:36px; overflow:hidden;
             background:var(--bg); color:var(--ink); font-family:var(--sans) }
    .status{ …9:41, centred punch-hole, signal/wifi/battery… }
    .status.light{ color:#fff }
    .scroll{ position:absolute; inset:0; overflow-y:auto; padding:46px 20px 104px }
    .gesture{ …bottom home indicator… }
    .nav{ …4-column bottom bar, 86px, blur backdrop, hairline top border… }

    /* ============ components ============ */  /* 4 */
    .appbar / .btn (.primary .accent .ghost .soft .text) / .card / .chip / .chips / .divider
    .avatar / .pair / .eyebrow / .muted / .section / .tabular / .glow

    /* ============ per-screen ============ */  /* 5 */
    .home / .question / .memory / … only where a screen needs something genuinely local
  </style>
</head>
<body>
  <header class="page-head">
    <h1>App, <em>the promise in five words.</em></h1>
    <p>One paragraph: the direction, who it's for, and where retention comes from. Cite the research
       file the screens answer to.</p>
  </header>
  <div class="tokens"> …type + swatch summary… </div>
  <nav class="toc"> <a href="#getting-in">Getting in<span>9</span></a> … </nav>
  <div class="legend">
    <span><span class="st live">Live</span> in the app today</span>
    <span><span class="st new">Planned</span> designed here, not built yet</span>
    <span style="border-left:2px solid var(--accent);padding-left:9px">Why: the problem this screen answers</span>
  </div>

  <!-- ==== 1. GETTING IN ==== -->
  <section class="group" id="getting-in">
    <div class="group-title">
      <h2>Getting in</h2>
      <span>What this journey optimises for, in one sentence.</span>
    </div>
    <div class="row">

      <figure>
        <div class="phone"><div class="screen">
          <div class="status light"><span>9:41</span><span class="ic">▾ ▴ <b></b></span></div>
          <div class="scroll nonav"> …real markup, real copy… </div>
          <div class="gesture"></div>
        </div></div>
        <figcaption>
          <b>Welcome <span class="st live">Live</span></b>
          Why this screen exists, and the one decision on it.
        </figcaption>
      </figure>

    </div>
  </section>
</body>
</html>
```

The five CSS blocks are the point. Blocks 1–4 are shared; block 5 is the only place a screen may add
CSS. If block 5 grows past a handful of rules, a component is missing from block 4.

---

## Rules

### Group by job, not by team
`Getting in · Every day · Talk & play · Little notes · Keeping & letters · Looking forward ·
You two · Widgets · Moments that bring you back`. The group name should be something a user would
recognise as a thing they do.

### Every screen states its job
The figcaption is `**Title** <state label>` then one or two sentences of **why**. This is the field
that stops a screen existing for no reason. Source reasons from research, not intuition.

### Label reality
`Live` / `Planned` per screen. A board that implies everything is built trains stakeholders to
distrust it.

### Mock the real device, not a fantasy one
Platform-correct status bar (time, cut-out, signal/wifi/battery, battery orientation), real nav,
gesture indicator. Never invent a status bar the device doesn't have.

### Draw the states nobody wants to draw
For each significant surface, include as applicable: empty, first-run, loading, error, offline,
long content, long name, no permission, dark mode, one-handed. These are where the design system
earns its keep - an empty state is the clearest proof the type scale and spacing work.

### Use real content
Real strings, real names in the mock data, realistic lengths. Lorem ipsum hides the two most common
bugs: overflow and translation.

### One accent moment per screen
If the design has a reserved accent (a gradient, a single coloured element), enforce "at most one per
screen" in the CSS and put a comment on it. Then have it be genuinely the most important thing.

### Photos are placeholders with a licence
Mark stock photos in the markup and log them in `IMAGE_CREDITS.md`. Never ship a photo you can't
trace.

### Dark mode is a class, not a second file
`.dark{ }` remaps the same tokens and a screen adds `.dark` to its `.screen`. Verifying dark mode is
then a one-character edit rather than a second design.

---

## `directions.html` - the fork

Same three screens, three CSS scopes, side by side, each column labelled `A · Keepsake paper`
`Fraunces + Hanken Grotesk`. Rules:

- Directions must differ in **type pairing and colour logic**, not just hue. A/B/C that only change
  the accent are one direction.
- Render the *same* screens in each, so the comparison is about the system.
- Include the ugly one - a direction that only looks good on the welcome screen is not a direction.
- Keep the file after choosing. It is the answer to "why isn't this Fraunces?".

Sign-off question to ask a stakeholder: *"Which of these would you be happy to still be using in
three years?"*

---

## `landing.html` - proof of the system
Build the marketing page in the same CSS blocks. If the landing page needs a font, colour or radius
the app doesn't have, one of the two is wrong.

---

## Review checklist before you call Phase 4 done
- [ ] Every screen reachable from the TOC
- [ ] Every group has a one-line rationale
- [ ] Every screen has a `Live`/`Planned` label that is true
- [ ] Dark mode passes on every screen, not just the hero
- [ ] Empty, loading and error states exist for every list and form
- [ ] Longest realistic string doesn't break any layout
- [ ] Tap targets are ≥ 48dp / 44pt (measure the `.btn` and `.chip` heights)
- [ ] No hex literal outside the `:root` block
- [ ] Renders with no network (fonts local)
- [ ] No screen uses the accent more than once
