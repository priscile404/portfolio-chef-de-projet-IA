import type { Realization } from '../data/types';
import { content } from '../data/content';
import Icon from './Icon';
import Media from './Media';

interface RealizationCardProps {
  item: Realization;
  onOpen: (item: Realization) => void;
  /** Le premier visuel de la page n’est pas charge en differe. */
  eager?: boolean;
  /** Niveau de titre, pour garder la hierarchie h2 > h3 > h4. */
  headingLevel?: 3 | 4;
  /** Carte pleine largeur : visuel a gauche, contenu a droite. */
  horizontal?: boolean;
}

export default function RealizationCard({
  item,
  onOpen,
  eager = false,
  headingLevel = 3,
  horizontal = false,
}: RealizationCardProps) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';

  return (
    <article className={`w-full ${horizontal ? 'md:grid md:grid-cols-2' : 'flex h-full flex-col'}`}>
      <Media
        slot={item.image}
        ratio="16 / 10"
        eager={eager}
        className={horizontal ? 'md:h-full md:!aspect-auto' : ''}
      />

      <div
        className={`flex flex-1 flex-col border-t border-rule p-5 md:p-6 ${
          horizontal ? 'md:border-t-0 md:border-l' : ''
        }`}
      >
        <Heading className="display text-xl md:text-2xl">{item.title}</Heading>
        <p className="mt-3 text-[15px] leading-snug">{item.result}</p>

        {item.metrics.length > 0 ? (
          <dl className="mt-5 grid gap-px border-y border-rule bg-rule" style={{ gridTemplateColumns: `repeat(${item.metrics.length}, minmax(0, 1fr))` }}>
            {item.metrics.map((metric) => (
              <div key={metric.label} className="bg-paper py-4 pr-3">
                <dt className="display text-2xl text-accent md:text-3xl">{metric.value}</dt>
                <dd className="mt-1.5 text-xs leading-tight text-muted">{metric.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="border border-rule px-2.5 py-1 text-xs font-medium text-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {item.detail ? (
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="inline-flex items-center gap-2 border-b-2 border-accent py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-accent"
            >
              {content.work.detailLabel}
              <span className="sr-only"> : {item.title}</span>
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          ) : null}

          {item.link ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-rule py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              {item.link.label}
              <span className="sr-only"> : {item.title}, nouvel onglet</span>
              <Icon name="arrow" className="h-4 w-4 -rotate-45" />
            </a>
          ) : null}
        </div>

        {/* Espace commentaire : ou, quand, pour qui. */}
        <p className="mt-auto flex gap-3 border-l-2 border-accent pt-6 pl-3 text-xs leading-relaxed text-muted">
          <span className="sr-only">{content.work.commentLabel} : </span>
          {item.comment}
        </p>
      </div>
    </article>
  );
}
