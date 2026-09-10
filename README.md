# Portfolio — Priscile Ngandjui Donfack

Portfolio one page. Objectif unique : obtenir un entretien (clic sur « Me contacter » ou
téléchargement du CV).

## Lancer le projet

```bash
npm install
npm run dev
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement (http://localhost:5173) |
| `npm run build:ia` | Build de production dans `dist-ia/` — c'est celui que Netlify lance |
| `npm run preview:ia` | Sert `dist-ia/` sur le port 4310 |
| `npm run build` | Build simple dans `dist/` (profil IA par défaut) |
| `npm run og` | Régénère `public/og-image.png` (1200 × 630) |

## Où modifier le contenu

**Tout le texte affiché est dans `src/data/content.ts`.** Aucun contenu éditorial n'est écrit
en dur dans les composants. Le fichier est typé par `src/data/types.ts` : une faute de
structure est signalée par `npm run build`.

Les balises `<title>`, meta, Open Graph et les données structurées schema.org sont dans
`index.html`.

## Parti pris éditorial

Ce n'est pas un CV mis en page. La page ne contient **aucune frise d'expériences** :
elle montre des **réalisations classées par compétence**, puis les projets personnels.

- **Réalisations** — quatre domaines, dans cet ordre : Contenu / photo / vidéo,
  SEO & création de site web, Design & identité visuelle, Automatisation & IA. Chaque domaine porte ses outils
  en tags, chaque réalisation tient en un visuel, un résultat, ses chiffres et un
  **espace commentaire** en bas de carte (l'employeur et la période sont là, pas dans
  une section « expériences »).
- **Projets personnels** — ce qui a été construit sans commande.
- Le récit long (contexte, action, détail technique, captures) est dans la vue détaillée,
  qui s'ouvre à la demande sur les quatre réalisations qui en ont une.

L'ordre des domaines n'est pas neutre : il suit l'intitulé du poste, « chef de projet
marketing et automatisation ». Le marketing digital passe devant — c'est le métier visé —
et l'automatisation vient en second, comme ce qui distingue la candidature une fois le
marketing établi. La page a d'abord été construite dans l'ordre inverse ; cet ordre-la
mettait l'IA au premier plan et noyait le marketing.

## Mise en ligne

Le site est publié sur **https://portfolioprisciledonfack.netlify.app**, reconstruit à
chaque `git push` : Netlify lance `npm run build:ia` et publie `dist-ia/`.

L'adresse du site vit dans `.env.ia` (`VITE_URL`), reprise par `index.html` via les repères
`%VITE_*%` pour le lien canonique et les aperçus de partage. Si le sous-domaine Netlify
change, corriger cette ligne suffit.

**Structure de la page** : accueil, méthode, réalisations, projets personnels, ce que je
cherche, contact.

L'intitulé du poste vit à trois endroits qui doivent rester d'accord : `identity.eyebrow`
et `mail.subject` dans `src/data/content.ts`, `VITE_POSTE` / `VITE_TITRE` / `VITE_PROMESSE`
dans `.env.ia` (titre de l'onglet et aperçus de partage), et les trois lignes de texte de
`scripts/build-og-image.mjs` (image de partage, à regénérer avec `npm run og`).

La section « Comment je travaille » (`Approach.tsx`) est la seule en texte suivi : une
colonne de lecture, le reste de la largeur laissé libre. Elle rompt volontairement le
rythme des grilles — sans elle, onze cartes au même format se lisent comme un gabarit et
aucune voix ne se dégage de la page.

Le nombre de colonnes d'un domaine suit son nombre de cartes : trois cartes → trois
colonnes, deux cartes → deux colonnes. Aucune cellule vide, jamais.

## Structure

```
index.html            meta, Open Graph, JSON-LD Person (sans champ education)
public/
  cv-priscile-ngandjui-donfack.pdf   CV servi depuis le site
  og-image.png / og-image.svg        image de partage
  favicon.svg, robots.txt
  captures/                          visuels des cartes et des modales
docs/captures.md        liste des visuels a fournir et cadrages
src/
  data/content.ts     tout le contenu éditorial
  data/types.ts       types du contenu
  lib/mailto.ts       lien mailto avec objet pré-rempli
  components/
    Fond (fond animé), Hero, Approach, Work (réalisations + projets), RealizationCard,
    RealizationModal, Media, Magnet, Marquee, Objet3D, Search, Contact, Nav, Reveal,
    SectionHeader, Icon
```

## Choix techniques

- React 19 + Vite + TypeScript + Tailwind v4.
- Page claire et chaude, facon papier : #F6F4F0, cartes blanches, texte #16130F.
  Un seul accent, un orange rouille #C2410C. L'orange vif des references (#E8590C)
  ne passe qu'a 3,3:1 en texte sur clair : il est reserve aux bandes sombres, ou il
  monte a 7,4:1. Les dix-sept rapports de contraste des deux fonds sont calcules
  avant d'etre poses, le plus faible est a 4,7:1.
- **Bandes sombres** (`.sombre` dans `index.css`) : la classe redefinit les memes
  variables de theme (`--color-ink`, `--color-chalk`, `--color-accent`...). Comme
  Tailwind v4 compile `text-chalk` en `color: var(--color-chalk)`, une section
  entiere bascule en sombre sans dupliquer une seule regle ni ajouter une prop aux
  composants. Deux bandes : bandeau + methode, puis contact + pied de page.
  L'ombre de carte passe par la meme mecanique (`--ombre-carte`), car sur fond
  sombre une ombre portee ne se voit pas : c'est le filet qui detache la carte.
- **Titres bicolores** : un fragment entoure d'asterisques dans `content.ts`
  (`Comment je *travaille*`) est rendu dans la couleur d'accent par `SectionHeader`.
  Un asterisque non ferme est rendu tel quel, sans casser le titre.
- Police Kanit auto-hebergee, **sous-ensemble latin uniquement** — charger tous les
  sous-ensembles (thai, vietnamien) coutait 60 Ko pour rien.
- Trois objets 3D dans `public/objets/` (torus, sphere, spirale, 600 x 600, ~90 Ko
  chacun), generes dans Higgsfield. Aucune librairie 3D. Deux traitements successifs :
  1. Les rendus arrivent composites sur fond noir, sans canal alpha. L'opacite est
     reconstruite depuis la luminance (`a = max(r,g,b)`, puis de-multiplication). Un
     `mix-blend-mode: screen` aurait suffi sur fond sombre mais fait disparaitre les
     objets sur fond clair.
  2. Passage au orange par **duotone** : la couleur d'origine est jetee, seule la
     luminance est conservee et projetee sur une rampe orange, ce qui preserve les
     ombres et les reflets. Une rotation de teinte avait ete essayee d'abord et
     echoue — les objets portent plusieurs teintes, la sphere virait au vert.
- Fond anime (`Fond.tsx`) : trois taches de couleur floutees qui derivent sur 28 a 40 s
  derriere toute la page. Calque `fixed`, anime uniquement en `transform` — l'animation
  reste sur le compositeur, CLS a 0. Mesure : 45 % des pixels changent en 4 s, et 0 %
  sous `prefers-reduced-motion`.
- Le bandeau défilant utilise des vignettes de 480 × 300 générées depuis
  `public/captures` vers `public/bandeau` : 20 fichiers, 217 Ko au total. En pleine
  résolution le LCP passait de 2,8 à 3,8 s.
- Effet magnétique et révélation lettre par lettre écrits à la main, neutralisés sous
  `prefers-reduced-motion` et sur les appareils tactiles.
- Pas de formulaire de contact : trois canaux directs et deux boutons.

## Chiffres

**Plus aucun chiffre d'illustration : `src/data/content.ts` ne contient plus une seule
valeur marquée `// EXEMPLE`.** Chaque nombre affiché est relevé sur une source réelle.

| Domaine | Source du chiffre |
| --- | --- |
| Contenu, photo & vidéo | Compte Instagram public @renovtaloc |
| SEO & création de site web | Pages en ligne, tableaux de suivi |
| Design & identité visuelle | Fichiers livrés, comptés un par un |
| Automatisation & IA | Code de l'outil, canevas n8n en production, Gmail |
| Projets personnels | Profil TikTok public @priscile_donfack |

## Autres éléments à compléter

- Vérifier le numéro de téléphone et l'URL LinkedIn dans `src/data/content.ts`
  (repris de la maquette fournie, non vérifiés).
- **Aucun emplacement vide** : toutes les cartes et toutes les vues détaillées sont illustrées
  par des captures réelles. Les cartes qui ne pouvaient pas l'être ont été retirées.
  (outil SEO/GEO, canevas n8n, Google Sheets, Gmail, site Poribal, tableaux SEO, Instagram, stratégie). Liste, cadrages et source de chacun
  dans `docs/captures.md`.
- Portrait optionnel du hero : champ `identity.portrait` dans `src/data/content.ts`
  (laisser `null` pour un hero purement typographique).
- Régénérer `public/og-image.png` avec `npm run og` après toute modification de la baseline.

## Mesures

Lighthouse sur le build de production : performance 94, accessibilite 100, bonnes
pratiques 100, SEO 100. Aucun point ouvert, LCP a 2,8 s, CLS a 0,001.
Contraste conforme sur les sections claires comme sur les bandes sombres.

Aucun debordement horizontal a 375, 768 et 1440 px. Hierarchie de titres h1 vers h4
sans saut.
