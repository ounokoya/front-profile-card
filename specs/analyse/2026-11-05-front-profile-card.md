# 2026-11-05 — Rapport d'exécution : Profile card component (v2.0.0)

> SDL-FM 1.5.0, Phases 7 et 8 (remise à niveau, étape B, lot 3). Tests sur le build de production (`vite build` + `vite preview`) ; parcours réel dans le navigateur intégré (configuration `pc-preview`, `http://localhost:4221/front-profile-card/`).

## 1. Tests automatiques (Phase 7)

`npm test` : **27 réussis sur 27**.

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S5 (1440, 375, 768 ; 360 px à 24 px des bords ; 320 à 1440 sans défilement horizontal ; pied de page) | ✅ 8 / 8 |
| Contenu | S6 à S9 (nom, âge hors du titre, ville, statistiques libellé puis chiffre, photo décorative chargée ; tailles ; couleurs ; fond en thème clair et sombre) | ✅ 5 / 5 |
| Interactions | S10, S11 (clavier, attribution) | ✅ 2 / 2 |
| Accessibilité | S12 : axe-core à 375 et 1440 px | ✅ 2 / 2 |
| HTML, JavaScript, règles FM | S13 (W3C Nu), S14 (html-validate au réglage de FM), S15 (eslint), longueurs en rem, aria-label, CSS logique ; fitness ADR-0003 et ADR-0004 | ✅ 8 / 8 |
| Visuel | S16, S17 | ✅ 2 / 2 |

### Comparaison visuelle

| Écran | Image FM | Pixels différents | Seuil | Penpot (Phase 3) |
|---|---|---|---|---|
| Desktop 1440 × 720 | `desktop.jpg` | 0,49 % | 5,0 % | 0,31 % |
| Mobile 375 × 667 | `mobile.jpg` | 2,08 % | 5,0 % | 1,46 % |

Contrôle rouge fait avant le code (Phase 4) : 20 échecs pour la bonne raison sur le starter et 5 tests de garde ; fitness functions (Phase 5) : 2 échecs attendus.

Un test corrigé pendant la Phase 6 (commit `fix(test)`, toujours rouge sur le starter) : la photo était cherchée par son nom de fichier, mais Vite intègre les images de moins de 4 Ko en `data:` ; elle est maintenant repérée comme la seule image de la carte.

## 2. Parcours réel (Phase 8)

| Étape | 320 px | 768 px | 1440 px |
|---|---|---|---|
| Disposition | ✅ carte (24, 134) 272 × 373, photo de 106, pas de défilement horizontal | ✅ carte centrée, cercles du fond placés comme en desktop | ✅ (tests S1, S5) |
| Police, image | ✅ Kumbh Sans 400 et 700 chargées ; photo chargée | — | ✅ |
| Clavier | — | — | ✅ Tab : « Frontend Mentor », contour 2 px Navy AA décalé de 2 px |

## 3. Écarts relevés et suites

Aucun écart.

Constat de la construction (Phase 6) : la marge haute de la photo traversait la carte (`overflow: clip` n'isole pas les marges, contrairement à `overflow: hidden`) : la carte commençait 87 px trop bas. La distance vient maintenant du retrait intérieur de la carte.

## 4. En ligne (Phase 12)

`BASE_URL=https://ounokoya.github.io/front-profile-card/ npx playwright test --workers=2` : **27 réussis sur 27**, écarts visuels identiques au local (0,49 % et 2,08 %), sur la v2.0.0 déployée depuis la branche `gh-pages` (publication avec l'accord de Koya, 2026-11-05). GitHub a activé Pages de lui-même à la première publication de la branche `gh-pages`.

## 5. Verdict

Conforme à la spec et à la maquette validée (G3). README fait (Phase 9) ; v2.0.0 en ligne. Prêt pour « Edit solution » sur FM (Phase 13).
