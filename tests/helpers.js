import { readFileSync } from 'node:fs'
import { expect } from '@playwright/test'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

// Les tests ne s'appuient que sur la spec : noms accessibles (§6) et comportement (§5),
// jamais sur des classes ou une structure HTML précise.

export async function open(page, width, height) {
  await page.setViewportSize({ width, height })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
}

export const card = (page) => page.getByRole('article')
export const photo = (page) => card(page).locator('img[src*="image-victor"]')
export const title = (page) => page.getByRole('heading', { level: 1, name: 'Victor Crest', exact: true })
export const footer = (page) => page.getByRole('contentinfo')
export const link = (page, name) => footer(page).getByRole('link', { name })
export const box = async (locator) => {
  const b = await locator.boundingBox()
  return { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) }
}
// Position à 1 px près
export function near(actual, expected, label) {
  for (const [k, v] of Object.entries(expected)) expect.soft(Math.abs(actual[k] - v), `${label} ${k} : ${actual[k]} au lieu de ${v}`).toBeLessThanOrEqual(1)
}

// Nombre de lignes d'un texte (une boîte par ligne)
export const lineCount = (locator) => locator.evaluate((el) => {
  const r = document.createRange(); r.selectNodeContents(el)
  return new Set([...r.getClientRects()].map((b) => Math.round(b.top))).size
})

// Boîte du texte lui-même (pas de l'élément) : pour vérifier un centrage
export const textBox = (locator) => locator.evaluate((el) => {
  const r = document.createRange(); r.selectNodeContents(el); const b = r.getBoundingClientRect()
  return { left: b.left, right: b.right, top: b.top, bottom: b.bottom }
})

export const style = (locator, prop) => locator.evaluate((el, p) => getComputedStyle(el)[p], prop)

export const REFERENCE = new URL('../specs/reference/', import.meta.url)

// Part des pixels dont un canal diffère de plus de 40 (mesure du calibrage de la Phase 3)
export function diffRatio(screenshot, referenceFile) {
  const actual = PNG.sync.read(screenshot)
  const expected = jpeg.decode(readFileSync(new URL(referenceFile, REFERENCE)), { useTArray: true })
  if (actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error(`capture ${actual.width}×${actual.height} ≠ référence ${expected.width}×${expected.height}`)
  }
  let different = 0
  for (let i = 0; i < actual.data.length; i += 4) {
    const delta = Math.max(
      Math.abs(actual.data[i] - expected.data[i]),
      Math.abs(actual.data[i + 1] - expected.data[i + 1]),
      Math.abs(actual.data[i + 2] - expected.data[i + 2]),
    )
    if (delta > 40) different++
  }
  return different / (actual.width * actual.height)
}

// Couleur d'une valeur de la spec (hsl()), telle que le navigateur la calcule
export const cssColor = (page, value) => page.evaluate((v) => {
  const el = document.createElement('span'); el.style.color = v; document.body.append(el)
  const c = getComputedStyle(el).color; el.remove(); return c
}, value)
