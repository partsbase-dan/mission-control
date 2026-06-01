# Dashboard Cleanup — Claude Code Handoff
**File:** `CoWork/dashboard.html`  
**Prepared by:** Dan Rodgers (via Cowork session, May 26 2026)  
**For:** Claude Code refactor session  
**Goal:** Clean up the dashboard's architecture so it's maintainable, consistent, and actually works when opened from the filesystem

---

## Context

This is a single-file HTML dashboard (`CoWork/dashboard.html`, ~1,700 lines) that serves as a Mission Control for PartsBase GTM work. It was built iteratively in Cowork — features were added session by session, so there is architectural drift. It works well enough to use day-to-day but has accumulated real debt that makes it harder to extend and causes a few broken features.

**The dashboard lives at:** `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html`  
**State file lives at:** `/Users/drodgers/Claude/PartsBase/dashboard-state.json`  
**Resources live at:** `/Users/drodgers/Claude/PartsBase/resources/`

The dashboard is opened directly as a `file://` URL in the browser (no local server). This is an important constraint — several features are currently broken because of it.

---

## Known Issues (Priority Order)

### 🔴 P0 — Broken Features

**1. Resources tab: `fetch()` fails on `file://` protocol**
- Location: `toggleResource()` function (~line 1469) and `renderResources()` (~line 1492)
- What it does: When you expand a resource card, it tries to `fetch('../resources/some-file.md')` to load the file contents inline
- Why it's broken: Browsers block `fetch()` on `file://` URLs for security reasons. Every expansion shows: `⚠️ Could not load file: Failed to fetch`
- Fix: Embed file contents as static JS strings in the `PLAN.resources` array, OR set up a minimal local server (e.g. `python3 -m http.server`) and document that as the launch method. Static embedding is simpler and removes the server dependency entirely.

**2. `dashboard-state.json` fetch also fails on `file://`**
- Location: ~line 1297 — `const res = await fetch('../dashboard-state.json?t=' + Date.now())`
- Same root cause as above. The state is currently loaded at startup via fetch — this fails silently and falls back to hardcoded defaults in `PLAN`. 
- Fix: Same solution — either embed state inline or add a local server setup.

---

### 🟡 P1 — Inconsistent Architecture

**3. Two navigation systems that don't know about each other**
- `showOuterTab(name)` — used for Dashboard, Today tabs
- `showPromotedTab(name)` — used for Resources, Email Health, ICP, Exec View tabs
- `showPromotedTab` actually calls `showOuterTab('plan')` internally and then activates an inner tab, which is a hack
- The two systems manage active states separately, so it's possible to have two tabs visually "active" at once
- Fix: Unify into a single `showTab(name)` function. Every sidebar button calls the same function regardless of whether the tab is "outer" or "promoted."

**4. Two CSS systems fighting each other**
- Tailwind CDN (`<script src="https://cdn.tailwindcss.com">`) is loaded for the 180-Day Plan section and the hardcoded Email/ICP tabs
- Custom dark theme CSS variables (`var(--bg)`, `var(--surface)`, etc.) power the sidebar, overview, and JS-rendered sections
- The `#outer-plan` block (~lines 148–184) contains ~40 override rules that brute-force the Tailwind light-theme classes into the dark theme (e.g. `#outer-plan .bg-white { background-color: #1a1d27 !important }`)
- Every time a new Tailwind class appears in the plan content, a new override rule has to be added
- Fix: Pick one system. Either migrate the whole file to Tailwind dark mode with `dark:` classes and a `class="dark"` on `<html>`, OR remove Tailwind entirely and convert the Email/ICP hardcoded HTML to use the CSS variable system. The CSS variable system is already more complete and consistent — removing Tailwind is the cleaner path.

**5. Mixed rendering: some tabs are data-driven, others are hardcoded HTML blobs**
- JS-rendered from `PLAN` data: Sprints, Milestones, Risks, Stack, Decisions, Changelog, Resources (partially)
- JS-rendered from `dashboard-state.json`: Exec View
- Large hardcoded static HTML: Email Health (~150 lines, lines 525–674), ICP & Targeting (~240 lines, lines 675–915)
- The hardcoded tabs can't be updated by changing a data file — they require editing raw HTML every time
- Fix: Extract Email Health and ICP content into data objects (same pattern as `PLAN.sprints`, `PLAN.decisions`, etc.) and render them with `renderEmail()` and `renderIcp()` functions. These functions already exist as stubs — they just need to be wired up.

---

### 🟢 P2 — Cleanup / Polish

**6. `PLAN` object is very large and lives inline in the HTML**
- The `PLAN` object (~lines 1097–1277) contains all sprint data, milestones, risks, stack decisions, decisions log, and resources
- It's ~180 lines of dense JS in the middle of the file
- Consider extracting to a separate `CoWork/dashboard-data.js` file and loading it with `<script src="dashboard-data.js">` — this keeps the HTML clean and makes data updates easier to find

**7. No documented launch method**
- The file is opened directly as `file://` but the correct way to use it (once fetch is fixed) would be a local server
- Add a one-liner comment at the top of the file with the recommended launch: `cd /Users/drodgers/Claude/PartsBase && python3 -m http.server 8080`, then open `http://localhost:8080/CoWork/dashboard.html`
- Alternatively, if going with static embedding, document that no server is needed

**8. Duplicate `.outer-tab` CSS definition**
- `.outer-tab` is defined twice: once in the top `<style>` block (~line 22) for an old horizontal tab bar design, and again (~line 123) for the current sidebar design
- The first definition is dead code — the horizontal tab bar no longer exists
- Remove the first definition (~lines 22–25)

**9. `renderEmail()` and `renderIcp()` are no-op stubs**
- Line ~1411: `function renderEmail() {` — body is empty, Email tab content is hardcoded HTML that never gets replaced
- Line ~1432: `function renderIcp() { /* static HTML */ }` — same
- Either wire these up (P1 fix above) or remove the stub functions to avoid confusion

---

## File Map (Where Things Are)

```
Lines 1–195     <head>, CSS (dark theme vars + Tailwind overrides)
Lines 196–241   <body> open, app shell, sidebar nav buttons
Lines 242–354   Tab: Dashboard (Overview) — KPI cards, workstream status
Lines 355–483   Tab: Today — same layout as Overview, daily context
Lines 484–1091  Tab: 180-Day Plan (outer container)
  Lines 489–517   Inner: Plan Overview (hardcoded)
  Lines 518–523   Inner: Sprints, Milestones, Risks, Stack (JS-rendered, empty divs)
  Lines 524–673   Inner: Email Health (hardcoded HTML ~150 lines)
  Lines 674–914   Inner: ICP & Targeting (hardcoded HTML ~240 lines)
  Lines 915–926   Inner: Decisions (JS-rendered empty div)
  Lines 927–1061  Inner: Exec View (JS-rendered, reads dashboard-state.json)
  Lines 1062–1091 Inner: Resources (JS-rendered via renderResources())
Lines 1092–1295  <script> block: PLAN data object + state-loading fetch
Lines 1296–1340  renderAll(), state fetch, tab init
Lines 1341–1530  render* functions (renderOverview, renderSprints, etc.)
Lines 1531–1673  Remaining render functions + DOMContentLoaded init
```

---

## Recommended Approach

Work in this order to avoid regressions:

1. **Fix P0s first** — Resolve the `fetch()` issue before anything else. Two paths:
   - **Simple (recommended):** Embed resource file contents as JS strings in `PLAN.resources[].content`. Add a `content` field, populate it at build time by reading each file. `toggleResource()` just uses `r.content` instead of fetching.
   - **Server path:** Add a `Makefile` or `launch.sh` that runs `python3 -m http.server 8080` and document this as the standard way to open the dashboard.

2. **Unify navigation (P1 #3)** — Single `showTab()` function. Low risk, high clarity.

3. **Pick one CSS system (P1 #4)** — Remove Tailwind CDN, convert Email/ICP HTML to CSS vars. This unlocks item 4.

4. **Convert Email/ICP to data-driven (P1 #5)** — After CSS is unified, extract hardcoded HTML to data objects and wire up `renderEmail()` / `renderIcp()`.

5. **Extract PLAN to separate file (P2 #6)** — Last, once the file is stable.

---

## Suggested Skills to Load

Run these slash commands in Claude Code at the start of the session, in this order:

### 1. `/spec-driven-workflow` — run first, before any edits
Invoke this before touching any code. Paste this handoff doc as context and let it generate formal acceptance criteria for each issue. This prevents scope creep and gives Claude Code a clear definition of done to check against.

### 2. `/tech-debt-tracker` — scan the file for anything this doc missed
Point it at `CoWork/dashboard.html`. It will score and rank every debt item — use the output to confirm the priority order in this doc is right, or surface issues that weren't caught here.

### 3. `/senior-frontend` — architecture decision on the CSS fix
Run in review mode on `dashboard.html`. The key question to ask: "Should we remove Tailwind and migrate to the CSS variable system, or migrate to Tailwind dark mode? The file must work on `file://` with no build step." Let it recommend the approach before committing to one.

### 4. `/code-reviewer` — quality gate after the refactor is done
Run last, once all P0/P1 issues are resolved. Use it to catch anything that slipped through — inline event handlers, dead code, mixed `var`/`const`, etc. — before calling the refactor complete.

---

## Files to Read Before Starting

Claude Code should read these before beginning any edits:

| File | Why |
|---|---|
| `CoWork/dashboard.html` | The file being refactored |
| `dashboard-state.json` | State file — understand the data shape |
| `CoWork/CLAUDE.md` (if present) or `CLAUDE.md` in root | Project conventions |
| `resources/customerdata/segment-analysis.md` | Example resource file — understand what the Resources tab needs to display |

---

## What NOT to Change

- The `PLAN` data structure and field names — other Cowork sessions depend on the shape of `PLAN.decisions`, `PLAN.resources`, etc.
- The `dashboard-state.json` schema — the exec view scheduled task writes to this file
- The dark theme CSS variable names (`--bg`, `--surface`, `--accent`, etc.) — used throughout
- The sidebar nav item order and labels

---

## Success Criteria

The refactor is done when:
- [ ] Resources tab: clicking any card expands and shows file contents without errors
- [ ] No `file://` fetch errors in the browser console
- [ ] One CSS system throughout — no Tailwind override blocks
- [ ] One `showTab()` navigation function — no two sidebar items can be active simultaneously  
- [ ] Email Health and ICP tabs render from data, not hardcoded HTML
- [ ] File is under 800 lines of HTML (JS data in separate file counts separately)
- [ ] A README or comment at top of file explains how to open/run it

---

*Handoff created: May 26 2026 · From Cowork session → Claude Code*
