import { Database, Gauge, ShieldCheck, Zap } from 'lucide-react';
import { about } from '@/lib/data';
import CountUp from './CountUp';

export default function About() {
  return (
    <section id="about" className="relative z-10 w-full border-y border-white/10 bg-ink-raised py-20">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyber-lime">
          <Zap size={16} aria-hidden="true" />
          <span>[01 // ABOUT ME &amp; SYSTEM METRICS]</span>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div data-reveal className="spotlight flex flex-col justify-between rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-cyber-lime/30 md:p-8 lg:col-span-8">
            <div>
              <h2 className="mb-4 font-headline text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Turning Complex Problems into <span className="text-cyber-lime">Elegant Solutions</span>
              </h2>
              <p className="mb-6 text-base font-light leading-relaxed text-zinc-300 sm:text-lg">{about.bio}</p>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4 font-mono text-xs">
              {about.highlights.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-3 py-1 text-zinc-300"
                >
                  <span className="text-cyber-lime">◈</span> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className="group flex flex-1 flex-col justify-between rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-cyber-cyan/40">
              <div className="mb-3 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span className="uppercase tracking-wider">[SYS_METRIC: REPO_INDEX]</span>
                <Database size={20} className="text-cyber-cyan transition-transform group-hover:scale-110" />
              </div>
              <div>
                <div className="font-headline text-5xl font-extrabold tracking-tight text-white transition-colors group-hover:text-cyber-cyan">
                  <CountUp value={1000000} format="compact" suffix="+" duration={1800} />
                </div>
                <p className="mt-2 text-sm font-medium text-zinc-300">Ads Indexed &amp; Analyzed in Realtime</p>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[88%] bg-cyber-cyan" />
                </div>
              </div>
            </div>

            <div className="group flex flex-1 flex-col justify-between rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-cyber-lime/40">
              <div className="mb-3 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span className="uppercase tracking-wider">[SYS_METRIC: SPEED_OPTIMIZATION]</span>
                <Gauge size={20} className="text-cyber-lime transition-transform group-hover:scale-110" />
              </div>
              <div>
                <div className="font-headline text-5xl font-extrabold tracking-tight text-cyber-lime">
                  <CountUp value={30} suffix="%" />
                </div>
                <p className="mt-2 text-sm font-medium text-zinc-300">Performance Boost &amp; Page Load Speedup</p>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[95%] bg-cyber-lime" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-reveal style={{ '--reveal-delay': '200ms' }} className="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/60 p-5 backdrop-blur-md md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-cyber-lime">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="block font-headline text-base font-semibold text-white">
                Engineered for Technical Founders &amp; High-Velocity Teams
              </span>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Delivering product velocity without architectural debt or UI compromises.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-cyber-cyan">LCP &lt; 1.2s</span>
            <span className="rounded border border-white/10 bg-zinc-900 px-3 py-1.5 text-cyber-lime">TTFB &lt; 180ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
