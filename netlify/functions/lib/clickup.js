'use strict';
// ClickUp REST access for the design dashboard. Read-only. The token comes from the
// caller (Netlify env var or the local env), never from this file.
// Same code runs in the Netlify function and in scripts/pull-snapshot.js.

const API = 'https://api.clickup.com/api/v2';
const SPRINTS_FOLDER_ID = '90147243351';         // Marketing space > Sprints folder
const PEOPLE = [{ id: '82441284', name: 'Holly' }, { id: '88306362', name: 'Jackie' }];
const SPRINT_RE = /sprint\s*(\d+)\s*\((\d{1,2})\/(\d{1,2})\s*-\s*(\d{1,2})\/(\d{1,2})\)/i;
const DAY = 864e5;

const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

// "Sprint 54 (11/2 - 11/9)" -> Monday start; the sprint runs Monday to Sunday.
function parseSprintName(name, year) {
  const m = SPRINT_RE.exec(name || '');
  if (!m) return null;
  const start = new Date(Date.UTC(year, Number(m[2]) - 1, Number(m[3])));
  const end = new Date(start.getTime() + 6 * DAY);
  return { num: Number(m[1]), start: ymd(start), end: ymd(end) };
}

async function getJson(url, token, fetchImpl, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const res = await fetchImpl(url, { headers: { Authorization: token } });
    if (res.status === 429) { await new Promise((r) => setTimeout(r, 1000 * (i + 1))); continue; }
    if (!res.ok) { const e = new Error(`ClickUp ${res.status}`); e.status = res.status; throw e; }
    return res.json();
  }
  const e = new Error('ClickUp rate limit'); e.status = 429; throw e;
}

// Only the fields the dashboard needs. Descriptions, comments and emails never leave here.
function slimTask(t) {
  const bu = (t.custom_fields || []).find((f) => f.name === 'Business Unit');
  return {
    id: t.id, custom_id: t.custom_id || '', name: t.name, status: t.status && t.status.status,
    url: t.url, time_estimate: t.time_estimate == null ? null : Number(t.time_estimate),
    time_spent: t.time_spent == null ? null : Number(t.time_spent),
    assignees: (t.assignees || []).map((a) => ({ id: a.id })),
    priority: t.priority ? { priority: t.priority.priority } : null,
    due_date: t.due_date || null, parent: t.parent || null,
    custom_fields: bu ? [{ name: bu.name, type: bu.type, value: bu.value, type_config: bu.type_config }] : [],
  };
}

async function listSprintLists(token, fetchImpl, year) {
  const body = await getJson(`${API}/folder/${SPRINTS_FOLDER_ID}/list`, token, fetchImpl);
  return (body.lists || []).map((l) => ({ id: String(l.id), ...parseSprintName(l.name, year) }))
    .filter((l) => l.num).sort((a, b) => a.num - b.num);
}

// include_timl returns tasks that live in several lists, which the sprint lists rely on.
async function fetchSprintTasks(listId, token, fetchImpl) {
  const out = [];
  for (let page = 0; page < 20; page++) {
    const qs = new URLSearchParams({ include_closed: 'true', subtasks: 'true', include_timl: 'true', page: String(page) });
    const body = await getJson(`${API}/list/${listId}/task?${qs}`, token, fetchImpl);
    for (const t of body.tasks || []) out.push(slimTask(t));
    if (body.last_page || (body.tasks || []).length < 100) break;
  }
  return out;
}

// Current sprint and the next one, by today's date.
function pickSprints(lists, now) {
  const today = ymd(now);
  const cur = lists.find((l) => l.start <= today && today <= l.end);
  if (!cur) return [];
  const next = lists.find((l) => l.num === cur.num + 1);
  return [{ ...cur, note: 'Current' }, ...(next ? [{ ...next, note: 'Next' }] : [])];
}

async function buildPayload({ token, fetchImpl = fetch, now = new Date(), people = PEOPLE }) {
  if (!token) throw Object.assign(new Error('CLICKUP_API_KEY is not set'), { status: 500 });
  const lists = await listSprintLists(token, fetchImpl, now.getUTCFullYear());
  const sprints = pickSprints(lists, now);
  const tasks = {};
  for (const s of sprints) tasks[String(s.num)] = await fetchSprintTasks(s.id, token, fetchImpl);
  return {
    sample: false, syncedAt: now.getTime(), people,
    sprints: sprints.map((s) => ({ key: String(s.num), label: `Sprint ${s.num}`, start: s.start, end: s.end, note: s.note })),
    ooo: {}, tasks, history: [],
  };
}

module.exports = { PEOPLE, SPRINT_RE, parseSprintName, slimTask, fetchSprintTasks, pickSprints, buildPayload };
