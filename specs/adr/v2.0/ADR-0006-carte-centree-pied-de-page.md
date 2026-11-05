# ADR-0006 : Mise en page — carte centrée, pied de page en bas sans la décaler

## Statut
Accepté (2026-11-05) — même principe que le lot 2 (ADR-0006).

## Contexte
La carte de 374 px de haut est centrée dans la fenêtre ((545, 173) à 1440 × 720, (24, 147) à 375 × 667, (209, 325) à 768 × 1024), large de 350 px au plus et à 24 px des bords en dessous (Q-B4). Les trois statistiques tombent au centre de trois colonnes égales, à 27 px des bords de la carte (Phase 3). L'attribution doit tenir sous la carte sans la déplacer (S5).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Grille de 3 rangées `1fr auto 1fr` sur toute la hauteur (choisie)** | La carte est au centre de la fenêtre ; le pied de page se place en bas de la 3e rangée ; si la fenêtre est trop basse, la page s'allonge au lieu de superposer | — |
| Pied de page en position absolue | Simple | Passe sur la carte dans une fenêtre basse |
| Pied de page dans le flux, sous la carte | Simple | Décale la carte |

## Décision
- `body` en grille `grid-rows-[1fr_auto_1fr]` de hauteur minimale `100dvh`, `main` dans la 2e rangée, `footer` en bas de la 3e.
- Carte : largeur `min(21.875rem, 100% - 3rem)`, contenu centré.
- Statistiques : `dl` en grille de 3 colonnes égales, marges latérales de 27 px ; dans chaque colonne, le `dd` (chiffre) est affiché avant le `dt` (libellé) par `order` (Q-B1).

## Conséquences
- Positions S1 à S5 tenues par une seule grille, sans point de rupture pour la carte.
- L'ordre de lecture reste libellé puis chiffre (A3) ; seul l'affichage est inversé.
