import { accents, stack } from '@/lib/data';
import SectionHeader from './SectionHeader';
import { icons } from './icons';

export default function Stack() {
  return (
    <section id="stack" className="mx-auto w-full max-w-[1440px] px-margin-sm py-16 md:px-margin lg:px-margin-lg">
      <SectionHeader eyebrow="Stack" title="What I build with" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => {
          const Icon = icons[group.icon];
          const a = accents[group.accent];
          return (
            <div
              key={group.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms`, '--glow': a.glow }}
              className="glass glass-hover spotlight rounded-xl p-6"
            >
              <div className={`mb-4 flex items-center gap-2 ${a.text}`}>
                <Icon size={19} aria-hidden="true" />
                <h3 className="font-display text-headline-sm text-on-surface">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded bg-surface-container px-3 py-1.5 text-label-md text-on-surface">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
