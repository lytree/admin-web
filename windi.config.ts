
import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  preflight: false,
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  attributify: true,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-color-hover)',
        'primary-pressed': 'var(--primary-color-pressed)',
        'primary-active': 'var(--primary-color-active)',
        info: 'var(--info-color)',
        'info-hover': 'var(--info-color-hover)',
        'info-pressed': 'var(--info-color-pressed)',
        'info-active': 'var(--info-color-active)',
        success: 'var(--success-color)',
        'success-hover': 'var(--success-color-hover)',
        'success-pressed': 'var(--success-color-pressed)',
        'success-active': 'var(--success-color-active)',
        warning: 'var(--warning-color)',
        'warning-hover': 'var(--warning-color-hover)',
        'warning-pressed': 'var(--warning-color-pressed)',
        'warning-active': 'var(--warning-color-active)',
        error: 'var(--error-color)',
        'error-hover': 'var(--error-color-hover)',
        'error-pressed': 'var(--error-color-pressed)',
        'error-active': 'var(--error-color-active)',
        light: '#ffffff',
        dark: '#18181c',
        'deep-dark': '#101014'
      }
    },
    transitionProperty: [
      'width',
      'height',
      'background',
      'background-color',
      'border-color',
      'right',
      'fill'
    ]
  },
  plugins: [require('@tailwindcss/typography')]
})