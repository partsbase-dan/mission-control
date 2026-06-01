# HubSpot Sequence Template — Supplier Acquisition

*Use this as your sequence structure once HubSpot is live. Timing and copy are starting points — tune based on reply data.*

---

## Sequence: PartsBase Supplier Intro

**Target:** Aviation parts distributors and surplus dealers not yet on PartsBase  
**Goal:** Book a 20-minute intro call  
**Sender:** Dan (or sales rep once handed off)

---

### Step 1 — Email (Day 0)

**Subject:** `{{subject_line}}` ← from Claude personalization  
**Body:** `{{full_email}}` ← from Claude personalization

*This is the AI-personalized email from Clay. Do not template this one — the personalization IS the differentiation.*

---

### Step 2 — LinkedIn Connection Request (Day 2)

**Message:** `{{linkedin_note}}` ← from Claude personalization (< 300 chars)

*Send through MeetAlfred. Use the Claude-generated note, not a generic one.*

---

### Step 3 — Follow-up Email (Day 5)

**Subject:** Re: `{{subject_line}}`

**Template:**
```
{{contact_first_name}},

Just wanted to follow up on my note from earlier this week.

Quick context on why I reached out specifically: we're seeing strong demand from [MRO shops / airlines / defense contractors] for [part category] right now, and your inventory looked like a natural fit for what they're sourcing.

Worth a 20-minute call to see if it makes sense?

[Calendly link]

Dan
```

---

### Step 4 — LinkedIn Message (Day 8, if connected)

```
Hey {{contact_first_name}} — following up on the email I sent last week about PartsBase.

No pressure at all, just wanted to make sure it didn't get buried. Happy to share more about what buyers in your segment are actively sourcing if that's useful.

```

---

### Step 5 — Final Email (Day 12)

**Subject:** Last note — PartsBase

**Template:**
```
{{contact_first_name}},

Last note from me — don't want to clog your inbox.

If the timing isn't right, totally understood. We're building out our [aviation segment] supplier base this quarter and wanted to make sure you were aware of the opportunity.

If interest picks up on your end, I'm at [email] or you can grab time here: [Calendly link]

Dan
```

---

## Sequence KPIs to Track

After first 50 contacts through the sequence:

| Metric | Benchmark to hit | Action if below |
|---|---|---|
| Open rate (Step 1) | >35% | Test new subject lines |
| Reply rate (any step) | >5% | Review personalization quality, test shorter email |
| Positive reply rate | >2% | Review targeting — may be wrong segment |
| Meeting booked rate | >1% | Tighten CTA, add Calendly to Step 1 |

Run `email_sequence_analyzer.py` on exported sequence data after 4 weeks.
