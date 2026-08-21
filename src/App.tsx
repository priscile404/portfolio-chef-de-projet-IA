import { content } from './data/content';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Approach from './components/Approach';
import Work from './components/Work';
import Search from './components/Search';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Aller au contenu
      </a>

      <Nav />

      <main id="contenu">
        <Hero />
        <Approach />
        <Work />
        <Search />
        <Contact />
      </main>

      <footer className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>{content.footer.copyright}</p>
        <a href="#haut" className="inline-block py-2 transition-colors duration-150 hover:text-accent">
          Retour en haut
        </a>
      </footer>
    </>
  );
}
