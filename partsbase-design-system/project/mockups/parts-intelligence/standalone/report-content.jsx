/*
 * Shared long-form content for the mock report. Pulled into each variation
 * so narrative is identical and only presentation differs.
 *
 * Content is synthesized — plausible aerospace-procurement prose with
 * realistic FSGs, notice counts, and DoD vocabulary. Swap for real data.
 */

const REPORT = {
  issue: "Vol. 4 · Issue 17",
  date: "April 20, 2026",
  window: "2026-04-13 to 2026-04-19",
  readingTime: "8 min read",
  authorship: "PartsBase Intelligence",
  title: "Parts and MRO Intelligence Report",
  deck: "Solicitation volume contracted 17.3% week-over-week even as hardware demand concentrated around sustainment-critical FSGs — a pattern consistent with late-quarter obligation timing and ongoing depot-level overhaul cycles.",

  metrics: [
    { label: "Total solicitations", value: "9,626", delta: "−17.3%", dir: "down" },
    { label: "Aggregate est. value", value: "$612.4M", delta: "−4.1%", dir: "down" },
    { label: "Avg. notice value", value: "$63.6K", delta: "+15.9%", dir: "up" },
    { label: "DLA share of volume", value: "97.9%", delta: "+0.4pp", dir: "flat" },
  ],

  toc: [
    "Executive Summary",
    "Key Metrics Snapshot",
    "Where Volume Concentrated",
    "FSG 53 — The Week's Anchor",
    "Buyer-Side Implications",
    "Seller-Side Implications",
    "Methodology",
  ],

  fsgs: [
    { code: "FSG 53", name: "Hardware & Abrasives", notices: 1942, value: "$87.2M", share: 20.2 },
    { code: "FSG 59", name: "Electrical & Electronic Equipment", notices: 1187, value: "$74.8M", share: 12.3 },
    { code: "FSG 15", name: "Aerospace Craft & Structural Components", notices: 964, value: "$121.0M", share: 10.0 },
    { code: "FSG 16", name: "Aerospace Craft Components & Accessories", notices: 812, value: "$58.6M", share:  8.4 },
    { code: "FSG 28", name: "Engines, Turbines & Components", notices: 704, value: "$92.1M", share:  7.3 },
  ],
};

window.REPORT = REPORT;
