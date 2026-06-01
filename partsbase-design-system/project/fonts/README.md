# Brand fonts

This folder ships the self-hosted brand fonts for the PartsBase design system.
All fonts are declared as `@font-face` rules in `system/fonts.css` (imported
via `system/pb-system.css`).

## Families

| Family                   | Files                                              | Role                                 |
|--------------------------|----------------------------------------------------|--------------------------------------|
| **Roboto**               | `Roboto-variable-*.woff2` (9 subsets, variable)    | Public portal body + UI              |
| **Avenir Next LT Pro**   | `AvenirNextLTPro-*.otf` (12 regular + 12 condensed)| Private (signed-in) portal body + UI |
| **TradeMarker**          | `TradeMarker-Bold.otf`, `TradeMarker-BoldItalic.otf` | Editorial display / marketing       |
| **Font Awesome 5**       | `fa-solid-900.ttf`, `fa-regular-400.ttf`, `fa-brands-400.ttf` | Icon font (modern)          |
| **Font Awesome 4**       | `fontawesome-webfont.ttf`                          | Icon font (legacy, still in code)    |
| **Ionicons**             | `ionicons.ttf`                                     | Icon font (legacy, still in code)    |

## Notes

- The PartsBase wordmark is **not** a font — it is a drawn SVG logotype at
  `system/logos/pb-logo-light.svg` / `pb-logo-dark.svg`. Never typeset
  "PartsBase" in a font.
- All `@font-face` declarations use `font-display: swap`.
- Roboto is variable (weight 100–900 + italic axis).
