import { content } from '../data/content';
import { mailtoHref } from '../lib/mailto';
import Icon from './Icon';
import Magnet from './Magnet';
import Objet3D from './Objet3D';
import Reveal from './Reveal';

const { identity, cv, availability } = content;

export default function Hero() {
  return (
    <section id="haut" className="relative flex min-h-screen flex-col overflow-x-clip">
      {/* Profondeur : halos diffus et anneau en perspective, aucun fichier image. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 aurora" />
      <Objet3D
        nom="torus"
        delai={0}
        className="top-[10%] left-[52%] hidden w-[220px] lg:block xl:w-[280px]"
      />
      <Objet3D
        nom="spirale"
        delai={-5}
        className="bottom-[18%] left-[46%] hidden w-[170px] xl:block"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-6 pt-12 md:px-10 md:pt-16">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          {/* Colonne texte */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden">
              <Reveal delay={120}>
                <h1 className="display gradient-text text-[15vw] sm:text-[13vw] lg:text-[9.5vw]">
                  {identity.firstName}
                  <span className="block text-[6.4vw] sm:text-[5.4vw] lg:text-[3.9vw]">
                    {identity.lastName}
                  </span>
                </h1>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <p
                className="mt-6 max-w-[24ch] leading-snug font-light tracking-wide text-chalk uppercase md:mt-8"
                style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1.4rem)' }}
              >
                {identity.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={460}>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed font-light text-chalk/70 md:text-base">
                {identity.statement}
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                <a
                  href={mailtoHref()}
                  className="btn-glow eyebrow inline-flex items-center justify-center rounded-full px-9 py-3.5 transition-transform duration-200 hover:scale-[1.03] md:px-12 md:py-4"
                >
                  {content.nav.cta}
                </a>
                <a
                  href={cv.href}
                  download
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-chalk/35 px-7 py-3.5 text-chalk transition-colors duration-200 hover:bg-chalk/10 md:px-9 md:py-4"
                >
                  <Icon name="download" />
                  {cv.label}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Portrait : cadre arrondi, lueur derriere, fondu vers le noir en bas. */}
          <Reveal delay={700} className="order-1 justify-self-center lg:order-2 lg:justify-self-end">
            <div className="relative w-[240px] sm:w-[300px] lg:w-[400px]">
              <div
                aria-hidden="true"
                className="breathe absolute -inset-10 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgb(168 26 155 / 0.22), transparent 70%)',
                }}
              />
              <Magnet padding={140} strength={4} className="relative">
                <div className="panneau relative overflow-hidden">
                  <img
                    src={identity.portrait?.src}
                    alt={identity.portrait?.alt ?? ''}
                    width={560}
                    height={700}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full object-cover"
                    style={{ aspectRatio: '4 / 5' }}
                  />
                </div>
              </Magnet>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bandeau de disponibilite. */}
      <div className="relative z-20 border-t border-line">
        <dl className="mx-auto grid w-full max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          {availability.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-b border-line px-6 py-4 last:border-b-0 md:px-10 lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <Icon name={item.icon} className="row-span-2 mt-1 h-4 w-4 shrink-0 text-accent" />
              <dt className="eyebrow text-mute">{item.label}</dt>
              <dd className="mt-1 text-sm leading-snug font-light text-chalk">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
