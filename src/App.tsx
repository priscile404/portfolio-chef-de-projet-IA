import { content } from './data/content';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Approach from './components/Approach';
import Work from './components/Work';
import Search from './components/Search';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:border focus:border-chalk focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-chalk"
      >
        Aller au contenu
      </a>

      <Nav />

      <main id="contenu">
        <Hero />
        <Marquee />
        <Approach />
        <Work />
        <Search />
        <Contact />
      </main>

      <footer className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 border-t border-line px-5 py-8 text-xs font-light text-mute sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>{content.footer.copyright}</p>
        <a href="#haut" className="inline-block py-2 transition-opacity duration-200 hover:opacity-70">
          Retour en haut
        </a>
      </footer>
    </>
  );
}
