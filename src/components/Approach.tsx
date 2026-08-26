import { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import Objet3D from './Objet3D';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const { approach } = content;

/**
 * Revelation lettre par lettre pilotee par le defilement.
 * Chaque caractere passe de 0.2 a 1 d'opacite selon sa position dans le texte,
 * comparee a la progression du bloc dans la fenetre. Sous prefers-reduced-motion,
 * tout est affiche d'emblee.
 */
function TexteRevele({ texte }: { texte: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgression(1);
      return;
    }

    let enAttente = false;
    function onScroll() {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => {
        const node = ref.current;
        if (node) {
          const rect = node.getBoundingClientRect();
          const debut = window.innerHeight * 0.8;
          const fin = window.innerHeight * 0.2;
          const parcouru = (debut - rect.top) / (debut - fin + rect.height);
          setProgression(Math.min(1, Math.max(0, parcouru)));
        }
        enAttente = false;
      });
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const lettres = [...texte];
  return (
    <p
      ref={ref}
      className="text-xl leading-snug font-light text-balance text-chalk md:text-3xl"
    >
      {lettres.map((lettre, i) => (
        <span
          key={i}
          style={{
            opacity: progression >= (i + 1) / lettres.length ? 1 : 0.3,
            transition: 'opacity 220ms linear',
          }}
        >
          {lettre}
        </span>
      ))}
    </p>
  );
}

export default function Approach() {
  return (
    <section id="methode" className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 aurora opacity-60" />
      <Objet3D nom="sphere" delai={-9} className="top-[calc(50%-10rem)] right-[4%] hidden w-[320px] lg:block" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <SectionHeader title={approach.title} />

        <div className="mt-10 max-w-[62ch] md:mt-14">
          <TexteRevele texte={approach.intro} />

          {approach.paragraphs.map((paragraphe, i) => (
            <Reveal
              key={paragraphe.emphasis}
              delay={i * 80}
              className={i === 0 ? 'mt-10 border-t border-line pt-8' : 'mt-6'}
            >
              <p className="text-[17px] leading-relaxed font-light text-chalk/75 md:text-lg">
                <strong className="font-semibold text-chalk">{paragraphe.emphasis}</strong>{' '}
                {paragraphe.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
