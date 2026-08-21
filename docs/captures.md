# Visuels du portfolio

Déposer les fichiers dans `public/captures/`, puis renseigner le champ `src` correspondant
dans `src/data/content.ts` (chemin à écrire : `/captures/nom-du-fichier.png`).
Tant que `src` vaut `null`, un encadré hachuré affiche le cadrage attendu à la place.

Format : PNG ou JPEG, poids ≤ 300 Ko par fichier (les captures fournies sont ré-encodées
en palette avec `sharp`). Masquer toute donnée personnelle : adresses mail de tiers,
numéros de téléphone, noms de clients non autorisés.

## Déjà en place — captures d'écran réelles

| Fichier | Où | Source |
| --- | --- | --- |
| `ia-01-app.png` | Carte « Application SEO / GEO » | Outil lancé en local, écran du générateur |
| `ia-01-generation.png` | Détail — article généré | Article enregistré ouvert dans l'outil |
| `ia-01-audit-formulaire.png` | Détail — module d'audit GEO | Outil lancé en local |
| `ia-02-canevas.png` | Carte « Chaîne éditoriale » | Canevas n8n en production, les 3 sous-workflows |
| `ia-02-sheet.png` | Détail — feuille de suivi | Google Sheets `create_content_agent_n8n` |
| `ia-03-veille-canevas.png` | Carte « Veille quotidienne » | Canevas n8n du workflow COS 01 |
| `ia-03-veille-mail.png` | Détail — brief ouvert | Gmail, message du 20 août 2026 à 06h31 |
| `ia-03-veille-boite.png` | Détail — briefs reçus | Gmail, recherche sur l'objet du brief |
| `web-01-poribal.jpg` | Carte « Site vitrine » | poribalgroup.fr, page d'accueil en ligne |
| `web-02-dd-audit.png` | Détail — audit des balises | Google Sheets, inventaire du catalogue Dupond & Durand |
| `contenu-01-reels.jpg` | Carte « Photo et vidéo » | Instagram @renovtaloc, onglet vidéos avec compteurs de vues |
| `contenu-02-social.png` | Carte « Social media » | Instagram @renovtaloc, profil et stories par chantier |
| `contenu-02-strategie.png` | Détail — stratégie social media | Votre document de stratégie, page « stratégie par plateforme » |
| `web-02-dd-motscles.png` | Carte « Optimisation SEO » | Google Sheets, tableau de mots-clés Dupond & Durand |

Toutes ont été prises à l'écran sur les outils réels, puis recadrées pour retirer la barre
d'onglets, la barre d'adresse et les favoris. Aucun rendu ni schéma reconstitué.

## Design — fichiers d'origine et planches

Les visuels de `public/captures/design/` et `public/captures/graphique/` viennent tous du
dossier `OneDrive/Images/Captures d'écran/design/`. Ils ne sont ni redessinés ni
reconstitués : chaque plaque reprend le fichier livré à l'époque, détouré et posé dans le
cadre exact attendu par la page.

| Fichier | Source d'origine | Traitement |
| --- | --- | --- |
| `design/meji-couverture.jpg` | `etiquette 1.pdf` + logo Meji Foods | PDF rendu par Chrome, logo détouré, planche composée |
| `design/meji-logo-noir.jpg` / `-blanc.jpg` | Logos Meji Foods, 1er et 3 mai 2024 | Détourage, mise au cadre 4/3 |
| `design/meji-etiquette-v1.jpg` / `-v2.jpg` | Capture du 29 avril 2024 + `etiquette 1.pdf` | Les deux versions de l'étiquette, entières |
| `design/sport-couverture.jpg` | 8 pièces de la ligne sportswear | Planche 4 × 2, fond papier du site |
| `design/sport-haut-*.jpg`, `sport-legging-*.jpg` | `femme*.png`, `dd.png`, `pant .png` | Détourage sur le canal alpha, mise au cadre 4/3 |
| `design/sport-monogramme.jpg`, `sport-signature.jpg` | Logos de la ligne, février 2024 | Fond repris à la teinte exacte de la source (#090909) |
| `poribal/4-facons.jpg`, `locatif.jpg`, `frais.jpg`, `services.jpg` | `mmobilier façons.pdf`, `Ce qu'on ne vous dit pas….pdf`, `publications.pdf` | Pages extraites des PDF Poribal |
| `poribal/social-*.jpg` | Compte Instagram public `@poribal_group` | Images de la grille récupérées via CDP, mises au cadre 4/3 |
| `renovtaloc/infographie-*.jpg` | Page LinkedIn `fr.linkedin.com/company/renovtaloc-travaux` | Six fiches projet en 1080 × 1350, mises au cadre 4/3 |

LinkedIn ne sert que deux publications à un visiteur non connecté. Les six ont été
obtenues en déroulant la page publique de l'entreprise dans Chrome headless : chaque
défilement déclenche le chargement différé d'une publication de plus. L'onglet
`/posts/` redirige vers la page de connexion et reste inaccessible.

Les deux publications « Meet our team » du compte Poribal ne sont pas reprises : elles
portent la photo et le nom complet de personnes tierces.

### Récupérer les visuels d'un compte Instagram public

`scripts/` n'a pas de script dédié ; la manœuvre tient en deux temps. Chrome headless en
CDP charge le profil, on relève les `src` de `main img`, puis on télécharge chaque URL.
La grille sert des images à 640 px de côté au maximum : suffisant pour un cadre 1200 × 900,
trop juste pour une couverture 1600 × 1000.

### Extraire une page d'un PDF sans l'interface du lecteur

Chrome affiche les PDF dans un lecteur dont il faut retirer la barre d'outils et le volet
de vignettes. La géométrie n'est prévisible qu'en forçant le zoom sur la largeur :

```bash
node scripts/capture-url.mjs "file:///chemin.pdf#page=2&zoom=page-width" sortie.png 1400 1600
```

La page occupe alors exactement `left: 320, top: 60, width: 1080`, sur une hauteur de
`1080 × hauteur / largeur` lues dans le `/MediaBox` du PDF. Sans `zoom=page-width`, le
lecteur cale tantôt sur la largeur tantôt sur la hauteur et le découpage devient faux.

Les cadres sont produits aux dimensions finales — 1600 × 1000 pour les couvertures,
1200 × 900 pour les galeries — parce que la page applique `object-cover` : une image au
mauvais rapport serait rognée en son centre.

Le faire-part porte les prénoms d'un couple. Le lieu de la cérémonie et celui de la
réception ont été retirés au recadrage : le travail graphique est montré en entier, les
coordonnées de l'événement ne sont pas publiées.

## Reste à fournir

| Fichier | Cadrage |
| --- | --- |
| `ia-01-audit-rapport.png` | Rapport d'audit GEO d'une page réelle : score /100, les 8 axes et leurs preuves. Demande de lancer un audit (consomme des crédits API) |
| `web-01-poribal-metas.png` | Tableau des title et méta-descriptions rédigés page par page pour Poribal |
| `contenu-02-croissance.png` | Courbe d'abonnés février – août 2026, dates et valeurs lisibles |

Aucun de ces trois fichiers ne laisse d'espace vide dans la page : les cartes concernées
sont déjà illustrées. Ce sont des compléments, pas des manques.

## Optionnel

| Fichier | Cadrage |
| --- | --- |
| `portrait-priscile-ngandjui-donfack.jpg` (dans `public/`) | Portrait cadrage serré, format 4/5. Active le visuel du hero via `identity.portrait` |

## Régénérer les captures de l'outil SEO / GEO

```bash
npm run capture:seo
```

Le script démarre Chrome en headless, ouvre l'outil sur `http://localhost:3000`, ouvre un
article déjà enregistré (aucun appel API payant) et écrit les trois PNG dans
`public/captures/`. L'outil doit tourner en local au préalable.
