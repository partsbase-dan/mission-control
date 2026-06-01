# Dashboard Review — Handoff to Work Machine
**Created:** 2026-05-26  
**Work machine path:** `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html`  
**Status:** Partial — 3 of 6 code fixes applied on personal machine. Remaining work listed below.

---

## Current State of `dashboard.html`

Three changes have already been applied on the personal machine (SSD). They will carry over since the file is on the SSD:

| # | What was applied | Status |
|---|---|---|
| ✅ Decisions log 107:1 → 117:1 | Fixed in `PLAN.decisions` May 26 rationale | Done |
| ✅ MeetAlfred duplicate | Second stack entry renamed to `'MeetAlfred (Phase 2)'` | Done |
| ⚠️ WORKSPACE_PATH constant added but NOT wired in | `const WORKSPACE_PATH = '/Volumes/Phone SSD/Claude/PartsBase'` was added at line ~573, but `WORKFLOW_PROMPTS` (lines ~1566–1568) still use hardcoded `/Volumes/Phone SSD/` paths instead of the constant | **Finish on work machine** |

---

## Step 1 — Fix the Path System (do this first, work machine only)

The `WORKSPACE_PATH` constant exists but is not yet used. On the work machine:

**1a. Update the constant value** (line ~573):
```js
// change from:
const WORKSPACE_PATH = '/Volumes/Phone SSD/Claude/PartsBase';
// change to:
const WORKSPACE_PATH = '/Users/drodgers/Claude/PartsBase';
```

**1b. Wire the constant into all three `WORKFLOW_PROMPTS`** (lines ~1566–1568):
```js
const WORKFLOW_PROMPTS = {
  'morning-brief': `Run my morning brief. Follow the instructions in ${WORKSPACE_PATH}/CoWork/toolbox/morning-brief.md — pull live Outlook email, calendar, and Teams data via M365, then write the brief and data files as specified.`,
  'week-preview':  `Run my week preview. Follow the instructions in ${WORKSPACE_PATH}/CoWork/toolbox/week-preview.md — pull the next 7 days of calendar events and last 72h flagged email via M365, then write the preview as specified.`,
  'build-digest':  `Run my build status digest. Follow the instructions in ${WORKSPACE_PATH}/CoWork/toolbox/build-digest.md — read the projects.json and build-log.json files, then write the digest as specified. Do NOT write to ai-builds/inputs/ or ai-builds/data/.`,
};
```
Note: use backtick template literals, not single quotes.

**1c. Fix the two cosmetic path references** while you're at it:
- Line 1 (launch comment): update to `cd /Users/drodgers/Claude/PartsBase`
- Line ~559 (Resources footer `<code>` tag): update to `/Users/drodgers/Claude/PartsBase/`

---

## Step 2 — Remaining Code Fixes

### Fix 4 — `TAB_CONFIG.plan` latent nav bug
In `TAB_CONFIG` (~line ~592), change:
```js
plan: { panel: 'plan', inner: null, title: [...] },
```
to:
```js
plan: { panel: 'plan', inner: 'overview', title: [...] },
```
**Why:** `showTab('plan')` currently shows a blank panel because `inner: null` skips `showInnerTab`. Only works today because `togglePlanGroup()` always pairs both calls manually. One future edit will break it silently.

---

### Fix 5 — Changelog date parsing guard
In `renderChangelog` (~line ~1484), the timestamp is passed directly to `new Date()`. Add the same `isNaN` guard that `renderExec` already uses:
```js
// change from:
const d = new Date(entry.timestamp);
const timeStr = d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) + ' · ' + d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
// change to:
const d = new Date(entry.timestamp);
const timeStr = isNaN(d)
  ? (entry.timestamp || '—')
  : d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) + ' · ' + d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
```

---

### Fix 6 — Clipboard fallback shows false "✓ Copied"
In `runWorkflow` (~line ~1579), the `catch` block currently shows "✓ Copied" even if `execCommand` failed. Change:
```js
// change from (in the catch block):
btn.textContent = '✓ Copied'; btn.classList.add('copied');
setTimeout(() => { btn.textContent = '▶ Run'; btn.classList.remove('copied'); }, 2000);
// change to:
try { document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); document.body.removeChild(ta); }
catch(_) { btn.textContent = '⚠ Copy failed'; setTimeout(() => { btn.textContent = '▶ Run'; }, 2000); return; }
btn.textContent = '✓ Copied'; btn.classList.add('copied');
setTimeout(() => { btn.textContent = '▶ Run'; btn.classList.remove('copied'); }, 2000);
```

---

## Step 3 — Business/Content Fixes (Exec View)

These require editing content in `dashboard.html`. All changes are inside `renderExec()` or the `PLAN.decisions` constant.

### Fix 7 — Add confidence footnote to LTV:CAC and ARPU (CRITICAL before showing Rodrigo)
In the GTM Unit Economics section inside `renderExec()` (~line ~1462 area), find the footnote line that currently reads:
```
Top segment LTV:CAC: <strong>222×</strong> (Regional Airlines · $620/mo ARPA). Full analysis: ...
```
Change it to:
```
Top segment LTV:CAC: <strong>222×</strong> (Regional Airlines · $620/mo ARPA). Full analysis: resources/customerdata/segment-analysis.md<br><span style="color:var(--yellow)">* LTV:CAC and ARPU based on assumed 72% gross margin and 8% benchmark churn rate — pending finance actuals (ARR period, true churn, GM%). Do not quote to board until confirmed.</span>
```

---

### Fix 8 — Add Magic Number to GTM Unit Economics
Magic Number = Net New ARR / Prior S&M Spend = $1,915,518 / $210,000 = **9.1** (exceptional; benchmark > 0.75).

In the GTM Unit Economics 2×2 grid inside `renderExec()`, add a fifth tile after Upsell Opportunity:
```js
<div style="background:var(--surface2);border-radius:6px;padding:10px">
  <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Magic Number *</div>
  <div style="font-size:20px;font-weight:700;color:var(--green)">9.1</div>
  <div style="font-size:11px;color:var(--muted)">New ARR $1.9M ÷ $210K S&M · benchmark >0.75</div>
</div>
```
Note: The grid is `grid-template-columns:1fr 1fr` — adding a 5th tile will wrap to a third row. Either expand to a 3-column grid or keep the 2×2 and fold Magic Number into the footnote. Designer's call.

---

### Fix 9 — Add upsell methodology to $10.5M card
Find the Upsell Opportunity tile (~line ~1462):
```
<div style="font-size:11px;color:var(--muted)">Legacy ARPU gap × 6,357 customers</div>
```
Change to:
```
<div style="font-size:11px;color:var(--muted)">6,357 customers × $138/mo ARPU gap × 12 × 72% GM · pending finance actuals</div>
```

---

### Fix 10 — Surface NDR as a known gap
Inside `renderExec()`, in the GTM Unit Economics section, add after the footnote line:
```html
<div style="font-size:11px;color:var(--muted);margin-top:6px;padding:6px 8px;background:var(--surface3);border-radius:4px">NDR: ~100% (expansion ARR not currently tracked — upsell motion is Phase 2)</div>
```

---

## Step 4 — Update `partsbase-cmo-strategy.md`

File: `resources/partsbase-cmo-strategy.md`  
This file is live-linked from the Resources tab and still shows stale numbers. Update before any leadership session:

| Field | Old value | Correct value |
|---|---|---|
| ARPU | $299/mo | $187.85/mo (active base) · $325.77/mo (new cohort) |
| LTV | $32,131 | $35,008 (new cohort) |
| LTV:CAC | 107:1 | 117:1 (new cohort blended) |
| Confidence footer | "Revenue/ARR figures are assumed" | "Revenue from ORO exports; period unconfirmed. GM (72%) and churn (8%) are benchmarks pending finance actuals." |

---

## Summary Checklist

- [ ] 1a. Update `WORKSPACE_PATH` constant to `/Users/drodgers/Claude/PartsBase`
- [ ] 1b. Wire constant into `WORKFLOW_PROMPTS` (template literals)
- [ ] 1c. Fix launch comment (line 1) and Resources footer (line ~559)
- [ ] Fix 4: `TAB_CONFIG.plan.inner = 'overview'`
- [ ] Fix 5: Changelog date `isNaN` guard
- [ ] Fix 6: Clipboard fallback error state
- [ ] Fix 7: Confidence footnote in Exec View GTM Unit Economics
- [ ] Fix 8: Add Magic Number tile
- [ ] Fix 9: Add upsell methodology text
- [ ] Fix 10: Add NDR placeholder
- [ ] Step 4: Update `partsbase-cmo-strategy.md` with current unit economics

**Minimum bar before showing to Rodrigo:** 1a–1b, Fix 7 (confidence footnote), and Step 4 (cmo-strategy.md).
