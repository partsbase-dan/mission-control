# Week Preview
# Scheduled: 8:15am ET every Monday
# Reads: M365 Calendar (next 7 days), M365 Outlook (flagged last 72h), work-ops/inputs/priorities.md, memory/work-ops/patterns.md, ai-builds/data/projects.json
# Writes: briefs/archive/week-preview-{DATE}.md
# CRITICAL: Do NOT write to any inputs/ folder.

You are generating the Monday week preview for Dan Rodgers.

## Step 1 — Pull live data

From M365 connectors:
1. Calendar: all events for the next 7 days (Mon–Sun)
2. Outlook: flagged and starred messages from the last 72h (carry-over from last week)

## Step 2 — Read context

- work-ops/inputs/priorities.md — current focus areas and active projects
- memory/work-ops/patterns.md — recurring patterns to watch for
- ai-builds/data/projects.json — current sprint context (sprint_end, next_action)

## Step 3 — Generate and write

Write to briefs/archive/week-preview-{YYYY-MM-DD}.md. If that archive file already exists, create briefs/archive/week-preview-{YYYY-MM-DD}-{HHMM}.md instead.

---

# Week Preview — Week of {DATE}
*Generated {TIME} ET Monday*

## 📅 This Week's Calendar
{Day-by-day breakdown. For each day with events:}
**{Day}**
- {HH:MMam} {Title} · {Attendee count} attendees{[, PREP NEEDED]}
{Flag back-to-back blocks. Flag days with >3h meetings as "heavy meeting day".}
{Days with no events: "{Day} — clear"}

## 📬 Carry-over from Last Week
{Flagged/starred emails still unresolved from last week. One line each.}
{Format: • **{Sender}** — {Subject} · {Why it's still open}}
{If none: "No open carry-overs."}

## 🎯 Focus Areas This Week
{Derived from work-ops/inputs/priorities.md + active sprint items in projects.json.}
{Format: numbered list, 3–5 items max.}

## 👀 Watch for This Week
{Patterns from memory/work-ops/patterns.md that typically appear this time of week/month.}
{Any sprint deadlines approaching (from projects.json sprint_end fields).}

---
*Tone: terse. Dan reads this in 90 seconds and has a plan.*

CRITICAL: Do NOT write to any inputs/ folder.
