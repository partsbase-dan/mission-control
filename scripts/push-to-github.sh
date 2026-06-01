#!/bin/bash
# Push dashboard to partsbase-dan/mission-control
# Inlines dashboard-state.json into index.html so it works without a server

set -e

REPO_DIR="/tmp/mission-control"
DASHBOARD="/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html"
STATE="/Users/drodgers/Claude/PartsBase/dashboard-state.json"

# Ensure repo is cloned and up to date
if [ ! -d "$REPO_DIR/.git" ]; then
  git clone git@github.com:partsbase-dan/mission-control.git "$REPO_DIR"
else
  git -C "$REPO_DIR" pull origin main
fi

# Read the current state JSON
STATE_JSON=$(cat "$STATE")

# Build index.html: inject state as window.__DASHBOARD_STATE__ before </head>
python3 - <<PYEOF
import json, pathlib

html = pathlib.Path("$DASHBOARD").read_text()
state = pathlib.Path("$STATE").read_text()

injection = f'<script>window.__DASHBOARD_STATE__ = {state};</script>\n</head>'
output = html.replace('</head>', injection, 1)

pathlib.Path("$REPO_DIR/index.html").write_text(output)
PYEOF

# Also keep dashboard-state.json in repo for reference
cp "$STATE" "$REPO_DIR/dashboard-state.json"

# Commit and push if there are changes
cd "$REPO_DIR"
git add index.html dashboard-state.json

if git diff --cached --quiet; then
  echo "Nothing to push — already up to date."
else
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
  git commit -m "update: dashboard $TIMESTAMP"
  git push origin main
  echo "Pushed successfully."
fi
