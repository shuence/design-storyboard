#!/usr/bin/env node
// Validates WCAG 2.x contrast for every semantic pair in tokens.json (light + dark). Exits 1 on failure.
import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("./tokens.json", import.meta.url)));

const resolve = (ref) => ref.slice(1, -1).split(".").reduce((node, key) => node[key], tokens).$value;

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failures = 0;
for (const mode of ["light", "dark"]) {
  for (const [fg, bg, min] of tokens.contrastChecks.pairs) {
    const r = ratio(resolve(tokens.semantic[mode][fg]), resolve(tokens.semantic[mode][bg]));
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${mode.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)} (min ${min})`);
  }
}
process.exit(failures ? 1 : 0);
