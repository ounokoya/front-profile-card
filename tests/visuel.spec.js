import { test, expect } from '@playwright/test'
import { open, title, diffRatio } from './helpers.js'

// Spec §7 — S16 et S17 : seuils calibrés en Phase 3 (specs/visuel/penpot/maquette.md, G3-2)

const screens = [
  { id: 'S16', ref: 'desktop.jpg', w: 1440, h: 720, max: 0.05 },
  { id: 'S17', ref: 'mobile.jpg', w: 375, h: 667, max: 0.05 },
]

for (const { id, ref, w, h, max } of screens) {
  test(`${id} — ${ref} (≤ ${(max * 100).toFixed(1)} %)`, async ({ page }, testInfo) => {
    await open(page, w, h)
    await expect(title(page)).toBeVisible()
    await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))
    await page.mouse.move(0, 0) // aucun survol pendant la capture

    const shot = await page.screenshot({ caret: 'hide', animations: 'disabled' })
    await testInfo.attach(ref.replace('.jpg', '.png'), { body: shot, contentType: 'image/png' })
    const ratio = diffRatio(shot, ref)
    testInfo.annotations.push({ type: 'pixels différents', description: `${(ratio * 100).toFixed(2)} %` })
    expect(ratio).toBeLessThanOrEqual(max)
  })
}
