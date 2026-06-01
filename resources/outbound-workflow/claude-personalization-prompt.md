# Claude Outbound Personalization Prompt

**Used at:** Clay enrichment → outreach personalization step  
**Model:** claude-haiku-4-5 (fast, cheap — runs on every prospect row)  
**Pattern:** Modeled after ambient-nudge prompt engineering conventions

---

## INPUT

```
company_name: <string>
company_description: <string — from Clay LinkedIn/web enrichment>
contact_name: <string>
contact_title: <string>
contact_linkedin_headline: <string>
aviation_segment: <"MRO" | "distributor" | "surplus_dealer" | "OEM" | "broker" | "unknown">
estimated_employee_count: <number>
likely_part_categories: <string — ATA codes or part categories if detectable, else null>
is_on_partsbase: <boolean>
sender_name: <string — Dan's name>
```

## OUTPUT

Respond with a single JSON object and nothing else:

```json
{
  "subject_line": "<email subject — specific, no clickbait, under 50 chars>",
  "opening_line": "<personalized first sentence referencing something specific about their business — 1 sentence, max 20 words>",
  "value_hook": "<one sentence connecting PartsBase's value to their specific segment — mention 7,600 companies or relevant customer if applicable>",
  "cta": "<clear, low-friction ask — meeting, demo, or question — 1 sentence>",
  "full_email": "<assembled 4-sentence email: opening + value_hook + proof + cta>",
  "linkedin_note": "<shorter version for LinkedIn connection request — max 300 chars, no subject line>"
}
```

## PROMPT TEMPLATE

```
You are writing outbound sales outreach for PartsBase — the world's largest aviation parts marketplace with 7,600+ companies and customers like Delta, Northrop Grumman, and Air France Industries.

You are reaching out to a potential supplier who should list their inventory on PartsBase to get in front of qualified aviation buyers.

Prospect details:
Company: {{company_name}}
Description: {{company_description}}
Contact: {{contact_name}}, {{contact_title}}
LinkedIn headline: {{contact_linkedin_headline}}
Aviation segment: {{aviation_segment}}
Company size: ~{{estimated_employee_count}} employees
Part categories they likely carry: {{likely_part_categories}}
Already on PartsBase: {{is_on_partsbase}}
Your name: {{sender_name}}

Rules:
- Opening line must reference something specific about THIS company — not a generic aviation opener
- Do NOT use phrases like "I came across your profile" or "I hope this finds you well"
- Do NOT pitch compliance or airworthiness — we have no knowledge of their documentation processes
- Aviation is relationship-driven — warm but not pushy
- Subject line must be specific and non-clickbait
- If aviation_segment is "distributor" or "surplus_dealer", emphasize buyer reach and active sourcing demand
- If aviation_segment is "MRO", note that MRO shops sometimes sell surplus — check description for signals
- If is_on_partsbase is true, the email should be a re-engagement/upgrade pitch, not a cold intro
- Keep the full email under 100 words — aviation buyers and sellers are busy people

Respond with JSON only. No explanation.
```

---

## Usage in Clay

1. Add a Claude API column to your Clay table
2. Use this prompt template with `{{field}}` variable substitution from your enriched columns
3. Map output fields to separate columns: `subject_line`, `opening_line`, `full_email`, `linkedin_note`
4. Filter rows where `aviation_segment = "unknown"` for manual review before sending
5. Use `email_sequence_analyzer.py` to audit sequence performance after first 50 sends

## Version History

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-05-11 | Initial — supplier acquisition focus |
