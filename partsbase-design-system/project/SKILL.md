# Designing with the PartsBase Design System

You are making something for PartsBase — a B2B aerospace parts marketplace. The audience is procurement, MRO, and airworthiness professionals, not consumers. Match the industry voice and ship production-feeling UI.

## Setup

One import gets you everything:
```html
<link rel="stylesheet" href="system/pb-system.css" />
```
This pulls Roboto from Google Fonts and every token + utility + component class below. All classes are prefixed `pb-`.

If your prototype is deep in a folder, adjust the path (`../system/pb-system.css`, etc.). Don't duplicate the CSS files — import them.

## Do first, before any layout

1. **Frame the audience.** Almost every PartsBase view is a buyer view or a seller view. If you're making a home/landing surface, start with a `pb-toggle` pivot. If you're making a product page, pick one side and commit.
2. **Pick your copy voice.** Short, declarative, industry-fluent. "Source aerospace parts." Not "Revolutionize your supply chain." Use real terms — RFQ, OEM, MRO, PMA, FBO, BOM. No emoji.
3. **Plan the shape before you pick the color.** PartsBase pages almost always go: hero → pivot → triad of cards → "see all" link → testimonial strip. Reuse that rhythm.

## Color rules of thumb

- `--color-600` = default button fill.
- `--color-500` = hover/accent, link color.
- `--color-800` = heading ink. Also the default dark hero background.
- `--color-100` = tint panel background.
- `--gray-700` = body copy. `--gray-500` = captions. `--gray-200` = hairline borders.
- Semantic scales (error/warning/success) only when the meaning matches. Don't reach for `warning` as a decorative yellow.

## Typography rules of thumb

- Body copy is `--text-md` at weight 400 in `--gray-700`.
- Page headings are `--text-display-md` or `-lg` at 700 in `--color-800`.
- Section eyebrows are `--text-sm` at 600, uppercase, `letter-spacing: 0.08em`, colored `--color-500`.
- Don't mix weights inside a paragraph — use color for de-emphasis instead.

## Component defaults

- **Buttons are pills.** Default primary is `pb-button pb-button-xl pb-button-primary` in hero, `pb-button-lg` inside cards, `pb-button-md` in dense UI. One primary per view — pair it with an outlined or ghost secondary.
- **Cards are 20px radius.** Use `pb-card-hover` for product cards and anything a user will interact with; `pb-card-gray` for stand-alone content; `pb-card-border` for inset panels; `pb-card-badge` for tinted callouts.
- **Product cards follow a triad rhythm.** Logo → description → exactly 3 feature ticks → CTA. Use `pb-check pb-check-xs pb-check-info` for the ticks.
- **Binary audience pivots use `pb-toggle`.** Small-N content pivots use `pb-tabs`. Don't swap them — the shapes are brand-recognizable.
- **Inputs and selects are 10px radius, 44px min height,** `--gray-300` border, focus ring = `--focus-ring`.

## Using product marks

- `system/logos/pb-logo-light.svg` / `pb-logo-dark.svg` — the master PartsBase mark. The suffix names the **background** the mark is for: `-light` goes on light surfaces (wordmark ink is navy `color-800`), `-dark` goes on dark surfaces (wordmark ink is white).
- `system/logos/pb-loc.svg`, `pb-store.svg`, `pb-lis.svg`, `pb-int.svg`, `pb-adv.svg`, `pb-expo.svg`, `pb-express.svg`, `pb-gd.svg` — product lockups. These are designed for **light** surfaces (PB mark blue, product suffix navy). On dark backgrounds, place them inside a light tinted card or use the master mark instead.
- Product marks are logos — don't shrink them into icon-button roles.

## Content rhythm

- **Hero.** Eyebrow (uppercase, brand blue) → display heading (color-800) → lede (gray-700, text-lg) → one primary + one outlined CTA.
- **Section.** Heading (display-sm, color-800) → 1-sentence lede (gray-600) → grid of cards or table.
- **Product triad.** Three cards side-by-side. Same height, same rhythm, same number of feature ticks. Wrap differences into badges, not into inconsistent layouts.
- **Footer CTA strip.** Dark (`color-800`) bar, white heading, primary button right-aligned.
- **Don't invent "stats widgets" or filler sections** just to fill a page. Every section should earn its place; if the user's asking for a 3-section page, make 3 strong sections, not 6 padded ones.

## Iconography

- Default icon set: **Feather Icons** (via `feather-icons-react` in the real app; inline SVG from feathericons.com in prototypes is fine).
- Use `pb-check` for feature lists / pricing ticks — not Feather's check.
- Never draw cartoon SVG illustrations. If you need imagery and don't have a screenshot, use a neutral placeholder (`<div>` with a tint, a gray card, a "screenshot goes here" label) and ask the user for real imagery.

## What to avoid

- **Gradients.** The brand is solid fills. A single subtle `linear-gradient(180deg, rgba(255,255,255,0), #fff)` on card texture is the only exception.
- **Rounded-corner containers with left-border accent stripes.** That's a generic-AI-SaaS trope. Use `pb-card-border` or a badge instead.
- **Decorative SVG illustrations of airplanes / parts / gears.** Use real screenshots or nothing.
- **System fonts, Inter, Arial.** Roboto is the brand face.
- **Emoji.** Never.

## Files worth knowing

- `preview/colors.html` — palette + role tokens.
- `preview/type.html` — scale + usage example.
- `preview/spacing.html` — 4-pt scale, radius, shadows, 12-col grid.
- `preview/components-buttons.html` — size × variant matrix + usage rules.
- `preview/components-cards.html` — card variants + canonical product card composition.
- `preview/components-controls.html` — toggle, tabs, select, input.
- `preview/brand.html` — logo family + voice examples.

Open these if you're unsure what the expected shape or rhythm is — they carry the examples production uses.
