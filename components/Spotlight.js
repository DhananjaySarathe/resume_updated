import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { photos, principles } from '@/lib/data';
import Tilt from './Tilt';

export default function Spotlight() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-margin-sm py-16 md:px-margin lg:px-margin-lg">
      <div
        data-reveal
        className="relative overflow-hidden rounded-2xl bg-surface-container-low/[0.88] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-3xl md:p-12"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-pill bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-pill bg-secondary/10 blur-[120px]" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex justify-center lg:col-span-5">
            <Tilt max={5} className="group relative w-full max-w-[400px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={photos.spotlight.src}
                  alt={photos.spotlight.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60" />
                <div className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Tilt>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="eyebrow mb-4 text-primary">
              <Sparkles size={16} aria-hidden="true" />
              <span>About me</span>
            </div>
            <blockquote className="mb-6 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              I like the first version of things. I like the{' '}
              <em className="bg-gradient-to-r from-primary to-secondary bg-clip-text pr-[0.1em] text-transparent">rewrite</em> even
              more.
            </blockquote>
            <p className="mb-8 text-body-lg text-on-surface-variant">
              I joined Quickads before there was much of a product. Since then I&apos;ve built the ad library, Discover,
              Live Search, Eve and ADAM, and set up the design system the rest of the frontend runs on. A few rules I keep
              coming back to:
            </p>

            <ol className="divide-y divide-white/5 border-y border-white/5">
              {principles.map((p) => (
                <li key={p.n} className="group flex items-baseline gap-5 py-4">
                  <span className="font-mono text-label-md text-primary">{p.n}</span>
                  <span className="font-display text-headline-sm text-on-surface transition-transform duration-500 group-hover:translate-x-1.5">
                    {p.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
