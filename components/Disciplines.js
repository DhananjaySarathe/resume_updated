import { accents, disciplines } from '@/lib/data';
import SectionHeader from './SectionHeader';
import { icons } from './icons';

export default function Disciplines() {
  return (
    <section
      id="disciplines"
      className="mx-auto w-full max-w-[1440px] px-margin-sm py-16 md:px-margin lg:px-margin-lg print:hidden"
    >
      <SectionHeader
        tone="text-secondary"
        eyebrow="What I work on"
        title="Where my time goes"
        note="Mostly frontend architecture, with a lot of AI and scraping work mixed in."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {disciplines.map((d, i) => {
          const Icon = icons[d.icon];
          const a = accents[d.accent];
          return (
            <article
              key={d.title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 2) * 110}ms`, '--glow': a.glow }}
              className="glass glass-hover spotlight group rounded-xl p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className={`rounded-lg bg-surface-container p-3 ${a.text}`}>
                  <Icon size={26} />
                </div>
                <span className="rounded bg-surface-container-high px-2.5 py-1 text-label-sm text-on-surface-variant">{d.badge}</span>
              </div>
              <h3 className={`mb-3 font-display text-headline-md text-on-surface transition-colors duration-300 ${a.groupText}`}>
                {d.title}
              </h3>
              <p className="max-w-[62ch] text-body-md text-on-surface-variant">{d.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
