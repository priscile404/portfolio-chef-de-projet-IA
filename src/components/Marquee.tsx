import { useEffect, useRef, useState } from 'react';
import { bandeau } from '../data/bandeau';

const MOITIE = Math.ceil(bandeau.length / 2);
const RANGEE_1 = bandeau.slice(0, MOITIE);
const RANGEE_2 = bandeau.slice(MOITIE);

/** Double la liste : assez pour couvrir la largeur sans tripler le poids. */
const boucler = (liste: string[]) => [...liste, ...liste];

interface RangeeProps {
  images: string[];
  decalage: number;
  sens: 1 | -1;
}

function Rangee({ images, decalage, sens }: RangeeProps) {
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${sens * decalage}px)`, willChange: 'transform' }}
    >
      {boucler(images).map((src, i) => (
        <div
          key={src + i}
          className="h-[140px] w-[224px] shrink-0 overflow-hidden rounded-2xl border border-line sm:h-[170px] sm:w-[272px] md:h-[200px] md:w-[320px]"
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={480}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Deux rangees de visuels qui glissent en sens inverse au fil du defilement.
 * Purement decoratif — les images portent alt="" et aria-hidden : le meme travail
 * est deja presente, legende et date comprises, dans les cartes de realisation.
 */
export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const [decalage, setDecalage] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let enAttente = false;
    function onScroll() {
      if (enAttente) return;
      enAttente = true;
      requestAnimationFrame(() => {
        const node = ref.current;
        if (node) {
          const haut = node.getBoundingClientRect().top + window.scrollY;
          setDecalage((window.scrollY - haut + window.innerHeight) * 0.3 - 200);
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

  return (
    <section ref={ref} aria-hidden="true" className="overflow-x-clip py-16 sm:py-20 md:py-24">
      <div className="flex flex-col gap-3">
        <Rangee images={RANGEE_1} decalage={decalage} sens={1} />
        <Rangee images={RANGEE_2} decalage={decalage} sens={-1} />
      </div>
    </section>
  );
}
