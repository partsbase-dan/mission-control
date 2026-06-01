/*
 * Variation 3 — "Intelligence Dashboard"
 *
 * Data-forward. Hero is a metrics strip layered with the title. Body is
 * narrative punctuated by inline data callouts. Most procurement-operator
 * friendly; closest in spirit to Bloomberg / S&P terminal research notes.
 */

const { Breadcrumb: DBreadcrumb, PageChrome: DPageChrome } = window;
const DR = window.REPORT;

function DashHero() {
  return (
    <div style={{ background: "#fff" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "32px 48px 0",
      }}>
        <DBreadcrumb items={["Home", "Blog", "Parts Intelligence Report", DR.title]} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{
            display: "inline-block",
            background: "var(--color-800)", color: "#fff",
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "5px 10px",
            borderRadius: 4,
          }}>Intelligence</span>
          <span style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--color-500)",
          }}>{DR.issue} · {DR.date}</span>
          <span style={{ fontSize: 13, color: "var(--gray-500)" }}>·</span>
          <span style={{ fontSize: 13, color: "var(--gray-500)" }}>{DR.readingTime}</span>
        </div>

        <h1 style={{
          fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.025em",
          fontWeight: 700, color: "var(--color-800)",
          margin: "0 0 20px", maxWidth: 900, textWrap: "balance",
        }}>{DR.title}</h1>

        <p style={{
          fontSize: 19, lineHeight: 1.55, color: "var(--gray-700)",
          maxWidth: 820, margin: "0 0 36px",
        }}>{DR.deck}</p>
      </div>

      {/* Metrics strip — edge-to-edge on the content column */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 48px",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "2px solid var(--color-800)",
          borderBottom: "1px solid var(--gray-200)",
        }}>
          {DR.metrics.map((m, i) => (
            <div key={i} style={{
              padding: "20px 24px 20px 0",
              borderRight: i < 3 ? "1px solid var(--gray-200)" : "none",
              paddingLeft: i === 0 ? 0 : 24,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--gray-500)",
                marginBottom: 8,
              }}>{m.label}</div>
              <div style={{
                display: "flex", alignItems: "baseline", gap: 10,
              }}>
                <div style={{
                  fontSize: 36, fontWeight: 700, color: "var(--color-800)",
                  letterSpacing: "-0.02em", lineHeight: 1,
                  fontFeatureSettings: "'tnum'",
                }}>{m.value}</div>
                <div style={{
                  fontSize: 13, fontWeight: 600,
                  color: m.dir === "up" ? "var(--success-700)"
                       : m.dir === "down" ? "var(--error-700)"
                       : "var(--gray-600)",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {m.dir === "up" && <Arrow dir="up" />}
                  {m.dir === "down" && <Arrow dir="down" />}
                  {m.delta}
                </div>
              </div>
              <div style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 4 }}>
                vs. prior week
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Arrow({ dir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {dir === "up" ? <polyline points="6 14 12 8 18 14"></polyline>
                    : <polyline points="6 10 12 16 18 10"></polyline>}
    </svg>
  );
}

function DashBody() {
  const H2 = ({ children }) => (
    <h2 style={{
      fontSize: 24, fontWeight: 700, color: "var(--color-800)",
      letterSpacing: "-0.015em", lineHeight: 1.2,
      margin: "48px 0 16px",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{ width: 3, height: 24, background: "var(--color-500)" }}></span>
      {children}
    </h2>
  );
  const P = ({ children }) => (
    <p style={{
      fontSize: 17, lineHeight: 1.7, color: "var(--gray-700)",
      margin: "0 0 18px", textWrap: "pretty",
    }}>{children}</p>
  );

  return (
    <div style={{
      maxWidth: 860, margin: "0 auto", padding: "40px 48px 0",
    }}>
      <H2>Takeaway</H2>
      <P>
        Aerospace solicitation volume contracted 17.3% week-over-week even as
        hardware demand concentrated around sustainment-critical FSGs — a
        pattern consistent with late-quarter obligation timing and ongoing
        depot-level overhaul cycles. Average notice value climbed 15.9% on
        the back of larger consolidated hardware buys.
      </P>

      {/* Inline data block */}
      <div style={{
        margin: "28px 0 32px",
        background: "var(--color-25)",
        border: "1px solid var(--color-200)",
        borderRadius: 14,
        padding: 24,
      }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--color-500)",
          marginBottom: 14,
        }}>Top 5 FSGs this week</div>
        <div style={{ display: "grid", gap: 10 }}>
          {DR.fsgs.map((f, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr 80px 80px 60px",
              gap: 14, alignItems: "center",
              fontSize: 14, lineHeight: 1.3,
            }}>
              <span style={{
                fontWeight: 700, color: "var(--color-800)",
                fontFeatureSettings: "'tnum'",
              }}>{f.code}</span>
              <span style={{ color: "var(--gray-700)" }}>{f.name}</span>
              <span style={{
                textAlign: "right", color: "var(--gray-800)",
                fontFeatureSettings: "'tnum'",
              }}>{f.notices.toLocaleString()}</span>
              <span style={{
                textAlign: "right", color: "var(--gray-800)",
                fontFeatureSettings: "'tnum'", fontWeight: 500,
              }}>{f.value}</span>
              <span style={{
                textAlign: "right",
                fontFeatureSettings: "'tnum'",
                color: "var(--color-500)", fontWeight: 600,
              }}>{f.share.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      <H2>What happened</H2>
      <P>
        DLA (DEPT OF DEFENSE) dominated volume with 9,427 solicitations,
        representing 97.9% of the tagged universe. The week's underlying
        pattern showed overall contraction in notice count coinciding with
        concentrated demand in hardware-heavy and sustainment-oriented
        categories, led by FSG 53.
      </P>
      <P>
        Despite the top-line contraction, average notice value rose 15.9%
        to $63.6K — a signal that fewer, larger line items were being
        solicited rather than a broad pullback across all contracting
        offices. Late-quarter obligation timing at DLA Troop Support and
        DLA Aviation produced concentrated batches of multi-quantity
        hardware notices on April 16 and April 18.
      </P>

      <H2>FSG 53 — the week's anchor</H2>
      <P>
        Hardware & Abrasives represented 20.2% of notices but only 14.2%
        of aggregate estimated value, reflecting the category's
        characteristic high-volume / low-unit-cost shape. Of the 1,942
        FSG 53 notices, 71% originated with DLA Troop Support in
        Philadelphia; the remainder split primarily between DLA Aviation
        (Richmond) and a small tail of Air Force and Navy Working Capital
        Fund notices.
      </P>
      <P>
        The week's single largest FSG 53 solicitation — a $4.2M multi-line
        consolidation for fastener kits supporting T-56 engine overhauls —
        closed on April 18 and drew 14 offers. Supplier concentration on
        that notice remained diffuse.
      </P>

      <div style={{
        margin: "32px 0",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
      }}>
        <div style={{
          padding: 20,
          border: "1px solid var(--gray-200)",
          borderRadius: 14,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--color-500)",
            marginBottom: 10,
          }}>For buyers</div>
          <P>
            Expect competitive bidding to persist through end of April.
            Lead-times from top fastener distributors tightened 4.2 days WoW —
            material for AOG scenarios.
          </P>
        </div>
        <div style={{
          padding: 20,
          border: "1px solid var(--gray-200)",
          borderRadius: 14,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--color-500)",
            marginBottom: 10,
          }}>For sellers</div>
          <P>
            Review pricing in FSG 53 &amp; 59. Winning-bid margins have
            narrowed; 75th-percentile pricing may fall outside the winning
            range next week.
          </P>
        </div>
      </div>

      <H2>Methodology</H2>
      <P>
        PartsBase Intelligence aggregates SAM.gov, DIBBS, and FedBizOpps
        solicitation feeds, then cross-references each notice against the
        PartsBase part-number graph and the federal supply group taxonomy.
        Estimated values are derived from posted quantities and PartsBase's
        90-day rolling median unit price where an official estimate is not
        published. Methodology and data sources are updated quarterly.
      </P>
    </div>
  );
}

function DashFooterBlocks() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 48px 80px" }}>
      {/* Archive navigator */}
      <div style={{
        padding: 28,
        border: "1px solid var(--gray-200)",
        borderRadius: 16,
        marginBottom: 24,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 16,
        }}>
          <h3 style={{
            margin: 0, fontSize: 20, fontWeight: 700,
            color: "var(--color-800)",
          }}>Archive</h3>
          <span style={{
            fontSize: 13, fontWeight: 500, color: "var(--color-500)",
            cursor: "pointer",
          }}>View all issues →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {["Apr 20", "Apr 13", "Apr 06", "Mar 30", "Mar 23", "Mar 16", "Mar 09", "Mar 02"].map((d, i) => (
            <div key={i} style={{
              padding: "10px 14px",
              border: "1px solid var(--gray-200)",
              borderRadius: 10,
              fontSize: 13, cursor: "pointer",
              color: i === 0 ? "var(--color-600)" : "var(--gray-700)",
              fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? "var(--color-25)" : "#fff",
              borderColor: i === 0 ? "var(--color-300)" : "var(--gray-200)",
            }}>
              <div style={{ fontSize: 11, color: "var(--gray-500)", marginBottom: 2 }}>
                2026
              </div>
              {d}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: 28,
        background: "var(--color-800)", color: "#fff",
        borderRadius: 16,
        display: "flex", alignItems: "center", gap: 24,
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
            Get every issue by email.
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            Mondays, 9 AM ET. Free. Unsubscribe anytime.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="you@company.com" style={{
            minWidth: 260, padding: "10px 14px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)", color: "#fff",
            fontSize: 14, fontFamily: "var(--font-sans)", outline: "none",
          }} />
          <button className="pb-button pb-button-md pb-button-primary">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

function Variation3() {
  return (
    <DPageChrome>
      <DashHero />
      <DashBody />
      <DashFooterBlocks />
    </DPageChrome>
  );
}

window.Variation3 = Variation3;
