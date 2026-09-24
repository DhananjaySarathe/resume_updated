import { CalendarDays, History } from 'lucide-react';
import { experiences, systems } from '@/lib/data';
import SectionHeading from './SectionHeading';

// Renders **bold** segments from the data file.
function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

// Visual weight fades down the timeline: current role glows, older roles recede.
const tiers = [
  {
    beacon: 'border-cyber-lime shadow-[0_0_12px_rgba(204,255,0,0.8)]',
    card: 'hover:border-cyber-lime/40',
    company: 'font-medium text-cyber-lime',
    calendar: 'text-cyber-lime',
    bullet: 'font-bold text-cyber-lime',
    tag: 'text-zinc-300',
  },
  {
    beacon: 'border-zinc-600 transition-colors group-hover:border-cyber-cyan',
    card: 'hover:border-cyber-cyan/40',
    company: 'text-zinc-400',
    calendar: 'text-zinc-400',
    bullet: 'text-zinc-500',
    tag: 'text-zinc-400',
  },
  {
    beacon: 'border-zinc-700',
    card: 'hover:border-white/20',
    company: 'text-zinc-400',
    calendar: 'text-zinc-400',
    bullet: 'text-zinc-600',
    tag: 'text-zinc-400',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 w-full border-y border-white/10 bg-ink-raised py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <SectionHeading
          className="mb-14"
          data-reveal
          icon={History}
          label="[04 // TRACK RECORD & CHRONOLOGY]"
          title="Work Experience"
        />

        <ol className="relative space-y-10 border-l border-white/10 pl-6 sm:pl-10">
          {experiences.map((exp, index) => {
            const tier = tiers[Math.min(index, tiers.length - 1)];
            return (
              <li key={exp.role} className="group relative" data-reveal>
                <div
                  className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 bg-black sm:-left-[47px] ${tier.beacon}`}
                >
                  {exp.current && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyber-lime opacity-60" />
                  )}
                </div>

                <div
                  className={`rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all md:p-8 ${tier.card}`}
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-headline text-2xl font-bold text-white">{exp.role}</h3>
                        {exp.current && (
                          <span className="rounded bg-cyber-lime px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-black">
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`mt-1 font-mono text-sm ${tier.company}`}>{exp.company}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 self-start rounded border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300 sm:self-auto">
                      <CalendarDays size={14} className={tier.calendar} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="mb-6 text-sm italic text-zinc-300 sm:text-base">{exp.summary}</p>

                  <ul className="space-y-3 text-sm text-zinc-300 sm:text-base">
                    {exp.achievements.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className={`select-none font-mono ${tier.bullet}`} aria-hidden="true">
                          ›
                        </span>
                        <span>
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {exp.showSystems && (
                    <div className="mt-6 rounded-md border border-cyber-lime/20 bg-cyber-lime/[0.03] p-4">
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-cyber-lime">
                        Systems shipped · open in console ↓
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {systems.map((s, i) => (
                          <a
                            key={s.slug}
                            href={`#system-${s.slug}`}
                            className="group/chip inline-flex items-center gap-2 rounded border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-cyber-lime hover:text-cyber-lime"
                          >
                            <span className="text-zinc-600 group-hover/chip:text-cyber-lime">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {s.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4 font-mono text-xs">
                    {exp.tags.map((tag) => (
                      <span key={tag} className={`rounded border border-white/10 bg-white/5 px-2.5 py-1 ${tier.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
