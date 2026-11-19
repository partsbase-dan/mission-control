#!/bin/sh
# Bundle runway-state.src.mjs (+ runway-core.mjs + @netlify/blobs) into netlify/functions/runway-state.mjs.
# Why: this site deploys the repo as plain files with no npm install, so an import of @netlify/blobs
# is not found at run time (that was the 502 on 2026-11-19). Run after any change to the source files:
#   cd netlify/functions-src && npm ci --ignore-scripts && sh build.sh
set -e
cd "$(dirname "$0")"
npx esbuild runway-state.src.mjs --bundle --platform=node --format=esm --target=node22 \
  --legal-comments=none \
  --banner:js="import { createRequire as __cr } from 'module'; const require = __cr(import.meta.url);" \
  --outfile=../functions/runway-state.mjs
echo "built ../functions/runway-state.mjs"
