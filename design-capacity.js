'use strict';
// Pure planning logic for the design dashboard. No network, no secrets, no rendering.
// Ported from the published dashboard's compute() so numbers can be compared, then
// extended for Plan mode (fit, carryover for a future sprint, prep list).

const HOUR_MS = 3600000;
const WEEK_HOURS = 40;
const OOO_DAY_HOURS = 8;
const CARRY_THRESHOLD_MS = 60000;           // more than a minute logged before the sprint = carryover
const STALE_RE = /waiting on (3rd|third) party/i;
const BU_FIELD = 'Business Unit';
const PRIORITY_RANK = { urgent: 1, high: 2, normal: 3, low: 4 };

const H = (ms) => ms / HOUR_MS;

// Available hours for one person in a sprint.
const availableHours = (oooDays = 0, weeks = 1) =>
  Math.max(0, weeks * WEEK_HOURS - Number(oooDays || 0) * OOO_DAY_HOURS);

// Business Unit from either shape: REST (value = option orderindex or id, options in
// type_config) or connector (value = {id, name}).
function buValue(task) {
  const f = (task.custom_fields || []).find((x) => x.name === BU_FIELD);
  if (!f || f.value == null || f.value === '') return null;
  if (typeof f.value === 'object') return f.value.name || null;
  const opts = (f.type_config && f.type_config.options) || [];
  const o = opts.find((x) => x.id === f.value || x.orderindex === Number(f.value));
  return o ? o.name : null;
}

const numOrNull = (v) => (v == null || v === '' ? null : Number(v));

// One shape for every task, whichever API produced it.
function normalizeTask(raw) {
  const pr = raw.priority && (raw.priority.priority || raw.priority);
  return {
    id: String(raw.id),
    customId: raw.custom_id || '',
    name: String(raw.name || ''),
    status: (raw.status && raw.status.status) || (typeof raw.status === 'string' ? raw.status : ''),
    url: raw.url || `https://app.clickup.com/t/${raw.id}`,
    estMs: numOrNull(raw.time_estimate),
    spentMs: numOrNull(raw.time_spent),
    assignees: (raw.assignees || []).map((a) => String(a.id)),
    bu: buValue(raw),
    priority: typeof pr === 'string' ? pr.toLowerCase() : null,
    due: numOrNull(raw.due_date),
    parentId: raw.parent || null,
  };
}

const isStale = (t) => STALE_RE.test(t.status || '');

// An estimate counts only on tasks assigned to one of our people, or unassigned,
// and never on stale "waiting on 3rd party" work.
function ownEst(t, peopleIds) {
  if (isStale(t) || t.estMs == null) return null;
  const mine = t.assignees.some((a) => peopleIds.includes(a));
  return !t.assignees.length || mine ? t.estMs : null;
}

// Carryover: time already logged before this sprint. For a sprint that hasn't started
// nothing can be logged inside it, so any logged time is carryover.
function isCarry(t, rangeMsByTask) {
  if (t.spentMs == null) return false;
  const inRange = rangeMsByTask ? rangeMsByTask[t.id] || 0 : 0;
  return t.spentMs - inRange > CARRY_THRESHOLD_MS;
}

// Planned load per person. Shared tasks split evenly. Carryover is reported as its own
// block and not counted as planned. Hours with no assignee are reported separately.
function summarisePlan(tasks, people, opts = {}) {
  const ids = people.map((p) => p.id);
  const out = { byPerson: {}, byBU: {}, unassignedH: 0, noEstimate: [], carryover: [], stale: [] };
  people.forEach((p) => { out.byPerson[p.id] = { plannedH: 0, carryH: 0, byBU: {} }; });
  for (const t of tasks) {
    if (isStale(t)) { out.stale.push(t); continue; }
    const est = ownEst(t, ids);
    if (est == null) {
      if (t.estMs == null && (!t.assignees.length || t.assignees.some((a) => ids.includes(a)))) out.noEstimate.push(t);
      continue;
    }
    const h = H(est);
    const bu = t.bu || 'No business unit set';
    const who = people.filter((p) => t.assignees.includes(p.id));
    const carry = isCarry(t, opts.rangeMsByTask);
    if (carry) out.carryover.push(t);
    if (!who.length) {
      if (!carry) out.unassignedH += h;
      continue;
    }
    for (const p of who) {
      const share = h / who.length;
      if (carry) { out.byPerson[p.id].carryH += share; continue; }
      out.byPerson[p.id].plannedH += share;
      out.byPerson[p.id].byBU[bu] = (out.byPerson[p.id].byBU[bu] || 0) + share;
      out.byBU[bu] = (out.byBU[bu] || 0) + share;
    }
  }
  return out;
}

// Order for the doesn't-fit list: ClickUp priority, then earliest due date, then name.
function byPriority(a, b) {
  const pa = PRIORITY_RANK[a.priority] || 5;
  const pb = PRIORITY_RANK[b.priority] || 5;
  if (pa !== pb) return pa - pb;
  const da = a.due == null ? Infinity : a.due;
  const db = b.due == null ? Infinity : b.due;
  if (da !== db) return da - db;
  return a.name.localeCompare(b.name);
}

// Tasks (with estH) sorted by priority are taken until available hours run out. Strict
// cutoff: the first task that doesn't fit and everything after it is deferred, so a
// lower-priority small task never jumps ahead of a higher-priority one.
function planFit(tasks, availH) {
  const sorted = tasks.slice().sort(byPriority);
  let used = 0, cut = false;
  const fits = [], over = [];
  for (const t of sorted) {
    if (!cut && used + t.estH <= availH + 1e-9) { used += t.estH; fits.push(t); } else { cut = true; over.push(t); }
  }
  const total = sorted.reduce((a, t) => a + t.estH, 0);
  return { fits, over, usedH: used, overByH: Math.max(0, total - availH) };
}

// Share of in-scope tasks that have an estimate, shown beside every capacity figure.
function coverage(tasks, peopleIds) {
  const scope = tasks.filter((t) => !isStale(t) && (!t.assignees.length || t.assignees.some((a) => peopleIds.includes(a))));
  const have = scope.filter((t) => t.estMs != null).length;
  const noBU = scope.filter((t) => !t.bu).length;
  return { tasks: scope.length, withEstimate: have, withoutBU: noBU };
}

// Snapshot saved by "Lock plan". Frozen copy, so later ClickUp edits can't change it.
function lockSnapshot(summary, people, meta) {
  return {
    sprintId: meta.sprintId,
    lockedAt: meta.lockedAt,
    lockedBy: meta.lockedBy,
    note: meta.note || '',
    ooo: meta.ooo || {},
    people: people.map((p) => ({
      id: p.id,
      plannedH: summary.byPerson[p.id].plannedH,
      carryH: summary.byPerson[p.id].carryH,
      availH: availableHours((meta.ooo || {})[p.id]),
      byBU: { ...summary.byPerson[p.id].byBU },
    })),
    unassignedH: summary.unassignedH,
    taskIds: meta.taskIds || [],
  };
}

const api = {
  HOUR_MS, WEEK_HOURS, OOO_DAY_HOURS, availableHours, buValue, normalizeTask, isStale,
  ownEst, isCarry, summarisePlan, byPriority, planFit, coverage, lockSnapshot,
};
// Same file runs in Node (functions, tests) and in the browser (the page).
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else window.Planning = api;
