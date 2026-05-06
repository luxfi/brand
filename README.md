# @luxfi/brand

Brand assets, design tokens, and runtime config for Lux.

## Install

```bash
pnpm add @luxfi/brand
```

## Usage

```ts
import { brand, colors, typography, logos, applyTheme } from '@luxfi/brand'

// Runtime brand config (from brand.json)
brand.brand.name        // "Lux Exchange"
brand.brand.shortName   // "LUX"
brand.brand.appDomain   // "lux.exchange"

// Design tokens
colors.primary          // "#000000"
typography.fontFamily   // "Geist, Geist Sans, sans-serif"

// Apply theme to document
applyTheme('dark')
```

## Brand Config (`brand.json`)

Single source of truth for all brand strings, URLs, and metadata. Loaded at runtime by all Lux apps. White-label products override with their own brand package.

## White-Label

The platform uses ▼ as the universal default mark. When no brand is configured, apps show "▼ Exchange", "▼ Wallet", etc. Brand packages provide the override:

| Org | Package | Name |
|-----|---------|------|
| Lux | `@luxfi/brand` | Lux Exchange |
| Zoo | `@zooai/brand` | Zoo Exchange |
| Hanzo | `@hanzoai/brand` | Hanzo |

White-label users of the OSS Lux brand system bring their own brand package; the Lux repo lists only Lux ecosystem brands.

## Font

**Geist Sans** (body) + **Geist Mono** (code). Loaded from Google Fonts or self-hosted in `fonts/`.

## Logo

The ▼ triangle mark is in `@luxfi/logo`. This package re-exports it via `logos`.

## License

All rights reserved.
