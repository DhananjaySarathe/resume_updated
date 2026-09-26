/** @type {import('tailwindcss').Config} */
// Tokens mirror the Stitch "Luminescent Spatial Portfolio" design system.
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121317',
        surface: '#121317',
        'surface-container-lowest': '#0d0e12',
        'surface-container-low': '#1a1b1f',
        'surface-container': '#1e1f23',
        'surface-container-high': '#292a2e',
        'surface-container-highest': '#343538',
        'surface-bright': '#38393d',
        'on-surface': '#e3e2e7',
        'on-surface-variant': '#c7d2d6',
        outline: '#869397',
        'outline-variant': '#3d494c',
        primary: '#4cd7f6',
        'primary-container': '#06b6d4',
        'primary-fixed': '#acedff',
        'on-primary': '#003640',
        secondary: '#d0bcff',
        tertiary: '#ffb95f',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
        pill: '9999px',
      },
      fontFamily: {
        display: ['var(--font-bodoni)', 'serif'],
        sans: ['var(--font-hanken)', 'sans-serif'],
        // System monospace: it only sets a commit hash, file paths and one npx command.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-hero': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-hero-mobile': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'headline-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-md': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        'headline-sm': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: '500' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.55', letterSpacing: '0.005em', fontWeight: '400' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55', letterSpacing: '0.005em', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-md': ['0.8125rem', { lineHeight: '1.25', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      spacing: {
        'margin-sm': '1.25rem',
        margin: '2rem',
        'margin-lg': '4rem',
      },
      keyframes: {
        'pulse-slow': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
