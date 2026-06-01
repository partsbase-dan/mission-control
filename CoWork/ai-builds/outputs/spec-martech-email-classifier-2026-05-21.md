# Spec: MarTech Email Classifier
**Author:** Dan Rodgers | **Date:** 2026-05-21 | **Status:** Draft
**Reviewers:** Dan Rodgers (approval required before implementation)
**Brief:** ai-builds/inputs/martech-email-classifier.md
**Skill:** spec-driven-workflow

---

## §1. Title and Metadata

| Field | Value |
|-------|-------|
| Name | MarTech Email Classifier |
| Version | 0.1 — Draft |
| Author | Dan Rodgers, Senior AI Engineer, MarTech |
| Date | 2026-05-21 |
| Status | **Draft — awaiting Dan's approval** |
| Stack | Python 3.11+, Anthropic SDK (Claude Haiku), M365 connector |

---

## §2. Context

PartsBase receives approximately 500 inbound lead emails per day through its aviation parts marketplace. Sales representatives currently triage these emails manually, deciding which leads to respond to first based on their own judgment. This process has no systematic prioritization: a high-value fleet buyer requesting bulk parts can sit in the same queue as a spam message or a low-urgency price inquiry.

The business impact is deal loss through response latency. Aviation parts buyers often source from the first vendor to respond. A classifier that surfaces the highest-value leads in under 3 seconds per email, running on a 30-minute refresh cycle during business hours, directly reduces time-to-first-response for the top of the queue.

This classifier is a standalone Python service. It pulls inbound emails via the M365 connector, scores each with Claude Haiku (optimized for cost and speed), and writes a ranked JSON file that the Oro CRM can consume to reorder the lead queue. It does not take any action in the CRM — it only produces the ranked output file. CRM writes remain a human or separate-system action.

**Open question (blocker for output layer):** The Oro CRM JSON schema for queue reordering has not been confirmed. The classifier MUST produce output conforming to that schema, but the schema is TBD pending CRM team confirmation. The classifier's internal scoring logic can be built and validated before this is resolved; only the output serialization layer is blocked.

---

## §3. Functional Requirements

**FR-1:** The classifier MUST fetch all inbound lead emails received in the last 30 minutes from the M365 Outlook connector.

**FR-2:** The classifier MUST score each email on a scale of 1–10 (10 = highest value/urgency) using Claude Haiku.

**FR-3:** The classifier MUST produce a one-sentence reason for each score (≤ 20 words).

**FR-4:** The classifier MUST write a ranked JSON output file sorted by score descending.

**FR-5:** The classifier MUST handle spam or malformed emails without crashing — assign score 1 with reason "Unable to classify."

**FR-6:** The classifier SHOULD run on a schedule (every 30 minutes, Mon–Fri 8am–6pm ET).

**FR-7:** The classifier SHOULD run on-demand when invoked manually.

**FR-8:** The classifier MUST NOT log email body content beyond what is already stored in the CRM.

**FR-9:** The classifier MUST NOT write to or modify any data in the Oro CRM directly — output is file-only.

**FR-10:** The output JSON MUST conform to the Oro CRM queue schema (schema TBD — see Open Questions).

---

## §4. Non-Functional Requirements

**NFR-1 — Latency:** p95 end-to-end classification time MUST be ≤ 3 seconds per email. Batch of 30 emails MUST complete in ≤ 60 seconds total.

**NFR-2 — Cost:** Cost per email classified MUST be ≤ $0.01 using Claude Haiku pricing. Target: ≤ $0.003 per email (Haiku input ~$0.80/1M tokens; ~500 token prompt per email = $0.0004 input + output).

**NFR-3 — Reliability:** The classifier MUST complete its run and write output even if individual emails fail classification. A single email error MUST NOT abort the batch.

**NFR-4 — Security:** Email metadata (sender, subject, timestamp) MAY be logged for debugging. Email body content MUST NOT be written to any log file or persistent store outside of what M365 already retains.

**NFR-5 — Secrets:** The Anthropic API key MUST be stored as an environment variable (`ANTHROPIC_API_KEY`). MUST NOT be hardcoded or committed to version control.

**NFR-6 — Observability:** Each run MUST log: timestamp, emails processed, emails scored, total cost estimate, p95 latency, any errors. Log format: structured JSON to stdout.

---

## §5. Acceptance Criteria

**AC-1** *(covers FR-1, FR-2, FR-3)*
- Given: 10 inbound emails in the M365 inbox from the last 30 minutes
- When: the classifier runs
- Then: all 10 emails are scored 1–10 with a reason string ≤ 20 words each

**AC-2** *(covers FR-4)*
- Given: a completed classification run with N emails
- When: the output file is written
- Then: emails are sorted by score descending and the file is valid JSON

**AC-3** *(covers FR-5)*
- Given: one email in the batch has a malformed body (null or binary content)
- When: the classifier processes it
- Then: it receives score=1, reason="Unable to classify", and the rest of the batch completes normally

**AC-4** *(covers NFR-1)*
- Given: a batch of 30 emails
- When: the classifier runs end-to-end
- Then: total wall-clock time ≤ 60 seconds; no individual email exceeds 3s p95

**AC-5** *(covers NFR-2)*
- Given: a batch of 100 emails
- When: the classifier runs
- Then: total Anthropic API cost ≤ $1.00 (≤ $0.01/email)

**AC-6** *(covers FR-8, NFR-4)*
- Given: any run completes
- When: logs are inspected
- Then: no email body content appears in any log output or file

**AC-7** *(covers FR-9)*
- Given: any run completes
- When: Oro CRM is inspected
- Then: no data has been written to or modified in Oro by the classifier

**AC-8** *(covers FR-6)*
- Given: it is a weekday between 8am–6pm ET
- When: 30 minutes have elapsed since last run
- Then: the classifier triggers automatically and completes without manual intervention

---

## §6. Edge Cases

**EC-1 — M365 connector timeout:** If the email fetch call times out after 10 seconds, log the error and exit cleanly with an empty output file. Do not retry infinitely.

**EC-2 — Anthropic API rate limit (429):** Implement exponential backoff: wait 1s, 2s, 4s, then fail the individual email with score=1, reason="Rate limited." Do not abort the batch.

**EC-3 — Anthropic API unavailable (5xx):** If the API returns 5xx for 3 consecutive attempts on the same email, assign score=1, reason="API unavailable." Continue with remaining emails.

**EC-4 — Zero emails in window:** If no emails were received in the last 30 minutes, write an output file with an empty `emails` array and exit cleanly. Do not error.

**EC-5 — Email with no subject or sender:** Treat as low-priority: score=1, reason="Missing metadata."

**EC-6 — Output file write failure (disk full, permissions):** Log the error to stderr and exit with code 1. Do not silently fail.

**EC-7 — Oro schema not yet defined (current state):** The output layer uses a placeholder schema until the CRM team confirms. The classifier MUST be designed so only the serializer function needs to change when the real schema is confirmed — scoring logic is schema-agnostic.

---

## §7. API Contracts

```typescript
// Classifier input (per email)
interface EmailInput {
  id: string;              // M365 message ID
  from: string;            // sender email
  subject: string;         // email subject
  preview: string;         // first 500 chars of body (for scoring only, not persisted)
  received: string;        // ISO 8601 timestamp
}

// Classifier output (per email)
interface ScoredEmail {
  id: string;              // M365 message ID (passthrough)
  from: string;
  subject: string;
  received: string;
  score: number;           // 1–10, integer
  reason: string;          // ≤ 20 words
}

// Output file root
interface ClassifierOutput {
  run_at: string;          // ISO 8601 ET timestamp
  emails_processed: number;
  emails_scored: number;
  cost_estimate_usd: number;
  p95_latency_ms: number;
  emails: ScoredEmail[];   // sorted score descending
}

// Claude Haiku prompt contract
interface ClassifierPrompt {
  system: string;          // role + scoring rubric
  user: string;            // "From: {from}\nSubject: {subject}\nPreview: {preview}"
}

// Claude Haiku response (parsed from completion)
interface ClassifierResponse {
  score: number;           // 1–10
  reason: string;          // ≤ 20 words
}

// Run log entry (stdout, structured JSON)
interface RunLog {
  timestamp: string;
  emails_processed: number;
  emails_scored: number;
  errors: number;
  cost_estimate_usd: number;
  p95_latency_ms: number;
  status: "success" | "partial" | "empty" | "error";
}
```

---

## §8. Data Models

### ScoredEmail (output JSON record)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | required, unique | M365 message ID |
| from | string | required | Sender email address |
| subject | string | required | Email subject line |
| received | string | ISO 8601 | When email was received |
| score | integer | 1–10, required | Lead value/urgency score |
| reason | string | ≤ 20 words, required | One-sentence score justification |

### ClassifierOutput (output file)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| run_at | string | ISO 8601 ET | Timestamp of this run |
| emails_processed | integer | ≥ 0 | Total emails fetched |
| emails_scored | integer | ≤ emails_processed | Emails successfully scored |
| cost_estimate_usd | float | ≥ 0 | Estimated Anthropic API cost |
| p95_latency_ms | integer | ≥ 0 | p95 per-email latency |
| emails | ScoredEmail[] | sorted desc by score | Ranked email list |

### Scoring Rubric (prompt-level, not persisted)

| Score | Meaning |
|-------|---------|
| 9–10 | High-value fleet buyer, bulk request, named company, urgent timeline |
| 7–8 | Clear purchase intent, specific part numbers, reasonable volume |
| 5–6 | General inquiry, price check, may convert |
| 3–4 | Low specificity, vague request, no company info |
| 1–2 | Spam, malformed, no commercial intent |

---

## §9. Out of Scope

| Item | Reason |
|------|--------|
| Writing to Oro CRM | Classifier is read-only. CRM writes are a separate action by sales reps or a future integration. |
| Email body storage/logging | PII/data handling risk. Body preview used only in-memory for classification. |
| Historical classification database | Not needed for v1. Output file is sufficient for CRM queue reorder. Add in v2 if analytics are needed. |
| Multi-mailbox support | Single mailbox (drodgers@partsbase.com) in scope. Generalization is a future concern. |
| UI or dashboard | Output is a file. Visualization is a separate concern. |
| Auto-response or CRM field updates | Out of scope permanently unless explicitly re-specced. |
| Oro CRM output schema | Schema TBD — output layer is a stub until CRM team confirms. |

---

## Build Plan

| Block | What gets built | Who | Output | Done when… |
|-------|----------------|-----|--------|-----------|
| 0 — Setup | Repo structure, `.env` template, dependencies (`anthropic`, `requests`), logging scaffold | Cowork | `classifier/` directory, `requirements.txt`, `.env.example` | `python -c "import anthropic"` succeeds |
| 1 — Fetch layer | M365 email fetch function using connector; returns `EmailInput[]` | Cowork | `classifier/fetch.py` | Unit test: fetch returns ≥ 0 emails for last 30 min window |
| 2 — Score layer | Claude Haiku scoring function; prompt template; retry logic for EC-2/EC-3 | Cowork | `classifier/scorer.py` | Unit test: given sample email, returns valid ScoredEmail |
| 3 — Output layer | Serializer (placeholder Oro schema); output file writer; run log | Cowork | `classifier/output.py` | Output file validates against ClassifierOutput interface |
| 4 — Scheduler | Cron wrapper or scheduled task; on-demand invoke support | Dan + Cowork | `classifier/run.py` | Runs on schedule; completes AC-8 |
| 5 — Validation | End-to-end test with 10 real emails; cost check; latency check; log inspection | Cowork | Test report | AC-1 through AC-8 all pass |

---

## Open Questions (must resolve before Block 3 begins)

1. **Oro CRM output schema** — What JSON structure does Oro expect for queue reordering? Who is the CRM team contact? This blocks Block 3 (output layer). Blocks can 0–2 proceed without it.
2. **Classification history** — Should scores be stored anywhere for analytics? Not in scope for v1, but worth confirming now to avoid a future schema migration.

---
*Spec status: DRAFT — review and say "spec approved" to begin Block 0 of the build plan.*
