/**
 * Types du contenu editorial du portfolio.
 * Tout le texte affiche vient de `content.ts` : aucun contenu en dur dans les composants.
 */

export type IconName =
  | 'calendar'
  | 'clock'
  | 'repeat'
  | 'pin'
  | 'mail'
  | 'phone'
  | 'linkedin'
  | 'download'
  | 'arrow'
  | 'scope';

/** Ligne du bandeau de disponibilite affiche sous le hero. */
export interface AvailabilityItem {
  label: string;
  value: string;
  icon: IconName;
}

/** Emplacement d'image : carte, ou capture d'une vue detaillee. */
export interface MediaSlot {
  /** Fichier attendu dans `public/captures/`. `null` = visuel pas encore fourni. */
  src: string | null;
  /** Texte alternatif, obligatoire des que `src` est renseigne. */
  alt: string;
  /** Cadrage attendu, affiche dans l'encadre tant que `src` est vide. */
  framing: string;
}

/** Chiffre mis en avant sur une carte. */
export interface Metric {
  value: string;
  label: string;
}

export interface DetailBlock {
  heading: string;
  body: string;
}

/** Une realisation. Sur la carte : un visuel, un resultat, un commentaire. */
export interface Realization {
  id: string;
  title: string;
  /** Visuel principal de la carte. */
  image: MediaSlot;
  /** Une ligne : ce qui a ete livre ou obtenu. */
  result: string;
  /** Espace commentaire, en bas de la carte : ou, quand, pour qui. */
  comment: string;
  tags: string[];
  /** Lien public vers la realisation, quand il en existe un. */
  link?: { href: string; label: string };
  /** Galerie de visuels affichee dans la vue detaillee. */
  gallery?: MediaSlot[];
  /** Trois chiffres maximum. Peut etre vide. */
  metrics: Metric[];
  /** Vue detaillee optionnelle (modale). Absente = carte sans bouton. */
  detail?: {
    intro: string;
    context: string;
    action: string;
    blocks: DetailBlock[];
    screenshots: MediaSlot[];
  };
}

/** Un domaine de competence et les realisations qui le prouvent. */
export interface RealizationGroup {
  id: string;
  title: string;
  /** Outils du domaine, en micro tags. */
  tools: string[];
  items: Realization[];
}

/** Paragraphe de la section methode : une amorce en gras, puis le corps. */
export interface ApproachParagraph {
  emphasis: string;
  body: string;
}

export interface SearchCriterion {
  icon: IconName;
  label: string;
  value: string;
}

export interface ContactChannel {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  /** Ouvre dans un nouvel onglet. */
  external?: boolean;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface SiteContent {
  identity: {
    firstName: string;
    lastName: string;
    monogram: string;
    /** Surtitre du hero : le poste vise, en trois mots. */
    eyebrow: string;
    statement: string;
    /** Portrait optionnel, cadrage serre. `null` = hero purement typographique. */
    portrait: { src: string; alt: string } | null;
  };
  nav: {
    links: NavLink[];
    cta: string;
  };
  cv: {
    href: string;
    label: string;
  };
  mail: {
    address: string;
    subject: string;
    body: string;
  };
  availability: AvailabilityItem[];
  /** Section de methode : la seule ou elle parle a la premiere personne, en texte suivi. */
  approach: {
    title: string;
    /** Presentation, deux phrases. */
    intro: string;
    paragraphs: ApproachParagraph[];
    closing: string;
  };
  work: {
    title: string;
    lead: string;
    groups: RealizationGroup[];
    detailLabel: string;
    closeLabel: string;
    commentLabel: string;
  };
  personal: {
    title: string;
    lead: string;
    items: Realization[];
  };
  search: {
    title: string;
    lead: string;
    criteria: SearchCriterion[];
  };
  contact: {
    title: string;
    lead: string;
    channels: ContactChannel[];
  };
  footer: {
    copyright: string;
  };
}
