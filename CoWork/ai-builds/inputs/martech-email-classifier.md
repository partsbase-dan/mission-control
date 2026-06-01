# Brief: MarTech Email Classifier

## Problem
Incoming leads from our aviation parts marketplace need email response prioritization. We receive ~500 inbound lead emails/day and sales reps manually decide which to respond to first. We lose deals because high-value leads sit in a queue behind low-value ones.

## What I want to build
An AI classifier that scores inbound lead emails by estimated deal value and urgency, then writes the ranked list to a JSON file that our CRM (Oro) can consume. The classifier runs on demand or on a schedule (every 30 min during business hours).

## Success criteria
- Classify each inbound email with a score (1–10) and a reason (1 sentence)
- Output is a valid JSON file consumable by Oro CRM
- p95 latency under 3 seconds per email
- Cost under $0.01 per email classified

## Known constraints
- Stack: Python, Anthropic SDK (Claude Haiku for cost), M365 connector for email pull
- No PII should be logged beyond what's already in the CRM
- Must handle malformed/spam emails gracefully (no crashes)
- Oro CRM expects a specific JSON schema (TBD — need to check with CRM team)

## Open questions
- What Oro JSON schema is expected? Need to confirm with CRM team before building output layer.
- Should classification history be stored? If so, where?
