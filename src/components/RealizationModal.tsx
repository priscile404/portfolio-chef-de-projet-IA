import { useEffect, useRef } from 'react';
import type { Realization } from '../data/types';
import { content } from '../data/content';
import Media from './Media';

interface RealizationModalProps {
  item: Realization | null;
  onClose: () => void;
}

/**
 * Vue detaillee d’une realisation.
 * Utilise <dialog> natif : piege de focus, touche Echap et fond modal geres par le navigateur.
 */
export default function RealizationModal({ item, onClose }: RealizationModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const detail = item?.detail;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="modal-titre"
      className="m-auto w-[min(100vw-1.5rem,54rem)] border border-ink bg-paper p-0 text-ink"
    >
      {item && detail ? (
        <article className="max-h-[86vh] overflow-y-auto">
          <header className="sticky top-0 flex items-start justify-between gap-6 border-b border-ink bg-paper px-5 py-4 md:px-8">
            <div>
              <p className="eyebrow text-accent">{item.comment}</p>
              <h2 id="modal-titre" className="display mt-2 text-2xl md:text-3xl">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="eyebrow shrink-0 border border-ink px-3 py-2 transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              {content.work.closeLabel}
            </button>
          </header>

          <div className="px-5 py-6 md:px-8 md:py-8">
            <p className="max-w-[62ch] text-lg leading-snug font-medium text-balance">{detail.intro}</p>

            {item.metrics.length > 0 ? (
              <dl
                className={`mt-6 grid grid-cols-1 gap-px border border-ink bg-rule ${
                  item.metrics.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
                }`}
              >
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="bg-shade p-4">
                    <dt className="display text-3xl text-accent">{metric.value}</dt>
                    <dd className="mt-2 text-xs leading-tight text-muted">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <dl className="mt-8 space-y-3">
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-muted">Contexte</dt>
                <dd className="text-[15px] leading-relaxed">{detail.context}</dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-muted">Action</dt>
                <dd className="text-[15px] leading-relaxed">{detail.action}</dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-muted">Résultat</dt>
                <dd className="text-[15px] leading-relaxed">{item.result}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-6 border-t border-rule pt-6 md:grid-cols-2">
              {detail.blocks.map((block) => (
                <section key={block.heading}>
                  <h3 className="eyebrow text-muted">{block.heading}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed">{block.body}</p>
                </section>
              ))}
            </div>

            {item.gallery && item.gallery.length > 0 ? (
              <>
                <h3 className="eyebrow mt-10 text-muted">Visuels publiés</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {item.gallery.map((photo) =>
                    photo.src ? (
                      <li key={photo.src}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          width={1200}
                          height={900}
                          className="w-full border border-rule bg-shade object-cover"
                          style={{ aspectRatio: '4 / 3' }}
                        />
                      </li>
                    ) : null,
                  )}
                </ul>
              </>
            ) : null}

            {detail.screenshots.length > 0 ? (
              <>
                <h3 className="eyebrow mt-10 text-muted">Captures</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {detail.screenshots.map((shot) => (
                    <Media key={shot.framing} slot={shot} ratio="16 / 10" className="border border-rule" />
                  ))}
                </div>
              </>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="border border-rule px-2.5 py-1 text-xs font-medium text-muted">
                    {tag}
                  </li>
                ))}
              </ul>

              {item.link ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b-2 border-accent py-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-accent"
                >
                  {item.link.label}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ) : null}
    </dialog>
  );
}
