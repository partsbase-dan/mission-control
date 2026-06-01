# Dashboard Merge — Session Handoff

**Status:** In progress — partially complete  
**Date:** 2026-05-21 (Day 4)  
**Spec:** `CoWork/toolbox/dashboard-merge-handoff.md`

---

## What's Done

- ✅ `dashboard-state.json` updated (workstreams: tracking→red, health→red; week note added; changelog entry added)
- ✅ `resources/archive/` directory created
- ✅ Both source files fully read and understood

## What's Left

1. **Write merged dashboard** → `CoWork/dashboard.html` (the main task — not done yet)
2. **Archive original** → move `PartsBase/dashboard.html` to `resources/archive/dashboard-180day-original.html`
3. **Update CLAUDE.md files** (per handoff "After Build" section)

---

## Key Technical Notes for Next Session

- The merged file goes to: `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html`
- State JSON fetch path must be: `../dashboard-state.json` (not `dashboard-state.json`)
- `showTab` → `showInnerTab` everywhere in 180-day JS and inner tab bar `onclick` attrs
- Inner tab button classes: `tab-active`/`tab-inactive` → `inner-tab-active`/`inner-tab-inactive`
- Outer tab IDs: `outer-overview`, `outer-today`, `outer-plan` (content divs); `outertab-overview`, `outertab-today`, `outertab-plan` (buttons)
- 180-day content goes inside a white/slate-50 wrapper inside `outer-plan`
- Tailwind CDN in `<head>` — only 180-day inner content uses it, no conflict with dark CSS vars

## Source Files

- `CoWork/dashboard.html` — 310 lines, dark theme, Mission Control OS (Today tab source)
- `PartsBase/dashboard.html` — 1474 lines, Tailwind light theme (180-Day Plan source)
- `PartsBase/dashboard-state.json` — already updated ✅

## Start Prompt for Next Session

> "Continue the dashboard merge. The spec is at `CoWork/toolbox/dashboard-merge-handoff.md` and progress notes are at `CoWork/toolbox/dashboard-merge-progress.md`. State JSON is already updated. Just write the merged `CoWork/dashboard.html` directly — no agents, no sub-tasks, just write the file."
