import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config.js' // ✅ Import Tailwind config

export default defineConfig({
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Prevent Tailwind from overriding styles
  },
  experimental: {
    optimizeUniversalDefaults: true, // ✅ Ensures compatibility
    disableColorFunctions: true, // ✅ Disable oklch() colors
  },
  plugins: [
    tailwindcss(tailwindConfig), // ✅ Ensure Tailwind config is applied
  ],
})