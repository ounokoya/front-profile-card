import { defineConfig, devices } from '@playwright/test'

// Tests dérivés de la spec — ADR-0002 commun
// BASE_URL=https://ounokoya.github.io/front-profile-card/ npm test : vérifie le site en ligne
const LOCAL = 'http://localhost:4211/front-profile-card/'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || LOCAL,
    ...devices['Desktop Chrome'],
    // lissage du texte en gris, comme les images FM et les rendus de la maquette (calibrage de la Phase 3) :
    // le lissage LCD de Chromium sous Linux ajoute des franges colorées comptées comme des écarts
    launchOptions: { args: ['--disable-lcd-text'] },
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4211 --strictPort',
    url: LOCAL,
    reuseExistingServer: !process.env.CI,
  },
})
