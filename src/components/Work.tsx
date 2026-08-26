import { useState } from 'react';
import { content } from '../data/content';
import type { Realization } from '../data/types';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import RealizationCard from './RealizationCard';
import RealizationModal from './RealizationModal';

const { work, personal } = content;


export default function Work() {
  const [open, setOpen] = useState<Realization | null>(null);

  return (
    <>
      <section id="realisations" className="relative">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <SectionHeader title={work.title} lead={work.lead} />

          {work.groups.map((group, groupIndex) => (
            <div key={group.id} id={group.id} className="mt-12 first:mt-10 md:mt-16">
              <header className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-end md:justify-between md:gap-8">
                <h3 className="display text-2xl text-chalk md:text-4xl">{group.title}</h3>
                <ul className="flex flex-wrap gap-1.5 md:justify-end">
                  {group.tools.map((tool) => (
                    <li key={tool} className="rounded-full border border-line px-3 py-1 text-xs font-light text-mute">
                      {tool}
                    </li>
                  ))}
                </ul>
              </header>

              {/* Le nombre de colonnes suit le nombre de cartes : aucune cellule vide. */}
              <ul
                className={`mt-8 grid gap-8 md:gap-10 ${
                  group.items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                }`}
              >
                {group.items.map((item, i) => (
                  <Reveal as="li" key={item.id} delay={i * 60} className="flex">
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

      <section id="projets" className="relative">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <SectionHeader title={personal.title} lead={personal.lead} />

          {/* Une seule realisation : carte pleine largeur, visuel a gauche. */}
          <ul
            className={`mt-10 grid gap-8 ${personal.items.length > 1 ? 'md:grid-cols-2' : ''}`}
          >
            {personal.items.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 60} className="flex">
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
