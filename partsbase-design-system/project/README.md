# PartsBase Design System

A single source of truth for designs across the PartsBase marketplace — the aerospace parts platform serving 6,000+ airlines, OEMs, MROs, FBOs, and suppliers across 140+ countries. This system is lifted directly from the live `Partsbase.2.Web.Spa` codebase so prototypes match production 1:1.

## What's in the box

- `system/pb-system.css` — single entry point. Import this and you get every token, utility, and component class below.
- `system/colors.css` · `typography.css` · `spacing.css` · `sizing.css` · `shadows.css` · `grid.css` · `utilities.css` — tokens.
- `system/components/*.css` — class styles for Button, Card, Badge, Tabs, PBToggle, Check.
- `system/logos/*.svg` — master PartsBase mark + 8 product lockups (PBLocator, PBStore, PBLister, PBIntegration, PBAdvertising, PBExpo, PBExpress, PBGovernmentData).
- `preview/*.html` — visual review cards, one per asset group.

## How to use

In any prototype HTML:
```html
<link rel="stylesheet" href="system/pb-system.css" />
```
Roboto loads automatically from Google Fonts. All component classes (`pb-button`, `pb-card`, `pb-badge`, `pb-tab`, `pb-toggle`, `pb-check`) are global.

## Product context

PartsBase is a B2B marketplace for aviation/aerospace parts. The audience is procurement, MRO, and airworthiness professionals — not consumers. Copy is direct; visuals are precise; never casual, never cutesy.

The marketplace unfolds into a product family:
- **PBLocator** — buyer-side search and RFQ.
- **PBStore** — fixed-price, ready-to-ship parts.
- **PBLister** — aircraft + engine marketplace.
- **PBIntegration** — ERP/inventory API sync.
- **PBAdvertising** — promoted listings and email campaigns.
- **PBExpo** — annual in-person expo.
- **PBExpress** — fast-fulfillment SKU program.
- **PBGovernmentData** — gov/defense procurement data.

## Content fundamentals

- **Audience-first framing.** The home page pivots on a `PBToggle` — "I'm a buyer" / "I'm a seller" — and everything else re-renders from there. Mirror this framing in prototypes: who is looking, what do they need?
- **Short, declarative lines.** "Search, compare, and connect with trusted suppliers." Not "Unlock synergies in your supply chain."
- **Feature triads.** Product cards list exactly 3 features with filled-circle check glyphs. Keep the rhythm.
- **Numbers earn trust.** "6,000+ companies · 140+ countries · since 1996" — reach for concrete counts before abstract adjectives.
- **No emoji. No exclamation marks.** Industry voice.

## Visual foundations

- **Blue is the voice.** `--color-600` (#0C70E8) is primary fill; `--color-500` (#007FE9) is the hover/accent; `--color-800` (#002857) is the heading ink. White surfaces dominate; tint panels use `--color-100`.
- **Tinted shadows.** Drop shadows are `#174197` / `#1079F8` / `#0082F1` at low opacity — never pure black. Use `--cards-hover` for raised cards, `--focus-ring` for button hover halos.
- **Full pills.** Buttons and toggles are 50px-radius pills. Cards are 20px. Tabs/inputs are 10px. Badges are 16px.
- **Roboto only.** 400/500/600/700. Display sizes carry `-0.02em` tracking; body is default.
- **12-column grid.** 1280px max, 1216px content, 32px gutter. Collapses to 6-col at 768px, 4-col at 375px.
- **Composition rhythm.** Hero → toggle or tabs → triad of cards → "see all" ghost link → testimonial strip. The shapes recur; stay inside them.

## Iconography

- **Feather Icons** (`feather-icons-react`) is the default icon set in the codebase. Use it for UI glyphs (chevrons, arrows, checkmarks, `help`, `search`).
- **The `Check` component** uses a custom filled-circle glyph, not the Feather check. Reach for it on feature lists, success states, pricing ticks.
- **Product marks are logos, not icons.** Don't stick a product mark in a button — use it as a card header or page title.
- **No decorative SVG illustrations.** The marketing site uses real screenshots (`dashboard.svg`, `search-results.svg`, etc.). If you don't have one, put a neutral placeholder — don't invent cartoon graphics.

## Components

| Class | Use | Variants |
| --- | --- | --- |
| `pb-button` | Primary actions | `-primary` `-secondary` `-outlined` `-outlined-gray` `-ghost` `-ghost-gray` `-destructive` × `-sm` `-md` `-lg` `-xl` × `-light` `-dark` |
| `pb-link` | Inline text links | `-primary` `-secondary` × size |
| `pb-card` | Content surfaces | `-gray` `-hover` `-color` `-border` `-badge` (+ `pb-card-texture`) |
| `pb-badge` | Status/tag pills | `-default` `-info` `-success` `-warning` `-error` × `-sm/md/lg` (+ `-icon-only`) |
| `pb-tab` / `pb-tabs` | Content pivots | `.active` |
| `pb-toggle` | Binary audience pivots | thumb `.left` / `.right`, option `.active` |
| `pb-check` | Feature-list ticks | `-default` `-info` `-success` × `-xs/sm/md/lg/xl/2xl` |

See each `preview/*.html` card for live examples and composition rules.

## Structure

```
system/
  pb-system.css           ← import this
  colors.css
  typography.css
  spacing.css
  sizing.css
  shadows.css
  grid.css
  utilities.css
  components/
    button.css
    card.css
    badge.css
    tabs.css
    pbtoggle.css
    check.css
  logos/
    pb-logo-light.svg  pb-logo-dark.svg
    pb-loc.svg  pb-store.svg  pb-lis.svg  pb-int.svg
    pb-adv.svg  pb-expo.svg  pb-express.svg  pb-gd.svg
preview/
  colors.html  type.html  spacing.html
  components-buttons.html  components-cards.html  components-controls.html
  brand.html
SKILL.md                  ← instructions for AI designers using this system
README.md
```
