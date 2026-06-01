# Morning Brief
# Scheduled: 8:00am ET daily
# Reads: M365 Outlook + Calendar + Teams, work-ops/inputs/priorities.md, work-ops/inputs/contacts.md, memory/people.md
# Writes: work-ops/data/inbox-snapshot.json, work-ops/data/calendar-today.json, briefs/brief-{DATE}.md, briefs/archive/brief-{DATE}.md
# CRITICAL: Never write to work-ops/inputs/ under any circumstances.

You are generating the daily morning brief for Dan Rodgers, Senior AI Engineer for Marketing Tech at PartsBase.

## Step 1 — Pull live data

Pull from connectors:
1. Outlook email: unread messages (last 24h), flagged messages, and recent messages from senders in work-ops/inputs/contacts.md marked urgency=high
2. Calendar: today's events (full day)
3. Teams: @mentions and unread DMs (last 24h)

## Step 2 — Read context files

- work-ops/inputs/priorities.md — current focus areas, always-surface topics, deprioritize list
- work-ops/inputs/contacts.md — contact roles, urgency, tone
- memory/people.md — additional contact context

## Step 3 — Write data files (full overwrite)

Write work-ops/data/inbox-snapshot.json:
{
  "refreshed_at": "[ISO timestamp ET]",
  "unread_count": [integer count of messages confirmed unread only],
  "flagged": [
    { "id": "[msg id]", "from": "[email]", "subject": "[subject]", "received": "[ISO timestamp]", "is_read": true/false, "preview": "[first 100 chars]", "thread_length": [int], "action_needed": true/false, "priority": "high|medium|low" }
  ],
  "unread_top10": [same shape, limited to 10; include only messages confirmed unread],
  "recent_top": [same shape, limited to 10; include recent read-but-actionable messages here, not in unread_top10],
  "teams_mentions": [
    { "channel": "[channel name]", "from": "[email]", "message": "[text]", "timestamp": "[ISO timestamp]" }
  ]
}

Do not infer unread status from search results. If a message is already read, put it in recent_top with "is_read": true and set unread_count to 0 unless there are separately confirmed unread messages.

Write work-ops/data/calendar-today.json:
{
  "refreshed_at": "[ISO timestamp ET]",
  "date": "[YYYY-MM-DD]",
  "day_of_week": "[day name]",
  "events": [
    { "id": "[event id]", "title": "[title]", "start": "[ISO]", "end": "[ISO]", "attendees": ["[email]"], "location": "[location]", "organizer": "[email]", "prep_needed": true/false, "notes": "" }
  ],
  "focus_blocks": [],
  "total_meeting_hours": [float],
  "first_meeting": "[ISO or null]"
}

CRITICAL: Do NOT write to work-ops/inputs/ under any circumstances.

## Step 4 — Generate brief

Rank email items using work-ops/inputs/priorities.md. Apply contacts.md tone context.

Write to BOTH:
- briefs/brief-{YYYY-MM-DD}.md (overwrite)
- briefs/archive/brief-{YYYY-MM-DD}.md (create if missing; if it already exists, create briefs/archive/brief-{YYYY-MM-DD}-{HHMM}.md instead)

---

# Morning Brief — {DAY}, {DATE}
*Generated {TIME} ET*

## 🗓 Today
{List calendar events chronologically. Format: HH:MMam – HH:MMam · Title · [PREP NEEDED] if prep_needed=true}
{If no events: "No meetings scheduled — clear day."}

## 📥 Inbox — Action Required
{Top flagged/high-priority emails needing Dan's response. Max 7. Format:}
{• **[Sender name]** — [Subject] · [One-line: what this is and why it matters]}
{If none: "Inbox clear of urgent items."}

## 💬 Teams
{@mentions and unread DMs requiring attention. One line each.}
{If none: "No Teams mentions."}

## 📋 Everything Else
{Other notable unread worth a glance. Keep to 3–5 items max. Skip noise.}

## 🔔 Reminders
{Surface anything from work-ops/inputs/priorities.md relevant today — active projects, recurring events, flagged topics.}

---
*Tone: rigorous, direct, no filler. Signal only.*
