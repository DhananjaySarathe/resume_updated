import Image from 'next/image';
import { ArrowUpRight, FileText, MapPin, Radar, Terminal } from 'lucide-react';
import { heroSpecializations, profile } from '@/lib/data';
import ShaderBackground from './ShaderBackground';

export default function Hero() {
  return (
    <>
      {/* Animated shader behind the hero, fading into the page base */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[880px] overflow-hidden">
        <ShaderBackground className="opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
        <div className="cyber-grid-overlay absolute inset-0 opacity-40" />
      </div>

      <section id="overview" className="relative z-10 w-full pb-24 pt-12">
        <div className="mx-auto max-w-[1240px] px-4 md:px-8">
          <div className="hero-in mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs">
            <div className="inline-flex items-center gap-2 rounded-sm border border-cyber-lime/40 bg-black/60 px-3 py-1 text-cyber-lime shadow-[0_0_15px_rgba(204,255,0,0.15)] backdrop-blur-md">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyber-lime" />
              <span className="font-semibold tracking-wider">[SYS_OP: ONLINE // 0→1 FOUNDING ENGINEER]</span>
            </div>
            <div className="hidden items-center gap-4 text-zinc-400 sm:flex">
              <span className="flex items-center gap-1.5">
                <Radar size={14} className="text-cyber-cyan" /> LATENCY &lt; 45ms
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-cyber-lime" /> BENGALURU, IN
              </span>
              <span className="text-white/20">|</span>
              <span className="text-zinc-500">SYSTEM_STATUS: NOMINAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="hero-in mb-4 inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs tracking-widest text-cyber-cyan" style={{ '--d': '120ms' }}>
                <span className="text-cyber-lime">//</span> ARCHITECTURAL RIGOR &amp; SYSTEMS DEV
              </div>
              <h1 style={{ '--d': '180ms' }} className="hero-in mb-6 font-headline text-[2.4rem] font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-6xl xl:text-[76px]">
                {profile.firstName} <br />
                <span className="bg-gradient-to-r from-cyber-lime via-white to-cyber-cyan bg-clip-text text-transparent">
                  {profile.lastName}
                </span>
              </h1>
              <p style={{ '--d': '380ms' }} className="hero-in mb-8 max-w-xl text-lg font-light leading-relaxed text-zinc-300 sm:text-xl">
                Building scalable, <span className="font-medium text-white">AI-driven ecosystems</span>, low-latency
                architectures, and high-performance web products.
              </p>

              <div className="hero-in mb-10 flex w-full flex-wrap items-center gap-4 sm:w-auto" style={{ '--d': '500ms' }}>
                <a
                  href="#projects"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-cyber-lime px-6 py-3.5 font-mono text-sm font-bold tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(204,255,0,0.6)] sm:w-auto"
                >
                  <Terminal size={18} />
                  <span>View Featured Work</span>
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-white/20 bg-black/60 px-6 py-3.5 font-mono text-sm text-white backdrop-blur-md transition-all hover:border-cyber-lime hover:bg-white/10 sm:w-auto"
                >
                  <FileText size={18} className="text-cyber-lime" />
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} className="text-zinc-400" />
                </a>
              </div>

              <div className="hero-in flex w-full flex-wrap items-center gap-3 border-t border-white/10 pt-4 font-mono text-xs text-zinc-400" style={{ '--d': '620ms' }}>
                <span className="text-cyber-lime">CORE SPECIALIZATIONS:</span>
                {heroSpecializations.map((item) => (
                  <span key={item} className="rounded border border-white/10 bg-black/50 px-2 py-1 text-zinc-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-in relative lg:col-span-5" style={{ '--d': '300ms' }}>
              <div className="corner-bracket group rounded-lg border border-white/15 bg-zinc-950/80 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyber-lime/60">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-black sm:aspect-[4/3] lg:aspect-[3/4]">
                  <Image
                    src="/portrait.jpg"
                    alt={profile.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 90vw, 100vw"
                    className="object-cover object-top contrast-125 grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyber-lime/5 via-transparent to-cyber-cyan/5" />
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded border border-cyber-lime/40 bg-black/80 px-2 py-1 font-mono text-[10px] text-cyber-lime backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyber-lime" />
                    FOUNDING SDE
                  </div>
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2 rounded border border-white/10 bg-black/80 px-2.5 py-1 font-medium text-white backdrop-blur-md">
                      <span className="font-bold text-cyber-lime">QUICKADS.AI</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-[11px] text-zinc-300">BENGALURU</span>
                    </div>
                    <span className="rounded border border-white/10 bg-black/80 px-2 py-1 text-[10px] text-zinc-400 backdrop-blur-md">
                      NODE // 01
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
