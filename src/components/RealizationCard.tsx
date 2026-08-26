import type { Realization } from '../data/types';
import { content } from '../data/content';
import Icon from './Icon';
import Media from './Media';

interface RealizationCardProps {
  item: Realization;
  onOpen: (item: Realization) => void;
  /** Le premier visuel de la page n'est pas charge en differe. */
  eager?: boolean;
  /** Niveau de titre, pour garder la hierarchie h2 > h3 > h4. */
  headingLevel?: 3 | 4;
  /** Carte pleine largeur : visuel a gauche, contenu a droite. */
  horizontal?: boolean;
}

/**
 * Carte de realisation.
 * L'ordre est toujours le meme — visuel, titre, resultat, chiffres, outils, actions,
 * commentaire — et le commentaire est pousse en bas par `mt-auto`, de sorte que les
 * cartes d'une meme rangee se terminent a la meme ligne quelle que soit la longueur
 * du texte.
 */
export default function RealizationCard({
  item,
  onOpen,
  eager = false,
  headingLevel = 3,
  horizontal = false,
}: RealizationCardProps) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';

  return (
    <article className={`tilt-scene h-full w-full ${horizontal ? '' : 'flex'}`}>
      <div
        className={`panneau tilt flex h-full w-full flex-col overflow-hidden ${
          horizontal ? 'md:grid md:grid-cols-2 md:items-stretch' : ''
        }`}
      >
        <Media
          slot={item.image}
          ratio="16 / 10"
          eager={eager}
          className={horizontal ? 'md:h-full md:!aspect-auto' : ''}
        />

        <div className="flex flex-1 flex-col p-5 md:p-7">
          <Heading className="display text-lg text-chalk md:text-xl">{item.title}</Heading>
          <p className="mt-3 text-sm leading-relaxed font-light text-chalk/70">{item.result}</p>

          {item.metrics.length > 0 ? (
            <dl
              className="mt-6 grid gap-4 border-t border-line pt-5"
              style={{ gridTemplateColumns: `repeat(${item.metrics.length}, minmax(0, 1fr))` }}
            >
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="display text-2xl text-chalk">{metric.value}</dt>
                  <dd className="mt-1.5 text-[11px] leading-tight font-light text-mute">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-panel-2 px-2.5 py-1 text-[11px] font-light text-mute"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* Actions et commentaire, colles en bas : les cartes s'alignent entre elles. */}
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {item.detail ? (
                <button
                  type="button"
                  onClick={() => onOpen(item)}
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-chalk/25 px-4 py-2.5 text-chalk transition-colors duration-200 hover:border-accent hover:bg-accent/10"
                >
                  {content.work.detailLabel}
                  <span className="sr-only"> : {item.title}</span>
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </button>
              ) : null}

              {item.link ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-accent transition-colors duration-200 hover:bg-accent/10"
                >
                  {item.link.label}
                  <span className="sr-only"> : {item.title}, nouvel onglet</span>
                  <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
                </a>
              ) : null}
            </div>

            <p className="mt-5 border-t border-line pt-4 text-[11px] leading-relaxed font-light text-mute">
              <span className="sr-only">{content.work.commentLabel} : </span>
              {item.comment}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
