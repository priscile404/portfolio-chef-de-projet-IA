import { content } from '../data/content';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const { approach } = content;

/**
 * La seule section en texte suivi.
 * Elle rompt volontairement le rythme des grilles : une colonne de lecture, le reste
 * de la largeur laisse respirer. C’est ce qui donne une voix a la page.
 */
export default function Approach() {
  return (
    <section id="methode" className="border-b border-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader title={approach.title} />

        <div className="mt-10 max-w-[62ch] md:mt-12">
          <Reveal>
            <p className="text-xl leading-snug font-medium text-balance md:text-2xl">
              {approach.intro}
            </p>
          </Reveal>


          {approach.paragraphs.map((paragraphe, i) => (
            <Reveal key={paragraphe.emphasis} delay={i * 80} className={i === 0 ? 'mt-8 border-t border-rule pt-6' : 'mt-6'}>
              <p className="text-[17px] leading-relaxed md:text-lg">
                <strong className="font-semibold">{paragraphe.emphasis}</strong>{' '}
                {paragraphe.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
