#!/usr/bin/env node
// Rasterise one SVG or HTML artboard to PNG.
//   node render-png.mjs <in.svg|in.html> <out.png> --width 1280 --height 800
// SVG tries ImageMagick (`magick`) first. HTML uses headless Chrome.
// iOS app icons do not use this; app-icons.mjs writes those PNGs itself.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const input = args[0];
const output = args[1];

function flag(name, fallback) {
  const i = args.indexOf(name);
  return i === -1 ? fallback : Number(args[i + 1]);
}

if (!input || !output || input.startsWith("--")) {
  console.error("usage: node render-png.mjs <in.svg|in.html> <out.png> [--width N] [--height N]");
  process.exit(2);
}

const width = flag("--width", 1280);
const height = flag("--height", 800);
const absIn = resolve(input);
const absOut = resolve(output);

if (!existsSync(absIn)) {
  console.error("missing", absIn);
  process.exit(1);
}

const chromeBins = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
];

function findChrome() {
  for (const bin of chromeBins) {
    if (existsSync(bin)) return bin;
  }
  for (const bin of ["google-chrome", "chromium", "chrome"]) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      return bin;
    } catch {
      /* next */
    }
  }
  return null;
}

function chromeShot() {
  const bin = findChrome();
  if (!bin) {
    console.error("Need ImageMagick (`magick`) for SVG, or Google Chrome for HTML.");
    process.exit(1);
  }
  const url = absIn.endsWith(".html") ? `file://${absIn}` : absIn;
  execFileSync(bin, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${width},${height}`,
    `--screenshot=${absOut}`,
    url,
  ], { stdio: "inherit" });
}

if (absIn.endsWith(".svg")) {
  try {
    execFileSync("magick", [
      "-background", "none",
      "-resize", `${width}x${height}`,
      absIn,
      absOut,
    ], { stdio: "inherit" });
    console.log(absOut);
    process.exit(0);
  } catch {
    chromeShot();
    console.log(absOut);
    process.exit(0);
  }
}

chromeShot();
console.log(absOut);
