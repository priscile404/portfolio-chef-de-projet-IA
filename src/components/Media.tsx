import type { MediaSlot } from '../data/types';

interface MediaProps {
  slot: MediaSlot;
  /** Rapport largeur / hauteur, ex. '16 / 10'. */
  ratio?: string;
  className?: string;
  /** Le premier visuel de la page ne doit pas etre charge en differe. */
  eager?: boolean;
}

/**
 * Affiche l’image quand elle est fournie, sinon un encadre qui decrit le cadrage attendu.
 * Le placeholder est visible a l’ecran : il tient lieu de consigne de production.
 */
export default function Media({ slot, ratio = '16 / 10', className = '', eager = false }: MediaProps) {
  if (slot.src) {
    return (
      <img
        src={slot.src}
        alt={slot.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio: ratio }}
        className={`w-full bg-shade object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`hatch flex w-full flex-col justify-between gap-3 bg-shade p-3 md:p-4 ${className}`}
    >
      <span className="eyebrow w-fit bg-paper px-1.5 py-0.5 text-accent">Visuel à ajouter</span>
      <span className="bg-paper px-1.5 py-0.5 text-xs leading-tight text-muted">{slot.framing}</span>
    </div>
  );
}
