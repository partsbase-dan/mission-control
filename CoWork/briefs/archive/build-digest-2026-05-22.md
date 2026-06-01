# Build Status Digest — 2026-05-22
*Generated 9:00am ET Friday · 6 projects tracked*

## 🔨 In Progress

| Project | Phase | Last Updated | Next Action | Sprint End |
|---------|-------|-------------|-------------|-----------|
| GA4 + GTM SPA Fix | implementation | 2026-05-21 | Confirm front-end framework with eng (React/Next.js/Angular), deploy GTM History Change trigger | 2026-05-28 |
| Mailchimp Sender Reputation Recovery | implementation | 2026-05-21 | Suppress 213k dead contacts immediately; set up re-engagement for borderline segment | 2026-06-04 |
| HubSpot Setup | planning | 2026-05-21 | Evaluate ORO CRM state — migrate vs. start fresh; get HubSpot access provisioned | 2026-06-11 |
| Clay + Claude Outbound POC | planning | 2026-05-21 | Seed Clay table with aviation parts supplier contacts (distributors + surplus dealers) | 2026-06-11 |

> **GA4 + GTM SPA Fix** sprint ends 2026-05-28 — 6 days out. On track but no slack.

## ✅ Shipped This Week

Nothing shipped — carry on.

## 📋 In Spec / Awaiting Approval

- **MarTech Email Classifier** — Spec at `ai-builds/outputs/spec-martech-email-classifier-2026-05-21.md`. Blocked on Dan's approval.
  - ⚠️ Downstream blocker: Oro CRM output JSON schema TBD — need CRM team confirmation before Block 3.

These are blocked on Dan's spec approval.

## 📦 Backlog

- **Campaign Intelligence Agent** — AI agent for campaign performance analysis and optimization recommendations via Mailchimp MCP. Seed entry — revisit when content domain is active.

## 🚧 Blocked

| Project | Blocker |
|---------|---------|
| GA4 + GTM SPA Fix | Engineering access to GTM container |
| HubSpot Setup | GA4 fix (proj_003) should precede HubSpot tracking integration; Omar Servin approval required for new tool onboarding |
| Clay + Claude Outbound POC | HubSpot must be live to load sequences (proj_004) |
| MarTech Email Classifier | Oro CRM output JSON schema TBD — need CRM team confirmation before Block 3 |

## 🔧 This Week's /build Runs

| Timestamp | Project | Brief | Output | Status |
|-----------|---------|-------|--------|--------|
| 2026-05-21 13:05 ET | MarTech Email Classifier | ai-builds/inputs/martech-email-classifier.md | ai-builds/outputs/spec-martech-email-classifier-2026-05-21.md | spec-draft |

## 👀 Next Week

- **GA4 + GTM SPA Fix** — Sprint ends 2026-05-28. Must resolve GTM container access with engineering this week or sprint slips.
- **Mailchimp Sender Reputation Recovery** — Run 213k suppression; launch re-engagement segment. Sprint end 2026-06-04 — two weeks of runway but this is a live emergency.
- **HubSpot Setup** — Advance ORO evaluation and get access provisioned. Blocks the entire outbound stack.
- **Clay + Claude Outbound POC** — No action until HubSpot is live (proj_004).
- **MarTech Email Classifier** — Approve spec and get Oro CRM schema confirmed to unblock Block 3.

---
*ai-builds · Mission Control · ~/Claude/PartsBase/CoWork/*
