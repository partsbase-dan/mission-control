# Build Status Digest
# Scheduled: 9:00am ET every Friday
# Reads: ai-builds/data/projects.json, ai-builds/data/build-log.json, memory/ai-builds/projects.md
# Writes: briefs/archive/build-digest-{DATE}.md
# CRITICAL: Do NOT write to ai-builds/inputs/ or ai-builds/data/ during this digest run.

You are generating the Friday build status digest for Dan Rodgers.

## Step 1 — Read data files

- ai-builds/data/projects.json — full project registry
- ai-builds/data/build-log.json — all /build invocations this week (filter by timestamp >= last Monday)
- memory/ai-builds/projects.md — narrative context and lessons learned

## Step 2 — Classify projects

Group by status field:
- in-progress: active builds with sprint_end dates
- spec: awaiting Dan's spec approval
- backlog: queued but not started
- done/shipped: completed this week (last_updated >= last Monday)
- blocked: has non-empty blockers array

## Step 3 — Check sprint deadlines

For each in-progress project with a sprint_end date:
- If sprint_end < today + 3 days: flag as "⚠️ Sprint ending soon"
- If sprint_end < today: flag as "🔴 Overdue"

## Step 4 — Write digest

Write to: briefs/archive/build-digest-{YYYY-MM-DD}.md. If that archive file already exists, create briefs/archive/build-digest-{YYYY-MM-DD}-{HHMM}.md instead.

---

# Build Status Digest — {DATE}
*Generated 9:00am ET Friday · {N} projects tracked*

## 🔨 In Progress
{For each in-progress project:}
| Project | Phase | Last Updated | Next Action | Sprint End |
|---------|-------|-------------|-------------|-----------|
| {name} | {phase} | {last_updated} | {next_action} | {sprint_end or —} |
{Flag overdue/ending-soon with emoji}
{If none: "No active builds this week."}

## ✅ Shipped This Week
{Projects with status=done and last_updated >= last Monday. If none: "Nothing shipped — carry on."}

## 📋 In Spec / Awaiting Approval
{Projects with status=spec. Note: "These are blocked on Dan's spec approval."}
{If none: "No specs pending review."}

## 📦 Backlog
{Projects with status=backlog — name + description only, one line each.}
{If none: "Backlog clear."}

## 🚧 Blocked
{Projects with non-empty blockers — name + blocker description.}
{If none: "No blockers."}

## 🔧 This Week's /build Runs
{From build-log.json, entries from this week:}
| Timestamp | Project | Brief | Output | Status |
|-----------|---------|-------|--------|--------|
{If none: "No /build runs this week."}

## 👀 Next Week
{For each in-progress project: derived planned next actions from next_action fields.}
{Note any sprint_end dates in the coming week.}

---
*ai-builds · Mission Control · ~/Claude/PartsBase/CoWork/*

CRITICAL: Do NOT write to ai-builds/inputs/ or ai-builds/data/ during this digest run.
