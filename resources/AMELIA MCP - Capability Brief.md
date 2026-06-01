

| AMELIA MCP Capability Brief *PartsBase employees internal* |

| Status:  Production (as of 2026-05-20) | Owner:  Omar Servin | Classification:  Internal distribute within PartsBase |
| :---- | :---- | :---- |

| AMELIA MCP is a read-only data backend that lets AI assistants answer business questions about PartsBase using curated business concepts (Account, Lead, Order, Call, Worker, etc.) instead of raw SQL. Built on the Model Context Protocol, any MCP-capable client Claude Desktop, Claude Code, Cursor, VS Code, custom integrations connects with one configuration line and an API key. |
| :---- |

**1\.  What it can answer today**

AMELIA brings together nine business areas the company already knows by name. Eight are live; the web-analytics area is intentionally held back for a few weeks until enough history accumulates to produce reliable trends.

| Business area | Status | What you can ask about |
| :---- | :---- | :---- |
| CRM | live | Accounts, leads, calls, tasks, subscriptions, deals, sites |
| PartStore marketplace | live | Orders, line items, products, sellers |
| Web analytics | held | Marketplace web behavior (re-enables once enough history is collected) |
| RingCentral | live | Call analytics, extensions, SMS messages |
| Wingman / Clari | live | Call recordings, keywords, scorecards |
| Microsoft Teams | live | Teams calls |
| Calendly | live | Scheduled meetings |
| Rippling | live | Employees (active / terminated / accepted) and time entries |
| Teramind | live | Daily activity time per employee |
| Org chart | live | Employee directory and departments (the link that connects all sources) |

PartStore is covered from two angles because they answer different business questions: the marketplace data shows what was bought; web analytics shows how shoppers behaved before buying. Calls are also tracked from three angles (RingCentral, Wingman, Microsoft Teams) that each cover a different slice of phone activity.

**Sample questions answered end-to-end**

* "Who owned account FRT12766 last month and who has it now?"  
* "How many won deals did Sales Leadership close in Q1 2026?"  
* "Top 10 US sellers by GMV in April, excluding cancelled orders."  
* "Which active US employees logged zero work hours last week?"  
* "How many missed calls did Rep X have last week, including voicemail?"  
* "Did Rep Y meet the expected-presentations goal yesterday?"  
* "List US accounts with no contact in 90 days where the assigned rep is still active."

*The last two questions reach across multiple sources without the user needing to know that — AMELIA handles the joining behind the scenes.*

**2\.  Curated rules (why answers are repeatable)**

AMELIA follows roughly 30 business-definition rules so the same question always returns the same number, regardless of who is asking or how the question is phrased. Examples:

* A "won deal" follows the agreed-upon won definition — not just any deal whose status text reads “Won”.  
* A "selling opportunity" (also called an "engaged call") is a call that lasted at least two minutes.  
* A "presentation" is a Wingman-recorded call that follows the standard PartsBase presentation format.  
* A "missed call" on RingCentral includes calls that went to voicemail — not only calls that rang unanswered.  
* A "business day" is one of the 20 working days in a fiscal month (Monday through Friday).  
* The "expected presentation" benchmark is one presentation for every four hours of tracked work time per rep.

The same rules apply no matter who is asking — Sales, Customer Success, Operations, Marketing, or the executive team. Everyone gets the same answer for the same question.

**3\.  When AMELIA gets something wrong  \-  propose\_catalog\_rule**

The catalog still has gaps. Some rules will only surface when someone asks the right question. When that happens, AMELIA has a built-in way to flag it: a tool called propose\_catalog\_rule.

**When it kicks in**

If AMELIA detects that the data does not match what it was told to expect (a metric off by an order of magnitude, a status value the rules do not cover, a join that returns unexpected duplicates, an undocumented field that affects the answer), it can \- during the conversation \- ask the user for permission to submit a rule proposal. Examples of what gets proposed:

* A new metric definition the catalog does not yet encode.  
* A bug discovered in an existing rule (e.g. a filter is too narrow).  
* A previously-unknown data quality issue worth flagging.  
* A new joining path between two sources that was not previously declared.

**What to do as a user**

When AMELIA asks, say yes if the finding looks legitimate. The proposal goes to the team that owns AMELIA for review; if accepted, it becomes a permanent rule in the catalog and every future question benefits. Saying no is also fine \- the conversation continues either way.

**What the proposal contains**

AMELIA writes the proposal in a short, structured note: the business concept involved, the observation that triggered the proposal, and the suggested rule change. That is the entire content.

**What the proposal does NOT contain**

* **No conversation transcript.** The natural-language exchange between you and AMELIA is not saved with the proposal.  
* **No personal or sensitive data.** Account numbers and other identifiers that appear in your question are not copied into the proposal \- only the abstract rule pattern.  
* **No customer or employee names from the data.** The proposal describes the pattern (e.g. "rep ownership transfers can be initiated by an admin acting on behalf of a rep") not the instances (e.g. "Rep X transferred Account Y to Rep Z").  
* **No copy of your session, prompts, or chat history.** Proposals are one-off, written-once files stored in PartsBase's internal storage, with no link back to the conversation that generated them.

**4\.  What it does not do**

* **It does not write to source systems.** No CRM updates, no marketplace changes. Read-only by design.  
* **It does not replace Power BI.** Dashboards remain the canonical surface for KPI tracking. The MCP is for ad-hoc questions, exploration, and AI-driven workflows.  
* **It does not include calendar / email content.** Microsoft 365 (Teams chat, Outlook calendar bodies, email threads) is out of scope. Only Teams PSTN call metadata is integrated.  
* **It does not include support tickets.** AppSupport / Zendesk / similar systems are not federated today.  
* **It does not invent data.** When a question would require a connection between two sources that has not been formally established (for example, linking an anonymous website visitor to a known CRM contact), AMELIA says so explicitly rather than guessing.