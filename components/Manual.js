import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { photos, principles } from '@/lib/data';
import CountUp from './CountUp';

// Viewfinder corner marks; they tighten toward the subject on hover.
const corners = [
  'left-2 top-2 border-l border-t group-hover:translate-x-1 group-hover:translate-y-1',
  'right-2 top-2 border-r border-t group-hover:-translate-x-1 group-hover:translate-y-1',
  'bottom-2 left-2 border-b border-l group-hover:translate-x-1 group-hover:-translate-y-1',
  'bottom-2 right-2 border-b border-r group-hover:-translate-x-1 group-hover:-translate-y-1',
];

function Frame({ photo, index, badge, nameplate, caption, sizes, className = '', boxClassName = '', imgClassName = '' }) {
  return (
    <figure className={`group flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden rounded-lg border border-white/10 bg-black transition-colors duration-500 group-hover:border-cyber-lime/50 ${boxClassName}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className={`object-cover grayscale-[40%] transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0 ${imgClassName}`}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
            nameplate ? 'from-black/90 via-black/10 to-black/30' : 'from-black/30 via-transparent to-black/30'
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyber-lime/[0.06] via-transparent to-cyber-cyan/[0.06] mix-blend-screen" />

        {corners.map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute h-3.5 w-3.5 border-white/50 transition-all duration-500 group-hover:border-cyber-lime ${pos}`}
          />
        ))}

        <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="rounded border border-white/10 bg-black/70 px-2 py-1 text-zinc-300 backdrop-blur-md">
            {String(index).padStart(2, '0')} / 03
          </span>
          <span className="hidden items-center gap-1.5 rounded border border-cyber-lime/30 bg-black/70 px-2 py-1 text-cyber-lime backdrop-blur-md sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime" />
            {badge}
          </span>
        </div>

        {nameplate && (
          <div className="absolute inset-x-6 bottom-6">
            <span className="mb-3 block h-px w-10 bg-cyber-lime transition-all duration-700 group-hover:w-20" />
            <span className="block font-headline text-2xl font-bold leading-none tracking-tight text-white sm:text-3xl">
              {nameplate.name}
            </span>
            <span className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
              {nameplate.meta.map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  {i > 0 && <span className="text-cyber-lime">/</span>}
                  {item}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 flex items-baseline gap-3 border-t border-white/10 pt-3">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-cyber-lime">
            Fig. {String(index).padStart(2, '0')}
          </span>
          <span className="text-xs leading-relaxed text-zinc-400 sm:text-sm">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

export default function Manual() {
  return (
    <section id="manual" className="relative z-10 w-full overflow-hidden py-24">
      {/* Oversized watermark numeral, purely decorative */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-6 select-none font-headline text-[22vw] font-extrabold leading-none text-white/[0.025] lg:text-[16rem]"
      >
        02
      </span>

      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyber-lime">
              <BookOpen size={16} aria-hidden="true" />
              <span>[02 // OPERATING MANUAL]</span>
            </div>
            <h2 className="font-headline text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
              The person behind{' '}
              <span className="bg-gradient-to-r from-cyber-lime via-white to-cyber-cyan bg-clip-text text-transparent">
                the commits.
              </span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-zinc-400 lg:col-span-5 lg:pb-1">
            Most of engineering is judgment calls. These are the four I keep making, each one backed by something I
            actually shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Frame
            photo={photos.standing}
            index={1}
            sizes="(min-width: 1024px) 460px, 100vw"
            badge="Portrait"
            nameplate={{ name: 'Dhananjay Sarathe', meta: ['Founding SDE', 'Quickads', 'Bengaluru'] }}
            className="lg:col-span-5 lg:row-span-2"
            boxClassName="aspect-[4/5] lg:flex-1 lg:aspect-auto lg:min-h-[640px]"
            imgClassName="object-[center_20%]"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {principles.map((p, i) => (
              <article
                key={p.code}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className="spotlight flex flex-col justify-between rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-cyber-lime/40"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-widest text-cyber-lime">{p.code}</span>
                  <div className="text-right">
                    <div className="font-headline text-3xl font-extrabold leading-none tracking-tight text-white">
                      {p.stat.static ? (
                        p.stat.value
                      ) : (
                        <CountUp value={p.stat.value} prefix={p.stat.prefix} suffix={p.stat.suffix} />
                      )}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{p.stat.label}</div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-headline text-lg font-bold leading-snug text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{p.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 lg:col-span-7" data-reveal>
            <Frame
              photo={photos.thinking}
              index={2}
              sizes="(min-width: 1024px) 340px, 50vw"
              badge="Deep work"
              caption="Thinking a feature through before it gets built."
              boxClassName="aspect-[4/5]"
              imgClassName="object-[center_25%]"
            />
            <Frame
              photo={photos.desk}
              index={3}
              sizes="(min-width: 1024px) 340px, 50vw"
              badge="Downtime"
              caption="Between builds, a few minutes away from the keyboard."
              boxClassName="aspect-[4/5]"
              imgClassName="object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
