/** @type {import('tailwindcss').Config} */
// A calm, high-contrast theme built for reading. Colours live in app/globals.css.
module.exports = {
  // dark: utilities follow the header switch, which sets data-theme="dark" on <html>.
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Every colour is a CSS variable (an RGB triplet) set in globals.css for light and dark.
      colors: {
        'background': 'rgb(var(--c-background) / <alpha-value>)',
        'surface': 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--c-surface-container-lowest) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--c-surface-container-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--c-surface-container) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--c-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--c-surface-container-highest) / <alpha-value>)',
        'surface-bright': 'rgb(var(--c-surface-bright) / <alpha-value>)',
        'on-surface': 'rgb(var(--c-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--c-on-surface-variant) / <alpha-value>)',
        'outline': 'rgb(var(--c-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--c-outline-variant) / <alpha-value>)',
        'primary': 'rgb(var(--c-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--c-primary-container) / <alpha-value>)',
        'primary-fixed': 'rgb(var(--c-primary-fixed) / <alpha-value>)',
        'on-primary': 'rgb(var(--c-on-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--c-secondary) / <alpha-value>)',
        'tertiary': 'rgb(var(--c-tertiary) / <alpha-value>)',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.375rem',
        xl: '0.625rem',
        full: '0.75rem',
        pill: '9999px',
      },
      fontFamily: {
        display: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        // System monospace: it only sets a commit hash, file paths and one npx command.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      // Body text is 17px with roomy line height; headings are sans and semibold.
      fontSize: {
        'display-hero': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-hero-mobile': ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['2.125rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '650' }],
        'headline-lg-mobile': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '650' }],
        'headline-md': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'headline-sm': ['1.1875rem', { lineHeight: '1.35', letterSpacing: '0em', fontWeight: '600' }],
        'body-xl': ['1.25rem', { lineHeight: '1.65', letterSpacing: '0em', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0em', fontWeight: '400' }],
        'body-md': ['1.0625rem', { lineHeight: '1.7', letterSpacing: '0em', fontWeight: '400' }],
        'body-sm': ['1rem', { lineHeight: '1.65', letterSpacing: '0em', fontWeight: '400' }],
        'label-lg': ['0.9375rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: '600' }],
        'label-md': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: '600' }],
        'label-sm': ['0.8125rem', { lineHeight: '1.35', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        'margin-sm': '1.25rem',
        margin: '2rem',
        'margin-lg': '4rem',
      },
    },
  },
  plugins: [],
};
