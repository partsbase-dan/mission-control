# PartsBase — CMO Strategy & Growth Engine Design

**Date:** May 2026  
**Author:** Dan Rodgers, Senior AI Engineer, Martech  
**Audience:** Rodrigo Garcia (CTOO) · Internal marketing  
**Confidence:** 🟡 Medium — channel CAC targets are estimates; validate at Day 45 with first actuals

---

## The Four CMO Questions — Answered for PartsBase

### 1. Who are we for?
**Primary buyer ICP:** VP Maintenance / Director Procurement / Parts Manager at MRO shops, airlines, and charter operators (50–5,000 employees). Aviation/aerospace/defense industry. Pain: AOG events cost $10k–$150k/hour — certified parts sourcing is mission-critical, not a procurement exercise.

**Primary seller ICP:** Sales Director / Head of Distribution at parts distributors, OEM surplus houses, and MRO providers. Pain: inventory visibility, RFQ volume, and reaching buyers in markets they can't staff.

**What we are NOT for:** Consumer aviation enthusiasts, hobbyist aircraft owners, non-aviation procurement teams. A single bad-fit account wastes more SDR time than 10 good-fit accounts are worth.

### 2. Why do they choose us?
**For buyers:** Speed to sourcing. 15B+ parts, 51,000+ daily searches, condition codes, AOG urgency handling, audit trail. When an aircraft is on the ground, every hour costs $10k–$150k — PartsBase is the fastest path to a certified part from a verified supplier.

**For suppliers:** Buyer reach. 7,500+ verified buyers in 200 countries generating 51,000 daily searches. PartsStore for transactional listings. PBExpo community. The pitch vs. ILS is: "Most of our top suppliers are on both — they're not the same buyers."

**The positioning through-line:** *PartsBase is where aviation moves.* Speed, scale, and trust — the three things that matter when an aircraft is grounded.

### 3. How do they find us?
**Growth model: Hybrid Sales-Led + Marketplace Network Effects**

PartsBase is not PLG (no free-trial self-serve loop for suppliers). It's not pure sales-led (the marketplace creates its own gravity — buyer search volume pulls suppliers in). It's a **marketplace flywheel**:

```
More suppliers → More parts listed → More buyer searches resolved
     ↑                                              |
More suppliers acquired ← Better supplier ROI ←────┘
```

The demand gen program (Google + LinkedIn + Outbound) accelerates supplier acquisition, which strengthens the flywheel. The SEO and content program builds long-term buyer acquisition, which feeds the flywheel from the other side.

**Channel hierarchy by strategic priority:**

| Priority | Channel | Role | CAC Target |
|---|---|---|---|
| 1 | Organic SEO / Content | Long-term flywheel fuel — buyer intent traffic | $75 |
| 2 | Google Search (Brand + Competitor) | High-intent capture — AOG and locator searches | $150–200 |
| 3 | Outbound / Clay | Direct supplier ICP targeting — highest control | $100 |
| 4 | LinkedIn Ads | Enterprise supplier awareness — ABM motion | $220 |
| 5 | Google Search (Solution) | Mid-funnel supplier acquisition | $250 |
| 6 | Retargeting | Conversion layer across all channels | $80 |
| 7 | Partnerships / PBExpo | Community flywheel — low cost, compounding | $50 |

### 4. Is it working?
See dashboard metrics in `CoWork/dashboard-state.json`. The three numbers Rodrigo should own:
- **Magic Number** (~29:1 · 🟢 Amelia 2026-05-27) — massively above the >0.75 target; every $1 S&M generates $29 ARR · Day 90 budget pitch opportunity
- **LTV:CAC** (365–490× · 🟡 uses assumed 72% gross margin) — new cohort $342 ARPA → 365×; active base $459 ARPA → 490× · needs finance gross margin confirmation to promote to 🟢
- **NDR** (~96.5% · 🟡 estimated · target >100%) — expansion MRR $3.2K vs churned MRR $9.7K/mo; HubSpot upgrade trigger (Day 30–60) is the fix
- **Active customers** (6,695 · 🟢 Amelia) — $36.8M booked ARR 2025 · $2.37M MRR · 2.7% annual churn
- **ARPA: new cohort vs active base** ($342/mo new vs $460/mo base · 🟢 diagnosed 2026-05-27) — mix shift confirmed, not price erosion; BAS-009 Inventory Mgmt penetration 23% new vs 61% renewal is the primary driver

---

## Growth Model Design

### Why Not PLG?
PLG requires a product with a natural viral/self-serve loop. Aviation procurement is not self-serve — parts sourcing involves condition codes, certifications, audit trails, and supplier verification. The buy decision for a supplier membership involves a demo and a conversation. PLG doesn't fit the motion.

### Why Sales-Led With Marketplace Gravity?
Aviation buyers are already searching for parts. The marketplace creates pull — the demand gen program converts that pull into supplier sign-ups. The SDR motion handles qualification. The AE handles demo and close. The marketplace's network effects do the retention work.

**The growth loop:**
```
Paid acquisition (Google + LinkedIn)
    → /demo page → Demo → Close (supplier joins)
    → Supplier inventory indexed → More buyer searches resolved
    → Buyer search volume increases → Stronger supplier ROI
    → Supplier retention improves → NDR > 100%
    → Word-of-mouth from supplier community (PBExpo) → organic supplier acquisition
```

### The Organic Compounding Bet
SEO and content are under-invested in most aviation B2B companies because the payoff is 6–12 months out. PartsBase has strong domain authority — a focused content program on AOG search terms, condition code guides, and parts sourcing keywords will compound into the lowest-CAC channel in the program. $3,000/month into content now is $75 CAC in 12 months. This is worth protecting even when short-term budget pressure hits.

---

## Brand Positioning vs. ILS

### Competitive Landscape

| Competitor | Strength | Weakness | PartsBase Angle |
|---|---|---|---|
| **ILS** (Inventory Locator Service) | Market leader, dominant mindshare | Legacy UX, no transactional layer, subscription-heavy | "ILS lists parts. PartsBase moves them." |
| **Locatory.com** | Strong EMEA presence | Not a US priority, weaker buyer volume | Low priority for US campaigns |
| **Rotabull** | Multi-marketplace aggregator | More partner than threat | Partner opportunity — list-everywhere angle |

### Messaging Architecture

**Category:** Aviation parts marketplace (not "locator service" — locators are a subset of what PartsBase does)

**Primary differentiation axes:**

1. **Scale:** 15B+ parts, 7,500+ buyers, 200 countries — the largest active marketplace
2. **Transactional:** PartsStore enables actual purchase/RFQ, not just listing visibility
3. **Community:** PBExpo gives suppliers access to buyers in a relationship context, not just search
4. **Speed:** 51,000 daily searches — real-time buyer demand, not static catalogs

**Messaging by audience:**

| Audience | Primary Message | Proof Point |
|---|---|---|
| Buyer (MRO/Airline) | "Find certified parts for AOG in minutes, not days" | Part search volume, supplier count, condition codes |
| Supplier (Distributor) | "Put your inventory in front of 7,500 verified buyers globally" | RFQ volume, buyer country count, daily search volume |
| Enterprise Supplier | "Your parts, indexed across the world's largest aviation search engine" | 15B+ parts, 51K daily searches, PartsStore listings |

**ILS battlecard (one-liner for AE use):**
> "Most of our top suppliers list on both ILS and PartsBase — they're not the same buyers. ILS reaches North American MROs. PartsBase reaches 7,500 buyers in 200 countries, including markets ILS doesn't cover."

---

## Budget Allocation — Strategic Recommendation

### The Channel Capacity Finding

The budget model revealed a critical insight: **at $17,500/month, PartsBase is budget-constrained in execution, not in channel capacity.** The model hit channel MQL caps (85 MQLs/month total) before exhausting budget, which means:

1. The $300 CAC target is only achievable with high conversion rates at each stage
2. Channel capacity expansion (SEO content volume, outbound list size, LinkedIn audience depth) is the growth lever — not just spend
3. If conversion rates are below target, CAC climbs fast — the pipeline analyzer's 0% win rate (program just launched) will be the number to watch in June

### Recommended Allocation (Month 3 — $17,500/month)

| Channel | Budget | % | Rationale |
|---|---|---|---|
| Google Search (Brand + Competitor) | $4,375 | 25% | Highest-intent, fastest conversion, lowest CAC — protect this first |
| LinkedIn Ads (Supplier acquisition) | $4,375 | 25% | Enterprise ABM for distributors/OEMs — awareness + lead gen |
| Organic SEO / Content | $3,500 | 20% | Compounding — defend this against short-term cuts |
| Google Search (Solution keywords) | $2,625 | 15% | Mid-funnel expansion after brand campaigns are optimized |
| Retargeting (Google Display) | $1,750 | 10% | High ROAS ($80 CAC) — conversion layer for all other channels |
| Outbound / Clay | $875 | 5% | Low CAC ($100), high control — starts small, scales with HubSpot integration |

**Note:** Partnerships/PBExpo ($50 CAC) should be a budget-light, relationship-heavy motion — not a paid channel budget item. ROI is high but volume is limited.

### When to Rebalance (Trigger Rules)

| Trigger | Action |
|---|---|
| Google Search CTR < 2% for 2 weeks | Pause solution keywords, reinvest in brand/competitor |
| LinkedIn CPL > $200 for 30 days | Rotate creative; if no improvement at 60 days, cut 30% and shift to outbound |
| SEO organic sessions growing >15% MoM | Increase content budget by $500–1,000; SEO is compounding |
| Outbound reply rate >8% | Scale outbound list size and Clay sequences; this channel is working |
| Blended CAC > $350 for consecutive months | Audit lowest-performing channel, cut before adding spend elsewhere |

### The Argument for Increasing Budget (for Rodrigo)

At $300 CAC and $32,131 LTV:
- Every new supplier acquired returns **107× their acquisition cost** in lifetime revenue
- CAC payback is **1.4 months** — the fastest possible return on marketing investment
- At $17,500/month, theoretical capacity is **58 new suppliers/month** ($2.5M in new ARR/year)
- The constraint is not budget — it's channel capacity, conversion rates, and execution speed
- The case for increasing to $25,000/month (the top of the approved range) is straightforward: more budget → more channel capacity → more suppliers → stronger flywheel

---

## Marketing Org Design

### Current State (May 2026)
Dan operates as a one-person AI-augmented marketing engineering function. The stack (HubSpot + Clay + Vector + Profound) is being built to make a 1-person team perform like a 4-person team on execution. This is the right posture for Phase 1.

### Hiring Sequence (When Revenue Justifies)

| Hire | Trigger | Role |
|---|---|---|
| **Content / SEO Specialist** (hire 1) | When organic traffic is growing but content production is the bottleneck (target: Day 90+) | Writes the AOG guides, condition code content, aviation parts sourcing articles that build the long-term moat |
| **SDR** (hire 2) | When Clay outbound sequences are generating >20 replies/month and the bottleneck is human follow-up | Handles MQL qualification and demo booking |
| **Marketing Ops** (hire 3) | When HubSpot workflow complexity exceeds what Dan can maintain alongside build work | Owns attribution, HubSpot administration, data hygiene |

**Agency vs. in-house:** Ad creative and campaign management (Google/LinkedIn) should be in-house or AI-assisted in Phase 1. At $17,500/month spend, an agency retainer ($2,000–4,000/month) is not justified until the program hits $25,000+/month and campaign complexity warrants it.

### The AI-Augmented Stack Advantage

The Vetted Skills library + HubSpot + Clay + Claude API gives PartsBase capabilities that would normally require a 5-person team:

| Function | Traditional Team | PartsBase AI Stack |
|---|---|---|
| Lead enrichment | Data analyst | Clay automated enrichment |
| Visitor identification | Paid tool + analyst | Vector (~37% ID rate) |
| Outbound personalization | Copywriter + SDR | Claude API on Clay output |
| Attribution reporting | Analytics engineer | HubSpot + campaign analytics scripts |
| Ad creative iteration | Creative team | Ad creative skill + Claude |
| SEO content | Content team | AI-assisted + Profound AEO |
| CRO testing | UX + dev + analyst | CRO audit framework + Optimizely (Phase 2) |

---

## AEO (Answer Engine Optimization) — The Profound Play

This is a Day 60 workstream, but it deserves strategic framing now.

Answer engines (ChatGPT, Perplexity, Google AI Overview, Claude) are becoming the first stop for industrial B2B procurement research. "Best aviation parts marketplace" and "how to source AOG parts" are queries that AI answers — and the answer either includes or excludes PartsBase.

**The Profound strategy:**
1. Establish baseline: what does ChatGPT say when asked "best aviation parts locator" or "how to source certified aircraft parts"?
2. Identify the content gaps: what publications, topics, and questions are shaping the AI's answer?
3. Produce authoritative content on those topics: AOG sourcing guides, condition code explainers, ILS vs. PartsBase comparisons
4. Track share of AI-generated answers over time in Profound dashboard

**Why this matters for the Rodrigo meeting:** AEO is a 6–18 month play. Starting it at Day 60 means PartsBase captures answer-engine visibility before competitors do. ILS is legacy — they almost certainly haven't started AEO work. This is a first-mover window.

---

## Board-Ready Marketing Section (Draft)

*Use this framing for the first board/leadership update after the program launches*

```
PIPELINE & ACQUISITION
Marketing-sourced pipeline this period: $[X] across [X] active deals.
Coverage ratio: [X]× quota. MQLs: [X] ([channel breakdown]).
Demo close rate: [X]%. New suppliers acquired: [X] at blended CAC of $[X].

UNIT ECONOMICS (as of 2026-05-27 · Amelia-verified)
LTV:CAC: 365–490× (new cohort 365×, active base 490×). CAC payback: 1.2 months (at $300 CAC target).
Magic Number: ~29:1 (target >0.75 — massively above threshold). NDR: ~96.5% (target >110% — WATCH).
ARPA: new cohort $342/mo, active base $460/mo — mix shift diagnosed, not price erosion.

GTM EFFICIENCY
Magic Number 29:1 means we are massively underinvesting in S&M relative to unit economics.
Board decision needed at Day 90 (Sep 1): approve S&M budget increase. 90-day actuals will make the case.
```

---

## ARPA Gap Diagnosis — Completed 2026-05-27

**Question:** Why is new cohort ARPA ($342/mo) 26% below active base ($460/mo)?

**Method:** Amelia MCP query of `crm_subscription_order_item` — SKU-level breakdown of New vs Renew orders, Jan 2025–May 2026.

**Verdict: Mix shift. Not price erosion.**

### Driver 1 — BAS-001 User License base pricing (secondary)
| Segment | Avg Monthly Price |
|---|---|
| New orders | $73.90/mo |
| Renewal orders | $118.29/mo |
| Gap | $44.39/mo (+60%) |

Renewals are on older contracts with annual price escalation. New customers start at a lower entry price. This is **pricing architecture, not discounting** — same SKU, different tenure. Fix: review entry-level pricing or tighten escalation clauses.

### Driver 2 — Add-on penetration gap (primary)
| Add-on | New Penetration | Renewal Penetration | Gap |
|---|---|---|---|
| BAS-009 Online Inventory Management | 23% | 61% | 38pp |
| BAS-003 Premium US Search | 10% | 26% | 16pp |
| BAS-005 Batch Search Manager | 0.8% | 9.4% | 8.6pp |
| BAS-007 Premium FAA PMA Search | 24% | 31% | 7pp |

New customers have not yet adopted the add-ons that existing customers have accumulated over time. **This is a lifecycle maturity gap, not price erosion.** ARPA naturally expands as customers age — the question is how to accelerate it.

### Implications for GTM
1. **Good news:** ARPA compression risk is lower than feared. The base product is not being discounted.
2. **Opportunity:** If new cohort BAS-009 penetration reaches 40% (vs current 23%), estimated +$23K/mo MRR from add-on expansion in new accounts.
3. **Mechanism:** HubSpot upgrade trigger (Day 30–60 build) — flag accounts below 30% add-on adoption at 90 days and route to CS for guided upsell.
4. **Onboarding priority:** Include BAS-009 (Inventory Management) in every new account onboarding checklist. Current 23% adoption after full contract cycle signals it's not being demo'd or surfaced at signup.

---

## Priority Action Items

| Action | Owner | Deadline | Blocking |
|---|---|---|---|
| ~~ARPA gap diagnosis~~ | ~~Dan~~ | ~~Day 10~~ | ✅ Complete — mix shift confirmed, BAS-009 penetration gap |
| Confirm gross margin % with finance | Dan → Finance | June 1 | Promotes LTV:CAC from 🟡 to 🟢 |
| Fix GA4 SPA tracking | Dan | Day 7 (June 9) | All conversion data |
| Launch Vector pixel | Dan | Day 14 (June 16) | Visitor de-anon |
| HubSpot CRM live — 6,695 contacts migrated | Dan | Day 30 (July 2) | Pipeline visibility |
| First Clay outbound sequence — T1 ICPs (MRO, OEM, Contract Mfr) | Dan | Day 30 | Lowest-CAC channel |
| HubSpot upgrade trigger — BAS-009 < 30% adoption → CS route | Dan | Day 60 (Aug 1) | NDR fix |
| ILS battlecard delivered to sales team | Dan | Day 30 | Sales enablement |
| First monthly RevOps report with actuals | Dan | July 1 | Forecast accuracy |
| Day 90 budget pitch deck — Magic Number 29:1 case for Rodrigo | Dan | Day 60 → present Day 90 | S&M budget increase |

---

*Created: May 2026 · Last updated: 2026-05-27 · PartsBase CMO Strategy*
*Confidence: 🟢 Active customers, ARR, ARPA, churn — Amelia-verified. 🟡 LTV:CAC — awaiting gross margin confirmation from finance. 🟡 Channel CAC targets — estimated, validate at Day 45 with first actuals.*
