import { Cpu } from 'lucide-react';
import { stack } from '@/lib/data';
import { accents } from '@/lib/accents';
import SectionHeading from './SectionHeading';

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 w-full border-y border-white/10 bg-ink-raised py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <SectionHeading
          className="mb-14"
          data-reveal
          icon={Cpu}
          label="[07 // FOUNDATIONAL TOOLING]"
          title="Tech Stack & Specializations"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stack.map((group, index) => {
            const a = accents[group.accent];
            return (
              <div
                key={group.category}
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` }}
                className={`spotlight rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors ${a.borderSoft}`}
              >
                <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-zinc-400">
                  <span>{group.category}</span>
                  <span className={`font-bold ${a.text}`}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white transition-colors ${a.chipHover}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
