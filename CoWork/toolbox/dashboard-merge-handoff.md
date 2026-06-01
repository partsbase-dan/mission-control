# Dashboard Merge — Claude Code Handoff

**Task:** Merge two existing HTML dashboards into one unified file.  
**Output:** `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html` (overwrite in place)  
**Retire after build:** `/Users/drodgers/Claude/PartsBase/dashboard.html` (archive to `/Users/drodgers/Claude/PartsBase/resources/archive/dashboard-180day-original.html`)

---

## Context

Dan Rodgers, Senior AI Engineer, MarTech at PartsBase. Two dashboards exist today:

1. **Mission Control OS** — daily ops view (dark theme, 310 lines)  
   Path: `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html`

2. **180-Day Strategic Tracker** — strategic planning view (light Tailwind theme, 1474 lines)  
   Path: `/Users/drodgers/Claude/PartsBase/dashboard.html`  
   Data: `/Users/drodgers/Claude/PartsBase/dashboard-state.json`

Dan's instruction: **"split views in one dashboard — CoWork on one tab, 180-day on another, shared overview pulled from both"**

---

## Target Architecture

Single HTML file with **3 outer tabs**:

```
[Overview]  [Today]  [180-Day Plan]
```

### Tab 1 — Overview (new, pulls from both)
A combined at-a-glance view. Does not duplicate full content — just the critical signals. Contains:

- **Status strip** (4 KPI cards, same as Today tab): Inbox, Meetings Today, Active Builds, Schedules
- **Critical Flags** (from 180-day plan): The two RED items currently live in the 180-day Overview tab:
  - GA4/SPA tracking broken (Day 7 target: May 25, 2026)
  - Mailchimp sender reputation emergency (>25% complaint rate)
  - CRM consolidation under evaluation (amber)
- **Phase Targets** (4 cards from 180-day Overview): Day 30 / Day 60 / Day 90 / Day 180
- **Active Builds** (from Today): MarTech Email Classifier (spec awaiting approval) + Campaign Intelligence Agent (backlog)
- **Day Counter**: Calculate from start date May 18, 2026. Show "Day X of 180" dynamically with a small progress bar.

### Tab 2 — Today (Mission Control OS)
**Exact content** from the current `CoWork/dashboard.html`. Preserve all sections:
- Today's Brief (calendar, inbox, focus window)
- AI Builds tracker
- Domains grid (work-ops, ai-builds, investments, content, personal)
- Scheduled Workflows (7am daily, Mon 7am, Fri 9am)
- Memory architecture (CLAUDE.md, people.md, terminology.md, domain CLAUDEs)

### Tab 3 — 180-Day Plan (strategic tracker)
**Full inner tab set** from the current `PartsBase/dashboard.html`. All 10 inner tabs preserved:
Overview | Sprints | Milestones | Risk Register | Tech Stack | Email Health | ICP & Targeting | Decisions | Changelog | Exec View

The inner tabs use the same styling/JS as the original. The outer wrapper changes (header, nav) but all inner content is unchanged.

---

## Design System

Use the **dark theme** from CoWork/dashboard.html for the outer shell (header, outer tab bar, body background). The 180-Day Plan inner content can retain its light Tailwind styles — it renders inside a white-background content area, which looks fine on a dark chrome.

### CSS Variables (outer shell — preserve exactly):
```css
--bg: #0f1117;
--surface: #1a1d27;
--surface2: #22263a;
--border: #2e3250;
--accent: #5b7cf6;
--accent2: #38bdf8;
--green: #34d399;
--yellow: #fbbf24;
--red: #f87171;
--purple: #a78bfa;
--text: #e2e8f0;
--muted: #64748b;
--label: #94a3b8;
```

### Outer Tab Bar Styling:
Dark background (`--surface`), active tab uses `--accent` bottom border + color, inactive uses `--muted`. Tabs are: Overview, Today, 180-Day Plan. The 180-Day Plan tab has inner tabs (white background container, Tailwind utility classes, blue active tab style same as original).

### Tailwind:
The 180-Day Plan tab uses `<script src="https://cdn.tailwindcss.com"></script>`. Load it in `<head>` — it will apply everywhere but only the 180-Day tab content actually uses it. The dark theme sections use explicit CSS vars, not Tailwind, so there's no conflict.

---

## Outer Navigation JS

Simple tab switcher — show/hide `div#tab-{name}-content`:

```javascript
function showOuterTab(name) {
  ['overview','today','plan'].forEach(t => {
    document.getElementById('outer-'+t).classList.toggle('hidden', t !== name);
    document.getElementById('outertab-'+t).classList.toggle('active', t === name);
  });
}
```

The existing inner tab switcher from the 180-Day Plan (`showTab()` function) is preserved inside the Plan section unchanged.

---

## Day Counter (Overview tab)

```javascript
const startDate = new Date('2026-05-18');
const today = new Date();
const dayNum = Math.floor((today - startDate) / 86400000) + 1;
const pct = Math.min(Math.round((dayNum / 180) * 100), 100);
```

Display: `"Day 4 of 180"` with a thin progress bar. Day 7 milestone (GTM fix) should be highlighted if dayNum < 7.

---

## dashboard-state.json — Update Before/During Build

Current state is stale (all May 11, pre-start). Update the following before embedding in the merged dashboard:

```json
{
  "meta": {
    "lastUpdated": "2026-05-21",
    "updatedBy": "Dashboard merge — Day 4"
  },
  "workstreams": {
    "tracking": "red",
    "hubspot": "none",
    "claypoc": "none",
    "scoring": "none",
    "seo": "none",
    "outbound": "none",
    "attribution": "none",
    "health": "red"
  },
  "notes": {
    "weekNote": "Week 1 — Discovery only. No builds started. Context-gathering is the mandate. Critical: GA4 SPA fix by Day 7 (May 25). Mailchimp list hygiene unblocked — awaiting ORO CRM cross-reference."
  }
}
```

Workstream RAG key: `"red"` = blocked/critical, `"amber"` = in progress/watch, `"green"` = healthy, `"none"` = not started.

---

## Source File Inventory

### CoWork/dashboard.html — sections to carry into Tab 2 (Today):

| Section | What it contains |
|---|---|
| KPI Row (`grid-4`) | Inbox (Clean), Meetings (4), Active Builds (1), Schedules (3) |
| Today's Brief (left of `grid-2`) | Calendar (4 items), Inbox status, Focus window |
| AI Builds (right of `grid-2`) | MarTech Email Classifier (spec), Campaign Intelligence Agent (backlog), /build + /triage shortcuts |
| Domains (`grid-3` left) | work-ops (Live), ai-builds (Live), investments/content/personal (Stub) |
| Scheduled Workflows (`grid-3` mid) | 3 active schedules |
| Memory (`grid-3` right) | CLAUDE.md, people.md, terminology.md, domain CLAUDEs |

**The KPI Row should also appear in the Overview tab** — keep it at top of both Overview and Today. Don't duplicate the full Today content though.

### dashboard.html — inner tabs to carry into Tab 3 (180-Day Plan):

All 10 tabs. Their content div IDs: `tab-overview-content`, `tab-sprints-content`, `tab-milestones-content`, `tab-risks-content`, `tab-stack-content`, `tab-email-content`, `tab-icp-content`, `tab-decisions-content`, `tab-changelog-content`, `tab-exec-content`.

The inner tab bar (the `<div>` with the 10 `<button onclick="showTab(...)">` elements) and the `showTab()` JS function carry over unchanged. Rename the inner function to `showInnerTab()` to avoid collision with any outer tab JS.

---

## Header

Single shared header for the merged file:

```
PartsBase Mission Control          [live clock]
Dan Rodgers · Senior AI Engineer, MarTech
```

Same styling as the current CoWork dashboard header. Remove the 180-Day Plan's sticky top header entirely (it had its own `<div class="bg-white border-b sticky top-0">` header — replace with the outer tab bar).

---

## File Structure (target)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Tailwind CDN (for 180-day inner content) -->
  <!-- CSS vars + base styles (dark theme) -->
  <!-- Outer tab styles + inner tab overrides -->
</head>
<body>
  <!-- Shared header -->
  <!-- Outer tab bar: Overview | Today | 180-Day Plan -->

  <!-- Tab: Overview -->
  <div id="outer-overview">
    <!-- KPI strip -->
    <!-- Critical flags (3 RAG items) -->
    <!-- Phase targets (4 cards) -->
    <!-- Active builds summary -->
    <!-- Day counter -->
  </div>

  <!-- Tab: Today -->
  <div id="outer-today" class="hidden">
    <!-- Full CoWork dashboard content (no header, no footer) -->
  </div>

  <!-- Tab: 180-Day Plan -->
  <div id="outer-plan" class="hidden">
    <!-- Inner tab bar (Overview through Exec View) -->
    <!-- All 10 inner content divs -->
    <!-- 180-day dashboard JS (showInnerTab, reload, state logic) -->
  </div>

  <!-- Shared footer -->
  <!-- Shared JS: clock, showOuterTab, day counter -->
</body>
</html>
```

---

## Quality Checks Before Done

1. All 3 outer tabs switch without page reload
2. All 10 inner 180-Day tabs switch correctly (renamed `showInnerTab`)
3. Live clock updates in header
4. Day counter shows correct number (today = Day 4)
5. Dashboard state JSON loads correctly — workstream RAG colors show in 180-Day Overview
6. Email Health tab renders fully (it's the largest inner tab — ~400 lines)
7. ICP & Targeting tab renders fully
8. No Tailwind/CSS var conflicts visible in outer dark nav
9. File opens correctly in browser from `computer://` link
10. Old `PartsBase/dashboard.html` archived (don't delete — move to `resources/archive/`)

---

## What NOT to do

- Don't refactor the 180-Day Plan inner content — copy it verbatim, only rename `showTab` → `showInnerTab`
- Don't strip Tailwind from the inner content — it's already there, just scope it
- Don't add a second sticky header inside the 180-Day Plan tab
- Don't hardcode today's date — keep it dynamic (`new Date()`)
- Don't touch `dashboard-state.json` structure (existing keys must stay intact; only update values listed above)

---

## After Build

1. Open `CoWork/dashboard.html` in browser and verify all tabs
2. Update `CoWork/CLAUDE.md` → Mission Control dashboard pointer to reflect merged file lives at `CoWork/dashboard.html`
3. Update `PartsBase/CLAUDE.md` → AI Operations Layer table: remove `dashboard.html` entry from root, note it now lives at `CoWork/dashboard.html`
4. Move `PartsBase/dashboard.html` → `PartsBase/resources/archive/dashboard-180day-original.html`

---

*Handoff written: 2026-05-21 · CoWork session · Dan Rodgers*
