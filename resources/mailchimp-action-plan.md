# Mailchimp Action Plan
**Created:** 2026-05-20  
**Based on:** mailchimp-audit-findings.md  
**Goal:** Stabilize the email program, establish Marketing ownership, and build the foundation for always-on campaigns

---

## Priority Order

These are sequenced deliberately — each step protects or enables the next.

---

## Phase 1 — Stop the Bleeding (Week 1–2)
*Fix what's actively causing damage before building anything new.*

### 1.0 URGENT — Address permission complaints (added from deliverability report)
- **Permission complaints are at 17–30%, threshold is <4% — this is a sender reputation emergency**
- Root causes per Mailchimp AI: sending to unengaged/old contacts, sender name not matching expectations, no opt-in reminder in email body
- Immediate actions:
  - Stop sending to contacts who haven't opened in 90+ days until reputation recovers
  - Add a clear reminder in all emails: "You're receiving this because you registered at partsbase.com"
  - Review sender name — does it match what contacts expect?
  - Run a re-permission campaign before any list expansion
- **Owner:** Dan + whoever currently sends
- **Impact:** If unaddressed, risks domain blacklisting — no email reaches anyone

### 1.1 Suppress the dead segment immediately
- The `Dead Subs - Did NOT open last 50 Emails` segment (213,472 contacts) should be **excluded from all future sends** until re-engagement is attempted
- Do NOT delete — re-engagement can recover some of these
- In Mailchimp: create a suppression tag or use the segment as an exclusion on every campaign
- **Owner:** Dan
- **Impact:** Directly reduces permission complaint rate — dead contacts are the primary source

### 1.2 Investigate the unsub rate
- 4,085 unsubs/month is ~10x the sub rate — this needs a root cause
- Pull the last 6 months of campaign sends and check: which campaigns drove the most unsubs AND the most permission complaints?
- Likely causes: ZoomInfo-sourced contacts, old trade show lists, contacts who never explicitly opted in
- **Owner:** Dan + whoever runs current sends
- **Impact:** Can't fix list growth until we know what's driving the loss

### 1.3 Audit domain authentication
- Go to Mailchimp → Settings → Domains
- Confirm SPF, DKIM, DMARC are all verified and passing
- If not, fix before sending anything else
- **Owner:** Dan + Sergio Corona (IT Architect — vendor/ops)
- **Impact:** Foundation of deliverability — nothing else matters if auth is broken

### 1.4 Clean up test audiences
- Archive or delete: `Spam Testing Audience`, `Dylan Test Emails`, `Deliverability Test` lists, `Seed Testing`
- Keep the deliverability/seed test structure if it's still being used — just consolidate
- **Owner:** Dan
- **Impact:** Account hygiene, reduces confusion

---

## Phase 2 — Establish Visibility (Week 2–3)
*Get a clear picture of what's been sent and what's working.*

### 2.1 Pull last 12 months of campaign performance
- Use the Python script to pull campaign data (or run manually in Mailchimp Reports)
- Document: send dates, audiences used, subject lines, open/click rates, unsub spikes
- Look for patterns: what content performed? what triggered unsub spikes?
- **Owner:** Dan
- **Impact:** Informs content strategy and send cadence

### 2.2 Fix customer segmentation
- Reconcile `North America - Customers` (0 members) vs `MKT - PartsBase Current Customer` (10,057)
- Understand the source of the customer list — is it manual? From ORO?
- Goal: a reliable, maintained `Customers` segment that auto-updates
- **Owner:** Dan + Sergio (ORO integration question)
- **Impact:** Enables separate customer vs. prospect messaging — can't do retention without this

### 2.3 Map the ZoomInfo contacts
- `MKT - 2025 - ZoomInfo Revamp` has 24,781 contacts in the main list
- Understand: when were these added? what was the campaign? what was performance?
- ZoomInfo is not in the current stack — are these contacts worth keeping or suppressing?
- **Owner:** Dan
- **Impact:** Clarifies list quality and sourcing history

---

## Phase 3 — Build the Foundation (Week 3–6)
*Create the structures Marketing needs to own the funnel.*

### 3.1 Define and document the segment taxonomy
Current state is chaos — date-stamped static lists, no naming convention, no governance.
Proposed clean structure:

| Prefix | Purpose | Example |
|---|---|---|
| `MKT -` | Marketing-owned permanent segments | `MKT - Customers - NA` |
| `GTM -` | Go-to-market campaign segments | `GTM - Q1 2026 Outbound` |
| `EVT -` | Event audiences | `EVT - PBExpo 2026 Attendees` |
| `TEST -` | Test/QA audiences | `TEST - Seed List` |
| `SUPPRESS -` | Do-not-send lists | `SUPPRESS - Dead Subs` |

- **Owner:** Dan
- **Impact:** Foundation for HubSpot migration — can't migrate chaos

### 3.2 Launch re-engagement campaign for dead subs
- 213,472 contacts who haven't opened in 50 sends
- Run a win-back campaign: "Still want to hear from us?" with a clear CTA
- Those who don't engage within 30 days → permanently suppress
- This will reduce list size but dramatically improve deliverability
- **Owner:** Dan
- **Impact:** Could recover 10–20% (~20-40k contacts), cleans the rest

### 3.3 Build the first always-on sequences
Priority order based on what exists and what's highest impact:

| Sequence | Trigger | Audience | Why First |
|---|---|---|---|
| New subscriber welcome | Joins main list | All new subs | Sets expectations, improves engagement from day 1 |
| Customer onboarding | Tagged as customer | New customers | Reduces churn, no current equivalent |
| Renewal reminder | X days before renewal | Customers | Mike does this manually — automate it |
| Free trial nurture | Free trial signup | Trial users | Needs form fixed first (Phase 1) |

### 3.4 Establish send governance
- Document a send calendar and approval process
- Define who can send, to what lists, at what frequency
- Max frequency recommendation: 2x/week to main list until deliverability improves
- **Owner:** Dan
- **Impact:** COO goal #3 — Marketing owns the funnel means Marketing controls the sends

---

## Phase 4 — HubSpot Evaluation (Week 4–8)
*Assess whether Mailchimp stays, gets replaced, or becomes part of a larger stack.*

### Questions to answer before making a recommendation:
1. What does ORO currently do that overlaps with HubSpot (contact management, deal tracking)?
2. Is the goal a full CRM replacement or just adding a MAP layer on top of ORO?
3. What's the contract/cost situation with Mailchimp — when does it renew?
4. Does the sales team need CRM features, or just better email + reporting?

### HubSpot makes sense if:
- Marketing needs to own the full funnel from contact to closed deal
- Sales team needs pipeline visibility tied to marketing activity
- Attribution reporting is a priority (COO goal)

### Mailchimp stays if:
- ORO handles CRM and just needs a better email layer
- Budget constraints make HubSpot hard to justify short-term
- Migration complexity outweighs the benefits

---

## Success Metrics

| Metric | Current | Target (90 days) |
|---|---|---|
| Monthly unsub rate | 4,085 | < 1,500 |
| Active list (engaged) | ~193k (est.) | Stable or growing |
| Always-on sequences | 0 | 3 live |
| Customer segment accuracy | Broken (0 members) | Maintained + accurate |
| Send governance | None | Documented + followed |
| Domain auth | Unknown | SPF/DKIM/DMARC verified |
