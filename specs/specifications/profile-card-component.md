# Spec — Profile card component (refonte v2.0.0)

> SDL-FM 1.5.0 Phase 4 (remise à niveau, étape B, lot 3). Sources : analyse validée (G2) `specs/visuel/front-profile-card-analyse.*`, maquette validée (G3) `specs/visuel/penpot/maquette.md`, décisions dans `specs/brainstorming/2026-11-05-front-profile-card.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**.

## 1. Objectif

La carte de profil de Victor Crest : sa photo, son nom, son âge, sa ville et trois statistiques (abonnés, mentions « j'aime », photos). La page est statique : seuls les liens du pied de page sont interactifs.

## 2. Composants et contenu

| Composant | Contenu | Élément HTML attendu |
|---|---|---|
| Carte | tout ce qui suit, sauf le pied de page ; motif `bg-pattern-card.svg` en haut | `article` dans `main` |
| Photo | `image-victor.jpg` (96 × 96), ronde, bordure blanche de 5 px ; décorative (Q-B2) | `img alt=""` |
| Nom | « Victor Crest » | `h1` (Q-B3) |
| Âge | « 26 », à côté du nom, hors du titre (Q-B3) | texte |
| Ville | « London » | `p` |
| Statistiques (Q-B1) | « 80K » Followers, « 803K » Likes, « 1.4K » Photos ; le chiffre est affiché au-dessus du libellé | `dl` : `dt` libellé, `dd` chiffre |
| Fond | Blue 600 et deux motifs de cercles (`bg-pattern-top.svg`, `bg-pattern-bottom.svg`), décoratifs | — |
| Pied de page | « Challenge by Frontend Mentor. Coded by Koya Esdras. » ; liens vers `https://www.frontendmentor.io?ref=challenge` et `https://www.frontendmentor.io/profile/ounokoya` | `footer` |

La page a pour titre « Frontend Mentor | Profile card component » et la langue `en`.

## 3. Tokens

Couleurs, typographie et mesures : `specs/reference/tokens.md` (FM) et la bibliothèque Penpot (`specs/visuel/penpot/maquette.md`).

| Rôle | Couleur |
|---|---|
| Fond de page | Blue 600 `hsl(185, 75%, 39%)` |
| Carte | White |
| Nom, chiffres | Navy 950 `hsl(229, 23%, 23%)` |
| Âge, ville, libellés | Gray 500 `hsl(227, 10%, 46%)` (5,02:1) |
| Trait | Gray 100 `hsl(225, 10%, 92%)` (décoratif) |
| Attribution : texte, liens, contour de focus | Navy AA `hsl(229, 23%, 16%)` (5,05:1 sur Blue 600, Q-A1) |

Kumbh Sans : nom et chiffres 700, 18 px ; âge 400, 18 px ; ville 400, 14 px ; libellés 400, 10 px, espacement des lettres 1,5 px.

## 4. Responsive

Une seule disposition (Q-B4, G3-1) : la carte de 374 px de haut, large de 350 px au plus et à 24 px des bords en dessous, est centrée dans la fenêtre. Les cercles du fond sont placés par rapport au centre de la fenêtre : comme sur l'image mobile sous 768 px, comme sur l'image desktop au-delà.

| Élément | 1440 × 720 | 375 × 667 | 768 × 1024 | 360 |
|---|---|---|---|---|
| Carte | (545, 173) 350 × 374 | (24, 147) 327 × 374 | (209, 325) 350 × 374 | x 24, largeur 312 |
| Photo (avec sa bordure) | (667, 260) 106 × 106 | (135, 234) 106 × 106 | — | — |

Le pied de page ne déplace pas la carte : centré en bas de la fenêtre. La page reste utilisable de 320 px aux grands écrans, sans défilement horizontal.

## 5. États et interactions

| Élément | Normal | Survol | Focus clavier |
|---|---|---|---|
| Liens du pied de page | Navy AA, soulignés (Q-A1) | soulignement retiré | contour 2 px Navy AA, décalé de 2 px |

Rien d'autre n'est interactif. La page n'a aucune animation.

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Un seul `h1` : « Victor Crest » (l'âge n'en fait pas partie). |
| A2 | Photo et motifs décoratifs : ignorés par les lecteurs d'écran (Q-B2). |
| A3 | Chaque statistique est lue libellé puis chiffre : « Followers, 80K » (Q-B1). |
| A4 | Contraste AA (4,5:1) pour tous les textes, y compris l'attribution sur le fond (Q-A1). |
| A5 | Focus visible sur les liens : contour de 2 px au moins. |
| A6 | Le fond de la page est déclaré : le même en thème clair ou sombre de l'appareil. |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| Carte | article | — (elle a la taille et la place de la carte : S1 à S3) |
| Nom | heading (niveau 1) | « Victor Crest » |
| Statistiques | term · definition | « Followers », « Likes », « Photos » · « 80K », « 803K », « 1.4K » |
| Pied de page | contentinfo | liens « Frontend Mentor » et « Koya Esdras » |
| Photo | — (absente de l'arbre d'accessibilité) | l'image `image-victor` de la carte |

## 7. Critères d'acceptation

```
Mise en page (positions de la maquette, à 1 px près)
S1  Given 1440 × 720   Then carte (545, 173) 350 × 374 ; photo (667, 260) 106 × 106
S2  Given 375 × 667    Then carte (24, 147) 327 × 374 ; photo (135, 234) 106 × 106
S3  Given 768 × 1024   Then carte (209, 325) 350 × 374 ; given 360 px  Then carte à x 24, 312 de large (Q-B4)
S4  Given 320, 375, 768, 1440 px  Then pas de défilement horizontal
S5  Given 1440 × 720   Then le pied de page est sous la carte, centré, dans la fenêtre

Contenu
S6  Given la page  Then h1 « Victor Crest » (seul titre de niveau 1), « 26 » hors du titre, « London » ;
                   trois paires libellé / chiffre dans cet ordre (Followers 80K, Likes 803K, Photos 1.4K), chiffre affiché au-dessus ;
                   aucune image exposée aux lecteurs d'écran (photo chargée)
S7  Given la page  Then nom et chiffres en 18 px, âge en 18 px, ville en 14 px, libellés en 10 px espacés de 1,5 px
S8  Given la page  Then nom et chiffres en Navy 950 ; âge, ville et libellés en Gray 500
S9  Given l'appareil en thème clair ou sombre  Then le fond de la page reste Blue 600 (A6)

Interactions
S10 Given la page  When j'appuie sur Tab deux fois  Then « Frontend Mentor » puis « Koya Esdras », chacun avec un contour Navy AA de 2 px au moins
S11 Given le pied de page  Then texte et liens en Navy AA, liens soulignés, bonnes adresses ;
                   When je survole un lien  Then son soulignement disparaît (Q-A1)

Accessibilité et règles FM
S12 Given 375 et 1440 px  Then axe-core : aucune violation sérieuse ou critique
S13 Given le HTML servi  Then validateur W3C Nu : aucune erreur
S14 Given le HTML servi  Then html-validate au réglage de FM : aucune erreur
S15 Given le JavaScript du dépôt  Then eslint au réglage de FM : aucune erreur
    (et les tests de garde des règles FM déjà vues : longueurs en rem, aria-label, CSS logique)

Visuel (seuils calibrés en Phase 3, G3-2)
S16 1440 × 720 vs desktop.jpg ≤ 5,0 %
S17 375 × 667 vs mobile.jpg ≤ 5,0 %
```
