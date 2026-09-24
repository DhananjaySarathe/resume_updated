'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/lib/data';

export default function Header() {
  const [active, setActive] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  // Scroll-spy: a thin band near the top of the viewport decides the current section.
  useEffect(() => {
    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll progress is written straight to the DOM so scrolling never re-renders React.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/75 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-primary-fixed"
      />
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-margin-sm md:px-margin lg:px-margin-lg">
        <a href="#overview" className="group flex flex-col">
          <span className="whitespace-nowrap font-display text-[1.05rem] tracking-tight text-on-surface transition-colors group-hover:text-primary sm:text-headline-sm">
            {profile.name}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-pill bg-primary" />
            </span>
            <span className="whitespace-nowrap text-label-sm uppercase tracking-widest text-on-surface-variant">
              <span className="sm:hidden">Founding SDE</span>
              <span className="hidden sm:inline">Founding engineer, Quickads</span>
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`relative py-1 text-label-md uppercase tracking-wider transition-colors ${
                active === id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ${
                  active === id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-lg bg-surface-container-high px-4 py-2 text-label-md uppercase tracking-wider text-on-surface transition-all hover:bg-surface-bright sm:inline-flex"
          >
            Resume
          </a>
          <a
            href="#connect"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary-container px-3 py-2 text-label-md sm:px-4 uppercase tracking-wider text-on-primary shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all hover:bg-primary hover:shadow-[0_0_32px_rgba(6,182,212,0.55)]"
          >
            Book a call
          </a>
          <a
            href="#overview"
            aria-label="Back to top"
            className="relative hidden h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/40 sm:block"
          >
            <Image src="/portrait.jpg" alt="" fill sizes="32px" className="object-cover object-top" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface xl:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="bg-surface/95 px-margin-sm pb-4 backdrop-blur-xl md:px-margin xl:hidden">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between border-b border-white/5 py-3 text-label-lg uppercase tracking-wider last:border-0 ${
                active === id ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {label}
              <span className="text-outline">›</span>
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center rounded-lg bg-surface-container-high py-3 text-label-md uppercase tracking-wider text-on-surface sm:hidden"
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
