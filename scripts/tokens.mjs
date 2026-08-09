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

const brand = JSON.parse(readFileSync(join(process.cwd(), 'brand.json'), 'utf8')).brand
const { theme } = brand
if (!theme?.dark || !theme?.light) {
  console.error('REFUSED: brand.json declares no light+dark theme to project')
  process.exit(1)
}

// theme key -> the semantic tokens it answers for. A key the brand does not
// declare emits nothing, so @hanzo/design's own value stands rather than being
// overwritten with undefined.
const MAP = {
  surface1: ['--background'],
  surface2: ['--card', '--popover', '--muted'],
  surface3: ['--accent'],
  neutral1: ['--foreground', '--card-foreground', '--popover-foreground', '--accent-foreground'],
  neutral2: ['--muted-foreground'],
  accent1:  ['--primary'],
  border:   ['--border'],
  success:  ['--state-success'],
  warning:  ['--state-warning'],
  error:    ['--state-error'],
}

// --primary carries ink on top of it, so it names its own contrast partner.
const onPrimary = (t) => (t.accent1 && t.surface1 ? t.surface1 : null)

function block(t) {
  const out = []
  for (const [key, tokens] of Object.entries(MAP)) {
    if (!t[key]) continue
    for (const name of tokens) out.push(`  ${name}:${t[key]};`)
  }
  const fg = onPrimary(t)
  if (fg) out.push(`  --primary-foreground:${fg};`)
  return out.join('\n')
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
