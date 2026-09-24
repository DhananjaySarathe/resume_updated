import { BarChart3 } from 'lucide-react';
import { accents, metrics } from '@/lib/data';
import CountUp from './CountUp';
import SectionHeader from './SectionHeader';
import { icons } from './icons';

export default function Metrics() {
  return (
    <section id="metrics" className="mx-auto w-full max-w-[1440px] px-margin-sm py-16 md:px-margin lg:px-margin-lg">
      <SectionHeader icon={BarChart3} eyebrow="Impact" title="A few numbers from the job" className="mb-10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = icons[m.icon];
          const a = accents[m.accent];
          return (
            <div
              key={m.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms`, '--glow': a.glow }}
              className="glass glass-hover spotlight group flex flex-col justify-between rounded-xl p-6 hover:-translate-y-1"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className={`rounded-lg bg-surface-container p-2.5 ${a.text}`}>
                  <Icon size={22} />
                </span>
                <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">{m.label}</span>
              </div>
              <div>
                <div
                  className={`font-display text-headline-xl font-bold tracking-tight text-on-surface transition-colors duration-300 ${a.groupText}`}
                >
                  {m.value.text ?? <CountUp value={m.value.to} format={m.value.format} suffix={m.value.suffix} />}
                </div>
                <p className="mt-1 text-body-md font-medium text-on-surface">{m.title}</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">{m.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
