// =====================================================================
// scripts/seo-pages.mjs - the content for every guide page.
//
// This file is data, not markup. scripts/seo.mjs renders it and derives
// sitemap.xml, llms.txt, the internal link graph and each page's JSON-LD
// from the same objects, so a page cannot exist in the sitemap without
// existing on disk, and cannot be linked without being listed here.
//
// Blocks are deliberately small: an extractable answer paragraph, then
// headings, tables and lists. That shape is what both search engines and
// answer engines pull passages out of. No em dashes, no filler.
// =====================================================================

export const SITE = "https://design-storyboard.vercel.app";
export const REPO = "https://github.com/shuence/design-storyboard";
export const REGISTRY = "https://skills.sh/shuence/design-storyboard";
export const INSTALL = "npx skills add shuence/design-storyboard";
export const AUTHOR = "shuence";
export const PUBLISHED = "2026-10-18";
export const UPDATED = "2026-10-19";

// Every page in the cluster. Order here is the order in the nav, the
// sitemap and llms.txt.
export const PAGES = [
  // -------------------------------------------------------------------
  {
    slug: "design-folder",
    nav: "Design folder",
    eyebrow: "The main guide",
    h1: "What is a design folder?",
    title: "What is a design folder, and what belongs in one",
    description:
      "A design folder is the committed directory that holds your app's design tokens, screen storyboard, mockups, logo, icons and store assets. What goes in one, and why hand-drawn versions rot.",
    answer:
      "A design folder is a committed directory inside an app repository that holds the design system and everything generated from it: design tokens, a screen storyboard, hi-fi mockups, the logo and wordmark, launcher icons, illustrations, content packs and store screenshots. It sits next to the code, so it is reviewed, diffed and regenerated like any other source file.",
    blocks: [
      { h2: "Why design folders rot" },
      {
        p: "A design folder rarely fails loudly. It fails by drift. Someone changes the brand colour in the app, the icons keep the old one, and nobody notices until a screenshot is on a store listing. The cause is almost always the same: the artifacts were drawn by hand instead of produced by a script.",
      },
      {
        ul: [
          "The launcher icon is a PNG exported months ago, so it still carries the old palette.",
          "The store screenshots show a screen that was renamed, or a tab bar that no longer exists.",
          "The mockups are images, so no one can grep them, review them in a pull request, or re-render them.",
          "The landing page was written once from a different set of hexes than the app.",
          "Nobody can tell you which of the four greys means secondary.",
        ],
      },
      {
        p: "A design folder that is generated does not have this failure mode. Change one token and every artifact derived from it is one command away from agreeing again.",
      },

      { h2: "What belongs in one" },
      {
        table: {
          head: ["Artifact", "Generated from", "Why it is in the folder"],
          rows: [
            ["Design tokens", "the palette, type and spacing decisions", "One source of truth that code and generators both read"],
            ["Screen storyboard", "the tokens plus the interview answers", "Every screen, grouped by job, each captioned with why it exists"],
            ["Hi-fi mockups", "the tokens and component CSS", "Real markup in a device frame, not flattened images"],
            ["Logo and wordmark", "one mark definition", "Three decisions in order: mark, wordmark, launcher icon"],
            ["Launcher icons", "the same mark definition", "An opaque iOS set and a 108dp Android adaptive layer"],
            ["Illustrations", "one canvas and the palette", "SVG for the web, VectorDrawable for Android, from the same paths"],
            ["Content packs", "one vocabulary and tone", "Empty states, errors, prompts and notifications"],
            ["Landing page and OG card", "the same tokens", "So the marketing page cannot disagree with the product"],
            ["Store kit", "the mockups, rendered headlessly", "Every size App Store Connect and Google Play ask for"],
            ["Platform mirrors", "the token file", "Kotlin and Swift constants emitted, not retyped"],
          ],
        },
      },

      { h2: "The folder contract" },
      {
        p: "A folder with an unpredictable shape is a folder nobody opens. The skill writes this contract every time, so a reader who has seen one design folder has seen all of them:",
      },
      {
        code: `design/
  tokens.json            one source of truth, DTCG shaped
  check-contrast.mjs     a gate that fails, not an opinion
  app-icons.mjs          iOS and Android from one mark
  illustrations.mjs      SVG and VectorDrawable from one canvas
  redesign/
    directions.html      three systems, pick one
    app.html             storyboard and hi-fi mockups
    landing.html         marketing, same tokens
    og.png
  store/                 logo review, design board, every required size
  question-packs/        the copy decks`,
      },

      { h2: "Hand-drawn versus generated" },
      {
        table: {
          head: ["What changes", "Hand-drawn folder", "Generated folder"],
          rows: [
            ["Brand colour", "Re-export icons, screenshots, landing page", "Re-run the generators"],
            ["A screen is renamed", "Old name survives in the screenshots", "The storyboard is rebuilt from the answers"],
            ["Type scale moves", "Mockups are now a lie", "Mockups and landing page re-render from tokens"],
            ["Someone joins the team", "Asks which grey is secondary", "Reads the token file"],
            ["Review", "Open a design tool", "Diff a pull request"],
          ],
        },
      },

      { h2: "How to generate one" },
      {
        steps: {
          name: "How to generate a design folder with an agent skill",
          steps: [
            ["Install the skill", `Run ${INSTALL}. It detects every supported agent on the machine and installs into each one.`],
            ["Answer the interview", "The skill asks for the promise, the user, the moment of use, what the product must never do, the platforms you ship and the competitors you are measured against."],
            ["Pick one of three directions", "Three real type and colour systems go on the same screens. Nothing else is generated until you choose. This is the first deliberate stop."],
            ["Approve the tokens and pass the gate", "It writes DTCG tokens, then the contrast checker has to exit zero. This is the second deliberate stop, and the minimum is never lowered to make a palette pass."],
            ["Let it write the folder", "Storyboard, mockups, logo, launcher icons, illustrations, content packs, landing page with its OG card, and every store screenshot size."],
            ["Verify and mirror", "Run the generators, paste their output, name any placeholders, and emit the Kotlin and Swift token mirrors from the same file."],
          ],
        },
      },

      { h2: "What a design folder is not" },
      {
        ul: [
          "It is not a moodboard. A moodboard is a pile of references. A design folder is the set of decisions that survived.",
          "It is not a design tool. It has no canvas, no multiplayer cursor and no component library to browse.",
          "It is not a component library. It defines tokens and the screens that consume them, and it stops there.",
          "It is not decoration for the repository. If a file in it cannot be regenerated, it does not belong in it.",
        ],
      },
    ],
    faq: [
      [
        "Where should the design folder live?",
        "Inside the app repository, at a predictable path. One folder, usually design/, committed with the code. If it lives somewhere else it cannot be diffed in a pull request, and it will be the first thing to fall out of date.",
      ],
      [
        "Does the app need to read the design folder at runtime?",
        "No. The folder is a build-time and review-time artifact. The only things that ship are the generated assets and the token mirrors, which is why the tokens are emitted into Kotlin and Swift rather than parsed at runtime.",
      ],
      [
        "Can I keep using Figma as well?",
        "Yes. Exploration in Figma and a committed design folder are complementary. The folder is what you keep after the exploration ends, and it is the part that can be checked by a machine.",
      ],
      [
        "What if I only need one artifact, like launcher icons?",
        "The generators are small and independent. You can take a single script and its mark definition without adopting the rest, though the tokens are what keep the rest from drifting later.",
      ],
    ],
    related: ["design-tokens", "app-icons", "agent-skills"],
  },

  // -------------------------------------------------------------------
  {
    slug: "app-icons",
    nav: "App icons",
    eyebrow: "Guide",
    h1: "App icons for iOS and Android, from one mark",
    title: "App icon generator for iOS and Android from one mark",
    description:
      "iOS wants an opaque 1024 square. Android wants a 108dp adaptive layer with artwork inside a 66dp safe zone, plus a monochrome layer. Generate both from one mark definition so they cannot drift.",
    answer:
      "An iOS app icon is an opaque 1024 by 1024 full-bleed square with no transparency and no drawn corners. An Android adaptive icon is a 108dp layer whose foreground artwork stays inside roughly a 66dp safe zone, because the launcher masks, shrinks and animates it. The two platforms need genuinely different files, so one mark definition should generate both.",
    blocks: [
      { h2: "The two platforms want different things" },
      {
        table: {
          head: ["", "iOS", "Android"],
          rows: [
            ["Canvas", "1024 x 1024", "108dp foreground plus 108dp background"],
            ["Transparency", "Not allowed, the icon must be opaque", "Expected, the layer is composited"],
            ["Corners", "Never drawn, the system rounds them", "Never drawn, the launcher masks them"],
            ["Safe zone", "Full bleed", "About 66dp of the 108dp layer"],
            ["Extra layers", "None", "A monochrome layer for themed icons"],
            ["Parallax", "None", "The background and foreground move independently"],
          ],
        },
      },
      {
        p: "Because the platforms disagree about all six of those rows, a single exported PNG cannot serve both. That is the entire case for generating them: one mark, two sets of rules, zero hand work.",
      },

      { h2: "Why a naive export breaks on Android" },
      {
        p: "Take a square iOS icon with the artwork edge to edge and drop it into an Android launcher. The launcher crops it to a circle, a squircle or a rounded square depending on the device and the user's theme, applies its own zoom, and animates the two layers against each other. The petals, or the letterform, or the wordmark in the corner, fall off the edge.",
      },
      {
        ul: [
          "The system mask removes roughly the outer 18 percent of the canvas on the most aggressive shapes.",
          "Adaptive icons are scaled up on some launchers, which removes more.",
          "Parallax shifts the foreground against the background, so anything touching the edge visibly slides out.",
          "Themed icons recolour the monochrome layer, so an icon without one stands out as the odd app in the launcher.",
        ],
      },
      {
        p: "A safe rule that holds: keep the meaningful artwork inside a circle about 61 percent of the canvas width, and treat everything outside it as bleed.",
      },

      { h2: "The monochrome layer nobody generates" },
      {
        p: "Since Android 13, a launcher can recolour an app icon to match the user's wallpaper. It does that with the monochrome layer, and it is the layer most icon sets forget. A generated set emits it from the same geometry as the full-colour mark, so the themed icon is not a redrawn silhouette that gradually drifts from the real one.",
      },

      { h2: "How the generation works" },
      {
        steps: {
          name: "How to generate iOS and Android launcher icons from one mark",
          steps: [
            ["Define the mark once", "The mark is a string of paths and a palette, in one script. Every rendition is that string, transformed."],
            ["Emit the vector set", "The same definition writes the default, dark and monochrome SVGs, so the vector sources cannot disagree."],
            ["Emit the iOS set", "Opaque, full-bleed, no alpha, at the sizes App Store Connect wants, including the 1024 master."],
            ["Emit the Android set", "A 108dp adaptive foreground scaled so the artwork sits inside the safe zone, a background layer, and the monochrome drawable."],
            ["Rasterise and check", "Rasters come from one large render and are downsampled, so the 16 pixel version is a filtered reduction rather than its own small drawing."],
            ["Test at the small sizes", "If it dies at 16 pixels it is not a launcher icon. Look at it before you ship it."],
          ],
        },
      },

      { h2: "The mark itself is a decision, not a drawing" },
      {
        p: "The mark, the wordmark and the launcher icon are three separate decisions and they should be made in that order. Generate three to six genuinely different ideas, not one idea at six corner radii: a literal object, an abstract form, a monogram, a negative space cut, a formula built from circles and radii. Show each one at 16, 32, 64, 128 and 1024 pixels, on light and on dark, before you choose.",
      },
      {
        ul: [
          "A formula beats a drawing. If the mark is circles, radii and offsets, a size change is one number.",
          "Show the misuse sheet: stretched, rotated, drop shadowed, recoloured, on a photo, with the clear space ignored.",
          "Keep one wordmark. Family, weight, tracking, casing, and whether it carries a coloured stop.",
          "Name the variants for their job (default, night, mono), not after the brand.",
        ],
      },
    ],
    faq: [
      [
        "Does the iOS icon need every size, or just 1024?",
        "Ship the 1024 master and let Xcode derive the rest where your toolchain supports it. Generate the explicit set too if you target older toolchains or need the assets checked into the repository, which is what the reference in this skill does.",
      ],
      [
        "Should the Android background layer be a colour or an image?",
        "A flat or subtly graded colour is the safe default, because the background layer is masked and parallaxed. If the background carries detail, it will be cropped differently on every device.",
      ],
      [
        "Can I use the same SVG for web and for the launcher?",
        "Yes for the web. On Android you need the adaptive foreground and the monochrome drawable as separate assets, because the system composites them rather than displaying one image.",
      ],
      [
        "How many concepts should I generate before picking a mark?",
        "Three to six, and they should differ in idea rather than in styling. Six variations of one idea teaches you nothing about whether the idea works at 16 pixels.",
      ],
    ],
    related: ["design-tokens", "app-store-screenshots", "design-folder"],
  },

  // -------------------------------------------------------------------
  {
    slug: "app-store-screenshots",
    nav: "Store screenshots",
    eyebrow: "Guide",
    h1: "Store screenshots, generated from one artboard",
    title: "App Store and Play Store screenshot sizes, generated not exported",
    description:
      "Every App Store Connect and Google Play screenshot size, plus the feature graphic, rendered headlessly from one HTML artboard bound to your design tokens. Change a colour, regenerate every listing.",
    answer:
      "App Store Connect and Google Play each require specific screenshot sizes, and the first two carry most of the weight because they are what a browsing user actually sees. Generate them by writing the artboard HTML at the exact required pixel size and screenshotting it headlessly, so a token change updates every listing on the next run.",
    blocks: [
      { h2: "The sizes you actually have to ship" },
      {
        p: "Both stores change these. Treat the table as the contract to verify at build time rather than as permanent truth, and re-check before a submission.",
      },
      { h3: "Apple App Store" },
      {
        table: {
          head: ["Asset", "Size", "Notes"],
          rows: [
            ["iPhone 6.9 inch", "1320 x 2868", "Required"],
            ["iPhone 6.5 inch", "1242 x 2688", "Required if you support older devices"],
            ["iPad 13 inch", "2064 x 2752", "Required if the app runs on iPad"],
            ["App icon", "1024 x 1024", "No alpha"],
            ["App preview video", "886 x 1920 or 1920 x 886", "Optional"],
            ["Screenshot count", "3 to 10", "The first two carry the most weight"],
          ],
        },
      },
      { h3: "Google Play" },
      {
        table: {
          head: ["Asset", "Size", "Notes"],
          rows: [
            ["Phone screenshots", "320 minimum, 3840 maximum, 16:9-ish, under 8 MB", "2 to 8, at least 4 recommended"],
            ["7 inch tablet", "1024 x 600 and up", "If supported"],
            ["10 inch tablet", "1280 x 800 and up", "If supported"],
            ["Feature graphic", "1024 x 500", "Required. Not a screenshot, and no alpha"],
            ["App icon", "512 x 512 PNG32", "Under 1 MB, no shadow"],
            ["Short description", "80 characters maximum", "Truncation is real, test it"],
          ],
        },
      },

      { h2: "Why hand-exported screenshots rot" },
      {
        ul: [
          "They are images, so nothing links them to the screen they came from.",
          "A rename in the app does not rename the screenshot, and nothing fails.",
          "A brand colour change touches the app and leaves the listing on the old palette.",
          "Nobody re-exports ten sizes for a small copy fix, so the listing keeps the old wording.",
          "The device chrome is baked in, so it is wrong the moment a new device ships.",
        ],
      },
      {
        p: "The fix is structural rather than procedural. Do not make the screenshots a task with an owner. Make them an output of the same tokens the app uses, and regenerating them stops being a decision.",
      },

      { h2: "How headless rendering works" },
      {
        steps: {
          name: "How to generate App Store and Play screenshots from one artboard",
          steps: [
            ["Write an artboard per size", "One HTML file per screenshot, at the exact required pixel dimensions, using the same tokens and component CSS as the app mockups."],
            ["Add the platform chrome", "The status bar, the device frame and the safe areas that the app mockups deliberately omit."],
            ["Screenshot it with Chrome", "A headless Chrome window at the target size, one command per artboard, no design tool involved."],
            ["Register the output path", "The render script is generated alongside the artboards, so a new size is one entry rather than a new manual step."],
            ["Re-run on any token change", "Because the artboards read the tokens, the whole listing moves with the product."],
          ],
        },
      },

      { h2: "What goes on the first two screenshots" },
      {
        p: "Most browsing users see the first two screenshots and nothing else, so those two are a pitch rather than a gallery. Give each a short claim in the product's own voice, three to six words, sentence case, one claim each. Then show the screen that proves the claim.",
      },
      {
        ul: [
          "Lead with the promise, not with the login screen.",
          "One claim per screenshot, and the claim has to be visible without tapping.",
          "Keep the crop honest: if the point of the screen is below the fold, pick a different screen.",
          "Use real copy and real numbers. A screenshot full of placeholder names reads as unfinished.",
        ],
      },

      { h2: "The feature graphic is not a screenshot" },
      {
        p: "Google Play requires a 1024 by 500 feature graphic, and it is the one asset people most often fill with a screenshot. It is used as a banner behind the title, so it needs to read at small sizes and on a busy background. Generate it as its own artboard from the same tokens, with no transparency.",
      },
    ],
    faq: [
      [
        "Do I need all the iPad sizes?",
        "Only if the app actually runs on iPad. Shipping iPad screenshots for a phone-only app is a common waste of a submission cycle.",
      ],
      [
        "Can I generate screenshots without a browser?",
        "You can, but headless Chrome is the shortest path that renders real CSS, real web fonts and real layout. Anything else means reimplementing a layout engine.",
      ],
      [
        "Are email or SMS marketing images covered too?",
        "They use the same pipeline. If it renders HTML, you can screenshot it at the exact size and bind it to the same tokens.",
      ],
      [
        "How do I keep screenshots honest?",
        "Take them from the same mockups the storyboard uses, and label any screen that is not shipped yet. The mockup folder carries a Live or Planned label for exactly this reason.",
      ],
    ],
    related: ["app-icons", "design-folder", "design-tokens"],
  },

  // -------------------------------------------------------------------
  {
    slug: "design-tokens",
    nav: "Design tokens",
    eyebrow: "Guide",
    h1: "Design tokens: three layers, one direction",
    title: "Design tokens in one file, with a contrast gate that fails",
    description:
      "Raw palette feeds semantic aliases, and UI code only ever sees the alias. DTCG-shaped tokens with a contrast checker that exits non-zero instead of offering an opinion.",
    answer:
      "Design tokens are named values for colour, type, spacing and motion, stored in a file that both your code and your asset generators read. They hold up when the dependency runs in one direction only: a raw palette feeds semantic aliases, and UI code references the alias, never the hex.",
    blocks: [
      { h2: "Raw palette, semantic alias, UI" },
      {
        code: `raw palette        semantic aliases        UI code
#C93C55      ->    accent           ->    var(--accent)`,
      },
      {
        p: "UI code only ever sees the semantic layer. Raw hex appears in exactly three places: the token file, the platform resources that cannot read the token file at build time, and the asset generators. Anywhere else, a raw hex is a bug waiting to survive a rebrand.",
      },

      { h2: "Why semantic-only matters" },
      {
        ul: [
          "A rebrand changes one palette and every screen follows.",
          "Dark mode becomes a remap of the same keys rather than an inversion of light values.",
          "A reviewer can answer what a colour means without opening a design tool.",
          "New screens cannot invent a fourth grey, because there is no name for it to use.",
        ],
      },
      {
        p: "The distinction that makes this work in practice is role versus hue. Blue does not mean trust; colour meaning is cultural and weak. Colour has a role: brand, wayfinding, status. Status colours stay status colours and are never the brand, and they are never colour-only, because a colour-only status is invisible to a large part of your audience.",
      },

      { h2: "The contrast gate" },
      {
        p: "A contrast checker is the only automated gate most design folders have, which is exactly why it has to be real. It reads the declared pairs from the token file, measures each one in both directions against WCAG 2.2 AA, and exits non-zero when a pair fails.",
      },
      {
        ul: [
          "Pairs are declared in the token file, not inferred from usage, so adding a pair is a deliberate act.",
          "The minimum is never lowered to make a palette pass. Lowering it converts a gate into decoration.",
          "Both directions are tested, because text on a tint and a tint on text are different measurements.",
          "The gate runs before generation, so the failure lands before eleven artifacts are built on a bad palette.",
        ],
      },

      { h2: "Mirroring tokens into Kotlin and Swift" },
      {
        p: "Native platforms cannot read a JSON token file at runtime without shipping a parser and paying for it on every launch. Emit the tokens instead: a Kotlin object and a Swift file, generated from the same source. The mirror is one command and its diff is reviewable, so a token change that forgets to update the code is a failing build rather than a silent divergence.",
      },

      { h2: "What a token file should carry" },
      {
        table: {
          head: ["Layer", "Contains", "Read by"],
          rows: [
            ["Raw palette", "Neutrals, brand, support tints, utility colours for both modes", "Nothing except the semantic layer"],
            ["Semantic aliases", "background, surface, textPrimary, accent, border, error and friends, in light and dark", "UI code and every generator"],
            ["Contrast pairs", "Which text sits on which surface, and the minimum ratio", "The gate, and reviewers"],
            ["Typography", "Families, weights, sizes, line heights, tracking", "Screens, the wordmark, the board"],
            ["Spacing and radius", "One scale each, with the touch target floor", "Screens, landing page, store artboards"],
            ["Motion", "Three durations and one easing family", "Component CSS and the reduced motion path"],
          ],
        },
      },
      {
        p: "Version the file. A token file with no version cannot be reasoned about six months later, and the artifacts generated from it become impossible to attribute.",
      },
    ],
    faq: [
      [
        "What format should design tokens use?",
        "W3C Design Tokens, sometimes called DTCG, is the closest thing to a neutral format, and it already has the concept of a typed value and a description. It is JSON, so every language reads it and every review tool can diff it.",
      ],
      [
        "Are raw hex values ever acceptable in UI code?",
        "Only where the value cannot come from the token file at build time, such as a platform launch screen resource. Everywhere else it should be a semantic name, including in one-off states.",
      ],
      [
        "Should dark mode be a separate token file?",
        "No. It should be the same keys with different values, so a missing key is a visible failure rather than a silently undefined variable.",
      ],
      [
        "How many support tints should a system have?",
        "Four at most. Support tints classify content. Past four, they stop classifying and start decorating, and a fifth tint that means nothing is a fifth tint nobody can explain.",
      ],
    ],
    related: ["design-folder", "app-icons", "figma-alternatives"],
  },

  // -------------------------------------------------------------------
  {
    slug: "agent-skills",
    nav: "Agent skills",
    eyebrow: "Guide",
    h1: "What is an agent skill, and how do you install one?",
    title: "What is an agent skill? Install one in Claude Code, Codex or Cursor",
    description:
      "An agent skill is a folder with a SKILL.md and any scripts it needs. The agent reads the frontmatter to decide relevance, then loads the body on demand. Here is what is inside one and how to install it.",
    answer:
      "An agent skill is a folder containing a SKILL.md file plus whatever scripts and assets the instructions need. A coding agent reads the frontmatter description to decide whether the skill is relevant to the task, and loads the body only when it is. There is no plugin API and no build step: it is markdown the agent can read and scripts it can run.",
    blocks: [
      { h2: "The shape of a skill" },
      {
        code: `design-storyboard/
  SKILL.md              the instructions, with name and description in frontmatter
  references/           longer material, read only when the task needs it
  concepts/             decision files, one per design decision
  assets/               small runnable scripts and templates
  prompt.md             a paste-in version for agents with no skill support`,
      },
      {
        p: "That is the whole format. A skill is a folder of markdown that an agent can choose to read, next to the code that implements anything the markdown says to run.",
      },

      { h2: "The frontmatter is the trigger" },
      {
        code: `---
name: design-storyboard
description: Use when the user wants to design an app, generate a design folder,
  pick tokens, produce launcher icons, or assemble a launch page.
---`,
      },
      {
        p: "The body of SKILL.md is not read until the agent decides the skill applies, so the description is doing the routing work for the entire folder. A vague description means a skill that never fires, or fires on the wrong task and wastes context.",
      },
      {
        ul: [
          "Write the description as a condition: use when the user wants to do X, Y or Z.",
          "Keep the frontmatter to strings. A name and a description are enough.",
          "Put long material in separate files and reference it, so the body stays short enough to actually load.",
          "Include a paste-in prompt for agents that cannot discover skills at all.",
        ],
      },

      { h2: "How to install one across every agent" },
      {
        steps: {
          name: "How to install an agent skill",
          steps: [
            ["Install from the registry", `Run ${INSTALL}. The CLI detects every supported agent on the machine and installs the skill into each one.`],
            ["Or install by hand", "Clone the repository and copy the skill folder into a directory your agent already scans. Claude Code and OpenCode read ~/.claude/skills, and most other agents read ~/.agents/skills."],
            ["Or paste the prompt", "If your agent has no skill system, prompt.md in the repository is a single-file version you can paste into a conversation."],
            ["Restart or reload the agent", "Most agents scan their skill directories at startup, so a freshly installed skill appears after a reload."],
            ["Ask for the job, not for the skill", "Say what you want done. The description in the frontmatter is what makes the agent reach for the skill without being told its name."],
          ],
        },
      },
      {
        table: {
          head: ["Agent", "Project directory", "Global directory"],
          rows: [
            ["Claude Code", ".claude/skills/", "~/.claude/skills/"],
            ["Codex", ".agents/skills/", "~/.agents/skills/"],
            ["Cursor", ".agents/skills/", "~/.cursor/skills/"],
            ["Windsurf", ".windsurf/skills/", "~/.codeium/windsurf/skills/"],
            ["OpenCode", ".agents/skills/", "~/.config/opencode/skills/"],
          ],
        },
      },

      { h2: "Why a skill beats pasting a prompt" },
      {
        ul: [
          "It loads on demand, so it costs context only on the tasks where it applies.",
          "It can carry files: references, templates and scripts that a chat message cannot.",
          "It is versioned in a repository, so the instructions that produced a result are recoverable.",
          "It is shareable without the sender having to remember which parts mattered.",
          "It can tell the agent to run something and paste the output, which turns a suggestion into a verification step.",
        ],
      },
      {
        p: "The last one is the real difference. A prompt can describe a design system. A skill can run the contrast checker and fail.",
      },

      { h2: "Where to find skills" },
      {
        p: "The registry at skills.sh indexes discoverable skills and installs them with one command. A skill becomes listed once someone installs it, and the listing shows the install command, the source repository and an install count. You can also search a directory directly for a SKILL.md, since that file is the only thing that makes a folder a skill.",
      },
    ],
    faq: [
      [
        "Which agents support skills?",
        "Any agent that can read files and run a command. Claude Code, Codex, Cursor, Windsurf and OpenCode all scan a skills directory, and the format is plain markdown, so an agent without a registry can still be pointed at a skill folder.",
      ],
      [
        "Do skills run with more permission than a prompt?",
        "A skill can ask the agent to run scripts, and the agent runs them with whatever permissions it already has. That is why a skill should be read before it is installed, exactly like a dependency.",
      ],
      [
        "Can a skill install another skill?",
        "It can tell the agent to, since the install is just a command. Whether that is a good idea depends on how much you trust the instruction, which is the same question as trusting any package.",
      ],
      [
        "How do I update an installed skill?",
        "If it was installed from the registry, npx skills update refreshes it. If it was copied by hand, re-copy the folder and treat the diff as you would any dependency upgrade.",
      ],
    ],
    related: ["design-folder", "figma-alternatives", "design-tokens"],
  },

  // -------------------------------------------------------------------
  {
    slug: "figma-alternatives",
    nav: "Figma alternatives",
    eyebrow: "Comparison",
    h1: "Figma alternatives for people who ship their own app",
    title: "Figma alternatives for developers who ship their own app",
    description:
      "Figma, Figma Make, prompt-to-UI tools and a generated design folder compared honestly: what each is good at, what it outputs, and which parts drift when the product changes.",
    answer:
      "Figma is for exploring a design with other people. A generated design folder is for the part after that: committed tokens, real CSS, platform assets and a gate that fails CI. They are not competing for the same job, and the honest question is which one you actually need right now.",
    blocks: [
      {
        p: "This is not an argument that a design folder replaces a design tool. It is an argument that most solo developers and small teams were never doing the design-tool part, and the part they were skipping is the part that shows up in a store listing.",
      },

      { h2: "The honest comparison" },
      {
        table: {
          head: ["Approach", "Good at", "Output", "What drifts"],
          rows: [
            ["Figma", "Exploring a design with other people, component libraries, handoff", "A design file, plus exports", "Everything downstream of the file, because the exports are manual"],
            ["Figma Make and similar", "Getting a working prototype out of a prompt quickly", "A prototype or generated UI", "The prototype and the production app agree only by coincidence"],
            ["Prompt-to-UI tools", "Producing a first pass at a screen", "Code for a component or page", "No token layer, so the second screen invents its own spacing"],
            ["Hand-written HTML and CSS", "Total control, no dependency", "Whatever you typed", "Icons, screenshots and the landing page, all of them, eventually"],
            ["A generated design folder", "Keeping tokens, mockups, icons, illustrations and store assets in agreement", "Committed tokens, real CSS, platform assets, a failing gate", "Nothing, as long as you re-run the generators"],
          ],
        },
      },

      { h2: "What Figma is still better at" },
      {
        ul: [
          "Two people exploring the same screen at the same time.",
          "A component library that many product teams share.",
          "The early, uncomfortable stage where you do not know what you are building yet.",
          "Any workflow that ends in a designer handing files to a developer.",
        ],
      },
      {
        p: "None of that is threatened by generating assets from tokens. If you have a designer and a handoff, the design folder is a better handoff target, not a replacement for the exploration.",
      },

      { h2: "What a design folder is better at" },
      {
        ul: [
          "Surviving a rebrand, because the artifacts are outputs rather than exports.",
          "Being reviewed in a pull request, where a diff is possible.",
          "Producing the long tail of assets: every store screenshot size, the adaptive icon, the monochrome layer, the OG card.",
          "Being checked by a machine, which is the only way a design rule survives a deadline.",
        ],
      },

      { h2: "If you have no design at all" },
      {
        p: "This is the case worth being blunt about. If there is no direction, no tokens and no screens, then a design tool with a blank canvas is not going to help, and neither is a prompt that emits a nice-looking login page. What helps is a decision process: pick three directions on the same screens, choose one, write the tokens down, then generate everything from them.",
      },

      { h2: "If you already have a brand" },
      {
        p: "Bring the existing material to the process rather than starting over: the mark, the licensed typefaces, the brand hexes, any component conventions worth keeping. The first phase of a generated design folder is explicitly about inventorying what is reusable before anything new is invented, and a mark you already ship should not be redrawn by a script.",
      },
    ],
    faq: [
      [
        "Can I export from Figma into a design folder?",
        "You can export the parts Figma knows about, which is roughly the palette and the type. The generators, the folder contract, the platform assets and the contrast gate have no Figma equivalent, so the export is a starting point rather than the whole folder.",
      ],
      [
        "Do I need Figma if I am building alone?",
        "Not necessarily. The value Figma adds is collaboration and exploration at speed. Solo, the risk is not that you lack a canvas, it is that you never write down what you decided, which is what a token file and a storyboard are for.",
      ],
      [
        "Is a generated design boring because a machine made it?",
        "Only if the inputs were boring. The process stops twice for decisions, and the interview is the part that carries the product's personality. A generic result means the interview was skipped.",
      ],
      [
        "What about design systems like Material or Apple's guidelines?",
        "They are inputs, not alternatives. A platform design language tells you the conventions to follow, and your token file is where your deviations from it are recorded and justified.",
      ],
    ],
    related: ["design-folder", "agent-skills", "design-tokens"],
  },

  // -------------------------------------------------------------------
  {
    slug: "concepts",
    nav: "Concept packs",
    eyebrow: "Reference",
    h1: "The ten concept packs",
    title: "The ten concept packs behind every generated design folder",
    description:
      "Psychology, type, colour, layout, motion, screens, logo, illustration, voice and the board: the ten decision files that constrain every design folder this skill generates.",
    answer:
      "Every generated design folder is constrained by ten short decision files: psychology, type, colour, layout, motion, screens, logo, illustration, voice and the board. Each one is a constraint list rather than an essay, and each principle has to change a pixel, a word or a state to stay in the file.",
    blocks: [
      {
        p: "The reason for ten files instead of one long brief is that a decision is only enforced where it is written down next to the artifact it governs. Type is decided where the type is set. Colour is decided where the contrast pairs are declared. The board is assembled last, from the real assets, so it cannot describe a design that does not exist.",
      },
      {
        table: {
          head: ["Concept", "Decides", "Writes"],
          rows: [
            ["Psychology", "Which principles are constraints for this product", "The principle lines in DIRECTION.md"],
            ["Type", "Families, scale and the wordmark's face", "tokens.json typography, the mockup type styles"],
            ["Colour", "Structure, accent reservation, dark mode", "tokens.json colour, semantic and contrast pairs"],
            ["Layout", "Spacing, radius, density and composition", "tokens.json spacing and radius, component CSS"],
            ["Motion", "Which of three motion concepts is kept", "tokens.json motion, the reduced motion path"],
            ["Screens", "The structures and every state", "directions.html and app.html"],
            ["Logo", "Mark, wordmark and launcher icon", "app-icons.mjs and the icon variants"],
            ["Illustration", "Whether the direction illustrates at all", "illustrations.mjs and its SVG output"],
            ["Voice", "One vocabulary, and the tone per pack", "The copy in every artifact and the question packs"],
            ["Board", "The one-page review of everything above", "store/design-board.html"],
          ],
        },
      },

      { h2: "Psychology" },
      {
        p: "A constraint list, not a chapter. Each principle earns its place only if it changes a pixel, a word or a state, and whatever fired is written down as a principle followed by the decision it produced. Colour names are explicitly not principles, because colour meaning is cultural and weak; colour gets a role instead.",
      },

      { h2: "Type" },
      {
        p: "Three pairings, then one. Directions differ in voice rather than in size, and sizes come from the moment of use rather than from a default ramp, so a one-handed, night-time, walking context gets a larger body size than a dense desk context. Two families, plus a mono only when the product shows data, code or money.",
      },

      { h2: "Colour" },
      {
        p: "Three structures, then one system: ink-led, field-led or night-led. After the pick, the losing palettes are deleted from the product tokens and recorded in one line, because a second palette that still exists is a second palette someone will use. Dark mode remaps every semantic key rather than inverting the light values.",
      },

      { h2: "Layout" },
      {
        p: "One spacing scale and one radius scale, consumed by the screens rather than reinvented per screen. The composition rules are the ones that change a screen: one focal point, grouping by proximity instead of boxes, the primary action in the thumb zone, safe areas respected, and the landing page and store artboards sharing the same tokens as the app.",
      },

      { h2: "Motion" },
      {
        p: "Still, functional or expressive, and only one of them. Functional motion animates the surface you opened and the control you pressed. Expressive motion is one signature moment, and it is skipped when reduced motion is on, which keeps the state change and drops the travel.",
      },

      { h2: "Screens" },
      {
        p: "Three structures on the same three screens before the pick: the object, the collection, or a single task. After the pick, every screen is grouped by job rather than by component, captioned with the user problem it solves, and labelled Live or Planned. The states are included, so empty, loading, error, offline and long content all exist before anything ships.",
      },

      { h2: "Logo" },
      {
        p: "Three decisions in order: the mark, the wordmark, the launcher icon. Ideas are generated as formulas rather than as drawings, shown at 16, 32, 64, 128 and 1024 pixels on light and dark, plus a misuse sheet. If it dies at 16 pixels it is not a launcher icon, and no amount of polishing the 1024 version changes that.",
      },

      { h2: "Illustration" },
      {
        p: "One canvas, one metaphor, and a deliberately small subset of SVG so that the same file is genuinely one file on both platforms. Paths, fills, round strokes, opacity and group rotation only. No text, no filters, no masks and no multi-stop gradients, because those do not survive the conversion to a platform vector format.",
      },

      { h2: "Voice" },
      {
        p: "Copy is a material in the folder rather than a layer added afterwards. One vocabulary, so the same object has the same name on every screen. Buttons are verbs, empty states say what the place is for, and errors say what happened and what fixes it. No lorem ipsum, and no placeholder people.",
      },

      { h2: "Board" },
      {
        p: "The one-page review, assembled last from the real tokens and the real assets. It is the page a founder forwards when someone asks to see the design, and it is the reason the other nine files have to agree: the board inlines the actual icon the generator wrote and the actual type from the token file.",
      },
    ],
    faq: [
      [
        "How long does each concept file need to be?",
        "Short enough to be read before the work. A concept file that is longer than the artifact it governs will be skipped, and a skipped constraint is not a constraint.",
      ],
      [
        "Can I use the concept packs without the rest of the skill?",
        "Yes. They are markdown files in a concepts directory, and each one stands alone as a decision checklist. The generators are a separate concern.",
      ],
      [
        "Where do these files live in a generated folder?",
        "Inside the skill, under concepts, grouped by the decision they govern, with relative links to the references they depend on.",
      ],
    ],
    related: ["design-folder", "design-tokens", "agent-skills"],
  },
];

// The home page, described once so index.md, llms.txt and the internal
// link graph all describe the same thing.
export const HOME = {
  slug: "",
  nav: "Start",
  title: "design-storyboard: the agent skill for your app's design folder",
  description:
    "An agent skill that interviews you about your app, then generates the whole design/ folder: storyboard, mockups, icons, illustrations and store screenshots.",
  answer:
    "design-storyboard is a free, MIT licensed agent skill for Claude Code, Codex, Cursor, Windsurf and OpenCode. It interviews you about the app, then generates a complete design folder from one tokens file: a screen storyboard, hi-fi mockups, a landing page, a logo, iOS and Android launcher icons, illustrations, content packs and every store screenshot size.",
  builds: [
    ["Storyboard", "Every screen, grouped by job, each captioned with why it exists."],
    ["Hi-fi mockups", "Real CSS and real type in a device frame, not flattened images."],
    ["Directions", "Three type and colour systems on the same screens. You pick one."],
    ["Landing page", "Same tokens, real metadata and an OG card."],
    ["Logo and wordmark", "Mark, wordmark and launcher icon, shown from 16 to 1024 pixels."],
    ["Launcher icons", "An opaque iOS set and a 108dp Android adaptive layer with monochrome."],
    ["Illustrations", "One canvas, one script, both platforms from the same paths."],
    ["Content packs", "Question and prompt decks, with a real tone per pack."],
    ["Store kit", "Every required size, generated and headlessly rendered."],
    ["Platform mirrors", "Kotlin and Swift tokens emitted from the same file."],
  ],
  rules: [
    ["Semantic tokens only", "Screens reference semantic names, never raw hex."],
    ["The gate is a hard stop", "The contrast checker has to exit zero before generation continues."],
    ["Purity by construction", "Every file is an output of a script, so nothing is exported by hand."],
  ],
  faq: [
    ["How do I install it?", `One command: ${INSTALL}. It detects your agents and installs into each one, and npx skills update keeps it current.`],
    ["Is this a Figma replacement?", "No. Figma is where you explore with a team. This is where a design becomes buildable: tokens, real CSS, platform assets and a gate that fails CI."],
    ["Do I need design experience?", "No, but you do need to answer the interview. Skip that and you get a generic design, which is the failure mode the skill exists to avoid."],
    ["Does it work for iOS and Android?", "Yes, natively. Icons and illustrations are emitted for both from one source, and tokens are mirrored into Kotlin and Swift."],
    ["What if I already have a brand?", "Bring it to the interview. The first phase is about inventorying what is reusable before inventing anything, and it will not replace a mark you already ship."],
    ["Why does it insist on a contrast checker?", "Because accessible enough is an opinion until it is a failing build. Every semantic pair is tested in both directions and the minimum is never lowered."],
    ["Where do the screenshots come from?", "Headless Chrome. A generator writes the artboard at the exact required size and screenshots it, so a token change updates every listing."],
    ["Which agents can run it?", "Claude Code, Codex, OpenCode, Cursor and Windsurf. The skill is markdown plus three small scripts, with no plugin API to depend on."],
  ],
};
