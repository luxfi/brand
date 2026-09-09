// brand.json's `theme` PROJECTED onto @hanzo/design's semantic tokens.
//
// The look is already declared — brand.json carries a light and a dark theme, and
// has for as long as this package has existed. What was missing was the bridge to
// the layer that renders it, so every surface fell back to Hanzo's monochrome and
// a brand could not look like itself.
//
// It is GENERATED, never authored. A hand-written tokens.css would be a second
// copy of the palette, and the whole lesson of the placeholder mark is that a
// second copy is a thing that silently stops agreeing.
//
// Only the tokens a BRAND legitimately owns are emitted — ground, ink, accent,
// the edges drawn on them. Radius, type ramp, spacing, motion and z stay
// @hanzo/design's: they are the system's grammar, not a brand's voice, and a
// brand that redefines them is a fork wearing a stylesheet.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { themeToTokens } from '@hanzo/design'

const brand = JSON.parse(readFileSync(join(process.cwd(), 'brand.json'), 'utf8')).brand
const { theme } = brand
if (!theme?.dark || !theme?.light) {
  console.error('REFUSED: brand.json declares no light+dark theme to project')
  process.exit(1)
}

// The MAPPING is @hanzo/design's — it owns the semantic token names, a brand owns
// the values, and neither carries a copy of the other. This file only decides
// where the result is written and under which selectors.
function block(t) {
  return Object.entries(themeToTokens(t)).map(([name, value]) => `  ${name}:${value};`).join('\n')
}

const css = `/* GENERATED from brand.json by scripts/tokens.mjs — do not edit.
   Run \`pnpm tokens\`. The palette lives in brand.json; this is its projection
   onto @hanzo/design's semantic tokens.

   Import AFTER @hanzo/design/styles.css:
     @import "@hanzo/design/styles.css";
     @import "@luxfi/brand/tokens.css";

   Only what a brand owns is here — ground, ink, accent, edges. The radius scale,
   the type ramp, spacing, motion and z stay @hanzo/design's. */

:root{
${block(theme.dark)}
}

@media (prefers-color-scheme: light){
  :root:not([data-theme="dark"]){
${block(theme.light).split('\n').map((l) => '  ' + l).join('\n')}
  }
}

[data-theme="light"]{
${block(theme.light)}
}
`
writeFileSync(join(process.cwd(), 'tokens.css'), css)
const n = css.match(/^\s+--/gm)?.length ?? 0
console.log(`>> tokens.css — ${n} declarations from brand.json's theme`)
