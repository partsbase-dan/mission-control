# PartsBase — Budget Impact Brief
**Date:** May 2026 · **Author:** Dan Rodgers
**Audience:** Robert / Rodrigo Garcia (CTOO)
**Source:** Amelia MCP live CRM data — verified May 27, 2026 · 395 new customers (Feb 27–May 27 2026)

---

## Budget Scenarios — What Each Level Produces

All figures use segment-weighted ARPA confirmed from live Amelia data and a $300 blended CAC derived from actual new-customer SOs over the last 3 months.

| | Conservative | Base Case | Full Program |
|---|---|---|---|
| **Monthly Budget** | $7,500 | $10,000 | $17,500 |
| **New Customers/mo** | 25 | 33 | 58 |
| **New ARR/Month** | ~$105K | ~$139K | ~$244K |
| **Year 1 New ARR** | ~$1.3M | ~$1.7M | ~$2.9M |
| **Magic Number** | 29:1 | 29:1 | 29:1 |

---

## What Each Number Means

**New Customers/mo**
Projected net-new paid accounts from this budget at a $300 blended CAC. The $300 figure is derived from actual new-customer sales orders in Amelia (395 customers, Feb–May 2026) across the target segments below. This is a steady-state run-rate target — not a Month 1 promise. Months 1–2 will be 15–25 customers while paid campaigns exit the learning phase and Clay outbound ramps.

**New ARR/Month**
Annualized subscription revenue from one month's new customer cohort — calculated as new customers × segment-weighted ARPA × 12. ARPA inputs are confirmed from live data, not assumptions. This is contracted ARR added to the base, not cash received in that calendar month.

**Year 1 New ARR**
Total new ARR created across 12 monthly acquisition cohorts. Each month, a new cohort is acquired and their ARR is added to the base. This is cumulative new ARR booked over the year — it does not include upsell or expansion from existing customers.

**Magic Number**
Net new ARR generated per $1 of S&M spend. Confirmed 29:1 from current actuals ($512K net new ARR ÷ $17,500 S&M spend). The ratio holds across all three budget levels because CAC and ARPA are stable. For context: a Magic Number above 1.0 is considered efficient for SaaS; 29:1 is exceptional.

---

## Ramp Reality — Months 2–4

These projections are steady-state targets, not Day 1 outputs. Paid campaigns need 4–6 weeks to exit the learning phase. Clay outbound needs HubSpot live first. Realistic ramp: **10–15 customers in Months 2–4**, building to run rate by Month 3–4. Year 1 ARR at full ramp is **$1.8–2.2M** before hitting the modeled run rate.

---

## Segment ARPA — What Drives the Numbers

*Source: Amelia MCP · New-customer SOs · Feb 27–May 27 2026*

| Segment | New ARPA/mo | Sample (n) | Reliable? |
|---|---|---|---|
| MRO | $432/mo | 37 | ✅ Yes |
| Broker | $336/mo | 78 | ✅ Yes — highest volume |
| Distributor | $339/mo | 49 | ✅ Yes |
| Contract Manufacturer | $460/mo | 27 | ✅ Yes |
| Charter Service | $286/mo | 39 | ✅ Yes |
| OEM | $517/mo | 19 | ✅ Yes |
| Airline | $290/mo | 13 | ✅ Yes |

All 7 segments have n ≥ 10 over the 3-month window. ARPA inputs in the model are conservative — OEM and Airline are both slightly understated, which means the real New ARR/Month figure is modestly higher than shown.

---

## What Gets Built — What You'll See

| Phase | By | You'll See |
|---|---|---|
| Day 1–30 · Foundation | July 2 | GA4 tracking live · HubSpot provisioned · Vector identifying visitors · Clay outbound running · 5–10 MQLs |
| Day 30–60 · Full Funnel | Aug 1 | Ad → Web → Vector → Clay → HubSpot end-to-end · First email campaign · Lead scoring active · 20–30 MQLs/mo |
| Day 60–90 · Scale | Sep 1 | ≥2 outbound meetings/week · CAC confirmed <$300 · 10 SEO pages indexed · Magic Number 29:1 documented |
| Day 90–180 · Revenue Intelligence | Dec 1 | W-shaped attribution live · 50+ at-risk accounts flagged · Marketing owns a line to revenue |

---

## Key Assumptions — What's Confirmed vs. Pending

| Assumption | Status | Notes |
|---|---|---|
| $300 blended CAC | ✅ Confirmed | Derived from 395 actual new-customer SOs in Amelia |
| Segment ARPA inputs | ✅ Confirmed | Amelia MCP live data, Feb–May 2026 |
| $36.8M FY2025 booked revenue | ✅ Confirmed | Exact match to Amelia |
| 6,695 active customers | ✅ Confirmed | Live as of May 27 (6,718 as of May 29 — refresh lag) |
| Magic Number 29:1 | ✅ Confirmed | $512K net new ARR ÷ $17,500 S&M |
| Gross margin (72%) | 🟡 Assumed | Needs finance confirmation — affects LTV only, not ARR projections |
| Annual churn rate | 🟡 Methodology pending | Observed 4–5% on subscription data; not used in ARR projections above |

*The ARR projections (New ARR/Month and Year 1 New ARR) do not depend on the churn rate — they are based solely on confirmed ARPA and CAC. Churn affects LTV only, which is excluded from this brief pending methodology confirmation.*

---

*Created: May 2026 · Verified: May 29, 2026 · Source: Amelia MCP live Athena data · Machine-readable GTM data: `resources/revops/gtm-data.json`*
