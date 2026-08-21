import type { SiteContent } from './types';

/**
 * Contenu editorial du portfolio.
 * Editable sans toucher au code des composants.
 *
 * STRUCTURE
 * Pas de frise d’experiences : la page ne montre que des realisations, classees par
 * competence (SEO, IA, design, contenu / video), puis les projets personnels.
 * L’employeur et la periode apparaissent dans l’espace commentaire, en bas de chaque carte.
 *
 * REGLE D’ECRITURE
 * Un portfolio montre. Une carte = un visuel, un resultat, un commentaire.
 * Le recit long reste dans la vue detaillee (modale), qui est optionnelle.
 *
 * CONVENTION DE RELECTURE
 * Les valeurs suivies du commentaire `// EXEMPLE` sont des chiffres d’illustration,
 * pas des donnees mesurees. Ils doivent etre remplaces par les chiffres reels avant
 * toute mise en ligne. Liste complete dans le README, section « Chiffres a valider ».
 * Les autres chiffres (600 abonnes, 33 000 abonnes, 3 aout 2026, 10 pages, 10 clients)
 * viennent du CV et sont a conserver tels quels.
 *
 * IMAGES
 * Chaque `MediaSlot` a `src: null` tant que le fichier n’est pas fourni : un encadre
 * hachure decrivant le cadrage attendu s’affiche a la place. Deposer le fichier dans
 * `public/captures/` puis ecrire `src: '/captures/nom-du-fichier.png'`.
 */
export const content: SiteContent = {
  identity: {
    firstName: 'Priscile',
    lastName: 'Ngandjui Donfack',
    monogram: 'PND',
    eyebrow: 'Chef de projet IA',
    statement:
      "Je pilote des projets IA du cadrage à la mise en production, jusqu’à l’outil que l’équipe utilise vraiment.",
    portrait: {
      src: '/portrait-priscile-ngandjui-donfack.jpg',
      alt: 'Portrait de Priscile Ngandjui Donfack',
    },
  },

  nav: {
    links: [
      { id: 'methode', label: 'Méthode' },
      { id: 'realisations', label: 'Réalisations' },
      { id: 'projets', label: 'Projets personnels' },
      { id: 'recherche', label: 'Ce que je cherche' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Me contacter',
  },

  cv: {
    href: '/cv-priscile-ngandjui-donfack.pdf',
    label: 'Télécharger le CV (PDF)',
  },

  mail: {
    address: 'priscillengandjui@gmail.com',
    subject: 'Alternance chef de projet IA — septembre 2026',
    body: "Bonjour Priscile,\n\nJe vous contacte au sujet d’une alternance à partir de septembre 2026.\n\n",
  },

  availability: [
    { icon: 'calendar', label: 'Rentrée', value: 'Septembre 2026' },
    { icon: 'clock', label: 'Durée', value: '12 mois' },
    { icon: 'repeat', label: 'Rythme', value: '3 semaines en entreprise / 1 semaine hors entreprise' },
    { icon: 'pin', label: 'Zone', value: 'France entière' },
  ],

  approach: {
    title: 'Comment je travaille',
    intro:
      'J’aime apprendre, et j’apprends en construisant. Sur ma dernière mission, j’ai produit les contenus et construit l’outil qui servait à les produire.',
    paragraphs: [
      {
        emphasis: 'Cadrer d’abord.',
        body: 'Savoir ce qu’on cherche, et à quoi on verra qu’on y est arrivé.',
      },
      {
        emphasis: 'Faire simple.',
        body: 'La chaîne éditoriale enchaîne trois workflows, mais rien ne part sans un clic humain.',
      },
      {
        emphasis: 'Mettre en production.',
        body: 'L’outil a été mis en ligne le 3 août 2026 et remis à l’équipe.',
      },
    ],
    closing: 'Les chiffres de cette page sont relevés, pas estimés.',
  },

  work: {
    title: 'Réalisations',
    lead: 'Ce qui a été livré, et ce que ça a produit.',
    detailLabel: 'Voir le détail',
    closeLabel: 'Fermer',
    commentLabel: 'Commentaire',
    groups: [
      {
        id: 'ia',
        title: 'IA & automatisation',
        tools: ['API Claude', 'n8n', 'Node.js', 'Make', 'Lovable', 'Supabase', 'ChatGPT', 'ElevenLabs', 'Kling'],
        items: [
          {
            id: 'app-seo-geo',
            title: 'Application de génération de contenu SEO et d’audit GEO',
            image: {
              src: '/captures/ia-01-app.png',
              alt: "Écran principal de l’application SEO/GEO RénovtaLoc, onglet générateur d’articles",
              framing:
                "captures/ia-01-app.png — écran principal de l’application, format 16/10, 1600 px de large",
            },
            result: "Outil interne remis à l’équipe, mis en production le 3 août 2026.",
            comment: 'RénovtaLoc · 2026 · conçue et développée seule, mise en production le 3 août',
            tags: ['Node.js', 'API Claude', 'SEO', 'GEO / AEO'],
            metrics: [
              { value: '17', label: 'articles générés et enregistrés' },
              { value: '8', label: 'axes d’audit notés avec preuve' },
              { value: '4', label: 'moteurs génératifs interrogés' },
            ],
            detail: {
              intro:
                "Un outil interne, pas une démonstration : il a été déployé en ligne et sert à produire et auditer les contenus avant publication.",
              context:
                'La production des pages reposait sur un travail manuel, sans méthode partagée ni contrôle avant publication.',
              action:
                "J’ai conçu et développé une application Node.js en trois modules — générateur d’articles, audit d’article GEO, audit de site GEO — déployée en ligne et utilisée par l’équipe.",
              blocks: [
                {
                  heading: 'La génération',
                  body: "À partir d’un mot-clé : titre, méta-description, hiérarchie des titres, mots-clés secondaires, et maillage interne construit sur les vraies URL du site lues dans le sitemap. Les pages déjà publiées sont analysées avant chaque génération pour éviter les doublons. Un panneau distingue les mots-clés recherchés effectivement présents dans le texte de ceux qui manquent.",
                },
                {
                  heading: 'L’audit GEO',
                  body: "Huit axes notés sur 5 — visibilité IA, citabilité, clarté sémantique, couverture d’intention, entités et preuves, structure et balisage, autorité, benchmark concurrentiel — plus cinq vérifications déterministes (structure extractible, données structurées, FAQ, sources, fraîcheur). Chaque note porte une preuve : une valeur mesurée ou une citation vérifiée, jamais un avis.",
                },
                {
                  heading: 'Les limites assumées',
                  body: "L’application ne publie rien seule et l’audit signale les manques sans les corriger. Le choix des sujets et la relecture restent humains.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/ia-01-generation.png',
                  alt: "Article généré : panneau des mots-clés SEO utilisés et corps de l’article",
                  framing:
                    "captures/ia-01-generation.png — article généré, panneau mots-clés et corps de l’article visibles, 1600 px.",
                },
                {
                  src: '/captures/ia-01-audit-formulaire.png',
                  alt: "Module d’audit GEO de l’application, avant lancement",
                  framing:
                    "captures/ia-01-audit-formulaire.png — module d’audit d’article GEO, 1600 px.",
                },
              ],
            },
          },
          {
            id: 'chaine-editoriale',
            title: 'Chaîne éditoriale semi-automatisée',
            image: {
              src: '/captures/ia-02-canevas.png',
              alt: 'Canevas n8n de la chaîne éditoriale : les trois sous-workflows',
              framing:
                'captures/ia-02-canevas.png — canevas n8n entier, les 3 sous-workflows visibles, 1600 px.',
            },
            result:
              'Aucune production de contenu ne démarre sans un clic de validation humaine.',
            comment: 'Projet interne · 2026 · workflow n8n de 34 nœuds, en production',
            tags: ['n8n', 'Perplexity', 'GPT-5', 'Google Sheets', 'Gmail'],
            metrics: [
              { value: '3', label: 'sous-workflows enchaînés' },
              { value: '5', label: 'canaux déclinés depuis un contenu maître' },
              { value: '0', label: 'publication sans validation humaine' },
            ],
            detail: {
              intro:
                "Une chaîne qui propose, attend une décision, puis produit. La validation humaine n’est pas une option de confort : c’est une étape du workflow, sans laquelle rien ne se déclenche.",
              context:
                "Trouver des sujets, les évaluer, puis produire les déclinaisons par canal prenait un temps disproportionné par rapport au résultat publié.",
              action:
                "J’ai monté un workflow n8n de 34 nœuds en trois étages : recherche et scoring des opportunités, décision humaine par clic, puis production de contenu déclinée par canal.",
              blocks: [
                {
                  heading: 'Étage 1 — proposer',
                  body: "Un sujet entre par un formulaire ou par la planification. Une recherche Perplexity sourcée alimente un scoring GPT-5 nano. L’opportunité est écrite dans un Google Sheets avec un jeton, puis un mail part avec deux liens : valider ou rejeter.",
                },
                {
                  heading: 'Étage 2 — décider',
                  body: "Le clic tombe sur un webhook qui relit la ligne et vérifie le jeton. Un lien déjà utilisé renvoie « ce lien n’est plus valide » au lieu de rejouer l’action : chaque décision ne peut être prise qu’une fois. Un rejet met à jour le statut et s’arrête là.",
                },
                {
                  heading: 'Étage 3 — produire',
                  body: "Seule la branche « valider » déclenche la production : un contenu maître GPT-5, puis les déclinaisons LinkedIn, TikTok, YouTube, newsletter et Instagram, écrites dans la feuille de sortie. Le navigateur répond « contenu en cours de génération ».",
                },
                {
                  heading: 'Ce qui a cassé',
                  body: "Le pipeline a échoué dix nuits d’affilée avant d’être corrigé le 16 août 2026. Depuis, quatre exécutions consécutives ont abouti sans erreur. C’est le genre de détail qu’on ne voit pas sur une démo : un workflow qui tourne, ça se surveille et ça se répare.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/ia-02-sheet.png',
                  alt: 'Feuille Google Sheets de suivi des opportunités de contenu',
                  framing:
                    'captures/ia-02-sheet.png — Google Sheets, colonnes sujet, score, statut et déclinaisons par canal lisibles, 1600 px.',
                },
              ],
            },
          },
          {
            id: 'veille-quotidienne',
            title: 'Veille quotidienne automatisée',
            image: {
              src: '/captures/ia-03-veille-canevas.png',
              alt: 'Canevas n8n du workflow de veille quotidienne',
              framing:
                'captures/ia-03-veille-canevas.png — canevas n8n entier, les 6 nœuds et leurs libellés, 1600 px.',
            },
            result:
              'Un brief de veille sourcé, livré chaque matin à 06h30 sans aucune intervention.',
            comment: 'Projet interne · 2026 · workflow n8n mis en service le 16 août',
            tags: ['n8n', 'Perplexity', 'Gmail', 'Automatisation'],
            metrics: [
              { value: '06h30', label: 'brief livré chaque matin' },
              { value: '2', label: 'radars sourcés en parallèle' },
              { value: '0', label: 'publication automatique : décision humaine' },
            ],
            detail: {
              intro:
                "L’automatisation sert la cadence. Elle ne choisit pas les sujets et ne publie rien : elle livre une matière première sourcée, chaque matin, à heure fixe.",
              context:
                'La veille arrivait de sources dispersées et dépendait entièrement du temps disponible pour la faire.',
              action:
                "J’ai monté un workflow n8n déclenché chaque matin à 06h30 : deux radars Perplexity en parallèle, fusion des sorties, mise en forme, envoi du brief par Gmail.",
              blocks: [
                {
                  heading: 'Deux radars, deux périmètres',
                  body: "Le premier suit les sorties produit IA et automatisation sur 48 heures. Le second cherche des descriptions de processus cassés en TPE, PME et agences, avec pour chacun le processus actuel étape par étape et les étapes automatisables. Les deux tournent en parallèle et sont fusionnés avant mise en forme.",
                },
                {
                  heading: 'La règle de source',
                  body: "Les prompts imposent la source primaire : page officielle de l’éditeur, changelog, dépôt, ou enquête avec méthodologie publiée. Les agrégateurs, newsletters tierces, fils X et vidéos sont explicitement refusés comme source finale. Une annonce qu’on ne peut pas rattacher à sa page officielle est écartée plutôt que reprise.",
                },
                {
                  heading: 'Quand ça échoue',
                  body: "Le code de mise en forme détecte une sortie vide ou trop courte et place une alerte en tête du brief plutôt que d’envoyer un mail d’apparence normale. Sur les exécutions réalisées à ce jour, toutes ont abouti à un envoi.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/ia-03-veille-mail.png',
                  alt: 'Brief de veille ouvert dans la boîte mail, reçu à 06h31',
                  framing:
                    'captures/ia-03-veille-mail.png — brief ouvert, expéditeur, heure et premières entrées sourcées visibles.',
                },
                {
                  src: '/captures/ia-03-veille-boite.png',
                  alt: 'Les briefs de veille reçus jour après jour',
                  framing:
                    'captures/ia-03-veille-boite.png — liste des briefs « Veille COS du jour », dates lisibles.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'seo',
        title: 'SEO & création de site web',
        tools: [
          'SEO on page',
          'SEO sémantique',
          'GEO / AEO',
          'Maillage interne',
          'WordPress',
          'Zoho Sites',
          'Google Analytics',
          'Excel avancé',
        ],
        items: [
          {
            id: 'site-vitrine-poribal',
            title: 'Site vitrine et identité visuelle',
            image: {
              src: '/captures/web-01-poribal.jpg',
              alt: 'Page d’accueil du site Poribal Group, en ligne',
              framing:
                'captures/web-01-poribal.jpg — page d’accueil du site en ligne, format 16/10, 1280 px de large',
            },
            result: 'Site vitrine en ligne, avec son identité visuelle et ses métadonnées rédigées page par page.',
            comment: 'Poribal Group · mai – août 2025 · poribalgroup.fr, construit sous Zoho Sites',
            tags: ['Site vitrine', 'Zoho Sites', 'Identité visuelle', 'SEO on page'],
            link: { href: 'https://www.poribalgroup.fr/', label: 'Voir le site' },
            metrics: [
              { value: '7', label: 'pages livrées, title et méta rédigés' },
            ],
            detail: {
              intro:
                "Un site qui devait exister et être trouvé : la création graphique et le référencement ont été traités ensemble, pas l’un après l’autre.",
              context:
                "L’entreprise n’avait pas de site : aucune vitrine, aucune présence dans les résultats de recherche.",
              action:
                "J’ai créé l’identité visuelle et le site vitrine, puis rédigé le title et la méta-description de chacune des sept pages autour d’un positionnement unique : « accompagnement immobilier ».",
              blocks: [
                {
                  heading: 'Un positionnement, sept pages',
                  body: "Accueil, à propos, services, projets, contact, blog, politique de confidentialité. Chaque page porte le même angle — l’accompagnement immobilier clé en main — décliné selon son intention : découvrir, comprendre l’approche, comparer les offres, voir les réalisations, prendre contact.",
                },
                {
                  heading: 'Le graphique et le SEO ensemble',
                  body: "Logo, palette et gabarits ont été conçus en même temps que la structure des pages et les métadonnées, pour éviter le scénario classique du site refait une deuxième fois parce qu’il n’a pas été pensé pour être trouvé.",
                },
                {
                  heading: 'Construit sous Zoho Sites',
                  body: "Le site est monté sous Zoho Sites, l’outil déjà en place chez le client. Travailler dans son environnement plutôt que d’imposer le mien lui laisse la main sur ses pages une fois la mission finie — et la contrainte de l’éditeur a été absorbée par les gabarits plutôt que subie page après page.",
                },
              ],
              screenshots: [],
            },
          },
          {
            id: 'seo-dupond',
            title: 'Optimisation SEO de 10 pages',
            image: {
              src: '/captures/web-02-dd-motscles.png',
              alt: 'Tableau de mots-clés : volume, concurrence, intention et page cible sur duponddurand.com',
              framing:
                'captures/web-02-dd-motscles.png — tableau de mots-clés, colonne des pages cibles visible.',
            },
            result:
              'Dix mots-clés qualifiés par volume et concurrence, puis affectés page par page.',
            comment: 'Dupond & Durand · février – avril 2025 · maroquinerie en ligne',
            tags: ['SEO on page', 'Mots-clés', 'Maillage interne', 'Reporting'],
            metrics: [
              { value: '40+', label: 'pages auditées, title et méta relevés' },
              { value: '10', label: 'pages réécrites et optimisées' },
              { value: '1 200', label: 'recherches mensuelles sur le mot-clé principal' },
            ],
            detail: {
              intro:
                "Un catalogue de maroquinerie en ligne : beaucoup de pages produits, peu de trafic. Le travail a consisté à décider quelle page devait répondre à quelle recherche.",
              context:
                'Les pages catégories se faisaient concurrence entre elles sur des requêtes proches, sans page clairement désignée pour chacune.',
              action:
                "J’ai construit un tableau de mots-clés — volume, concurrence, intention de recherche, page cible — puis réécrit le title, la méta-description et le maillage interne de dix pages.",
              blocks: [
                {
                  heading: 'Une requête, une page',
                  body: "Chaque mot-clé a été relié à une seule page cible, avec la question réelle que se pose la personne qui cherche et l’action attendue derrière. « Grand sac bandoulière femme », 1 200 recherches par mois, est le volume le plus fort du lot.",
                },
                {
                  heading: 'Le tri par concurrence',
                  body: "Chaque mot-clé est noté de 0 à 10 en concurrence : les requêtes à forte demande et faible concurrence passent en priorité, celles jugées trop disputées sont écartées ou reportées. « Sac à main croco », noté 0, porte la mention « doit être retravaillé » plutôt que d’être présenté comme un acquis.",
                },
                {
                  heading: 'Ce qu’il en reste',
                  body: "La boutique n’est plus en ligne aujourd’hui : le domaine ne résout plus. Les livrables de la mission — tableau de mots-clés, titles et méta-descriptions rédigés — restent consultables, mais les pages elles-mêmes ne sont plus vérifiables. Autant le dire plutôt que de laisser croire à un lien mort.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/web-02-dd-audit.png',
                  alt: 'Inventaire des title et méta-descriptions du catalogue, avec la colonne « à refaire »',
                  framing:
                    'captures/web-02-dd-audit.png — inventaire des balises du catalogue, colonne « à refaire » visible.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'contenu-video',
        title: 'Contenu, photo & vidéo',
        tools: [
          'Copywriting',
          'Planning éditorial',
          'Photo',
          'Vidéo',
          'Montage',
          'Instagram',
          'LinkedIn',
          'YouTube',
          'Notion',
          'Metricool',
          'Buffer',
        ],
        items: [
          {
            id: 'photo-video-chantier',
            title: 'Production photo et vidéo de chantier',
            image: {
              src: '/captures/contenu-01-reels.jpg',
              alt: 'Grille des vidéos publiées sur le compte Instagram, avec leur nombre de vues',
              framing:
                'captures/contenu-01-reels.jpg — grille des vidéos publiées, compteurs de vues visibles.',
            },
            result:
              'Onze vidéos tournées sur les chantiers, montées et publiées, la plus vue à 559 vues.',
            comment: 'RénovtaLoc · février – août 2026 · tournage et montage assurés seule',
            tags: ['Photo', 'Vidéo', 'Montage', 'Formats courts'],
            link: { href: 'https://www.instagram.com/renovtaloc/reels/', label: 'Voir les vidéos' },
            gallery: [
              { src: '/captures/photos/01-salon-double-fenetre.jpg', alt: 'Salon parisien rénové, parquet et double fenêtre', framing: '' },
              { src: '/captures/photos/02-salle-de-bain-marbre.jpg', alt: 'Salle de bain en marbre bleu avec miroir rond rétroéclairé', framing: '' },
              { src: '/captures/photos/03-cuisine-bleu-canard.jpg', alt: 'Cuisine bleu canard avec plan de travail en bois', framing: '' },
              { src: '/captures/photos/04-chambre-cheminee.jpg', alt: 'Chambre avec cheminée et parquet à chevrons', framing: '' },
              { src: '/captures/photos/05-salle-de-bain-contemporaine.jpg', alt: 'Salle de bain contemporaine, douche à l’italienne', framing: '' },
              { src: '/captures/photos/06-salon-cloison-verriere.jpg', alt: 'Salon avec cloison vitrée et parquet point de Hongrie', framing: '' },
              { src: '/captures/photos/07-cuisine-bois-blanc.jpg', alt: 'Cuisine bois et blanc ouverte sur la façade haussmannienne', framing: '' },
              { src: '/captures/photos/08-terrasse.jpg', alt: 'Cour intérieure et terrasse après travaux', framing: '' },
            ],
            metrics: [
              { value: '11', label: 'vidéos publiées' },
              { value: '559', label: 'vues sur la plus vue' },
              { value: '7', label: 'chantiers documentés' },
            ],
            detail: {
              intro:
                "Du contenu de terrain : les chantiers filmés et photographiés sur place, pas des visuels de banque d’images.",
              context:
                "L’activité était très visuelle mais jamais documentée : aucune image de chantier exploitable pour les réseaux.",
              action:
                "J’ai tourné sur les chantiers, monté les formats courts et publié chaque chantier sous son propre nom dans les stories à la une.",
              blocks: [
                {
                  heading: 'Un chantier, une story',
                  body: "Sept chantiers ont leur propre story à la une sur le compte — Seguier, Poirier, Châtelet, Triomphe, Jeuneurs, Acacias, Saxe. Chacune suit un chantier de l’état initial à la livraison, ce qui donne au visiteur une preuve de travail plutôt qu’un catalogue.",
                },
                {
                  heading: 'Le montage au service du format',
                  body: "Les vidéos publiées tiennent en formats courts verticaux : plan d’entrée, avancement, détail de finition. Les compteurs de vues sont visibles publiquement sur le compte, entre 141 et 559 vues selon les publications.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/contenu-02-social.png',
                  alt: 'Profil Instagram : abonnés et stories à la une par chantier',
                  framing:
                    'captures/contenu-02-social.png — profil Instagram, compteur d’abonnés et stories par chantier.',
                },
              ],
            },
          },
          {
            id: 'social-media-renovtaloc',
            title: 'Pilotage social media',
            image: {
              src: '/captures/contenu-02-social.png',
              alt: 'Profil Instagram RénovtaLoc : 599 abonnés et stories à la une par chantier',
              framing:
                'captures/contenu-02-social.png — profil Instagram, compteur d’abonnés et stories par chantier.',
            },
            result: 'Compte passé de presque zéro à 599 abonnés, plus les abonnés gagnés sur LinkedIn.',
            comment: 'RénovtaLoc · février – août 2026',
            tags: ['Instagram', 'LinkedIn', 'Notion', 'Planning éditorial'],
            link: { href: 'https://www.instagram.com/renovtaloc/', label: 'Voir le compte' },
            gallery: [
              { src: '/captures/renovtaloc/post-01.jpg', alt: 'Publication avant / après de chantier', framing: '' },
              { src: '/captures/renovtaloc/post-02.jpg', alt: 'Publication de chantier terminé', framing: '' },
              { src: '/captures/renovtaloc/post-03.jpg', alt: 'Publication avant / après de salle de bain', framing: '' },
              { src: '/captures/renovtaloc/post-04.jpg', alt: 'Publication de cuisine rénovée', framing: '' },
              { src: '/captures/renovtaloc/post-05.jpg', alt: 'Publication de pièce à vivre rénovée', framing: '' },
              { src: '/captures/renovtaloc/avis-clients.jpg', alt: 'Publication reprenant les avis clients', framing: '' },
              { src: '/captures/renovtaloc/infographie-philippe-auguste.jpg', alt: 'Infographie LinkedIn : fiche du projet Philippe-Auguste, 72 m²', framing: '' },
              { src: '/captures/renovtaloc/infographie-lauriston.jpg', alt: 'Infographie LinkedIn : fiche du projet Lauriston, 44 m²', framing: '' },
              { src: '/captures/renovtaloc/infographie-debelleyme.jpg', alt: 'Infographie LinkedIn : fiche du projet Debelleyme, 59 m²', framing: '' },
              { src: '/captures/renovtaloc/infographie-carnot.jpg', alt: 'Infographie LinkedIn : fiche du projet Carnot, 72 m²', framing: '' },
              { src: '/captures/renovtaloc/infographie-amelie.jpg', alt: 'Infographie LinkedIn : fiche du projet Amélie, 60 m²', framing: '' },
              { src: '/captures/renovtaloc/infographie-moscou.jpg', alt: 'Infographie LinkedIn : fiche du projet Moscou, 72 m²', framing: '' },
            ],
            metrics: [
              { value: '599', label: 'abonnés sur Instagram' },
              { value: '6', label: 'fiches projet publiées sur LinkedIn' },
              { value: '7', label: 'chantiers en stories à la une' },
            ],
            detail: {
              intro:
                "Une audience construite sur du contenu de terrain : les chantiers filmés et photographiés sur place, pas des visuels de banque d’images.",
              context:
                'Les comptes Instagram et LinkedIn partaient de presque zéro, sans ligne éditoriale ni rythme.',
              action:
                "J’ai structuré un calendrier éditorial sous Notion, tourné et monté les photos et vidéos de chantier, et publié sur les deux réseaux.",
              blocks: [
                {
                  heading: 'Une stratégie écrite avant de publier',
                  body: "Un document de stratégie de douze pages fixe le positionnement, les cibles et la répartition des contenus : avant / après 40 %, coulisses 25 %, conseils 20 %, témoignages clients 15 %. Instagram y est désigné plateforme prioritaire, avec ses formats, ses hashtags et sa ligne éditoriale.",
                },
                {
                  heading: 'Un traitement par réseau',
                  body: 'Formats courts et avant / après sur Instagram, publications de fond sur LinkedIn. Le même tournage alimente les deux, avec un montage différent.',
                },
                {
                  heading: 'Les fiches projet sur LinkedIn',
                  body: "Six infographies publiées sur la page de l’entreprise, une par chantier — Philippe-Auguste, Lauriston, Debelleyme, Carnot, Amélie, Moscou. Toutes suivent le même gabarit : surface et nombre de pièces en en-tête, avant / après, focus détails, pictogrammes des travaux réalisés, points forts du projet, coordonnées en pied. Un chantier différent à chaque fois, une lecture identique à chaque fois.",
                },
                {
                  heading: 'Résultats',
                  body: "Le compte Instagram affiche 599 abonnés aujourd’hui, en partant de presque zéro en février 2026, auxquels s’ajoutent les abonnés gagnés sur LinkedIn.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/contenu-02-strategie.png',
                  alt: 'Document de stratégie social media : piliers de contenu et formats par plateforme',
                  framing:
                    'captures/contenu-02-strategie.png — page du document de stratégie, piliers de contenu visibles.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'design',
        title: 'Design & identité visuelle',
        tools: ['Figma', 'Adobe Illustrator', 'Canva', 'WordPress'],
        items: [
          {
            id: 'identite-poribal',
            title: 'Identité visuelle Poribal Group',
            image: {
              src: '/captures/poribal/logo-horizontal.jpg',
              alt: 'Logo Poribal Group, version horizontale',
              framing: 'captures/poribal/logo-horizontal.jpg — logo en version horizontale.',
            },
            result:
              'Un logo en trois déclinaisons, une palette et des gabarits, appliqués du site aux publications.',
            comment: 'Poribal Group · mai – août 2025 · identité créée de zéro',
            tags: ['Logo', 'Palette', 'Gabarits', 'Illustrator'],
            link: { href: 'https://www.poribalgroup.fr/', label: 'Voir l’identité en ligne' },
            gallery: [
              { src: '/captures/poribal/logo-horizontal.jpg', alt: 'Logo Poribal Group, version horizontale', framing: '' },
              { src: '/captures/poribal/logo-vertical.jpg', alt: 'Logo Poribal Group, version verticale', framing: '' },
              { src: '/captures/poribal/monogramme.jpg', alt: 'Monogramme Poribal Group', framing: '' },
              { src: '/captures/poribal/site-services.jpg', alt: 'Page services du site, identité appliquée', framing: '' },
              { src: '/captures/poribal/site-projets.jpg', alt: 'Page réalisations du site, identité appliquée', framing: '' },
              { src: '/captures/poribal/site-a-propos.jpg', alt: 'Page à propos du site, identité appliquée', framing: '' },
              { src: '/captures/renovtaloc/poribal-avant-apres.jpg', alt: 'Visuel avant / après aux couleurs de la marque', framing: '' },
              { src: '/captures/renovtaloc/poribal-citation.jpg', alt: 'Visuel réseaux sociaux aux couleurs de la marque', framing: '' },
              { src: '/captures/poribal/4-facons.jpg', alt: 'Couverture du carrousel « Il n’y a pas qu’une seule façon d’investir en immobilier »', framing: '' },
              { src: '/captures/poribal/locatif.jpg', alt: 'Page intérieure du carrousel : résidentiel locatif', framing: '' },
              { src: '/captures/poribal/frais.jpg', alt: 'Carrousel sur les frais cachés d’un achat immobilier', framing: '' },
              { src: '/captures/poribal/services.jpg', alt: 'Fiche commerciale : accompagnement de projet immobilier clé à main', framing: '' },
              { src: '/captures/poribal/social-cycle-de-vie.jpg', alt: 'Infographie publiée : le cycle de vie d’un bien locatif en six étapes', framing: '' },
              { src: '/captures/poribal/social-citation.jpg', alt: 'Publication citation, fond bleu nuit et bandeau doré', framing: '' },
              { src: '/captures/poribal/social-accompagnement.jpg', alt: 'Publication d’appel à contact avec les coordonnées de l’entreprise', framing: '' },
              { src: '/captures/poribal/social-renovation.jpg', alt: 'Publication « Nouvelle rénovation », montage de trois photos de chantier', framing: '' },
            ],
            metrics: [
              { value: '3', label: 'déclinaisons du logo' },
              { value: '7', label: 'pages où l’identité est appliquée' },
              { value: '8', label: 'supports et publications déclinés' },
            ],
            detail: {
              intro:
                "Une marque qui n’existait pas : logo, palette et gabarits ont été créés avant d’être appliqués page par page sur le site.",
              context:
                "L’entreprise n’avait ni logo ni charte. Rien ne permettait de la reconnaître d’un support à l’autre.",
              action:
                "J’ai dessiné un monogramme lisible en petite taille, décliné en version horizontale et verticale, puis fixé la palette et les gabarits appliqués sur les sept pages du site.",
              blocks: [
                {
                  heading: 'Un monogramme d’abord',
                  body: "Le P et le toit d’une maison forment un seul signe. C’est ce qui permet au logo de tenir en favicon comme en en-tête de page, sans redessiner une version dégradée pour les petites tailles.",
                },
                {
                  heading: 'Trois déclinaisons, un seul signe',
                  body: "Horizontale pour l’en-tête du site, verticale pour les formats carrés et les réseaux, monogramme seul pour les usages réduits. Le doré et le bleu nuit sont repris sur tout le site.",
                },
                {
                  heading: 'De l’identité aux supports',
                  body: "Une charte ne vaut que si elle tient hors du site. Carrousels pédagogiques sur l’investissement, carrousel sur les frais cachés d’un achat, fiche commerciale de l’accompagnement : même palette, même hiérarchie typographique, même signature d’un support à l’autre.",
                },
                {
                  heading: 'Les publications',
                  body: "L’infographie du cycle de vie d’un bien locatif, les citations, les appels à contact, les chantiers livrés : la marque tient une ligne éditoriale sur les réseaux, pas une suite de visuels sans lien. Ces publications sont en ligne sur le compte de l’entreprise.",
                },
              ],
              screenshots: [
                {
                  src: '/captures/web-01-poribal.jpg',
                  alt: 'Page d’accueil du site avec l’identité appliquée',
                  framing: 'captures/web-01-poribal.jpg — page d’accueil du site.',
                },
              ],
            },
          },
          {
            id: 'identite-meji',
            title: 'Identité et étiquette produit Meji Foods',
            image: {
              src: '/captures/design/meji-couverture.jpg',
              alt: 'Logo Meji Foods et étiquette recto-verso du jus de canne à sucre',
              framing: '',
            },
            result:
              'Un logo et deux versions de l’étiquette recto-verso d’une bouteille de jus de canne à sucre.',
            comment: 'Meji Foods · 2022 · marque de jus de canne à sucre',
            tags: ['Logo', 'Packaging', 'Étiquette produit'],
            gallery: [
              { src: '/captures/design/meji-logo-noir.jpg', alt: 'Logo Meji Foods sur fond sombre', framing: '' },
              { src: '/captures/design/meji-logo-blanc.jpg', alt: 'Logo Meji Foods sur fond clair', framing: '' },
              { src: '/captures/design/meji-etiquette-v1.jpg', alt: 'Première version de l’étiquette, recto et verso', framing: '' },
              { src: '/captures/design/meji-etiquette-v2.jpg', alt: 'Seconde version de l’étiquette, coordonnées et promesse produit revues', framing: '' },
            ],
            metrics: [
              { value: '2', label: 'versions d’étiquette' },
              { value: '2', label: 'versions du logo' },
            ],
            detail: {
              intro:
                'Une marque de jus de canne à sucre à habiller : un logo, puis l’étiquette qui fait le tour de la bouteille.',
              context:
                'Un client rencontré en indépendante vendait son jus de canne à sucre sans identité ni étiquette. Rien ne le nommait ni ne le distinguait d’un jus vendu au détail.',
              action:
                'J’ai créé le logo, puis composé l’étiquette recto-verso : les bénéfices et les numéros de commande d’un côté, la promesse et le visuel produit de l’autre. Deux versions ont été produites.',
              blocks: [
                {
                  heading: 'Un logo qui tient sur une bouteille',
                  body: 'Le nom en lettrage manuscrit, la flamme et le plat en signe secondaire, le tout refermé par un contour ovale. C’est ce contour qui tient l’ensemble quand le logo est réduit à quelques centimètres sur une surface courbe.',
                },
                {
                  heading: 'Ce que porte l’étiquette',
                  body: 'Une face donne les bénéfices du produit et les numéros de commande, l’autre la promesse et la mention 100 % naturel. Les verts et les ocres reprennent la canne elle-même plutôt qu’une palette décidée à côté du produit.',
                },
                {
                  heading: 'Deux versions',
                  body: 'La seconde change les coordonnées de commande et recompose le verso : la promesse passe à côté du visuel produit et la mention 100 % naturel devient un bloc à part entière. Les deux sont montrées ici.',
                },
              ],
              screenshots: [],
            },
          },
          {
            id: 'ligne-sportswear',
            title: 'Ligne sportswear — motifs et déclinaisons',
            image: {
              src: '/captures/design/sport-couverture.jpg',
              alt: 'Huit pièces d’une ligne sportswear : hauts techniques, leggings et short',
              framing: '',
            },
            result:
              'Huit pièces habillées : motifs textiles, colorimétries et marque appliquée produit par produit.',
            comment: 'Ligne sportswear · février – avril 2024 · fichiers montés par calques',
            tags: ['Motifs textiles', 'Déclinaison produit', 'Détourage', 'GIMP'],
            gallery: [
              { src: '/captures/design/sport-signature.jpg', alt: 'Signature de la marque sportswear', framing: '' },
              { src: '/captures/design/sport-monogramme.jpg', alt: 'Monogramme de la marque, vectorisé', framing: '' },
              { src: '/captures/design/sport-haut-01.jpg', alt: 'Haut technique, motif dégradé bordeaux et vert', framing: '' },
              { src: '/captures/design/sport-haut-02.jpg', alt: 'Haut technique, motif noir et rouge', framing: '' },
              { src: '/captures/design/sport-haut-03.jpg', alt: 'Haut technique raglan, marron et bleu nuit', framing: '' },
              { src: '/captures/design/sport-haut-04.jpg', alt: 'Haut technique à motif, vu de face et de dos', framing: '' },
              { src: '/captures/design/sport-legging-01.jpg', alt: 'Legging orange portant le monogramme', framing: '' },
              { src: '/captures/design/sport-legging-02.jpg', alt: 'Legging gris et bleu, découpe bicolore', framing: '' },
            ],
            metrics: [
              { value: '8', label: 'pièces déclinées' },
              { value: '3', label: 'types de produit' },
            ],
            detail: {
              intro:
                'Une même marque déclinée sur toute une ligne : hauts techniques, leggings et short, chacun avec son motif.',
              context:
                'La ligne devait être présentée avant fabrication. Il fallait voir la marque portée, pas un logo posé sur une planche.',
              action:
                'J’ai composé les motifs, réglé les colorimétries et appliqué la marque produit par produit, en montant chaque fichier par calques.',
              blocks: [
                {
                  heading: 'Le motif avant le produit',
                  body: 'Chaque texture est composée puis fondue dans le vêtement : la matière suit les volumes et les coutures du gabarit au lieu d’être posée à plat. C’est ce qui fait qu’une pièce se lit comme un vêtement et non comme une image collée.',
                },
                {
                  heading: 'Ce que montrent ces visuels',
                  body: 'Les gabarits produit sont des mockups du commerce. Les motifs, les colorimétries et l’application de la marque sont mes créations, montées par calques sous GIMP — les fichiers de travail sont conservés.',
                },
              ],
              screenshots: [],
            },
          },
        ],
      },
    ],
  },

  personal: {
    title: 'Projets personnels',
    lead: 'Construits sans budget, sans équipe, sans commande.',
    items: [
      {
        id: 'tiktok',
        title: 'Audience TikTok de 34 500 abonnés',
        image: {
          src: '/captures/perso/tiktok-profil.jpg',
          alt: 'Profil TikTok priscile_donfack : 34,5 K abonnés et 207,9 K j’aime',
          framing: 'captures/perso/tiktok-profil.jpg — profil TikTok, compteurs visibles.',
        },
        result: '34 500 abonnés et 207 900 j’aime, construits seule, sans budget.',
        comment: 'Projet personnel · compte en pause, contenus retirés de la vue publique',
        tags: ['TikTok', 'CapCut', 'Montage', 'Ligne éditoriale'],
        link: { href: 'https://www.tiktok.com/@priscile_donfack', label: 'Voir le compte' },
        metrics: [
          { value: '34,5 K', label: 'abonnés construits sans budget' },
          { value: '207,9 K', label: 'j’aime cumulés' },
          { value: '636', label: 'comptes suivis, pour un ratio net' },
        ],
        detail: {
          intro:
            "34 500 abonnés et 207 900 j’aime construits seule, de la ligne éditoriale au montage. Le compte est en pause : c’est un acquis, pas une activité en cours.",
          context: 'Aucune audience au départ, aucun budget, aucune équipe.',
          action:
            "J’ai défini la ligne éditoriale — création de contenus, montage vidéo, design — puis tourné, monté et publié seule l’intégralité des contenus.",
          blocks: [
            {
              heading: 'Ce que ça a demandé',
              body: "Un format identifiable, tenu assez longtemps pour être reconnu. Le choix des sujets, l’écriture des accroches, le tournage, le montage et la publication ont été faits sans délégation.",
            },
            {
              heading: 'Ce que j’en retiens',
              body: "Les trois premières secondes décident du reste. La régularité pèse plus que la qualité isolée d’une vidéo. Le ratio compte aussi : 34 500 abonnés pour 636 comptes suivis, c’est une audience venue du contenu, pas d’un échange de following.",
            },
            {
              heading: 'État actuel',
              body: "Le profil et ses compteurs restent publics, les vidéos ne le sont plus. C’est un choix : le compte n’est plus alimenté et je préfère l’afficher comme un acquis daté plutôt que comme une activité en cours.",
            },
          ],
          screenshots: [
            {
              src: '/captures/perso/tiktok-profil.jpg',
              alt: 'Profil TikTok affichant 34,5 K abonnés et 207,9 K j’aime',
              framing: 'captures/perso/tiktok-profil.jpg — profil TikTok, compteurs visibles.',
            },
          ],
        },
      },
    ],
  },

  search: {
    title: 'Ce que je cherche',
    lead: 'Une équipe où l’outil compte autant que le contenu.',
    criteria: [
      {
        icon: 'scope',
        label: 'Périmètre',
        value: 'Projets IA et automatisation, contenu, SEO et performance.',
      },
      {
        icon: 'repeat',
        label: 'Ce que je sais faire',
        value: 'Produire du contenu, l’optimiser pour Google, automatiser ce qui se répète.',
      },
      {
        icon: 'pin',
        label: 'Type de structure',
        value: 'Marketing intégré, agence ou jeune entreprise, avec un vrai sujet à outiller.',
      },
      {
        icon: 'arrow',
        label: 'Ce que je veux développer',
        value: 'Le pilotage en équipe : cadrage avec les parties prenantes, arbitrages, suivi.',
      },
    ],
  },

  contact: {
    title: 'Contact',
    lead: 'Le CV complet est disponible en PDF.',
    channels: [
      {
        icon: 'mail',
        label: 'Email',
        value: 'priscillengandjui@gmail.com',
        href: 'mailto:priscillengandjui@gmail.com',
      },
      { icon: 'phone', label: 'Téléphone', value: '07 66 16 74 58', href: 'tel:+33766167458' },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: 'linkedin.com/in/priscile-donfack',
        href: 'https://www.linkedin.com/in/priscile-donfack',
        external: true,
      },
    ],
  },

  footer: {
    copyright: '© 2026 Priscile Ngandjui Donfack',
  },
};
