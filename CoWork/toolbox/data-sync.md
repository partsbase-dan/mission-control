# Data Sync — GTM Data Accuracy Check
**Toolbox prompt for scheduled or on-demand data governance**  
**Run when:** Monday mornings (weekly) · After any ORO export update · Before sharing with Rodrigo  
**Time to run:** ~3–5 minutes

---

## What This Does

Checks every key GTM and marketing metric across the PartsBase workspace for drift — where downstream docs disagree with the authoritative source. Reports what's stale and updates `marketing-context.md` to reflect current values.

This is not a full data refresh. It checks **consistency** across existing files. To refresh with new ORO data, update `resources/revops/gtm-data.json` first, then run this prompt.

---

## Instructions for Claude

You are running the PartsBase data governance sync. Work through each step below systematically.

### Step 1 — Load the sources of truth

Read these files in order:

1. `resources/revops/gtm-data.json` — machine-readable authoritative metrics
2. `CoWork/memory/data-registry.md` — metric ownership map (tells you what to check and where)
3. `CoWork/memory/marketing-context.md` — the canonical reference doc (what you will update)

Extract the current canonical values for every metric listed in the data registry.

---

### Step 2 — Check downstream docs for drift

For each metric in the registry, check its **Derived In** files against the authoritative value. Flag any mismatch.

#### Files to check:

| File | Metrics to verify |
|---|---|
| `CoWork/dashboard.html` | ARR ($14,329,896), active customers (6,357), active ARPU ($187.85), new cohort ARPU ($325.77), LTV:CAC (117:1), upsell opportunity ($10.5M), new ARR/mo ($244,844), top segment LTV:CAC (222×) |
| `resources/ceo-budget-impact-brief.md` | ARR, active customers, new cohort ARPU, LTV, LTV:CAC, budget model ($244,844/mo, 126× ROI) |
| `resources/customerdata/segment-analysis.md` | Segment ARPU values, LTV, LTV:CAC per segment |
| `dashboard-state.json` (exec_view.summary) | Risk descriptions, workstream statuses, priorities |
| `partsbase-cmo-strategy.md` | ARPU (should be $325.77 new / $187.85 active, NOT $299), LTV (should be $35,008 not $32,131), LTV:CAC (should be 117:1 not 107:1), confidence footer |

#### What counts as drift:
- A number in a downstream doc that differs from the authoritative source by more than rounding
- A confidence flag that's inconsistent (e.g., calling a 🟡 metric "confirmed")
- A stale caveat that's been resolved (or a missing caveat that should be there)

---

### Step 3 — Produce a drift report

Output a table with this format:

```
## Drift Report — [Date]

| File | Metric | Current Value in File | Authoritative Value | Action |
|---|---|---|---|---|
| partsbase-cmo-strategy.md | ARPU | $299/mo | $325.77/mo (new), $187.85/mo (active) | Update |
| ... | ... | ... | ... | ... |

✅ No drift: [list files that checked out clean]
```

If no drift is found: confirm each file checked and mark the sync clean.

---

### Step 4 — Apply fixes

For each drift item:

1. Fix the downstream doc directly (surgical edit — change only the stale metric and its context)
2. Update the `Last Verified` date for the affected metric in `CoWork/memory/data-registry.md`
3. Log the change in `dashboard-state.json` changelog with type `"data-qa"` and author `"Claude (data-sync)"`

**Do not change the authoritative source (`gtm-data.json`) during a sync run** unless you were explicitly given new data. If you see a discrepancy in `gtm-data.json` itself, flag it in the drift report and stop.

---

### Step 5 — Update marketing-context.md

After fixes are applied:
1. Update the `Last verified` date at the top of `CoWork/memory/marketing-context.md`
2. If any 🟡 metrics have been confirmed by finance since the last sync, promote them to 🟢 and add a confirmation note
3. If any new stale docs were found, add them to the **Downstream Docs** table at the bottom of `marketing-context.md`

---

### Step 6 — Report back

Summarize what was checked and what changed:

```
## Sync Complete — [Date]

Files checked: [n]
Metrics verified: [n]
Drift found: [n items] / [n files]
Fixes applied: [n]
Confidence upgrades: [n] (if any 🟡 → 🟢)

Pending finance confirmations still open:
- [list from marketing-context.md "Pending Finance Confirmations" section]

Next sync recommended: [date]
```

---

## Running This as a Scheduled Task

To run this automatically every Monday:

> "Schedule data-sync to run every Monday at 8:30am — after the morning brief"

The scheduled prompt should include:
- This full prompt
- Instruction to write results to `dashboard-state.json` changelog
- Instruction to ping Dan if drift > 3 metrics (add to morning brief output)

---

## Running This On-Demand

Paste this into Cowork:

> "Run data-sync — check all GTM metrics for accuracy across the workspace and fix any drift. Use the instructions in `CoWork/toolbox/data-sync.md`."

Or trigger it before any Rodrigo-facing deliverable:

> "Run data-sync before I finalize the exec brief — I want to make sure all numbers are current."

---

## Files This Prompt Reads

- `resources/revops/gtm-data.json` — authoritative source
- `CoWork/memory/data-registry.md` — metric ownership map
- `CoWork/memory/marketing-context.md` — canonical reference
- `CoWork/dashboard.html` — mission control dashboard
- `resources/ceo-budget-impact-brief.md` — CEO brief
- `resources/customerdata/segment-analysis.md` — segment intel
- `dashboard-state.json` — exec view + changelog
- `partsbase-cmo-strategy.md` — CMO strategy doc (known stale items)

## Files This Prompt Writes

- `CoWork/memory/marketing-context.md` — updated dates and confidence flags
- `CoWork/memory/data-registry.md` — updated `Last Verified` dates
- `dashboard-state.json` — changelog entry for each sync run
- Any downstream doc with confirmed drift (surgical edits only)

---

*Toolbox prompt created: May 26, 2026 · Part of: marketing-context.md + data-registry.md governance system*
