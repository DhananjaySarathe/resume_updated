'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Github, Linkedin, Menu, Terminal, X } from 'lucide-react';
import { navLinks, profile, topTicker } from '@/lib/data';
import Marquee from './Marquee';

const socialLinks = [
  { href: profile.socials.github, label: 'GitHub', icon: Github },
  { href: profile.socials.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: profile.socials.leetcode, label: 'LeetCode', icon: Terminal },
];

export default function Header() {
  const [active, setActive] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  // Scroll progress is written straight to the DOM so scrolling never re-renders React.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      // A thin band near the top of the viewport decides which section is "current".
      { rootMargin: '-20% 0px -75% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-cyber-lime via-cyber-lime to-cyber-cyan shadow-[0_0_8px_rgba(204,255,0,0.7)]"
        />
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#overview" className="group flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 bg-black font-mono font-bold text-cyber-lime transition-all group-hover:border-cyber-lime group-hover:shadow-[0_0_12px_rgba(204,255,0,0.5)]">
              <span>{profile.initials}</span>
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-cyber-lime" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-sm font-bold leading-none tracking-tight text-white transition-colors group-hover:text-cyber-lime sm:text-base">
                {profile.name}
              </span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime" />
                {profile.role}
              </span>
            </div>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1.5 font-mono text-xs text-zinc-400 shadow-inner xl:flex"
          >
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`rounded-full px-3 py-1 transition-all ${
                  active === id ? 'bg-white/10 font-medium text-white' : 'hover:bg-white/5 hover:text-cyber-lime'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 font-mono text-xs sm:gap-3">
            <div className="hidden items-center gap-1 border-r border-white/10 pr-3 sm:flex">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="rounded p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-cyber-lime"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="group inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-2.5 py-1.5 font-medium transition-all hover:border-cyber-lime hover:bg-cyber-lime hover:text-black sm:px-3"
            >
              <FileText size={15} className="text-cyber-lime group-hover:text-black" />
              <span className="hidden sm:inline">Resume</span>
              <ArrowUpRight size={13} className="hidden sm:block" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="rounded p-2 text-zinc-300 transition-colors hover:bg-white/5 hover:text-cyber-lime xl:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-white/10 bg-ink/95 px-4 py-3 font-mono text-sm xl:hidden"
          >
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between border-b border-white/5 py-3 last:border-0 ${
                  active === id ? 'text-cyber-lime' : 'text-zinc-300'
                }`}
              >
                {label}
                <span className="text-zinc-600">›</span>
              </a>
            ))}
            <div className="flex gap-2 pt-3 sm:hidden">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 text-xs text-zinc-300"
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Live ticker directly under the fixed nav */}
      <div className="relative z-20 mt-16 w-full overflow-hidden border-b border-white/10 bg-black/60 py-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 backdrop-blur-md">
        <Marquee items={topTicker} />
      </div>
    </>
  );
}
