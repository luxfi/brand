/**
 * Documentation theme configuration for Fumadocs
 * Pure black/white minimalist theme for Lux Network
 */

import { colors } from './colors'

/**
 * Fumadocs-compatible CSS variables
 */
export interface DocsThemeVariables {
  // Core colors
  '--color-fd-background': string
  '--color-fd-foreground': string
  '--color-fd-muted': string
  '--color-fd-muted-foreground': string
  '--color-fd-popover': string
  '--color-fd-popover-foreground': string
  '--color-fd-card': string
  '--color-fd-card-foreground': string
  '--color-fd-border': string
  '--color-fd-primary': string
  '--color-fd-primary-foreground': string
  '--color-fd-secondary': string
  '--color-fd-secondary-foreground': string
  '--color-fd-accent': string
  '--color-fd-accent-foreground': string
  '--color-fd-ring': string
}

/**
 * Documentation theme configuration
 */
export interface DocsTheme {
  name: string
  description: string
  light: DocsThemeVariables
  dark: DocsThemeVariables
  css: string
}

/**
 * Light mode variables - Pure white
 */
export const lightDocsVariables: DocsThemeVariables = {
  '--color-fd-background': 'hsl(0, 0%, 100%)',
  '--color-fd-foreground': 'hsl(0, 0%, 10%)',
  '--color-fd-muted': 'hsl(0, 0%, 96%)',
  '--color-fd-muted-foreground': 'hsl(0, 0%, 50%)',
  '--color-fd-popover': 'hsl(0, 0%, 100%)',
  '--color-fd-popover-foreground': 'hsl(0, 0%, 10%)',
  '--color-fd-card': 'hsl(0, 0%, 100%)',
  '--color-fd-card-foreground': 'hsl(0, 0%, 10%)',
  '--color-fd-border': 'hsl(0, 0%, 90%)',
  '--color-fd-primary': 'hsl(0, 0%, 10%)',
  '--color-fd-primary-foreground': 'hsl(0, 0%, 100%)',
  '--color-fd-secondary': 'hsl(0, 0%, 96%)',
  '--color-fd-secondary-foreground': 'hsl(0, 0%, 10%)',
  '--color-fd-accent': 'hsl(0, 0%, 96%)',
  '--color-fd-accent-foreground': 'hsl(0, 0%, 10%)',
  '--color-fd-ring': 'hsl(0, 0%, 50%)',
}

/**
 * Dark mode variables - Pure black
 */
export const darkDocsVariables: DocsThemeVariables = {
  '--color-fd-background': 'hsl(0, 0%, 0%)',
  '--color-fd-foreground': 'hsl(0, 0%, 98%)',
  '--color-fd-muted': 'hsl(0, 0%, 6%)',
  '--color-fd-muted-foreground': 'hsl(0, 0%, 60%)',
  '--color-fd-popover': 'hsl(0, 0%, 4%)',
  '--color-fd-popover-foreground': 'hsl(0, 0%, 98%)',
  '--color-fd-card': 'hsl(0, 0%, 4%)',
  '--color-fd-card-foreground': 'hsl(0, 0%, 98%)',
  '--color-fd-border': 'hsl(0, 0%, 14%)',
  '--color-fd-primary': 'hsl(0, 0%, 98%)',
  '--color-fd-primary-foreground': 'hsl(0, 0%, 4%)',
  '--color-fd-secondary': 'hsl(0, 0%, 10%)',
  '--color-fd-secondary-foreground': 'hsl(0, 0%, 98%)',
  '--color-fd-accent': 'hsl(0, 0%, 12%)',
  '--color-fd-accent-foreground': 'hsl(0, 0%, 100%)',
  '--color-fd-ring': 'hsl(0, 0%, 30%)',
}

/**
 * Generate CSS string from variables
 */
function generateCSS(light: DocsThemeVariables, dark: DocsThemeVariables): string {
  const lightVars = Object.entries(light)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  const darkVars = Object.entries(dark)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return `/* Lux Network Documentation Theme - Pure Black/White */
:root {
${lightVars}

  /* Brand colors */
  --color-brand: hsl(0, 0%, 10%);
  --color-brand-foreground: white;
  --color-brand-secondary: hsl(0, 0%, 96%);
  --color-brand-accent: hsl(0, 0%, 96%);

  /* Layout */
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(0, 0%, 10%);
  --muted: hsl(0, 0%, 96%);
  --muted-foreground: hsl(0, 0%, 50%);
  --border: hsl(0, 0%, 90%);
  --sidebar: hsl(0, 0%, 98%);
}

.dark {
${darkVars}

  /* Brand colors */
  --color-brand: hsl(0, 0%, 98%);
  --color-brand-foreground: hsl(0, 0%, 6%);
  --color-brand-secondary: hsl(0, 0%, 12%);
  --color-brand-accent: hsl(0, 0%, 12%);

  /* Layout */
  --background: hsl(0, 0%, 0%);
  --foreground: hsl(0, 0%, 98%);
  --muted: hsl(0, 0%, 6%);
  --muted-foreground: hsl(0, 0%, 60%);
  --border: hsl(0, 0%, 14%);
  --sidebar: hsl(0, 0%, 0%);
}
`
}

/**
 * Lux Documentation Theme
 * Pure black/white minimalist design
 */
export const luxDocsTheme: DocsTheme = {
  name: 'lux',
  description: 'Pure black/white minimalist theme for Lux Network documentation',
  light: lightDocsVariables,
  dark: darkDocsVariables,
  css: generateCSS(lightDocsVariables, darkDocsVariables),
}

/**
 * Get CSS variables as a style object (for inline styles)
 */
export function getDocsStyleObject(mode: 'light' | 'dark' = 'light'): Record<string, string> {
  return mode === 'dark' ? darkDocsVariables : lightDocsVariables
}

/**
 * Apply docs theme to document
 */
export function applyDocsTheme(mode: 'light' | 'dark' = 'light') {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  const variables = mode === 'dark' ? darkDocsVariables : lightDocsVariables

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export default luxDocsTheme
