import { BrainCircuit, Layers, LayoutDashboard, ScanSearch, Server } from 'lucide-react';
import { disciplines } from '@/lib/data';
import { accents } from '@/lib/accents';
import SectionHeading from './SectionHeading';

const icons = { layout: LayoutDashboard, brain: BrainCircuit, server: Server, scan: ScanSearch };

export default function Disciplines() {
  return (
    <section id="disciplines" className="relative z-10 w-full py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <SectionHeading
          className="mb-14"
          data-reveal
          icon={Layers}
          label="[03 // WHAT I DO]"
          title="Core Engineering Disciplines"
          description="I combine rigorous engineering principles with human-centric design to deliver robust, low-maintenance production applications."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((item, i) => {
            const Icon = icons[item.icon];
            const a = accents[item.accent];
            return (
              <div
                key={item.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className={`spotlight group flex flex-col justify-between rounded-lg border border-white/10 bg-black/40 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 ${a.border}`}
              >
                <div>
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded border border-white/10 bg-white/5 transition-colors ${a.iconHover}`}
                  >
                    <Icon size={24} className={a.text} />
                  </div>
                  <h3 className={`mb-2 font-headline text-xl font-bold text-white transition-colors ${a.groupText}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                </div>
                <div className={`mt-6 border-t border-white/10 pt-4 font-mono text-xs ${a.text}`}>{item.stack}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
