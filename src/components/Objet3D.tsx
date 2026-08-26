interface Objet3DProps {
  /** Nom du fichier dans public/objets, sans extension. */
  nom: 'torus' | 'sphere' | 'spirale';
  className?: string;
}

/**
 * Objet 3D decoratif.
 * Les rendus sont sur fond noir : `mix-blend-mode: screen` fait disparaitre ce fond
 * sans passer par une couche alpha, et l'objet se pose donc sur n'importe quelle
 * surface sombre sans decoupe visible.
 */
export default function Objet3D({ nom, className = '' }: Objet3DProps) {
  return (
    <img
      src={`/objets/${nom}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={600}
      height={600}
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
