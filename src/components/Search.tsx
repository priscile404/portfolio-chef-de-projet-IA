import { content } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const { search } = content;

export default function Search() {
  return (
    <section id="recherche" className="border-b border-ink bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader title={search.title} lead={search.lead} inverted />

        <dl className="mt-10 grid gap-px bg-paper/25 sm:grid-cols-2 lg:grid-cols-4">
          {search.criteria.map((item, i) => (
            <Reveal key={item.label} delay={i * 60} className="bg-ink p-5 md:p-6">
              <Icon name={item.icon} className="h-5 w-5 text-accent" />
              <dt className="eyebrow mt-4 text-paper/70">{item.label}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
