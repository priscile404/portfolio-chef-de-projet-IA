interface SectionHeaderProps {
  /** Le texte du titre. Un fragment entoure d'asterisques passe dans la couleur
      d'accent : `Comment je *travaille*`. */
  title: string;
  lead?: string;
}

/**
 * Decoupe le titre sur les asterisques et met en couleur les fragments encadres.
 * Un asterisque non ferme est rendu tel quel, sans casser le titre.
 */
function fragments(titre: string) {
  return titre.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <span key={i} className="accentue">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

export default function SectionHeader({ title, lead }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-end md:justify-between md:gap-10">
      <h2 className="display text-chalk text-[clamp(2.5rem,9vw,7rem)]">{fragments(title)}</h2>
      {lead ? <p className="max-w-sm text-sm leading-snug text-mute">{lead}</p> : null}
    </div>
  );
}
