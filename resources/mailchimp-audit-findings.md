# Mailchimp Audit Findings
**Audited:** 2026-05-20  
**Account:** PartsBase, Inc. (us20)  
**Total contacts:** 439,106  
**Deliverability report:** Mailchimp AI — May 20, 2026

---

## ⚠️ Deliverability Report — Top Finding

**Permission complaints are at EXTREME CRITICAL levels: 17–30% (often >25%).**  
Recommended threshold is <4%. This means more than 1 in 4 unsubscribers say they never signed up for PartsBase emails. This is an active sender reputation emergency, not just a list health issue.

| Metric | Current | Threshold | Status |
|---|---|---|---|
| Permission complaints | 17–30% (often >25%) | <4% | 🔴 EXTREME CRITICAL |
| Open rate | 10–21% | >28% | 🟡 Below benchmark |
| Click rate | 1–7% | >1% | 🟢 Healthy |
| Hard bounce rate | 0.02–0.18% | <0.1% | 🟢 Good |
| Unsubscribe rate | 0.07–0.22% | <0.3% | 🟢 Acceptable |

### Mailbox Provider Breakdown

| Provider | Open Rate | Complaints | Notes |
|---|---|---|---|
| Microsoft O365 | 34.4% | 27.3% | ~90% of B2B targets — complaints are critical |
| Proofpoint | 3.0% | 30.3% | Near-zero inbox placement |
| Cisco Ironport | 37.9% | 32.6% | Highest complaint rate |
| Google Workspace | 28.8% | 8.9% | Best of the major B2B providers |
| Gmail | 12.5% | Sparse | Likely going to spam |
| Barracuda | 18.0% | 24.9% | Click rate inflated by security scanning |

**Why this matters:** High permission complaints tell inbox providers "this sender is spam." If left unchecked, PartsBase risks domain blacklisting — at which point no email reaches anyone regardless of list quality.

---

## The Three Assets (What's Actually in Mailchimp)

| Asset | List | Size | State |
|---|---|---|---|
| Core prospect database | PartsBase - All | 406,548 active | 52% dead, losing 3.7k/mo |
| Event audiences | PBExpo / PBX lists | ~10,000 | High engagement, well-managed |
| Renewals / customers | Mike - Renewals, Active User | ~12,000 | Small but high-performing |

---

## Critical Issues

### 🔴 1. List is actively dying
- **Unsub rate:** 4,085/month
- **Sub rate:** 392/month
- **Net loss:** ~3,700 contacts/month
- **Why it matters:** The main asset is shrinking every month with no intervention.

### 🔴 2. 52% of main list is dead
- **213,472 contacts** haven't opened the last 50 emails (`Dead Subs` segment)
- Out of 406,548 active members — more than half are non-responsive
- **Why it matters:** Sending to dead contacts directly harms sender reputation and inbox placement. With 90% of B2B targets on Microsoft 365, this likely means a significant portion of sends are going to spam already.

### 🔴 3. Customer segmentation is broken
- `North America - Customers` segment: **0 members**
- `North America - Prospects` segment: **380,718 members**
- `MKT - PartsBase Current Customer`: 10,057 (exists but separate, not linked)
- **Why it matters:** Marketing cannot distinguish customers from prospects. Same emails going to both. No customer retention or upsell motion possible without fixing this.

### 🔴 4. Zero automations
- `"automations": []` — confirmed empty
- Every email is manually sent by one person with no strategy
- No welcome series, nurture sequences, renewal reminders, or onboarding flows
- **Why it matters:** The funnel has no floor. Leads come in and nothing happens automatically.

---

## Watch Items

### ~~🟡 5. Free Trial Form = broken or disconnected~~
- ~~`Free Trial Form Completions` audience: **0 members** (created 2022)~~
- **Resolved:** Free trial was discontinued. Audience is a legacy artifact — can be archived.

### 🟡 6. Test audiences cluttering the account
Active test/staging audiences that should be cleaned up:
- `Spam Testing Audience` (67 members)
- `Deliverability Test - PartsBase` (435 members)
- `Deliverability Test - PB Expo` (435 members)
- `PartsBase - Seed Testing` (435 members)
- `Dylan Test Emails` (1 member)

### 🟡 7. ZoomInfo tested but abandoned
- `Zoominfo Test` audience: 0 members
- `MKT - 2025 - ZoomInfo Revamp` segment: 24,781 members (in main list)
- Previous team tried ZoomInfo as a data source — worth understanding why it was abandoned

### 🟡 8. Segment hygiene is poor
- 60+ `Campaign Pasted Segment - [date]` entries in main list
- Created automatically when someone pastes contacts into a campaign
- Confirms fully manual, ad-hoc approach with no governance

---

## What's Working

| What | Metric | Significance |
|---|---|---|
| Main list open rate | 20.2% | At/above B2B aviation average (~18%) |
| Mike - Renewals | 45.5% open, 6.3% click | Best performing — small, targeted, relevant |
| PBExpo audiences | 37–45% open rates | Event audiences are highly engaged |
| List cleaning | 74,864 cleaned contacts | Someone ran hygiene — good practice |
| Brella integration | 3,708 contacts tagged | Event platform connected |

---

## Key Insight

The high open rates on small, targeted lists (renewals, event attendees) vs. poor engagement on the broad prospect list tells a clear story: **relevance drives performance**. The main list is being blasted with generic content to 400k people when the engaged audience is actually ~12-15k targeted contacts.

---

## Segment Inventory (Key Ones)

| Segment | Size | Type | Notes |
|---|---|---|---|
| North America - Prospects | 380,718 | saved | Vast majority of main list |
| Dead Subs (no open last 50) | 213,472 | saved | 52% of list — do not send |
| International - Customers | 9,089 | saved | Small but valuable |
| International - Prospects | 8,258 | saved | Smaller international pool |
| MKT - PartsBase Current Customer | 10,057 | static | Customer list exists but separate |
| Active User | 12,016 | static | Likely the real engaged base |
| MKT - 2025 - ZoomInfo Revamp | 24,781 | static | ZoomInfo-sourced contacts |
| PBExpo - Florida | 18,633 | static | Geographic targeting exists |
| TradeShow - NBAA Customer Audience | 17,907 | static | Trade show list |
| GTM segments (A–J) | ~19k each | static | 10 equal-sized send batches |
