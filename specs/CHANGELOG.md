# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [2.0.0] — 2026-11-05

Refonte complète de la solution de 2023 (SDL-FM 1.5.0, remise à niveau du profil, étape B, lot 3), à partir du starter actuel, dans le même dépôt.

### Added
- Carte de 374 px de haut, 350 px au plus, centrée dans la fenêtre (Q-B4, G3-1, ADR-0006) ; photo décorative (Q-B2) ; « Victor Crest » en `h1`, l'âge hors du titre (Q-B3).
- Statistiques en liste de description, libellé puis chiffre à la lecture, chiffre au-dessus à l'écran (Q-B1).
- Cercles du fond placés par rapport au centre de la fenêtre, comme sur les images FM (ADR-0005).
- Kumbh Sans servie avec le site par Fontsource (ADR-0004).
- Attribution en Navy AA sur le fond cyan (Q-A1).
- Tests : 17 scénarios de la spec, axe-core, validateur W3C Nu, html-validate et eslint réglés comme FM, règles FM déjà vues, fitness functions des ADR-0003 et ADR-0004, comparaisons visuelles (0,49 % ; 2,08 % pour un seuil de 5 %).

### Changed
- Vite 8 et Tailwind CSS v4 (tokens dans `@theme`, ADR-0003) au lieu de Vite et Tailwind v3 ; publication sur GitHub Pages (branche `gh-pages`) au lieu de Netlify.

### Removed
- Code de 2023 (restes du modèle Vite, dont `counter.js`) et README du starter.
