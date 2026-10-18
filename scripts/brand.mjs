// =====================================================================
// scripts/brand.mjs — the mark, defined once for the whole repository.
//
//   node scripts/brand.mjs          rewrite every brand file listed below
//   node scripts/brand.mjs --check  fail if any of them is out of date
//
// Nothing here is hand-drawn. favicon.svg, the launcher icons on the
// landing page and every launch artboard are all output of this file, so
// the site, the store kit and the Product Hunt gallery cannot disagree
// about what the logo is.
//
// ---------------------------------------------------------------------
// The mark — "Bloom". Five drawn petals around a rose heart.
//
// Chosen from launch/logo/ (explore.html → refine.html → final.html,
// user verdict: "g4 from refine"):
//
//   - Five petals, 72° apart. Odd counts breathe like a real flower where
//     an even count reads as a mechanical seal.
//   - One petal is not accented; the *heart* is. The rose centre is the
//     one frame that matters in a storyboard — it also survives being
//     reduced to 16px, where a single accented petal (13% of the bloom)
//     dissolves into noise.
//   - Petal is an all-cubic path, pointed at the centre and rounded at
//     the tip. No arcs, so it survives rasterising small and converts to
//     an Android VectorDrawable path with no pre-processing.
//
// Geometry is fixed at viewBox 0 0 100 100 so one string serves a 16px
// favicon, a 1024px launcher icon and a 24px lock-up. The bloom occupies
// the middle 80%, which is the padding a rounded app tile wants.
// =====================================================================

const PETAL = "M0 0 C11 -11.2 12.32 -28 0 -40 C-12.32 -28 -11 -11.2 0 0 Z";
const PETALS = 5;
const TILE_RADIUS = 22.5; // % of the canvas — matches the iOS squircle closely

// tile:  null = draw no tile (the mark sits on a known ground)
// petal: petals
// heart: the five-petal centre
export const MARK_VARIANTS = {
  // The shipped reading, on ink. This is the app icon.
  ink:   { tile: "#151312", petal: "#FAF9F7", heart: "#C93C55" },
  // Deep rose ground, for a launch cover or a tinted banner.
  deep:  { tile: "#7C2236", petal: "#FAF9F7", heart: "#E9798B" },
  // Ink ground, warmer petals, blush heart. The "night" rendition.
  night: { tile: "#151312", petal: "#F2EEEB", heart: "#E9798B" },
  // Rose ground. Loudest of the tiles; for a single accent surface.
  rose:  { tile: "#C93C55", petal: "#FFFFFF", heart: "#FFE3E8" },
  // No tile: ink petals + rose heart, for paper and for the nav lock-up.
  light: { tile: null,      petal: "#151312", heart: "#C93C55" },
  // No tile, one colour. Android <monochrome> must be a single-colour
  // silhouette or themed icons silently produce a blank icon.
  mono:  { tile: null,      petal: "#000000", heart: "#000000" },
  // No tile, reversed. For use on ink where the tile would be redundant.
  white: { tile: null,      petal: "#FAF9F7", heart: "#FAF9F7" },
  // Flat porcelain tile, single ink colour. The "mono" rendition shown
  // on the landing page's icon row.
  porcelain: { tile: "#FAF6F3", petal: "#151312", heart: "#151312" },
};

/**
 * The mark as an SVG string.
 *
 * @param {keyof typeof MARK_VARIANTS} variant
 * @param {{size?: number, title?: string, scale?: number}} [opts]
 *   size  – adds width/height (px). Omit for a scalable inline SVG.
 *   title – aria-label. Omit to mark the SVG decorative (aria-hidden).
 *   scale – shrink the bloom inside the box, for Android adaptive
 *           foregrounds where content must stay inside the centre 66%.
 */
export function markSVG(variant = "ink", opts = {}) {
  const V = MARK_VARIANTS[variant] || MARK_VARIANTS.ink;
  const { size, title, scale = 1 } = opts;

  const dims = size ? ` width="${size}" height="${size}"` : "";
  const a11y = title
    ? ` role="img" aria-label="${title}"`
    : ` aria-hidden="true" focusable="false"`;

  const tile = V.tile
    ? `<rect width="100" height="100" rx="${TILE_RADIUS}" fill="${V.tile}"/>`
    : "";

  const petals = Array.from({ length: PETALS })
    .map((_, i) => `<path d="${PETAL}" fill="${V.petal}" transform="rotate(${(i * 360) / PETALS})"/>`)
    .join("");

  // The heart is a plain circle: it needs no scaling with the bloom, but
  // it must stay proportional, so it is expressed in the same units.
  const bloom = `<g transform="translate(50 50) scale(${scale})">${petals}<circle r="9" fill="${V.heart}"/></g>`;

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"${dims}${a11y}>${tile}${bloom}</svg>`;
}

/** The lock-up: mark + wordmark. Used by nav, footer and og.html. */
export function lockup({ variant = "light", size = 22, weight = 600, fontSize = 15 } = {}) {
  return `<span class="lockup" style="display:inline-flex;align-items:center;gap:.5em">` +
    `<span style="display:block;width:${size}px;height:${size}px;flex:none">${markSVG(variant)}</span>` +
    `<span style="font-weight:${weight};font-size:${fontSize}px;letter-spacing:-.03em;white-space:nowrap">` +
    `design<span style="color:#C93C55">–</span>storyboard</span></span>`;
}

// ---------------------------------------------------------------------
// Files this module owns. `node scripts/brand.mjs` keeps them in sync.
// ---------------------------------------------------------------------
export const BRAND_FILES = [
  { path: "favicon.svg",                    variant: "ink",         size: 1024, tile: true },
  { path: "assets/generated/icons/default.svg", variant: "ink",    size: 1024 },
  { path: "assets/generated/icons/deep.svg",    variant: "deep",   size: 1024 },
  { path: "assets/generated/icons/night.svg",   variant: "night",  size: 1024 },
  { path: "assets/generated/icons/mono.svg",    variant: "porcelain", size: 1024 },
  { path: "launch/mark.svg",                variant: "light",       size: 512 },
];

export function renderBrandFiles() {
  return BRAND_FILES.map((f) => ({
    path: f.path,
    text: markSVG(f.variant, { size: f.size, title: "design-storyboard" }) + "\n",
  }));
}

// ---------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------
const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
if (isMain) {
  const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const { dirname, resolve } = await import("node:path");
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const check = process.argv.includes("--check");

  let stale = 0;
  for (const f of renderBrandFiles()) {
    const abs = resolve(root, f.path);
    const before = existsSync(abs) ? readFileSync(abs, "utf8") : null;
    if (before === f.text) {
      console.log(`  ok    ${f.path}`);
      continue;
    }
    if (check) {
      console.log(`  STALE ${f.path}`);
      stale++;
    } else {
      writeFileSync(abs, f.text);
      console.log(`  wrote ${f.path}`);
    }
  }

  if (check) {
    console.log(stale ? `\n${stale} brand file(s) out of date. Run: node scripts/brand.mjs` : "\nbrand files in sync.");
    process.exit(stale ? 1 : 0);
  }
  console.log("\nbrand files written.");
}
