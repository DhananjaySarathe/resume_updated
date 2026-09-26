import { ArrowRight } from 'lucide-react';
import { accents, metrics } from '@/lib/data';
import CountUp from './CountUp';
import SectionHeader from './SectionHeader';
import { icons } from './icons';

function MetricValue({ value }) {
  if (value.arrow) {
    const [from, to] = value.arrow;
    return (
      <>
        <span className="sr-only">{value.sr}</span>
        <span aria-hidden="true" className="inline-flex items-center gap-[0.12em]">
          {from}
          <ArrowRight className="h-[0.5em] w-[0.5em]" strokeWidth={2.5} />
          {to}
        </span>
      </>
    );
  }
  return <CountUp value={value.to} format={value.format} prefix={value.prefix} suffix={value.suffix} srText={value.sr} />;
}

export default function Metrics() {
  return (
    <section id="metrics" className="mx-auto w-full max-w-[1440px] px-margin-sm py-16 md:px-margin lg:px-margin-lg">
      <SectionHeader eyebrow="Impact" title="A few numbers from the job" className="mb-10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon = icons[m.icon];
          const a = accents[m.accent];
          return (
            <div
              key={m.title}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms`, '--glow': a.glow }}
              className="glass glass-hover spotlight group flex flex-col justify-between rounded-xl p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className={`rounded-lg bg-surface-container p-2.5 ${a.text}`}>
                  <Icon size={22} />
                </span>
                <span className="text-label-sm text-on-surface-variant">{m.label}</span>
              </div>
              <div>
                <div
                  className={`font-display text-headline-xl font-bold tracking-tight text-on-surface transition-colors duration-300 ${a.groupText}`}
                >
                  <MetricValue value={m.value} />
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
