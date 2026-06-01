# PartsBase Mission Control — Working Memory

## Me
Dan Rodgers, Senior AI Engineer, Marketing Technology, PartsBase.
Email: drodgers@partsbase.com | Timezone: US Eastern (ET)
Working style: rigorous, direct, no fluff — breadth and rigor equally.

## Deep Context (read before starting any domain work)

Full context lives one level up at `/Users/drodgers/Claude/PartsBase/`, but the parent `CLAUDE.md` is only an index. Read the specific canonical source for the question:
- **Role, source map, durable rules** → `CLAUDE.md`
- **Current dashboard state** → `../dashboard-state.json` (PartsBase root; dashboard fetches this file)
- **ICP + revenue data** → `resources/icp-brief.md`, `memory/icp.md`
- **Prior AI lead machine + deliverability research** → `memory/historical-context.md`
- **COO startup goals** → `memory/coo-goals.md`
- **All contacts** → `CoWork/memory/people.md` (this folder)
- **Aviation + MarTech terms** → `CoWork/memory/terminology.md` (this folder)
- **180-day plan** → `partsbase-success-plan.md`
- **Live CRM/subscription/deal metrics** → **Amelia MCP** (`mcp__Amelia__query_athena`). Use this instead of ORO exports for any metric that can be queried live. Verified 2026-05-27: 6,695 active accounts, 2.7% annual churn, $36.8M 2025 booked revenue. Capability brief: `resources/AMELIA MCP - Capability Brief.md`

`CoWork/memory/` holds operational state only (live patterns, build context). Stable knowledge lives in the parent.

## People
| Who | Role |
|-----|------|
| **Dan** | Dan Rodgers — me |
| **Rodrigo Garcia** | CTOO — direct manager. Process + metrics framing. Monday 5-bullet update. |
| **Omar Servin** | Enterprise IT Architect — loop in before any tool commitment |
| **Sergio Corona** | IT Architect — vendor onboarding + contracts |
| **Alejandra Avalos** | Contractor — currently runs all Mailchimp sends |

Full contact details → `memory/people.md`

## Terms
| Term | Meaning |
|------|---------|
| PB | PartsBase |
| MC | Mission Control (this system) |
| MarTech | Marketing Technology team |
| ET | Eastern Time |

Full term decoder (35 terms, aviation + MarTech) → `memory/terminology.md`

## Projects
| Name | What |
|------|------|
| **Mission Control** | This AI OS — work-ops + ai-builds + stub domains |

## Active Domains
| Domain | Status |
|--------|--------|
| work-ops | Fully built — daily M365 digest, /triage, week preview |
| ai-builds | Fully built — project tracker, /build skill, Fri digest |
| investments | Stub only — future build |
| content | Stub only — future build |
| personal | Stub only — future build |

## Key Invariants
- `inputs/` directories are NEVER auto-overwritten by any workflow
- Check PRD-mission-control.md before making structural changes
- For deep context, use parent `CLAUDE.md` as the index, then read the specific source files it names
- `CoWork/memory/` is operational state only — people.md and terminology.md are the exceptions (canonical)

## Skills Available (~/Claude/claude-skills/)
- `engineering/skills/spec-driven-workflow` — spec-first build workflow
- `engineering/agenthub` — multi-agent parallel builder
- `engineering/skills/mcp-server-builder` — MCP server scaffolding
- `engineering/llm-cost-optimizer` — LLM cost architecture
- `engineering/prompt-governance` — production prompt versioning
- `engineering/karpathy-coder` — code quality (/karpathy-check)
- `project-management/skills/meeting-analyzer` — Teams transcript analysis
- `finance/business-investment-advisor` — investment ROI/IRR/NPV

## Preferences
- Responses: terse, no filler, show reasoning not just conclusions
- Code: Karpathy-simple — minimum code that solves the problem
- Builds: spec-first, always — no implementation without approved spec
