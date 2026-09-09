// The marks live in @luxfi/logo. This package POINTS at them and carries no copy.
//
// It used to carry one, and that copy was a placeholder for months — a black
// square with the letter L set in a system font. It RENDERED, which is what made
// it invisible: every check asked whether the asset loads, and it did. A synced
// copy with a drift check would have caught that particular failure and left the
// real problem in place, which is that a mark had two homes.
//
// So there is one home. What is checkable here is that the pointer is honest:
//
//   1. every *Url pointing into @luxfi/logo names the version this package
//      DEPENDS on — one fact, not two that must be remembered together
//   2. no *Url floats on @latest, which jsDelivr resolves once and caches for a
//      week, so what a brand renders is decided by a cache nobody controls
//   3. every named asset actually exists in the installed package
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, dirname } from 'node:path'

const require = createRequire(import.meta.url)
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
const brand = JSON.parse(readFileSync(join(process.cwd(), 'brand.json'), 'utf8')).brand
const want = pkg.dependencies?.['@luxfi/logo']
// exports maps hide package.json; resolve the entry and walk up.
const logoRoot = join(dirname(require.resolve('@luxfi/logo')), '..')

let failed = 0
const urls = Object.entries(brand).filter(([k, v]) => /Url$/.test(k) && typeof v === 'string')

for (const [field, url] of urls) {
  if (/@latest\//.test(url)) {
    console.error(`FLOATING: ${field} pins @latest — jsDelivr caches that alias for a week`)
    failed++
  }
  const m = url.match(/\/npm\/@luxfi\/logo@([^/]+)\/(.+)$/)
  if (!m) continue
  const [, version, rel] = m
  if (version !== want) {
    console.error(`DRIFT: ${field} names @luxfi/logo@${version}, package.json depends on ${want}`)
    failed++
  }
  try { readFileSync(join(logoRoot, rel)) } catch {
    console.error(`MISSING: ${field} names ${rel}, which @luxfi/logo@${want} does not contain`)
    failed++
  }
}
if (failed) process.exit(1)
console.log(`>> ${urls.length} url(s) pinned to @luxfi/logo@${want}, every asset present`)
