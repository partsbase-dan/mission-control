/*
 * Variation 2 — "Magazine Briefing"
 *
 * Editorial report-document layout. Full-width masthead with TradeMarker
 * display face for the issue slate. Body uses a two-column text grid with
 * pull quotes and figures breaking across the gutter. Most editorial take.
 */

const { Breadcrumb: MBreadcrumb, PageChrome: MPageChrome } = window;
const MR = window.REPORT;

function Masthead() {
  return (
    <div style={{
      background: "var(--color-800)",
      color: "#fff",
      padding: "32px 0 48px",
      borderBottom: "6px solid #EF5A24",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            fontSize: 12, fontWeight: 500, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
          }}>
            <span style={{ color: "#fff", fontWeight: 600 }}>Home</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>Blog</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>Intelligence Report</span>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 40,
          alignItems: "end", paddingBottom: 24,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}>
          <div className="pb-display" style={{
            fontFamily: "TradeMarker, Georgia, serif",
            fontStyle: "italic", fontWeight: 700,
            fontSize: 64, lineHeight: 1, color: "#fff",
            letterSpacing: "-0.01em",
          }}>
            Parts Intelligence
          </div>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
            paddingBottom: 8,
          }}>A weekly aerospace procurement briefing</div>
          <div style={{
            textAlign: "right", fontSize: 13, lineHeight: 1.5,
            color: "rgba(255,255,255,0.8)",
          }}>
            <div style={{ fontWeight: 600, color: "#fff" }}>{MR.issue}</div>
            <div>{MR.date}</div>
          </div>
        </div>

        <div style={{
          marginTop: 40,
          display: "grid", gridTemplateColumns: "minmax(0, 820px) 1fr",
          gap: 80, alignItems: "end",
        }}>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#EF5A24",
              marginBottom: 16,
            }}>Lead feature · Government procurement</div>
            <h1 style={{
              fontFamily: "var(--font-sans)", fontSize: 68,
              lineHeight: 1.02, letterSpacing: "-0.025em",
              fontWeight: 700, margin: 0, color: "#fff",
              textWrap: "balance",
            }}>{MR.title}</h1>
          </div>
          <div style={{
            fontSize: 13, color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6, paddingBottom: 8,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
            }}>Window · Reading time</div>
            <div style={{ color: "#fff", fontWeight: 500 }}>{MR.window}</div>
            <div>{MR.readingTime} · {MR.authorship}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MagDeck() {
  return (
    <div style={{
      background: "var(--color-25)",
      padding: "40px 0",
      borderBottom: "1px solid var(--gray-200)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 640px) 1fr",
          gap: 80, alignItems: "start",
        }}>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--color-500)",
              marginBottom: 12,
            }}>The week in 60 seconds</div>
            <p style={{
              fontSize: 22, lineHeight: 1.5, color: "var(--color-800)",
              margin: 0, fontWeight: 400, textWrap: "pretty",
            }}>{MR.deck}</p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16,
          }}>
            {MR.metrics.map((m, i) => (
              <div key={i} style={{
                padding: "16px 18px",
                background: "#fff",
                border: "1px solid var(--gray-200)",
                borderRadius: 12,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: "var(--gray-500)",
                  marginBottom: 6,
                }}>{m.label}</div>
                <div style={{
                  fontSize: 24, fontWeight: 700, color: "var(--color-800)",
                  lineHeight: 1.05, letterSpacing: "-0.015em",
                }}>{m.value}</div>
                <div style={{
                  fontSize: 12, marginTop: 4, fontWeight: 500,
                  color: m.dir === "up" ? "var(--success-700)"
                       : m.dir === "down" ? "var(--error-700)"
                       : "var(--gray-600)",
                }}>{m.delta} WoW</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MagBody() {
  const H2 = ({ children }) => (
    <h2 style={{
      fontSize: 30, fontWeight: 700, color: "var(--color-800)",
      letterSpacing: "-0.02em", lineHeight: 1.15,
      margin: "40px 0 16px",
      columnSpan: "all",
    }}>{children}</h2>
  );
  const P = ({ children }) => (
    <p style={{
      fontSize: 16, lineHeight: 1.7, color: "var(--gray-700)",
      margin: "0 0 16px", textWrap: "pretty",
      orphans: 3, widows: 3,
    }}>{children}</p>
  );

  return (
    <div style={{
      maxWidth: 1200, margin: "0 auto", padding: "64px 48px 80px",
    }}>
      <H2>Executive summary</H2>
      <div style={{
        columnCount: 2, columnGap: 48,
        fontSize: 16, lineHeight: 1.7,
      }}>
        <P>
          During the {MR.window} reporting window, U.S. government
          aerospace-related solicitation activity totaled 9,626 notices,
          down 17.3% from the prior week, with an aggregate estimated
          value of $612.43M. DLA dominated volume with 9,427 solicitations.
          The week's underlying pattern showed overall contraction in notice
          count coinciding with concentrated demand in hardware-heavy and
          sustainment-oriented categories, led by FSG 53.
        </P>
        <P>
          Despite the top-line contraction, average notice value rose 15.9%
          to $63.6K — a signal that fewer, larger line items were being
          solicited rather than a broad pullback across all contracting
          offices. This is consistent with late-quarter obligation timing
          at DLA Troop Support and DLA Aviation, both of which published
          concentrated batches of multi-quantity hardware notices on
          April 16 and April 18.
        </P>
      </div>

      <div style={{
        margin: "48px 0",
        padding: "0 64px",
        borderTop: "1px solid var(--gray-300)",
        borderBottom: "1px solid var(--gray-300)",
      }}>
        <div className="pb-display" style={{
          fontFamily: "TradeMarker, Georgia, serif",
          fontStyle: "italic", fontWeight: 700,
          fontSize: 44, lineHeight: 1.15,
          color: "var(--color-800)",
          padding: "36px 0",
          textAlign: "center",
          textWrap: "balance",
        }}>
          "Buyers who pre-position hardware inventory two to three weeks
          ahead of DLA obligation windows consistently capture the more
          favorable pricing."
        </div>
      </div>

      <H2>Where volume concentrated</H2>
      <div style={{ columnCount: 2, columnGap: 48 }}>
        <P>
          Five federal supply groups accounted for 58.2% of all
          aerospace-tagged solicitations for the week. FSG 53 (Hardware &
          Abrasives) continued its multi-week lead in notice count, while
          FSG 15 led in dollar value — a distribution shape that
          procurement teams have come to expect from sustainment-heavy
          reporting windows.
        </P>
        <P>
          Hardware & Abrasives represented 20.2% of notices but only 14.2%
          of aggregate estimated value, reflecting the category's
          characteristic high-volume / low-unit-cost shape. Of the 1,942
          FSG 53 notices, 71% originated with DLA Troop Support in
          Philadelphia.
        </P>
      </div>

      {/* Full-width figure */}
      <figure style={{
        margin: "40px 0",
        padding: 32,
        border: "1px solid var(--gray-200)",
        borderRadius: 16, background: "#fff",
      }}>
        <figcaption style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--gray-500)",
          marginBottom: 20,
        }}>Figure 1 · Top 5 FSGs by solicitation volume</figcaption>
        <div style={{ display: "grid", gap: 14 }}>
          {MR.fsgs.map((f, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 90px 90px",
              gap: 16, alignItems: "center",
              fontSize: 14,
            }}>
              <span style={{ fontWeight: 600, color: "var(--color-800)" }}>{f.code}</span>
              <div style={{
                position: "relative", height: 28,
                background: "var(--gray-100)", borderRadius: 6,
              }}>
                <div style={{
                  height: "100%",
                  width: `${f.share * 4.5}%`,
                  background: i === 0 ? "var(--color-600)" : "var(--color-400)",
                  borderRadius: 6,
                  display: "flex", alignItems: "center",
                  padding: "0 10px", color: "#fff", fontSize: 12,
                  fontWeight: 500, whiteSpace: "nowrap",
                }}>{f.name}</div>
              </div>
              <span style={{ textAlign: "right", color: "var(--gray-700)",
                fontFeatureSettings: "'tnum'" }}>{f.notices.toLocaleString()}</span>
              <span style={{ textAlign: "right", color: "var(--gray-700)",
                fontFeatureSettings: "'tnum'" }}>{f.value}</span>
            </div>
          ))}
        </div>
      </figure>

      <H2>Implications for buyers &amp; sellers</H2>
      <div style={{ columnCount: 2, columnGap: 48 }}>
        <P>
          Procurement teams with active FSG 53 requirements should expect
          competitive bidding conditions to persist through the end of
          April. Lead-time quotes from the top five fastener distributors
          on PartsBase tightened by an average of 4.2 days week-over-week
          — a meaningful signal for AOG scenarios where even a
          single-digit improvement in lead time can change the sourcing
          decision.
        </P>
        <P>
          Distributors holding FSG 53 and FSG 59 inventory should review
          pricing competitiveness heading into next week. Average
          winning-bid margins in these categories have narrowed; sellers
          who historically priced at the 75th percentile may find
          themselves outside the winning range without adjustment.
        </P>
        <P>
          PartsBase Intelligence aggregates SAM.gov, DIBBS, and FedBizOpps
          feeds, then cross-references each notice against the PartsBase
          part-number graph and the federal supply group taxonomy.
          Methodology is updated quarterly.
        </P>
      </div>

      <div style={{
        marginTop: 56, padding: "28px 32px",
        border: "1px solid var(--color-200)",
        background: "var(--color-25)",
        borderRadius: 16,
        display: "flex", alignItems: "center", gap: 24,
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--color-500)",
            marginBottom: 4,
          }}>Next issue · April 27</div>
          <div style={{
            fontSize: 18, fontWeight: 600, color: "var(--color-800)",
          }}>Get Parts Intelligence in your inbox every Monday.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input placeholder="you@company.com" style={{
            minWidth: 260, border: "1px solid var(--gray-300)",
            padding: "10px 14px", borderRadius: 10, fontSize: 14,
            fontFamily: "var(--font-sans)", outline: "none",
          }} />
          <button className="pb-button pb-button-md pb-button-primary">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

function Variation2() {
  return (
    <MPageChrome>
      <Masthead />
      <MagDeck />
      <MagBody />
    </MPageChrome>
  );
}

window.Variation2 = Variation2;
