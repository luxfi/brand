import type { RuntimeConfig } from './brand-types'
import brandJson from '../brand.json'

/** The full brand runtime config for Lux Exchange. */
export const brand = brandJson as unknown as RuntimeConfig
export default brand
