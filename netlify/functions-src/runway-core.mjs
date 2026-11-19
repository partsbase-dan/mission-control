// GTM Priority Runway: shared edits. Pure logic (no Netlify imports) so it can be tested in Node.
//
// The page keeps its edits as flat "paths":
//   T/<taskId>/<key>   one edit to one task (owner, notes, status, ...)
//   G/<key>            a global setting (_order, _limit, _answers)
// The server stores { rev, fields: { path: { v, by, at } } }. v === null is a deletion (kept as a
// tombstone so every browser learns about it). Every write is checked here, because the browser is
// not trusted: only known paths, only the expected shape, and capped sizes.

export const MAX_BODY_BYTES = 300 * 1024;
export const MAX_CHANGES = 400;
export const MAX_DOC_BYTES = 2 * 1024 * 1024;

const ID = /^(?:[A-Z]{2,4}-\d{1,3}|NEW-[A-Z0-9]{1,8})$/;
const isStr = (v, max) => typeof v === 'string' && v.length <= max;
const isId = (v) => typeof v === 'string' && ID.test(v);
const isUrl = (v) => isStr(v, 600) && /^https?:\/\//i.test(v);
const isArr = (v, max, item) => Array.isArray(v) && v.length <= max && v.every(item);

const TASK_KEYS = {
  status: (v) => isStr(v, 40),
  owner: (v) => isStr(v, 80),
  start: (v) => typeof v === 'string' && /^(\d{4}-\d\d-\d\d|none)$/.test(v),
  delivery: (v) => typeof v === 'string' && /^(\d{4}-\d\d-\d\d|none)$/.test(v),
  blocker_type: (v) => isStr(v, 40),
  notes: (v) => isStr(v, 20000),
  title: (v) => isStr(v, 200),
  confidence: (v) => isStr(v, 10),
  impact: (v) => typeof v === 'number' && v >= 1 && v <= 5,
  effort: (v) => typeof v === 'number' && v >= 1 && v <= 5,
  steps: (v) => isArr(v, 60, (s) => s && typeof s === 'object' && isStr(s.t, 300) && typeof s.d === 'boolean'),
  links: (v) => isArr(v, 30, (l) => l && typeof l === 'object' && isUrl(l.u)),
  depends_on: (v) => isArr(v, 80, isId),
  _added: (v) => v && typeof v === 'object' && isStr(v.task, 200) && v.task.trim().length > 0 && isStr(v.workstream, 60) &&
    (v.owner === undefined || isStr(v.owner, 80)) && (v.ts === undefined || typeof v.ts === 'number'),
};
const GLOBAL_KEYS = {
  _order: (v) => isArr(v, 500, isId),
  _limit: (v) => Number.isInteger(v) && v >= 1 && v <= 30,
  _answers: (v) => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length <= 20 &&
    Object.keys(v).every((k) => isStr(k, 40) && isStr(v[k], 80)),
};

// Returns null if the path/value pair is allowed, otherwise a short reason.
export function checkChange(path, v) {
  if (typeof path !== 'string' || path.length > 80) return 'bad path';
  const parts = path.split('/');
  if (parts[0] === 'G' && parts.length === 2) {
    const ok = GLOBAL_KEYS[parts[1]];
    if (!ok || !Object.prototype.hasOwnProperty.call(GLOBAL_KEYS, parts[1])) return 'unknown setting';
    return v === null || ok(v) ? null : 'bad value';
  }
  if (parts[0] === 'T' && parts.length === 3) {
    if (!isId(parts[1])) return 'bad task id';
    if (!Object.prototype.hasOwnProperty.call(TASK_KEYS, parts[2])) return 'unknown field';
    return v === null || TASK_KEYS[parts[2]](v) ? null : 'bad value';
  }
  return 'bad path';
}

export function emptyDoc() { return { rev: 0, fields: {} }; }

// Apply a list of { p, v } changes. Invalid ones are skipped and reported, never half-applied.
export function applyChanges(doc, changes, by, now) {
  const next = { rev: doc.rev, fields: { ...doc.fields } };
  const rejected = [];
  let applied = 0;
  for (const c of changes) {
    const why = c && typeof c === 'object' ? checkChange(c.p, c.v === undefined ? null : c.v) : 'bad change';
    if (why) { rejected.push({ p: c && c.p, why }); continue; }
    const v = c.v === undefined ? null : c.v;
    const cur = next.fields[c.p];
    if (cur && JSON.stringify(cur.v) === JSON.stringify(v)) continue; // no real change, keep who/when
    next.fields[c.p] = { v, by, at: now };
    applied++;
  }
  if (applied) next.rev = doc.rev + 1;
  return { doc: next, applied, rejected };
}

// Parse and bound-check a POST body (already read as text).
export function parseBody(text) {
  if (typeof text !== 'string' || Buffer.byteLength(text) > MAX_BODY_BYTES) return { error: 'Request too large' };
  let j;
  try { j = JSON.parse(text); } catch { return { error: 'Not valid JSON' }; }
  if (!j || !Array.isArray(j.changes)) return { error: 'Expected { changes: [...] }' };
  if (j.changes.length > MAX_CHANGES) return { error: 'Too many changes' };
  return { changes: j.changes };
}

// A label for "last edited by". The pb-auth edge function already verified the session before this
// runs, so we only read the name out of it; nothing here grants access.
export function whoFrom(cookieHeader) {
  try {
    const m = /(?:^|;\s*)pb_session=([^;]+)/.exec(cookieHeader || '');
    if (!m) return 'A teammate';
    const payload = m[1].split('.')[1];
    const json = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    let n = json.name || json.given_name || (json.email ? String(json.email).split('@')[0] : '') || json.preferred_username || '';
    n = String(n).replace(/[^\p{L}\p{N} .'@_-]/gu, '').trim().slice(0, 60);
    return n || 'A teammate';
  } catch { return 'A teammate'; }
}

// Same-origin check for writes. Cookie auth is automatic, so a write must also prove it came from
// our own page: a custom header (cross-site forms cannot set one) and a matching Origin.
export function sameOriginWrite(headers, host) {
  if (headers.get('x-runway-client') !== '1') return false;
  const o = headers.get('origin');
  if (!o) return true;
  try { return new URL(o).host === host; } catch { return false; }
}
