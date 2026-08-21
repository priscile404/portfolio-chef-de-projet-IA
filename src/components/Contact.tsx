import { content } from '../data/content';
import { mailtoHref } from '../lib/mailto';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const { contact, cv } = content;

/**
 * Trois canaux directs et deux actions. Pas de formulaire :
 * il n’aurait fait qu’ouvrir la messagerie, avec trois champs a remplir en plus.
 */
export default function Contact() {
  return (
    <section id="contact" className="border-b border-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader title={contact.title} lead={contact.lead} />

        <ul className="mt-10 grid gap-px border border-ink bg-rule sm:grid-cols-3">
          {contact.channels.map((channel, i) => (
            <Reveal as="li" key={channel.label} delay={i * 60} className="bg-paper">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group block h-full p-5 transition-colors duration-150 hover:bg-shade md:p-6"
              >
                <Icon name={channel.icon} className="h-5 w-5 text-accent" />
                <span className="eyebrow mt-4 block text-muted">{channel.label}</span>
                <span className="mt-1.5 block text-lg font-medium break-all group-hover:text-accent">
                  {channel.value}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailtoHref()}
            className="inline-flex items-center justify-center gap-2 border border-accent bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-paper uppercase transition-colors duration-150 hover:border-ink hover:bg-ink"
          >
            <Icon name="mail" />
            {content.nav.cta}
          </a>
          <a
            href={cv.href}
            download
            className="inline-flex items-center justify-center gap-2 border border-ink px-6 py-4 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            <Icon name="download" />
            {cv.label}
          </a>
        </div>
      </div>
    </section>
  );
}
