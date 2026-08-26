interface SectionHeaderProps {
  title: string;
  lead?: string;
  /** Inverse les couleurs pour les sections sur fond encre. */
  inverted?: boolean;
}

export default function SectionHeader({ title, lead, inverted = false }: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between md:gap-10 ${
        inverted ? 'border-chalk/20' : 'border-line'
      }`}
    >
      <h2 className="display gradient-text text-[clamp(2.5rem,9vw,7rem)]">{title}</h2>
      {lead ? (
        <p className={`max-w-sm text-sm leading-snug ${inverted ? 'text-chalk/60' : 'text-mute'}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
