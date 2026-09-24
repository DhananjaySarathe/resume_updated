import { ArrowUpRight, ExternalLink, Terminal } from 'lucide-react';
import { profile, projects } from '@/lib/data';
import { accents } from '@/lib/accents';
import SectionHeading from './SectionHeading';
import ProjectNotes from './ProjectNotes';

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 w-full py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
          <SectionHeading
            icon={Terminal}
            label="[06 // SELECTED BUILDS]"
            title="Featured Projects"
            description="Some things I've built from conception to launch."
          />
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs transition-all hover:border-cyber-lime hover:text-cyber-lime md:self-auto"
          >
            <span>View GitHub Archive</span>
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project, i) => {
            const a = accents[project.accent];
            return (
              <article
                key={project.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 110}ms` }}
                className={`spotlight group flex flex-col justify-between rounded-lg border border-white/10 bg-black/50 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 sm:p-7 ${a.borderStrong}`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${a.text}`}
                    >
                      {project.category}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className={`p-1 text-zinc-400 transition-colors ${a.hoverText}`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                  <h3 className={`mb-3 font-headline text-2xl font-bold text-white transition-colors ${a.groupText}`}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-zinc-300">{project.desc}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4 font-mono text-xs text-zinc-400">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded border border-white/5 bg-zinc-900 px-2 py-0.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <ProjectNotes notes={project.notes} accentText={a.text} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
