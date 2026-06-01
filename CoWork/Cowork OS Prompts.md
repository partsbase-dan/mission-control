# Cowork OS Prompts

## Config Metaprompt 

Draft an "Operating Instructions" doc for my Claude Cowork preferences. Make you a sharp thinking partner, not a yes-machine. Cover:

**About Me** – Pull from past conversations: name, role, what my company/team does, public work or side projects with specifics, biggest pain points, tools I use. Missing something? Ask – don't guess.

**Building anything** – PRD first (problem, success criteria, scope, constraints, plan, open questions); get sign-off before building. Check what already exists before proposing custom work.

**Pushback** – Interrogate vague requests. Disagree when something's off. Flag contradictions before acting – never silently overwrite. No sycophancy.

**Reversibility** – Before anything destructive (deleting, overwriting, comms in my name, financial actions, mass ops): show the plan, flag what's irreversible, wait for explicit "proceed."

**Note-taking** – Capture context, decisions, and open threads continuously. Checkpoint before switching domains or when a chat runs long.

**Working style** – Show reasoning, not just conclusions. Breadth and rigor. Skip filler. If I say "things changed," re-interview me.

Show me the draft, then we'll revise.

## **Phase 0 — Orient yourself (do this first)**

Before asking me anything:

* Review everything you already know about me — from memory and past conversations (search them if you can). My work, tools, active projects, goals, constraints, how I work, my timezone.  
* Do **not** ask what you can already answer. Pre-fill every answer you can infer.  
* Then give me a quick **"Here's what I already know about you"** recap — 5–7 short bullets — so I can correct anything wrong.

If you have little prior context on me, say so — the interview will just be longer.

## **Phase 1 — Propose, don't interrogate**

Make this take as little effort from me as possible. Default to **proposing, not asking.** Go one short step at a time.

**Step 1 — Suggest the projects.** Based on what you know about me, propose **4–6 candidate domains** this system could cover, each with a one-line description of what it would do for me and why it fits. Present them as a pick-list. I pick the ones I want and can add one. Don't ask "what do you want to build" open-ended.

**Step 2 — Confirm the build environment.** State your best guess, in one short block, for: my technical level (no-code / light scripting / developer) and which connectors I have (Gmail, Calendar, Drive, Slack, Notion, etc.). Frame it as "here's what I think — correct anything." The build surface is assumed to be Claude Cowork.

**Step 3 — Get the build length, then reconcile scope.** Ask the one thing you can't guess — how many hours for the first build — as a one-tap choice (e.g. 3 / 5 / 8 hours). Then immediately apply the **Scoping rule** in Fixed conventions: tell me which of my chosen domains will be fully built in that budget and which become placeholder folders for later. Let me adjust.

**Step 4 — Fill any real gaps.** Anything still genuinely unknown (timezone, when scheduled things run, anything that must never be automated) — propose a sensible default and let me confirm. One short question at a time, only if you can't infer it.

Keep my total input to a handful of picks and confirmations. The moment you have enough, move on.

## **Fixed conventions — follow these exactly, do not deviate**

Everything in this section is **fixed** and identical across every PRD this metaprompt produces. The *only* variables are the domains and the build length. Do not redesign these, do not invent alternatives, do not reinvent what the Productivity plugin already provides.

**Foundation — the Productivity plugin.** Every build sits on Cowork's **Productivity plugin.** It is installed via Cowork → Customize → Plugins → "Productivity", and initialized once by running `/start`. `/start` creates, at the project root: `CLAUDE.md` (cross-cutting working memory), `TASKS.md` (task list), `memory/` (deep-memory directory), and `dashboard.html`. The plugin also provides `/update` (action-item discovery) and a create-skill workflow. The PRD must **build on these** — never hand-roll a separate memory file, task list, or config system.

**Setup sequence — Block 0 of every build, before any data-layer work.** This is the first time Cowork runs; assume nothing is in place. Cowork verifies and guides me through, in order:

1. The Cowork project is created and pointed at a local folder (e.g. `~/cowork/`).  
2. The Productivity plugin is installed (Cowork → Customize → Plugins → "Productivity").  
3. `/start` has been run, so the plugin's root files (`CLAUDE.md`, `TASKS.md`, `memory/`, `dashboard.html`) exist.  
4. The connectors this build needs are enabled. Only once all four are confirmed does the data layer (Block 1\) begin. Custom skills in `toolbox/` are *built* during the blocks — they are not a setup prerequisite.

**Root folder skeleton — always this shape:**

```
~/cowork/                    ← Cowork project root (LOCAL folder)
├── CLAUDE.md                ← plugin: cross-cutting working memory
├── TASKS.md                 ← plugin: task list
├── memory/                  ← plugin: deep memory, organized by domain
│   ├── people.md
│   ├── terminology.md
│   └── {domain}/            ← one subfolder per domain
├── dashboard.html           ← plugin dashboard
├── PRD-{system-name}.md     ← this PRD, dropped at root for reference
├── toolbox/                 ← installable custom skills (source of truth)
├── briefs/                  ← morning-brief output + archive/
└── {domain}/                ← one folder per domain (pattern below)
```

The only variable part is which `{domain}/` folders exist. (Add a top-level `builds/` drop zone only if the autonomous-builder pattern is in scope.)

**Per-domain folder pattern — every domain is identical in shape:**

```
{domain}/
├── CLAUDE.md     ← folder-level voice/role for this domain
├── inputs/       ← human-maintained files (never auto-overwritten)
├── data/         ← machine-refreshed derived files
└── outputs/      ← generated artifacts (briefs, dashboards, docs)
```

**Memory architecture — three fixed tiers:**

1. Root `CLAUDE.md` — cross-cutting working memory: people, terminology, shorthand.  
2. `memory/{domain}/` — deep knowledge per domain.  
3. `{domain}/CLAUDE.md` — role and tone when working inside that domain.

**Naming conventions — fixed:** folders `kebab-case`; memory files `noun.md`; data files `noun.json`; date-stamped files `name-YYYY-MM-DD.md`.

**Interaction patterns — the system always exposes these:** *dashboard* (always-on visual), *brief/digest* (scheduled push), *skill* (on-demand command), and — only if build length allows — *autonomous builder* (drop a brief, get a finished work product).

**Scoping rule — build length sets how many domains fit:**

* **\~3 hours** — foundation \+ **1** domain \+ a morning brief.  
* **\~5 hours** — foundation \+ **2** domains (or 1 domain built richly \+ the builder pattern).  
* **\~8 hours** — foundation \+ **2–3** domains.  
* **More** — more domains, but never more than \~4 active domains in one window.

If I pick more domains than the budget allows, fully build the highest-priority ones and leave the rest as **placeholder folders** in the tree plus entries in §10. A solid system across two domains beats a thin, broken one across five.

## **Phase 2 — Sketch the architecture (get my sign-off before the PRD)**

Before writing the full PRD, show me a **one-page architecture sketch**, built strictly on the Fixed conventions: the domains, the folder tree, the workflows per domain mapped to interaction patterns, and the build plan at a glance (Block 0 setup \+ the hour blocks). Let me react and adjust. Then proceed.

## **Phase 3 — Produce the PRD**

Write a complete, build-ready PRD as a downloadable markdown file. Two audiences: *me* (to read and approve) and *Cowork* (to execute). It follows the Fixed conventions exactly and uses the section structure below — same sections, same order, every time.

### **Calibration — how much detail**

Aim for the depth of a real engineering build doc: concrete enough to build from with zero further design decisions, not a sprawling manual.

* The folder tree is written out **in full**, every folder with a one-line purpose comment.  
* Every data file has its **actual schema as a code block** — real field names, realistic example values. Never "schema TBD".  
* Every scheduled workflow and skill has a **complete, copy-paste-ready prompt** — specific enough to run as-is, naming the exact files it reads and writes.  
* The build plan and decision log are tables. The decision log has one row per non-obvious choice *in this design* (\~8–15 rows; no invented changelog history).  
* Detail comes from being **concrete**, not from long prose. Scale the doc to scope — a 3-hour single-domain build is a much shorter PRD than an 8-hour three-domain one.

### **Required sections — this exact structure, every time**

**1\. Executive summary** — What the system is, the domains, the interaction patterns, why it fits the stated build length and scales afterward.

**2\. Quick start — moving this into Cowork** — This PRD is produced in Claude chat; this section is the handoff to Cowork, where the build actually happens. It must contain:

* **Getting into Cowork (I do this):** open Claude Cowork, create a project pointed at a local folder (e.g. `~/cowork/`), and load this PRD into it — drop the file in the project folder, or paste its contents into the first Cowork message. This is the first time Cowork is involved; nothing is set up yet.  
* **Project instructions** — the exact text to paste into the Cowork project's custom-instructions field, as a copy-paste block (states the domains, the local data-layer location, the inputs-are-never-overwritten rule, the `Start Block N` block-by-block execution rule, the timezone).  
* **How to run the build** — instructions to Cowork: when I say to start, **assume nothing is set up yet.** FIRST run Block 0 (Setup) from §7 — verify the Productivity plugin is installed and walk me through installing it if not, have me run `/start`, verify the needed connectors are enabled and name any I must turn on. Only once setup is confirmed, build the plan one block at a time, in order; after each block, report what was done and the done-check result, then wait for my go-ahead.  
* **The first thing I say** — the literal sentence I type in Cowork to begin (e.g. "Start building — begin with Block 0").

**3\. Goals and non-goals** — Explicit. Name what is deliberately *not* in this build window and why.

**4\. Architecture overview** — The three layers (local folders → Cowork project → workflows); the interaction patterns and which workflows use each; the three-tier memory architecture; key architectural decisions and the tension behind each. All per Fixed conventions.

**5\. The data layer** — *the foundation.* It is built on the Productivity plugin's root files and follows the fixed root skeleton and per-domain pattern exactly — do not invent a different structure. Specify:

* **Where it lives — local.** Plain files in a local folder the Cowork project points at (e.g. `~/cowork/`). Not in a connector. Connectors (Drive, Gmail, Calendar, Notion) are data *sources* workflows pull from or push to — never storage. (For backup, the local folder may sit inside a synced directory, but Cowork still reads/writes local files.)  
* **The folder tree** — the full local tree, instantiating the fixed skeleton with my actual domains; one-line purpose comment per folder.  
* **Inputs vs. data.** `inputs/` is human-maintained; `data/` is machine-refreshed. A refresh task never writes to `inputs/`.  
* **Memory files** — what goes in `memory/people.md`, `memory/terminology.md`, and each `memory/{domain}/` file.  
* **Every data file gets an explicit schema** — actual JSON/CSV shape, real field names, example values.  
* **Refresh strategy** — for each `data/` file: what populates it, how often, overwrite vs. append-only, dedupe logic.  
* Naming follows the fixed conventions (memory `.md`, data `.json`).

**6\. Component specifications** — For each workflow (data pipeline, dashboard, brief, skill, builder): purpose, what it reads, what it writes, schedule, output structure. Interfaces read only from the data layer in §5.

**7\. The build plan** — Time-boxed, sized to my build length, executable. Rules:

* **It opens with Block 0 — Setup.** This is the first time Cowork runs, so assume nothing is in place. Cowork verifies and guides me through, in order: (1) confirm the Productivity plugin is installed — if not, give me the exact steps (Cowork → Customize → Plugins → "Productivity") and wait; (2) have me run `/start` and confirm the plugin's root files now exist; (3) confirm the connectors this build needs are enabled, naming any I must turn on. Cowork proceeds to Block 1 only once setup is confirmed. Quick (\~15–30 min), mostly my actions with Cowork checking.  
* **Block 1 is always the data layer** — create the full folder tree, the input files (with seed data), and the data-refresh workflows.  
* Then the first interface, then more interfaces, then polish — in that order.  
* Table columns: *Block | What gets built | Who runs it | Output | Done when…* — "Who runs it" is **Cowork** or **Me** (anything needing a terminal/CLI/cron/git; if I'm no-code, every build row must be Cowork).  
* Blocks 1…N are roughly hour-sized; **N equals my stated build length in hours.**  
* **Cut order** — ordered list of what to drop first if I run behind.  
* **Never cut** — the minimum viable core (always includes Block 0 setup, the data layer, and the morning brief).

**8\. Setup details and copy-paste prompts** — The exact folder-creation step and a **complete copy-paste-ready prompt for every workflow and skill** in the build plan, each naming the data-layer files it reads and writes, each with a `CRITICAL: never write to inputs/` guard where relevant.

**9\. Decision log** — A table: each non-obvious choice and its reasoning / trade-off.

**10\. Out of scope / future work** — What comes later (including any domains deferred by the Scoping rule, as placeholder folders), how the architecture scales without restructuring (new domain \= new folder \+ workflows), and what would force a re-architecture.

## **Principles — hold these throughout**

* **Propose, don't interrogate.** Personalize from memory; only ask what you genuinely can't infer. Keep my input minimal.  
* **Strict structure.** Follow the Fixed conventions and the §1–§10 structure exactly. The only things that vary are the domains and the build length. Do not improvise.  
* **Concrete over abstract.** Real folder names, real schemas, real prompts. No placeholders where a specific answer is possible.  
* **Build-ready in Cowork.** I should be able to paste the PRD into a Cowork project, say the start word, and have it built block by block. No step may need a tool the environment lacks unless marked as mine.  
* **The data layer is local.** Plain files in a local folder; connectors are sources, never storage; the build never creates folders in Google Drive.  
* **Use the Productivity plugin.** Never reinvent memory, tasks, or config that the plugin already provides.  
* **Flag assumptions.** State them so I can correct them.  
* **Scales without restructuring.** Design for more domains than I name today.

Start now with Phase 0\.

