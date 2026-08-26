import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  /** Distance, en pixels, a laquelle l'element commence a suivre le curseur. */
  padding?: number;
  /** Diviseur du deplacement : plus il est grand, plus le suivi est discret. */
  strength?: number;
  className?: string;
}

/**
 * Suivi magnetique du curseur.
 * L'element se decale d'une fraction de la distance au centre, tant que le curseur
 * reste dans la zone elargie par `padding`. Neutralise sous prefers-reduced-motion
 * et sur les appareils sans survol (tactile), ou l'effet n'aurait aucun sens.
 */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [decalage, setDecalage] = useState({ x: 0, y: 0 });
  const [actif, setActif] = useState(false);

  useEffect(() => {
    const survolPossible = window.matchMedia('(hover: hover)').matches;
    const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!survolPossible || mouvementReduit) return;

    function onMove(event: MouseEvent) {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;
      const dansLaZone =
        Math.abs(event.clientX - centreX) < rect.width / 2 + padding &&
        Math.abs(event.clientY - centreY) < rect.height / 2 + padding;

      if (dansLaZone) {
        setActif(true);
        setDecalage({
          x: (event.clientX - centreX) / strength,
          y: (event.clientY - centreY) / strength,
        });
      } else if (actif) {
        setActif(false);
        setDecalage({ x: 0, y: 0 });
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, actif]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${decalage.x}px, ${decalage.y}px, 0)`,
        transition: actif ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
