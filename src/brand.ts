import type { RuntimeConfig } from './brand-types'
// @ts-expect-error -- JSON import, typed below
import brandJson from '../brand.json'

/** The full brand runtime config for Lux Exchange. */
export const brand: RuntimeConfig = brandJson
export default brand
