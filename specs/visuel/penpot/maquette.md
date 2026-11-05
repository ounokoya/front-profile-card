# Maquette Penpot — Profile card component (refonte v2.0.0)

> SDL-FM 1.5.0 Phase 3 (remise à niveau, étape B, lot 3). Fichier Penpot : « FM Newbie » (créé par Koya ; nom vérifié avant chaque écriture), page « Profile card ». **En attente de G3.**
> Décisions G2 appliquées : attribution en Navy 950 assombri (Q-A1), statistiques en `dl` (Q-B1), photo décorative (Q-B2), « 26 » hors du titre (Q-B3), même carte à toutes les largeurs (Q-B4).

## Rendu des exports

L'exportateur PNG de Penpot n'a pas les polices (M16). Chaque écran est exporté en **SVG**, ses `<style>` sont retirés, les images (adresse interne de Penpot) sont remplacées par les fichiers du starter (`media.json`), puis il est rendu dans Chromium avec les polices Google. Les trois motifs SVG du starter (`bg-pattern-card.svg`, `bg-pattern-top.svg`, `bg-pattern-bottom.svg`) sont posés dans Penpot comme images PNG (l'import SVG de Penpot fait pivoter le cadre du motif avec l'ellipse) ; le rendu utilise les SVG d'origine.

## Bibliothèque

### Couleurs (groupe « Profile card »)

| Nom | Rôle | Valeur |
|---|---|---|
| Blue 600 | Fond de page | `#19A2AE` |
| Navy 950 | Nom, chiffres | `#2D3248` |
| Gray 500 | Âge, ville, libellés (5,02:1) | `#6A6F81` |
| Gray 100 | Trait (décoratif) | `#E9EAED` |
| Navy AA (Q-A1) | Texte, liens et focus de l'attribution : 5,05:1 sur Blue 600, 6,34:1 sur le cercle clair | `#1F2332` = `hsl(229, 23%, 16%)` |

### Typographie (Kumbh Sans)

| Usage | Valeur |
|---|---|
| « Victor Crest » (h1) | 700, 18 px, Navy 950 |
| « 26 » | 400, 18 px, Gray 500, 11 px après le nom |
| « London » | 400, 14 px, Gray 500 |
| Chiffres (dd) | 700, 18 px, Navy 950 |
| Libellés (dt) | 400, 10 px, espacement des lettres 1,5 px, Gray 500 |
| Attribution | 400, 11 px |

### Mesures (px)

| Élément | Desktop 1440 × 720 | Mobile 375 × 667 |
|---|---|---|
| Carte | 350 × 374 en (545, 173), rayon 15, ombre 0 50 100 `#07343F` 40 % | 327 × 374 en (24, 147) |
| Motif du haut | `bg-pattern-card.svg` 350 × 140, calé à gauche | idem (coupé à 327) |
| Photo | 96 px + bordure blanche 5 px, centrée sur y 140 de la carte | idem |
| Nom · ville (capitales) | 216 · 246 sous le haut de la carte | idem |
| Trait | 1 px à y 285 | idem |
| Statistiques | 3 colonnes égales, 27 px de marge de chaque côté ; chiffres et libellés (capitales) à 314 · 339 | idem |
| Motifs du fond (coin haut-gauche des SVG 978 × 978, par rapport au centre de la fenêtre) | haut (−1003, −879) ; bas (−28, +15) | haut (−841,5, −1101,5) ; bas (−25,5, −285,5) |

Les positions des motifs du fond sont calées automatiquement contre les images FM (carte exclue) : FM ne les place pas de la même façon en mobile et en desktop. Tablette 768 × 1024 (proposition G3-1) : la carte centrée en (209, 325), motifs placés comme en desktop.

## Composants (`composants.png`)

| Composant | États |
|---|---|
| Attribution | Normal (texte et liens Navy AA, liens soulignés, Q-A1) · Survol (soulignement retiré) · Focus clavier (contour 2 px Navy AA, décalé de 2 px) |

Rien d'autre n'est interactif : la carte n'a aucun lien.

## Écrans et seuils visuels (calibrage 1.1.0)

Écart = part des pixels dont un canal diffère de plus de 40 sur 255. Seuil de l'écran pour la Phase 7 = **max(5 %, écart + 1 point)**.

| Écran Penpot | Image FM | Écart | Seuil Phase 7 |
|---|---|---|---|
| Desktop · Profile card | `desktop.jpg` | 0,31 % | 5,0 % |
| Mobile · Profile card | `mobile.jpg` | 1,46 % | 5,0 % |

Notes :
- Écran sans image FM : **Tablette · Profile card (proposition G3-1)**.

## Prototype

Pas de parcours : rien n'est interactif en dehors de l'attribution, dont les états sont montrés par le composant.

## Fichiers

- `desktop.png`, `mobile.png`, `tablette.png` : rendus des 3 écrans ; `apercu-maquette.png`.
- `comparaison-*.png` : image FM | maquette | écarts en rouge (moitié de la taille).
- `composants.png` : les composants et leurs états (échelle 2).
