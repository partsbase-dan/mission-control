# /build Skill
# Trigger: Dan types /build after dropping a brief in ai-builds/inputs/
# Reads: most recent .md in ai-builds/inputs/, ai-builds/data/projects.json, memory/ai-builds/projects.md, spec-driven-workflow SKILL.md
# Writes: ai-builds/outputs/spec-{name}-{DATE}.md, ai-builds/data/projects.json (update), ai-builds/data/build-log.json (append)
# CRITICAL: NEVER write to ai-builds/inputs/. Read only.

You are running the /build command for Dan Rodgers, Senior AI Engineer for Marketing Tech at PartsBase.

## Step 1 — Read the brief

Find the most recently modified .md file in ai-builds/inputs/.
Read it in full. Extract:
- Problem statement: what is this build solving?
- Success criteria: what does "done" look like?
- Known constraints: stack preferences, performance requirements, integration targets
- Open questions: anything ambiguous or missing

If the brief is too vague to spec (missing problem statement or success criteria), STOP and ask Dan to clarify before proceeding. Do not guess.

## Step 2 — Read spec-driven-workflow

Read ~/Claude/claude-skills/engineering/skills/spec-driven-workflow/SKILL.md.
Apply its Phase 1 (Gather Requirements) and Phase 2 (Write Spec) protocols.
The spec MUST follow the §1–§9 template exactly — no sections skipped.

## Step 3 — Produce the spec

Write to: ai-builds/outputs/spec-{brief-filename-without-extension}-{YYYY-MM-DD}.md

The spec MUST contain all 9 sections:

### §1. Title and Metadata
- Title, author (Dan Rodgers), date, status: Draft
- Reviewers: [pending Dan approval]

### §2. Context
- Why this build exists (2–4 paragraphs with evidence from the brief)
- How it fits into the PartsBase MarTech AI stack

### §3. Functional Requirements
- Numbered FR-1, FR-2, ... using RFC 2119 keywords (MUST/SHOULD/MAY)
- Each requirement is atomic and independently testable

### §4. Non-Functional Requirements
- Performance: measurable thresholds (e.g., "MUST respond in < 2s p95")
- Security: auth, secrets, PII handling
- Reliability: error rates, retry behavior
- Cost: token budget if LLM is involved (reference llm-cost-optimizer patterns)

### §5. Acceptance Criteria
- Given/When/Then format
- Each AC references at least one FR-N or NFR-N
- Cover both happy path and primary failure modes

### §6. Edge Cases
- EC-1, EC-2, ... — one per external dependency
- Failure modes: API timeouts, malformed data, auth expiry, rate limits

### §7. API Contracts
- TypeScript-style interfaces for all request/response shapes
- Cover success and error responses

### §8. Data Models
- Table format: field | type | constraints | description
- Every entity from FR section must have a model

### §9. Out of Scope
- Explicit exclusions with one-line reasoning
- Prevents scope creep during implementation

### Build Plan (append after §9)
Table: Block | What gets built | Who | Output | Done when...
Blocks should be ~1h each. "Who" = Cowork or Dan.

## Step 4 — agenthub flag

If the brief mentions any of: "parallel approaches", "compare implementations", "A/B test", "explore options", "multiple solutions", "tournament":
Add this note at the TOP of the spec (before §1):

> ⚡ **AGENTHUB CANDIDATE** — After spec approval, run `~/Claude/claude-skills/engineering/agenthub/` with `/hub:run` to spawn parallel agents competing on implementation approaches. See agenthub SKILL.md for setup.

## Step 5 — Update tracking

Update ai-builds/data/projects.json:
- If this project already exists (match by name): update status, phase, last_updated, next_action
- If new: append a new entry with a new id (proj_NNN format), status="spec", phase="design"
- Set next_action to: "Review spec at ai-builds/outputs/spec-{name}-{DATE}.md and approve"

Append to ai-builds/data/build-log.json (entries array):
{
  "id": "build_{timestamp}",
  "project_id": "{matched or new proj id}",
  "timestamp": "{ISO timestamp ET}",
  "action": "build-invoked",
  "brief": "ai-builds/inputs/{filename}",
  "output": "ai-builds/outputs/spec-{name}-{DATE}.md",
  "skill_used": "spec-driven-workflow",
  "status": "spec-draft"
}

## Step 6 — Sign off

Present to Dan:
- Path to the spec file
- The project entry in projects.json (id, name, status)
- Any open questions that need answers before implementation begins
- Whether agenthub was flagged and why

State clearly: "Spec is in draft. Review it and say 'spec approved' to proceed to implementation."

CRITICAL: NEVER write to ai-builds/inputs/ at any point.
CRITICAL: No implementation scaffolding until Dan approves the spec.
