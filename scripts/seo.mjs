#!/usr/bin/env node
// =====================================================================
// scripts/seo.mjs - every machine-readable file the site serves, plus
// the guide pages, from one page list.
//
//   node scripts/seo.mjs           write them
//   node scripts/seo.mjs --check   exit 1 if any of them drifted
//
// One list of pages (scripts/seo-pages.mjs) drives all of it:
//
//   sitemap.xml        the same URLs, nothing else
//   robots.txt         crawl rules, including the AI crawlers
//   llms.txt           a short map for language models
//   llms-full.txt      the whole skill text, in one file
//   index.md           the landing page as markdown, for agents
//   pricing.md         structured pricing, so an agent can compare
//   <slug>/index.html  the guide pages
//
// The guide pages do not carry their own palette. The :root block is
// read out of index.html at build time, so a guide cannot show a colour
// the landing page does not have. Same promise as everything else in
// this repository: if it can drift, it will, unless a script owns it.
// =====================================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  PAGES, HOME, SITE, REPO, REGISTRY, INSTALL, AUTHOR, PUBLISHED, UPDATED,
} from "./seo-pages.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");

// ---------------------------------------------------------------------
// Output. Every generator goes through emit(), so --check is one
// comparison rather than seven special cases.
// ---------------------------------------------------------------------

const drifted = [];
const written = [];

function emit(relPath, content) {
  const abs = join(ROOT, relPath);
  if (CHECK) {
    const current = existsSync(abs) ? readFileSync(abs, "utf8") : null;
    if (current !== content) drifted.push(relPath);
    return;
  }
  mkdirSync(dirname(abs), { recursive: true });
  const current = existsSync(abs) ? readFileSync(abs, "utf8") : null;
  if (current === content) return;
  writeFileSync(abs, content);
  written.push(relPath);
}

// ---------------------------------------------------------------------
// The landing page is the token source. Read it, never copy it.
// ---------------------------------------------------------------------

const indexHtml = readFileSync(join(ROOT, "index.html"), "utf8");

function tokenBlock(html) {
  const start = html.indexOf(":root{");
  if (start < 0) throw new Error("seo: index.html has no :root block");
  let depth = 0;
  for (let i = start + ":root{".length - 1; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error("seo: unterminated :root block in index.html");
}

function fontLinks(html) {
  return [...html.matchAll(/<link[^>]*(?:fonts\.googleapis|fonts\.gstatic)[^>]*>/g)]
    .map((m) => m[0])
    .join("\n");
}

const TOKENS = tokenBlock(indexHtml);
const FONTS = fontLinks(indexHtml);
const ICON_SVG = '<img src="/favicon.svg" alt="" width="22" height="22">';
const WORDMARK = `<a class="wordmark" href="/">${ICON_SVG}design<span>&#8211;</span>storyboard</a>`;

// ---------------------------------------------------------------------
// Page chrome. Small on purpose: the guides are read, not browsed.
// ---------------------------------------------------------------------

function styles() {
  return `${TOKENS}

  *{box-sizing:border-box}
  body{
    margin:0;background:var(--paper);color:var(--ink);
    font-family:var(--ui);font-size:16.5px;line-height:1.65;
    -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
  }
  img,svg{display:block;max-width:100%}
  a{color:inherit;text-decoration:none}
  h1,h2,h3{font-family:var(--serif);font-weight:400;letter-spacing:-.02em}
  h1{font-size:clamp(31px,4.4vw,50px);line-height:1.06;margin:0 0 20px}
  h2{font-size:clamp(22px,2.6vw,30px);line-height:1.16;margin:52px 0 14px}
  h3{font-size:19px;line-height:1.3;margin:34px 0 10px}
  p{margin:0 0 18px;color:var(--ink2)}
  strong,b{color:var(--ink);font-weight:500}
  :focus-visible{outline:2px solid var(--rose);outline-offset:3px;border-radius:4px}

  .wrap{max-width:var(--max);margin:0 auto;padding:0 var(--gutter)}
  .skip{position:absolute;left:-9999px;top:0;background:var(--ink);color:var(--paper);padding:10px 16px;font-size:13px;z-index:100}
  .skip:focus{left:0}

  .nav{
    position:sticky;top:0;z-index:50;
    background:rgba(250,249,247,.9);backdrop-filter:blur(18px) saturate(1.3);
    border-bottom:1px solid var(--line);
  }
  .nav .wrap{display:flex;align-items:center;gap:26px;height:64px;justify-content:space-between}
  .wordmark{display:inline-flex;align-items:center;gap:9px;font-size:15px;letter-spacing:-.015em;white-space:nowrap}
  .wordmark img{display:block;width:22px;height:22px;flex:none}
  .wordmark span{color:var(--rose);padding:0 1px}
  .nav nav{display:flex;gap:18px;flex-wrap:wrap;font-size:13.5px;color:var(--ink3)}
  .nav nav a:hover{color:var(--ink)}
  .nav nav a[aria-current]{color:var(--ink)}
  @media (max-width:780px){ .nav nav{display:none} }

  main{padding:52px 0 10px}
  .crumbs{font-size:12.5px;color:var(--ink3);margin-bottom:22px}
  .crumbs a:hover{color:var(--ink)}
  .crumbs span{padding:0 7px;opacity:.55}
  .eyebrow{display:flex;align-items:center;gap:9px;font-size:12.5px;font-weight:600;color:var(--ink3);margin-bottom:16px;text-transform:uppercase;letter-spacing:.04em}
  .eyebrow::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--rose);flex:none}
  .lede{font-size:clamp(17px,1.5vw,19px);color:var(--ink2);max-width:62ch}

  .answer{
    background:var(--white);border-radius:var(--r-lg);padding:24px 26px;
    box-shadow:0 1px 2px rgba(21,19,18,.04), 0 10px 26px -24px rgba(21,19,18,.30);
    margin:30px 0 8px;max-width:74ch;
  }
  .answer b{display:block;font-family:var(--ui);font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:10px}
  .answer p{margin:0;color:var(--ink);font-size:17px;line-height:1.6}

  article{max-width:74ch}
  article ul,article ol{margin:0 0 20px;padding-left:22px;color:var(--ink2)}
  article li{margin-bottom:9px}
  article li::marker{color:var(--rose)}

  .scroller{overflow-x:auto;margin:0 0 24px;border-radius:var(--r-md);background:var(--white);box-shadow:0 1px 2px rgba(21,19,18,.04)}
  table{border-collapse:collapse;width:100%;font-size:14px;min-width:520px}
  th,td{text-align:left;padding:12px 16px;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ink3);background:var(--soft)}
  tr:last-child td{border-bottom:0}
  td{color:var(--ink2)}
  td:first-child{color:var(--ink);font-weight:500}

  pre{
    background:var(--ink);color:#EDE7E3;border-radius:var(--r-sm);
    padding:18px 20px;overflow-x:auto;font-family:var(--mono);font-size:12.5px;line-height:1.75;
    margin:0 0 24px;
  }
  code{font-family:var(--mono);font-size:.9em;background:var(--soft);padding:1px 5px;border-radius:5px}
  pre code{background:none;padding:0;font-size:inherit}

  .steps{margin:0 0 26px;padding:0;list-style:none;counter-reset:s}
  .steps li{counter-increment:s;position:relative;padding:0 0 20px 46px;color:var(--ink2)}
  .steps li::before{
    content:counter(s,decimal-leading-zero);position:absolute;left:0;top:1px;
    font-family:var(--mono);font-size:11.5px;color:var(--ink3);
    border:1px solid var(--line);border-radius:999px;padding:3px 8px;background:var(--white);
  }
  .steps b{display:block;color:var(--ink);font-weight:500;margin-bottom:2px}

  details{border-bottom:1px solid var(--line);padding:15px 0}
  details summary{cursor:pointer;font-size:15.5px;color:var(--ink);list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:baseline}
  details summary::-webkit-details-marker{display:none}
  details summary::after{content:"+";color:var(--rose);font-size:17px;line-height:1}
  details[open] summary::after{content:"\\2212"}
  details p{margin:12px 0 0;font-size:14.5px}

  .cta{
    margin:54px 0 0;padding:30px 28px;border-radius:var(--r-lg);
    background:var(--blush);box-shadow:inset 0 0 0 1px rgba(201,60,85,.14);
  }
  .cta h2{margin:0 0 8px;font-size:clamp(21px,2.4vw,27px)}
  .cta p{margin:0 0 18px;max-width:56ch}
  .cmd{position:relative;background:var(--ink);color:#EDE7E3;border-radius:var(--r-sm);padding:14px 16px;font-family:var(--mono);font-size:12.5px;overflow-x:auto;white-space:pre}
  .cta .link{display:inline-block;margin-top:16px;font-size:13.5px;color:var(--rose-deep);font-weight:500}
  .cta .link:hover{color:var(--ink)}

  .related{margin:44px 0 0;padding-top:26px;border-top:1px solid var(--line)}
  .related b{display:block;font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ink3);margin-bottom:14px}
  .related ul{list-style:none;padding:0;margin:0;display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
  .related a{display:block;background:var(--white);border-radius:var(--r-md);padding:15px 17px;box-shadow:0 1px 2px rgba(21,19,18,.04)}
  .related a:hover{box-shadow:inset 0 0 0 1px var(--line)}
  .related span{display:block;font-size:13px;color:var(--ink3);margin-top:3px}

  footer{margin-top:70px;border-top:1px solid var(--line);padding:44px 0 60px;font-size:13.5px}
  .foot{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap}
  .foot-col{display:flex;flex-direction:column;gap:9px;min-width:150px}
  .foot-col b{font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ink3);margin-bottom:3px}
  .foot-col a{color:var(--ink2)}
  .foot-col a:hover{color:var(--ink)}
  .foot-note{color:var(--ink3);max-width:34ch;margin-top:14px;font-size:12.5px;line-height:1.6}

  @media (prefers-reduced-motion: reduce){ *{transition:none!important;animation:none!important} }`;
}

function header(currentSlug) {
  const links = PAGES.map((p) =>
    `<a href="/${p.slug}/"${p.slug === currentSlug ? ' aria-current="page"' : ""}>${p.nav}</a>`
  ).join("\n      ");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav">
  <div class="wrap">
    ${WORDMARK}
    <nav aria-label="Guides">
      ${links}
    </nav>
  </div>
</header>`;
}

function footer() {
  const guides = PAGES.map((p) => `<a href="/${p.slug}/">${p.nav}</a>`).join("\n          ");
  return `<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        ${WORDMARK}
        <p class="foot-note">An agent skill for people who ship apps. Free and MIT licensed. Last updated ${UPDATED}.</p>
      </div>
      <div class="foot-col">
        <b>Guides</b>
        ${guides}
      </div>
      <div class="foot-col">
        <b>Repo</b>
        <a href="${REPO}">GitHub</a>
        <a href="${REGISTRY}">skills.sh</a>
        <a href="/pricing.md">pricing.md</a>
        <a href="/llms.txt">llms.txt</a>
      </div>
      <div class="foot-col">
        <b>More</b>
        <a href="/">Home</a>
        <a href="/#faq">FAQ</a>
        <a href="${REPO}/blob/main/LICENSE">MIT license</a>
      </div>
    </div>
  </div>
</footer>`;
}

// ---------------------------------------------------------------------
// Block renderer. Small DSL, so the content file stays readable.
// ---------------------------------------------------------------------

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function tableHtml(t) {
  const head = `<tr>${t.head.map((h) => `<th>${h}</th>`).join("")}</tr>`;
  const rows = t.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("\n        ");
  return `<div class="scroller">
      <table>
        <thead>${head}</thead>
        <tbody>
        ${rows}
        </tbody>
      </table>
    </div>`;
}

function stepsHtml(s) {
  const items = s.steps
    .map(([name, text]) => `<li><b>${name}</b>${text}</li>`)
    .join("\n      ");
  return `<ol class="steps">
      ${items}
    </ol>`;
}

function renderBlocks(blocks, slug) {
  return blocks
    .map((b) => {
      if (b.h2) return `<h2>${b.h2}</h2>`;
      if (b.h3) return `<h3>${b.h3}</h3>`;
      if (b.p) return `<p>${b.p}</p>`;
      if (b.ul) return `<ul>\n${b.ul.map((i) => `      <li>${i}</li>`).join("\n")}\n    </ul>`;
      if (b.ol) return `<ol>\n${b.ol.map((i) => `      <li>${i}</li>`).join("\n")}\n    </ol>`;
      if (b.table) return tableHtml(b.table);
      if (b.steps) return stepsHtml(b.steps);
      if (b.code) return `<pre><code>${esc(b.code)}</code></pre>`;
      throw new Error(`seo: unknown block in ${slug}: ${JSON.stringify(b).slice(0, 60)}`);
    })
    .join("\n\n    ");
}

function faqHtml(faq) {
  return faq
    .map(
      ([q, a]) => `<details>
        <summary>${q}</summary>
        <p>${a}</p>
      </details>`
    )
    .join("\n      ");
}

// ---------------------------------------------------------------------
// Per-page JSON-LD. Breadcrumbs, an Article, and a FAQPage when the page
// has questions. All three come from the same objects the page renders
// from, so the markup cannot describe a page that does not exist.
// ---------------------------------------------------------------------

function pageSchema(page) {
  const url = `${SITE}/${page.slug}/`;
  const graph = [
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: page.nav, item: url },
      ],
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: page.h1,
      name: page.title,
      description: page.description,
      url,
      mainEntityOfPage: url,
      inLanguage: "en",
      datePublished: PUBLISHED,
      dateModified: UPDATED,
      author: { "@id": `${SITE}/#author` },
      publisher: { "@id": `${SITE}/#author` },
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#software` },
      overview: page.answer,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumbs` },
      primaryImageOfPage: { "@id": `${url}#image` },
    },
    {
      "@type": "ImageObject",
      "@id": `${url}#image`,
      url: `${SITE}/og.png`,
      width: 1200,
      height: 628,
      caption: page.title,
    },
  ];
  if (page.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }
  if (page.blocks.some((b) => b.steps)) {
    const s = page.blocks.find((b) => b.steps).steps;
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: s.name,
      step: s.steps.map(([name, text], i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name,
        text,
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------------------------------------------------------------------
// The guide page.
// ---------------------------------------------------------------------

function renderPage(page) {
  const url = `${SITE}/${page.slug}/`;
  const related = page.related
    .map((slug) => PAGES.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => `<li><a href="/${p.slug}/">${p.h1}<span>${p.eyebrow}</span></a></li>`)
    .join("\n        ");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${page.title} | design-storyboard</title>
<meta name="description" content="${page.description}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="${AUTHOR}">
<link rel="canonical" href="${url}">
<link rel="alternate" type="text/markdown" href="/llms-full.txt" title="the whole skill as markdown">
<meta property="og:type" content="article">
<meta property="og:site_name" content="design-storyboard">
<meta property="og:locale" content="en">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="628">
<meta property="og:image:alt" content="design-storyboard: interview in, a whole design folder out.">
<meta property="og:article:published_time" content="${PUBLISHED}">
<meta property="og:article:modified_time" content="${UPDATED}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.title}">
<meta name="twitter:description" content="${page.description}">
<meta name="twitter:image" content="${SITE}/og.png">
<meta name="theme-color" content="#FAF9F7">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/generated/logo/design-storyboard-ink-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/generated/logo/design-storyboard-ink-180.png">
<link rel="manifest" href="/site.webmanifest">
${FONTS}

<style>
${styles()}
</style>

<script type="application/ld+json">
${JSON.stringify(pageSchema(page), null, 2)}
</script>
</head>
<body>
${header(page.slug)}

<main id="main">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">design-storyboard</a><span>/</span><a href="/${page.slug}/">${page.nav}</a>
    </nav>

    <article>
      <p class="eyebrow">${page.eyebrow}</p>
      <h1>${page.h1}</h1>
      <p class="lede">${page.description}</p>

      <div class="answer">
        <b>Short answer</b>
        <p>${page.answer}</p>
      </div>

      ${renderBlocks(page.blocks, page.slug)}

      ${
        page.faq?.length
          ? `<h2>Questions</h2>\n      <div>\n      ${faqHtml(page.faq)}\n      </div>`
          : ""
      }

      <div class="cta">
        <h2>Generate one for your app</h2>
        <p>Free and MIT licensed. The skill interviews you, then writes the folder. It needs Node and Chrome and nothing else.</p>
        <div class="cmd">${INSTALL}</div>
        <a class="link" href="${REGISTRY}">See the listing on skills.sh</a>
      </div>

      <div class="related">
        <b>Read next</b>
        <ul>
        ${related}
        </ul>
      </div>
    </article>
  </div>
</main>

${footer()}
</body>
</html>
`;
}

// ---------------------------------------------------------------------
// Machine-readable files. All derived from PAGES.
// ---------------------------------------------------------------------

const urls = [SITE + "/", ...PAGES.map((p) => `${SITE}/${p.slug}/`)];

function sitemap() {
  const body = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${UPDATED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u === SITE + "/" ? "1.0" : "0.8"}</priority>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// AI crawlers are allowed on purpose. Blocking them stops the skill from
// being cited at all, and being cited is the point of a public skill.
const AI_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot", "Applebot-Extended",
  "Bingbot", "DuckDuckBot", "CCBot", "meta-externalagent", "cohere-ai",
];

function robots() {
  const ai = AI_AGENTS.map((a) => `User-agent: ${a}\nAllow: /`).join("\n\n");
  return `# ${SITE}
# Everything here is public and MIT licensed. Crawl all of it.

User-agent: *
Allow: /

# Answer engines and assistants, allowed explicitly so a citation is
# possible. Nothing on this site is paywalled or gated.
${ai}

Sitemap: ${SITE}/sitemap.xml
`;
}

function llmsTxt() {
  const pages = PAGES.map((p) => `- [${p.h1}](${SITE}/${p.slug}/): ${p.answer.split(". ")[0]}.`).join("\n");
  return `# design-storyboard

> ${HOME.answer}

design-storyboard is an agent skill. Install it with \`${INSTALL}\`, which
writes the skill into every supported agent it finds on the machine. It is
free, MIT licensed, and has no runtime dependency: the generated design
folder renders offline with file://.

The skill is interview-first. It asks about the promise, the user, the
moment of use and what the product must never do, and it stops twice for a
human decision: once to pick one of three type-and-colour directions, and
once to approve the tokens after the contrast gate passes.

## What it generates

${HOME.builds.map(([name, desc]) => `- ${name}: ${desc}`).join("\n")}

## The three rules it will not break

${HOME.rules.map(([name, desc]) => `- ${name}: ${desc}`).join("\n")}

## Guides

${pages}

## Key files

- [Install the skill](${SITE}/agent-skills/): what an agent skill is, and how to install one
- [pricing.md](${SITE}/pricing.md): it is free, stated in plain text for agents
- [llms-full.txt](${SITE}/llms-full.txt): the complete skill text, every reference and concept file
- [index.md](${SITE}/index.md): the landing page as markdown
- [Source](${REPO}): the skill, the generators and the launch page
- [Registry listing](${REGISTRY}): install command and install count

## Optional

- [Naming research](${REPO}/blob/main/docs/NAMING_RESEARCH.md): what the installed-skill ecosystem names things
- [MIT license](${REPO}/blob/main/LICENSE)
`;
}

function pricingMd() {
  return `# Pricing - design-storyboard

design-storyboard is free software. There is no paid tier, no seat
counting, no trial and no account.

## Free

- Price: $0, one time, forever. No subscription.
- License: MIT. Use it commercially, fork it, ship it inside a client project.
- Includes: the whole skill. All ten concept packs, every generator, all
  reference material, the landing page generator and the store kit generator.
- Limits: none. No telemetry on the generated folder, no feature gate, no
  usage cap.
- Requirements: Node.js and Google Chrome, both already free. Nothing else
  is installed into your project.
- Support: issues and pull requests on GitHub. No paid support tier exists.

## What is not offered

- No hosted version. The skill runs on your machine, in your repository.
- No design service, no done-for-you branding, no custom asset commissions.
- No enterprise contract, no SSO, no invoicing.

## Installing

\`\`\`bash
${INSTALL}
\`\`\`

Source: ${REPO}
Registry: ${REGISTRY}
`;
}

function indexMd() {
  return `# design-storyboard

> ${HOME.answer}

${HOME.description}

- Install: \`${INSTALL}\`
- Registry: ${REGISTRY}
- Source: ${REPO}
- License: MIT
- More detail: [llms.txt](${SITE}/llms.txt), [llms-full.txt](${SITE}/llms-full.txt)

## What it builds

${HOME.builds.map(([name, desc]) => `- **${name}**: ${desc}`).join("\n")}

## The three rules it will not break

${HOME.rules.map(([name, desc]) => `- **${name}**: ${desc}`).join("\n")}

## The workflow

Eleven phases, two of them stops.

${[
  "Interview",
  "Orient",
  "Three directions (stop)",
  "Tokens and the contrast gate (stop)",
  "Storyboard",
  "Logo and icons",
  "Illustrations",
  "Content packs",
  "Landing page",
  "Store kit",
  "Mirror to Kotlin and Swift",
  "Verify",
].map((s, i) => `${String(i).padStart(2, "0")} ${s}`).join("\n")}

## Guides

${PAGES.map((p) => `### ${p.h1}\n\n${p.answer}\n\n${SITE}/${p.slug}/`).join("\n\n")}

## Questions

${HOME.faq.map(([q, a]) => `**${q}**\n\n${a}`).join("\n\n")}
`;
}

// ---------------------------------------------------------------------
// llms-full.txt: the entire skill as one file. Agents that cannot clone
// a repository should still be able to read the instructions.
// ---------------------------------------------------------------------

function readSkill() {
  const skillDir = join(ROOT, "skills/design-storyboard");
  const files = [];
  const walk = (dir) => {
    const entries = readdirSync(dir).sort();
    for (const name of entries) {
      const abs = join(dir, name);
      const rel = abs.slice(ROOT.length + 1);
      if (statSync(abs).isDirectory()) walk(abs);
      else if (name.endsWith(".md")) files.push(rel);
    }
  };
  walk(skillDir);

  // SKILL.md first, then references, then concepts. Everything else keeps
  // alphabetical order inside its group.
  const rank = (rel) =>
    rel.endsWith("SKILL.md") && !rel.includes("/concepts/") && !rel.includes("/references/") ? 0
      : rel.includes("/references/") ? 1
        : 2;
  files.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  const parts = files.map((rel) => {
    const text = readFileSync(join(ROOT, rel), "utf8").trim();
    return `<!-- file: ${rel} -->\n\n${text}`;
  });
  return { files, text: parts.join("\n\n---\n\n") };
}

function llmsFull() {
  const { files, text } = readSkill();
  return `# design-storyboard, complete

> ${HOME.answer}

This file is the whole skill: SKILL.md, every reference, and all ten
concept packs, concatenated in reading order so an agent that cannot clone
the repository can still follow it. Install with \`${INSTALL}\`.

Files included, in order:

${files.map((f, i) => `${i + 1}. ${f}`).join("\n")}

---

${text}
`;
}

// ---------------------------------------------------------------------
// Internal linking gate. A page nobody links to is a page nobody finds,
// and the landing page footer is the only thing linking the cluster.
// ---------------------------------------------------------------------

function checkHomeLinks() {
  const missing = PAGES.filter((p) => !indexHtml.includes(`/${p.slug}/`));
  if (missing.length) {
    console.error(
      `seo: index.html does not link to: ${missing.map((p) => p.slug).join(", ")}\n` +
      `     add them to the footer so the cluster is reachable from the home page.`
    );
    process.exitCode = 1;
  }
}

// ---------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------

function main() {
  for (const page of PAGES) {
    emit(join(page.slug, "index.html"), renderPage(page));
  }
  emit("sitemap.xml", sitemap());
  emit("robots.txt", robots());
  emit("llms.txt", llmsTxt());
  emit("llms-full.txt", llmsFull());
  emit("pricing.md", pricingMd());
  emit("index.md", indexMd());

  checkHomeLinks();

  if (CHECK) {
    if (drifted.length) {
      console.error(`\nseo: ${drifted.length} file(s) out of date. Run: node scripts/seo.mjs`);
      for (const f of drifted) console.error(`  stale  ${f}`);
      process.exitCode = 1;
    } else {
      console.log(`ok    ${PAGES.length} pages, sitemap, robots, llms.txt, llms-full.txt, pricing.md, index.md`);
    }
    return;
  }

  console.log(
    written.length
      ? `\n${written.length} file(s) written:\n${written.map((f) => `  ${f}`).join("\n")}`
      : `\nseo: nothing changed (${PAGES.length} pages, sitemap, robots, llms, pricing, index.md)`
  );
}

main();
