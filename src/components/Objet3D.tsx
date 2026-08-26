interface Objet3DProps {
  /** Nom du fichier dans public/objets, sans extension. */
  nom: string;
  className?: string;
  /** Decalage de l'animation de flottement, pour que les objets ne bougent pas ensemble. */
  delai?: number;
}

/**
 * Objet 3D decoratif.
 * Les rendus sont des PNG a transparence reelle : le fond noir d'origine a ete
 * converti en canal alpha, ce qui les rend lisibles sur le fond clair.
 */
export default function Objet3D({ nom, className = '', delai = 0 }: Objet3DProps) {
  return (
    <img
      src={`/objets/${nom}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={600}
      height={600}
      className={`flotte pointer-events-none absolute select-none ${className}`}
      style={{ animationDelay: `${delai}s` }}
    />
  );
}
