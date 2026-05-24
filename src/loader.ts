import type { BrandConfig, RuntimeConfig } from './brand-types'

/**
 * Mutable brand singleton — populated by loadBrand() from /brand.json.
 * Import this in your app to read brand values after loading.
 *
 * Usage (in any Lux app — exchange, bridge, explorer, wallet, pay):
 *   import { brand, loadBrand } from '@luxfi/brand/loader'
 *   await loadBrand()
 *   console.log(brand.name) // "Lux Exchange"
 */
export const brand: BrandConfig = {
  name: '',
  title: '',
  description: '',
  shortName: '',
  labsName: '',
  legalEntity: '',
  walletName: '',
  protocolName: '',
  copyrightHolder: '',
  appDomain: '',
  appSubdomain: '',
  docsDomain: '',
  infoDomain: '',
  gatewayDomain: '',
  wsDomain: '',
  helpUrl: '',
  termsUrl: '',
  privacyUrl: '',
  downloadUrl: '',
  complianceEmail: '',
  supportEmail: '',
  twitter: '',
  farcaster: '',
  linkedin: '',
  tiktok: '',
  github: '',
  discord: '',
  logoUrl: '',
  faviconUrl: '/favicon.ico',
  primaryColor: '#FFFFFF',
  defaultChainId: 1,
  supportedChainIds: [],
  walletConnectProjectId: '',
  insightsHost: '',
  insightsApiKey: '',
}

export let runtimeConfig: RuntimeConfig | null = null

/** Named brand sources shipped in this package. */
export type NamedBrandSource = 'brand' | 'bridge' | 'financial'

/** Options for resolveBrand / loadBrand. */
export interface LoadBrandOptions {
  /** Pick a shipped brand JSON by name, or a fetch-able URL/path. */
  source?: NamedBrandSource | string
  /** Absolute path to a tenant brand JSON on disk (Node only). */
  overridePath?: string
  /** Already-parsed tenant config — highest precedence after the literal object. */
  overrideJson?: RuntimeConfig
}

/**
 * Resolution order for resolveBrand / loadBrand — highest precedence first.
 * This is the **only** place precedence is defined; both Node and browser
 * paths route through resolveBrand for consistency.
 *
 *   1. opts.overrideJson       — inline parsed RuntimeConfig
 *   2. opts.overridePath       — JSON file on disk (Node)
 *   3. env LUX_BRAND_INLINE    — inline JSON string (or base64 prefixed "base64:")
 *   4. env LUX_BRAND_OVERRIDE  — path to JSON file on disk (Node)
 *   5. opts.source             — named bundled brand ('brand'|'bridge'|'financial')
 *                                or a fetch-able URL/relative path
 *   6. default                 — bundled brand.json (Lux Exchange)
 *
 * Tenants white-labelling Lux Pay supply (2) or (3) at build time.
 * Multi-tenant deployments select per-hostname at request time by passing
 * (1) or (5) to resolveBrand at render time.
 */
export async function resolveBrand(opts: LoadBrandOptions = {}): Promise<RuntimeConfig> {
  if (opts.overrideJson) return validate(opts.overrideJson)

  if (opts.overridePath) return validate(await readJsonFile(opts.overridePath))

  const envInline = readEnv('LUX_BRAND_INLINE')
  if (envInline) {
    const raw = envInline.startsWith('base64:')
      ? Buffer.from(envInline.slice(7), 'base64').toString('utf8')
      : envInline
    return validate(JSON.parse(raw) as RuntimeConfig)
  }

  const envPath = readEnv('LUX_BRAND_OVERRIDE')
  if (envPath) return validate(await readJsonFile(envPath))

  const source = opts.source ?? 'brand'
  if (source === 'brand' || source === 'bridge' || source === 'financial') {
    return validate(await loadBundled(source))
  }

  // Treat as URL/relative path for fetch.
  return validate(await fetchJson(source))
}

/**
 * Load brand config, populate the `brand` singleton, and apply DOM side-effects
 * (document.title, favicon, CSS variables). Browser entry point.
 */
export async function loadBrand(opts: LoadBrandOptions = {}): Promise<RuntimeConfig> {
  const config = await resolveBrand(opts).catch(async (err) => {
    // Backwards-compatible fallback: original behaviour fetched /brand.json.
    if (!opts.source && !opts.overrideJson && !opts.overridePath &&
        !readEnv('LUX_BRAND_INLINE') && !readEnv('LUX_BRAND_OVERRIDE')) {
      return validate(await fetchJson('/brand.json'))
    }
    throw err
  })

  applyConfig(config)
  applyDomSideEffects(config)
  runtimeConfig = config
  return config
}

/** Apply a resolved config to the brand singleton (no DOM writes). */
export function applyConfig(config: RuntimeConfig): void {
  if (config.brand) Object.assign(brand, config.brand)

  const baseName = brand.name.replace(/\s*exchange\s*|\s*bridge\s*|\s*explorer\s*|\s*wallet\s*|\s*pay\s*/i, '').trim()
  if (!brand.shortName && baseName) {
    brand.shortName = baseName.length <= 3 ? baseName.toUpperCase() : baseName
  }
  if (!brand.labsName && baseName) brand.labsName = baseName + ' Labs'
  if (!brand.walletName && baseName) brand.walletName = brand.shortName + ' Wallet'
  if (!brand.protocolName && baseName) brand.protocolName = brand.shortName + ' Protocol'
  if (!brand.copyrightHolder) brand.copyrightHolder = brand.legalEntity

  if (config.chains) {
    brand.defaultChainId = config.chains.defaultChainId ?? brand.defaultChainId
    brand.supportedChainIds = config.chains.supported ?? brand.supportedChainIds
  }

  if (config.walletConnect?.projectId) brand.walletConnectProjectId = config.walletConnect.projectId
  if (config.api?.insights) brand.insightsHost = config.api.insights
}

function applyDomSideEffects(config: RuntimeConfig): void {
  if (typeof document === 'undefined') return

  if (config.brand?.title) document.title = config.brand.title
  if (config.brand?.faviconUrl) {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null
    if (link) link.href = config.brand.faviconUrl
  }

  if (!brand.theme) return
  const prefersDark = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const bt = prefersDark ? brand.theme.dark : brand.theme.light
  if (!bt) return
  const root = document.documentElement
  const set = (prop: string, val?: string) => { if (val) root.style.setProperty(prop, val) }
  set('--accent1', bt.accent1)
  set('--accent1Hovered', bt.accent1Hovered)
  set('--accent2', bt.accent2)
  set('--accent3', bt.accent3)
  set('--surface1', bt.surface1)
  set('--surface2', bt.surface2)
  set('--surface3', bt.surface3)
  set('--neutral1', bt.neutral1)
  set('--neutral2', bt.neutral2)
  set('--neutral3', bt.neutral3)
  if (bt.background || bt.surface1) {
    root.style.setProperty('background', bt.background || bt.surface1 || '')
  }
}

/** Validate a parsed tenant config. Fails loud on missing required fields. */
export function validate(config: RuntimeConfig): RuntimeConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('[@luxfi/brand] tenant config must be an object')
  }
  if (!config.brand || typeof config.brand !== 'object') {
    throw new Error('[@luxfi/brand] tenant config missing required "brand" object')
  }
  const required: (keyof BrandConfig)[] = ['name', 'appDomain', 'supportEmail']
  for (const k of required) {
    const v = config.brand[k]
    if (typeof v !== 'string' || v.length === 0) {
      throw new Error(`[@luxfi/brand] tenant config missing required brand.${String(k)}`)
    }
  }
  return config
}

// --- internals ---------------------------------------------------------------

function readEnv(name: string): string | undefined {
  if (typeof process === 'undefined' || !process.env) return undefined
  const v = process.env[name]
  return v && v.length > 0 ? v : undefined
}

async function readJsonFile(path: string): Promise<RuntimeConfig> {
  // Dynamic import so the bundler does not pull node:fs into browser builds.
  const fs = await import('node:fs/promises')
  const raw = await fs.readFile(path, 'utf8')
  return JSON.parse(raw) as RuntimeConfig
}

async function loadBundled(source: NamedBrandSource): Promise<RuntimeConfig> {
  // In Node, read from disk relative to the package root; in the browser,
  // fetch from /<source>.json (consumer is expected to publish it).
  if (typeof window === 'undefined') {
    const path = await import('node:path')
    const url = await import('node:url')
    // dist/loader.{js,mjs} → package root is one dir up.
    const here = url.fileURLToPath(new URL('.', import.meta.url))
    const root = path.resolve(here, '..')
    return readJsonFile(path.join(root, `${source}.json`))
  }
  return fetchJson(`/${source}.json`)
}

async function fetchJson(url: string): Promise<RuntimeConfig> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`[@luxfi/brand] failed to load ${url}: ${res.status}`)
  return (await res.json()) as RuntimeConfig
}

// URL helpers
export function getBrandUrl(path: string): string { return `https://${brand.appDomain}${path}` }
export function getAppUrl(path: string): string { return `https://${brand.appSubdomain || brand.appDomain}${path}` }
export function getDocsUrl(path: string): string { return `https://${brand.docsDomain}${path}` }
export function getGatewayUrl(path: string): string { return `https://${brand.gatewayDomain}${path}` }
export function getWsUrl(path: string): string { return `wss://${brand.wsDomain}${path}` }
export function getRpcUrl(chainId: number): string | undefined { return runtimeConfig?.rpc?.[String(chainId)] }
