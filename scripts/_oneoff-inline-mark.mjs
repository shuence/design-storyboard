// One-off maintenance: the two inline bloom SVGs in index.html predate
// scripts/brand.mjs and are hand-inlined copies of the petal path. Replace
// them with the generated favicon.svg so the nav and footer cannot drift.
// Delete this file once it has run.
import { readFileSync, writeFileSync } from "node:fs";

const path = "index.html";
let h = readFileSync(path, "utf8");
const before = h;

const svg = /<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>\s*/g;
h = h.replace(svg, "");

h = h.replace(
  /<a class="wordmark" href="#top">\s*design/,
  `<a class="wordmark" href="#top"><img src="favicon.svg" alt="" width="22" height="22">design`
);
h = h.replace(
  /<span class="wordmark">\s*design/,
  `<span class="wordmark"><img src="favicon.svg" alt="" width="22" height="22">design`
);

writeFileSync(path, h);
console.log("changed:", before !== h);
console.log("inline bloom svgs left:", (h.match(/<svg viewBox="0 0 100 100"/g) || []).length);
console.log("favicon.svg refs:", (h.match(/favicon\.svg/g) || []).length);
