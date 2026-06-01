# PartsBase: Senior AI Engineer, Martech — First 180 Days Success Plan

**Role:** Senior AI Engineer, Martech  
**Company:** PartsBase Inc. — World's largest aviation parts marketplace  
**Scale:** 7,600+ companies, 217 countries  
**Motion:** Inbound-led, launching first outbound motion  
**Start date:** TBD  
**Plan owner:** Dan Rodgers  

*Built with: cs-growth-strategist · cs-cto-advisor · cs-demand-gen-specialist · cs-project-manager*  
*Last updated: 2026-05-11*

---

## Mandate

Build the systems that power demand generation — not just implement tools, but wire together a stack that marketing, sales, and RevOps can actually use to grow revenue.

**Success is measured by:** Systems adopted · Workflows transformed · Revenue influenced  
**Not measured by:** Tools implemented · Plans written · Meetings attended

---

## Pre-Start Critical Finding

> ⚠️ **SEO Audit completed 2026-05-11 — before Day 1**
>
> partsbase.com scores **42/100 (Grade D)** on on-page SEO. Root cause: the site is a client-side rendered SPA. Every page delivers the same static HTML shell — no page-specific titles, no H1s, zero body copy for Google to index. The same 149-char meta description appears on every URL.
>
> **Why this matters beyond SEO:** The SPA issue breaks GA4 event tracking on route changes, which breaks HubSpot lead scoring, which breaks attribution before it's even built.
>
> **First task on Day 1:** Share this finding with engineering/IT. The fix (GTM History Change trigger) can be deployed in days and unblocks the entire tracking stack.

---

## RAG Status Dashboard

*Update weekly. Share with leadership monthly.*

| Workstream | Status | Owner | Last Updated |
|---|---|---|---|
| Tracking & Analytics | 🔴 Critical | Dan | Pre-start |
| HubSpot Setup | ⚪ Not started | Dan | — |
| Clay + Claude Outbound POC | ⚪ Not started | Dan | — |
| Lead Scoring | ⚪ Not started | Dan | — |
| SEO Content Engine | ⚪ Not started | Dan | — |
| Outbound Motion (LinkedIn) | ⚪ Not started | Dan | — |
| Attribution Model | ⚪ Not started | Dan | — |
| Customer Health Scoring | ⚪ Not started | Dan | — |

🔴 Red = Blocked or at risk · 🟡 Amber = In progress with issues · 🟢 Green = On track · ⚪ Not started

---

## Risk Register

*Review weekly. Escalate Reds to leadership immediately.*

| # | Risk | Probability | Impact | RAG | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R1 | SPA rendering blocks GA4/HubSpot tracking | High | Critical | 🔴 | GTM History Change trigger — fix in week 1 | Dan + Engineering |
| R2 | Sales team doesn't adopt HubSpot | Medium | High | 🟡 | Embed with one rep in week 1; build for them first | Dan |
| R3 | No access to current CRM data / clean contacts | Medium | High | 🟡 | Audit data sources in week 1 before building anything | Dan |
| R4 | Engineering bandwidth for SSR/SSG work | Medium | Medium | 🟡 | Scope dynamic rendering (prerender.io) as alternative — no eng required | Dan |
| R5 | GDPR non-compliance for EU users | Medium | High | 🟡 | Validate CookiePro loads before content in static shell | Dan + IT |
| R6 | Clay + Claude POC misses 30-day target | Low | High | 🟢 | Workflow templates already built pre-start; seed data is the only blocker | Dan |
| R7 | Attribution model built on bad data | Low | Critical | 🟢 | Dependency map enforced — attribution not built until GA4 is confirmed clean | Dan |

---

## RACI Matrix

*R = Responsible · A = Accountable · C = Consulted · I = Informed*

| Deliverable | Dan | Marketing Lead | Sales Lead | IT / Engineering | CEO / Leadership |
|---|---|---|---|---|---|
| GA4 + GTM fix | R/A | C | I | C | I |
| HubSpot setup | R/A | C | C | C | I |
| Clay + Claude POC | R/A | I | C | I | I |
| Lead scoring model | R/A | C | A | I | I |
| SEO content engine | R/A | C | I | C | I |
| LinkedIn outbound | R/A | C | A | I | I |
| Attribution model | R/A | A | C | I | I |
| Health scoring | R/A | I | C | I | I |
| Weekly GTM report | R/A | I | I | I | A |
| SPA rendering fix | C | I | I | R/A | I |

---

## Sprint Structure

*2-week sprints. Each sprint has one primary deliverable. Velocity target: 85%+ sprint goal achievement.*

---

### Sprint 0 — Week 1: Listen Before Building

**Sprint goal:** Full context on current state before touching anything.  
**Deliverable:** Written current-state doc covering data, people, and workflows.

- [ ] Shadow one sales rep for a full day — understand their actual workflow
- [ ] Map where lead data lives today (spreadsheets? legacy CRM? nothing?)
- [ ] Walk the inbound funnel end-to-end: how leads come in, how they're routed, where they fall off
- [ ] Meet stakeholders: Marketing lead, Sales lead, IT, RevOps (if exists)
- [ ] Document what "winning" looks like for each stakeholder individually
- [ ] Share pre-start SEO audit finding with engineering/IT — open the SPA conversation
- [ ] Request access to: GA4, Google Search Console, any existing analytics, CRM

**Key question to answer:** What's the one thing that, if fixed, makes the sales team's life immediately better? That becomes Sprint 2's build target.

---

### Sprint 1 — Weeks 1–2: Fix the Foundation

**Sprint goal:** GA4 fires correctly on all routes. Baseline metrics exist.  
**Deliverable:** Baseline funnel report. GTM History Change trigger deployed.  
**Risk addressed:** R1 (SPA tracking), R7 (attribution on bad data)

#### 1.1 Tracking Fix (Critical — Do This First)

- [ ] Confirm front-end framework with engineering (React/Next.js/Angular?)
- [ ] Add GTM **History Change trigger** — fires `page_view` on every SPA route change
- [ ] Verify `page_title` and `page_location` parameters populate correctly per route
- [ ] Validate UTM parameters persist across SPA route changes (session storage pattern)
- [ ] Instrument key conversion events from tracking config:
  - `rfq_submitted` (critical — must fire server-side too)
  - `demo_requested`
  - `contact_supplier_clicked`
  - `part_search_performed`
  - `membership_signup_started`
  - `search_no_results` ← feed weekly to supplier acquisition team
  - `aog_inquiry` ← trigger immediate sales alert
- [ ] Validate in GA4 DebugView before calling done
- [ ] Set up UTM naming convention and enforce with the team

#### 1.2 Baseline Metrics

- [ ] Pull Google Search Console data — what is Google actually indexing?
- [ ] Run SEMrush crawl — organic rankings vs. competitors
- [ ] Document baseline: traffic by channel, conversion rates, lead volume by source
- [ ] Set up GA4 + HubSpot integration (tracking code via GTM)

**Deliverable:** Baseline report. "Here's where we are on Day 14."

**Attribution dependency satisfied when:** GA4 fires correct `page_view` events on all routes → HubSpot receives page visit data → lead scoring works → attribution model is trustworthy.

```
Fix SPA page_view events → GA4 fires correctly → GTM History Change active
    → HubSpot receives page visit data → Lead scoring works
    → MQL → SQL handoffs accurate → Attribution model is real
```

---

### Sprint 2 — Weeks 2–4: HubSpot as System of Record

**Sprint goal:** Sales team is logging activity in HubSpot.  
**Deliverable:** One clean pipeline that reps actually use.  
**Risk addressed:** R2 (sales adoption), R3 (data access)

- [ ] Evaluate current CRM state — migrate or start fresh
- [ ] Set up HubSpot: contact records, company records, deal pipeline
- [ ] Define lifecycle stages: Subscriber → Lead → MQL → SQL → Opportunity → Customer
- [ ] Build lead routing logic: right lead → right rep → right time
- [ ] Connect all web forms to HubSpot with proper field mapping
- [ ] Configure lead scoring baseline (pre-tune):
  - `rfq_submitted` → +30 pts
  - `demo_requested` → +30 pts
  - `pricing_page_viewed` → +15 pts
  - `part_search_performed` (3+ times) → +10 pts
  - Google Search source → +10 pts
  - Organic source → +15 pts
  - Referral source → +20 pts
- [ ] Set UTM campaign naming convention: `Q[N]-[YEAR]-[CHANNEL]-[TYPE]`
- [ ] Configure HubSpot attribution report (W-shaped model: 40% first, 20% middle, 40% last)
- [ ] Set MQL → SQL handoff SLA: SDR responds within 4 hours, AE books demo within 24 hours

**Deliverable:** Sales team using HubSpot within 30 days — imperfectly is fine.

---

### Sprint 3 — Weeks 3–5: Clay + Claude Outbound POC

**Sprint goal:** One live outbound workflow booking meetings.  
**Deliverable:** Measurable pipeline from AI-assisted outreach by Day 30.  
**Risk addressed:** R6 (POC miss)

This is the proof of concept that establishes credibility. Everything else is strategy — this is the number.

- [ ] Seed Clay table with 100–200 aviation parts supplier contacts (distributors + surplus dealers)
- [ ] Run Clay LinkedIn enrichment: company description, contact name/title/headline, employee count
- [ ] Run Clay email finder for work emails
- [ ] Add Claude API column — segment classifier (distributor / MRO / surplus / OEM / broker / unknown)
- [ ] Add Claude API column — personalization prompt (see `resources/outbound-workflow/claude-personalization-prompt.md`)
- [ ] Apply Tier 1 filter: segment IN (distributor, surplus_dealer) AND employees 10–200 AND not on PartsBase AND email found
- [ ] Export Tier 1 (~40–60 contacts) to HubSpot sequence
- [ ] Load 5-step sequence (see `resources/outbound-workflow/hubspot-sequence-template.md`):
  - Day 0: Personalized email
  - Day 2: LinkedIn connection request (MeetAlfred)
  - Day 5: Follow-up email
  - Day 8: LinkedIn message (if connected)
  - Day 12: Final email
- [ ] Set up MeetAlfred for LinkedIn automation
- [ ] Track: open rate, reply rate, meetings booked

**Target KPIs:**
- Open rate > 35%
- Reply rate > 5%
- Meetings booked ≥ 2 from first 50 contacts

**Deliverable:** Present results to leadership at Day 30 check-in. "Here's what the AI outbound workflow produced."

---

### Sprint 4–5 — Month 2: AI Layer

**Sprint goal:** Lead scoring tuned. SEO unblocked. Outbound scaled.  
**Deliverable:** Scoring model actively routing leads. SEO content pipeline live.

#### 4.1 Lead Scoring Tuning

- [ ] Review first 30 days of HubSpot data with sales
- [ ] Tune scoring thresholds based on actual MQL → SQL conversion data
- [ ] Add aviation-segment scoring dimension (MRO, airline, defense, distributor)
- [ ] Define MQL threshold (target: score > 75)
- [ ] Wire MQL → SQL handoff automation

#### 4.2 Lifecycle Segmentation

- [ ] Segment by aviation vertical: MRO, OEM, defense, commercial, charter
- [ ] Segment by region — priority: US, EU, Middle East, Australia
- [ ] Build behavioral triggers: RFQ submitted, search activity, part category browsing
- [ ] Design nurture tracks per segment (not one-size-fits-all)
- [ ] International: validate CookiePro consent flows for EU users (GDPR)
- [ ] International: scope hreflang implementation with engineering for top 5 markets

#### 4.3 SEO Content Engine

The SPA fix from Sprint 1 is the prerequisite. Without static HTML, the content pipeline has nothing to build on.

- [ ] SEMrush: identify high-intent long-tail searches (part numbers, ATA codes, manufacturer names)
- [ ] Build AI content pipeline: part category pages, ATA code guides, manufacturer spec pages
- [ ] Target: 50 indexable pages live by end of Month 2
- [ ] Set up Google Search Console integration and weekly ranking report
- [ ] Scope programmatic SEO for supplier profiles (template → unique page per supplier)

#### 4.4 Experimentation Framework

- [ ] Implement Optimizely (or HubSpot A/B testing as starting point)
- [ ] Hotjar: heat mapping on pricing page, demo request page, search results
- [ ] ICE-score first test backlog (Impact × Confidence × Ease)
- [ ] First active experiment: pricing page CTA copy or demo request form length
- [ ] Target: 4–6 tests per month, minimum 95% confidence before calling winner

---

### Sprint 6–9 — Month 3: Revenue Intelligence

**Sprint goal:** Attribution model live. Churn signals wired. Leadership can see marketing → revenue.  
**Deliverable:** Weekly GTM report automated. Health scoring active.

#### 6.1 Multi-Touch Attribution

*Prerequisite: GA4 clean data from Sprint 1 (confirmed) + 90 days of HubSpot pipeline data*

- [ ] Build W-shaped attribution report in HubSpot (40% first / 20% middle / 40% last)
- [ ] Identify which channels actually drive deals vs. just leads
- [ ] Build CAC by channel — use `scripts/attribution_analyzer.py`
- [ ] Automate weekly GTM report for leadership: pipeline sourced, influenced, closed
- [ ] Use attribution data to defend and grow marketing budget

#### 6.2 Customer Health Scoring

The 7,600-company base is a retention and expansion goldmine.

- [ ] Define churn signals with CS team: declining search activity, fewer RFQs, reduced logins
- [ ] Build health score model per account (use `scripts/funnel_analyzer.py` as baseline)
- [ ] Wire early warning alerts to CS team — 90 days before renewal risk
- [ ] Expansion scoring: accounts searching categories they haven't transacted in = upsell signal
- [ ] Target: identify top 50 at-risk accounts and 50 expansion opportunities

#### 6.3 Revenue Operations Reporting

- [ ] Dashboard: pipeline sourced by channel, pipeline influenced, closed-won
- [ ] Track: CAC by channel, LTV by aviation segment, pipeline coverage ratio (target: 3x)
- [ ] Automate weekly report — delivered Monday morning to leadership
- [ ] Monthly portfolio review: channel performance, test results, health score trends

---

## Milestone Tracker

| Milestone | Target Date | Owner | RAG | Notes |
|---|---|---|---|---|
| Pre-start SEO audit shared with engineering | Day 1 | Dan | 🟢 | Done pre-start |
| GTM History Change trigger deployed | Day 7 | Dan + Eng | 🔴 | Blocks everything downstream |
| Baseline funnel report delivered | Day 14 | Dan | ⚪ | |
| HubSpot live with sales logging activity | Day 30 | Dan | ⚪ | |
| Clay + Claude outbound POC results presented | Day 30 | Dan | ⚪ | Target: 2+ meetings booked |
| Lead scoring model active | Day 60 | Dan | ⚪ | |
| First A/B test live | Day 60 | Dan | ⚪ | |
| SEO content pipeline: 50 pages live | Day 60 | Dan | ⚪ | |
| Outbound hitting consistent meeting targets | Day 90 | Dan | ⚪ | |
| Attribution model live | Day 120 | Dan | ⚪ | Needs 90 days clean GA4 data |
| Customer health scoring active | Day 120 | Dan | ⚪ | |
| Marketing attributable to closed revenue | Day 180 | Dan | ⚪ | |

---

## Tech Stack Decision Matrix

| Layer | Tool | Priority | Sprint | Status | Notes |
|---|---|---|---|---|---|
| Tracking | GA4 + GTM | Critical | Sprint 1 | 🔴 Broken | Fix SPA History Change trigger first |
| CRM / MAP | HubSpot | Critical | Sprint 2 | ⚪ | Likely starting from scratch |
| Compliance | CookiePro | High | Sprint 2 | ⚪ | GDPR required — 217 countries |
| Data Enrichment | Clay | High | Sprint 3 | ⚪ | POC target: Day 30 |
| AI Workflows | Claude API | High | Sprint 3 | ⚪ | Personalization layer on Clay |
| Social Outbound | MeetAlfred | High | Sprint 3 | ⚪ | LinkedIn sequences alongside email |
| SEO | SEMrush + GSC | Medium | Sprint 4 | ⚪ | Needs SPA fix first |
| Experimentation | Optimizely | Medium | Sprint 4 | ⚪ | Start with HubSpot A/B if budget tight |
| UX Analytics | Hotjar | Medium | Sprint 4 | ⚪ | Pricing + demo pages first |
| Attribution | HubSpot + custom | Low | Sprint 6 | ⚪ | Needs 90 days clean data |

---

## Success Metrics by Phase

### Day 30
- GTM History Change trigger deployed and validated in GA4 DebugView ✓
- Baseline funnel report delivered to leadership ✓
- HubSpot live — sales team logging activity ✓
- Clay + Claude outbound workflow live — results presented (target: 2+ meetings) ✓

### Day 60
- Lead scoring model active and tuned with real data ✓
- Lead routing automated — right lead to right rep within SLA ✓
- First A/B test running ✓
- 50 SEO content pages live and indexed ✓
- Outbound motion booking consistent meetings ✓

### Day 90
- Lead scoring MQL threshold calibrated — MQL → SQL rate > 15% ✓
- Outbound hitting KPI targets: reply rate > 5%, meetings booked weekly ✓
- At least 3 completed A/B tests with documented learnings ✓
- Organic lead volume growing month-over-month ✓

### Day 180
- Full W-shaped attribution model live — CAC by channel is real ✓
- Customer health scoring active — 50+ at-risk accounts flagged to CS ✓
- Marketing directly attributable to pipeline and closed revenue ✓
- Weekly GTM report automated — leadership sees marketing → revenue ✓

---

## Reporting Cadence

| Report | Audience | Frequency | Format |
|---|---|---|---|
| GTM status update | Dan's direct manager | Weekly (Monday) | Slack message or email — 5 bullets max |
| Pipeline contribution | Marketing + Sales leads | Weekly (Friday) | HubSpot dashboard link |
| Monthly portfolio review | Leadership team | Monthly | Deck — 5 slides max |
| Outbound performance | Sales lead | Weekly | Email: meetings booked, open/reply rates |
| SEO + content progress | Marketing lead | Biweekly | Google Search Console report |
| Health score alerts | CS team | As triggered | HubSpot alert |

---

## Stakeholder Map

| Stakeholder | What they care about | How I earn their trust | Communication |
|---|---|---|---|
| Marketing Lead | Campaign performance, lead volume, content | Give them better data + automation that saves time | Weekly pipeline report |
| Sales Lead | Quality leads, less manual work, meetings booked | Build the Clay/Claude workflow that books meetings for their reps | Daily during POC sprint, weekly after |
| CEO/Leadership | Revenue growth, AI-forward narrative | Show measurable pipeline impact by Day 30 | Monthly review |
| IT / Engineering | Security, integrations, compliance, not breaking things | Involve early, document everything, respect their process | As needed, written specs |
| RevOps | Clean data, accurate forecasting | Make HubSpot the undisputed source of truth | Weekly HubSpot review |
| CS Team | Customer retention, expansion signals | Give them churn alerts before renewals are at risk | Health score alerts |

---

## Political Playbook

- **Embed with one sales rep in week 1.** Understand their workflow before touching anything. They often have workarounds with critical logic you'll break if you move too fast. This rep becomes your internal champion.
- **Ship something visible by Day 30.** One outbound workflow that books meetings is worth more than a six-month roadmap deck. The Clay + Claude POC is your Day 30 moment.
- **Lead with the SEO finding on Day 1.** You audited the site before you started. That signals initiative and credibility. Frame it as an opportunity, not a problem: "We have an SEO unlock available as soon as we wire one GTM trigger."
- **Never present a tool — always present a number.** Meetings booked, leads routed faster, pipeline influenced. Every update to leadership connects a system to a revenue signal.
- **Document as you build.** The JD mentions playbooks explicitly. Written process = institutional knowledge = leverage when headcount conversations happen.
- **Tie attribution to budget conversations.** Once the attribution model is live, you can prove which channels deserve more spend. That's how you grow the team and the budget.

---

## Decision Log

*Record key decisions as they're made. This protects you and creates institutional memory.*

| Date | Decision | Rationale | Made by | Impact |
|---|---|---|---|---|
| 2026-05-11 | Start with HubSpot (not Marketo or Salesforce) | JD lists it first; most appropriate for company size and budget stage | Pre-start assumption | Sets Phase 1 tool direction |
| 2026-05-11 | W-shaped attribution model | Balances discovery (40%) and closing (40%) — appropriate for B2B marketplace | Dan | Sets Phase 3 measurement framework |
| 2026-05-11 | Supplier acquisition as outbound POC target | Revenue lever — suppliers pay; buyers search free | Dan | Focuses Clay + Claude POC scope |
| TBD | SPA rendering approach | Dynamic rendering vs. SSR/SSG — pending engineering conversation | Dan + Engineering | Affects SEO timeline and content strategy |

---

## ICP Quick Reference

*Read `resources/icp-brief.md` for full detail. This is the one-paragraph version.*

**Outbound target (supplier acquisition):** Aviation parts distributors and surplus dealers, 10–200 employees, not currently on PartsBase. Personas: VP Sales, Owner/GM. Care about: buyer reach, lead quality, compliance. Don't pitch: airworthiness claims, anything compliance-specific.

**Inbound nurture (buyer side):** MRO shops, commercial airlines, defense contractors, charter operators. Care about: part availability, traceability documentation, supplier reliability, AOG speed. Key terms: AOG, 8130, CoC, ATA codes, traceability.
