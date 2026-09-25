import Image from 'next/image';
import { ArrowDown, ArrowUpRight, BadgeCheck, Boxes, Database, Navigation } from 'lucide-react';
import { photos, profile } from '@/lib/data';
import Tilt from './Tilt';

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative mx-auto w-full max-w-[1440px] px-margin-sm pb-20 pt-10 md:px-margin lg:px-margin-lg lg:pb-32 lg:pt-16"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="z-10 flex flex-col items-start lg:col-span-7">
          <div className="hero-in mb-7 inline-flex items-center gap-2.5 rounded-pill bg-surface-container/90 px-3.5 py-1.5 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-pill bg-primary" />
            </span>
            <span className="text-label-sm uppercase tracking-widest text-on-surface">
              Building at Quickads <span className="text-outline">·</span> Happy to talk shop
            </span>
          </div>

          <h1
            className="hero-in mb-7 font-display text-display-hero-mobile text-on-surface md:text-display-hero lg:text-[5.5rem]"
            style={{ '--d': '120ms' }}
          >
            {profile.firstName} <br className="hidden sm:inline" />
            <span className="-ml-[0.2em] inline-block bg-gradient-to-r from-primary via-secondary to-primary-fixed bg-clip-text pl-[0.2em] pr-[0.14em] italic text-transparent drop-shadow-[0_0_35px_rgba(76,215,246,0.25)]">
              {profile.lastName}.
            </span>
          </h1>

          <p
            className="hero-in mb-9 max-w-xl text-body-lg text-on-surface/85 md:text-body-xl"
            style={{ '--d': '240ms' }}
          >
            I&apos;m a founding engineer at <span className="font-semibold text-on-surface">Quickads</span>. I build the
            product end to end: the Next.js frontend, the AI features, and the scrapers that pull in ads from Meta.
          </p>

          <div className="hero-in mb-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4" style={{ '--d': '360ms' }}>
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-container px-6 py-3.5 text-label-lg uppercase tracking-wider text-on-primary shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:bg-primary hover:shadow-[0_0_44px_rgba(6,182,212,0.6)]"
            >
              <span>See my work</span>
              <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#connect"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-surface-container/90 px-6 py-3.5 text-label-lg uppercase tracking-wider text-on-surface shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:bg-surface-bright"
            >
              <span>Get in touch</span>
              <ArrowUpRight
                size={17}
                className="text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div
            className="hero-in flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-lg bg-surface-container-low/85 px-5 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:w-auto"
            style={{ '--d': '480ms' }}
          >
            <span className="flex items-center gap-2 text-label-sm text-on-surface">
              <Navigation size={15} className="text-primary" /> {profile.location}
            </span>
            <span className="hidden text-outline-variant sm:inline">•</span>
            <span className="flex items-center gap-2 text-label-sm text-on-surface">
              <Boxes size={15} className="text-tertiary" /> 5 modules shipped
            </span>
            <span className="hidden text-outline-variant sm:inline">•</span>
            <span className="flex items-center gap-2 text-label-sm text-on-surface">
              <Database size={15} className="text-secondary" /> 1M+ ads indexed
            </span>
          </div>
        </div>

        <div className="hero-in relative flex justify-center lg:col-span-5 lg:justify-end" style={{ '--d': '200ms' }}>
          <Tilt className="group relative w-full max-w-[440px]">
            {/* Ambient glow ring behind the frame */}
            <div className="pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-low shadow-[0_0_50px_rgba(6,182,212,0.18)]">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-[center_20%] brightness-95 contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-75" />
              {/* Light sheen that follows the tilt */}
              <div className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg bg-surface-container-highest/80 p-3 shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <BadgeCheck size={20} className="text-primary" />
                  <div>
                    <p className="text-label-md text-on-surface">{profile.name}</p>
                    <p className="text-label-sm text-primary">{profile.role}</p>
                  </div>
                </div>
                <span className="rounded bg-surface-container px-2.5 py-1 text-label-sm text-on-surface-variant">Since 2023</span>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
