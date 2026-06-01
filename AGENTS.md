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

## Durable Operating Rules

- Verify current status from the specific source docs before acting on time-sensitive claims.
- Do not treat old dashboard screenshots, archive files, or historical exports as current unless the user says to.
- Week-by-week project status belongs in `CoWork/dashboard-state.json`, dashboard source data, or a dated brief, not in this file.
- CRM/MAP consolidation is under evaluation unless a newer source states a decision. Verify before assuming HubSpot, ORO, or Mailchimp direction.
- Marketo is out of scope unless a newer stakeholder decision says otherwise.
- Loop in Omar Servin before committing to new AI tooling or internal AI architecture decisions.
- Loop in Sergio Corona for vendor onboarding, contracts, and IT rollout concerns.
- Rodrigo Garcia prefers process and metrics framing; keep leadership updates concise and tied to business numbers.

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