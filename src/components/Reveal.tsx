import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Decalage d'apparition en millisecondes. */
  delay?: number;
  as?: 'div' | 'li' | 'section';
}

/**
 * Apparition au scroll via IntersectionObserver.
 * Le CSS neutralise l'effet quand prefers-reduced-motion est actif.
 * Filet de securite : le contenu s'affiche de toute facon au bout de 2 s,
 * pour qu'aucun texte ne reste invisible si l'observateur ne se declenche pas.
 */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    const fallback = window.setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
