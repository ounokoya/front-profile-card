import { test, expect } from '@playwright/test'
import { open, card, photo, title, style, cssColor } from './helpers.js'

// Spec §2, §3 et §6 — S6 à S9

const NAVY = 'hsl(229, 23%, 23%)'
const GRAY = 'hsl(227, 10%, 46%)'
const STATS = [['Followers', '80K'], ['Likes', '803K'], ['Photos', '1.4K']]

test('S6 — nom, âge hors du titre, ville, statistiques libellé puis chiffre ; photo décorative mais chargée', async ({ page }) => {
  await open(page, 1440, 720)
  await expect(title(page)).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(card(page).getByText('26', { exact: true })).toBeVisible()
  await expect(card(page).getByText('London', { exact: true })).toBeVisible()
  const terms = card(page).getByRole('term'), defs = card(page).getByRole('definition')
  await expect(terms).toHaveText(STATS.map(([t]) => t))
  await expect(defs).toHaveText(STATS.map(([, d]) => d))
  for (let i = 0; i < STATS.length; i++) {
    // ordre de lecture : le libellé avant son chiffre ; à l'écran, le chiffre au-dessus
    const order = await terms.nth(i).evaluate((t, d) => !!(t.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING), await defs.nth(i).elementHandle())
    expect(order, `${STATS[i][0]} avant ${STATS[i][1]}`).toBe(true)
    expect((await defs.nth(i).boundingBox()).y, `${STATS[i][1]} au-dessus`).toBeLessThan((await terms.nth(i).boundingBox()).y)
  }
  await expect(card(page).getByRole('img')).toHaveCount(0)
  expect(await photo(page).evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
})

test('S7 — tailles : nom, âge et chiffres 18 px, ville 14 px, libellés 10 px espacés de 1,5 px', async ({ page }) => {
  await open(page, 1440, 720)
  expect(await style(title(page), 'fontSize')).toBe('18px')
  expect(await style(card(page).getByText('26', { exact: true }), 'fontSize')).toBe('18px')
  expect(await style(card(page).getByText('London', { exact: true }), 'fontSize')).toBe('14px')
  for (const [t, d] of STATS) {
    expect(await style(card(page).getByRole('definition').filter({ hasText: d }), 'fontSize'), d).toBe('18px')
    const term = card(page).getByRole('term').filter({ hasText: t })
    expect(await style(term, 'fontSize'), t).toBe('10px')
    expect(await style(term, 'letterSpacing'), t).toBe('1.5px')
  }
})

test('S8 — couleurs : nom et chiffres Navy 950 ; âge, ville et libellés Gray 500', async ({ page }) => {
  await open(page, 1440, 720)
  const navy = await cssColor(page, NAVY), gray = await cssColor(page, GRAY)
  expect(await style(title(page), 'color'), 'nom').toBe(navy)
  expect(await style(card(page).getByText('26', { exact: true }), 'color'), 'âge').toBe(gray)
  expect(await style(card(page).getByText('London', { exact: true }), 'color'), 'ville').toBe(gray)
  for (const [t, d] of STATS) {
    expect(await style(card(page).getByRole('definition').filter({ hasText: d }), 'color'), d).toBe(navy)
    expect(await style(card(page).getByRole('term').filter({ hasText: t }), 'color'), t).toBe(gray)
  }
})

for (const colorScheme of ['light', 'dark']) {
  test(`S9 — appareil en thème ${colorScheme === 'light' ? 'clair' : 'sombre'} : le fond de la page reste Blue 600 (A6)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await open(page, 375, 667)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(await cssColor(page, 'hsl(185, 75%, 39%)'))
  })
}
