import { test, expect } from '@playwright/test'
import { open, card, photo, title, footer, box, near, textBox } from './helpers.js'

// Spec §4 — S1 à S5 (positions de la maquette Penpot, à 1 px près)

test('S1 — 1440 × 720 : carte et photo de la maquette', async ({ page }) => {
  await open(page, 1440, 720)
  near(await box(card(page)), { x: 545, y: 173, width: 350, height: 374 }, 'carte')
  near(await box(photo(page)), { x: 667, y: 260, width: 106, height: 106 }, 'photo')
})

test('S2 — 375 × 667 : carte mobile à 24 px des bords', async ({ page }) => {
  await open(page, 375, 667)
  near(await box(card(page)), { x: 24, y: 147, width: 327, height: 374 }, 'carte')
  near(await box(photo(page)), { x: 135, y: 234, width: 106, height: 106 }, 'photo')
})

test('S3 — 768 × 1024 : carte de 350 px centrée (Q-B4) ; 360 px : carte à 24 px des bords', async ({ page }) => {
  await open(page, 768, 1024)
  near(await box(card(page)), { x: 209, y: 325, width: 350, height: 374 }, 'carte')
  await open(page, 360, 800)
  near(await box(card(page)), { x: 24, width: 312 }, 'carte à 360 px')
})

for (const width of [320, 375, 768, 1440]) {
  test(`S4 — ${width} px : pas de défilement horizontal`, async ({ page }) => {
    await open(page, width, 900)
    // présence d'abord : une page vide n'a jamais de défilement
    await expect(title(page)).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
  })
}

test('S5 — 1440 × 720 : pied de page centré sous la carte, dans la fenêtre', async ({ page }) => {
  await open(page, 1440, 720)
  const c = await box(card(page))
  // boîte sans arrondi (somme de deux demi-pixels)
  const f = await footer(page).boundingBox()
  const t = await textBox(footer(page))
  expect(f.y).toBeGreaterThanOrEqual(c.y + c.height)
  expect(f.y + f.height).toBeLessThanOrEqual(720)
  expect(Math.abs((t.left + t.right) / 2 - 720)).toBeLessThanOrEqual(1)
})
