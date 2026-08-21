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
        inverted ? 'border-paper/30' : 'border-ink'
      }`}
    >
      <h2 className="display text-[clamp(2rem,7vw,4rem)]">{title}</h2>
      {lead ? (
        <p className={`max-w-sm text-sm leading-snug ${inverted ? 'text-paper/70' : 'text-muted'}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
