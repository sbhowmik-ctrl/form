import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.6)',
        primary: '#2563eb',
        accent: '#3b82f6',
      },
    },
  },
  plugins: [
    forms,
    typography,
    containerQueries,
  ],
}