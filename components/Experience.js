import { accents, experience } from '@/lib/data';
import SectionHeader from './SectionHeader';
import TimelineTrack from './TimelineTrack';
import { icons } from './icons';

const nodeColor = {
  primary: 'bg-primary shadow-[0_0_12px_rgba(76,215,246,0.9)]',
  secondary: 'bg-secondary shadow-[0_0_12px_rgba(208,188,255,0.7)]',
  outline: 'bg-outline-variant',
};
const companyColor = { primary: 'text-primary', secondary: 'text-secondary', outline: 'text-on-surface-variant' };

export default function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-[1440px] px-margin-sm py-20 md:px-margin lg:px-margin-lg">
      <SectionHeader eyebrow="Experience" title="Where I&apos;ve worked" className="mb-14" />

      <div className="relative pl-8 md:pl-12 print:pl-0">
        <TimelineTrack className="bottom-3 left-2.5 top-3 md:left-4" />
        <ol className="space-y-12">
          {experience.map((job) => {
            const glow = accents[job.accent]?.glow ?? '255 255 255';
            return (
              <li key={job.role} className="relative" data-reveal>
                <div
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-pill bg-surface-container-lowest md:-left-[41px] print:hidden"
                >
                  <span className={`h-3 w-3 rounded-pill ${nodeColor[job.accent]}`}>
                    {job.current && <span className="block h-full w-full animate-pulse-slow rounded-pill bg-primary" />}
                  </span>
                </div>

                <div className="glass glass-hover rounded-xl p-6 md:p-8" style={{ '--glow': glow }}>
                  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-headline-sm text-on-surface md:text-[1.4rem]">{job.role}</h3>
                        {job.current && (
                          <span className="rounded-pill bg-primary-container/20 px-2.5 py-0.5 text-label-sm font-semibold text-primary">
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`mt-0.5 text-body-md ${companyColor[job.accent]}`}>
                        {job.companyUrl ? (
                          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    </div>
                    <span className="shrink-0 text-label-md tabular-nums text-on-surface-variant">{job.period}</span>
                  </div>

                  {job.summary && <p className="max-w-[70ch] text-body-md text-on-surface-variant">{job.summary}</p>}

                  {job.highlights && (
                    <div
                      id="quickads-modules"
                      className="mt-6 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2"
                    >
                      {job.highlights.map((h) => {
                        const Icon = icons[h.icon];
                        return (
                          <div key={h.title} className="rounded-lg bg-surface-container/60 p-4">
                            <div className="mb-1.5 flex items-center gap-2 text-label-md text-primary">
                              <Icon size={17} aria-hidden="true" />
                              <span>{h.title}</span>
                            </div>
                            <p className="text-body-sm text-on-surface-variant">{h.body}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {job.points && (
                    <ul className="max-w-[70ch] space-y-3 text-body-md text-on-surface-variant">
                      {job.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-pill bg-secondary/70" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
