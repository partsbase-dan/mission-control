// GTM Priority Runway: shared edits for the dashboard (notes, owners, order, added tasks).
// GET  /api/runway[?rev=N]   -> { rev, fields } (or { rev, unchanged: true } when N is current)
// POST /api/runway           -> body { changes: [{ p, v }] }, returns the full { rev, fields }
// Sign-in: the site-wide pb-auth edge function runs before this, like design-plan.js. After deploy,
// confirm with a signed-out request: curl -sI <site>/api/runway must redirect to pb-auth.
// Storage: Netlify Blobs store "runway", one JSON document. No secrets or env vars needed.
import { getStore } from '@netlify/blobs';
import { applyChanges, emptyDoc, MAX_DOC_BYTES, parseBody, sameOriginWrite, whoFrom } from './lib/runway-core.mjs';

const HEADERS = {
  'content-type': 'application/json',
  'cache-control': 'private, no-store',
  'x-content-type-options': 'nosniff',
};
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: HEADERS });

export default async (req) => {
  try {
    const store = getStore({ name: 'runway', consistency: 'strong' });
    const doc = (await store.get('state', { type: 'json' })) || emptyDoc();

    if (req.method === 'GET') {
      const param = new URL(req.url).searchParams.get('rev');
      if (param !== null && /^\d+$/.test(param) && Number(param) === doc.rev) return json(200, { rev: doc.rev, unchanged: true });
      return json(200, doc);
    }

    if (req.method === 'POST') {
      if (!sameOriginWrite(req.headers, new URL(req.url).host)) return json(403, { error: 'Not allowed' });
      const parsed = parseBody(await req.text());
      if (parsed.error) return json(400, { error: parsed.error });
      const by = whoFrom(req.headers.get('cookie'));
      const now = new Date().toISOString();
      const out = applyChanges(doc, parsed.changes, by, now);
      if (out.applied) {
        if (Buffer.byteLength(JSON.stringify(out.doc)) > MAX_DOC_BYTES) return json(413, { error: 'Too much saved data' });
        await store.setJSON('state', out.doc);
        // Two people saving in the same instant could overwrite each other (no atomic write here).
        // Read it back once and re-apply if our changes are missing.
        const back = (await store.get('state', { type: 'json' })) || emptyDoc();
        const lost = parsed.changes.filter((c) => c && out.doc.fields[c.p] && JSON.stringify((back.fields[c.p] || {}).v) !== JSON.stringify(out.doc.fields[c.p].v));
        if (lost.length) {
          const again = applyChanges(back, lost, by, now);
          if (again.applied) await store.setJSON('state', again.doc);
          return json(200, { ...again.doc, rejected: out.rejected });
        }
      }
      return json(200, { ...out.doc, rejected: out.rejected });
    }

    return json(405, { error: 'Method not allowed' });
  } catch (e) {
    console.error('runway-state failed', e && e.message); // message only, never data
    return json(500, { error: 'Shared edits are unavailable right now' });
  }
};

export const config = { path: '/api/runway' };
