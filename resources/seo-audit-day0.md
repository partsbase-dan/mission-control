# PartsBase SEO Audit — Pre-Start (Day 0)

**Date:** 2026-05-11  
**Tool:** seo_checker.py (on-page HTML analysis)  
**Pages audited:** partsbase.com homepage, /aviation-parts, /about  

---

## Summary Finding

**Overall Score: 42/100 — Grade D**

Every page audited returned the exact same score and the same 149-character meta description. This is not a coincidence — it's a structural issue.

---

## Root Cause: Client-Side Rendered SPA

PartsBase.com is a single-page application (SPA). The server delivers a static HTML shell to every URL, and JavaScript populates the content after load. The SEO checker — and more importantly, Google's initial crawl — sees only that shell.

This means:
- Every page has the **same title tag** (or none)
- Every page shares the **same 149-char meta description**
- No H1s, body copy, or structured content exists in the static HTML
- All part numbers, supplier profiles, and category pages are **invisible to Google's initial crawl**

---

## Page-by-Page Results

| Check | Score | Finding |
|---|---|---|
| Title Tag | 0/100 | Missing in static HTML |
| Meta Description | 50/100 | 149 chars (1 char under the 150-char minimum) — same on every page |
| H1 Tag | 0/100 | None in static HTML |
| Heading Hierarchy | 100/100 | Pass (no headings = no hierarchy errors) |
| Image Alt Text | 100/100 | Pass |
| Link Ratio | 100/100 | Good internal/external balance |
| Word Count | 0/100 | 0 words in static HTML |
| Viewport Meta | 100/100 | Mobile viewport tag present |

---

## Why This Matters for a Parts Marketplace

PartsBase's biggest organic search opportunity is long-tail: part numbers, ATA codes, manufacturer names, and component categories. Searches like:

- "Boeing 737 landing gear actuator supplier"
- "ATA 32 parts distributor"
- "Airbus A320 hydraulic pump surplus"

These are high-intent, low-competition searches that a properly indexed marketplace could dominate. Right now, none of those pages have static HTML Google can reliably index.

The 7,600+ supplier profiles and their inventory listings represent thousands of potential indexed pages — all currently underperforming.

---

## Technical Options (Conversation to Have with IT/Engineering)

| Option | Effort | Impact | Notes |
|---|---|---|---|
| Server-Side Rendering (SSR) | High | High | Full fix — requires framework-level changes (Next.js, Nuxt, etc.) |
| Static Site Generation (SSG) for key pages | Medium | High | Pre-render supplier profiles and part category pages at build time |
| Dynamic Rendering (prerender.io) | Low | Medium | Serve pre-rendered HTML to crawlers, SPA to users — quick win |
| Meta tag injection per route | Low | Low | Fix titles/descriptions without solving body content |

**Recommendation to raise on Day 1:** Start with dynamic rendering as a quick win (2-4 week implementation), while scoping SSR/SSG as a longer-term project. This unblocks the SEO content pipeline immediately.

---

## Opportunity Sizing (Rough)

If partsbase.com properly indexed even 10% of possible long-tail aviation part searches:
- Marketplace has 7,600+ companies → assume similar count of supplier profile pages
- Aviation parts market: millions of unique part numbers
- Even 1,000 indexed, optimized part category pages ranking for niche terms = meaningful organic lead volume

---

## Day 1 Talking Points

> "Before I started, I ran a technical SEO audit on the site. Every page is serving the same static HTML shell — no page-specific titles, no H1s, no body copy that Google can index without rendering JavaScript. For a marketplace built around searchable inventory, this is a significant gap. I'd like to understand the current front-end architecture and have a conversation with engineering about options."

---

## Demand Gen Impact — Why This Breaks More Than SEO

*Informed by cs-demand-gen-specialist: attribution-guide.md + hubspot-workflows.md + international-playbooks.md*

The SPA rendering issue isn't just an SEO problem. It cascades into attribution, HubSpot setup, and international compliance.

### 1. Attribution Is Broken Before It Starts

The attribution model (recommended: W-shaped — 40% first touch, 20% middle, 40% last touch) depends on GA4 firing page-specific events reliably. With client-side rendering:

- `page_view` events may fire without correct page metadata (no title, no H1 for GA4 to associate)
- UTM parameters may be lost between SPA route changes if not explicitly handled
- HubSpot's attribution reports will show gaps or attribute deals to wrong channels
- The CAC calculation by channel will be inaccurate from day one

**Fix required before building attribution:** Ensure `page_view` events fire with correct `page_title` and `page_location` on every SPA route change — not just on initial load.

### 2. HubSpot Lead Scoring Depends on Page Signals

The planned HubSpot lead scoring model assigns points like:
- Pricing page visit: +15 points
- Demo request: +30 points
- Content download: +10–20 points

If GA4/GTM isn't correctly tracking these page visits (because the SPA isn't triggering events on route change), HubSpot won't receive the behavioral data it needs to score leads accurately. Leads will be under-scored and MQL→SQL handoffs will break.

**Fix:** Wire HubSpot tracking code through GTM with explicit SPA route change triggers (History Change trigger in GTM).

### 3. International: 217 Countries, Zero Hreflang Tags

PartsBase operates in 217 countries. The international playbook flags hreflang tags as a critical localization requirement. With the current SPA architecture:

- No hreflang tags are present in the static HTML shell
- Google cannot determine which version of a page to serve to which country
- EU users (GDPR) and other regions may be receiving incorrect content/consent flows
- CookiePro (the planned consent platform) needs to be wired correctly for EU visitors — this depends on the static HTML shell loading consent scripts before any content renders

**Priority regions to address first:** EU (GDPR compliance + largest aviation market outside US), Middle East (major aviation hub), Australia (Air Australia is a named customer).

---

## Next Steps

- [ ] Share finding with engineering/IT — understand current front-end stack
- [ ] Determine if GTM History Change trigger is already configured (quick fix for HubSpot + GA4 SPA tracking)
- [ ] Get access to Google Search Console — see what Google is actually indexing vs. what we expect
- [ ] Pull SEMrush data on current organic rankings vs. competitor marketplaces
- [ ] Scope dynamic rendering (prerender.io) as quick win — 2-4 weeks, unblocks SEO content pipeline
- [ ] Add SSR/SSG for supplier profiles and part category pages to engineering roadmap
- [ ] Validate CookiePro is loading before any content in the static shell (GDPR compliance)
- [ ] Add hreflang implementation to roadmap once SSR/SSG is scoped

## Attribution Setup Dependency Map

```
Fix SPA page_view events
        ↓
GA4 fires correctly on all routes
        ↓
GTM History Change trigger active
        ↓
HubSpot receives page visit data
        ↓
Lead scoring works
        ↓
MQL → SQL handoffs are accurate
        ↓
Attribution model is trustworthy
        ↓
CAC by channel is real
```

Don't build the attribution model until the first two steps are confirmed.
