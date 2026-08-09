// The marks come FROM @luxfi/logo. This copies them in and refuses anything that
// is not a real mark.
//
// It exists because a placeholder shipped and nobody could see it: logo.svg was a
// black square with the letter L set in a system font, wordmark.svg the same trick,
// and both rendered — a placeholder that renders is invisible to every check that
// asks whether an asset loads. It sat in the package for months, on every surface
// that draws Lux.
//
// So the assets are not authored here. @luxfi/logo is where a mark is drawn; this
// package carries a copy for the CDN, and `pnpm assets` makes the copy exact. A
// drifted copy fails the build rather than shipping.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, dirname } from 'node:path'

const require = createRequire(import.meta.url)
// Resolve via the entry point, not package.json: @luxfi/logo declares an
// `exports` map, and a package that does so exposes ONLY what it lists — asking
// for its package.json is ERR_PACKAGE_PATH_NOT_EXPORTED.
const logoRoot = join(dirname(require.resolve('@luxfi/logo')), '..')
const out = join(process.cwd(), 'assets', 'logo')

// name in this package -> source in @luxfi/logo. Keyed by DESTINATION because two
// names legitimately share one source (the favicon is the icon), and keying by
// source silently drops one of them — which this file did on its first draft.
const MARKS = {
  'logo.svg': 'svg/lux-icon-white.svg',
  'wordmark.svg': 'svg/lux-wordmark-white.svg',
  'favicon.svg': 'svg/lux-icon-white.svg',
}

// A mark is DRAWN. Letterforms are paths; a <text> element means the glyph is
// whatever font the renderer happens to have, which is what a placeholder does
// and what a real wordmark never does.
function refuse(name, svg) {
  if (/<text[\s>]/i.test(svg)) return `${name} draws a <text> element — a mark is drawn, not typeset`
  if (/placeholder|stand-?in|TODO/i.test(svg)) return `${name} says it is a placeholder`
  if (svg.length < 80) return `${name} is ${svg.length} bytes — too small to be a mark`
  return null
}

const check = process.argv.includes('--check')
let failed = 0
mkdirSync(out, { recursive: true })

// Every asset brand.json PROMISES must exist. Derived from the contract rather
// than listed, so the check cannot drift from what consumers are told to draw —
// faviconUrl named a .png this package has never contained, and nothing noticed.
if (check) {
  const brand = JSON.parse(readFileSync(join(process.cwd(), 'brand.json'), 'utf8')).brand
  for (const [field, url] of Object.entries(brand)) {
    if (!/Url$/.test(field) || typeof url !== 'string' || !url.includes('/assets/')) continue
    const rel = url.slice(url.indexOf('/assets/') + 1)
    try { readFileSync(join(process.cwd(), rel)) } catch {
      console.error(`MISSING: ${field} promises ${rel}, which this package does not contain`)
      failed++
    }
  }
}

for (const [name, src] of Object.entries(MARKS)) {
  const svg = readFileSync(join(logoRoot, src), 'utf8')
  const bad = refuse(name, svg)
  if (bad) { console.error(`REFUSED: ${bad}`); failed++; continue }

  const dest = join(out, name)
  if (check) {
    let have = ''
    try { have = readFileSync(dest, 'utf8') } catch { have = '' }
    if (have !== svg) {
      console.error(`STALE: assets/logo/${name} differs from @luxfi/logo — run \`pnpm assets\``)
      failed++
    }
  } else {
    writeFileSync(dest, svg)
    console.log(`  ${name} <- @luxfi/logo/${src}`)
  }
}
if (failed) process.exit(1)
console.log(check ? '>> marks match @luxfi/logo' : '>> marks copied from @luxfi/logo')
