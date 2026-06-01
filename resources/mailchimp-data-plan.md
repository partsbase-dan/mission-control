# Mailchimp Data Collection Plan

**Goal:** Establish a full baseline of PartsBase's email program before making any changes.
**Why:** No always-on campaigns, no clear ownership, ad-hoc sends only — we need to see what we're working with before building anything.

---

## How Data is Split

| Layer | Source | Status |
|---|---|---|
| Campaign performance (opens, clicks, bounces, unsubs) | Claude Mailchimp Connector | ✅ Loading now |
| Audience growth by month | Claude Mailchimp Connector | ✅ Loading now |
| Deliverability metrics (hard/soft bounces, spam complaints) | Claude Mailchimp Connector | ✅ Loading now |
| Audience/list health (member counts, cleaned contacts) | Python script | 🔲 Run next |
| Tags & segments (how contacts are organized) | Python script | 🔲 Run next |
| Automations inventory | Python script | 🔲 Run next |

---

## Step 1 — Claude Connector (happening now)

Three widgets are loading in your Mailchimp connector. Review and share results for:

- **Campaign performance** — last 12 months, all sent campaigns
- **Audience growth** — monthly subscriber/unsubscriber trends
- **Deliverability** — bounce rates, spam complaints

**What to look for:**
- Are open/click rates above or below industry average? (Aviation B2B baseline: ~20% open, ~2.5% click)
- Any campaigns with bounce rate >2% or spam complaints >0.1%? (Deliverability risk)
- Is the list growing or shrinking month over month?

---

## Step 2 — Python Script (audience layer)

Run the updated script to get list health, segments, and automations:

```bash
# Test connection first
python3 scripts/mailchimp_audit.py --api-key YOUR_KEY --test

# Full audience audit
python3 scripts/mailchimp_audit.py --api-key YOUR_KEY
```

**What to look for:**
- List health score — what % of contacts are still active vs cleaned/unsubscribed?
- Are contacts tagged/segmented at all, or is it one undifferentiated blob?
- Any classic automations running, or is everything truly manual?

Output saves to `scripts/mailchimp_audience_report.json`.

---

## Step 3 — Manual Checks in Mailchimp App

Two things the connector and script both can't reach:

1. **Customer Journeys** — go to Mailchimp → Automations → Customer Journeys. Note any active journeys, their trigger, and how many contacts are in them.
2. **Sending domains** — go to Settings → Domains. Confirm SPF/DKIM/DMARC authentication status. This is critical for deliverability.

---

## Step 4 — Synthesize Findings

Once Steps 1-3 are done, we'll have:

| Question | Answer Source |
|---|---|
| How many contacts do we have? | Script |
| Are they segmented or organized? | Script |
| What's been sent in the last year? | Connector |
| Are emails actually reaching inboxes? | Connector + manual domain check |
| Is the list healthy or degraded? | Script (health score) |
| Is anything running automatically? | Script + manual Customer Journeys check |
| What's the best/worst performing campaign? | Connector |

This baseline becomes the foundation for:
- HubSpot evaluation (what do we need to migrate/replace?)
- Always-on campaign strategy (what sequences need to be built?)
- List segmentation strategy (buyers vs sellers vs mixed)
- Deliverability remediation if needed
