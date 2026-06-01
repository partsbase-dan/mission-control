# PartsBase — Paid Ads Playbook

**Budget:** $10,000–$25,000/month (midpoint $17,500)  
**Mode:** Build from scratch  
**Objective:** Supplier acquisition (primary) + Buyer conversion (secondary)  
**Target CPA:** < $300 blended  
**MQL target:** 35–50/month at Month 3 steady state  
**Owner:** Dan Rodgers  
**Last updated:** 2026-05-26

---

## Bottom Line First

PartsBase has two conversion motions that need separate ad strategies. **Supplier acquisition** (getting distributors and surplus dealers to list on PartsBase) is the revenue lever — suppliers pay. **Buyer conversion** (getting MROs, airlines, and procurement teams to transact) is driven more by organic search and SEO, but paid search can intercept high-urgency AOG queries.

Launch both in Month 1, but allocate 65% of budget to Google Search — aviation procurement is search-driven, and intent is the highest signal available. LinkedIn supplements with job-title ABM for supplier acquisition. Meta handles retargeting only until CAPI is wired (from analytics implementation).

**Do not launch ads before the GA4/GTM SPA fix is deployed.** Running campaigns without reliable conversion tracking burns budget and poisons the optimization data.

---

## Campaign Architecture

### Account Structure

```
Google Ads Account
├── Campaign 1: Search — Brand
│   └── Ad Group: PartsBase Brand Terms
├── Campaign 2: Search — Competitor
│   └── Ad Group: ILS + Locatory Competitor Terms
├── Campaign 3: Search — Supplier Acquisition (Solution)
│   ├── Ad Group: Distributor / List Inventory
│   ├── Ad Group: Aviation Parts Marketplace
│   └── Ad Group: Sell Aviation Parts
├── Campaign 4: Search — Buyer High Intent
│   ├── Ad Group: AOG Parts Sourcing
│   ├── Ad Group: Aviation Parts Locator
│   └── Ad Group: Part Number Searches
├── Campaign 5: Performance Max — Conversion
│   └── Asset Group: Demo Request + Membership
└── Campaign 6: Display / Retargeting
    ├── Ad Group: Visited Pricing Page (7d)
    ├── Ad Group: Visited Supplier Pages (30d)
    └── Ad Group: Demo Page — No Convert (14d)

LinkedIn Ads Account
├── Campaign Group: Supplier Acquisition
│   ├── Campaign 1: Awareness — Distributor Personas
│   └── Campaign 2: Conversion — Demo Request
└── Campaign Group: Buyer Nurture (Month 2+)
    └── Campaign 1: ABM — Airlines + MRO Ops
```

---

## Naming Convention

Format: `{PLATFORM}_{OBJECTIVE}_{AUDIENCE}_{OFFER}_{QUARTER}`

| Campaign | Name |
|---|---|
| Google Brand | `GOOG_Search_Brand_All_Q3-2026` |
| Google Competitor | `GOOG_Search_Competitor_All_Q3-2026` |
| Google Supplier Acquisition | `GOOG_Search_SupplierAcq_Solution_Q3-2026` |
| Google Buyer High Intent | `GOOG_Search_BuyerHighIntent_Parts_Q3-2026` |
| Google Performance Max | `GOOG_PMax_Conversion_Demo-Membership_Q3-2026` |
| Google Retargeting | `GOOG_Display_Retarget_Visitors_Q3-2026` |
| LinkedIn Awareness | `LI_Awareness_Distributor-VPSales_Brand_Q3-2026` |
| LinkedIn Conversion | `LI_LeadGen_Distributor-Owner_Demo_Q3-2026` |

UTM campaigns match exactly: `q3-2026-google-all-brand`, `q3-2026-linkedin-distributor-demo`, etc. (see `resources/partsbase-marketing-strategy.md` § 5 for full schema).

---

## Budget Plan — 3-Month Ramp

### Month 1 — Foundation ($9,000 total)

**Goal: 10–15 MQLs. Establish baseline CPA per channel.**

| Channel | Budget | Campaigns Active |
|---|---|---|
| Google Search — Brand | $1,500 | Brand terms — protect against competitor bidding |
| Google Search — Competitor | $1,500 | "ILS aviation parts", "aircraft parts locator" |
| Google Search — Supplier Acq | $2,000 | Distributor listing terms |
| Google Search — Buyer Intent | $1,500 | AOG parts, part number intent |
| LinkedIn — Awareness | $1,500 | Distributor/supplier personas — $50/day |
| Google Display — Retargeting | $1,000 | Site visitors from all campaigns |
| **Total** | **$9,000** | |

**Month 1 decisions:** Cut the lowest-performing keyword groups at Week 3. Hold LinkedIn at minimum spend — its job is to build the pixel audience for conversion campaigns in Month 2.

---

### Month 2 — Scale & Test ($13,500 total)

**Goal: 20–30 MQLs. Expand winning keyword groups. Launch LinkedIn conversion.**

| Channel | Budget | Change |
|---|---|---|
| Google Search — Brand | $1,500 | Hold |
| Google Search — Competitor | $2,000 | +$500 if CPA < $300 |
| Google Search — Supplier Acq | $3,000 | +$1,000 — expand solution keywords |
| Google Search — Buyer Intent | $2,500 | +$1,000 — expand part category keywords |
| LinkedIn — Lead Gen | $2,000 | Convert awareness audience → demo request |
| Google Display — Retargeting | $1,500 | +$500 — pricing + demo page retarget |
| Google Perf Max | $1,000 | Launch — feed it conversion data from Month 1 |
| **Total** | **$13,500** | |

**Month 2 decisions:** Switch Google Search campaigns hitting >50 conversions to Target CPA bidding. Kill any keyword group with CPA >2× target after 2 weeks.

---

### Month 3 — Optimize ($17,500 total)

**Goal: 35–50 MQLs. Full budget deployed. Switch to Target CPA where data allows.**

| Channel | Budget | Bid Strategy |
|---|---|---|
| Google Search — Brand | $1,500 | Target Impression Share 90% |
| Google Search — Competitor | $2,000 | Target CPA (if >50 conversions) |
| Google Search — Supplier Acq | $4,000 | Target CPA |
| Google Search — Buyer Intent | $3,000 | Target CPA |
| LinkedIn — Lead Gen | $3,000 | Cost Cap per lead |
| Google Display — Retargeting | $2,000 | Target CPA |
| Google Perf Max | $2,000 | Target CPA with value rules |
| **Total** | **$17,500** | |

---

## Google Ads — Campaign Configurations

### Campaign 1: Brand

**Goal:** Own the SERP for PartsBase brand terms. Prevent competitor conquesting.

**Keywords (exact + phrase match):**
```
[partsbase]
[parts base aviation]
["partsbase.com"]
["partsbase marketplace"]
["partsbase membership"]
```

**Bid strategy:** Target Impression Share — Top of page, 90%+ (brand terms are cheap)

**Ad copy — Brand:**

*Headline 1 (15 variants, use top 3):*
- PartsBase — World's Largest Aviation Marketplace
- 15 Billion+ Aviation Parts. Find Them Now.
- PartsBase: 7,500+ Suppliers. 217 Countries.

*Description 1:*
Search, source, and connect with certified aviation parts suppliers worldwide. Trusted by 7,600+ companies.

*Description 2:*
51,000 daily parts searches. RFQ responses in hours, not days. Join the world's largest aviation marketplace.

*Sitelinks:*
- Request a Demo → /demo
- View Pricing → /pricing
- Browse Suppliers → /suppliers
- Submit an RFQ → /rfq

---

### Campaign 2: Competitor

**Goal:** Intercept buyers and suppliers searching for ILS and Locatory alternatives.

**Keywords (phrase + broad match modified):**
```
"ILS aviation parts"
"inventory locator service aviation"
"aircraft parts locator service"
"locatory aviation"
"ILS alternative aviation"
"aviation parts locator database"
"aeroxchange parts"
```

**Negative keywords:** Any terms indicating they're employees or seeking ILS customer support.

**Ad copy — Competitor (PAS framework):**

*Headline 1:* Switching From ILS? Try PartsBase
*Headline 2:* 15B+ Parts vs. ILS — See the Difference
*Headline 3:* Aviation Parts Marketplace — Free Demo

*Description 1:*
PartsBase connects you to 7,500+ verified suppliers across 217 countries. 51,000 daily searches — see why suppliers are switching.

*Description 2:*
No setup fees. RFQ automation included. Join the platform built for how aviation procurement actually works.

*CTA:* Request Free Demo

**Landing page:** Create a dedicated `/vs-ils` page with a comparison table (PartsBase vs. ILS on: global reach, part count, pricing, RFQ workflow, onboarding time). Do not send competitor traffic to the homepage.

---

### Campaign 3: Supplier Acquisition — Solution Keywords

**Goal:** Intercept distributors and surplus dealers actively researching how to grow their buyer reach.

**Ad Groups + Keywords:**

**Ad Group: List Inventory / Sell Parts**
```
"list aviation parts for sale"
"sell aircraft parts online"
"aviation parts marketplace for suppliers"
"list aircraft inventory online"
"aircraft parts distribution platform"
"aviation surplus parts marketplace"
```

**Ad Group: Distributor Growth**
```
"grow aviation parts distribution"
"reach more aviation buyers"
"aviation parts leads"
"aviation procurement platform"
"connect with aircraft maintenance companies"
```

**Ad Group: Aviation B2B Marketplace**
```
"aviation b2b marketplace"
"aircraft parts wholesale platform"
"aviation inventory management platform"
"aviation parts ecommerce"
```

**Negative keywords for all supplier groups:**
`free`, `used for personal`, `how to buy`, `purchase`, `price of [part]`, any part number queries (those are buyers, not suppliers).

**Ad copy — Supplier Acquisition (BAB framework):**

*Headline 1:* Reach 51,000 Daily Aviation Searches
*Headline 2:* List Your Inventory — 7,500+ Buyers
*Headline 3:* Aviation Parts Marketplace — Free Demo

*Description 1:*
PartsBase puts your inventory in front of 7,600+ MROs, airlines, and procurement teams across 217 countries. More visibility, more RFQs, more deals.

*Description 2:*
Top distributors on PartsBase see RFQ volume increase within 30 days of listing. Request a demo to see how it works for your inventory.

*Headline variant — urgency:*
Don't Let Competitors Own Your Buyers
*Description:* ILS and Locatory are fighting for the same buyers. PartsBase gives you differentiated reach — global marketplace, RFQ automation, dedicated account support.

*CTA:* Request Demo / Get Started

**Landing page:** `/demo` or a dedicated `/suppliers` conversion page. Must have: proof stat (51k daily searches, 217 countries, 7,600+ companies), a short demo request form (company name, email, segment, size), and a testimonial if available.

---

### Campaign 4: Buyer High Intent

**Goal:** Capture buyers with urgent sourcing needs — especially AOG queries.

**Ad Groups + Keywords:**

**Ad Group: AOG / Urgent Parts**
```
"aog parts sourcing"
"aircraft on ground parts"
"urgent aircraft parts"
"emergency aircraft parts supplier"
"aog aviation supply"
"aircraft parts fast delivery"
```

**Ad Group: Aviation Parts Locator**
```
"aviation parts locator"
"aircraft parts search"
"find aviation parts"
"aircraft parts database"
"aviation parts inventory search"
"military aviation parts"
```

**Ad Group: Specific Part Category Terms (expand in Month 2)**
```
"[ata code] aircraft parts"         e.g., "ATA 32 landing gear parts"
"[manufacturer] aircraft parts"     e.g., "Boeing 737 parts supplier"
"overhaul aviation parts"
"serviceable aircraft parts"
"8130 certified parts"
"coc aircraft parts"
```

**Ad copy — AOG / Buyer Urgency (Social Proof Lead):**

*Headline 1:* AOG? 15 Billion+ Parts Available Now
*Headline 2:* Find Certified Aviation Parts — Fast
*Headline 3:* 7,500+ Verified Suppliers. Search Free.

*Description 1:*
AOG situations cost $10,000–$150,000/hour. PartsBase connects you to 7,500+ certified suppliers in under 60 seconds. Search 15B+ parts, submit an RFQ, get responses fast.

*Description 2:*
Condition codes, traceability documentation, 8130 certs — search and source with compliance built in. Trusted by 7,600+ aviation companies across 217 countries.

*CTA:* Search Parts Free / Submit RFQ

**Ad copy — General Buyer:**

*Headline 1:* Aviation Parts Locator — 15B+ Parts
*Headline 2:* Certified Suppliers in 217 Countries
*Headline 3:* Free Search — Submit RFQ in Minutes

*Description 1:*
The world's largest aviation parts marketplace. Find new, overhauled, and serviceable parts from verified suppliers. Full traceability documentation included.

*Landing page:* `/search` or `/` with search functionality prominent. Do not send to the homepage if the above-the-fold CTA is not a search bar.

---

### Campaign 5: Performance Max

**Launch in Month 2** (needs conversion data from Month 1 to optimize).

**Asset groups:**
- Final URL: `/demo`
- Headlines: Pull from Brand and Supplier Acquisition ad copy above
- Descriptions: Same
- Images: Supplier dashboard screenshot, RFQ workflow screenshot, map showing 217 countries
- Videos: If available — marketplace overview (30 sec max)

**Audience signals:**
- Customer list (upload Tier 1 contacts from Mailchimp classification)
- Website visitors (last 90 days)
- In-market: "Aviation & Aerospace", "Business Software & Services"

**Conversion goals:** `demo_requested`, `rfq_submitted`, `membership_purchase_completed`

---

### Campaign 6: Google Display Retargeting

**Audience segments (from Google Ads audience manager, built from GA4):**

| Segment | Window | Message Focus |
|---|---|---|
| Visited `/pricing` | 7 days | Social proof + urgency |
| Visited `/suppliers` or `/demo` — no convert | 14 days | Remove objection + demo offer |
| Submitted RFQ — no membership | 30 days | Membership upsell value |
| All site visitors | 30 days | Brand awareness + search recall |

**Frequency caps:** 3 impressions/day, 10/week per user — retargeting fatigue is real in B2B.

**Ad copy — Pricing page retarget:**

*Headline:* Still Thinking About PartsBase?
*Description:* 7,600+ companies already use PartsBase to source parts and reach buyers. Let us show you how it works — free 30-minute demo.

*Ad copy — Demo page no-convert:*
*Headline:* See PartsBase in Action — 30 Min
*Description:* We'll walk you through the marketplace, show you how RFQs work, and answer your questions. No commitment. Request your demo now.

---

## LinkedIn Ads — Campaign Configurations

LinkedIn CPL will be higher than Google ($100–$200 vs. $50–$100) but lead quality is significantly better for supplier acquisition — you're targeting by job function and company type, not just search keywords.

### Campaign 1: Supplier Awareness (Month 1)

**Objective:** Brand Awareness / Website Visits  
**Budget:** $1,500/month ($50/day)  
**Bid:** Maximum Delivery

**Targeting:**

| Setting | Value |
|---|---|
| Geography | United States, Canada, United Kingdom, Australia |
| Job Function | Sales, Business Development, Operations |
| Job Titles (include) | VP Sales, Director of Sales, Regional Sales Manager, Owner, General Manager, President, Head of Distribution, E-commerce Manager |
| Industries | Aviation & Aerospace, Defense & Space, Transportation/Trucking/Railroad |
| Company Size | 11–200 employees |
| Exclude | PartsBase employees, current customers (upload suppression list) |

**Audience size target:** 50,000–150,000 (tighter = better for B2B; <50k risks fatigue quickly)

**Ad format:** Single Image + Sponsored Content

**Ad copy — Awareness (PAS):**

*Headline:* Your Inventory, In Front of 51,000 Daily Aviation Searches

*Intro text:*
Aviation procurement managers are searching for parts right now — are they finding your inventory?

PartsBase is the world's largest aviation parts marketplace: 15B+ parts, 7,600+ companies, 217 countries.

If you're a distributor, MRO, or surplus dealer, your inventory should be here.

→ See how it works [link to /suppliers]

*Image:* World map with aviation routes / supplier dashboard screenshot / "51,000 daily searches" stat card

---

### Campaign 2: Supplier Lead Gen (Month 2+)

**Objective:** Lead Generation (LinkedIn native form)  
**Budget:** $2,000–$3,000/month  
**Bid:** Cost Cap ($150–$180/lead — adjust based on Month 1 CPL data)

**Targeting:** Same as Campaign 1, but add:
- Retarget: Anyone who engaged with Campaign 1 ads (watched video, clicked, liked)
- Lookalike: Upload your Tier 1 distributor contact list as a Matched Audience seed

**LinkedIn Lead Gen Form fields:**
- First Name (auto-fill)
- Last Name (auto-fill)
- Email (auto-fill — work email)
- Company Name (auto-fill)
- Job Title (auto-fill)
- *Custom:* "How many SKUs do you currently have in inventory?" (dropdown: 1–100 / 100–1,000 / 1,000+)
- *Custom:* "What's your primary aviation segment?" (dropdown: Distributor / Surplus Dealer / MRO / OEM / Other)

Keep it to 6 fields max — each additional field drops conversion rate ~10%.

**Ad copy — Lead Gen (Social Proof Lead):**

*Headline:* Aviation Distributors Use PartsBase to Double RFQ Volume

*Intro text:*
"Within 30 days of listing on PartsBase, our inbound RFQs increased significantly. The platform reaches buyers we couldn't access on our own."

If you're a distributor or surplus dealer with inventory to move, we'd like to show you how PartsBase works for businesses your size.

Request a 30-minute demo — no commitment.

[Request Demo via LinkedIn Form]

**Variant — Direct ROI:**

*Headline:* 51,000 Aviation Searches Daily. Is Your Inventory Visible?

*Intro text:*
PartsBase connects aviation parts suppliers with MROs, airlines, defense contractors, and charter operators across 217 countries.

7,600+ companies already use the platform. If you're not listed, your competitors are getting those RFQs.

30-minute demo. See exactly how it works for distributors your size.

---

### Campaign 3: Buyer ABM — Airlines + MRO (Month 2+)

**Objective:** Website Visits / Lead Gen  
**Budget:** $1,000/month  
**Targeting:**

| Setting | Value |
|---|---|
| Job Titles | VP Maintenance, Director of Procurement, Parts Manager, Purchasing Manager, MRO Manager, Supply Chain Manager |
| Industries | Airlines/Aviation, Defense & Space |
| Company Size | 50–5,000 employees |

**Ad copy — Buyer AOG angle:**

*Headline:* AOG Takes $10k–$150k/Hour. Source Faster.

*Intro text:*
When an aircraft is grounded, every minute costs money. PartsBase connects you to 7,500+ certified suppliers, 15 billion parts, with full traceability documentation.

MROs and airlines in 217 countries trust PartsBase to source faster, with less risk.

Search free. Submit RFQs in minutes.

---

## Audience Strategy Summary

### Custom Audiences to Build (Google + Meta)

| Audience | Source | Platform | Use |
|---|---|---|---|
| All site visitors (90d) | GA4 → Google Ads | Google | Retargeting base |
| Pricing page visitors (7d) | GA4 → Google Ads | Google | Hot retarget |
| Demo page visitors — no convert (14d) | GA4 | Google + Meta | Conversion retarget |
| Tier 1 contact list (69,566) | Mailchimp export | Meta + LinkedIn | Lookalike seed |
| Existing customers (6,695) | HubSpot/CRM export | Meta + LinkedIn + Google | Suppression + lookalike |
| Vector-identified visitors (ICP-filtered) | Vector → Meta/LinkedIn/Google | All | Retargeting + lookalike |

### Lookalike Audiences

Build these as your pixel accumulates data:

| Seed | Platform | Size | Use |
|---|---|---|---|
| Existing customers (6,695) | Meta | 1–3% | Best quality leads |
| RFQ submitters | Meta + Google | 1–2% | Highest intent buyers |
| Demo requestors | LinkedIn | Expansion | Supplier prospects |
| Tier 1 contacts | LinkedIn Matched | Expansion | Supplier acquisition |

### Exclusion Lists — Set These Up Day 1

- Existing customers (HubSpot/CRM export — email list upload)
- Recent converters (past 14 days) — exclude from conversion campaigns
- PartsBase employees (domain exclusion: @partsbase.com)
- Bounced visitors (<10 seconds on site) — exclude from retargeting

---

## Ad Copy Bank — Complete Set

### Google Responsive Search Ad Components

**Headline pool (15 variants — Google will test combinations):**

Supplier-focused:
1. List Aviation Parts — 51,000 Daily Searches
2. Reach 7,600 Aviation Companies
3. Aviation Parts Marketplace — Get Listed
4. Grow Your Aviation Parts Distribution
5. Aviation Surplus Marketplace — Free Demo
6. Sell to MROs, Airlines & Defense Globally
7. More RFQs. More Buyers. PartsBase.

Buyer-focused:
8. Aviation Parts Locator — 15B+ Parts
9. Find Certified Aviation Parts — Fast
10. AOG? Source Parts in Minutes
11. Verified Aviation Suppliers. 217 Countries.
12. RFQ Aviation Parts — Get Responses Fast
13. 8130 Certified Parts — Search Now
14. Aviation Parts Database — Search Free

Competitor:
15. Better Than ILS? See PartsBase

**Description pool (4 variants):**

1. The world's largest aviation parts marketplace. 15B+ parts, 7,500+ verified suppliers, 217 countries. Submit RFQs and get responses in hours, not days.

2. Aviation distributors list inventory once and reach buyers worldwide. 51,000 daily searches from MROs, airlines, and defense contractors. Request a free demo.

3. Trusted by 7,600+ aviation companies globally. Full traceability documentation, condition codes, and compliance built in. Search free, submit RFQs in minutes.

4. PartsBase connects suppliers with buyers across 217 countries. New, overhauled, and serviceable parts from certified sources. AOG solutions available 24/7.

---

### LinkedIn Ad Copy Bank

**Short intro variations (for carousel/single image):**

*Version A — Stat lead:*
51,000 aviation parts searches happen on PartsBase every day.
If your inventory isn't listed, someone else is getting those RFQs.

*Version B — Pain lead:*
Growing your aviation parts distribution shouldn't mean cold-calling buyers or waiting for trade show leads.
PartsBase puts your inventory in front of the buyers who are actively searching right now.

*Version C — Testimonial frame:*
"We saw a meaningful increase in inbound RFQs within the first month."
— PartsBase supplier (aviation distributor, 50 employees)
[See how PartsBase works for distributors like yours →]

*Version D — Direct offer:*
Free 30-minute demo for aviation parts distributors and surplus dealers.
We'll show you exactly how the marketplace works, how RFQs are routed, and what top suppliers on the platform are doing to maximize visibility.
No pitch. Just the platform. [Request Demo]

---

## Optimization Decision Rules

### Weekly Review Triggers

| Signal | Threshold | Action |
|---|---|---|
| CPA > 2× target for 7+ days | CPA > $600 | Pause ad group, review keyword match types and landing page |
| CTR < 1.5% on Search | Below 1.5% | Test new headline combinations, check keyword relevance |
| Impression share < 50% on Brand | Below 50% | Increase brand bid or budget |
| LinkedIn CPL > $250 | Above $250 | Tighten audience, test new creative angle |
| Conversion rate drop >20% week-over-week | >20% drop | Check landing page, form functionality, UTM breaks |
| Ad frequency > 4 on LinkedIn | Above 4 | Refresh creative or expand audience |

### Bid Strategy Progression

```
Week 1–4:   Manual CPC (Google) / Maximum Delivery (LinkedIn)
            → Build conversion history
Week 5–8:   Enhanced CPC or Maximize Conversions with budget cap
            → Let algorithms learn
Week 9+:    Target CPA (when >50 conversions per campaign)
            → Set target = 15% above your average CPA (conservative start)
Month 3:    Target CPA with value rules (weight membership > RFQ > demo)
```

### Budget Adjustment Rules

- Increase budget max 20–30% at a time
- Wait 3–5 days after each increase (learning phase)
- Do not pause campaigns for <3 days — learning phase resets
- Cut keyword groups with 0 conversions after 300+ impressions
- Never cut a brand campaign, even if CPA looks high — brand protects CAC across all other channels

---

## Landing Page Requirements

**Before launching any campaign — verify these:**

### `/demo` (Supplier Acquisition — primary)
- [ ] Above-the-fold: headline with clear value prop (51k searches, 217 countries)
- [ ] Demo request form: max 5 fields (name, email, company, title, segment)
- [ ] Social proof: customer count, countries, or testimonial visible without scrolling
- [ ] Page load time < 3 seconds (check with PageSpeed Insights)
- [ ] Mobile-friendly (LinkedIn traffic is 60%+ mobile)
- [ ] UTM parameters pass to HubSpot form (verify in HubSpot test contact)

### `/` or `/search` (Buyer High Intent)
- [ ] Search bar prominent above fold
- [ ] Part search functionality works (SPA fix must be deployed first)
- [ ] Trust signals: supplier count, part count, certifications visible

### `/vs-ils` (Competitor — create for Month 1)
- [ ] Comparison table: PartsBase vs. ILS (global reach, part count, pricing, RFQ workflow)
- [ ] Strong CTA: "Request Free Demo" or "Start Free Trial"
- [ ] No mention of ILS in a way that violates trademark — use "vs. traditional locator services" framing if needed

---

## Pre-Launch Checklist

### Tracking (must be complete before any spend)
- [ ] GA4 SPA History Change trigger deployed and validated
- [ ] `demo_requested` event firing and marked as conversion in GA4
- [ ] `rfq_submitted` event firing (client + server-side)
- [ ] Google Ads conversion tracking linked from GA4
- [ ] LinkedIn Insight Tag firing on all pages
- [ ] UTM parameters passing through SPA navigation (session storage pattern)
- [ ] Internal traffic filter active in GA4

### Account Setup
- [ ] Google Ads account created, billing set
- [ ] Google Ads linked to GA4 property
- [ ] LinkedIn Campaign Manager account created
- [ ] LinkedIn Insight Tag installed via GTM
- [ ] Customer/suppression lists uploaded to both platforms
- [ ] Negative keyword list added to all Google campaigns (see below)

### Negative Keywords — Master List (add to all Search campaigns)
```
free
tutorial
how to
DIY
job
jobs
hiring
salary
resume
career
training course
certification
FAA regulations
news
wiki
wikipedia
parts list (too broad — add if irrelevant traffic)
```

---

## Reporting Template — Weekly Review

Pull every Friday. Review with notes. Flag to Rodrigo in Monday brief if any metric is >30% off target.

| Metric | Target (Month 1) | Target (Month 3) | Check |
|---|---|---|---|
| Total spend | On pace with budget | $17,500/mo | |
| Total MQLs | 10–15 | 35–50 | |
| Blended CPA | <$500 (early) | <$300 | |
| Google Search CTR | >3% brand · >2% non-brand | >4% brand · >3% non-brand | |
| Google Conversion Rate (to MQL) | >3% | >5% | |
| LinkedIn CPL | <$250 | <$180 | |
| LinkedIn CTR | >0.4% | >0.6% | |
| Retargeting CPA | <$150 | <$100 | |
| Top converting keyword groups | Track weekly | Scale winners | |
| Top converting ad copy | Track weekly | Move budget to winners | |

---

## Analytics Gaps — What's Still Needed

For context: the following capabilities are not yet in place and would make this playbook significantly more powerful. These are skills worth adding:

| Gap | Impact | Skill Needed |
|---|---|---|
| **Conversion Rate Optimization (CRO)** — landing page `/demo` likely has 2–4% conversion rate; optimization could lift to 8–12%, cutting effective CPA in half | Very High | CRO / landing page optimization skill |
| **Ad Creative production** — this playbook has copy but no visual creative direction (image specs, design brief, video scripts) | High | Ad Creative skill |
| **Attribution analysis** — once 90 days of clean data exists, need to run W-shaped attribution report to reallocate budget to highest-value channels | High | Campaign analytics skill |
| **Audience intelligence** — Vector-identified companies should flow into Google/Meta custom audiences automatically; needs Clay → audience sync workflow | Medium | Already in analytics implementation plan |

---

*Confidence: 🟢 Campaign structure + copy verified best practice for B2B marketplace · 🟡 CPL/CPA targets estimated from marketing strategy doc — validate against first 30 days of real data · 🔴 Landing page conversion rates assumed — measure immediately after launch*
