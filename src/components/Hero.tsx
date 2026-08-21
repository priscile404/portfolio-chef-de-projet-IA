import { content } from '../data/content';
import { mailtoHref } from '../lib/mailto';
import Icon from './Icon';

const { identity, cv, availability } = content;

export default function Hero() {
  return (
    <section id="haut" className="relative border-b border-ink">
      {/* Grille apparente, decorative, masquee sur mobile. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block grid-rules opacity-70"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pt-16 pb-0 md:px-8 md:pt-24">
        <div className={identity.portrait ? 'md:grid md:grid-cols-[minmax(0,1fr)_260px] md:gap-10' : ''}>
          <div>
            <p className="eyebrow text-accent">{identity.eyebrow}</p>

            <h1 className="display mt-5 text-[clamp(2.75rem,12.5vw,8.5rem)]">
              {identity.firstName}
              <br />
              {identity.lastName}
            </h1>

            <div className="mt-6 h-[6px] w-24 bg-accent md:mt-8" />

            <p className="mt-6 max-w-[38ch] text-lg leading-snug font-medium text-balance md:text-2xl">
              {identity.statement}
            </p>
          </div>

          {identity.portrait ? (
            /* Sur mobile le portrait reste une vignette : les deux boutons d’action
               doivent rester atteignables sans avoir a le faire defiler. */
            <div className="mt-10 w-40 sm:w-52 md:mt-0 md:w-full">
              <img
                src={identity.portrait.src}
                alt={identity.portrait.alt}
                width={560}
                height={700}
                fetchPriority="high"
                decoding="async"
                className="w-full border border-ink object-cover"
                style={{ aspectRatio: '4 / 5' }}
              />
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-3 pb-12 sm:flex-row sm:items-center md:mt-14">
          <a
            href={cv.href}
            download
            className="inline-flex items-center justify-center gap-2 border border-accent bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-paper uppercase transition-colors duration-150 hover:border-ink hover:bg-ink"
          >
            <Icon name="download" />
            {cv.label}
          </a>
          <a
            href={mailtoHref()}
            className="inline-flex items-center justify-center gap-2 border border-ink px-6 py-4 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            <Icon name="mail" />
            M’écrire un mail
          </a>
        </div>
      </div>

      {/* Bandeau de disponibilite : donnee factuelle. */}
      <div className="border-t border-ink bg-shade">
        <dl className="mx-auto grid w-full max-w-[1240px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {availability.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-b border-rule px-5 py-4 last:border-b-0 md:px-8 lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <Icon name={item.icon} className="row-span-2 mt-1 h-4 w-4 shrink-0 text-accent" />
              <dt className="eyebrow text-muted">{item.label}</dt>
              <dd className="mt-1 text-sm leading-snug font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
