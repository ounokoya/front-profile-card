import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { HtmlValidate } from 'html-validate'
import { ESLint } from 'eslint'

// Spec §7 — S13 à S15 : validateur W3C Nu et règles des vérifications automatiques de FM ;
// fitness functions des ADR-0003 et ADR-0004

const root = (path) => new URL(`../${path}`, import.meta.url)
const vnu = root('node_modules/vnu-jar/build/dist/vnu.jar').pathname
const COLOR = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i

test('S13 — le HTML servi passe le validateur W3C Nu sans erreur', async ({ request }) => {
  const html = await (await request.get('./')).text()
  let output = ''
  try {
    execFileSync('java', ['-jar', vnu, '--errors-only', '--format', 'text', '-'], { input: html, encoding: 'utf8', stdio: 'pipe' })
  } catch (error) {
    output = `${error.stdout}${error.stderr}`
  }
  expect(output).toBe('')
})

// Préréglage recommandé, sans les règles de style que FM n'applique pas ; aucune exception (les règles de FM s'imposent)
test('S14 — Règles FM : html-validate sans erreur sur le HTML servi', async ({ request }) => {
  const html = await (await request.get('./')).text()
  const validator = new HtmlValidate({
    extends: ['html-validate:recommended'],
    rules: { 'doctype-style': 'off', 'void-style': 'off' },
  })
  const report = await validator.validateString(html)
  const errors = report.results.flatMap((r) => r.messages).map((m) => `${m.line}:${m.column} ${m.ruleId} — ${m.message}`)
  expect(errors).toEqual([])
})

// FM passe tout le JavaScript du dépôt (code et tests) à eslint : préréglage recommandé (eslint.config.js)
test('S15 — Règles FM : eslint sans erreur dans le JavaScript du dépôt', async () => {
  const eslint = new ESLint({ cwd: new URL('..', import.meta.url).pathname })
  const results = await eslint.lintFiles(['src', 'tests', '*.js'])
  const errors = results.flatMap((r) => r.messages.map((m) => `${r.filePath.split('/').slice(-2).join('/')}:${m.line} ${m.ruleId} — ${m.message}`))
  expect(errors).toEqual([])
})



test('ADR-0003 — aucune couleur écrite en dur hors des tokens', () => {
  // le texte de la page contient « #3429 » (titre de la spec) : dans le HTML, seuls les classes, les styles et les blocs <style> comptent
  const html = readFileSync(root('index.html'), 'utf8')
  const sources = {
    'index.html (classes, styles)': [...html.matchAll(/(?:class|style)="([^"]*)"|<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1] ?? m[2]).join('\n'),
    // les tokens sont des propriétés personnalisées (--…) : seules leurs valeurs portent des couleurs
    'src/style.css (hors tokens)': readFileSync(root('src/style.css'), 'utf8').replace(/--[\w-]+\s*:[^;]+;/g, ''),
  }
  expect(Object.entries(sources).filter(([, text]) => COLOR.test(text)).map(([file]) => file)).toEqual([])
})

test('ADR-0004 — rien n\'est chargé hors du domaine ; Kumbh Sans 400 et 700 se chargent', async ({ page, baseURL }) => {
  const outside = []
  page.on('request', (r) => { if (new URL(r.url()).origin !== new URL(baseURL).origin) outside.push(r.url()) })
  await page.goto('./')
  // load() télécharge la graisse même si aucun texte ne l'utilise encore ; [] si la police n'est pas déclarée
  const weights = await page.evaluate(async (faces) => {
    const found = []
    for (const font of faces) if ((await document.fonts.load(font)).length) found.push(font)
    return found
  }, ['400 16px "Kumbh Sans"', '700 16px "Kumbh Sans"'])
  expect(weights).toEqual(['400 16px "Kumbh Sans"', '700 16px "Kumbh Sans"'])
  expect(outside).toEqual([])
})

// Règle FM vue sur les solutions précédentes (SDL-FM Phase 6) : les longueurs écrites à la main sont en rem
test('Règles FM — aucune longueur en px écrite à la main (src/style.css, valeurs arbitraires du HTML)', () => {
  const css = readFileSync(root('src/style.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const html = readFileSync(root('index.html'), 'utf8')
  const arbitrary = [...html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => /\[[^\]]*\d+(\.\d+)?px/.test(c))
  expect(css.match(/\b\d+(\.\d+)?px\b/g) ?? []).toEqual([])
  expect(arbitrary).toEqual([])
})

// Règle FM (rapport du Social proof, 2026-11-05) : l'outil de FM refuse aria-label hors des éléments interactifs
// et des repères ; html-validate 11 l'accepte sur <ul>, d'où ce test (sinon aria-labelledby)
test('Règles FM — aria-label seulement sur un élément interactif ou un repère', async ({ page }) => {
  await page.goto('./')
  const misused = await page.evaluate(() => {
    const ok = 'a[href], button, input, select, textarea, summary, iframe, img, area, form, fieldset, figure, table, td, th, main, nav, header, footer, aside, section, [role]'
    return [...document.querySelectorAll('[aria-label]')].filter((el) => !el.matches(ok)).map((el) => `<${el.localName} aria-label="${el.getAttribute('aria-label')}">`)
  })
  expect(misused).toEqual([])
})

// Règles FM (rapport du Recipe page, 2026-11-05, « Best Practice ») : propriétés logiques plutôt que physiques,
// longueurs d'espacement et de taille écrites avec calc(), min(), max() ou clamp() (ici sur l'échelle --spacing)
test('Règles FM — CSS : propriétés logiques et longueurs en fonctions (src/style.css)', () => {
  const css = readFileSync(root('src/style.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/@theme\s*{[\s\S]*?\n}/, '').replace(/@font-face\s*{[^}]*}/g, '')
  const declarations = [...css.matchAll(/(^|[;{\s])([a-z-]+)\s*:\s*([^;{}]+);/g)].map((m) => [m[2], m[3].trim()])
  const physical = /^(padding|margin|border)-(left|right|top|bottom)(-width)?$|^(min-|max-)?(width|height)$|^(top|left|right|bottom)$/
  const sized = /^(padding|margin|gap|inset)(-|$)|^(min-|max-)?(inline-size|block-size)$|^border-(block|inline)/
  const found = []
  for (const [prop, value] of declarations) {
    if (physical.test(prop)) found.push(`${prop}: ${value} (propriété physique)`)
    if (prop === 'text-align' && /^(left|right)$/.test(value)) found.push(`text-align: ${value} (propriété physique)`)
    if (sized.test(prop) && /\d(\.\d+)?(rem|em|px)\b/.test(value.replace(/(calc|min|max|clamp)\([^)]*\)/g, ''))) found.push(`${prop}: ${value} (longueur fixe)`)
  }
  expect(found).toEqual([])
})
