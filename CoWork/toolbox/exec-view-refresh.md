# Exec View Refresh

Use this prompt for the weekly/manual Exec View scheduled task.

## Purpose

Refresh the leadership-facing snapshot without disturbing operational dashboard state.

## Folders Required

The scheduled task must have access to:

- `/Users/drodgers/Claude/PartsBase`
- `/Users/drodgers/Claude/PartsBase/CoWork`

Do not run this task with only the `CoWork` folder available. It needs root-level `resources/`, `memory/`, `partsbase-success-plan.md`, and `dashboard-state.json`.

## Read

- `/Users/drodgers/Claude/PartsBase/dashboard-state.json`
- `/Users/drodgers/Claude/PartsBase/partsbase-success-plan.md`
- `/Users/drodgers/Claude/PartsBase/resources/ORO CRM/oro_mailchimp_cross_reference_findings.md`
- `/Users/drodgers/Claude/PartsBase/resources/ORO CRM/oro_mailchimp_next_steps.md`
- `/Users/drodgers/Claude/PartsBase/resources/mailchimp-action-plan.md`
- `/Users/drodgers/Claude/PartsBase/resources/mailchimp-audit-findings.md`
- `/Users/drodgers/Claude/PartsBase/CoWork/work-ops/data/calendar-today.json`
- `/Users/drodgers/Claude/PartsBase/CoWork/work-ops/data/inbox-snapshot.json`
- `/Users/drodgers/Claude/PartsBase/CoWork/ai-builds/data/projects.json`
- `/Users/drodgers/Claude/PartsBase/CoWork/ai-builds/data/build-log.json`

## Write

Update only:

- `/Users/drodgers/Claude/PartsBase/dashboard-state.json`

Never write to:

- `/Users/drodgers/Claude/PartsBase/CoWork/dashboard-state.json`
- `work-ops/inputs/`
- `ai-builds/inputs/`
- `ai-builds/data/`

## Update Rules

- Do not full-overwrite `dashboard-state.json`.
- Preserve all existing top-level keys, especially `meta`, `workstreams`, `tasks`, `milestones`, `risks`, `stack`, `notes`, and `changelog`.
- Add or update an `exec_view` object only.
- Append one changelog entry with `type: "note"` and a short summary.
- Do not make claims from files you could not read. If a source is unavailable, add that to `exec_view.source_gaps`.

## Exec View Shape

Store the refresh under this top-level key:

```json
{
  "exec_view": {
    "refreshed_at": "ISO timestamp",
    "headline": "one leadership-ready sentence",
    "summary": ["3-5 concise bullets"],
    "risks": [
      {
        "severity": "critical | high | medium",
        "title": "short risk title",
        "detail": "why it matters",
        "next_action": "specific next step",
        "owner": "person or team",
        "target_date": "YYYY-MM-DD or null"
      }
    ],
    "decisions_needed": [
      {
        "urgency": "urgent | this_week | watch",
        "decision": "decision needed",
        "needed_from": "person or team",
        "deadline": "YYYY-MM-DD or null",
        "context": "one concise sentence"
      }
    ],
    "priorities_7day": [
      {
        "rank": 1,
        "action": "specific action",
        "by": "YYYY-MM-DD or null",
        "depends_on": "dependency or null"
      }
    ],
    "proof_points_recent": [
      {
        "date": "YYYY-MM-DD",
        "item": "what changed",
        "impact": "why it matters"
      }
    ],
    "source_gaps": []
  }
}
```

## Tone

Leadership-ready, concise, metrics-first, no filler. Treat red/yellow/green as status indicators, not writing style.
