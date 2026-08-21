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

- **Réalisations** — quatre domaines : IA & automatisation, SEO & visibilité,
  SEO & création de site web, Contenu / photo / vidéo, Design & identité visuelle. Chaque domaine porte ses outils
  en tags, chaque réalisation tient en un visuel, un résultat, ses chiffres et un
  **espace commentaire** en bas de carte (l'employeur et la période sont là, pas dans
  une section « expériences »).
- **Projets personnels** — ce qui a été construit sans commande.
- Le récit long (contexte, action, détail technique, captures) est dans la vue détaillée,
  qui s'ouvre à la demande sur les quatre réalisations qui en ont une.

L'ordre des domaines n'est pas neutre : IA & automatisation d'abord, parce que le point
de différenciation est de construire les outils, pas seulement de produire les contenus.

## Mise en ligne

Le site est publié sur **https://portfolioprisciledonfack.netlify.app**, reconstruit à
chaque `git push` : Netlify lance `npm run build:ia` et publie `dist-ia/`.

L'adresse du site vit dans `.env.ia` (`VITE_URL`), reprise par `index.html` via les repères
`%VITE_*%` pour le lien canonique et les aperçus de partage. Si le sous-domaine Netlify
change, corriger cette ligne suffit.

**Structure de la page** : accueil, méthode, réalisations, projets personnels, ce que je
cherche, contact.

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
    Hero, Approach, Work (réalisations + projets), RealizationCard, RealizationModal,
    Media, Search, Contact, Nav, Reveal, SectionHeader, Icon
```

## Choix techniques

- React 19 + Vite + TypeScript + Tailwind v4. Aucune librairie d'animation.
- Polices auto-hébergées (Archivo Variable pour le titrage, Inter Variable pour le corps) :
  aucune requête vers un domaine tiers.
- Apparitions au scroll via `IntersectionObserver`, survols sous 200 ms, tout est neutralisé
  sous `prefers-reduced-motion: reduce`.
- Vue détaillée en `<dialog>` natif : piège de focus, `Échap` et fond modal gérés par le
  navigateur.
- Pas de formulaire de contact : trois canaux directs et deux boutons. Un formulaire qui
  se contente d'ouvrir la messagerie ajoute trois champs à remplir pour rien.

## Chiffres

**Plus aucun chiffre d'illustration : `src/data/content.ts` ne contient plus une seule
valeur marquée `// EXEMPLE`.** Chaque nombre affiché est relevé sur une source réelle.

| Domaine | Source du chiffre |
| --- | --- |
| IA & automatisation | Code de l'outil, canevas n8n en production, Gmail |
| SEO & création de site web | Pages en ligne, tableaux de suivi |
| Contenu, photo & vidéo | Compte Instagram public @renovtaloc |
| Design & identité visuelle | Fichiers livrés, comptés un par un |
| Projets personnels | Profil TikTok public @priscile_donfack |

Le « 10+ clients » de la carte freelance vient du CV, pas d'un décompte de fichiers.

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

Lighthouse sur le site en ligne : performance 99, accessibilité 100, bonnes pratiques 100,
SEO 100. Aucun point ouvert, LCP à 1,7 s.

Aucun débordement horizontal à 375, 768 et 1440 px. Hiérarchie de titres h1 → h4 sans saut,
12 images pour 12 attributs alt.
