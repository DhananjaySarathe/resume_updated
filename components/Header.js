'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/lib/data';

export default function Header() {
  const [active, setActive] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const linkRefs = useRef({});

  // One rAF-throttled scroll handler. The progress line is written straight to the DOM;
  // React only re-renders when the current section changes. The current section is the
  // last one whose top has passed a line 25% down the viewport.
  useEffect(() => {
    const ids = ['overview', ...navLinks.map(({ id }) => id)];
    let current = null;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

      const line = window.innerHeight * 0.25;
      let next = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      }
      if (next !== current) {
        current = next;
        setActive(next);
      }
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

  // One underline slides between nav links. When it was hidden, it jumps into place
  // instead of flying in from the left edge.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const place = () => {
      const link = linkRefs.current[active];
      if (!link || !link.offsetWidth) {
        bar.style.opacity = '0';
        return;
      }
      const wasHidden = bar.style.opacity !== '1';
      if (wasHidden) bar.style.transition = 'none';
      bar.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
      bar.style.opacity = '1';
      if (wasHidden) {
        void bar.offsetWidth;
        bar.style.transition = '';
      }
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // The mobile menu closes on Esc (focus goes back to the toggle) or a tap outside the header.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface print:hidden"
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-primary"
      />
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-margin-sm md:px-margin lg:px-margin-lg">
        <a href="#overview" className="group flex flex-col">
          <span className="whitespace-nowrap font-display text-[1.05rem] font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary sm:text-headline-sm">
            {profile.name}
          </span>
          <span className="mt-0.5 whitespace-nowrap text-label-sm text-on-surface-variant">
            <span className="sm:hidden">Founding SDE</span>
            <span className="hidden sm:inline lg:hidden xl:inline">Founding engineer, Quickads</span>
            <span className="hidden lg:inline xl:hidden">Founding SDE, Quickads</span>
          </span>
        </a>

        <nav aria-label="Primary" className="relative hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              className={`py-1 text-label-md transition-colors ${
                active === id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {label}
            </a>
          ))}
          <span
            ref={barRef}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-px origin-left bg-primary opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-lg border border-outline-variant px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container sm:inline-flex"
          >
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="disclosure lg:hidden" data-open={menuOpen} inert={menuOpen ? undefined : ''}>
        <div>
          <nav aria-label="Mobile" className="bg-surface px-margin-sm pb-4 pt-2 md:px-margin">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === id ? 'location' : undefined}
                className={`flex items-center justify-between border-b border-outline-variant py-3 text-label-lg last:border-0 ${
                  active === id ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {label}
                <span aria-hidden="true" className="text-outline">
                  ›
                </span>
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center rounded-lg bg-surface-container-high py-3 text-label-md text-on-surface sm:hidden"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
