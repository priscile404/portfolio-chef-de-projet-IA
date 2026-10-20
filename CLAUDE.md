# CLAUDE.md — Portfolio de Priscile Ngandjui Donfack

> Ce fichier existe parce que le dossier parent (`Downloads/CLAUDE.md`) décrit **SEO Engine**,
> un tout autre projet, en JavaScript vanilla sans framework. Sans ce fichier-ci, une session
> ouverte sur le portfolio hérite de consignes fausses.

## Objectif

Portfolio one page. But unique : obtenir un entretien pour une **alternance, rentrée
septembre 2026, 12 mois**. Deux actions comptent — cliquer « Me contacter » ou télécharger
le CV. Tout le reste sert ces deux-là.

En ligne sur **https://portfolioprisciledonfack.netlify.app**
Source : https://github.com/priscile404/portfolio-chef-de-projet-IA

## Règles absolues

Elles ne se discutent pas et priment sur toute considération esthétique.

1. **Aucune mention du parcours scolaire.** Ni niveau d'études, ni diplôme, ni nom d'école,
   ni année, ni promotion. Aucune allusion indirecte non plus : « étudiante », « junior »,
   « en formation », « jeune diplômée » sont interdits. Le JSON-LD n'a pas de champ
   `education`.
2. **Captures réelles uniquement.** Jamais une reconstitution présentée comme une capture.
   Si un visuel n'existe pas, la carte est retirée — elle n'est pas illustrée autrement.
3. **Chaque chiffre affiché vient d'une source réelle**, relevée et vérifiable. Aucun
   chiffre d'illustration ne subsiste dans `src/data/content.ts`.
4. **Ne jamais inventer ni extrapoler** sur son parcours. Formulation voulue par elle :
   « je suis juste une personne qui aime apprendre ». Pas de storytelling héroïque.
5. **RénovtaLoc est un contrat terminé.** En parler au passé, et jamais dans les sections
   qui parlent d'elle (méthode, ce que je cherche).
6. **Ne jamais aller chercher des visuels « similaires » sur internet** pour combler un
   manque. Demandé deux fois, refusé deux fois.

## Publication

**`git push` publie le site en ligne dans la minute** — Netlify reconstruit à chaque push,
à l'adresse qu'elle envoie à des entreprises et des écoles. Un push n'est pas un geste de
versionnage, c'est une publication.

- Committer en local après chaque modification validée, format conventionnel, message en
  français sans accents (comme l'historique).
- **Ne jamais pousser sans autorisation explicite** dans le message courant (« publie »,
  « tu peux mettre en ligne »).
- Lui donner la prévisualisation locale pour relecture, et enchaîner les allers-retours
  jusqu'à ce qu'elle valide.

## Lancer le projet

| Commande | Effet |
| --- | --- |
| `npm run dev -- --mode ia` | Développement, rechargement à chaud, http://localhost:5173 |
| `npm run build:ia` | Build de production dans `dist-ia/` — c'est celui que Netlify lance |
| `npm run preview:ia` | Sert `dist-ia/` sur le port 4310 |
| `npm run og` | Régénère `public/og-image.png` (1200 × 630) |

La prévisualisation est déclarée dans `.claude/launch.json` (profil `ia` — sans lui, les
repères `%VITE_*%` ne sont pas substitués et l'onglet affiche `%VITE_TITRE%`).

## Stack

React 19 + Vite 8 (rolldown, **pas esbuild**) + TypeScript + Tailwind v4 (`@theme`,
`@utility`, aucun fichier de configuration). Police Kanit auto-hébergée, **sous-ensemble
latin uniquement**. Fenêtres de détail en `<dialog>` natif. Apparitions au défilement en
`IntersectionObserver` avec repli à 2 s.

## Où vit le contenu

**Tout le texte affiché est dans `src/data/content.ts`**, typé par `src/data/types.ts`.
Aucun contenu éditorial n'est écrit en dur dans les composants.

L'intitulé du poste vit à **six endroits qui doivent rester d'accord** :
`identity.eyebrow` et `mail.subject` (`content.ts`) ; `VITE_POSTE`, `VITE_TITRE`,
`VITE_DESCRIPTION` (`.env.ia`) ; la ligne `description` du JSON-LD (`index.html`) ; et les
trois lignes de texte de `scripts/build-og-image.mjs` (à regénérer avec `npm run og`).

Intitulé actuel : **« Assistante marketing digitale et IA »** (2026-10-14).

## Structure actuelle — 7 blocs

| # | Bloc | Contenu |
| --- | --- | --- |
| 1 | Accueil | nom, intitulé, 1 phrase, 2 boutons, portrait + bandeau de 3 repères |
| 2 | Bandeau défilant | frise de visuels, purement décorative |
| 3 | Méthode | 1 phrase d'accroche + 3 principes |
| 4 | Réalisations | 4 domaines, 10 cartes |
| 5 | Projets personnels | 1 carte |
| 6 | Ce que je cherche | 4 critères |
| 7 | Contact | 3 canaux + 2 boutons |

Domaines du bloc 4, **dans cet ordre** (il suit l'intitulé : le marketing devant,
l'automatisation ensuite) : Contenu photo & vidéo (2), SEO & création de site web (2),
Design & identité visuelle (3), Automatisation & IA (3).

Totaux : **11 cartes**, **11 vues détaillées** en modale, 29 chiffres, 76 étiquettes
d'outils, 65 captures dans `public/captures`.

## Direction visuelle actuelle

Thème **clair** (demandé explicitement), ponctué de **bandes sombres** (`.sombre`, qui
redéfinit les variables de thème — toutes les classes pointent sur des `var()`, donc une
section bascule sans dupliquer une règle). Accent **orange rouille `#c2410c`** sur fond
clair, **`#ff7a2f`** sur fond sombre. Titres bicolores via `*mot*` dans le contenu, rendus
par `SectionHeader`. Grain de pellicule, lumière directionnelle et vignettage dans les
bandes sombres. Trois objets 3D à transparence réelle dans `public/objets/`.

**Tous les rapports de contraste sont vérifiés ≥ 4,5:1 avant d'être posés**, sur les deux
fonds. C'est une contrainte, pas une préférence.

## Chantier en cours

**Refonte complète** : nouvelle direction artistique, nouveau style d'interface. Elle
fournira la matière. Les 11 cartes et les 11 vues détaillées sont la matière à
redistribuer. Deux pistes déjà évoquées : fusionner **Méthode** et **Ce que je cherche**
(les deux parlent d'elle et s'enchaînent mal), et supprimer le **bandeau défilant** (aucune
information).

## Points ouverts

- **LinkedIn vérifié le 2026-10-15** : `linkedin.com/in/priscile-donfack-88705b2b0`.
- **Téléphone `07 66 16 74 58`** : repris de la maquette d'origine, **jamais vérifié**
  (il figure aussi sur son CV du 2026-10-14).
- **« Chargé » ou « Chargée »** : masculin retenu faute de confirmation, une lettre à
  changer.
- Les deux cartes « Projet interne » (chaîne éditoriale, veille) : à elle ou à RénovtaLoc ?
- Faire-part de mariage : consentement des mariés obtenu ?
- Proposé et non retenu : mouvement de caméra au défilement (parallaxe).

## Pièges rencontrés, à ne pas refaire

- **`.gitignore`** doit garder `!.env.ia` après `.env.*`, sinon Netlify publie une page où
  les `%VITE_*%` restent visibles.
- **Captures pleine page** : `captureBeyondViewport` rend toujours la page entière — pour
  isoler une section il faut `clip` en coordonnées absolues. Penser aussi à neutraliser la
  barre collante, à étirer le grain et le fond (tous deux `fixed`), à forcer le chargement
  des images différées et à faire défiler la page avant de déclencher.
- **Le grain** doit être en `mix-blend-mode: overlay` : en fondu normal il remonte les
  noirs et tout devient gris sale.
- **Les sources lumineuses** se placent avant le vignettage dans `background-image` (la
  première couche est la plus proche), sinon le vignettage les efface.
- **Mesurer Lighthouse machine propre** : des processus Chrome résiduels ont déjà fait
  passer la performance de 94 à 79 sans aucune régression réelle.
- Le portrait a été étalonné (`public/portrait-etalonne.jpg`) ; l'original est conservé.
  Une bichromie avait été essayée puis rejetée : **elle éclaircissait son teint**.

## Mesures de référence

Lighthouse sur le build de production : **performance 93-94, accessibilité 100, bonnes
pratiques 100, SEO 100**. LCP 2,8 s, CLS 0. Aucun débordement horizontal à 375, 768 et
1440 px. Hiérarchie de titres h1 → h4 sans saut. Toute refonte doit tenir ces chiffres.
