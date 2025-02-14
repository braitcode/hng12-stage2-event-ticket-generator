import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tailwindConfig from './tailwind.config.js' // ✅ Import Tailwind config

export default defineConfig({
  plugins: [
    tailwindcss(tailwindConfig), // ✅ Ensure Tailwind config is applied
  ],
})