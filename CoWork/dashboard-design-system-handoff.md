# Dashboard Design System — Handoff

All changes below apply to `/Users/drodgers/Claude/PartsBase/CoWork/dashboard.html`.
Open the file, find each string, and replace it exactly.

---

## 1. CSS Variables (line ~11–13)

**Find:**
```css
--accent: #7d8ff5; --accent2: #8ca3ff; --green: #3ddc97; --yellow: #f5c84c;
--red: #ff6b70; --purple: #a78bfa; --text: #eef0f5; --muted: #818899; --label: #a9afbd;
```

**Replace with:**
```css
--accent: #0C70E8; --accent2: #4b9cf0; --green: #32d583; --yellow: #fec84b;
--red: #f97066; --purple: #a78bfa; --text: #eef0f5; --muted: #818899; --label: #a9afbd;
```

---

## 2. Body font (line ~16)

**Find:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Replace with:**
```css
font-family: "Avenir Next LT Pro", "Avenir Next", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

---

## 3. Tag backgrounds (line ~32–37)

**Find:**
```css
.tag-green { background: rgba(52,211,153,0.12); color: var(--green); }
.tag-yellow { background: rgba(251,191,36,0.12); color: var(--yellow); }
.tag-blue { background: rgba(91,124,246,0.12); color: var(--accent); }
.tag-purple { background: rgba(167,139,250,0.12); color: var(--purple); }
.tag-gray { background: rgba(100,116,139,0.12); color: var(--muted); }
.tag-red { background: rgba(248,113,113,0.12); color: var(--red); }
```

**Replace with:**
```css
.tag-green { background: rgba(50,213,131,0.12); color: var(--green); }
.tag-yellow { background: rgba(254,200,75,0.12); color: var(--yellow); }
.tag-blue { background: rgba(12,112,232,0.12); color: var(--accent); }
.tag-purple { background: rgba(167,139,250,0.12); color: var(--purple); }
.tag-gray { background: rgba(100,116,139,0.12); color: var(--muted); }
.tag-red { background: rgba(249,112,102,0.12); color: var(--red); }
```

---

## 4. RAG card backgrounds (line ~83–87)

**Find:**
```css
.rag-green { background:rgba(61,220,151,0.08);  border-left:4px solid var(--green);  border-radius:6px; padding:14px 16px; margin-bottom:12px; }
.rag-none  { background:var(--surface2);        border-left:4px solid var(--muted);  border-radius:6px; padding:14px 16px; margin-bottom:12px; }
.rag-blue  { background:rgba(99,102,241,0.08); border-left:4px solid var(--accent); border-radius:6px; padding:14px 16px; margin-bottom:12px; }
```

**Replace with:**
```css
.rag-green { background:rgba(50,213,131,0.08);  border-left:4px solid var(--green);  border-radius:6px; padding:14px 16px; margin-bottom:12px; }
.rag-none  { background:var(--surface2);        border-left:4px solid var(--muted);  border-radius:6px; padding:14px 16px; margin-bottom:12px; }
.rag-blue  { background:rgba(12,112,232,0.08); border-left:4px solid var(--accent); border-radius:6px; padding:14px 16px; margin-bottom:12px; }
```

---

## 5. Badge backgrounds (line ~104–105)

**Find:**
```css
.badge-green { background:rgba(61,220,151,0.12);  color:var(--green); }
.badge-blue  { background:rgba(125,143,245,0.12); color:var(--accent); }
```

**Replace with:**
```css
.badge-green { background:rgba(50,213,131,0.12);  color:var(--green); }
.badge-blue  { background:rgba(12,112,232,0.12); color:var(--accent); }
```

---

## 6. Workflow row hover + button (line ~120–126)

**Find:**
```css
.workflow-row:hover { background:#2a2f47; }
```
**Replace with:**
```css
.workflow-row:hover { background:rgba(12,112,232,0.08); }
```

**Find:**
```css
.workflow-btn { background:rgba(91,124,246,0.15); color:var(--accent); border:1px solid rgba(91,124,246,0.3); border-radius:5px; font-size:11px; font-weight:600; padding:3px 10px; cursor:pointer; white-space:nowrap; transition:background 0.15s; }
.workflow-btn:hover { background:rgba(91,124,246,0.3); }
.workflow-btn.copied { background:rgba(52,211,153,0.15); color:var(--green); border-color:rgba(52,211,153,0.3); }
```

**Replace with:**
```css
.workflow-btn { background:rgba(12,112,232,0.15); color:var(--accent); border:1px solid rgba(12,112,232,0.3); border-radius:5px; font-size:11px; font-weight:600; padding:3px 10px; cursor:pointer; white-space:nowrap; transition:background 0.15s; }
.workflow-btn:hover { background:rgba(12,112,232,0.3); }
.workflow-btn.copied { background:rgba(50,213,131,0.15); color:var(--green); border-color:rgba(50,213,131,0.3); }
```

---

## 7. Sidebar brand mark (HTML, line ~210–215)

**Find:**
```html
<div class="brand-row">
  <div class="brand-mark">PB</div>
  <div>
    <div class="brand-name">PartsBase</div>
    <div class="brand-sub">Mission Control</div>
  </div>
</div>
```

**Replace with:**
```html
<div class="brand-row">
  <div class="brand-mark">
    <img src="../partsbase-design-system/project/system/logos/pb-logo-dark.svg" alt="PartsBase" style="height:22px;width:auto;">
  </div>
  <div>
    <div class="brand-sub" style="margin-top:0;">Mission Control</div>
  </div>
</div>
```

Also update the `.brand-mark` CSS style (line ~131):

**Find:**
```css
.brand-mark { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; background: linear-gradient(135deg,#2ee59d,#5b7cf6); color: white; font-weight: 800; font-size: 13px; }
```

**Replace with:**
```css
.brand-mark { width: 26px; height: 26px; display: grid; place-items: center; }
```

---

## 8. Exec view — purple highlight cells (JS, ~line 1379–1395)

Do a global find-and-replace (all occurrences) in the file:

| Find | Replace |
|---|---|
| `rgba(99,102,241,0.12)` | `rgba(12,112,232,0.12)` |
| `rgba(99,102,241,0.25)` | `rgba(12,112,232,0.25)` |

---

## 9. Resource type pill colors (JS, ~line 1437–1441)

**Find:**
```js
playbook:  { pill:'background:rgba(52,211,153,0.12);color:#3ddc97;',      label:'Playbook' },
```
**Replace with:**
```js
playbook:  { pill:'background:rgba(50,213,131,0.12);color:#32d583;',      label:'Playbook' },
```

**Find:**
```js
strategy:  { pill:'background:rgba(245,200,76,0.12);color:#f5c84c;',      label:'Strategy' },
```
**Replace with:**
```js
strategy:  { pill:'background:rgba(254,200,75,0.12);color:#fec84b;',      label:'Strategy' },
```

---

## Design system rationale

| Token | Value | Source |
|---|---|---|
| `--accent` (brand blue) | `#0C70E8` | `--color-600` |
| `--accent2` | `#4b9cf0` | `--color-400` |
| `--green` (success) | `#32d583` | `--success-400` |
| `--yellow` (warning) | `#fec84b` | `--warning-300` |
| `--red` (error) | `#f97066` | `--error-400` |
| Font (private surface) | Avenir Next LT Pro | `--font-sans-private` |
| Logo | `pb-logo-dark.svg` | dark-surface mark |
