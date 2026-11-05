# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-05) — même décision que les challenges précédents.

## Contexte
La bibliothèque Penpot (validée G3, `specs/visuel/penpot/maquette.md`) fixe les 4 couleurs FM, la couleur dérivée de l'attribution (Q-A1), la police, les tailles de texte, le rayon et l'ombre de la carte. Décisions communes : ADR-0001, ADR-0002 (`frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans un seul bloc `@theme` et vide la palette par défaut (`--color-*: initial`).
- Les longueurs des tokens sont écrites en rem (règle FM).
- Correspondance :

| Penpot | `@theme` |
|---|---|
| Couleurs FM | `--color-white`, `--color-blue-600`, `--color-navy-950`, `--color-gray-500`, `--color-gray-100` (valeurs `hsl()` du style-guide) |
| Dérivée G2 | `--color-navy-aa` (`hsl(229, 23%, 16%)`, Q-A1 : attribution) |
| Kumbh Sans | `--font-sans` (chargement : ADR-0004) |
| Tailles de texte | `--text-name` (18 px), `--text-city` (14 px), `--text-stat` (18 px), `--text-label` (10 px, espacement des lettres 1,5 px), `--text-attribution` (11 px) |
| Rayon, ombre | `--radius-card` (15) ; `--shadow-card` (0 50 100, `#07343F` à 40 %) |
- Point de rupture : `md` (768 px, valeur de Tailwind) pour le placement des cercles du fond (G3-1).

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`) dans les classes, les styles et les blocs `<style>` de `index.html`, ni dans `src/style.css` hors des valeurs de tokens.
