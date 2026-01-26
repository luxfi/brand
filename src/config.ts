/**
 * Main brand configuration for Lux AI
 */

export const brandConfig = {
  // Company Information
  company: {
    name: 'Lux',
    legalName: 'Lux Finance',
    tagline: 'Building the future of decentralized finance',
    description: 'Enterprise-grade DeFi infrastructure and blockchain solutions for institutional adoption.',
    founded: 2021,
    headquarters: 'Zug, Switzerland',
  },

  // Brand Values
  values: [
    'Innovation',
    'Reliability', 
    'Transparency',
    'Performance',
    'Accessibility'
  ],

  // Contact Information
  contact: {
    email: 'hello@lux.ai',
    support: 'support@lux.ai',
    sales: 'sales@lux.ai',
    press: 'press@lux.ai',
  },

  // Social Media
  social: {
    twitter: 'https://twitter.com/luxai',
    github: 'https://github.com/luxai',
    linkedin: 'https://linkedin.com/company/luxai',
    discord: 'https://discord.gg/lux',
    youtube: 'https://youtube.com/@luxai',
  },

  // Domains
  domains: {
    main: 'https://lux.finance',
    docs: 'https://docs.lux.finance',
    api: 'https://api.lux.finance',
    app: 'https://app.lux.finance',
    brand: 'https://brand.lux.finance',
    ui: 'https://ui.lux.finance',
    status: 'https://status.lux.finance',
  },

  // Legal
  legal: {
    privacy: 'https://lux.ai/privacy',
    terms: 'https://lux.ai/terms',
    cookies: 'https://lux.ai/cookies',
    security: 'https://lux.ai/security',
  },

  // SEO Defaults
  seo: {
    title: 'Lux AI - Enterprise AI Infrastructure',
    description: 'Build, deploy, and scale AI applications with Lux\'s enterprise-grade infrastructure and tools.',
    keywords: [
      'AI infrastructure',
      'machine learning',
      'artificial intelligence',
      'LLM',
      'enterprise AI',
      'AI platform',
      'ML ops',
      'AI deployment',
    ],
    image: 'https://lux.ai/og-image.png',
    twitterCard: 'summary_large_image',
    twitterCreator: '@luxai',
  },
} as const

export type BrandConfig = typeof brandConfig