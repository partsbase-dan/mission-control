/*
 * Variation 1 — "Analyst Memo"
 *
 * Closest to the reference. Single-column long-form with a sticky
 * right-rail that holds a TOC + related issues (replaces the reference's
 * "Search by Date" panel with something more useful for a report).
 * Typographic hero sits on the same cool-tint background strip.
 */

const { Breadcrumb, PageChrome } = window;
const R = window.REPORT;

function MemoHero() {
  return (
    <div style={{
      background: "linear-gradient(180deg, #E8F1FB 0%, #F6FAFE 100%)",
      padding: "32px 0 80px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ padding: "16px 0 40px" }}>
          <Breadcrumb items={["Home", "Blog", "Parts Intelligence Report", R.title]} />
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 760px) 320px",
          gap: 48,
          alignItems: "start",
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--color-500)",
              marginBottom: 20,
            }}>
              <span style={{ width: 24, height: 2, background: "var(--color-500)" }}></span>
              Parts Intelligence Report · {R.issue}
            </div>
            <h1 style={{
              fontFamily: "var(--font-sans)",
              fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em",
              fontWeight: 700, color: "var(--color-800)",
              margin: "0 0 24px",
            }}>{R.title}</h1>
            <p style={{
              fontSize: 20, lineHeight: 1.55, color: "var(--gray-700)",
              maxWidth: 640, margin: 0, fontWeight: 400,
            }}>{R.deck}</p>
            <div style={{
              display: "flex", gap: 24, marginTop: 32,
              fontSize: 14, color: "var(--gray-600)",
            }}>
              <span><strong style={{ color: "var(--color-800)" }}>Published</strong> · {R.date}</span>
              <span><strong style={{ color: "var(--color-800)" }}>Window</strong> · {R.window}</span>
              <span><strong style={{ color: "var(--color-800)" }}>Reading time</strong> · {R.readingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyMetrics() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
      border: "1px solid var(--gray-200)", borderRadius: 16,
      background: "#fff", overflow: "hidden",
      margin: "-56px 0 48px",
      boxShadow: "0 4px 16px rgba(0,40,87,0.06)",
    }}>
      {R.metrics.map((m, i) => (
        <div key={i} style={{
          padding: "20px 24px",
          borderRight: i < 3 ? "1px solid var(--gray-200)" : "none",
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "var(--gray-500)",
            marginBottom: 10,
          }}>{m.label}</div>
          <div style={{
            fontSize: 32, fontWeight: 700, color: "var(--color-800)",
            letterSpacing: "-0.015em", lineHeight: 1,
          }}>{m.value}</div>
          <div style={{
            fontSize: 13, marginTop: 8, fontWeight: 500,
            color: m.dir === "up" ? "var(--success-700)"
                 : m.dir === "down" ? "var(--error-700)"
                 : "var(--gray-600)",
          }}>{m.delta} <span style={{ color: "var(--gray-500)", fontWeight: 400 }}>WoW</span></div>
        </div>
      ))}
    </div>
  );
}

function TOC() {
  return (
    <div style={{
      position: "sticky", top: 24,
      padding: 20,
      border: "1px solid var(--gray-200)",
      borderRadius: 16,
      background: "#fff",
    }}>
      <div style={{
        fontSize: 12, fontWeight: 600, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "var(--gray-500)",
        marginBottom: 14,
      }}>In this report</div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {R.toc.map((t, i) => (
          <li key={i} style={{
            display: "flex", gap: 12,
            padding: "8px 0",
            borderTop: i > 0 ? "1px solid var(--gray-200)" : "none",
            fontSize: 14, color: "var(--color-800)",
            cursor: "pointer",
          }}>
            <span style={{
              fontSize: 12, color: "var(--gray-400)",
              fontFeatureSettings: "'tnum'", fontWeight: 500, width: 18,
            }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
          </li>
        ))}
      </ol>

      <div style={{
        marginTop: 20, paddingTop: 20,
        borderTop: "1px solid var(--gray-200)",
      }}>
        <div style={{
          fontSize: 12, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "var(--gray-500)",
          marginBottom: 12,
        }}>Recent issues</div>
        {[
          ["Vol. 4 · Issue 16", "2026-04-13"],
          ["Vol. 4 · Issue 15", "2026-04-06"],
          ["Vol. 4 · Issue 14", "2026-03-30"],
          ["Vol. 4 · Issue 13", "2026-03-23"],
        ].map(([label, d], i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            padding: "6px 0", fontSize: 13, cursor: "pointer",
          }}>
            <span style={{ color: "var(--color-500)", fontWeight: 500 }}>{label}</span>
            <span style={{ color: "var(--gray-500)" }}>{d}</span>
          </div>
        ))}
        <div style={{
          marginTop: 12, fontSize: 13, fontWeight: 500,
          color: "var(--color-500)", cursor: "pointer",
        }}>View all issues →</div>
      </div>
    </div>
  );
}

/* ── Body prose + FSG table ─────────────────────────────────────────────── */
function Body() {
  const H2 = ({ children, id }) => (
    <h2 id={id} style={{
      fontSize: 28, fontWeight: 700, color: "var(--color-800)",
      letterSpacing: "-0.015em", lineHeight: 1.2,
      margin: "48px 0 16px",
    }}>{children}</h2>
  );
  const P = ({ children }) => (
    <p style={{
      fontSize: 17, lineHeight: 1.7, color: "var(--gray-700)",
      margin: "0 0 18px", textWrap: "pretty",
    }}>{children}</p>
  );

  return (
    <div>
      <H2>Executive Summary</H2>
      <P>
        During the {R.window} reporting window, U.S. government aerospace-related
        solicitation activity totaled 9,626 notices, down 17.3% from the prior
        week, with an aggregate estimated value of $612.43M. DLA (DEPT OF
        DEFENSE) dominated volume with 9,427 solicitations. The week's
        underlying pattern showed that overall contraction in notice count
        coincided with concentrated demand in hardware-heavy and
        sustainment-oriented categories, led by FSG 53.
      </P>
      <P>
        Despite the top-line contraction, average notice value rose 15.9% to
        $63.6K — a signal that fewer, larger line items were being solicited
        rather than a broad pullback across all contracting offices. This is
        consistent with late-quarter obligation timing at DLA Troop Support
        and DLA Aviation, both of which published concentrated batches of
        multi-quantity hardware notices on April 16 and April 18.
      </P>

      <H2>Key Metrics Snapshot</H2>
      <ul style={{
        fontSize: 17, lineHeight: 1.8, color: "var(--gray-700)",
        paddingLeft: 22, margin: "0 0 18px",
      }}>
        <li>Reporting window: {R.window}</li>
        <li>Total solicitations: 9,626 (−17.3% WoW)</li>
        <li>Aggregate estimated value: $612.43M</li>
        <li>Average notice value: $63.6K (+15.9% WoW)</li>
        <li>DLA share of volume: 97.9%</li>
      </ul>

      <H2>Where Volume Concentrated</H2>
      <P>
        Five federal supply groups accounted for 58.2% of all aerospace-tagged
        solicitations for the week. FSG 53 (Hardware & Abrasives) continued
        its multi-week lead in notice count, while FSG 15 led in dollar value
        — a distribution shape that procurement teams have come to expect
        from sustainment-heavy reporting windows.
      </P>

      <table style={{
        width: "100%", borderCollapse: "collapse",
        margin: "24px 0 32px",
        fontSize: 14,
      }}>
        <thead>
          <tr style={{
            textAlign: "left", color: "var(--gray-600)",
            fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em",
            fontWeight: 600,
          }}>
            <th style={{ padding: "10px 12px", borderBottom: "2px solid var(--gray-300)" }}>FSG</th>
            <th style={{ padding: "10px 12px", borderBottom: "2px solid var(--gray-300)" }}>Category</th>
            <th style={{ padding: "10px 12px", borderBottom: "2px solid var(--gray-300)", textAlign: "right" }}>Notices</th>
            <th style={{ padding: "10px 12px", borderBottom: "2px solid var(--gray-300)", textAlign: "right" }}>Value</th>
            <th style={{ padding: "10px 12px", borderBottom: "2px solid var(--gray-300)", textAlign: "right" }}>Share</th>
          </tr>
        </thead>
        <tbody>
          {R.fsgs.map((f, i) => (
            <tr key={i}>
              <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-200)",
                fontWeight: 600, color: "var(--color-800)" }}>{f.code}</td>
              <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-200)",
                color: "var(--gray-700)" }}>{f.name}</td>
              <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-200)",
                textAlign: "right", fontFeatureSettings: "'tnum'",
                color: "var(--gray-800)" }}>{f.notices.toLocaleString()}</td>
              <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-200)",
                textAlign: "right", fontFeatureSettings: "'tnum'",
                color: "var(--gray-800)" }}>{f.value}</td>
              <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-200)",
                textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                  <div style={{ width: 80, height: 6, background: "var(--gray-100)", borderRadius: 3 }}>
                    <div style={{ width: `${f.share * 4}%`, height: "100%",
                      background: "var(--color-500)", borderRadius: 3 }}></div>
                  </div>
                  <span style={{ fontFeatureSettings: "'tnum'",
                    color: "var(--gray-700)", minWidth: 44 }}>{f.share.toFixed(1)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <H2>FSG 53 — The Week's Anchor</H2>
      <P>
        Hardware & Abrasives represented 20.2% of notices but only 14.2% of
        aggregate estimated value, reflecting the category's characteristic
        high-volume / low-unit-cost shape. Of the 1,942 FSG 53 notices, 71%
        originated with DLA Troop Support in Philadelphia; the remainder
        split primarily between DLA Aviation (Richmond) and a small tail of
        Air Force and Navy Working Capital Fund notices.
      </P>
      <P>
        The week's single largest FSG 53 solicitation — a $4.2M multi-line
        consolidation for fastener kits supporting T-56 engine overhauls —
        closed on April 18 and drew 14 offers. Supplier concentration on
        that notice remained diffuse, suggesting the fastener market has not
        tightened to the degree observed in bearings and seals over the
        past two quarters.
      </P>

      <blockquote style={{
        margin: "32px 0",
        padding: "24px 28px",
        borderLeft: "4px solid var(--color-500)",
        background: "var(--color-25)",
        fontSize: 19, lineHeight: 1.5, fontStyle: "italic",
        color: "var(--color-800)",
      }}>
        "Late-Q2 obligation behavior at DLA continues to produce predictable
        volume spikes in sustainment categories. Buyers who can pre-position
        hardware inventory two to three weeks ahead of these windows
        consistently capture the more favorable pricing."
        <div style={{
          marginTop: 12, fontSize: 13, fontStyle: "normal", fontWeight: 500,
          color: "var(--gray-600)", textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>PartsBase Intelligence · Week 17 commentary</div>
      </blockquote>

      <H2>Buyer-Side Implications</H2>
      <P>
        Procurement teams with active FSG 53 requirements should expect
        competitive bidding conditions to persist through the end of April.
        Lead-time quotes from the top five fastener distributors on
        PartsBase tightened by an average of 4.2 days week-over-week — a
        meaningful signal for AOG scenarios, where even a single-digit
        improvement in lead time can change the sourcing decision.
      </P>

      <H2>Seller-Side Implications</H2>
      <P>
        Distributors holding FSG 53 and FSG 59 inventory should review
        pricing competitiveness heading into next week. Average winning-bid
        margins in these categories have narrowed; sellers who historically
        priced at the 75th percentile may find themselves outside the
        winning range without adjustment.
      </P>

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

function CTAStrip() {
  return (
    <div style={{
      margin: "64px 0 0",
      background: "var(--color-800)",
      color: "#fff",
      borderRadius: 20,
      padding: "40px 44px",
      display: "flex", alignItems: "center", gap: 32,
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "var(--color-300)",
          marginBottom: 10,
        }}>Get the next issue</div>
        <h3 style={{
          fontSize: 28, fontWeight: 700, margin: "0 0 8px",
          letterSpacing: "-0.015em", lineHeight: 1.15,
        }}>
          Parts Intelligence, in your inbox every Monday.
        </h3>
        <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.75)" }}>
          Free. No spam. Unsubscribe anytime.
        </p>
      </div>
      <button className="pb-button pb-button-lg pb-button-primary">
        Subscribe
      </button>
    </div>
  );
}

function RelatedStrip() {
  const items = [
    ["Vol. 4 · Issue 16", "Bearings & Seals: a three-month tightening trend", "2026-04-13"],
    ["Vol. 4 · Issue 15", "How April obligation timing shapes distributor lead-times", "2026-04-06"],
    ["Vol. 4 · Issue 14", "Turbine component sourcing after the T-56 consolidation", "2026-03-30"],
  ];
  return (
    <section style={{ margin: "64px 0 0" }}>
      <div style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        marginBottom: 24,
      }}>
        <h2 style={{
          fontSize: 28, fontWeight: 700, color: "var(--color-800)",
          margin: 0, letterSpacing: "-0.015em",
        }}>More from Parts Intelligence</h2>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-500)", cursor: "pointer" }}>
          View all issues →
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {items.map(([label, title, date], i) => (
          <div key={i} className="pb-card pb-card-border" style={{
            padding: 24, border: "1px solid var(--gray-200)",
          }}>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--color-500)",
              marginBottom: 12,
            }}>{label}</div>
            <div style={{
              fontSize: 18, lineHeight: 1.35, fontWeight: 600,
              color: "var(--color-800)", margin: "0 0 16px",
            }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--gray-500)" }}>{date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Variation1() {
  return (
    <PageChrome>
      <MemoHero />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 760px) 320px",
          gap: 48, alignItems: "start",
        }}>
          <div>
            <KeyMetrics />
            <Body />
            <CTAStrip />
            <RelatedStrip />
          </div>
          <TOC />
        </div>
      </div>
    </PageChrome>
  );
}

window.Variation1 = Variation1;
