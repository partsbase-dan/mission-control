# Clay Enrichment Schema — PartsBase Supplier Outbound

*This is the table structure for the Clay enrichment workflow. Build this before Day 30.*

---

## Clay Table: PartsBase Supplier Prospects

### Input Columns (Seed Data)

| Column | Source | Notes |
|---|---|---|
| `company_name` | Manual / LinkedIn search | Starting point |
| `company_linkedin_url` | Manual | Feed to Clay LinkedIn enrichment |
| `contact_linkedin_url` | Manual / Sales Nav | Target persona |

### Clay Enrichment Columns (Auto-populated)

| Column | Clay Enrichment | What to look for |
|---|---|---|
| `company_description` | LinkedIn Company enrichment | What they do, size |
| `contact_name` | LinkedIn Person enrichment | Full name |
| `contact_title` | LinkedIn Person enrichment | VP Sales, Owner, GM, etc. |
| `contact_linkedin_headline` | LinkedIn Person enrichment | Their own description |
| `contact_email` | Clay email finder (Clearbit/Hunter) | Work email |
| `estimated_employee_count` | LinkedIn Company enrichment | Filter: 10-200 is sweet spot |
| `company_website` | LinkedIn Company enrichment | For SEO/web research |

### Derived Columns (Formula or Claude)

| Column | How to populate | Logic |
|---|---|---|
| `aviation_segment` | Claude classify | Feed `company_description` → Claude classifies as distributor/MRO/surplus_dealer/OEM/broker/unknown |
| `likely_part_categories` | Claude extract | Feed `company_description` → Claude extracts ATA codes or part categories mentioned |
| `is_on_partsbase` | Manual flag or scrape | Check partsbase.com search — can automate later |
| `outreach_priority` | Formula | employee_count 10-200 AND segment != "unknown" AND is_on_partsbase = false → High |

### Output Columns (Claude Personalization)

| Column | Source |
|---|---|
| `subject_line` | Claude personalization prompt output |
| `opening_line` | Claude personalization prompt output |
| `full_email` | Claude personalization prompt output |
| `linkedin_note` | Claude personalization prompt output |

---

## Segmentation Logic

Build these as Clay filters before exporting to HubSpot sequences:

**Tier 1 — Highest priority:**
- `aviation_segment` IN (distributor, surplus_dealer)
- `estimated_employee_count` BETWEEN 10 AND 200
- `is_on_partsbase` = false
- `contact_email` is not null

**Tier 2 — Secondary:**
- `aviation_segment` = broker
- OR `estimated_employee_count` > 200 (larger distributors)

**Hold / manual review:**
- `aviation_segment` = unknown
- `contact_email` is null
- `is_on_partsbase` = true (needs different messaging)

---

## Target Volume for Day 30 POC

- Seed table with 100-200 aviation parts supplier contacts
- Run full enrichment
- Export Tier 1 (target: 40-60 contacts) to HubSpot sequence
- Measure: open rate, reply rate, meetings booked
- Report results to leadership as proof of concept
