import { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { mailtoHref } from '../lib/mailto';

const ids = content.nav.links.map((link) => link.id);

/**
 * Repere la section en cours de lecture.
 * La marge haute et basse reduit la zone d'observation a une bande au tiers superieur
 * de l'ecran : c'est la section qui coupe cette bande qui est consideree comme lue.
 */
function useSectionCourante() {
  const visibles = useRef(new Set<string>());
  const [courante, setCourante] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) visibles.current.add(entree.target.id);
          else visibles.current.delete(entree.target.id);
        }
        setCourante(ids.find((id) => visibles.current.has(id)) ?? null);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );

    sections.forEach((section) => observateur.observe(section));
    return () => observateur.disconnect();
  }, []);

  return courante;
}

export default function Nav() {
  const courante = useSectionCourante();

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#haut"
          className="display text-lg transition-colors duration-150 hover:text-accent"
          aria-label={`${content.identity.monogram} — retour en haut de la page`}
        >
          {content.identity.monogram}
          <span className="text-accent">.</span>
        </a>

        {/* Cinq liens ne tiennent pas a cote du bouton avant 1024 px : en dessous,
            seuls le monogramme et l’appel a l’action restent. */}
        <nav aria-label="Sections du site" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {content.nav.links.map((link) => {
              const active = courante === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`eyebrow inline-block border-b-2 py-3 transition-colors duration-150 hover:text-accent ${
                      active ? 'border-accent text-ink' : 'border-transparent text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={mailtoHref()}
          className="eyebrow border border-ink bg-ink px-4 py-2 text-paper transition-colors duration-150 hover:border-accent hover:bg-accent"
        >
          {content.nav.cta}
        </a>
      </div>
    </header>
  );
}
