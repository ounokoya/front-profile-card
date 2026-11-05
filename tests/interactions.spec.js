import { test, expect } from '@playwright/test'
import { open, link, style, cssColor } from './helpers.js'

// Spec §5 et §6 — S10 et S11

const NAVY_AA = 'hsl(229, 23%, 16%)'

test.beforeEach(async ({ page }) => {
  await open(page, 1440, 720)
})

test('S10 — Tab : les deux liens du pied de page, chacun avec un contour Navy AA de 2 px au moins', async ({ page }) => {
  const navy = await cssColor(page, NAVY_AA)
  const seen = []
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab')
    seen.push(await page.evaluate((c) => {
      const el = document.activeElement
      const s = getComputedStyle(el)
      return { name: el.textContent.trim(), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 && s.outlineColor === c }
    }, navy))
  }
  expect(seen.map((s) => s.name)).toEqual(['Frontend Mentor', 'Koya Esdras'])
  for (const s of seen) expect.soft(s.outline, `contour sur « ${s.name} »`).toBe(true)
})

test('S11 — pied de page : texte et liens Navy AA, liens soulignés, sans soulignement au survol ; bonnes adresses', async ({ page }) => {
  await expect(link(page, 'Frontend Mentor')).toHaveAttribute('href', 'https://www.frontendmentor.io?ref=challenge')
  await expect(link(page, 'Koya Esdras')).toHaveAttribute('href', 'https://www.frontendmentor.io/profile/ounokoya')
  const navy = await cssColor(page, NAVY_AA)
  expect(await style(page.getByRole('contentinfo'), 'color'), 'texte').toBe(navy)
  for (const name of ['Frontend Mentor', 'Koya Esdras']) {
    expect(await style(link(page, name), 'color'), name).toBe(navy)
    expect(await style(link(page, name), 'textDecorationLine'), name).toBe('underline')
    await link(page, name).hover()
    await expect.poll(() => style(link(page, name), 'textDecorationLine'), { message: `${name} survolé` }).toBe('none')
  }
})
