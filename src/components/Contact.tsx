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
    <section id="contact" className="relative">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader title={contact.title} lead={contact.lead} />

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {contact.channels.map((channel, i) => (
            <Reveal as="li" key={channel.label} delay={i * 60} className="bg-ink">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group block h-full p-5 transition-colors duration-150 hover:bg-panel md:p-6"
              >
                <Icon name={channel.icon} className="h-5 w-5 text-accent" />
                <span className="eyebrow mt-4 block text-mute">{channel.label}</span>
                <span className="mt-1.5 block text-lg font-light break-all text-chalk group-hover:text-chalk/70">
                  {channel.value}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailtoHref()}
            className="btn-orange eyebrow inline-flex items-center justify-center gap-2 rounded-full px-10 py-4"
          >
            <Icon name="mail" />
            {content.nav.cta}
          </a>
          <a
            href={cv.href}
            download
            className="eyebrow inline-flex items-center justify-center gap-2 rounded-full border border-chalk/35 px-10 py-4 text-chalk transition-colors duration-200 hover:bg-chalk/10"
          >
            <Icon name="download" />
            {cv.label}
          </a>
        </div>
      </div>
    </section>
  );
}
