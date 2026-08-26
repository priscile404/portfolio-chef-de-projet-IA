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
      className="m-auto w-[min(100vw-1.5rem,58rem)] rounded-3xl border border-line bg-ink p-0 text-chalk"
    >
      {item && detail ? (
        <article className="max-h-[86vh] overflow-y-auto">
          <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-line bg-ink/95 px-5 py-4 backdrop-blur-md md:px-8">
            <div>
              <p className="eyebrow text-accent">{item.comment}</p>
              <h2 id="modal-titre" className="display mt-2 text-2xl text-chalk md:text-3xl">
                {item.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="eyebrow shrink-0 rounded-full border border-chalk/35 px-4 py-2 text-chalk transition-colors duration-200 hover:bg-chalk/10"
            >
              {content.work.closeLabel}
            </button>
          </header>

          <div className="px-5 py-6 md:px-8 md:py-8">
            <p className="max-w-[62ch] text-lg leading-snug font-light text-balance text-chalk">{detail.intro}</p>

            {item.metrics.length > 0 ? (
              <dl
                className={`mt-6 grid grid-cols-1 gap-px rounded-2xl border border-line bg-line ${
                  item.metrics.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
                }`}
              >
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="bg-ink p-4 first:rounded-l-2xl last:rounded-r-2xl">
                    <dt className="display text-3xl text-chalk">{metric.value}</dt>
                    <dd className="mt-2 text-xs leading-tight font-light text-mute">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <dl className="mt-8 space-y-3">
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-mute">Contexte</dt>
                <dd className="text-[15px] leading-relaxed font-light text-chalk/80">{detail.context}</dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-mute">Action</dt>
                <dd className="text-[15px] leading-relaxed font-light text-chalk/80">{detail.action}</dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-5">
                <dt className="eyebrow pt-1 text-mute">Résultat</dt>
                <dd className="text-[15px] leading-relaxed font-light text-chalk/80">{item.result}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
              {detail.blocks.map((block) => (
                <section key={block.heading}>
                  <h3 className="eyebrow text-mute">{block.heading}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed font-light text-chalk/80">{block.body}</p>
                </section>
              ))}
            </div>

            {item.gallery && item.gallery.length > 0 ? (
              <>
                <h3 className="eyebrow mt-10 text-mute">Visuels publiés</h3>
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
                          className="w-full rounded-xl border border-line bg-panel object-cover"
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
                <h3 className="eyebrow mt-10 text-mute">Captures</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {detail.screenshots.map((shot) => (
                    <Media key={shot.framing} slot={shot} ratio="16 / 10" className="rounded-xl border border-line" />
                  ))}
                </div>
              </>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-light text-mute">
                    {tag}
                  </li>
                ))}
              </ul>

              {item.link ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-chalk/35 px-5 py-2.5 text-chalk transition-colors duration-200 hover:bg-chalk/10"
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
