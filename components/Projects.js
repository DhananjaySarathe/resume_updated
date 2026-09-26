import { ArrowUpRight } from 'lucide-react';
import { accents, projects } from '@/lib/data';
import { readPrunifySelf } from '@/lib/prunifySelf';
import ProjectNotes from './ProjectNotes';
import PrunifyResult from './PrunifyResult';
import SectionHeader from './SectionHeader';
import { icons } from './icons';

export default function Projects() {
  const prunify = readPrunifySelf();

  return (
    <section id="projects" className="mx-auto w-full max-w-[1440px] px-margin-sm py-20 md:px-margin lg:px-margin-lg">
      <SectionHeader
        eyebrow="Side projects"
        title="Things I built on my own"
        note="Built outside work. All three are live, so you can try them."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {projects.map((p, i) => {
          const Icon = icons[p.icon];
          const a = accents[p.accent];
          return (
            <article
              key={p.title}
              id={`project-${p.slug}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms`, '--glow': a.glow }}
              className="glass glass-hover spotlight group flex flex-col justify-between rounded-xl p-7 hover:-translate-y-1"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className={`rounded-lg bg-surface-container p-3 ${a.text}`}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded bg-surface-container px-2 py-0.5 text-label-sm ${a.text}`}>{p.badge}</span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.title}`}
                      className={`rounded-lg p-2 text-on-surface-variant transition-[background-color,box-shadow,color] hover:bg-surface-container ${a.groupText}`}
                    >
                      <ArrowUpRight size={19} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
                <h3 className={`mb-2 font-display text-headline-md text-on-surface transition-colors duration-300 ${a.groupText}`}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                </h3>
                <p className="mb-4 text-body-sm font-medium text-on-surface-variant">{p.category}</p>
                <p className="mb-6 text-body-sm text-on-surface-variant">{p.desc}</p>
                {p.slug === 'prunify' && <PrunifyResult data={prunify} />}
              </div>
              <div>
                <ul className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded bg-surface-container px-2 py-1 text-label-sm text-on-surface-variant">
                      {t}
                    </li>
                  ))}
                </ul>
                <ProjectNotes notes={p.notes} accentText={a.text} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
