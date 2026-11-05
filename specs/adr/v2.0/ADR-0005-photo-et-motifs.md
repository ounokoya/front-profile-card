# ADR-0005 : Photo en `img` décoratif ; motifs en fonds CSS placés par rapport au centre

## Statut
Accepté (2026-11-05) — décisions G2 (Q-B2, Q-B4) et G3 (G3-1).

## Contexte
La photo `image-victor.jpg` (96 × 96) est ronde, avec une bordure blanche de 5 px, et décorative (Q-B2). Le haut de la carte porte `bg-pattern-card.svg` (350 × 140). Le fond de la page porte deux grands cercles (`bg-pattern-top.svg`, `bg-pattern-bottom.svg`, 978 × 978) : leurs positions ont été calées contre les images FM en Phase 3, par rapport au centre de la fenêtre, et FM ne les place pas de la même façon en mobile et en desktop (`maquette.md`).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Photo en `img alt=""` ; motifs en `background-image` (carte et `body`) (choisie)** | La place de la photo est réservée par `width` et `height` ; les motifs, décoratifs, restent hors du HTML ; `background-position` en `calc(50% + …)` suit le centre de la fenêtre | — |
| Motifs en `img` positionnés en absolu | Placement direct | Trois éléments décoratifs de plus dans le HTML, à cacher aux lecteurs d'écran |

## Décision
- Photo : `img` `width="96" height="96"`, `alt=""`, bordure blanche de 5 px, ronde.
- Haut de la carte : `bg-pattern-card.svg` en fond de l'`article`, en haut à gauche, sans répétition.
- Fond de page : Blue 600 et les deux cercles ; le coin haut-gauche de chaque SVG est à (centre + décalage) : sous 768 px haut (−841,5 ; −1101,5), bas (−25,5 ; −285,5) ; dès 768 px haut (−1003 ; −879), bas (−28 ; +15). Avec une image de 978 px, `background-position: calc(50% + d + 489px)` en x (et de même en y) place ce coin à `centre + d` ; les longueurs sont écrites en rem.
- `src/main.js` n'importe que la feuille de style.

## Conséquences
- Aucun décalage de mise en page au chargement ; aucune erreur JavaScript possible.
- Vérifié par S1, S2 (photo), S6 (aucune image exposée) et les comparaisons visuelles (S16, S17).
