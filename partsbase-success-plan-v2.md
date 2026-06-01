# PartsBase: Senior AI Engineer, Martech — 30 / 60 / 90 Day Plan

**Role:** Senior AI Engineer, Martech
**Company:** PartsBase Inc. — World's largest aviation parts marketplace
**Scale:** 7,600+ companies, 217 countries
**Motion:** Inbound-led, launching first outbound motion
**Ramp start:** May 18, 2026
**Execution Day 1:** June 2, 2026
**Plan owner:** Dan Rodgers
**Last updated:** 2026-05-27

---

## Mandate

Build the systems that power demand generation — not just implement tools, but wire together a stack that marketing, sales, and RevOps can actually use to grow revenue.

**Success is measured by:** Systems adopted · Workflows transformed · Revenue influenced
**Not measured by:** Tools implemented · Plans written · Meetings attended

Every build ties to a number: meetings booked, leads routed faster, pipeline influenced, sender reputation improved, or attribution made reliable.

---

## Ramp & Discovery: May 18 – May 30 ✅

The two-week ramp period was used for full-stack discovery, data analysis, and infrastructure setup. Execution begins June 2 on a cleared runway.

| Completed | Date | Output |
|---|---|---|
| Pre-start SEO audit | May 11 | partsbase.com 42/100 (Grade D). SPA rendering root cause identified. |
| Stack decisions confirmed | May 22 | HubSpot CRM + Marketing Hub, Clay, Vector — all locked, not under evaluation |
| Mailchimp audit | May 21 | Complaint rate 27–30% (6–7× threshold). 213k dead contacts. Suppression plan ready. |
| ORO × Mailchimp cross-reference | May 22 | 95k rows cross-referenced. Suppression list, 58,793 acquisition candidates, 88 anti-persona protects — all ready. |
| RevOps baseline | May 27 | $14.3M ARR confirmed. Active ARPU $187.85/mo, new-cohort ARPU $325.77/mo (+73%). LTV:CAC 61×, CAC payback 1.3 months. |
| ICP mismatch identified | May 27 | Airlines, Regional Airlines, Overhaul Shops classified T3 but are highest new-ARPU segments (2.5× T3 average). Reclassification required before outbound build. |
| Site-architecture audit | May 27 | 83 pages mapped, 3 orphaned routes. SPA routing = primary SEO constraint. |
| Skills + AI infrastructure | May 27 | Vetted-skills repo (partsbase-dan/vetted-skills, 177 skills) live. Mission Control OS operational. |

**Two open blockers entering execution:**
- 🔴 **GTM container access** — not yet granted. GA4 SPA fix pending Engineering/IT.
- 🔴 **Mailchimp suppression approval** — pending Rodrigo Garcia.

---

## Pre-Start Critical Finding

> ⚠️ **SEO Audit completed 2026-05-11 — before Day 1**
>
> partsbase.com scores **42/100 (Grade D)** on on-page SEO. Root cause: the site is a client-side rendered SPA. Every page delivers the same static HTML shell — no page-specific titles, no H1s, zero body copy for Google to index.
>
> **Why this matters beyond SEO:** The SPA issue breaks GA4 event tracking on route changes, which breaks HubSpot lead scoring, which breaks attribution before it's even built.
>
> **Fix:** GTM History Change trigger. Deployable in days. Unblocks the entire tracking stack.

---

## The Core Digital Funnel

This is the organizing principle for the first 90 days. Everything we build either enables this flow or makes it smarter.

```
Paid Ad / Organic
      ↓
  partsbase.com  (GA4 + GTM — must be firing correctly first)
      ↓
 Vector (de-anonymize ~37% of visitors, ICP-filter, export to ad platforms)
      OR
 Form Submission (demo request, RFQ, contact)
      ↓
  Clay (enrich company + contact data, segment, AI-personalize)
      ↓
HubSpot CRM + Marketing Hub (source of truth — score, route, nurture, report)
```

Getting this flow from broken to fully operational is the 30/60/90 story.

---

## Platform Migration: Parallel Workstream

The HubSpot migration is its own project running alongside the funnel build. It cannot block the funnel work, but it must land before email campaigns go live.

| From | To | Status |
|---|---|---|
| ORO CRM | HubSpot CRM | ⏳ Not started — IT approval and vendor contract required |
| Mailchimp | HubSpot Marketing Hub | ⏳ Pending — sender rep remediation required before cutover |

**Non-negotiables before Mailchimp cutover:**
- Sender reputation remediation completed (list hygiene, domain warm-up)
- All active Mailchimp lists mapped and cleaned in HubSpot
- CookiePro consent flows validated for EU contacts (GDPR — 217 countries)

---

## RAG Status

| Workstream | Status | Notes |
|---|---|---|
| Tracking & Analytics | 🔴 Critical | GTM SPA History Change fix — Week 1 of execution (by June 9). Blocked on container access. |
| Mailchimp Remediation | 🔴 Critical | Suppression of 213k dead contacts pending Rodrigo approval. |
| HubSpot CRM Migration | ⏳ Not started | IT approval + vendor contract required. Target: live by Day 30 (July 2). |
| HubSpot Marketing Hub | ⏳ Not started | Dependent on CRM live + sender rep remediation. |
| Vector (de-anonymization) | ⏳ Confirmed | Contract + onboard target: Week 2 (June 9+). |
| Clay (enrichment) | ⏳ Confirmed | POC target: Day 30 (July 2). |
| ICP Reclassification | 🔴 Urgent | Airlines, Overhaul Shops, Regional Airlines must move to T1 before outbound build. |
| Digital Funnel Flow | ⚪ Not started | Dependency: tracking fix first. |
| Profound (AEO) | ⚪ Not started | Target: Day 60 (Aug 1). |
| Email Campaigns (HubSpot) | ⚪ Not started | Dependency: Marketing Hub live. |
| Lead Scoring | ⚪ Not started | Dependency: HubSpot + GA4 data. |
| Outbound Motion | ⚪ Not started | Target: Day 90 (Sep 1). |
| SEO Content Engine | ⚪ Not started | Dependency: SPA fix. |
| Attribution Model | ⚪ Not started | Dependency: 90 days clean GA4 data. |

🔴 Blocked or at risk · 🟡 In progress · 🟢 On track · ⏳ Confirmed, not started · ⚪ Not started

---

## Day 1–30: Fix the Foundation

**Execution clock start:** June 2, 2026 · **Day 30:** July 2, 2026

**Theme:** Get visibility before building anything. Fix what's broken. Stand up the data infrastructure.

**The test:** By Day 30, can I see a visitor land on partsbase.com, identify who they are, enrich them, and get them into HubSpot?

### Week 1–2: Tracking Fix + ICP + Digital Audit (June 2–13)

**ICP Reclassification — do this before anything outbound (urgent)**

- [ ] Update `resources/icp-brief.md` and `memory/icp.md`: move Airlines, Regional Airlines, and Overhaul Shops from T3 → T1
- [ ] Update Clay table filter logic to target T1 (revised) before POC seeds are built
- [ ] Document rationale: new-cohort ARPU data ($520–$620/mo vs T3 average). This is the single biggest lever for outbound ROI.

**Tracking Fix (Critical — do this first)**

- [ ] Get GTM container access from Engineering/IT (Omar Servin or Sergio Corona)
- [ ] Confirm front-end framework with engineering (React / Next.js / Angular)
- [ ] Deploy GTM **History Change trigger** — fires `page_view` on every SPA route change
- [ ] Verify `page_title` and `page_location` populate correctly per route
- [ ] Validate UTM parameters persist across route changes (session storage pattern)
- [ ] Instrument key conversion events:
  - `rfq_submitted` — critical, must fire server-side too
  - `demo_requested`
  - `contact_supplier_clicked`
  - `part_search_performed`
  - `membership_signup_started`
  - `search_no_results` → feed weekly to supplier acquisition team
  - `aog_inquiry` → trigger immediate sales alert
- [ ] Validate in GA4 DebugView before calling done
- [ ] Set UTM naming convention and enforce with the team: `Q[N]-[YEAR]-[CHANNEL]-[TYPE]`

**Digital Spend Audit**

- [ ] Pull full GA4 historical data — traffic by channel, conversion rates, lead volume by source
- [ ] Audit all active paid digital channels and current spend levels
- [ ] Map campaign → UTM → GA4 → HubSpot attribution path (document what works, what's broken)
- [ ] Identify top-performing channels by lead volume and conversion rate
- [ ] Document baseline: where are we spending, what is it producing, what's the cost per lead today

**Deliverable:** "Here's where we stand on Day 14 (June 16) — what's tracking, what's broken, and what we're spending."

### Week 2–4: HubSpot Initiation + Vector + Clay Onboarding (June 9 – July 2)

**HubSpot CRM — Initiation only (Day 30 target: portal provisioned)**

HubSpot configuration, ORO migration, and form connections move to Day 31–60. Day 30 is the contracting and provisioning gate.

- [ ] Initiate IT approval with Omar Servin and vendor contract/onboarding with Sergio Corona
- [ ] Audit ORO data — contact quality, completeness, lifecycle stage consistency (informs migration, not a blocker)
- [ ] Start field mapping: ORO fields → HubSpot properties (document, don't import yet)
- [ ] Get one sales rep demoed on HubSpot — so adoption is not a surprise at Day 90

**Vector (Visitor De-anonymization)**

- [ ] Contract and onboard Vector (confirmed at $2,000/mo — Mark Lawry, Vector)
- [ ] Deploy Vector pixel via GTM
- [ ] Configure ICP filter: aviation industry, company size 10–200 employees, not current PartsBase customers
- [ ] Set up retargeting exports to Google / Meta / LinkedIn ad platforms
- [ ] Validate de-anonymization rate (target: ~37% of visitors identified)

**Clay Setup**

- [ ] Set up Clay workspace and connect data sources
- [ ] Configure enrichment waterfall: company → contact → email verification
- [ ] Build Clay → HubSpot push workflow (new enriched contacts auto-create or update records)
- [ ] Seed initial table with 100–200 aviation contacts — **weight toward Overhaul Shop + Regional Airline (newly T1) alongside MRO/Distributor**

**Day 30 Milestone Check-In (July 2):**

| Milestone | Target Date | Status |
|---|---|---|
| ICP model updated — Airlines, Overhaul Shops, Regional Airlines reclassified T1 | June 9 | ⏳ |
| GTM History Change deployed + validated in GA4 | June 9 | ⏳ (blocked on container access) |
| Digital spend audit delivered to Rodrigo | June 16 | ⏳ |
| Baseline funnel report (traffic, channels, CVR) | June 16 | ⏳ |
| HubSpot IT approval obtained + vendor contract signed | June 16 | ⏳ |
| Vector pixel live — visitors being identified | July 2 | ⏳ |
| Clay workspace live — enrichment running | July 2 | ⏳ |
| HubSpot portal provisioned — ORO field mapping documented | July 2 | ⏳ |
| Mailchimp suppression executed (pending Rodrigo approval) | July 2 | ⏳ (blocked on approval) |

---

## Day 31–60: Digital Funnel Live

**Day 31:** July 3, 2026 · **Day 60:** August 1, 2026

**Theme:** The core flow is operational. HubSpot is the system of record. First email campaigns go out.

**The test:** By Day 60, can I show Rodrigo an end-to-end report — ad spend → identified visitor → enriched contact → HubSpot pipeline → lead score?

### HubSpot CRM — Configuration (moved from Day 30)

- [ ] Configure HubSpot: contact records, company records, deal pipeline
- [ ] Define lifecycle stages: Subscriber → Lead → MQL → SQL → Opportunity → Customer
- [ ] Connect all web forms to HubSpot with proper field mapping
- [ ] Set MQL → SQL handoff SLA: SDR responds within 4 hours, AE books demo within 24 hours
- [ ] Begin ORO → HubSpot migration (clean records only — do not import garbage)

### Digital Flow: Full Integration

- [ ] Wire Vector output → Clay enrichment trigger (identified visitor auto-populates Clay table)
- [ ] Wire Clay enrichment → HubSpot (enriched contact pushed with segment tag and lead score inputs)
- [ ] Wire web form submissions → Clay enrichment → HubSpot (parallel path to Vector)
- [ ] Validate the full loop: ad click → landing → Vector ID or form → Clay enrich → HubSpot record
- [ ] Build HubSpot attribution report: W-shaped model (40% first / 20% middle / 40% last)

**Digital Flow is "live" when:** A visitor who clicks a Google ad lands on partsbase.com, gets identified by Vector (or submits a form), is enriched by Clay, and appears as a scored contact in HubSpot — without manual intervention.

### Profound (AEO — Answer Engine Optimization)

Profound (tryprofound.com) is a dedicated AEO platform — it tracks and improves PartsBase's visibility in AI-generated answers (ChatGPT, Perplexity, Gemini, Claude). This is an underinvested channel that compounds over time.

- [ ] Set up Profound account and connect partsbase.com
- [ ] Baseline: audit current AI answer visibility for aviation parts search queries
- [ ] Identify high-value AEO targets: part number searches, supplier lookups, AOG queries
- [ ] Implement Profound's structured data and content recommendations
- [ ] Establish monthly AEO visibility score baseline to track improvement

**Why now:** Most competitors are not focused on AEO yet. Early presence in AI answers is a durable advantage — this is how buyers will increasingly start supplier searches.

### HubSpot Marketing Hub (Mailchimp Replacement)

- [ ] Complete sender reputation remediation:
  - List cleaning and hygiene (remove unengaged, bounced, invalid addresses)
  - Domain authentication: SPF, DKIM, DMARC fully configured in HubSpot
  - Warm-up schedule: start at low volume, ramp over 4–6 weeks
- [ ] Migrate active Mailchimp lists → HubSpot (mapped, segmented, consent-verified)
- [ ] Decommission Mailchimp sends — HubSpot Marketing Hub becomes sole sender
- [ ] Build foundational email segments in HubSpot:
  - By aviation vertical (MRO, airline, overhaul shop, distributor, charter, regional airline)
  - By lifecycle stage (lead, MQL, customer)
  - By region (US, EU, Middle East, APAC)

### First Email Campaigns

- [ ] Design first campaign: supplier acquisition (target: T1 segments — MRO, Distributor, Overhaul Shop, Regional Airline not on PartsBase)
- [ ] Campaign structure: 3-email nurture sequence (problem → solution → proof)
- [ ] Personalization powered by Clay segment tags
- [ ] Set benchmark KPIs: open rate > 35%, click rate > 3%, reply/conversion > 1%
- [ ] Launch to a warmed segment of 500–1,000 contacts
- [ ] Track full attribution: email open → click → website visit → HubSpot activity

### Lead Scoring — Baseline

- [ ] Configure HubSpot lead scoring baseline (tune after 30 days of real data):
  - `rfq_submitted` → +30 pts
  - `demo_requested` → +30 pts
  - `pricing_page_viewed` → +15 pts
  - `part_search_performed` (3+ times) → +10 pts
  - Vector-identified (high ICP match) → +20 pts
  - Google Search organic → +15 pts
  - Email click → +10 pts
- [ ] Set MQL threshold: score > 75
- [ ] Wire MQL → sales alert automation in HubSpot

**Day 60 Milestone Check-In (August 1):**

| Milestone | Target Date | Status |
|---|---|---|
| HubSpot CRM configured — lifecycle stages, forms, deal pipeline live | Aug 1 | ⏳ |
| ORO → HubSpot migration in progress | Aug 1 | ⏳ |
| Digital funnel end-to-end operational | Aug 1 | ⏳ |
| Profound AEO baseline + recommendations | Aug 1 | ⏳ |
| HubSpot Marketing Hub live (Mailchimp decommissioned) | Aug 1 | ⏳ |
| First email campaign sent + results reported | Aug 1 | ⏳ |
| Lead scoring active and routing MQLs | Aug 1 | ⏳ |
| HubSpot attribution report live | Aug 1 | ⏳ |

---

## Day 61–90: Scale + Optimize

**Day 61:** August 2, 2026 · **Day 90:** September 1, 2026

**Theme:** The foundation is solid. Now we measure what's working and scale it.

**The test:** By Day 90, can marketing show Rodrigo a clear line from activity to pipeline?

### Outbound Motion: Clay + Claude API

**ICP targets (updated May 27):** T1 = MRO, Distributor, Overhaul Shop, Regional Airline, Airline. These are the highest new-ARPU segments by RevOps analysis. Sequences built for T1 first; T2/T3 secondary.

- [ ] Run full Clay enrichment on T1 targets: MRO, Distributor, Overhaul Shop, Regional Airline — not on PartsBase, 10–200 employees
- [ ] Add Claude API column for segment classification and personalized opening line generation
- [ ] Export Tier 1 (~40–60 contacts) to HubSpot sequence
- [ ] 5-step outbound sequence:
  - Day 0: AI-personalized email (Claude API on Clay output)
  - Day 2: LinkedIn connection request
  - Day 5: Follow-up email
  - Day 8: LinkedIn message (if connected)
  - Day 12: Final email
- [ ] Target KPIs: open rate > 35%, reply rate > 5%, meetings booked ≥ 2/week

### Lead Scoring Tuning

- [ ] Review 30 days of HubSpot data with sales team
- [ ] Calibrate MQL threshold against actual MQL → SQL conversion data
- [ ] Add aviation-segment scoring dimension (MRO, airline, overhaul shop, regional airline, distributor)
- [ ] Wire expansion scoring: accounts searching new part categories = upsell signal

### SEO Content Engine (Unblocked by Sprint 1 SPA Fix)

- [ ] Pull Google Search Console data — what is Google actually indexing now?
- [ ] Identify high-intent long-tail searches: part numbers, ATA codes, manufacturer names
- [ ] Build AI content pipeline: part category pages, ATA code guides, manufacturer spec pages
- [ ] Target: pipeline built and first 10 pages indexed by Day 90 — 50 pages is a Day 180 target
- [ ] Coordinate Profound AEO recommendations with SEO content calendar (shared signals)

### Email Campaign Optimization

- [ ] Review first campaign results against benchmarks
- [ ] A/B test subject lines and first-email CTAs
- [ ] Build second campaign: buyer-side nurture (MRO, airline, overhaul shop segments)
- [ ] Automate lifecycle nurture: new lead → MQL nurture sequence triggers automatically
- [ ] Build re-engagement campaign for unengaged contacts (60+ days no open)

### Revenue Operations Reporting

- [ ] Build weekly GTM report: pipeline sourced, pipeline influenced, closed-won (automated Monday delivery)
- [ ] Dashboard: CAC by channel, lead volume by source, MQL → SQL rate, meetings booked
- [ ] Present to Rodrigo: full funnel from digital spend → pipeline, with channel-level attribution

**Day 90 Milestone Check-In (September 1):**

| Milestone | Target Date | Status |
|---|---|---|
| Outbound motion: meetings booked ≥ 2/week | Sep 1 | ⏳ |
| Lead scoring MQL → SQL rate > 15% | Sep 1 | ⏳ |
| AI SEO content pipeline built + first 10 pages indexed | Sep 1 | ⏳ |
| Email campaigns: ≥ 2 active campaigns running | Sep 1 | ⏳ |
| Weekly GTM report automated | Sep 1 | ⏳ |
| Marketing attributing pipeline to channels | Sep 1 | ⏳ |
| HubSpot CRM — at least one sales rep actively logging activity | Sep 1 | ⏳ |

---

## Beyond 90 Days: Revenue Intelligence

*Prerequisite: 90 days of clean GA4 + HubSpot data (available ~December 1, 2026)*

- Full W-shaped attribution model: CAC by channel is real
- Customer health scoring: 6,357 existing accounts → retention and expansion signals ($10.5M upsell opportunity in legacy ARPU gap)
- Programmatic SEO for supplier profiles (template → unique indexed page per supplier)
- Optimizely A/B testing framework live
- Hotjar heat mapping on pricing and demo pages
- Marketing directly attributable to closed revenue — this is the budget defense number

---

## Tech Stack

### Active / Onboarding

| Layer | Tool | Status | Notes |
|---|---|---|---|
| CRM | ORO → HubSpot CRM | ⏳ Not started | IT approval + contract: July 2. Portal provisioned: July 2. CRM configured: Aug 1. |
| Email / MAP | Mailchimp → HubSpot Marketing Hub | 🔴 Emergency | Sender rep remediation in progress. Suppression pending Rodrigo approval. |
| Tracking | GA4 + GTM | 🔴 Broken → fixing | SPA History Change trigger — blocked on container access. Day 7 target: June 9. |
| Visitor De-anon | Vector | ⏳ Confirmed | $2k/mo, ~37% visitor ID rate, ICP filtering + ad retargeting. Onboard target: July 2. |
| Data Enrichment | Clay | ⏳ Confirmed | POC target July 2. Outbound backbone. T1 ICP filter updated before seeding. |
| AI Personalization | Claude API | ⏳ Phase 1 | Runs on Clay output for outbound sequences. |
| Compliance | CookiePro | ⏳ Phase 1 | GDPR/CCPA required — 217 countries. |
| AEO | Profound | ⏳ Phase 2 | Answer engine visibility tracking + optimization. Target: Aug 1. |
| Project Management | ClickUp | 🟢 Active | |

### Roadmap (Phase 2–3)

| Layer | Tool | Phase | Dependency |
|---|---|---|---|
| SEO | SEMrush + Google Search Console | Phase 2 | SPA fix first |
| Social Outbound | MeetAlfred | Phase 2 | Clay list ready |
| Experimentation | Optimizely | Phase 2 | 90 days clean data |
| UX Analytics | Hotjar | Phase 2 | — |
| Attribution | HubSpot + Looker Studio | Phase 3 | 90 days clean data |

---

## Program Budget (Estimates)

*Actuals to be confirmed with Sergio Corona during vendor onboarding. Total program cost required for CAC calculation at Day 90.*

| Tool | Est. Monthly Cost | Phase | Notes |
|---|---|---|---|
| Vector | $2,000 | Phase 1 | Confirmed — Mark Lawry |
| HubSpot CRM + Marketing Hub | TBD | Phase 1 | Enterprise tier TBD — get quote Week 1 |
| Clay | TBD | Phase 1 | POC pricing TBD |
| CookiePro | TBD | Phase 1 | GDPR/CCPA compliance |
| Profound (AEO) | TBD | Phase 2 | Quote needed |
| SEMrush | TBD | Phase 2 | SEO tooling |
| MeetAlfred | TBD | Phase 2 | LinkedIn outbound |
| **Total (est.)** | **TBD** | | |

**Contingency target:** 15–20% of total monthly program spend (moderate risk appetite).

**CAC calculation dependency:** Total program cost ÷ new customers acquired = GTM CAC. Cannot calculate until all tool costs are confirmed and HubSpot is tracking new customer conversions. Target date: Day 60 (Aug 1).

---

## Risk Register

| # | Risk | Prob | Impact | RAG | Mitigation |
|---|---|---|---|---|---|
| R1 | SPA rendering blocks GA4 / HubSpot tracking | High | Critical | 🔴 | GTM History Change trigger — blocked on container access. Escalate to Omar/Sergio Week 1. |
| R2 | Mailchimp sender reputation too damaged to recover | Medium | High | 🔴 | 213k suppression pending Rodrigo approval. Do not send to dead list until approved. |
| R3 | HubSpot contract delayed — portal not provisioned by July 2 | Medium | High | 🟡 | IT approval + vendor contract must start Week 1. Day 30 target is portal provisioned only — CRM config has until Aug 1. |
| R4 | ICP outbound targets misconfigured at launch | High | High | 🟡 | Reclassify Airlines, Overhaul Shops, Regional Airlines to T1 before Clay seeding begins. |
| R5 | ORO data too dirty to migrate cleanly | Medium | High | 🟡 | Audit ORO before any import; start fresh if needed. |
| R6 | Sales team doesn't adopt HubSpot | Medium | High | 🟡 | Embed with one rep Week 2; build for them, not for us. |
| R7 | Revenue concentration — top 3 segments = ~55% ARR | Medium | Medium | 🟡 | Weight outbound toward Overhaul Shop + Regional Airline to diversify while increasing ARPU. |
| R8 | Vector de-anonymization rate lower than projected | Low | Medium | 🟢 | Contractual ~37% rate; ICP filter tightens actionable volume. |
| R9 | Attribution model built on bad data | Low | Critical | 🟢 | Not built until GA4 is confirmed clean for 90 days (target: ~December 1). |
| R10 | GDPR non-compliance for EU contacts | Medium | High | 🟡 | CookiePro loads before content; consent-verify list before sends. |

---

## Decision Log

| Date | Decision | Rationale | Owner |
|---|---|---|---|
| 2026-05-11 | Start with HubSpot (not Marketo or Salesforce) | Appropriate for company size and budget stage | Dan |
| 2026-05-11 | W-shaped attribution model | Balances discovery (40%) and closing (40%) — B2B marketplace fit | Dan |
| 2026-05-11 | Supplier acquisition as outbound POC target | Suppliers pay; buyers search free. Revenue lever. | Dan |
| 2026-05-22 | HubSpot confirmed as CRM + MAP replacement | Replaces ORO (CRM) + Mailchimp (email). Single platform. | Rodrigo + Dan |
| 2026-05-22 | Clay confirmed for enrichment | POC backbone. Preferred over alternatives. | Rodrigo + Dan |
| 2026-05-22 | Vector confirmed for de-anonymization | ~37% visitor ID rate. Preferred over RB2B. | Rodrigo + Dan |
| 2026-05-26 | Profound added for AEO | Underinvested channel; early mover advantage in AI search answers. | Dan |
| 2026-05-27 | ICP reclassification: Airlines, Regional Airlines, Overhaul Shops → T1 | RevOps baseline (May 27) shows these are the highest new-cohort ARPU segments ($520–$620/mo, 2.5× T3 average). Current T3 classification would misdirect outbound. | Dan |
| 2026-05-27 | Execution clock rebaselined to June 2 | May 18 – May 30 used for ramp & discovery. Full execution begins June 2. Day 30 = July 2, Day 60 = Aug 1, Day 90 = Sep 1. | Dan |
| TBD | SPA rendering approach | Dynamic rendering vs. SSR/SSG — pending engineering conversation | Dan + Engineering |

---

## Stakeholder Map

| Stakeholder | What they care about | How I earn their trust |
|---|---|---|
| Rodrigo Garcia (CTOO) | Revenue + process metrics, AI-forward narrative, sustainable systems | Tie every build to a number; concise Monday updates; show marketing → pipeline by Day 90 |
| Omar Servin (IT Architect) | Tool approvals, AI architecture, internal alignment | Loop in before committing to new AI tooling; written specs |
| Sergio Corona (IT) | Vendor onboarding, contracts, rollout | Involve early on all new tool integrations |
| Sales team | Quality leads, fewer manual steps, meetings booked | Build the Clay/Claude workflow that books meetings for them |
| Marketing | Campaign performance, automation that saves time | Give them better data and HubSpot as a real MAP |

---

## Reporting Cadence

| Report | Audience | Frequency | Format |
|---|---|---|---|
| GTM status update | Rodrigo | Weekly (Monday) | 5 bullets max — Slack or email |
| Pipeline contribution | Marketing + Sales | Weekly (Friday) | HubSpot dashboard link |
| Monthly portfolio review | Leadership | Monthly | 5-slide deck max |
| Outbound performance | Sales lead | Weekly | Meetings booked, open/reply rates |
| Email campaign results | Marketing | Per campaign | Open, click, CVR vs. benchmark |
| AEO visibility score | Dan / Rodrigo | Monthly | Profound dashboard |
| SEO + content progress | Marketing | Biweekly | Google Search Console report |

---

## Success Metrics Summary

### Ramp & Discovery (complete)
- ✅ Pre-start SEO audit complete (42/100, Grade D — SPA identified as root cause)
- ✅ Stack decisions confirmed: HubSpot, Clay, Vector
- ✅ ORO × Mailchimp cross-reference complete — suppression list and acquisition lists ready
- ✅ RevOps baseline: $14.3M ARR, LTV:CAC 61×, CAC payback 1.3 months
- ✅ ICP mismatch identified — reclassification required before outbound launch
- ✅ Mission Control OS live — daily brief, exec view, and build workflows operational

### Day 30 (July 2)
- GTM History Change trigger deployed and validated in GA4
- ICP model updated — Airlines, Overhaul Shops, Regional Airlines reclassified T1
- Digital ad spend audit delivered
- Baseline funnel report (traffic, channels, CVR) delivered
- HubSpot IT approval + contract signed + portal provisioned
- Vector pixel live — visitors being identified and ICP-filtered
- Clay workspace live — enrichment running

### Day 60 (August 1)
- HubSpot CRM configured — lifecycle stages, forms, deal pipeline, ORO migration in progress
- Core digital flow end-to-end: Ad → Website → Vector/Form → Clay → HubSpot
- HubSpot Marketing Hub live — Mailchimp decommissioned
- First email campaign sent — open rate > 35%, click rate > 3%
- Lead scoring active — MQLs routing to sales automatically
- Profound AEO baseline + first recommendations implemented

### Day 90 (September 1)
- Outbound motion: meetings booked ≥ 2/week
- Lead scoring MQL → SQL rate > 15%
- AI SEO content pipeline built + first 10 pages indexed
- Weekly GTM report automated — pipeline attributed by channel
- HubSpot CRM — at least one sales rep actively logging activity
- Marketing showing a clear line from digital spend to pipeline

### Day 180 (December 1)
- Full W-shaped attribution model live — CAC by channel is real
- Customer health scoring active — 50+ at-risk accounts flagged to CS
- Marketing directly attributable to pipeline and closed revenue
- 50 SEO content pages live and indexed
- Programmatic SEO live — supplier profiles indexed at scale
