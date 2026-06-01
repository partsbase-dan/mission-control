/*
 * Shared chrome for all 3 Parts Intelligence Report variations.
 * The chrome matches the reference screenshot: orange PBExpress strip,
 * white nav with parts-search, and a footer. Exposed on `window` so
 * each variation JSX can pick them up.
 */

const { useState } = React;

/* ── Top orange PBExpress strip ─────────────────────────────────────────── */
function ExpressStrip() {
  return (
    <div style={{
      background: "#EF5A24",
      color: "#fff",
      fontSize: 14,
      lineHeight: "20px",
      padding: "10px 24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    }}>
      <span style={{ fontWeight: 600 }}>Need parts now?</span>
      <span style={{ opacity: 0.95 }}>Fast-track your AOG sourcing with PBExpress</span>
      <button style={{
        all: "unset",
        cursor: "pointer",
        background: "#fff",
        color: "#002857",
        fontWeight: 600,
        padding: "6px 16px",
        borderRadius: 999,
        fontSize: 13,
      }}>Start now</button>
    </div>
  );
}

/* ── Primary nav ────────────────────────────────────────────────────────── */
function Nav() {
  const item = {
    fontSize: 15, fontWeight: 500, color: "var(--color-800)",
    padding: "8px 0", display: "inline-flex", alignItems: "center", gap: 4,
    cursor: "pointer", whiteSpace: "nowrap",
  };
  return (
    <div style={{
      background: "#fff",
      borderBottom: "1px solid var(--gray-200)",
      padding: "16px 40px",
      display: "flex",
      alignItems: "center",
      gap: 32,
    }}>
      <img src="../../system/logos/pb-logo-light.svg" alt="PartsBase"
        style={{ height: 32, width: "auto" }} />
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        <span style={item}>For buyers <Caret /></span>
        <span style={item}>For sellers <Caret /></span>
        <span style={item}>Memberships</span>
        <span style={item}>Integrations</span>
      </div>
      <div style={{ flex: 1 }}></div>
      <div style={{
        display: "flex", alignItems: "center",
        border: "1px solid var(--gray-300)",
        borderRadius: 999, padding: "4px 4px 4px 14px", gap: 8,
        minWidth: 320,
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-800)" }}>
          Parts <Caret />
        </span>
        <div style={{ width: 1, height: 18, background: "var(--gray-300)" }}></div>
        <input placeholder="Free Search" style={{
          border: "none", outline: "none", background: "transparent",
          flex: 1, fontSize: 14, color: "var(--gray-500)",
          fontFamily: "var(--font-sans)",
        }} />
        <span style={{
          width: 32, height: 32, borderRadius: 999,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: "var(--gray-100)",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--gray-600)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-3.5-3.5"></path>
          </svg>
        </span>
      </div>
      <span style={{ ...item, fontWeight: 500 }}>Log in</span>
      <button className="pb-button pb-button-md pb-button-primary" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        whiteSpace: "nowrap",
      }}>
        Book a demo
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 3 18 12 6 21 6 3"></polyline>
        </svg>
      </button>
    </div>
  );
}

function Caret() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginLeft: 2 }}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

/* ── Help-search bar under nav (matches reference) ─────────────────────── */
function HelpBar() {
  return (
    <div style={{
      background: "#fff",
      borderBottom: "1px solid var(--gray-200)",
      padding: "14px 40px",
      display: "flex", justifyContent: "center", alignItems: "center",
      color: "var(--color-800)",
      fontSize: 15, fontWeight: 500,
      gap: 6,
    }}>
      How can we help you today? <Caret />
    </div>
  );
}

/* ── Breadcrumb ─────────────────────────────────────────────────────────── */
function Breadcrumb({ items }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      fontSize: 14, color: "var(--gray-600)",
    }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
          )}
          <span style={{
            color: i === items.length - 1 ? "var(--gray-700)" : "var(--color-500)",
            fontWeight: i === items.length - 1 ? 500 : 400,
            cursor: i === items.length - 1 ? "default" : "pointer",
          }}>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Footer (compact, matches marketing footers) ────────────────────────── */
function Footer() {
  const col = (title, items) => (
    <div>
      <div style={{
        fontSize: 13, fontWeight: 600, color: "#fff",
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 14,
      }}>{title}</div>
      {items.map((t, i) => (
        <div key={i} style={{
          fontSize: 14, color: "rgba(255,255,255,0.75)",
          padding: "4px 0", cursor: "pointer",
        }}>{t}</div>
      ))}
    </div>
  );
  return (
    <footer style={{ background: "var(--color-800)", color: "#fff", padding: "56px 40px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <img src="../../system/logos/pb-logo-dark.svg" alt="PartsBase"
            style={{ height: 30, marginBottom: 16 }} />
          <p style={{
            fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.7)",
            maxWidth: 320, margin: 0,
          }}>
            The world's largest aerospace parts marketplace. Source, sell, and
            track aviation inventory from 30,000+ verified members.
          </p>
        </div>
        {col("For buyers", ["Find parts", "PBExpress AOG", "Memberships", "API access"])}
        {col("For sellers", ["List inventory", "PB Store", "Advertising", "Integrations"])}
        {col("Company", ["About", "Press", "Careers", "Contact"])}
        {col("Insights", ["Blog", "Intelligence Reports", "Events", "Newsletter"])}
      </div>
      <div style={{
        marginTop: 48, paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "flex", justifyContent: "space-between",
        fontSize: 13, color: "rgba(255,255,255,0.5)",
      }}>
        <span>© 2026 PartsBase, Inc. All rights reserved.</span>
        <span style={{ display: "flex", gap: 24 }}>
          <span>Privacy</span><span>Terms</span><span>Accessibility</span>
        </span>
      </div>
    </footer>
  );
}

/* ── Page chrome wrapper (express strip + nav + help bar + footer) ─────── */
function PageChrome({ children }) {
  return (
    <div className="pb-surface-public" style={{
      fontFamily: "var(--font-sans)",
      color: "var(--gray-700)",
      background: "#fff",
      width: "100%",
    }}>
      <ExpressStrip />
      <Nav />
      <HelpBar />
      {children}
      <Footer />
    </div>
  );
}

/* Export to window for consumption by variation files. */
Object.assign(window, {
  ExpressStrip, Nav, HelpBar, Breadcrumb, Footer, PageChrome, Caret,
});
