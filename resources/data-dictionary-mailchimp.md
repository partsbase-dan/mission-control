# Mailchimp — Data Dictionary

*Generated May 22, 2026 · Source: Mailchimp audience export, May 20, 2026 · Account: us20*

---

## Files Overview

| File | Rows | Purpose |
|---|---|---|
| `subscribed_email_audience_export_*.csv` | 406,548 | Active subscribers — primary working dataset |
| `unsubscribed_email_audience_export_*.csv` | ~32k | Opted out — do not send |
| `cleaned_email_audience_export_*.csv` | ~800 | Hard bounced — do not send |
| `nonsubscribed_email_audience_export_*.csv` | ~5k | Never subscribed — imported contacts |

**All dictionaries below apply to the subscribed export. Field structure is identical across files.**
**Join to ORO:** `Email Address` = `ORO_AllContacts.Emails 1 Email` = `ORO_Customers.Email Address`

---

## Field Reference — 67 Fields

### Core Identity

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Email Address` | 100% | mike.robb@woodward.com | **Primary join key to ORO** |
| `First Name` | 98.1% | Mike, Javin | Reliable |
| `Last Name` | 98.0% | Robb, Carter | Reliable |
| `Address` | 88.1% | 208 S La Salle St, Chicago IL 60604 US | Single concatenated string — not split into components |
| `Phone Number` | 14.6% | 1202-358-0001 | Sparse — use ORO phone data instead |
| `Work Phone` | 14.6% | '+1 202-358-0001 | Duplicate of Phone Number — has leading apostrophe artifact |
| `Suffix` | ~0% | Jr., CAPM | Ignore |

### Company & Role

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Company Name` | 96.9% | General Dynamics, Collins Aerospace | **Best company name source in Mailchimp** |
| `Job Title` | 84.0% | Vice President of Engineering, Systems Engineer | High quality — primary ICP classification signal |
| `Management Level` | 4.2% | C-Level, Attendee | Too sparse to rely on — infer from Job Title instead |
| `Job Function` | 2.6% | Operations, Executive | Very sparse |
| `Department` | 2.5% | Operations, C-Suite | Very sparse |

### Aviation ICP Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Aviation Industry Class` | 14.0% | Charter Service, Airline | **Direct ICP tag** — only 14% filled. This is the manually/historically tagged field. |
| `ICP` | 80.6% | "Defense Engineers in the Aerospace Industry" | **ZoomInfo-enriched persona label** — NOT a segment name. Format: "[Role] in [Industry]". Used by classify_contacts.py as primary classification signal. |
| `Company Description` | 13.5% | "Supply Shield is a distributor of..." | Used as fallback classification signal |
| `PartsBase Member` | 6.4% | 1, No | Dirty — also contains aviation part numbers in ~200 rows. Not reliable as customer flag. |
| `Contact Status` | 15.8% | Customer, joined, "2 year deal $6k Bronze" | ⚠️ **Free-text sales notes field** — used inconsistently. Key values: "PartsBase Membership - Paid" (3,917), "Customer" (3,307), "PartsBase Membership - Ordered" (392). Needs standardization before programmatic use. |
| `Account Owner` | 5.1% | Ryan Coleman, Daallo Airlines - Rajesh Babu | Assigned PartsBase sales rep |
| `Account Owner Email` | 0.5% | aruback@partsbase.com | Very sparse |
| `Owner Calendly` | 2.9% | calendly.com/tcolnago-partsbase | Sales rep booking link — for outbound sequences |

### Company Firmographics (ZoomInfo-enriched)

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Employee Count` | 62.4% | 9300, 47 | Company-level headcount — not person-level |
| `Anual Revenue` | 82.5% | 73349000000, 3358530000 | Note: misspelled "Annual". Raw dollar value — no formatting |
| `Revenue Range` | 2.8% | "$1 mil. - $5 mil.", 9191000 | Inconsistent format — some are ranges, some are raw numbers |
| `Founded Year` | 1.5% | 2006, 1945 | Very sparse |
| `Total Funding` | 1.1% | 1000000, 1704600 | Very sparse |
| `Business Model` | 0.5% | Contains addresses in some rows | Dirty — data entry error in many rows |

### Location (Person)

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Country` | 81.6% | Japan, United Arab Emirates | Person-level country |
| `Region` | 11.9% | North America, Virginia | Inconsistent — sometimes world region, sometimes US state |
| `Person City` | 69.3% | Phoenix, Louisville | — |
| `Person State` | 71.7% | Maryland, Arizona | — |
| `Person Zip Code` | 2.0% | 75235, 76011 | Sparse |

### Location (Company)

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Company Street Address` | 87.3% | 1081 Woodward Way, Fort Collins CO | More complete than person address |
| `Company City` | 85.2% | Saint-Honore, Reston | — |
| `Company State` | 90.1% | Quebec, Virginia | — |
| `Company Country` | 90.5% | United States, Switzerland | **Best country field** — most complete |
| `Company Zip Code` | 2.8% | 33716, 75235 | Sparse |

### Web & Social

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `LinkedIn Contact Profile URL` | 33.3% | linkedin.com/in/javin-carter-... | Best social signal for outbound personalization |
| `Website` | 88.1% | cqfa.ca, gd-ots.com | Raw website URL |
| `Clean Website` | 19.9% | https://cqfa.ca | Normalized version — use this over `Website` when available |
| `Email Domain` | 3.8% | montico.net, safetycards.com | Very sparse — derive from Email Address instead |
| `Timezone` | 4.2% | america/montreal, america/new_york | Useful for send-time optimization when filled |

### Event & Campaign Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `PartsBase Email Lists` | 17.3% | PBEXPO, PartsBase Marketing | List membership label |
| `Brella Link` | 1.8% | pbexpo.brella.io/join/... | PBExpo event app join link |
| `Brella Join Code` | 1.3% | LZ94BJ, RQZSZA | PBExpo event code |
| `PBExpo Invite Sent` | — | (in ORO, not Mailchimp) | Cross-reference via ORO |
| `SMS Phone Number` | 3.7% | '+17272451939 | Has leading apostrophe artifact |
| `SMS_MARKETING_STATUS` | 3.7% | Non-subscribed, Subscribed | SMS consent status |

### Source & Provenance

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Source Tag` | 19.1% | Mailchimp, Yes | ⚠️ **80.9% blank** — confirms bulk import without consent tracking. Key finding for permission complaint root cause. |
| `PartsBase Verified` | 80.4% | ✅ Valid email, Verified Full | Email verification status |

### Unbounce Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Unbounce Page ID` | ~0% | — | Ignore |
| `Unbounce Page Variant` | ~0% | — | Ignore |
| `Unbounce Submission Date` | 0.3% | 2026-03-02 | Sparse — landing page form submissions |

### Mailchimp System Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `MEMBER_RATING` | 100% | 1, 2 | ⚠️ **Entire list is ★1–★2 only** — no ★3/4/5 contacts exist. System-wide engagement crisis. |
| `TAGS` | 99.5% | "GTM - 11/20", "PBExpo - 2026 Airlines Segment" | Multi-value field. Parse: split on comma, then `.strip().strip('"')` per tag. Contains campaign history, event segments, GTM segments. |
| `OPTIN_TIME` | 99.6% | 2024-06-25 09:26:27 | When contact was added/opted in |
| `CONFIRM_TIME` | 99.6% | 2024-06-25 09:26:27 | When opt-in was confirmed |
| `OPTIN_IP` | 88.8% | 13.58.160.245, 127.0.0.1 | IP at opt-in. `127.0.0.1` = server-side/bulk import — not a real opt-in |
| `CONFIRM_IP` | ~0% | Timestamps in this field | ⚠️ Data entry error — contains timestamps, not IPs |
| `LAST_CHANGED` | 100% | 2025-12-01, 2026-04-04 | Last time any field was updated |
| `LEID` | 100% | 623251270 | Mailchimp internal list entry ID |
| `EUID` | 100% | 4c2de1441f | Mailchimp external unique ID |
| `NOTES` | ~0% | Hash strings | Ignore |
| `GMTOFF` | 20.0% | -5, -7 | GMT offset — sparse |
| `DSTOFF` | 20.0% | -5, -7 | DST offset — sparse |
| `TIMEZONE` | 28.9% | america/montreal, america/los_angeles | More complete than GMTOFF |
| `CC` | 29.0% | ca, us | 2-letter country code from Mailchimp geo |
| `REGION` | 28.9% | ca, qc | Region code from Mailchimp geo |
| `Highest Level of Education` | 0.3% | Undergraduate, Unknown | Ignore |

---

## ICP Classification Output Fields

*Added by `classify_contacts.py` — present in `icp_classification_output.csv` but not the raw Mailchimp export.*

| Field | Values | Notes |
|---|---|---|
| `Inferred Tier` | Tier1, Tier2, Tier3, LowPriority, AntiPersona, Unknown | Primary classification result |
| `Inferred Segment` | Distributor, MRO, Broker, OEM, Airline, etc. | Sub-segment within tier |
| `Confidence` | 40%–100% | Match strength — filter ≥70% for high-confidence sends |
| `Match Reason` | "ICP label: MRO Managers", "Job title: pilot" | Debug field — explains why tier was assigned |
| `List Type` | subscribed, unsubscribed, cleaned | Which export file the row came from |

---

## Field Quality Summary

| Rating | Fields |
|---|---|
| 🟢 Reliable (>80% fill, clean) | Email Address, First/Last Name, Company Name, Job Title, ICP, Anual Revenue, Company Country, Company State, MEMBER_RATING, OPTIN_TIME, LAST_CHANGED |
| 🟡 Usable (40–80% fill or minor issues) | Country, LinkedIn URL, Employee Count, TAGS, Person City/State, TIMEZONE |
| 🔴 Problematic (<15% fill or dirty) | Aviation Industry Class, Phone Number, Contact Status, Source Tag, PartsBase Member, Business Model, Revenue Range, Work Phone (apostrophe prefix) |
| ⛔ Ignore | Unbounce fields, NOTES, CONFIRM_IP, Suffix, SMS fields (too sparse) |

---

## Data Quality Flags

| Issue | Field | Impact |
|---|---|---|
| 80.9% blank Source Tag | `Source Tag` | Cannot determine consent origin for most contacts — root cause of permission complaints |
| Entire list is ★1–★2 | `MEMBER_RATING` | No engagement tiers available — can't filter by engagement score |
| Contact Status used as free-text notes | `Contact Status` | Not usable programmatically without cleanup |
| PartsBase Member field contains part numbers | `PartsBase Member` | Not a reliable customer flag (~200 rows have part numbers) |
| Work Phone has leading apostrophe | `Work Phone` | Strip leading `'` before using |
| CONFIRM_IP contains timestamps | `CONFIRM_IP` | Wrong data in wrong field — ignore |
| OPTIN_IP = 127.0.0.1 | `OPTIN_IP` | Indicates server-side/bulk import, not genuine web opt-in |
| ICP field is persona label, not segment name | `ICP` | "MRO Managers in Aviation" ≠ "MRO" — must parse with pattern matching |
| TAGS require double-quote stripping | `TAGS` | Parse: `[t.strip().strip('"') for t in val.split(',')]` |
