import { ArrowUp, Briefcase, Clock, Code2, Github, Linkedin, MapPin } from 'lucide-react';
import { profile } from '@/lib/data';
import { IstClock } from './ContactWidgets';

const links = [
  { label: 'GitHub', href: profile.socials.github, icon: Github },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: profile.socials.leetcode, icon: Code2 },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-surface-container-lowest/90 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-margin-sm py-10 md:px-margin lg:px-margin-lg">
        <div className="flex flex-col items-start justify-between gap-6 pb-6 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-headline-sm text-on-surface">{profile.name}</span>
              <span className="rounded bg-surface-container px-1.5 py-0.5 text-label-sm text-primary">FOUNDING SDE</span>
            </div>
            <p className="max-w-md text-body-sm text-on-surface-variant">
              Founding engineer at Quickads. I build AI products for people who make ads.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="space-y-1">
              <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">Local time</span>
              <div className="flex items-center gap-1.5 text-label-md text-on-surface">
                <Clock size={15} className="text-tertiary" />
                <IstClock />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">Currently</span>
              <div className="flex items-center gap-1.5 text-label-md text-on-surface">
                <Briefcase size={15} className="text-primary" />
                <span>Founding SDE, Quickads</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">Based in</span>
              <div className="flex items-center gap-1.5 text-label-md text-on-surface">
                <MapPin size={15} className="text-secondary" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-5 md:flex-row">
          <p className="text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-label-md uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
            <a
              href="#overview"
              className="flex items-center gap-1 text-label-md uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
            >
              <ArrowUp size={15} /> Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
