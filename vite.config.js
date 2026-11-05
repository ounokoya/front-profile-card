import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi par GitHub Pages sous /front-profile-card/
export default defineConfig({ base: '/front-profile-card/', plugins: [tailwindcss()] })
