# PartsBase — demand generation strategy

**Budget:** $10k–$25k/month · **Stage:** Starting from scratch · **Industry:** Aviation & aerospace B2B

---

## 1. Strategy overview

### Target KPIs

| Metric | Target |
|---|---|
| Monthly budget (midpoint) | $17,500 |
| Blended CAC | < $300 |
| MQL target (month 3 steady state) | 35–50 / month |
| MQL → SQL conversion rate | > 15% |
| SQLs at steady state | 6–8 / month |
| Pipeline velocity | < 60 days |

---

## 2. Channel mix & budget allocation

| Channel | Monthly budget | Priority | Expected SQLs/mo |
|---|---|---|---|
| Google Search | $6,500 | High | 12–15 |
| LinkedIn Ads | $5,000 | High | 6–8 |
| Content & SEO | $3,000 | Medium | 3–5 (compounding) |
| Retargeting (Google Display) | $2,000 | Medium | 2–3 |
| Partnerships / PBExpo | $1,000 | Low risk | 1–2 |

### Why this channel mix

- **Google Search first** — aviation parts procurement is search-driven. Buyers search for specific part numbers, condition codes, and AOG sourcing urgently. High-intent keywords convert at 3–7%.
- **LinkedIn for enterprise ABM** — targeting MRO operations directors, VP Procurement, and fleet managers at airlines, MRO shops, and OEMs (50–5,000 employees). Start at $50/day, scale 20%/week if CAC < $300.
- **SEO for compounding pipeline** — PartsBase has strong domain authority. A focused content program targeting AOG search terms, condition code guides, and parts sourcing keywords compounds over 6–12 months. Lowest long-term CAC ($50–150).

### Competitive positioning

- **Primary competitor: ILS (Inventory Locator Service)** — the two largest locator services in aviation. Differentiate on PartsBase's transactional marketplace (PartsStore), community (PBExpo), and scale (15B+ parts).
- **Secondary: Locatory.com** — strong EMEA presence, not a US priority.
- **Emerging: Rotabull** — multi-marketplace aggregator. More partner opportunity than threat.
- Competitor keyword bidding on "ILS aviation parts" and "aircraft parts locator" should be in month 1 Google campaign.

---

## 3. ICP & personas

### Buyer — MRO shop / airline ops (primary)

| Field | Detail |
|---|---|
| Title | VP Maintenance, Director Procurement, Parts Manager |
| Company | MRO shops, airlines, charter operators, 50–5,000 employees |
| Pain | AOG events cost $10k–$150k/hour — finding certified parts fast is mission-critical |
| Channel | Google Search (part number queries), LinkedIn |
| Message | Speed to sourcing, 15B+ parts, condition codes, audit trail |

### Seller — distributor / OEM (secondary)

| Field | Detail |
|---|---|
| Title | Sales Director, Head of Distribution, E-commerce Manager |
| Company | Parts distributors, OEM surplus, MRO providers |
| Pain | Inventory visibility, global buyer reach, RFQ volume |
| Channel | LinkedIn, industry press, PBExpo |
| Message | 7,500+ buyers in 200 countries, 51k daily searches, PartsStore listings |

---

## 4. 90-day ramp plan

### Month 1 — Foundation
**Target: 10–15 MQLs**

- UTM structure + HubSpot campaign tracking configured
- Google Search: brand + competitor campaigns live ($3k)
- LinkedIn: awareness campaign to MRO/procurement personas ($2k)
- Lead scoring defined: title, company size, engagement
- MQL → SQL SLA set: 4h SDR response

### Month 2 — Scale & test
**Target: 20–30 MQLs**

- Google Search: expand to solution + category keywords ($5k)
- LinkedIn: conversion campaign (demo request) live ($3k)
- Retargeting campaigns launch for site visitors
- First content piece: "AOG sourcing checklist" for gating
- Weekly CAC by channel review — cut worst performer

### Month 3 — Optimise
**Target: 35–50 MQLs**

- Full $17,500 budget deployed across all channels
- Switch Google to Target CPA after 50+ conversions
- A/B test LinkedIn creative: social proof vs ROI messaging
- SEO: 4 articles live, targeting BOFU keywords
- W-Shaped attribution report reviewed — reallocate budget

> **Risk:** If Google Search is the only live channel in month 1, any algorithm or auction shift is a business risk. Launch LinkedIn simultaneously even at minimal spend ($50/day) to build parallel data.

---

## 5. UTM structure & campaign naming conventions

### UTM parameter schema

| Parameter | Format | Required | Example values |
|---|---|---|---|
| `utm_source` | Platform name | Required | `google` `linkedin` `meta` `email` `partner` `pbexpo` |
| `utm_medium` | Channel type | Required | `cpc` `display` `paid-social` `email` `referral` `event` |
| `utm_campaign` | `{quarter}-{year}-{source}-{audience}-{objective}` | Required | `q3-2026-google-mro-brand` |
| `utm_content` | Creative variant | Recommended | `ad-a` `ad-b` `headline-aog` `email-1` |
| `utm_term` | Keyword (search only) | Search only | `aviation+parts+locator` `aog+parts+sourcing` |

### Campaign naming examples

| Channel | Campaign name |
|---|---|
| Google Search — brand | `q3-2026-google-all-brand` |
| Google Search — competitor | `q3-2026-google-all-competitor` |
| Google Search — solution | `q3-2026-google-mro-solution` |
| LinkedIn — awareness | `q3-2026-linkedin-procurement-awareness` |
| LinkedIn — demo | `q3-2026-linkedin-mro-demo` |
| Retargeting | `q3-2026-google-visitors-retarget` |
| Nurture email — sequence 1 | `q3-2026-email-mql-nurture1` |
| PBExpo event | `q3-2026-pbexpo-all-event` |

### Naming rules

1. Always lowercase, hyphens only — no spaces, underscores, or mixed case.
2. Quarter prefix is mandatory — enables clean HubSpot filtering by period.
3. Never use `utm_source=google` with `utm_medium=organic` — breaks HubSpot channel grouping. Organic Google traffic has no UTMs.
4. `utm_term` for paid search only — leave blank for LinkedIn and display.
5. Every campaign link in HubSpot emails, LinkedIn posts, and Google Ads must include `utm_campaign`.

### HubSpot UTM setup checklist

1. **Enable UTM tracking** — Settings → Tracking & Analytics → UTM parameters: ON
2. **Create campaigns** — Marketing → Campaigns → Create. One campaign per `utm_campaign` value, named identically.
3. **Verify channel grouping** — Reports → Traffic Analytics. Confirm Google CPC = Paid Search, LinkedIn = Paid Social, email = Email.
4. **Set attribution model** — Attribution → W-Shaped → 90-day lookback → conversion event = deal created.
5. **Validate end-to-end** — Submit a test form via UTM URL. Check contact record — all five UTM fields must be populated.

---

## 6. Lead scoring model

### Score thresholds

| Tier | Score range | Action |
|---|---|---|
| Cold | 0–39 | Nurture only. No SDR action. Long-term email sequence. |
| MQL | 40–69 | SDR reviews within 24h. Enrol in 5-touch sequence. |
| SQL | 70+ | AE notified immediately. Demo booked within 24h. |

### Demographic scoring — firmographic fit

| Criteria | Score |
|---|---|
| Job title: VP/Director of Maintenance, Procurement, or Operations | +20 |
| Job title: Parts Manager, MRO Manager, Supply Chain Manager | +15 |
| Job title: Procurement Coordinator, Buyer, Logistics Analyst | +8 |
| Company industry: Aviation / Aerospace / Defense / MRO | +15 |
| Company size: 50–5,000 employees | +10 |
| Company size: 10–49 employees (boutique MRO / charter op) | +5 |
| Company size: 5,000+ employees (airline / major OEM) | +5 |
| Personal / free email domain (gmail, yahoo, hotmail) | −10 |
| Industry outside aviation / aerospace / defense | −15 |

### Behavioural scoring — engagement signals

| Criteria | Score |
|---|---|
| Requested a demo | +40 (auto-SQL trigger regardless of total score) |
| Visited /pricing page (any visit) | +20 |
| Visited /pricing page 2+ times | +10 |
| Performed a part search while logged in / identified | +20 |
| Downloaded gated content (AOG checklist, sourcing guide) | +15 |
| Visited /partsstore or /sellers page | +10 |
| Attended PBExpo or webinar | +12 |
| Clicked a CTA in a marketing email | +8 |
| Opened a marketing email | +3 |
| Visited site once, single page, bounced | −5 |
| Unsubscribed from all email | −30 (disqualify from nurture) |

### Score decay rules

| Inactivity period | Penalty |
|---|---|
| 30 days no activity | −10 pts |
| 60 days no activity | −20 pts |
| 90 days no activity | Reset to 0, move to cold nurture |

> In HubSpot: set up a workflow triggered by "Last activity date is more than X days ago" to apply score adjustments automatically.

### HubSpot lead scoring implementation

1. **Enable scoring** — Contacts → Properties → HubSpot Score → Edit scoring criteria. Add each rule above using positive/negative attribute conditions.
2. **Create MQL workflow** — Trigger: HubSpot Score ≥ 40. Action: set Lifecycle Stage = MQL, notify SDR, enrol in 5-touch nurture sequence.
3. **Create SQL workflow** — Trigger: HubSpot Score ≥ 70 OR demo form submitted. Action: set Lifecycle Stage = SQL, create deal at "Demo Requested" stage, assign AE, send Slack alert.
4. **Create decay workflow** — Trigger: Last activity > 30 days AND Lifecycle = MQL. Action: subtract 10 from score. Clone for 60-day and 90-day variants.
5. **Validate** — Create 3 test contacts (cold/MQL/SQL). Confirm lifecycle updates, deal creation, and notifications fire correctly before going live.

### SQL handoff criteria

```
Required:
✅ Title: Director+ or procurement / ops authority
✅ Company: 50–5,000 employees, aviation / aerospace / defense
✅ Budget: $5k+ annual subscription intent
✅ Timeline: active sourcing need or within 90-day buying window
✅ Engagement: demo requested, pricing page visited 2×, or part search with account login
```

### SLA

| Handoff | Target |
|---|---|
| SDR responds to MQL | 4 hours |
| AE books demo with SQL | 24 hours |
| First demo scheduled | 3 business days |

---

## 7. Attribution model

**Recommended: W-Shaped (40/20/40)**

Gives credit to first touch (awareness), lead creation, and opportunity creation. Right for a hybrid motion where buyers research on Google, get nurtured via LinkedIn, and convert through a demo request.

**HubSpot setup:** Marketing → Reports → Attribution → W-Shaped → 90-day lookback → conversion event = deal created.

### Weekly metrics dashboard

| Metric | Target |
|---|---|
| MQLs / week | Start: 2–4 · Month 3: 8–12 |
| MQL → SQL rate | > 15% |
| Blended CAC | < $300 |
| Google Search CTR | 2–5% |
| LinkedIn CPL | < $150 |
| Pipeline velocity | < 60 days |
| Marketing-sourced pipeline | Track from day 1 |

---

## 8. Proactive flags

- **Single-channel dependency** → single-channel is a business risk. Diversify before algorithm changes or costs spike.
- **No lead scoring** → without scoring, sales wastes time on cold MQLs.
- **CAC exceeding LTV** → audit channel efficiency and cut worst performers before increasing spend.
- **No nurture for non-ready leads** → 80% of leads aren't ready to buy now. Without nurture they convert to a competitor later.
- **UTM parameters missing or inconsistent** → attribution breaks. Every campaign link must use the defined UTM structure.
- **Attribution model not set** → defaulting to last-touch misattributes awareness channels.

---

*Created: May 2026 · PartsBase demand generation — starting from scratch*
