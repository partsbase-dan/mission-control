# PartsBase — Campaign Analytics Framework

**Purpose:** Attribution modeling, funnel analysis, and campaign ROI calculation for the PartsBase demand generation program  
**Channels:** Google Search, LinkedIn Ads, Email Nurture, Organic/SEO, Retargeting, Direct  
**Attribution model:** W-Shaped (40/20/40 — first touch / lead creation / opportunity creation)  
**Date:** May 2026  

---

## How This Framework Is Used

Three Python scripts (from the campaign-analytics skill) analyze JSON data files against this framework. Once real campaign data is live in HubSpot and GA4, these inputs get populated with actuals and the scripts produce attribution tables, funnel drop-off analysis, and ROI benchmarks.

Run sequence:
```bash
# From scripts/ directory
python scripts/attribution_analyzer.py resources/campaign-data/journey-data.json --model position-based
python scripts/funnel_analyzer.py resources/campaign-data/funnel-data.json
python scripts/campaign_roi_calculator.py resources/campaign-data/roi-data.json
```

---

## Part 1 — Attribution Model Configuration

### Recommended Model: Position-Based (W-Shaped)

**Rationale for PartsBase:**
- Aviation parts buyers have multi-touch journeys: they discover PartsBase via Google, get remarketed on LinkedIn, and convert after reading a nurture email or revisiting the pricing page
- Last-click would over-credit Google Search (the closer) and under-credit LinkedIn (the introducer)
- First-click would over-credit organic and under-credit the conversion-triggering email
- W-Shaped (40% first touch / 20% middle / 40% last touch) matches a hybrid Google + LinkedIn + email motion where all three matter

**Lookback window:** 90 days (aligns with aviation procurement cycle — budgets move quarterly)

**Conversion event:** `demo_requested` OR `membership_purchase_completed` (HubSpot: deal created)

### Secondary Models to Run Alongside

Always compare at least 3 models to identify channel bias. Run:

1. **Position-Based (primary)** — 40/20/40
2. **Time-Decay** — half-life: 14 days (aviation sales cycle is longer than typical SaaS)
3. **Linear** — equal credit to all touchpoints (good sanity check)

If Google Search dominates under last-click but drops significantly under time-decay or linear, that's a signal that Google is the closer but not the initiator — LinkedIn and content are doing more work than last-click reports suggest.

### Channel Mapping

| GA4 Source/Medium | Attribution Channel | HubSpot Campaign |
|---|---|---|
| google / cpc | Google Search (Paid) | q3-2026-google-* |
| linkedin / paid-social | LinkedIn Ads | q3-2026-linkedin-* |
| google / display | Google Display / Retargeting | q3-2026-google-visitors-retarget |
| email / email | Email Nurture | q3-2026-email-* |
| google / organic | Organic Search | (no UTM) |
| direct / none | Direct | (no UTM) |
| partner / referral | Partner / PBExpo | q3-2026-pbexpo-* |

---

## Part 2 — Funnel Architecture

### PartsBase Supplier Acquisition Funnel

```
Stage 1: Awareness
  └── LinkedIn impressions, Google impression share, organic search visibility
  └── Metric: Impressions, reach, branded search volume

Stage 2: Engagement (Interest)
  └── Site visit, /pricing page visit, /demo page visit
  └── Metric: Sessions from paid channels, /pricing page views

Stage 3: Lead (MQL)
  └── Demo form submitted, gated content downloaded, or lead score ≥ 40
  └── Metric: MQLs / week (target: 8–12 at month 3)

Stage 4: Qualified (SQL)
  └── Demo booked, or lead score ≥ 70, or AE assigned
  └── Metric: SQLs / month (target: 6–8 at month 3)

Stage 5: Opportunity
  └── Demo completed, proposal sent
  └── Metric: Opportunities created / month

Stage 6: Customer
  └── Membership purchase completed ($299)
  └── Metric: New suppliers / month, MRR added
```

### Funnel Data File — Baseline Template

Save actuals to `resources/campaign-data/funnel-data.json` monthly:

```json
{
  "funnel": {
    "period": "2026-06",
    "stages": [
      "Impressions",
      "Site Sessions (Paid)",
      "/demo Page Views",
      "MQLs (Demo Forms + Scored Leads)",
      "SQLs (Demo Booked)",
      "Opportunities",
      "Customers"
    ],
    "counts": [0, 0, 0, 0, 0, 0, 0],
    "notes": "Replace zeros with actuals from GA4 + HubSpot. Pull impressions from Google Ads Manager + LinkedIn Campaign Manager."
  },
  "segments": [
    {
      "name": "Google Search",
      "stages": ["Impressions", "Site Sessions", "/demo Views", "MQLs", "SQLs", "Opps", "Customers"],
      "counts": [0, 0, 0, 0, 0, 0, 0]
    },
    {
      "name": "LinkedIn Ads",
      "stages": ["Impressions", "Site Sessions", "/demo Views", "MQLs", "SQLs", "Opps", "Customers"],
      "counts": [0, 0, 0, 0, 0, 0, 0]
    },
    {
      "name": "Email Nurture",
      "stages": ["Sends", "Opens", "Clicks", "MQLs", "SQLs", "Opps", "Customers"],
      "counts": [0, 0, 0, 0, 0, 0, 0]
    }
  ]
}
```

### Target Conversion Rates by Stage

| Stage Transition | Target Rate | Notes |
|---|---|---|
| Impressions → Sessions | 2–5% CTR | Google Search benchmark for aviation B2B |
| Sessions → /demo Page Views | 10–20% | Sessions that reach the conversion page |
| /demo Views → MQL (form submit) | 8–15% | B2B landing page benchmark |
| MQL → SQL | >15% | SDR qualification gate |
| SQL → Opportunity | >60% | Demo completion rate |
| Opportunity → Customer | 20–35% | Closing rate (validate with sales) |
| **End-to-end (Impression → Customer)** | **0.01–0.05%** | **Typical B2B paid channel** |

### Bottleneck Alert Rules

The funnel analyzer auto-flags the largest drop-off stage. For PartsBase, the most likely bottlenecks are:

1. **Sessions → /demo page views (<10%)** — indicates homepage/search result pages are not routing visitors to the conversion page. Fix: stronger CTAs on homepage and pricing page.
2. **/demo views → MQL form submit (<8%)** — the /demo page itself is the leak. Run the CRO audit first.
3. **MQL → SQL (<15%)** — lead quality is low, or SDR response time is >4 hours. Check lead scoring thresholds and SDR SLA.

---

## Part 3 — Campaign ROI Baseline

### Target Metrics (Month 3 Steady State)

| Metric | Target | Notes |
|---|---|---|
| Monthly budget | $17,500 | Full deployment at month 3 |
| Blended CAC | <$300 | Across all paid channels |
| Google Search ROAS | 2–4× | Assumes $299 membership; needs LTV framing for pipeline |
| LinkedIn CPL | <$150 | Per MQL |
| Email CPL | <$30 | Lowest CAC channel at scale |
| MQLs / month | 35–50 | Month 3 target |
| SQLs / month | 6–8 | At 15% MQL→SQL rate |
| New customers / month | 2–4 | At 25–35% SQL→close |
| Revenue / month (new) | $600–$1,200 | At $299/membership |

**Important:** The $299 membership is the initial conversion, not the full LTV. Attribution should also track pipeline influence for multi-seat or enterprise deals that start with a demo.

### ROI Data File — Baseline Template

Populate `resources/campaign-data/roi-data.json` monthly from GA4 + Google Ads Manager + LinkedIn Campaign Manager:

```json
{
  "period": "2026-06",
  "campaigns": [
    {
      "name": "q3-2026-google-all-brand",
      "channel": "google_search",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Brand campaign — expect highest CTR, lowest CPC, highest CVR"
    },
    {
      "name": "q3-2026-google-all-competitor",
      "channel": "google_search",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Competitor keywords: ILS aviation parts, aircraft parts locator"
    },
    {
      "name": "q3-2026-google-mro-solution",
      "channel": "google_search",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Solution keywords: aviation parts marketplace, aircraft parts supplier directory"
    },
    {
      "name": "q3-2026-linkedin-procurement-awareness",
      "channel": "linkedin",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Top-of-funnel awareness to MRO/procurement personas"
    },
    {
      "name": "q3-2026-linkedin-mro-demo",
      "channel": "linkedin",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Lead gen campaign — LinkedIn Lead Gen Forms or /demo landing page"
    },
    {
      "name": "q3-2026-google-visitors-retarget",
      "channel": "google_display",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "Retargeting site visitors who did not convert"
    },
    {
      "name": "q3-2026-email-mql-nurture1",
      "channel": "email",
      "spend": 0,
      "revenue": 0,
      "impressions": 0,
      "clicks": 0,
      "leads": 0,
      "customers": 0,
      "notes": "5-touch nurture sequence for MQLs. Track opens/clicks/conversions in HubSpot."
    }
  ]
}
```

### Industry Benchmarks (Aviation B2B Reference)

| Channel | CTR Benchmark | CPC Benchmark | CPL Benchmark | CVR Benchmark |
|---|---|---|---|---|
| Google Search — Brand | 8–15% | $1–3 | $20–60 | 5–10% |
| Google Search — Competitor | 3–6% | $4–10 | $80–150 | 2–5% |
| Google Search — Solution | 2–4% | $3–8 | $100–200 | 2–4% |
| LinkedIn — Awareness | 0.3–0.6% | $6–12 | $120–200 | 0.5–1.5% |
| LinkedIn — Lead Gen Form | 0.5–1.2% | n/a | $80–160 | 8–15% (of clicks) |
| Google Display / Retargeting | 0.1–0.3% | $0.5–2 | $50–120 | 0.5–2% |
| Email — Nurture | 20–30% open | n/a | $20–50 | 2–5% clicks |

*Source: B2B SaaS + industrial/manufacturing benchmarks. Aviation-specific data is limited — track your own history first.*

---

## Part 4 — Attribution Journey Data

### Journey Data File — Baseline Template

Once HubSpot is live and UTMs are flowing, export customer journeys to `resources/campaign-data/journey-data.json`:

```json
{
  "journeys": [
    {
      "journey_id": "example-j1",
      "touchpoints": [
        {
          "channel": "google_search",
          "campaign": "q3-2026-google-all-competitor",
          "timestamp": "2026-06-01T10:00:00",
          "interaction": "click",
          "utm_source": "google",
          "utm_medium": "cpc",
          "utm_campaign": "q3-2026-google-all-competitor"
        },
        {
          "channel": "linkedin",
          "campaign": "q3-2026-linkedin-procurement-awareness",
          "timestamp": "2026-06-05T14:30:00",
          "interaction": "impression"
        },
        {
          "channel": "email",
          "campaign": "q3-2026-email-mql-nurture1",
          "timestamp": "2026-06-08T09:15:00",
          "interaction": "click"
        }
      ],
      "converted": true,
      "revenue": 299.00,
      "conversion_event": "membership_purchase_completed"
    }
  ]
}
```

### Exporting Journey Data from HubSpot

Once HubSpot is live with UTM tracking enabled:

1. **Contacts → All Contacts** → Filter by Lifecycle = Customer + Create Date = [period]
2. Export fields: Contact ID, First UTM Source/Medium/Campaign, Last UTM Source/Medium/Campaign, First Conversion Date, Deal Create Date, Deal Amount
3. For multi-touch journeys, use HubSpot's Attribution Report (Revenue Attribution → Multi-touch) to export touchpoint data
4. Transform to the journey JSON schema above (a script can handle this — add to `scripts/` when HubSpot is live)

---

## Part 5 — Weekly Analytics Cadence

### Weekly Review Checklist (Every Monday)

Pull from: GA4 → Google Ads Manager → LinkedIn Campaign Manager → HubSpot

| Metric | Source | Alert Threshold |
|---|---|---|
| MQLs this week | HubSpot | <2 (month 1), <8 (month 3) → investigate |
| Demo form submissions | GA4 (`demo_requested` event) | Cross-check with HubSpot MQL count |
| Google Search CTR | Google Ads | <2% → review ad copy |
| Google Search CVR | Google Ads / GA4 | <2% → review landing page |
| LinkedIn CPL | LinkedIn Campaign Manager | >$200 → review targeting or creative |
| Blended CAC | Manual calc: Total spend / New customers | >$300 → audit channel mix |
| /demo page CVR | GA4 | <6% → escalate CRO audit |
| HubSpot Score distribution | HubSpot | If <20% of MQLs reach SQL → fix scoring |

### Monthly Deep Dive (Last Friday of Month)

1. Run all 3 analytics scripts with fresh data files
2. Compare attribution models — flag if position-based and time-decay diverge >20% on a channel
3. Identify biggest funnel bottleneck (highest absolute drop-off stage)
4. Budget reallocation decision: channels with ROAS <2× and no improving trend → cut or restructure
5. Update `CoWork/dashboard-state.json` with latest metrics
6. Prepare brief for Rodrigo: MQLs / SQLs / CAC / pipeline sourced / one key decision needed

### Attribution Report — Month 3 Review Questions

By month 3, ask:
- Which channel has the highest first-touch share? (This is your awareness engine — protect its budget)
- Which channel has the highest last-touch share? (This is your conversion engine — watch its efficiency)
- Which channel disappears in last-touch but appears prominently in position-based? (This is your under-credited middle — LinkedIn is the usual culprit)
- What is the average number of touchpoints before a demo request? (This informs how long the nurture sequence needs to be)
- Which content asset (AOG checklist, sourcing guide) appears most in converting journeys?

---

## Part 6 — AOG and High-Intent Signal Tracking

AOG events (`aog_inquiry`) represent the highest-urgency buyer signal in aviation. These should be analyzed separately from standard funnel metrics.

### AOG Analytics Workflow

1. **GA4:** `aog_inquiry` event fires → triggers HubSpot workflow → Slack/email alert to sales within 5 minutes
2. **Report:** Weekly count of AOG inquiries, channel source, and same-day response rate
3. **Attribution:** AOG contacts should be flagged in HubSpot (custom property: `is_aog_inquiry = true`) so they can be excluded from standard CAC calculations or tracked separately

### Search No Results Tracking

`search_no_results` events (part searches returning zero results) are demand signals for supplier acquisition.

**Weekly report to supplier acquisition team:**
- Top 10 search terms with no results this week
- ATA codes with highest no-result volume
- Cross-reference against existing supplier inventory to identify gaps

This data should feed directly into the Clay outbound workflow: identify suppliers who carry those parts, enrich via Clay, push to HubSpot as outbound targets.

---

## Data Directory Structure

```
resources/campaign-data/
├── journey-data.json          ← Multi-touch journey data (attribution analyzer input)
├── funnel-data.json           ← Stage-by-stage funnel counts (funnel analyzer input)
├── roi-data.json              ← Campaign spend/revenue/leads (ROI calculator input)
├── funnel-data-2026-06.json   ← Archived monthly snapshots
├── roi-data-2026-06.json
└── README.md                  ← Notes on data sources and export procedures
```

Create this directory and seed with blank templates. Populate with actuals once HubSpot + GA4 are live and the SPA tracking fix is deployed.

---

## Dependencies Before Running Analysis

| Prerequisite | Status | Blocking |
|---|---|---|
| GA4 SPA History Change trigger fix | 🔴 Not done — Day 7 target | All GA4 event data unreliable until fixed |
| UTM parameters flowing into HubSpot | ⏳ HubSpot onboarding | Journey attribution data unavailable |
| HubSpot Attribution Reports enabled | ⏳ HubSpot onboarding | Multi-touch journey export unavailable |
| Google Ads + LinkedIn conversion tags | 🔴 Needs deployment | Campaign-level CVR data missing |
| `demo_requested` server-side event | ⏳ After SPA fix | Demo conversion data may be undercounted |

**The funnel analyzer can run immediately** with manually estimated counts as a baseline.  
**The attribution and ROI analyzers need 30+ conversions** before the data is statistically meaningful — set a reminder to run them at Day 45.

---

*Framework: May 2026 · PartsBase campaign analytics · Confidence: 🟢 Framework verified / 🟡 Benchmark data requires actuals at Day 45+*
