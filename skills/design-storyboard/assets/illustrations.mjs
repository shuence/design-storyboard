#!/usr/bin/env node
// Single source for spot illustrations (empty states, onboarding, celebration).
// Emits:
//   design/illustrations/<name>.svg                                        (review / design handoff)
//   <iosAssets>/Illustrations/<name>.imageset/                             (vector-preserving SVG)
//   <androidRes>/drawable/<name>.xml                                       (VectorDrawable)
//
// Only features BOTH formats support are used: paths, fills, round strokes, opacity,
// group rotation. No <text>, no CSS, no filters, no masks, no multi-stop gradients.
//
// Run: node design/illustrations.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ============================================================================
// CONFIG
// ============================================================================

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const APP = {
  iosAssets: "ios/AppName/Resources/Assets.xcassets",
  androidRes: "android/app/src/main/res",
};

// One canvas for the whole set. A set with per-file canvases cannot be laid out in a row.
const W = 240;
const H = 200;

// Illustration palette. Keep every value traceable to design/tokens.json.
// (Swap these for "@color/..." resources if you want the theme to drive illustrations too.)
const C = {
  ink: "#3F302B",
  accent: "#F47F91",
  accentDeep: "#C83F58",
  petal: "#FCE8E5",
  butter: "#F6E4BD",
  sage: "#DCE8D7",
  leaf: "#B8D0AE",
  sky: "#E1EBF5",
  lilac: "#E9DFF4",
  white: "#FFFFFF",
  line: "#CDBFB6",
};

// ============================================================================
// Geometry helpers: every shape is a function returning path data.
// ============================================================================

const n = (v) => +v.toFixed(2);

const circle = (cx, cy, r) =>
  `M${n(cx - r)},${n(cy)} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0 Z`;

const ellipse = (cx, cy, rx, ry) =>
  `M${n(cx - rx)},${n(cy)} a${rx},${ry} 0 1,0 ${2 * rx},0 a${rx},${ry} 0 1,0 ${-2 * rx},0 Z`;

const rrect = (x, y, w, h, r) =>
  `M${n(x + r)},${n(y)} H${n(x + w - r)} A${r},${r} 0 0 1 ${n(x + w)},${n(y + r)} V${n(y + h - r)} ` +
  `A${r},${r} 0 0 1 ${n(x + w - r)},${n(y + h)} H${n(x + r)} A${r},${r} 0 0 1 ${n(x)},${n(y + h - r)} ` +
  `V${n(y + r)} A${r},${r} 0 0 1 ${n(x + r)},${n(y)} Z`;

// Trapezoid: useful for buckets, lampshades, jars.
const trapezoid = (x, y, topW, botW, h) => {
  const tl = x, tr = x + topW, bl = x - (botW - topW) / 2, br = bl + botW;
  return `M${n(tl)},${n(y)} L${n(tr)},${n(y)} L${n(br)},${n(y + h)} L${n(bl)},${n(y + h)} Z`;
};

const triangle = (x1, y1, x2, y2, x3, y3) => `M${n(x1)},${n(y1)} L${n(x2)},${n(y2)} L${n(x3)},${n(y3)} Z`;

// ============================================================================
// Shape DSL
//   { d, fill, opacity? }                       filled path
//   { d, stroke, width?, cap?, opacity? }       stroked path (fill defaults to none)
//   { g: [shapes], rotate?: {deg, cx, cy} }     group
// ============================================================================

const fill = (d, c, opacity) => ({ d, fill: c, ...(opacity != null ? { opacity } : {}) });
const stroke = (d, c, width = 2.5, opacity) => ({
  d, stroke: c, width, ...(opacity != null ? { opacity } : {}),
});

// ---- worked examples: replace these with the moments your storyboard needs ----

// A jar: two facing figures, warm ground. ("Paired / connected".)
const illustration_paired = () => [
  fill(circle(120, 108, 66), C.petal),
  fill(circle(92, 100, 30), C.accent),
  fill(circle(150, 100, 30), C.accentDeep, 0.85),
  fill(rrect(74, 140, 92, 10, 5), C.ink),
];

// A bucket with a note going in. ("Add your first X".)
const illustration_bucket = () => [
  fill(circle(120, 112, 70), C.butter),
  fill(trapezoid(86, 70, 68, 84, 76), C.line),
  fill(ellipse(120, 70, 34, 9), C.butter),
  fill(ellipse(120, 70, 27, 6), C.ink, 0.55),
  fill(rrect(106, 34, 28, 20, 4), C.white),
  stroke(rrect(106, 34, 28, 20, 4), C.ink, 2),
];

// A sealed letter. ("Waiting on the other person".)
const illustration_letter = () => [
  fill(circle(120, 110, 68), C.sky),
  fill(rrect(72, 74, 96, 68, 12), C.white),
  stroke(triangle(72, 74, 168, 74, 120, 116), C.line, 2.5),
  fill(circle(120, 132, 9), C.accentDeep),
];

// A moment worth keeping: a small flag on a hill. ("Milestone".)
const illustration_milestone = () => [
  fill(circle(120, 108, 68), C.sage),
  fill(ellipse(120, 150, 72, 22), C.leaf, 0.7),
  fill(rrect(117, 64, 5, 78, 2.5), C.ink),
  fill(triangle(122, 64, 122, 92, 160, 78), C.accent),
];

const ILLUSTRATIONS = {
  illustration_paired,
  illustration_bucket,
  illustration_letter,
  illustration_milestone,
};

// ============================================================================
// Emitters
// ============================================================================

const svgShapes = (shapes) =>
  shapes
    .map((s) => {
      if (s.g) {
        const rot = s.rotate ? ` transform="rotate(${s.rotate.deg} ${s.rotate.cx} ${s.rotate.cy})"` : "";
        return `<g${rot}>\n${svgShapes(s.g)}</g>`;
      }
      const common = s.opacity != null ? ` opacity="${s.opacity}"` : "";
      if (s.stroke && !s.fill) {
        return `<path d="${s.d}" fill="none" stroke="${s.stroke}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round"${common}/>`;
      }
      return `<path d="${s.d}" fill="${s.fill}"${common}/>`;
    })
    .join("\n  ");

const svgFor = (shapes) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${svgShapes(shapes)}
</svg>
`;

// VectorDrawable: transform rotation is degrees clockwise, group pivotX/pivotY.
const avShapes = (shapes) =>
  shapes
    .map((s) => {
      if (s.g) {
        const rot = s.rotate
          ? `\n        android:rotation="${s.rotate.deg}"\n        android:pivotX="${s.rotate.cx}"\n        android:pivotY="${s.rotate.cy}"`
          : "";
        return `    <group${rot}>\n${avShapes(s.g)}\n    </group>`;
      }
      if (s.stroke && !s.fill) {
        const alpha = s.opacity != null ? `\n        android:strokeAlpha="${s.opacity}"` : "";
        return `    <path
        android:fillColor="#00000000"
        android:strokeColor="${s.stroke}"
        android:strokeWidth="${s.width}"
        android:strokeLineCap="round"
        android:strokeLineJoin="round"${alpha}
        android:pathData="${s.d}" />`;
      }
      const alpha = s.opacity != null ? `\n        android:fillAlpha="${s.opacity}"` : "";
      return `    <path
        android:fillColor="${s.fill}"${alpha}
        android:pathData="${s.d}" />`;
    })
    .join("\n");

const vectorFor = (shapes) => `<?xml version="1.0" encoding="utf-8"?>
<!-- Generated by design/illustrations.mjs. -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="${W}dp"
    android:height="${H}dp"
    android:viewportWidth="${W}"
    android:viewportHeight="${H}">
${avShapes(shapes)}
</vector>
`;

const write = (path, contents) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
};

const assets = join(root, APP.iosAssets);
const res = join(root, APP.androidRes);

for (const [name, build] of Object.entries(ILLUSTRATIONS)) {
  const shapes = build();
  const svg = svgFor(shapes);

  write(join(root, "design/illustrations", `${name}.svg`), svg);

  // iOS: keep it vector so it stays crisp at any Dynamic Type size.
  const setDir = join(assets, "Illustrations", `${name}.imageset`);
  write(join(setDir, `${name}.svg`), svg);
  write(
    join(setDir, "Contents.json"),
    JSON.stringify(
      {
        images: [{ filename: `${name}.svg`, idiom: "universal" }],
        info: { author: "xcode", version: 1 },
        properties: { "preserves-vector-representation": true },
      },
      null,
      2,
    ) + "\n",
  );

  write(join(res, "drawable", `${name}.xml`), vectorFor(shapes));
}

console.log(`Generated ${Object.keys(ILLUSTRATIONS).length} illustrations.`);
