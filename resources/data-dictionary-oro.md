# ORO CRM — Data Dictionary

*Generated May 22, 2026 · Source: ORO CRM export from PartsBase*

---

## Files Overview

| File | Rows | Fields | Purpose |
|---|---|---|---|
| `ORO_AllContacts.csv` | 140,706 | 105 | Full contact database — everyone in ORO |
| `ORO_Customers.csv` | 95,231 | 36 | Portal users with login accounts (buyers/admins) |
| `ORO_Competitor_table.csv` | 39 | 4 | Competitor name lookup table |
| `ORO_Industry_table.csv` | 31 | 6 | Industry classification lookup table |

**Key relationship:** `ORO_Customers.Origin Id` → `ORO_AllContacts.Id`
**Join to Mailchimp:** `ORO_AllContacts.Emails 1 Email` = `Mailchimp.Email Address`

---

## ORO_AllContacts — 105 Fields

### Identity

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Id` | 100% | 242977, 242979 | Primary key. Links to `ORO_Customers.Origin Id` |
| `First name` | 100% | Roberto, Marcos | Always populated |
| `Last name` | 99.3% | Torrefiel, Malaney | Reliable |
| `Name prefix` | ~0% | — | Effectively empty — ignore |
| `Middle name` | 0.1% | Sometimes used for "NO LONGER WITH COMPANY" notes | Data quality issue |
| `Name suffix` | ~0% | Sometimes used for departure notes ("NLT", "Not There") | Data quality issue |
| `Gender` | 0.8% | male, female | Too sparse to use |
| `Birthday` | ~0% | — | Ignore |

### Contact Information

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Emails 1 Email` | 99.1% | roberto.torrefiel@gemalto.com | **Primary join key to Mailchimp** |
| `Emails 2–10 Email` | <1% each | Additional email addresses | Rarely populated; use Email 1 |
| `Phones 1 Phone` | 94.1% | +33 157778000, 1(704)423-7000 | Format inconsistent — not normalized |
| `Phones 2–7 Phone` | <2% each | — | Sparse; ignore for bulk ops |
| `Cell phone` | ~0% | — | Effectively empty |
| `LinkedIn` | 45.6% | linkedin.com/in/... | **Best enrichment signal after email** |
| `Fax` | 15.9% | Dirty — includes "#$% &/()" | Unreliable; not usable |
| `Twitter` | ~0% | — | Ignore |
| `Facebook` | ~0% | — | Ignore |
| `Google+` | ~0% | Contains LinkedIn URLs entered in wrong field | Data entry error |
| `Skype` | ~0% | Sometimes contains email addresses | Data entry error |

### Job & Company

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Job Title` | 94.4% | Technical Consultant Director, Director Marketing | High quality — good for ICP classification |
| `Company Name` | 74.6% | Collins Aerospace, Southwest Airlines | 25% blank — use Account name as fallback |
| `Industry` | 49.8% | Manufacturing, Transportation | **Broad SIC-style categories — NOT aviation-specific.** Does NOT map to PartsBase ICP segments |
| `Description` | 1.0% | Often contains "NO LONGER WITH COMPANY" or addresses | Dirty free-text field |
| `Memo` | ~0% | "PBExpo Signature Contact" | Sparse notes field |

### Account Links

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Accounts 1 Account name` | 81.3% | Collins Aerospace, Southwest Airlines | **Best company name source** — more complete than `Company Name` |
| `Accounts Default Contact 1 Account name` | 0.9% | AerSale Inc, BK Aerospace | Only for contacts flagged as account default |
| `Accounts 2–3 Account name` | <0.2% each | — | Rare; contacts linked to multiple accounts |

### Address

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Addresses 1 Street` | 60.1% | PO Box 36611, Weg Beim Jaeger 193 | Usable for basic geo filtering |
| `Addresses 1 City` | 60.1% | Charlotte, Hamburg | — |
| `Addresses 1 State Combined code` | 59.7% | US-NC, US-TX | ISO format — useful for US regional targeting |
| `Addresses 1 Country ISO2 code` | 60.4% | US, DE | **Use for country-level segmentation** |
| `Addresses 1 Zip/Postal Code` | 60.0% | 22335, 28217 | — |
| `Addresses 1 Types 1 Name` | 4.0% | shipping, billing | Rarely populated |
| `Addresses 1 Label` | 43.2% | Company name often put here | Sometimes used as a company name field |
| `Addresses 2 & 3 (all fields)` | <0.1% | — | Effectively empty — ignore |

### CRM Metadata

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Source Name` | 75.3% | zoominfo, other | **Key enrichment flag** — "zoominfo" contacts have better ICP field data in Mailchimp |
| `Owner Username` | 54.1% | ssansom@partsbase.com, dupeaccts@partsbase.com | Assigned sales rep. `dupeaccts@` = likely duplicate/unowned contacts |
| `Assigned to Username` | 0.5% | mlarge@partsbase.com | Actively assigned — very sparse |
| `Contact Method Name` | 0.7% | phone, email | Not meaningful at this fill rate |
| `Groups 1 Label` | ~0% | Sales Group, Marketing Group | Ignore |
| `PBExpo Invite Sent` | ~0% | 1 | Boolean — almost never set |
| `Tags` | 1.2% | PBExpo, PB Expo | Very sparse — different from Mailchimp tags |

### System Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Origin ID` | 25.1% | 6840993, 472544 | External system ID (ZoomInfo or legacy). NOT the ORO internal Id |
| `Organization Name` | 4.1% | Partsbase | Appears to be the owning org — almost always "Partsbase" when filled |
| `Picture URI` | ~0% | crm.partsbase.com/... | Internal photo URLs |
| `Picture UUID` | ~0% | UUID string | — |

---

## ORO_Customers — 36 Fields

> These are **portal users** — people with an active login to partsbase.com. This is the closest thing to a "paying customer" list in the export. 95,231 rows vs. 140,706 in AllContacts.

### Identity & Auth

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `ID` | 100% | 350039, 350040 | Primary key for Customers table |
| `First Name` | 100% | Scott, Lou | — |
| `Last Name` | 100% | Owens, Ludwig | — |
| `Email Address` | 100% | scott@acinv.com | **Primary join key** — matches `Mailchimp.Email Address` |
| `Contact Email` | 100% | same as Email Address | Usually identical to Email Address |
| `Login` | 99.5% | llludwig, scottowens | PartsBase portal username |
| `Portal Password` | 99.0% | Hashed string | 🔒 Hashed — do not use |
| `Portal Password Hint` | 99.0% | lludwig, aimsNextYear | ⚠️ Plain text hints — sensitive |
| `Origin Id` | 86.3% | 243978, 39721 | **Links to `ORO_AllContacts.Id`** — the join between these two files |

### Account & Role

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Customer Name` | 99.9% | "9724166216 - Ludwig & Associates - Carrollton" | Format: `phone - company - location`. Phone is the account ID. |
| `Site Id` | 100% | 192514, 184562 | PartsBase subscription/site ID — unique per account |
| `Website Id` | 100% | 1 | Always 1 — appears to be a system constant |
| `Owner Id` | 100% | 62, 694, 690 | Numeric ID of the assigned PartsBase sales rep |
| `Roles 1 Role` | 100% | ROLE_FRONTEND_BUYER, ROLE_FRONTEND_ADMINISTRATOR | **Most useful field in this file.** Defines what the user can do on the platform |
| `Roles 2 Role` | 2.4% | ROLE_FRONTEND_BUYER | Rare secondary role |
| `Roles 3 Role` | ~0% | ROLE_FRONTEND_ANONYMOUS | Essentially unused |
| `Site Administrator` | 45.0% | 1 | Boolean — ~half of portal users are admins of their account |

### Role Values (Roles 1 Role)

| Value | Meaning |
|---|---|
| `ROLE_FRONTEND_BUYER` | Standard portal user — can search and submit RFQs |
| `ROLE_FRONTEND_ADMINISTRATOR` | Account admin — can manage users and settings |
| `ROLE_FRONTEND_ANONYMOUS` | No meaningful access |

### Account Status

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Enabled` | 92.0% | 1 | Boolean — 8% of accounts are disabled |
| `Confirmed` | 99.5% | 1 | Email confirmed — almost universal |
| `Guest` | 0.5% | 1 | Very rare — guest/trial access |
| `Converted` | 5.7% | 1 | Meaning unclear — possibly trial → paid conversion |
| `Last Login` | 19.4% | 05/19/2026 12:11:40 | **Engagement signal** — only 19% have a recorded recent login |

### Contact Info

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Phone` | 99.3% | +1972-503-6100 | Generally reliable; format varies |
| `Cell phone` | 21.3% | 12145490540 | Sparse |
| `Fax` | 27.9% | 305-238-6572 | Fax number — low utility |
| `Extension` | 10.6% | 104, 524847 | Phone extension |
| `Job Title` | 54.0% | President, Act Exec | Less complete than AllContacts (94%) |
| `Name Prefix` | 0.3% | Mr, Retired | Ignore |

### System Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `Site Parent Id` | ~0% | — | Ignore |
| `Site Owner Id` | ~0% | — | Ignore |
| `Owner Username` | ~0% | — | Blank for all — use `Owner Id` instead |
| `Sendbird Origin Id` | 18.3% | 137957 | Chat/messaging system ID |
| `PBExpress Sent Mail` | 0.2% | 1 | Flag for PBExpress email — almost never set |

---

## ORO_Competitor_table — 4 Fields

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `ID` | 100% | 41, 40 | Primary key |
| `Name` | 100% | Higher Gov, Govly, ILS, Locatory | 39 competitors tracked in ORO |
| `Created At` | 100% | 01/06/2025 16:43:40 | When added to ORO |
| `Updated At` | 100% | 01/15/2024 15:58:23 | Last updated |

**Notable competitors in the table:** ILS, Locatory, StockMarket.aero, Aeroxchange, Govly, Higher Gov, Logicom, SAI Global

---

## ORO_Industry_table — 6 Fields

> This is the lookup table that populates the `Industry` field on AllContacts. These are PartsBase's own aviation industry categories — different from the broad `Industry` field in AllContacts.

| Field | Fill Rate | Sample Values | Notes |
|---|---|---|---|
| `ID` | 100% | 40, 36, 35 | Primary key |
| `Origin Id` | ~0% | — | Rarely set |
| `Name` | 100% | Airport, FBO/AMO, Charter Service, Distributor | **This is the PartsBase ICP taxonomy** — 31 categories |
| `Code` | 100% | APT, FBO, UNK, OTH | Short code for each industry |
| `Created At` | 100% | 2022–2025 | — |
| `Updated At` | 100% | 2025-12-05 (most recent) | — |

**Selected industry categories:** Airport (APT), FBO/AMO (FBO), Unknown (UNK), Other (OTH), Distributor, MRO, Airline, Broker, OEM, Charter Service — mirrors the PartsBase ICP segments.

---

## Data Quality Flags

| Issue | Field(s) | Impact |
|---|---|---|
| Departure notes in name fields | `Middle name`, `Name suffix` | Filter out "NO LONGER WITH COMPANY" before any send |
| Wrong data in wrong field | `Skype` (has emails), `Google+` (has LinkedIn URLs), `Twitter` (has LinkedIn) | Don't use these social fields |
| `dupeaccts@partsbase.com` as Owner | `Owner Username` | Marks unowned/duplicate contacts |
| `Industry` field ≠ aviation ICP | `Industry` | AllContacts.Industry is Manufacturing/Transportation — use `ORO_Industry_table` names for ICP work |
| Portal Password Hint in plain text | `Portal Password Hint` | Sensitive — do not include in any exports shared externally |
| Customer Name format is a phone number | `Customer Name` | Format: `phone - company - location`. Parse carefully if splitting |
| 8% of customer accounts disabled | `Enabled` | Filter `Enabled = 1` for active customer analysis |
