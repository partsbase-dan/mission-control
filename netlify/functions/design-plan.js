'use strict';
// Design dashboard feed. Reads Holly's and Jackie's sprint lists from ClickUp, read-only.
// Env: CLICKUP_API_KEY (Netlify environment variable, never in the repo).
// Sign-in: the site-wide pb-auth edge function runs before this. After deploy, confirm with
// a signed-out request: curl -sI <site>/.netlify/functions/design-plan must redirect to pb-auth.
const { buildPayload } = require('./lib/clickup');

const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' };

exports.handler = async () => {
  try {
    const payload = await buildPayload({ token: process.env.CLICKUP_API_KEY });
    return { statusCode: 200, headers, body: JSON.stringify(payload) };
  } catch (e) {
    console.error('design-plan failed', e.status || '', e.message);   // message only, never the token
    const code = e.status === 500 ? 500 : 502;
    return { statusCode: code, headers, body: JSON.stringify({ error: code === 500 ? 'Feed is not configured' : 'ClickUp did not respond' }) };
  }
};
