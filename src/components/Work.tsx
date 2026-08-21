import { useState } from 'react';
import { content } from '../data/content';
import { profil } from '../data/profils';
import type { Realization } from '../data/types';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import RealizationCard from './RealizationCard';
import RealizationModal from './RealizationModal';

const { work, personal } = content;

/** L'ordre des domaines depend du profil : le premier annonce le positionnement. */
const domaines = profil.ordreDomaines
  .map((id) => work.groups.find((groupe) => groupe.id === id))
  .filter((groupe): groupe is (typeof work.groups)[number] => groupe !== undefined);

export default function Work() {
  const [open, setOpen] = useState<Realization | null>(null);

  return (
    <>
      <section id="realisations" className="border-b border-ink">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <SectionHeader title={work.title} lead={work.lead} />

          {domaines.map((group, groupIndex) => (
            <div key={group.id} id={group.id} className="mt-12 first:mt-10 md:mt-16">
              <header className="flex flex-col gap-3 border-b-2 border-ink pb-3 md:flex-row md:items-end md:justify-between md:gap-8">
                <h3 className="display text-2xl md:text-4xl">{group.title}</h3>
                <ul className="flex flex-wrap gap-1.5 md:justify-end">
                  {group.tools.map((tool) => (
                    <li key={tool} className="border border-rule px-2 py-1 text-xs font-medium text-muted">
                      {tool}
                    </li>
                  ))}
                </ul>
              </header>

              {/* Le nombre de colonnes suit le nombre de cartes : aucune cellule vide. */}
              <ul
                className={`mt-6 grid gap-px border border-ink bg-rule ${
                  group.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                }`}
              >
                {group.items.map((item, i) => (
                  <Reveal as="li" key={item.id} delay={i * 60} className="flex bg-paper">
                    <RealizationCard
                      item={item}
                      onOpen={setOpen}
                      headingLevel={4}
                      eager={groupIndex === 0 && i === 0}
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projets" className="border-b border-ink bg-shade">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <SectionHeader title={personal.title} lead={personal.lead} />

          {/* Une seule realisation : carte pleine largeur, visuel a gauche. */}
          <ul
            className={`mt-10 grid gap-px border border-ink bg-rule ${
              personal.items.length > 1 ? 'md:grid-cols-2' : ''
            }`}
          >
            {personal.items.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 60} className="flex bg-paper">
                <RealizationCard item={item} onOpen={setOpen} horizontal={personal.items.length === 1} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <RealizationModal item={open} onClose={() => setOpen(null)} />
    </>
  );
}
