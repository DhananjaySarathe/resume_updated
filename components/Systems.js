'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Boxes } from 'lucide-react';
import { systems } from '@/lib/data';
import SectionHeading from './SectionHeading';

const HASH_PREFIX = '#system-';

export default function Systems() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const consoleRef = useRef(null);

  // Experience chips link to #system-<slug>; select the matching tab when that happens.
  useEffect(() => {
    const syncFromHash = () => {
      if (!window.location.hash.startsWith(HASH_PREFIX)) return;
      const index = systems.findIndex((s) => HASH_PREFIX + s.slug === window.location.hash);
      if (index < 0) return;
      setActive(index);
      // The browser jumps to the tab button; frame the whole console instead so the panel is in view.
      requestAnimationFrame(() => {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        consoleRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      });
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const focusTab = useCallback((index) => {
    const next = (index + systems.length) % systems.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }, []);

  const onKeyDown = (event) => {
    const keys = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: systems.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    focusTab(keys[event.key]);
  };

  const system = systems[active];

  return (
    <section id="systems" className="relative z-10 w-full border-y border-white/10 bg-ink-raised py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div data-reveal>
          <SectionHeading
            className="mb-12"
            icon={Boxes}
            label="[05 // SHIPPED AT QUICKADS]"
            title="Five systems, built from zero."
            description="What I built as a founding engineer at Quickads. Pick one to see what it does and how it flows."
          />
        </div>

        <div
          ref={consoleRef}
          className="grid scroll-mt-28 grid-cols-1 gap-5 lg:grid-cols-12"
          data-reveal
          style={{ '--reveal-delay': '100ms' }}
        >
          <div
            role="tablist"
            aria-label="Quickads systems"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 py-1 lg:col-span-4 lg:py-0 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {systems.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.slug}
                  id={`system-${s.slug}`}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="system-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative flex min-w-[200px] shrink-0 snap-start items-center gap-4 overflow-hidden rounded-lg border px-4 py-3.5 text-left transition-all duration-300 lg:min-w-0 ${
                    selected
                      ? 'border-cyber-lime/50 bg-cyber-lime/[0.06] shadow-[0_0_24px_rgba(204,255,0,0.08)]'
                      : 'border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/[0.03]'
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-cyber-lime transition-transform duration-500 ${
                      selected ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <span className={`font-mono text-xs ${selected ? 'text-cyber-lime' : 'text-zinc-600'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate font-headline text-base font-bold transition-colors ${
                        selected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {s.tag}
                    </span>
                  </span>
                  <span
                    className={`hidden font-mono text-sm transition-all lg:block ${
                      selected ? 'translate-x-0 text-cyber-lime opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="system-panel"
            role="tabpanel"
            aria-labelledby={`system-${system.slug}`}
            className="corner-bracket relative rounded-lg border border-white/10 bg-black/50 backdrop-blur-md lg:col-span-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-widest md:px-8">
              <span className="text-zinc-400">
                Module <span className="text-white">{String(active + 1).padStart(2, '0')}</span> / {String(systems.length).padStart(2, '0')}
              </span>
              <span className="flex items-center gap-2 text-cyber-lime">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-lime opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-lime" />
                </span>
                Shipped
              </span>
            </div>

            <div key={system.slug} className="panel-in p-6 md:p-8">
              <span className="mb-3 inline-block rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-cyber-cyan">
                {system.tag}
              </span>
              <h3 className="mb-3 font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">{system.name}</h3>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">{system.summary}</p>

              <div className="mb-8">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">Pipeline</div>
                <ol className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
                  {system.flow.map((step, i) => (
                    <li key={step} className="flex flex-col items-start sm:flex-row sm:items-center">
                      {i > 0 && (
                        <span className="flow-connector sm:mx-2" style={{ '--flow-delay': `${i * 300}ms` }} aria-hidden="true" />
                      )}
                      <span
                        className={`rounded border px-3 py-1.5 font-mono text-xs ${
                          i === system.flow.length - 1
                            ? 'border-cyber-lime/50 bg-cyber-lime/10 text-cyber-lime'
                            : 'border-white/10 bg-white/5 text-zinc-200'
                        }`}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="mb-8 space-y-3 text-sm text-zinc-300 sm:text-base">
                {system.details.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="select-none font-mono font-bold text-cyber-lime" aria-hidden="true">
                      ›
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5 font-mono text-xs">
                {system.stack.map((t) => (
                  <span key={t} className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
