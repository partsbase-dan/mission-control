# PartsBase — Revenue Operations Framework

**Date:** May 2026 · Program launch: June 2026  
**Author:** Dan Rodgers, Senior AI Engineer, Martech  
**Audience:** Internal RevOps / Rodrigo Garcia (CTOO)  
**Confidence:** 🟡 Estimated — pipeline data is seed/projected; GTM metrics use assumed ARR. Replace with HubSpot + finance actuals at June 30 close.

---

## Bottom Line

The unit economics case for PartsBase's demand generation program is exceptional — **LTV:CAC of 365:1 and CAC payback of 1.2 months** mean every new supplier acquired at $300 CAC returns $109K in lifetime value. The constraint is not whether to invest — it's execution speed. The Magic Number (0.71) is just below the 0.75 target, which means the program needs to close slightly more pipeline per dollar spent. That's a sales velocity and conversion problem, not a spend problem.

**Three things to fix in the next 30 days:**
1. Get the /demo page converting at 8%+ (currently untracked — SPA fix is the prerequisite)
2. Move demo → close rate from unknown to tracked and above 25%
3. Build the expansion/upsell motion — NDR is flat at 100% and needs to reach 110%+ for healthy SaaS economics

---

## Script Output Summaries

### Pipeline Analysis 🟢 Strong

Run against: `resources/revops/pipeline-data.json`

| Metric | Result | Target | Status |
|---|---|---|---|
| Total Pipeline | $39.5K | — | — |
| Quota (monthly) | $8K | — | — |
| Coverage Ratio | **4.93×** | 3–4× | 🟢 Strong |
| Aging Deals | 0 at risk | 0 | 🟢 Clean |
| Concentration Risk | Continental Parts Exchange at 27.3% | <40% | 🟡 Watch |

**Stage funnel (current):**
- MQL → Demo Scheduled: 75% (6 of 8) ✅
- Demo Scheduled → Demo Completed: 50% (3 of 6) — acceptable, improve with SDR prep
- Demo Completed → Proposal: 33% (1 of 3) — needs attention; qualify harder before demo
- Proposal → Close: 0% — program just launched, first closes expected June

**Action:** Pipeline coverage is healthy. The 33% demo-to-proposal conversion suggests some demos are not surfacing fit early enough. Add a 2-question pre-demo qualifier in the confirmation email: "What part categories do you sell?" and "Are you currently listing on ILS or other platforms?"

---

### GTM Efficiency Analysis

Run against: `resources/revops/gtm-data.json`  
⚠️ ARR figures are estimated — replace with actuals from finance before board use

| Metric | Value | Rating | Target | Notes |
|---|---|---|---|---|
| **Magic Number** | 0.71 | 🟡 Yellow | >0.75 | Just below target — see below |
| **LTV:CAC** | **365:1** | 🟢 Green | >3:1 | Exceptional — Amelia-confirmed churn (2.7%) |
| **CAC Payback** | **1.2 months** | 🟢 Green | <18 months | Essentially immediate |
| **Burn Multiple** | 4.0× | 🟡 Yellow | <2× | Acceptable for growth stage |
| **Rule of 40** | — | 🔴 Red | >40% | Booked revenue YoY growth: +11% (Amelia confirmed) |
| **NDR** | 100% | 🟡 Yellow | >110% | Stable but not expanding |

**The LTV:CAC story is the most important number for Rodrigo.**

At $300 CAC (target) and $342.63/month new cohort ARPA with 2.7% annual churn (Amelia confirmed):
- Customer LTV = ($342.63 × 12 × 0.72) / 0.027 = **$109,642**
- LTV:CAC = **365:1**
- CAC Payback = $300 / ($342.63 × 0.72) = **1.2 months**

This means PartsBase recoups its full customer acquisition cost in under 6 weeks. Every additional month that supplier stays is pure margin. **The argument for aggressive investment in demand gen is the unit economics, not gut feel.**

*Prior calculation used 8% assumed churn (industry benchmark). Amelia-confirmed 2.7% actual churn triples LTV. All LTV and LTV:CAC figures above reflect the confirmed number.*

**Magic Number at 0.71:** For every $1 in S&M spend, PartsBase generates $0.71 in new ARR. The 0.75 target is achievable with either: (a) closing the pipeline at a slightly higher rate (demo close rate from 25% to 30%), or (b) increasing ARPA via premium tier upsell from $299 to $499+ for top-tier suppliers.

**Booked revenue growth at +11% YoY** ($33.1M 2024 → $36.8M 2025, Amelia confirmed). As the demand gen program accelerates growth to 25–35%, the Rule of 40 score improves proportionally. The improving trajectory is the board story.

---

### Forecast Accuracy 🟡 Insufficient Data

Only 1 period of data — actuals not yet populated (program launches June 2026).

**Run at Day 45 (July 1) with 2 periods of actuals. Run at Day 90 (August 18) for the first meaningful MAPE trend.**

Data to capture for each month-end close:
- Total new ARR closed (HubSpot: Closed Won, current month)
- Breakdown by channel (utm_source on HubSpot contact)
- Demos scheduled vs. demos held vs. closes
- Forecast submitted at month start vs. actual at month end

---

## PartsBase RevOps Operating System

### Pipeline Stage Definitions

| Stage | Definition | Exit Criteria | Owner |
|---|---|---|---|
| **MQL** | Lead score ≥40 OR demo form submitted | SDR reviews within 4h, qualifies for demo | SDR |
| **Demo Scheduled** | Demo call booked in calendar | Confirmed attendees + pre-demo qualifier completed | SDR |
| **Demo Completed** | Demo call held | AE notes in HubSpot, fit confirmed | AE |
| **Proposal Sent** | Pricing proposal or self-serve checkout link sent | Supplier has seen pricing | AE |
| **Closed Won** | `membership_purchase_completed` event fired | Payment processed, onboarding started | AE |

### Deal Valuation Rules

| Membership Tier | ARR Value | When to Use |
|---|---|---|
| Basic ($299/month) | $3,588 | Default for single-seat supplier |
| Premium ($499/month est.) | $5,988 | Multi-part categories, high-volume distributor |
| Enterprise (custom) | $10K+ | Large OEM or airline MRO — AE-qualified |

Until pricing tiers are finalized, use $3,588 as pipeline value for all deals.

### Quota Targets by Phase

| Month | New ARR Target | New Customers | Implied Close Rate |
|---|---|---|---|
| June (Month 1) | $6K | ~2 | 25% of demos |
| July (Month 2) | $10K | ~3 | 25% |
| August (Month 3) | $15K+ | 4–5 | 28–30% |
| Steady State (Q4) | $25K+/month | 7–8 | 30%+ |

### SLAs

| Handoff | SLA | Tool |
|---|---|---|
| MQL → SDR first touch | 4 hours | HubSpot workflow → Slack alert |
| Demo Scheduled → AE prep | 24h before call | HubSpot task auto-created |
| Demo Completed → Proposal Sent | 48 hours | HubSpot sequence step |
| Closed Won → Onboarding started | 24 hours | HubSpot deal stage trigger |

---

## Reporting Cadence

### Weekly (Mondays — 15 minutes)

Pull from HubSpot + Google Ads + LinkedIn:

| Metric | Check | Alert If |
|---|---|---|
| New MQLs this week | HubSpot | <2 (month 1) / <8 (month 3) |
| Demos scheduled | HubSpot | <2 per week at month 3 |
| Pipeline coverage ratio | Run pipeline_analyzer.py | <3× quota |
| Aging deals (>21 days in any stage) | pipeline_analyzer.py output | Any deal flagged |
| Blended CAC YTD | Manual: spend / new customers | >$300 |

### Monthly (Last Friday — 1 hour)

1. Update `resources/revops/pipeline-data.json` with HubSpot export
2. Update `resources/revops/forecast-data.json` with actuals
3. Update `resources/revops/gtm-data.json` with finance figures
4. Run all 3 scripts, save output to `resources/revops/reports/YYYY-MM/`
5. Update `CoWork/dashboard-state.json` with new metrics
6. Prepare 3-paragraph Rodrigo brief (see template below)

### Monthly Brief Template (for Rodrigo)

```
PARAGRAPH 1 — Pipeline health:
"This month we generated [X] MQLs ([channel breakdown]) at a blended CAC of $[X]. 
Pipeline coverage is [X]× quota, with [X] deals in active stages totaling $[X] ARR. 
[Top risk / concentration flag if any]."

PARAGRAPH 2 — Forecast vs. actual:
"We forecasted $[X] in new ARR and closed $[X], a [X]% variance. 
[Over/under-forecast] driven by [channel/segment]. 
MAPE is [X]% ([Excellent/Good/Fair/Poor])."

PARAGRAPH 3 — Efficiency + one decision:
"Magic Number is [X], [above/below] the 0.75 target. LTV:CAC remains strong at [X]:1. 
NDR is [X]%. 
Decision needed: [one specific ask — budget increase, pricing tier approval, hire approval]."
```

---

## Key Decisions to Validate with Finance

| Data Point | Status | Why It Matters |
|---|---|---|
| Annual churn rate | ✅ **2.7% confirmed** — Amelia MCP (2026-05-27) | LTV calculation anchor — resolved |
| Active supplier count | ✅ **6,695 confirmed** — Amelia MCP (2026-05-27) | NDR denominator — resolved |
| Booked revenue YoY growth | ✅ **+11% confirmed** — Amelia ($33.1M 2024 → $36.8M 2025) | Growth rate confirmed |
| Current ARR (recognized) | 🔴 **Needs finance** — ORO shows $14.3M but doesn't reconcile with $36.8M booked | Baseline for Rule of 40 |
| Gross margin % | 🔴 **72% assumed** — get actuals from finance | Magic Number and LTV accuracy |
| Total S&M spend (current) | ✅ **$17,500/month confirmed** | Budget baseline confirmed |

---

## Scripts Reference

All scripts are in: `/Users/drodgers/Claude/Vetted Skills/business-growth/revenue-operations/scripts/`

```bash
# Weekly pipeline check
python scripts/pipeline_analyzer.py \
  --input /path/to/PartsBase/resources/revops/pipeline-data.json \
  --format text

# Monthly forecast accuracy (needs 3+ periods of actuals)
python scripts/forecast_accuracy_tracker.py \
  /path/to/PartsBase/resources/revops/forecast-data.json \
  --format text

# Monthly GTM efficiency
python scripts/gtm_efficiency_calculator.py \
  /path/to/PartsBase/resources/revops/gtm-data.json \
  --format text
```

---

*Created: May 2026 · Confidence: 🟡 Pipeline = estimated seed data / GTM = assumed ARR. Replace with HubSpot + finance actuals at June 30.*
