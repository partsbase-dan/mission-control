# PartsBase Workspace

## Scope

Dan's working environment for PartsBase Inc., scoped to his role as Senior AI Engineer, Martech. Use this workspace for PartsBase GTM technology, outbound motion, marketing operations, RevOps analytics, AI workflows, and related strategy.

Do not use this file as the live status record. For current status, read the dashboard data and the specific source docs listed below.

## Stable Context

- Company: PartsBase Inc., aviation parts marketplace.
- Role: Senior AI Engineer, Martech.
- Start date: May 18, 2026.
- Mandate: build the GTM tech stack, launch the outbound motion, and embed AI across marketing, sales, and RevOps.
- Success measure: adopted systems, transformed workflows, and revenue influenced, not tools implemented.
- Operating posture: tie every build to a number such as meetings booked, leads routed faster, pipeline influenced, sender reputation improved, or attribution made reliable.

## Current Sources Of Truth

| Need | Read |
|---|---|
| Mission Control dashboard and day-to-day state | `CoWork/dashboard.html`, `CoWork/dashboard-state.json` |
| Daily brief, week preview, build digest workflows | `CoWork/toolbox/morning-brief.md`, `CoWork/toolbox/week-preview.md`, `CoWork/toolbox/build-digest.md` |
| 180-day plan and priorities | `partsbase-success-plan.md`, `CoWork/dashboard-state.json` |
| Stakeholders, vendors, colleagues | `CoWork/memory/people.md` |
| Aviation and MarTech terminology | `CoWork/memory/terminology.md` |
| ICP and revenue segmentation | `resources/icp-brief.md`, `memory/icp.md`, `resources/reference/target-audience.md` |
| COO goals and framing | `memory/coo-goals.md` |
| Historical AI lead machine and deliverability context | `memory/historical-context.md` |
| Mailchimp audit and remediation plan | `resources/mailchimp-audit-findings.md`, `resources/mailchimp-action-plan.md` |
| ORO/Mailchimp cross-reference analysis | `resources/ORO CRM/oro_mailchimp_cross_reference_findings.md`, `resources/ORO CRM/oro_mailchimp_next_steps.md` |
| Website tracking plan | `resources/partsbase-tracking-config.json`, `scripts/tracking_plan_generator.py` |
| SEO baseline | `resources/seo-audit-day0.md` |
| Outbound prompt/workflow assets | `resources/outbound-workflow/` |
| **Live CRM, subscription, deal, and call data** | **Amelia MCP** — query via `mcp__Amelia__query_athena`. Supersedes ORO static exports for customer counts, churn, pipeline, and deal revenue. Capability brief: `resources/AMELIA MCP - Capability Brief.md` |
| GTM metrics (machine-readable, versioned) | `resources/revops/gtm-data.json` — updated from Amelia on 2026-05-27 |

## Durable Operating Rules

- Verify current status from the specific source docs before acting on time-sensitive claims.
- Do not treat old dashboard screenshots, archive files, or historical exports as current unless the user says to.
- Week-by-week project status belongs in `CoWork/dashboard-state.json`, dashboard source data, or a dated brief, not in this file.
- **Amelia MCP is the authoritative source for all CRM, subscription, and PartStore metrics** (live as of 2026-05-20). Always query Amelia before trusting static ORO exports for customer counts, churn, deal pipeline, and call activity. ORO files in `resources/customerdata/` are point-in-time snapshots; Amelia reflects live Athena data. Follow the three-step catalog protocol: `get_catalog()` → `get_catalog(source:)` → `query_athena()`.
- **Stack decisions confirmed May 22, 2026:** HubSpot CRM + Marketing Hub is the new contact/pipeline/MAP platform. ORO transitions to leads-only tracking — HubSpot manages contacts and feeds leads to ORO for downstream system integration. Mailchimp replaced by HubSpot Marketing Hub. Clay confirmed for data enrichment. Vector confirmed for visitor de-anonymization. These are decided — not under evaluation.
- Marketo is out of scope.
- RB2B is out of scope — Vector is the confirmed de-anonymization choice.
- Loop in Omar Servin before committing to new AI tooling or internal AI architecture decisions.
- Loop in Sergio Corona for vendor onboarding, contracts, and IT rollout concerns.
- Rodrigo Garcia prefers process and metrics framing; keep leadership updates concise and tied to business numbers.

## Tech Stack

### Current (Active)

| Layer | Tool | Status | Notes |
|---|---|---|---|
| CRM | ORO | 🟡 Active → leads-only | Transitions to leads tracking only — HubSpot manages contacts/pipeline and feeds leads to ORO for downstream systems |
| Email / MAP | Mailchimp | 🔴 Broken → migrating | Replaced by HubSpot Marketing Hub — sender rep emergency, remediation required before cutover |
| Tracking | GA4 + GTM | 🔴 Broken | SPA History Change trigger bug — Day 7 fix target |
| Project Management | ClickUp | 🟢 Active | Historical data files sourced from here |

### Confirmed — Phase 1 (Onboarding)

| Layer | Tool | Status | Notes |
|---|---|---|---|
| CRM + MAP | HubSpot CRM + Marketing Hub | ⏳ Onboarding | Replaces ORO (CRM) + Mailchimp (email). Single platform. Confirmed May 22. |
| Data Enrichment | Clay | ⏳ Confirmed | POC target: Day 30 (June 17). Outbound workflow backbone. |
| Visitor De-Anon | Vector | ⏳ Confirmed | ICP filtering + ad retargeting export (Google/Meta/LinkedIn). ~37% visitor ID rate. Preferred over RB2B. Confirmed May 22. |
| AI Outreach | Claude API | ⏳ Phase 1 | Personalization layer running on Clay output |
| Compliance | CookiePro | ⏳ Phase 1 | GDPR/CCPA required — 217 countries |

### Roadmap — Phase 2–3

| Layer | Tool | Phase | Notes |
|---|---|---|---|
| SEO | SEMrush + Google Search Console | Phase 2 | Needs SPA fix first |
| Social Outbound | MeetAlfred | Phase 2 | LinkedIn sequences alongside email |
| Experimentation | Optimizely | Phase 2 | A/B testing for campaigns and landing pages |
| UX Analytics | Hotjar | Phase 2 | Pricing and demo pages first |
| Attribution | Looker Studio + HubSpot | Phase 3 | Needs 90 days of clean GA4 data |

---

## Prompt And Workflow Conventions

- Treat prompts like code.
- Store production prompts in `resources/outbound-workflow/` with clear INPUT and OUTPUT contracts.
- Prefer structured JSON outputs for automated workflows.
- Version prompt changes instead of silently overwriting prior behavior.
- Document as you build so playbooks protect the work and make adoption easier.

## Scripts

Scripts live in `scripts/`. Prefer using or improving the existing scripts before creating new one-off analyses.

Key scripts include tracking plan generation, Mailchimp audit, ORO/Mailchimp contact classification, funnel analysis, attribution analysis, SEO checks, and email sequence analysis.

## Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---