# Mise à jour de la solution sur Frontend Mentor

> SDL-FM 1.5.0 Phase 13 (refonte v2.0.0). Textes préparés pour le formulaire « Edit solution » de la solution de 2023 : https://www.frontendmentor.io/solutions/profile-card-component-7M77igoS7f (titre « position »). La modification est publique et faite au nom de Koya : elle n'est envoyée qu'avec son accord, au moment de l'envoi. Pas de nouveaux points (solution déjà soumise).
>
> **Envoyée le 2026-11-05** avec l'accord de Koya, textes ci-dessous inchangés (les 4 tags existent sur FM) ; rapport : 0 remarque (`specs/analyse/2026-11-05-rapport-fm.md`).

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | Profile card with a description list, measured circles & Tailwind v4 (68) |
| Repository URL | https://github.com/ounokoya/front-profile-card |
| Live site URL | https://ounokoya.github.io/front-profile-card/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `playwright` |
| Visibilité | Public |
| Capture | « Regenerate screenshot » : la page a changé depuis 2023 |

Après l'envoi : « Regenerate report » (vérifications automatiques gratuites), en vérifiant d'abord que la solution n'a pas de rapport IA (sinon un crédit serait consommé : accord de Koya).

## What are you most proud of, and what would you do differently next time?

I'm most proud of the statistics: they are a description list, so a screen reader says "Followers, 80K", while CSS `order` shows the number above the label as in the design. The two background circles are placed from the centre of the window at offsets I measured on the design files, which differ on mobile and desktop. Screenshots differ from the design JPGs by 0.49 % (desktop) and 2.08 % (mobile) of pixels, and the 27 Playwright tests pass on the live site.

This is a rebuild of my 2023 solution. Next time, I'd remember that `overflow: clip` does not contain margins (see below).

## What challenges did you encounter, and how did you overcome them?

- **A card 87 px too low**: the photo's top margin went through the card, because `overflow: clip`, unlike `hidden`, does not create a new formatting context. Padding on the card fixed it.
- **Placing a background from the centre**: with `background-position: calc(50% + d)`, the 50 % applies to the free space; for a 978 px image, the offset is `d + 489px`.
- **The attribution on the cyan page**: the starter's blue is 2.32:1, so the text and links use a darker navy (5.05:1).

## What specific areas of your project would you like help with?

1. Is a `dl` the right markup for these statistics, or would you use a list with the number and label in one item?
2. Would you keep the age outside the `h1`, or make it part of the heading?
