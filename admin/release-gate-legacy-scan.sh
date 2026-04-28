#!/usr/bin/env bash
set -euo pipefail

# Mauritius Mass Finder release gate: runtime legacy-reference scan.
# This intentionally scans runtime files only. Reports, README, changelog and this script
# are excluded so documentation cannot create false release failures.

ROOT="${1:-.}"
cd "$ROOT"

RUNTIME_FILES=(
  "index.html"
  "app.js"
  "config.js"
  "sw.js"
  "manifest.json"
  "version.json"
  "fallback-data.js"
)

PATTERN='v24\.3|v24_3|v24-3|v24\.2|v24_2|v24-2|v23|v22|v21|v20|v19|v18|v17|v16|v15|mmf_onboarding_v[0-9]|cache-v24-2|cache-v23|cache-v22|cache-v21|cache-v20|Preserves v21|preserves v21|based on v21'
FOUND=""

for file in "${RUNTIME_FILES[@]}"; do
  [ -f "$file" ] || continue
  MATCHES=$(grep -nE "$PATTERN" "$file" || true)

  # version.json may legitimately contain minimum_supported_cache for controlled cache cleanup.
  if [ "$file" = "version.json" ]; then
    MATCHES=$(printf "%s\n" "$MATCHES" | grep -Ev '"minimum_supported_cache"' || true)
  fi

  if [ -n "$MATCHES" ]; then
    FOUND="${FOUND}"$'\n'"${file}:"$'\n'"${MATCHES}"
  fi
done

if [ -n "$FOUND" ]; then
  echo "Legacy runtime reference gate failed:"
  echo "$FOUND"
  exit 1
fi

echo "Legacy runtime reference gate passed."
