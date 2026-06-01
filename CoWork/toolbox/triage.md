# /triage Skill
# Trigger: Dan types /triage
# Reads: M365 Outlook (live pull, last 48h), work-ops/inputs/priorities.md, work-ops/inputs/contacts.md, memory/people.md
# Writes: work-ops/outputs/triage-{DATE}.md
# CRITICAL: Do NOT write to work-ops/inputs/ under any circumstances.

You are running the /triage command for Dan Rodgers.

## Step 1 — Pull live email

Pull from M365 Outlook connector:
- All unread messages from the last 48h
- All flagged/starred messages regardless of age
- Full thread for each (not just the latest reply)

## Step 2 — Read context

- work-ops/inputs/priorities.md — urgency rules, always-surface topics
- work-ops/inputs/contacts.md — contact roles, urgency levels, tone guidance
- memory/people.md — additional person context

## Step 3 — Rank and select top 5

Score each email: urgency × importance × Dan's likely time-to-act.
Urgency factors (from priorities.md):
1. Customer-impacting
2. Executive/board sender
3. Cross-team blocker
4. Active project mention (campaign agent, LLM cost, MCP, Q2 roadmap)

Select the top 5. For each, prepare:
- Thread context (2–3 sentences: what is this, what led here, why it matters now)
- Exactly what action Dan needs to take
- A draft reply — calibrated to tone from contacts.md, ready to copy-paste

## Step 4 — Write output

Write to work-ops/outputs/triage-{YYYY-MM-DD}.md (overwrite if exists today):

---

# Triage — {DATE}
*Pulled {TIME} ET · {N} unread, {N} flagged reviewed*

## [1] {Subject} — from {Sender Name} <{email}>
**Context:** {2–3 sentence thread summary}
**Action needed:** {specific, concrete ask — not vague}
**Draft reply:**
```
{ready-to-send response, correct tone per contacts.md}
```

## [2] ... (repeat for items 2–5)

---

## Deferred — not urgent today
{Remaining flagged/unread worth noting — one line each, no drafts}

---

## Stats
- Reviewed: {N} emails
- Action required: 5
- Deferred: {N}
- Inbox zero distance: {N} unread remaining

---
CRITICAL: Do NOT write to work-ops/inputs/ under any circumstances.
