import test from 'node:test'
import assert from 'node:assert'
import * as brand from '../dist/index.mjs'

test('@luxfi/brand exports required branding components and SVG strings', () => {
  // SVG strings
  assert.strictEqual(typeof brand.logo, 'string', 'brand.logo should be string')
  assert.strictEqual(typeof brand.wordmark, 'string', 'brand.wordmark should be string')
  assert.strictEqual(typeof brand.favicon, 'string', 'brand.favicon should be string')

  // Components / functions
  assert.strictEqual(typeof brand.Logo, 'function', 'brand.Logo should be component/function')
  assert.strictEqual(typeof brand.Wordmark, 'function', 'brand.Wordmark should be component/function')
  assert.strictEqual(typeof brand.Favicon, 'function', 'brand.Favicon should be component/function')
  assert.strictEqual(typeof brand.LuxWordmark, 'function', 'brand.LuxWordmark should be component/function')

  // Content checks
  assert.ok(brand.favicon.includes('<svg'), 'brand.favicon must be valid svg')
  assert.ok(brand.wordmark.includes('<svg'), 'brand.wordmark must be valid svg')
})
