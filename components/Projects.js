import { ArrowUpRight } from 'lucide-react';
import { accents, projects } from '@/lib/data';
import { readPrunifySelf } from '@/lib/prunifySelf';
import ProjectNotes from './ProjectNotes';
import ProjectPreview from './ProjectPreview';
import ProjectStage from './ProjectStage';
import PrunifyResult from './PrunifyResult';
import SectionHeader from './SectionHeader';
import TimelineTrack from './TimelineTrack';
import { icons } from './icons';

// A project's dot is an empty ring until the progress line reaches it.
const nodeColor = {
  primary: 'data-[reached=true]:border-primary data-[reached=true]:bg-primary',
  secondary: 'data-[reached=true]:border-secondary data-[reached=true]:bg-secondary',
  tertiary: 'data-[reached=true]:border-tertiary data-[reached=true]:bg-tertiary',
};

// The projects read as a journey: chapters on a progress line, with a pinned preview
// on wide screens that plays the chapter you are on. On phones each chapter carries
// its own preview.
export default function Projects() {
  const prunify = readPrunifySelf();
  const total = String(projects.length).padStart(2, '0');
  const stageItems = projects.map(({ slug, title, category, url, preview }) => ({ slug, title, category, url, preview }));

  return (
    <section id="projects" className="mx-auto w-full max-w-[1200px] px-margin-sm py-20 md:px-margin lg:px-margin-lg">
      <SectionHeader
        eyebrow="Side projects"
        title="Things I built on my own"
        note="Built outside work. Each one is live or open source, so you can try it."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="hidden lg:col-span-7 lg:block print:hidden">
          <ProjectStage items={stageItems} />
        </div>

        <div className="relative pl-8 md:pl-12 lg:col-span-5 print:pl-0">
          <TimelineTrack className="bottom-0 left-[11px] top-3 md:left-[17px] print:hidden" />
          <ol className="project-chapters">
            {projects.map((p, i) => {
              const Icon = icons[p.icon];
              const a = accents[p.accent];
              return (
                <li
                  key={p.title}
                  id={`project-${p.slug}`}
                  data-chapter={i}
                  data-reveal
                  className="group relative pb-16 last:pb-0 lg:min-h-[64vh] lg:pb-10"
                >
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-pill bg-background md:-left-[41px] print:hidden"
                    >
                      <span
                        data-timeline-node
                        className={`h-3 w-3 rounded-pill border-2 border-outline-variant bg-background transition-colors duration-300 ${nodeColor[p.accent]}`}
                      />
                    </div>

                    {p.preview && (
                      <div className="lg:hidden">
                        <ProjectPreview title={p.title} preview={p.preview} />
                      </div>
                    )}

                    <div className="project-head flex flex-wrap items-center gap-3">
                      <span className="font-mono text-label-md tabular-nums text-on-surface-variant transition-colors group-data-[active=true]:text-primary">
                        {String(i + 1).padStart(2, '0')} / {total}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 rounded bg-surface-container px-2 py-0.5 text-label-sm ${a.text}`}>
                        <Icon size={14} aria-hidden="true" />
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-headline-md text-on-surface md:text-[1.625rem]">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                      >
                        {p.title}
                        <ArrowUpRight
                          size={20}
                          aria-hidden="true"
                          className="text-on-surface-variant transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-primary"
                        />
                      </a>
                    </h3>
                    <p className="mt-1 text-body-md font-medium text-on-surface">{p.category}</p>
                    {p.builtWith && (
                      <p className="mt-2 text-label-lg font-medium text-on-surface-variant">
                        Built together with{' '}
                        <a href={p.builtWith.url} target="_blank" rel="noopener noreferrer" className="text-link text-on-surface">
                          {p.builtWith.name}
                        </a>
                      </p>
                    )}
                    <p className="mt-4 text-body-md text-on-surface-variant">{p.desc}</p>
                    {p.slug === 'prunify' && (
                      <div className="mt-5 [&>div]:mb-0">
                        <PrunifyResult data={prunify} />
                      </div>
                    )}
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${p.title} stack`}>
                      {p.tags.map((t) => (
                        <li key={t} className="rounded bg-surface-container px-2 py-1 text-label-sm text-on-surface-variant">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <ProjectNotes notes={p.notes} accentText={a.text} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
