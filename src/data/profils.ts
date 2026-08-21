/**
 * Deux positionnements, une seule base de code.
 *
 * Le portfolio se construit deux fois, avec le meme contenu et les memes visuels,
 * mais un cadrage different : ce qui change, c'est la promesse du hero, l'objet du
 * mail, et l'ordre des domaines de realisation. Le reste est identique — corriger
 * une faute une fois la corrige dans les deux sites.
 *
 *   npm run build:ia          → dist-ia/          Chef de projet IA
 *   npm run build:marketing   → dist-marketing/   Marketing digital & IA
 */
export interface Profil {
  /** Surtitre du hero. */
  eyebrow: string;
  /** Promesse en une phrase, sous le nom. */
  statement: string;
  /** Objet pre-rempli du mail de contact. */
  sujetMail: string;
  /** Ordre d'apparition des domaines : le premier donne le ton. */
  ordreDomaines: string[];
}

export const profils: Record<string, Profil> = {
  ia: {
    eyebrow: 'Chef de projet IA',
    statement:
      'Je pilote des projets IA du cadrage à la mise en production, jusqu’à l’outil que l’équipe utilise vraiment.',
    sujetMail: 'Alternance chef de projet IA — septembre 2026',
    ordreDomaines: ['ia', 'seo', 'contenu-video', 'design'],
  },
  marketing: {
    eyebrow: 'Marketing digital & IA',
    statement:
      'Je produis des contenus qui trouvent leur audience, et je construis les outils qui les produisent.',
    sujetMail: 'Alternance marketing digital — septembre 2026',
    ordreDomaines: ['contenu-video', 'seo', 'ia', 'design'],
  },
};

const demande = import.meta.env.VITE_PROFIL as string | undefined;
export const profil: Profil = profils[demande ?? 'ia'] ?? profils.ia;
