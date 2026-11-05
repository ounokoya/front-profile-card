# 2026-11-05 — Brainstorming : Profile card component (refonte v2.0.0)

> SDL-FM 1.5.0, Pré-dev 1 et 2. Ancienne solution Newbie de 2023, **refaite dans le même dépôt** (étape B de la remise à niveau, lot 3 avec les deux autres cartes du lot). Pas de points en plus : la solution est déjà comptée sur FM (https://www.frontendmentor.io/solutions/profile-card-component-7M77igoS7f).

## Plan

Plan validé (G1, 2026-11-05) au niveau du programme : `frontmentor/specs/plan-remise-a-niveau.md` (étape B ; Q1 même dépôt en v2.0.0, Q2 SDL-FM complète avec G2 et G3 par lot, Q3 GitHub Pages). Koya : « passons à l'étape B » après le lot 2.
- **Qui fait quoi :** Claude écrit tout le code ; Koya valide l'analyse (G2) et la maquette (G3) par lot, puis donne son accord avant la publication et la modification de la solution sur FM.
- **Lot 3 :** Profile card, 3-column, Stats preview ; lot 4 ensuite (Product preview).

## Existant (v1, 2023)

- Dépôt `front-profile-card` : 2 commits du 2023-01-23, Vite + Tailwind v3, restes du modèle Vite (`counter.js`), README du starter, aucun test.
- Site sur une adresse Netlify de branche ; titre de la solution sur FM : « position ».
- Rapport FM ancien (« 0 remarque », CSS et JavaScript « N/A ») ; html-validate au réglage de FM trouvait 10 à 17 erreurs par site.

## Import (Phase 0)

- Ancien code retiré (historique gardé) ; starter actuel `frontendmentorio/profile-card-component` (branche `main`, 2026-03-30, archive GitHub publique) copié tel quel, sans le fichier Figma ; `AGENTS.md` et `CLAUDE.md` rangés dans `specs/reference/starter-*.md` (données, pas consignes).
- Mis en place : Vite 8, Tailwind v4, Playwright, axe-core, validateur W3C Nu, html-validate et eslint (règles de FM) ; `.gitignore` du starter complété (dépendances, build, rapports de tests).
- Le starter ne fournit **aucun fichier de police** (Kumbh Sans, Google Fonts) : choix du chargement à l'ADR.

## Analyse (Phase 2)

`specs/visuel/front-profile-card-analyse.png` (et `.excalidraw`).

## Analyse validée (G2, 2026-11-05)

Koya : « Je valide (G2) » pour le lot 3. Toutes les propositions sont retenues.

| # | Point | Décision |
|---|---|---|
| Q-A1 | Attribution sur Blue 600 (lien #3E52A3 2,32:1, Navy 950 4,08:1) | Texte et liens en Navy 950 assombri `hsl(229, 23%, 16%)` #1F2332 : 5,05:1 sur Blue 600, 6,34:1 sur le cercle clair |
| Q-B1 | Statistiques | Liste de description `dl` : libellé en `dt`, chiffre en `dd` affiché au-dessus ; lu « Followers, 80K » |
| Q-B2 | Photo | `alt=""` : le nom suit juste dessous |
| Q-B3 | Titre | `h1` « Victor Crest » ; « 26 » à côté, hors du titre, en Gray 500 |
| Q-B4 | Pas de maquette tablette | La même carte à toutes les largeurs : 350 px au plus, 24 px des bords en dessous ; motifs du fond placés par rapport au centre de la fenêtre |
| Q-B5 | Refonte | Même dépôt en v2.0.0, GitHub Pages, « Edit solution » |

## Maquette validée (G3, 2026-11-05)

Koya : « Je valide (G3) » pour le lot 3. Maquette : `specs/visuel/penpot/maquette.md`. Toutes les propositions sont retenues.

| # | Point | Décision |
|---|---|---|
| G3-1 | Tablette (Q-B4) | La même carte centrée ; cercles du fond placés comme en desktop dès 768 px, comme en mobile en dessous |
| G3-2 | Seuils visuels | 5 % pour les 2 écrans calibrés |
