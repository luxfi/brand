/**
 * Per-field exports of the brand runtime config (brand.json).
 *
 * Issue: luxfi/bridge#389 — `@luxfi/brand` ships a single `brand` object and a
 * raw `brand.json`. Vite/Rolldown cannot tree-shake JSON literal imports —
 * `import luxBrandJson from '@luxfi/brand/brand.json'` pulls the whole JSON
 * even when only `shortName`, `primaryColor`, `supportEmail` are consumed
 * (~3KB of dead weight per tenant build).
 *
 * Fix: re-export each top-level brand field as a named `const` so consumers
 * can `import { shortName, primaryColor } from '@luxfi/brand'` and the bundler
 * drops everything they don't reference.
 *
 * The values are the same `brand.json` literals — no new branding decisions
 * are made here. This file is hand-maintained against the JSON; if the schema
 * gains a new field, add a matching named export here.
 *
 * NOTE: This module is additive. The existing `brand` object export (from
 * `./brand`) and the `@luxfi/brand/brand.json` subpath both continue to work
 * unchanged for non-Vite consumers (Go, Rust, raw JSON loaders).
 */

import brandJson from '../brand.json'
import type { BrandTheme } from './brand-types'

const _brand = brandJson.brand
const _chains = brandJson.chains
const _rpc = brandJson.rpc
const _api = brandJson.api
const _iam = brandJson.iam
const _walletConnect = brandJson.walletConnect

// ─── brand identity ────────────────────────────────────────────────────────
export const name: string = _brand.name
export const title: string = _brand.title
export const description: string = _brand.description
export const shortName: string = _brand.shortName
export const labsName: string = _brand.labsName
export const legalEntity: string = _brand.legalEntity
export const walletName: string = _brand.walletName
export const protocolName: string = _brand.protocolName
export const copyrightHolder: string = _brand.copyrightHolder

// ─── domains ───────────────────────────────────────────────────────────────
export const appDomain: string = _brand.appDomain
export const docsDomain: string = _brand.docsDomain
export const infoDomain: string = _brand.infoDomain
export const gatewayDomain: string = _brand.gatewayDomain
export const wsDomain: string = _brand.wsDomain

// ─── links ─────────────────────────────────────────────────────────────────
export const helpUrl: string = _brand.helpUrl
export const termsUrl: string = _brand.termsUrl
export const privacyUrl: string = _brand.privacyUrl
export const downloadUrl: string = _brand.downloadUrl

// ─── contact ───────────────────────────────────────────────────────────────
export const complianceEmail: string = _brand.complianceEmail
export const supportEmail: string = _brand.supportEmail

// ─── social ────────────────────────────────────────────────────────────────
export const twitter: string = _brand.twitter
export const farcaster: string = _brand.farcaster
export const linkedin: string = _brand.linkedin
export const tiktok: string = _brand.tiktok
export const github: string = _brand.github
export const discord: string = _brand.discord

// ─── assets ────────────────────────────────────────────────────────────────
export const logoUrl: string = _brand.logoUrl
export const faviconUrl: string = _brand.faviconUrl
export const primaryColor: string = _brand.primaryColor

// ─── theme (per-scheme brand overrides from brand.json) ────────────────────
// NOTE: `lightTheme` / `darkTheme` are already exported from `./themes` as
// full Theme objects; these are the *brand-override* fragments from
// brand.json.theme. Named distinctly to avoid collision.
export const brandLightTheme: BrandTheme = _brand.theme.light as BrandTheme
export const brandDarkTheme: BrandTheme = _brand.theme.dark as BrandTheme

// ─── chains ────────────────────────────────────────────────────────────────
export const defaultChainId: number = _chains.defaultChainId
export const supportedChainIds: readonly number[] = _chains.supported

// ─── rpc / api ─────────────────────────────────────────────────────────────
export const rpcEndpoints: Readonly<Record<string, string>> = _rpc
export const graphqlEndpoint: string = _api.graphql
export const gatewayEndpoint: string = _api.gateway
export const insightsEndpoint: string = _api.insights

// ─── iam ───────────────────────────────────────────────────────────────────
export const iamProvider: string | undefined = _iam?.provider
export const iamClientId: string | undefined = _iam?.clientId

// ─── walletconnect ─────────────────────────────────────────────────────────
export const walletConnectProjectId: string = _walletConnect.projectId
