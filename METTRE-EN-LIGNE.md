# Mettre le portfolio en ligne

Deux dossiers sont prêts, identiques sauf le positionnement :

| Dossier | Archive | Positionnement |
| --- | --- | --- |
| `dist-ia/` | `portfolio-chef-de-projet-ia.zip` | Chef de projet IA |
| `dist-marketing/` | `portfolio-marketing-digital.zip` | Marketing digital & IA |

## La méthode la plus rapide : Netlify Drop

1. Aller sur **https://app.netlify.com/drop**
2. **Glisser le dossier `dist-ia`** (le dossier entier, pas le zip) dans la zone prévue.
   Le site est en ligne en quelques secondes, sur une adresse du type
   `nom-aleatoire-123.netlify.app`.
3. Créer un compte gratuit quand il est proposé — sinon le site expire.
4. Dans **Site configuration → Change site name**, mettre **`priscile-donfack`**.
   L'adresse devient `https://priscile-donfack.netlify.app`.
5. Recommencer avec `dist-marketing` pour le second portfolio, sous un autre nom
   (par exemple `priscile-donfack-marketing`).

L'étape 4 compte : l'adresse est déjà inscrite dans les métadonnées du site
(`VITE_URL` dans `.env.ia`). Si un autre nom est choisi, il faut le reporter dans
`.env.ia` et `.env.marketing`, puis relancer `npm run build:tous`.

## Autres hébergeurs

- **Vercel** — https://vercel.com, même principe de glisser-déposer après connexion.
- **Cloudflare Pages** — https://pages.cloudflare.com, gratuit, très rapide en Europe.
- **Un nom de domaine à soi** — `priscile-donfack.fr` coûte une dizaine d'euros par an
  et se branche sur Netlify en cinq minutes. C'est ce qui fait la meilleure impression
  sur une candidature.

## Avant d'envoyer le lien

- [ ] Vérifier le numéro de téléphone et l'adresse LinkedIn dans `src/data/content.ts` :
      ils viennent de la maquette d'origine et n'ont jamais été confirmés.
- [ ] Le CV PDF servi par le site est celui de `public/cv-priscile-ngandjui-donfack.pdf`.
      Le remplacer s'il a changé.
- [ ] Le faire-part de mariage montré dans les créations graphiques porte les prénoms
      d'un couple. Le lieu et l'heure ont été retirés au recadrage, mais les prénoms
      restent visibles.

## Ce que la mise en ligne rend public

Adresse mail, numéro de téléphone, portrait, et les noms des clients cités
(RénovtaLoc, Poribal Group, Meji Foods, Dupond & Durand). C'est l'usage normal d'un
portfolio, mais autant le savoir avant d'appuyer.
