# PRD-mission-control.md
**PartsBase Mission Control OS**
Author: Dan Rodgers | Generated: 2026-05-21 | Status: Approved — ready to build

---

## §1. Executive Summary

**What this system is:** A personal AI operating system inside Claude Cowork that unifies Dan's recurring work across two active domains — daily work operations and AI engineering builds — into scheduled workflows, on-demand skills, and a live dashboard. Three domains (investments, content, personal) are scaffolded as placeholder folders for future builds.

**The domains:**
- **work-ops** — Daily digest of Outlook email, calendar, and Teams activity; on-demand triage skill; Monday week-preview brief.
- **ai-builds** — Active AI project tracker; spec-driven `/build` skill for dropping briefs and getting structured build plans; Friday status digest; optional multi-agent hub for parallel build approaches.

**Interaction patterns used:**
- *Dashboard* — `dashboard.html` (always-on, plugin-provided)
- *Brief/digest* — Morning brief (daily 7am ET), week preview (Mon 7am ET), build digest (Fri 9am ET)
- *Skill* — `/triage`, `/build`
- *Autonomous builder* — `/build` skill with spec-driven-workflow + agenthub for complex builds

**Build length:** ~5 hours. This fits foundation + 2 domains built properly. Remaining 3 domains become placeholder folders and are the first thing added in a follow-on session without restructuring.

**Scales without restructuring:** Adding a new domain = new folder (pattern below) + new workflows. No changes to root structure or memory architecture.

---

## §2. Quick Start — Moving This into Cowork

### Getting into Cowork (Dan does this)

1. Open Claude Cowork desktop app.
2. The Cowork project is already pointed at `~/Claude/PartsBase/CoWork/` — this is where the build happens.
3. This PRD file is already in the project folder. Cowork can read it directly.
4. Paste the Project Instructions block below into **Cowork → Project → Custom Instructions**.

### Project Instructions (paste this into Cowork project custom instructions)

```
You are building and maintaining Dan's PartsBase Mission Control OS.

DOMAINS: work-ops (fully built), ai-builds (fully built), investments/content/personal (placeholder stubs only).
LOCAL DATA LAYER: ~/Claude/PartsBase/CoWork/ — all files live here.
CONNECTORS REQUIRED: Microsoft 365 (Outlook email, calendar, Teams chat), Mailchimp/campaign planner.
TIMEZONE: US Eastern (ET).

IRON RULES:
- inputs/ directories are HUMAN-MAINTAINED. Never auto-overwrite any file in any inputs/ folder. Ever.
- Build one block at a time. After each block, report what was built and the done-check result. Wait for Dan's go-ahead before proceeding to the next block.
- When operating inside a domain folder, read that domain's CLAUDE.md for voice and approach.
- Check PRD-mission-control.md at the project root before any structural changes.

SKILLS AVAILABLE (in ~/Claude/claude-skills/):
- engineering/agenthub — multi-agent parallel builder
- engineering/skills/spec-driven-workflow — spec-first build workflow
- engineering/skills/mcp-server-builder — MCP server scaffolding from OpenAPI
- engineering/llm-cost-optimizer — LLM cost architecture
- engineering/prompt-governance — production prompt versioning
- engineering/karpathy-coder — code quality discipline (/karpathy-check)
- project-management/skills/meeting-analyzer — Teams/Outlook transcript analysis
- finance/business-investment-advisor — investment ROI/IRR/NPV (for investments domain when built)

START COMMAND: When Dan says "Start building — begin with Block 0", assume nothing is set up. Run Block 0 first.
```

### How to Run the Build

When Dan says to start: **assume nothing is set up.** Run Block 0 (Setup) first — verify the Productivity plugin, run `/start`, confirm connectors. Only after Block 0 is confirmed complete, proceed to Block 1. Build one block at a time, report done-check results, wait for go-ahead.

### The First Thing Dan Types

> **"Start building — begin with Block 0."**

---

## §3. Goals and Non-Goals

**Goals (this build):**
- Unified daily morning brief pulling from Outlook email, calendar, and Teams into a single markdown file at 7am ET
- On-demand `/triage` skill that surfaces the top 5 emails needing action with suggested responses
- Monday week-preview brief for calendar and email patterns for the coming week
- Active AI project registry (`projects.json`) with status, stack, next actions, and blockers
- `/build` skill that accepts a brief in `ai-builds/inputs/` and produces a structured spec + build plan following spec-driven-workflow conventions
- Friday 9am ET project status digest
- Placeholder folders for investments, content, personal — correct structure, seed CLAUDE.md files, empty inputs/data/outputs
- Full memory architecture seeded with PartsBase context

**Deliberate non-goals (this build window):**
- **Investments workflows** — No live data refresh, no ROI calculations, no dashboards. The `finance/business-investment-advisor` skill is noted in the toolbox for future use.
- **Content/Mailchimp workflows** — Campaign planner connector is available but content domain is stub-only here. Full build is the logical Block 1 of the next session.
- **Personal domain** — Stub folder only.
- **Multi-agent hub automation** — `agenthub` is referenced in the `/build` skill as an optional escalation path, but the full hub lifecycle (init/spawn/eval/merge) is not wired into scheduled workflows.
- **Meeting transcript ingestion** — `meeting-analyzer` skill is noted in toolbox; not wired into morning brief in this build.
- **Git integration / CI hooks** — `karpathy-check` is a manual on-demand command, not wired into a pre-commit hook here.

---

## §4. Architecture Overview

### Three Layers

```
Local files (~/Claude/PartsBase/CoWork/)
    ↕ read/write
Cowork project (Claude Cowork)
    ↕ read/pull
Connectors (Microsoft 365, Mailchimp) — sources only, never storage
```

The local folder is the **single source of truth** for all state. Connectors are pull sources. Nothing is stored in a connector.

### Interaction Patterns → Workflows

| Pattern | Workflow | Trigger |
|---------|----------|---------|
| Brief/digest | Morning brief | Scheduled 7am ET daily |
| Brief/digest | Week preview | Scheduled Mon 7am ET |
| Brief/digest | Build status digest | Scheduled Fri 9am ET |
| On-demand skill | `/triage` | Dan types `/triage` |
| Autonomous builder | `/build` | Dan drops a brief + types `/build` |
| Always-on dashboard | `dashboard.html` | Plugin-provided, opened any time |

### Three-Tier Memory Architecture

| Tier | File | Purpose |
|------|------|---------|
| 1 | `CLAUDE.md` (root) | Cross-cutting: people, shorthand, PartsBase context, global preferences |
| 2 | `memory/{domain}/` | Deep per-domain knowledge that persists across sessions |
| 3 | `{domain}/CLAUDE.md` | Role, tone, and operating rules when inside that domain folder |

### Key Architectural Decisions

- **M365 as pull source, not push target.** The brief reads from Outlook/Teams via connector; it never writes back (no auto-reply, no calendar changes) without explicit Dan action.
- **`inputs/` is immutable by automation.** Human-curated files (`priorities.md`, `contacts.md`, build briefs) are never overwritten by scheduled workflows. This is the most important invariant in the system.
- **Spec-driven-workflow is the backbone of `/build`.** Every build brief goes through Phase 1–3 of spec-driven-workflow before any implementation scaffolding. No code without an approved spec.
- **agenthub is opt-in.** It's available in toolbox for complex builds where parallel approaches are valuable, but it's not the default path for every `/build` invocation.

---

## §5. The Data Layer

### Where It Lives

Plain files in `~/Claude/PartsBase/CoWork/`. Not in Drive, not in SharePoint. If Dan wants backup, the CoWork folder can sit inside a Dropbox/OneDrive-synced directory, but Cowork always reads and writes local files.

### Full Folder Tree

```
~/Claude/PartsBase/CoWork/
│
├── CLAUDE.md                        ← [Tier 1] Cross-cutting working memory
├── TASKS.md                         ← Plugin: active task list
├── PRD-mission-control.md           ← This PRD — authoritative architecture reference
│
├── memory/                          ← [Tier 2] Deep domain memory
│   ├── people.md                    ← Key contacts: name, role, relationship, notes
│   ├── terminology.md               ← PartsBase/aviation/AI shorthand glossary
│   ├── work-ops/
│   │   └── patterns.md              ← Recurring email/meeting patterns worth remembering
│   └── ai-builds/
│       └── projects.md              ← Active project registry narrative + lessons learned
│
├── dashboard.html                   ← Plugin: live dashboard (do not hand-roll)
│
├── toolbox/                         ← Custom skill source files (installed from here)
│   ├── triage.md                    ← /triage skill: on-demand email triage
│   ├── build.md                     ← /build skill: spec-driven AI project builder
│   └── week-preview.md              ← Week-preview brief skill
│
├── briefs/                          ← Morning brief outputs
│   ├── brief-YYYY-MM-DD.md          ← Today's brief (overwritten daily)
│   └── archive/
│       └── brief-YYYY-MM-DD.md      ← One file per day, never deleted
│
├── work-ops/                        ← FULLY BUILT ✅
│   ├── CLAUDE.md                    ← [Tier 3] work-ops role/tone
│   ├── inputs/                      ← Human-maintained — NEVER auto-overwritten
│   │   ├── priorities.md            ← Dan's current focus areas, VIP senders, topics to surface
│   │   └── contacts.md             ← Key contacts with context (role, relationship, urgency rules)
│   ├── data/                        ← Machine-refreshed derived files
│   │   ├── inbox-snapshot.json      ← Refreshed at brief generation time
│   │   └── calendar-today.json      ← Refreshed at brief generation time
│   └── outputs/                     ← Generated artifacts
│       └── triage-YYYY-MM-DD.md     ← Output of /triage runs
│
├── ai-builds/                       ← FULLY BUILT ✅
│   ├── CLAUDE.md                    ← [Tier 3] ai-builds role/tone
│   ├── inputs/                      ← Human-maintained — NEVER auto-overwritten
│   │   └── [brief-name].md          ← Build briefs Dan drops here for /build to process
│   ├── data/                        ← Machine-refreshed derived files
│   │   ├── projects.json            ← Active project registry
│   │   └── build-log.json           ← Log of all /build invocations and outcomes
│   └── outputs/                     ← Generated artifacts
│       └── spec-[name]-YYYY-MM-DD.md ← Specs and build plans produced by /build
│
├── investments/                     ← STUB ONLY 🗂
│   ├── CLAUDE.md                    ← Placeholder role file
│   ├── inputs/                      ← Empty; seed with portfolio.md manually
│   ├── data/                        ← Empty
│   └── outputs/                     ← Empty
│
├── content/                         ← STUB ONLY 🗂
│   ├── CLAUDE.md                    ← Placeholder role file
│   ├── inputs/                      ← Empty
│   ├── data/                        ← Empty
│   └── outputs/                     ← Empty
│
└── personal/                        ← STUB ONLY 🗂
    ├── CLAUDE.md                    ← Placeholder role file
    ├── inputs/                      ← Empty
    ├── data/                        ← Empty
    └── outputs/                     ← Empty
```

### Inputs vs. Data

`inputs/` = human-curated truth. Never touched by automation.
`data/` = machine-refreshed snapshots. Safe to overwrite on each refresh cycle.

### Memory Files

**`memory/people.md`** — Keyed list of people Dan interacts with. Format:
```markdown
## [Name]
- Role: [title @ company]
- Relationship: [colleague / stakeholder / vendor / direct-report]
- Email: [address]
- Notes: [anything worth remembering — communication style, current project, timezone]
```

**`memory/terminology.md`** — Shorthand glossary. Format:
```markdown
| Term | Meaning |
|------|---------|
| MC | Mission Control (this system) |
| PB | PartsBase |
| MarTech | Marketing Technology team |
| CIA | Campaign Intelligence Agent (active AI project) |
```

**`memory/work-ops/patterns.md`** — Observed recurring patterns. Format:
```markdown
## [Pattern name]
- Frequency: [daily / weekly / ad hoc]
- Description: [what happens]
- Action: [how Dan typically handles it]
```

**`memory/ai-builds/projects.md`** — Narrative supplement to `projects.json`. Free-form notes on lessons learned, architecture decisions, why certain approaches were tried and abandoned.

### Data File Schemas

#### `work-ops/data/inbox-snapshot.json`

```json
{
  "refreshed_at": "2026-05-21T07:00:00-04:00",
  "unread_count": 12,
  "flagged": [
    {
      "id": "msg_abc123",
      "from": "john.smith@partsbase.com",
      "subject": "Q2 AI Roadmap Review",
      "received": "2026-05-21T06:45:00-04:00",
      "preview": "Can you review the updated roadmap before our 10am call?",
      "thread_length": 3,
      "action_needed": true,
      "priority": "high"
    }
  ],
  "unread_top10": [
    {
      "id": "msg_def456",
      "from": "vendor@mailchimp.com",
      "subject": "API rate limit warning",
      "received": "2026-05-21T05:30:00-04:00",
      "preview": "Your account is approaching the monthly send limit.",
      "priority": "medium"
    }
  ],
  "teams_mentions": [
    {
      "channel": "marketing-tech",
      "from": "sarah.jones@partsbase.com",
      "message": "@Dan can you review the campaign agent PR?",
      "timestamp": "2026-05-20T17:15:00-04:00"
    }
  ]
}
```

#### `work-ops/data/calendar-today.json`

```json
{
  "refreshed_at": "2026-05-21T07:00:00-04:00",
  "date": "2026-05-21",
  "day_of_week": "Thursday",
  "events": [
    {
      "id": "evt_xyz789",
      "title": "Q2 AI Roadmap Review",
      "start": "2026-05-21T10:00:00-04:00",
      "end": "2026-05-21T11:00:00-04:00",
      "attendees": ["john.smith@partsbase.com", "sarah.jones@partsbase.com"],
      "location": "Microsoft Teams",
      "organizer": "john.smith@partsbase.com",
      "prep_needed": true,
      "notes": ""
    }
  ],
  "focus_blocks": [],
  "total_meeting_hours": 1.0,
  "first_meeting": "2026-05-21T10:00:00-04:00"
}
```

#### `ai-builds/data/projects.json`

```json
{
  "updated_at": "2026-05-21T09:00:00-04:00",
  "projects": [
    {
      "id": "proj_001",
      "name": "Campaign Intelligence Agent",
      "status": "in-progress",
      "phase": "build",
      "description": "AI agent for campaign performance analysis and optimization recommendations via Mailchimp MCP",
      "repo": "https://github.com/partsbase/campaign-intel-agent",
      "stack": ["python", "anthropic-sdk", "mailchimp-mcp", "claude-sonnet-4-5"],
      "last_updated": "2026-05-20",
      "sprint_end": "2026-05-28",
      "next_action": "Complete Mailchimp MCP tool definitions — see spec-campaign-intel-2026-05-19.md",
      "blockers": [],
      "notes": "Approved spec in ai-builds/outputs/. agenthub used for parallel tool-definition approaches."
    },
    {
      "id": "proj_002",
      "name": "LLM Cost Dashboard",
      "status": "spec",
      "phase": "design",
      "description": "Real-time cost tracking dashboard for all AI API spend across MarTech products",
      "repo": "",
      "stack": ["python", "anthropic-sdk", "prometheus"],
      "last_updated": "2026-05-21",
      "sprint_end": "2026-06-11",
      "next_action": "Draft spec — brief is in ai-builds/inputs/llm-cost-dashboard.md",
      "blockers": [],
      "notes": ""
    }
  ]
}
```

#### `ai-builds/data/build-log.json`

```json
{
  "entries": [
    {
      "id": "build_001",
      "project_id": "proj_001",
      "timestamp": "2026-05-19T14:30:00-04:00",
      "action": "build-invoked",
      "brief": "ai-builds/inputs/campaign-intel-brief.md",
      "output": "ai-builds/outputs/spec-campaign-intel-2026-05-19.md",
      "skill_used": "spec-driven-workflow",
      "status": "spec-approved"
    }
  ]
}
```

### Refresh Strategy

| File | What populates it | When | Strategy |
|------|------------------|------|---------|
| `inbox-snapshot.json` | M365 email connector | At brief generation (7am ET) | Full overwrite |
| `calendar-today.json` | M365 calendar connector | At brief generation (7am ET) | Full overwrite |
| `projects.json` | Dan edits manually OR `/build` appends new entries | On `/build` + manual | Append new projects; update existing in-place |
| `build-log.json` | `/build` skill appends on each invocation | On `/build` | Append-only, never overwrite entries |

---

## §6. Component Specifications

### 6.1 Morning Brief (Scheduled)

**Purpose:** Single daily markdown file surfacing everything Dan needs to know at the start of the day.

**Reads:**
- M365 Outlook email (unread, flagged, last 24h) via connector
- M365 calendar (today's events) via connector
- M365 Teams (recent @mentions and unread DMs) via connector
- `work-ops/inputs/priorities.md` — Dan's current focus areas and VIP senders
- `work-ops/inputs/contacts.md` — contact context

**Writes:**
- `work-ops/data/inbox-snapshot.json` (overwrites)
- `work-ops/data/calendar-today.json` (overwrites)
- `briefs/brief-YYYY-MM-DD.md` (overwrites today's brief)
- `briefs/archive/brief-YYYY-MM-DD.md` (appends archive copy)

**Schedule:** 7:00am ET daily

**Output structure:**
```markdown
# Morning Brief — [Day], [Date]
Generated: [time]

## 🗓 Today
[List of calendar events with times, attendees, prep flag]

## 📥 Inbox — Action Required
[Top flagged/high-priority emails needing response, ranked by urgency]

## 💬 Teams
[@mentions and DMs requiring attention]

## 📋 Everything Else
[Other unread of note, FYI items]

## 🔔 Reminders
[Any patterns or items from priorities.md worth surfacing]
```

---

### 6.2 `/triage` Skill (On-demand)

**Purpose:** On-demand deep dive into inbox — surfaces top 5 emails needing action with context and a suggested response for each.

**Reads:**
- M365 Outlook email (last 48h unread + flagged) via connector — live pull
- `work-ops/inputs/priorities.md`
- `work-ops/inputs/contacts.md`
- `memory/people.md`

**Writes:**
- `work-ops/outputs/triage-YYYY-MM-DD.md` (one per day, overwrites)

**Trigger:** Dan types `/triage`

**Output structure:**
```markdown
# Triage — [Date]

## [1] [Subject] — from [Sender]
- Context: [thread summary, why it matters]
- Action needed: [what Dan needs to do]
- Suggested reply: [draft response, ready to copy-paste]

## [2] ... (up to 5)

## Deferred (not urgent)
[Remaining flagged items — one line each]
```

---

### 6.3 Week Preview (Scheduled)

**Purpose:** Monday morning digest of the week ahead — calendar loaded, email patterns flagged, focus areas surfaced.

**Reads:**
- M365 calendar (next 7 days) via connector
- M365 Outlook (flagged + starred from last 72h) via connector
- `work-ops/inputs/priorities.md`
- `memory/work-ops/patterns.md`

**Writes:**
- `briefs/archive/week-preview-YYYY-MM-DD.md`

**Schedule:** 7:00am ET every Monday

**Output structure:**
```markdown
# Week Preview — Week of [Date]

## This Week's Calendar
[Day-by-day event list with prep flags]

## Carry-over from Last Week
[Flagged emails or threads still unresolved]

## Focus Areas This Week
[Derived from priorities.md + current sprint in projects.json]

## Watch for
[Patterns from memory/work-ops/patterns.md relevant this week]
```

---

### 6.4 `/build` Skill (Autonomous builder)

**Purpose:** Dan drops a brief `.md` file in `ai-builds/inputs/`, types `/build`, and gets back a structured spec and build plan following spec-driven-workflow conventions. For complex builds, can escalate to agenthub for parallel approach exploration.

**Reads:**
- Most recently modified `.md` file in `ai-builds/inputs/` (the brief)
- `ai-builds/data/projects.json`
- `memory/ai-builds/projects.md`
- `~/Claude/claude-skills/engineering/skills/spec-driven-workflow/SKILL.md`

**Writes:**
- `ai-builds/outputs/spec-[brief-name]-YYYY-MM-DD.md` (new file each invocation)
- `ai-builds/data/projects.json` (appends new project entry if none exists; updates status if project already tracked)
- `ai-builds/data/build-log.json` (appends invocation record)
- CRITICAL: **never writes to `ai-builds/inputs/`**

**Trigger:** Dan types `/build` after placing a brief in `ai-builds/inputs/`

**Workflow (follows spec-driven-workflow phases 1–3):**
1. Read the brief. Extract: problem statement, success criteria, constraints, stack hints.
2. Produce §1–§9 spec following spec-driven-workflow format (functional reqs, NFRs, acceptance criteria, edge cases, API contracts, data models, out of scope).
3. Append a build plan: time-boxed blocks, who runs each, done-when criteria.
4. If brief mentions "parallel approaches", "compare implementations", or "A/B": note that `agenthub` in `~/Claude/claude-skills/engineering/agenthub/` can be invoked after spec approval for parallel agent competition.
5. Update `projects.json` and `build-log.json`.

**Output format:** Full spec document at `ai-builds/outputs/spec-[name]-YYYY-MM-DD.md` following the spec-driven-workflow template exactly.

---

### 6.5 Build Status Digest (Scheduled)

**Purpose:** Friday EOW summary of active AI projects — status, blockers, wins, what's next week.

**Reads:**
- `ai-builds/data/projects.json`
- `ai-builds/data/build-log.json`
- `memory/ai-builds/projects.md`

**Writes:**
- `briefs/archive/build-digest-YYYY-MM-DD.md`

**Schedule:** 9:00am ET every Friday

**Output structure:**
```markdown
# Build Status Digest — [Date]

## Active Projects
[For each in-progress project: name, phase, last action, next action, blockers]

## Shipped This Week
[Projects moved to done/shipped]

## In Spec / Backlog
[Projects in spec or backlog phase]

## Next Week
[Planned next actions derived from projects.json]
```

---

### 6.6 Dashboard (`dashboard.html`)

Plugin-provided. Cowork will populate it with domain summaries during Block 4. Do not hand-roll a separate dashboard file.

---

## §7. The Build Plan

| Block | What gets built | Who | Output | Done when… |
|-------|----------------|-----|--------|-----------|
| **0 — Setup** (~30 min) | Verify Productivity plugin installed; run `/start`; confirm M365 connector and Mailchimp connector active; confirm CoWork project root is `~/Claude/PartsBase/CoWork/` | **Me** (Cowork guides) | CLAUDE.md, TASKS.md, memory/, dashboard.html exist at root | All four setup checks pass |
| **1 — Data Layer** (~60 min) | Create full folder tree; write seed `inputs/` files; write seed `data/` JSON files with schema + example entries; write all CLAUDE.md files (root + domain Tier 3 files); write memory seed files | **Cowork** | Full folder tree created; all files readable | `ls ~/Claude/PartsBase/CoWork/` shows correct structure; JSON files parse without error |
| **2 — work-ops Workflows** (~60 min) | Morning brief prompt (save to toolbox/ + wire schedule); `/triage` skill (save to toolbox/); week preview prompt (save to toolbox/ + wire schedule) | **Cowork** | `toolbox/triage.md`, `toolbox/week-preview.md`; morning brief scheduled 7am ET daily; week preview scheduled Mon 7am ET | Run morning brief manually once; brief appears in `briefs/brief-YYYY-MM-DD.md` with correct structure |
| **3 — ai-builds Workflows** (~60 min) | `/build` skill (save to toolbox/); build status digest (save to toolbox/ + wire schedule); update `ai-builds/CLAUDE.md` with skill reference | **Cowork** | `toolbox/build.md`; build digest scheduled Fri 9am ET | Drop a test brief in `ai-builds/inputs/test.md`, run `/build`, verify spec file appears in `ai-builds/outputs/` and `projects.json` is updated |
| **4 — Dashboard + Polish** (~60 min) | Update `dashboard.html` to surface today's brief, active projects count, and quick links; seed `memory/` files with PartsBase context; verify all 3 stub domains have correct structure | **Cowork** | Updated `dashboard.html`; seeded memory files; stub folders confirmed | Dashboard opens and shows work-ops summary + ai-builds project count |
| **5 — Validation** (~30 min) | Run end-to-end done checks; verify no inputs/ files were touched; verify all JSON schemas valid; spot-check brief output quality; confirm schedules are registered | **Cowork** | Done-check report | All done-checks pass; no inputs/ files modified |

### Cut Order (if time runs short)

1. Week preview (Mon brief) — cut first; morning brief covers the gap
2. Build status digest (Fri brief) — manual `/build` log review is a workable fallback
3. Dashboard polish — plugin dashboard is functional without customization
4. **Never cut:** Block 0 setup, the data layer, morning brief, `/triage`, `/build`

### Never Cut

Block 0 (setup), Block 1 (data layer), morning brief workflow, `/triage` skill, `/build` skill.

---

## §8. Setup Details and Copy-Paste Prompts

### Folder Creation (Block 1)

Cowork runs these in the project root (`~/Claude/PartsBase/CoWork/`):

```bash
mkdir -p memory/work-ops memory/ai-builds
mkdir -p work-ops/inputs work-ops/data work-ops/outputs
mkdir -p ai-builds/inputs ai-builds/data ai-builds/outputs
mkdir -p investments/inputs investments/data investments/outputs
mkdir -p content/inputs content/data content/outputs
mkdir -p personal/inputs personal/data personal/outputs
mkdir -p toolbox briefs/archive
```

---

### Morning Brief Prompt (save as `toolbox/triage.md` skeleton + wire to schedule)

```
You are generating the daily morning brief for Dan Rodgers, Senior AI Engineer for Marketing Tech at PartsBase.

INPUTS TO READ:
1. Pull last 24h Outlook email via M365 connector: unread messages, flagged messages, messages from VIP senders in work-ops/inputs/contacts.md
2. Pull today's calendar events via M365 connector
3. Pull recent Teams @mentions and unread DMs via M365 connector
4. Read work-ops/inputs/priorities.md for current focus areas
5. Read memory/people.md for contact context

DATA TO WRITE (before generating the brief):
- Write work-ops/data/inbox-snapshot.json — full overwrite, schema per PRD §5
- Write work-ops/data/calendar-today.json — full overwrite, schema per PRD §5
CRITICAL: Do NOT write to work-ops/inputs/ under any circumstances.

BRIEF TO WRITE:
- Write briefs/brief-{TODAY}.md — overwrite
- Append a copy to briefs/archive/brief-{TODAY}.md

OUTPUT FORMAT:
# Morning Brief — {DAY}, {DATE}
Generated: {TIME} ET

## 🗓 Today
[Calendar events in chronological order. Flag any requiring prep.]

## 📥 Inbox — Action Required
[Top flagged/high-priority emails. Rank by urgency. Max 7. Include: sender, subject, one-line summary, why it matters.]

## 💬 Teams
[@mentions and unread DMs. One line each.]

## 📋 Everything Else
[Other notable unread. Keep brief.]

## 🔔 Reminders
[Anything from priorities.md worth surfacing today.]

TONE: Rigorous, direct, no fluff. Dan wants signal, not ceremony.
```

---

### `/triage` Skill Prompt (save as `toolbox/triage.md`)

```
You are running the /triage command for Dan Rodgers.

INPUTS TO READ:
1. Pull last 48h Outlook email: unread and flagged via M365 connector
2. Read work-ops/inputs/priorities.md
3. Read work-ops/inputs/contacts.md
4. Read memory/people.md

TASK:
Identify the top 5 emails requiring Dan's action. Rank by urgency × importance.
For each, produce:
- Subject and sender
- Thread context (2-3 sentences: what is this about, what led here)
- Exactly what action Dan needs to take
- A draft reply Dan can copy-paste, adjusted for tone from contacts.md

OUTPUT FILE: Write work-ops/outputs/triage-{TODAY}.md
CRITICAL: Do NOT write to work-ops/inputs/ under any circumstances.

OUTPUT FORMAT:
# Triage — {DATE}

## [1] {Subject} — from {Sender}
**Context:** {thread summary}
**Action needed:** {specific ask}
**Draft reply:**
---
{ready-to-send draft}
---

[Repeat for items 2–5]

## Deferred — not urgent today
{Remaining flagged — one line each}
```

---

### Week Preview Prompt (save as `toolbox/week-preview.md`, schedule Mon 7am ET)

```
You are generating the Monday week preview for Dan Rodgers.

INPUTS TO READ:
1. Pull next 7 days calendar events via M365 connector
2. Pull flagged + starred Outlook email from last 72h via M365 connector
3. Read work-ops/inputs/priorities.md
4. Read memory/work-ops/patterns.md
5. Read ai-builds/data/projects.json for current sprint context

WRITE: briefs/archive/week-preview-{TODAY}.md
CRITICAL: Do NOT write to any inputs/ folder.

OUTPUT FORMAT:
# Week Preview — Week of {DATE}

## This Week's Calendar
{Day-by-day list. Flag meetings requiring prep. Note back-to-back blocks.}

## Carry-over from Last Week
{Flagged emails/threads still open. One line each.}

## Focus Areas This Week
{Derived from priorities.md + active sprint in projects.json}

## Watch for
{Patterns from memory/work-ops/patterns.md relevant this week}

TONE: Rigorous, direct. Dan reads this in 2 minutes and moves on.
```

---

### `/build` Skill Prompt (save as `toolbox/build.md`)

```
You are running the /build command for Dan Rodgers.

STEP 1 — READ THE BRIEF
Find the most recently modified .md file in ai-builds/inputs/.
Read it in full. Extract:
- Problem statement (what this build is solving)
- Success criteria (what "done" looks like)
- Known constraints (stack, performance, integrations)
- Open questions

STEP 2 — READ SKILL
Read ~/Claude/claude-skills/engineering/skills/spec-driven-workflow/SKILL.md.
Follow its Phase 1 (Gather), Phase 2 (Write Spec), Phase 3 (Validate) for this build.

STEP 3 — PRODUCE SPEC
Write a complete spec following the spec-driven-workflow §1–§9 template to:
ai-builds/outputs/spec-{brief-name}-{TODAY}.md

The spec MUST include:
1. Title and Metadata
2. Context (why this, evidence)
3. Functional Requirements (FR-N, RFC 2119)
4. Non-Functional Requirements (with measurable thresholds)
5. Acceptance Criteria (Given/When/Then, each referencing FR-* or NFR-*)
6. Edge Cases (EC-N, one per external dependency)
7. API Contracts (TypeScript-style interfaces)
8. Data Models (fields, types, constraints)
9. Out of Scope (explicit exclusions)

Append a BUILD PLAN section: time-boxed blocks, who runs each, done-when criteria.

STEP 4 — UPDATE TRACKING
Update ai-builds/data/projects.json:
- If this project is already tracked: update status and next_action
- If new: append a new project entry with id, name, status="spec", phase="design"
Append to ai-builds/data/build-log.json: {id, project_id, timestamp, action="build-invoked", brief, output, skill_used="spec-driven-workflow", status="spec-draft"}

STEP 5 — AGENTHUB FLAG
If the brief mentions "parallel approaches", "compare implementations", "A/B test", or "explore multiple solutions": add a note at the top of the spec: "AGENTHUB CANDIDATE — after spec approval, consider running ~/Claude/claude-skills/engineering/agenthub with /hub:run for parallel implementation exploration."

CRITICAL: NEVER write to ai-builds/inputs/. Read only.

SIGN OFF: Present the spec path and project.json update summary to Dan. Ask for spec approval before any implementation begins.
```

---

### Build Status Digest Prompt (schedule Fri 9am ET)

```
You are generating the Friday build status digest for Dan Rodgers.

INPUTS TO READ:
1. Read ai-builds/data/projects.json
2. Read ai-builds/data/build-log.json
3. Read memory/ai-builds/projects.md

WRITE: briefs/archive/build-digest-{TODAY}.md
CRITICAL: Do NOT write to ai-builds/inputs/ or ai-builds/data/ during this digest run.

OUTPUT FORMAT:
# Build Status Digest — {DATE}

## Active Projects
{For each status=in-progress: name | phase | last_action | next_action | blockers}

## Shipped / Done This Week
{Projects moved to done since last Friday}

## In Spec / Backlog
{Projects in spec or backlog phase with next action}

## Next Week
{Planned actions derived from next_action fields + sprint_end dates}

TONE: Terse. This is a status snapshot, not a narrative.
```

---

### Seed Files (Block 1 content)

**`CLAUDE.md` (root) — seed content:**
```markdown
# PartsBase Mission Control — Working Memory

## About Dan
- Dan Rodgers, Senior AI Engineer, Marketing Technology, PartsBase
- Email: drodgers@partsbase.com
- Timezone: US Eastern (ET)
- Working style: rigorous, direct, no fluff; breadth and rigor equally

## About PartsBase
- Aviation/aerospace parts marketplace platform
- MarTech team builds AI-powered marketing tooling

## Active Domains
- work-ops: daily operations digest (FULLY BUILT)
- ai-builds: AI engineering projects (FULLY BUILT)
- investments, content, personal: placeholder stubs (future builds)

## Shorthand
- PB = PartsBase
- MC = Mission Control (this system)
- MarTech = Marketing Technology team
- ET = Eastern Time

## Key Reminders
- inputs/ directories are NEVER auto-overwritten
- Check PRD-mission-control.md before structural changes
- Refer to memory/ for deep context before starting any domain work
```

**`work-ops/CLAUDE.md` (Tier 3) — seed content:**
```markdown
# work-ops — Role and Approach

You are Dan's chief of staff for daily operations. Your job is to surface signal from noise — the right emails, the right meetings, the right context — so Dan can make decisions in minutes, not hours.

## Voice
Crisp, direct, no filler. Bullet points are fine. No pleasantries.

## Rules
- Never write to inputs/ (priorities.md, contacts.md are Dan's files)
- Surface patterns you notice across sessions in memory/work-ops/patterns.md
- When you see a recurring email type or meeting pattern, note it
- Urgency ranking: (1) customer-impacting, (2) executive/board, (3) cross-team blockers, (4) everything else
```

**`ai-builds/CLAUDE.md` (Tier 3) — seed content:**
```markdown
# ai-builds — Role and Approach

You are Dan's principal AI engineer and architect. Your job is to turn build briefs into production-ready specs, track project status rigorously, and apply engineering discipline (spec-first, karpathy-simple, cost-aware) to every build.

## Voice
Technical, precise, opinionated. Flag tradeoffs. Push back on vague requirements.

## Rules
- NEVER write to ai-builds/inputs/ — build briefs are Dan's artifacts
- Every /build invocation must produce a spec before any implementation scaffolding
- Reference ~/Claude/claude-skills/engineering/skills/spec-driven-workflow/SKILL.md for spec format
- If a build involves LLM endpoints: proactively apply ~/Claude/claude-skills/engineering/llm-cost-optimizer/SKILL.md
- For code quality review: ~/Claude/claude-skills/engineering/karpathy-coder/SKILL.md (/karpathy-check)
- For MCP server work: ~/Claude/claude-skills/engineering/skills/mcp-server-builder/SKILL.md
- For prompt management: ~/Claude/claude-skills/engineering/prompt-governance/SKILL.md
- agenthub available at ~/Claude/claude-skills/engineering/agenthub/ for parallel approach exploration
```

**Stub `CLAUDE.md` files (investments, content, personal) — identical pattern:**
```markdown
# {domain} — Placeholder

This domain is not yet built. When ready to build:
1. Read PRD-mission-control.md §10 for scope notes on this domain
2. Design a workflow plan following the fixed per-domain pattern
3. Add domain-specific CLAUDE.md voice/role content here

Relevant skills to consider:
- investments: ~/Claude/claude-skills/finance/business-investment-advisor/SKILL.md
- content: ~/Claude/claude-skills/marketing-skill/ skills + campaign planner MCP
- personal: TBD
```

---

## §9. Decision Log

| Decision | Choice | Reasoning / Trade-off |
|----------|--------|----------------------|
| work-ops + ai-builds as primary two domains | Selected these over investments + content | M365 connector is live and immediately useful; ai-builds aligns with Dan's daily engineering work. Content deferred because it benefits from a dedicated session with the Mailchimp connector fully mapped. |
| spec-driven-workflow as backbone of `/build` | Enforced spec-first | Dan is a developer who values rigor; skipping spec produces tech debt. Spec-driven-workflow is already in claude-skills and has proven tooling. |
| agenthub as opt-in, not default | Manual escalation flag in brief | agenthub requires a git repo and is powerful but heavyweight. Not every build brief warrants parallel competition. Opt-in keeps the default path fast. |
| `inputs/` immutability as iron rule | Never auto-overwrite | The most common automation failure mode is clobbering human-curated context. Making this an explicit invariant in every prompt guard prevents silent data loss. |
| Single brief file in `ai-builds/inputs/` | Read most-recently-modified | Simpler than a queue; Dan drops one brief at a time. If multi-brief queuing is needed later, `build-log.json` already tracks all invocations. |
| `briefs/archive/` with date-stamped files | Append-only archive | Briefs are valuable longitudinal data — patterns, how priorities shift over time. Append-only means no accidental purges. |
| M365 connector as pull-only | Connector never writes back | Auto-replying email or modifying calendar on Dan's behalf without confirmation is a high-risk irreversible action. Read-only + human-in-the-loop for sends. |
| llm-cost-optimizer referenced in ai-builds CLAUDE.md but not auto-invoked | Proactive reference, not mandatory gate | Dan will know when a build involves LLM endpoints; forcing it on every `/build` run adds friction. Making it a known reference is the right balance. |
| 5 domains stubbed, 2 built | Scoping rule applied strictly | A solid system across two domains beats a thin, broken one across five. Stub folders preserve the architecture without committing build time. |
| prompt-governance + karpathy-coder referenced in ai-builds CLAUDE.md | Discipline layer for AI builds | These are the two most relevant quality rails for Dan's AI engineering work. Surfacing them in the domain CLAUDE.md means they're available without being forced. |

---

## §10. Out of Scope / Future Work

### Deferred domains (placeholder folders only in this build)

**investments** — Folder structure exists. When building:
- Skill: `~/Claude/claude-skills/finance/business-investment-advisor/SKILL.md`
- Data model: portfolio positions, watchlist, P&L history
- Workflows: weekly portfolio brief, DCF/IRR calculator on-demand skill
- Connector needs: None required (inputs/ files are the data source); optional Plaid/brokerage API via MCP

**content** — Folder structure exists. When building:
- Connectors: Mailchimp/campaign planner MCP (already enabled)
- Skills: `~/Claude/claude-skills/marketing-skill/` (content-creator, social-media-analyzer)
- Data model: campaign calendar, content briefs, performance metrics
- Workflows: weekly content brief, campaign performance digest, `/draft` skill for campaign copy

**personal** — Folder structure exists. Scope TBD — Dan to define focus areas (goals, health, finance) before building.

### Future work within active domains

- **Meeting analyzer integration** — `~/Claude/claude-skills/project-management/skills/meeting-analyzer/SKILL.md` can be wired into `work-ops` to ingest Teams meeting transcripts post-call. Not in this build; can be added as a `toolbox/meeting-insights.md` skill without restructuring.
- **Git pre-commit hook for karpathy-check** — `~/Claude/claude-skills/engineering/karpathy-coder/` has a pre-commit hook pattern. Wiring this into individual project repos is a per-project decision, not a Mission Control responsibility.
- **Automated `projects.json` refresh from GitHub** — Pull PR status, CI status directly from GitHub API. Would require a GitHub MCP connector. When added: creates `ai-builds/data/github-status.json`, absorbed into build status digest.
- **agenthub scheduled runs** — For certain recurring build tasks (e.g., weekly prompt optimization), agenthub could be scheduled rather than manually triggered. Out of scope for now.

### What would force a re-architecture

- More than 4 active domains simultaneously — the 3-tier memory system scales to ~4 before cross-domain context conflicts become expensive
- A domain that requires real-time streaming data (vs. snapshot refresh) — would need a different data layer pattern
- Multi-user scenarios (sharing this system with another team member) — CLAUDE.md and inputs/ are personal; would need a user-namespaced layer
