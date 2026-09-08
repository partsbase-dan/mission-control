// Removes one optional section as a unit: the master template marks the first and last
// element of the section with data-tb-section-start/end="<sectionId>", and every element
// in between (any number of rows) gets removed by walking siblings, so the master file
// only needs two markers per section regardless of how many rows it spans.
function removeSection(doc, sectionId) {
  const startEl = doc.querySelector(`[data-tb-section-start="${sectionId}"]`);
  const endEl = doc.querySelector(`[data-tb-section-end="${sectionId}"]`);
  if (!startEl) { console.warn('Section start marker not found:', sectionId); return; }
  const toRemove = [];
  let node = startEl;
  while (node) {
    toRemove.push(node);
    if (node === endEl) break;
    node = node.nextElementSibling;
  }
  toRemove.forEach(n => n.remove());
}

// Shared "fill the master template" logic, used by every builder variant so the
// actual generation behavior can't drift between them. See fields-data.js for the
// apply-operation contract this reads. excludedSectionIds (optional) skips filling and
// removes the DOM range for any section the user chose not to include.
function buildOutputHtml(t, masterHtml, getValue, excludedSectionIds) {
  excludedSectionIds = excludedSectionIds || [];
  const doc = new DOMParser().parseFromString(masterHtml, 'text/html');

  excludedSectionIds.forEach(sid => removeSection(doc, sid));

  const skipFieldIds = new Set();
  (t.sections || []).forEach(s => {
    if (excludedSectionIds.includes(s.id)) s.fields.forEach(fid => skipFieldIds.add(fid));
  });

  const rawSyncs = [];
  let filledCount = 0;

  t.fields.forEach(f => {
    if (skipFieldIds.has(f.id)) return; // section excluded -- already removed from the DOM
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
