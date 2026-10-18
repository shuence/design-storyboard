#!/usr/bin/env bash
# Render the social card used by index.html and every link preview.
#   ./scripts/render-og.sh
# Requires Google Chrome. No npm, no dependencies.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [[ ! -x "$CHROME" ]]; then
  for candidate in \
    "/Applications/Chromium.app/Contents/MacOS/Chromium" \
    "$(command -v chromium || true)" \
    "$(command -v google-chrome || true)"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then CHROME="$candidate"; break; fi
  done
fi
if [[ ! -x "$CHROME" ]]; then
  echo "error: Chrome not found. Set CHROME=/path/to/chrome and rerun." >&2
  exit 1
fi

echo "rendering og.png at 1200x628"
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --default-background-color=00000000 \
  --window-size=1200,628 \
  --screenshot="$PWD/og.png" \
  "file://$PWD/og.html" >/dev/null 2>&1

# Verify the output is actually a 1200x628 image.
if [[ ! -f og.png ]]; then
  echo "error: og.png was not written" >&2
  exit 1
fi
if command -v magick >/dev/null 2>&1; then
  size="$(magick identify -format '%wx%h' og.png)"
  echo "og.png → $size"
  [[ "$size" == "1200x628" ]] || { echo "error: expected 1200x628, got $size" >&2; exit 1; }
else
  echo "og.png written ($(wc -c < og.png) bytes)"
fi
