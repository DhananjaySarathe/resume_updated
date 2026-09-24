// Eyebrow + serif headline, with an optional side note that sits bottom-right on wide screens.
export default function SectionHeader({ icon: Icon, eyebrow, title, note, tone = 'text-primary', className = 'mb-12' }) {
  return (
    <div className={`flex flex-col justify-between gap-4 md:flex-row md:items-end ${className}`} data-reveal>
      <div>
        <div className={`eyebrow mb-2 ${tone}`}>
          <Icon size={16} aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">{title}</h2>
      </div>
      {note && <p className="max-w-md text-body-md text-on-surface-variant">{note}</p>}
    </div>
  );
}
