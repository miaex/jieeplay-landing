# JieePlay — Landing page (V1)

Projet **totalement indépendant** du jeu JieePlay. Aucun code, aucune
donnée, aucun système du jeu n'est importé ici.

## Principe

Page d'entrée publique, envoyée directement par le créateur à des
personnes invitées. Volontairement mystérieuse : ne révèle ni les
catégories, ni les mécaniques, ni les récompenses du jeu.

## Structure

```
index.html          page de sélection de langue (racine)
fr/index.html        landing page en français
en/index.html         landing page en anglais (rédigée naturellement,
                       pas une traduction mot à mot)
css/                   style.css, responsive.css, animations.css
js/
  config.js            ⚠️ GAME_URL — seul endroit à modifier quand
                        le jeu sera prêt
  language.js           détection/mémorisation de la langue
  navigation.js          apparition progressive, onglets, prefers-reduced-motion
assets/icons/           icônes (réutilisées depuis le jeu, juste pour
                         le favicon/partage — aucun lien technique)
netlify.toml            configuration de déploiement
```

## Brancher le jeu plus tard

Une seule modification nécessaire, dans `js/config.js` :

```js
const CONFIG = {
	GAME_URL: "https://miaex.github.io/jieeplay-web/", // remplacer "#"
};
```

Tous les boutons "Continuer" du site (FR et EN) utilisent cette
variable automatiquement — rien d'autre à toucher.

## Déploiement (Netlify)

1. Pousser ce dossier sur un **nouveau** dépôt GitHub (ex. `jieeplay-landing`) —
   séparé du dépôt du jeu.
2. Sur [netlify.com](https://netlify.com) → **Add new site → Import an
   existing project** → connecter le dépôt GitHub.
3. Build command : laisser vide. Publish directory : `.` (déjà configuré
   dans `netlify.toml`).
4. Déployé automatiquement à chaque `git push`, comme GitHub Pages pour
   le jeu — même principe, aucun build nécessaire.

## Tests avant livraison (voir §34 du cahier des charges)

- [ ] Sélection FR / EN fonctionne et est mémorisée
- [ ] Changement de langue depuis le footer fonctionne
- [ ] Toutes les sections s'affichent correctement
- [ ] Bouton "Continuer" (hero + CTA final) pointe vers `CONFIG.GAME_URL`
- [ ] Responsive mobile / tablette / desktop, aucun débordement horizontal
- [ ] Onglets Android / iPhone de la section installation
- [ ] Animations douces, respect de `prefers-reduced-motion`
- [ ] Déploiement Netlify fonctionnel
