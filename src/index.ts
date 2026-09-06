/**
 * @luxfi/brand - Official brand assets and design system for Lux
 */

export * from './colors'
export * from './typography'
export * from './logos'
export {
  Logo,
  Wordmark,
  Favicon,
  logo,
  wordmark,
  favicon,
  lx,
  LuxLogo,
  LuxWordmark,
  LuxFavicon,
} from '@luxfi/logo'
export * from './tokens'
export * from './themes'
export * from './utils'
export * from './docs'

// Brand runtime config (brand.json) — single source of truth
export { brand } from './brand'
export type { BrandConfig, BrandTheme, RuntimeConfig } from './brand-types'
export {
  loadBrand,
  resolveBrand,
  applyConfig,
  validate as validateBrandConfig,
  getBrandUrl,
  getAppUrl,
  getDocsUrl,
  getGatewayUrl,
  getWsUrl,
  getRpcUrl,
} from './loader'
export type { LoadBrandOptions, NamedBrandSource } from './loader'

// Legacy brand config (company info, SEO, social)
export { brandConfig } from './config'

// Quick access exports
export { default as colors } from './colors'
export { default as typography } from './typography'
export { default as logos } from './logos'
export { default as tokens } from './tokens'

// Theme management
import { applyTheme } from './themes'
export { applyTheme }

// Default initialization
if (typeof window !== 'undefined') {
  // Auto-apply theme based on system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
}