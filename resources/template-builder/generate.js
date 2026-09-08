// Shared "fill the master template" logic, used by every builder variant so the
// actual generation behavior can't drift between them. See fields-data.js for the
// apply-operation contract this reads.
function buildOutputHtml(t, masterHtml, getValue) {
  const doc = new DOMParser().parseFromString(masterHtml, 'text/html');
  const rawSyncs = [];
  let filledCount = 0;

  t.fields.forEach(f => {
    const raw = getValue(f.id);
    if (!raw || !raw.trim()) return; // blank = leave template content unchanged
    filledCount++;
    const lines = raw.split('\n').map(s => s.trim());

    f.apply.forEach(a => {
      const target = doc.querySelector(a.selector);
      if (!target) { console.warn('Selector not found:', a.selector); return; }
      const value = (a.index !== undefined) ? (lines[a.index] || '') : raw;

      if (a.op === 'text') {
        const old = target.textContent;
        target.textContent = value;
        if (a.syncRaw && old) rawSyncs.push([old, value]);
      } else if (a.op === 'attr') {
        const old = target.getAttribute(a.attr);
        target.setAttribute(a.attr, value);
        if (a.syncRaw && old) rawSyncs.push([old, value]);
      } else if (a.op === 'html') {
        target.innerHTML = a.build(lines);
      }
    });
  });

  let out = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  // getAttribute()/textContent return HTML-decoded strings (e.g. "&"), but the serialized
  // output re-encodes them (e.g. "&amp;") — encode both sides before the raw-text swap so
  // MSO-only conditional-comment duplicates (invisible to the DOM parser) actually match.
  const encAmp = (s) => s.replace(/&/g, '&amp;');
  rawSyncs.forEach(([oldV, newV]) => {
    const oldEnc = encAmp(oldV), newEnc = encAmp(newV);
    if (oldEnc && oldEnc !== newEnc) out = out.split(oldEnc).join(newEnc);
  });

  return { html: out, filledCount };
}

if (typeof module !== 'undefined') module.exports = { buildOutputHtml };
