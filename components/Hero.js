import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { accents, heroFacts, photos, profile } from '@/lib/data';
import { siteUrl } from '@/lib/site';
import Tilt from './Tilt';
import { icons } from './icons';

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const printContact = [profile.email, profile.phone, bare(siteUrl), bare(profile.socials.github), bare(profile.socials.linkedin)];

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative mx-auto w-full max-w-[1440px] px-margin-sm pb-20 pt-10 md:px-margin lg:px-margin-lg lg:pb-32 lg:pt-16"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="z-10 flex flex-col items-start lg:col-span-7">
          <p className="hero-in mb-7 inline-flex items-center rounded-pill bg-surface-container/90 px-3.5 py-1.5 text-label-md text-on-surface shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-xl print:hidden">
            Building at Quickads <span className="mx-2 text-outline">·</span> Happy to talk shop
          </p>

          <h1
            className="hero-in mb-7 font-display text-display-hero-mobile text-on-surface md:text-display-hero lg:text-[5.5rem]"
            style={{ '--d': '80ms' }}
          >
            {profile.firstName} <br className="hidden sm:inline" />
            <span className="-ml-[0.2em] inline-block bg-gradient-to-r from-primary via-secondary to-primary-fixed bg-clip-text pl-[0.2em] pr-[0.14em] italic text-transparent">
              {profile.lastName}.
            </span>
          </h1>

          <p className="mb-6 hidden text-body-md print:block">{printContact.join('  ·  ')}</p>

          <p className="hero-rise mb-9 max-w-xl text-body-lg text-on-surface/85 md:text-body-xl">
            I&apos;m a founding engineer at{' '}
            <a href="https://quickads.ai" target="_blank" rel="noopener noreferrer" className="text-link font-semibold text-on-surface">
              Quickads
            </a>
            . I build the product end to end: the Next.js frontend, the AI features, and the scrapers that pull in ads from
            Meta.
          </p>

          <div
            className="hero-in mb-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 print:hidden"
            style={{ '--d': '240ms' }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-container px-6 py-3.5 text-label-lg text-on-primary shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-[background-color,box-shadow,color] duration-300 hover:bg-primary hover:shadow-[0_0_44px_rgba(6,182,212,0.6)]"
            >
              <span>See my work</span>
              <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#connect"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-surface-container/90 px-6 py-3.5 text-label-lg text-on-surface shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-[background-color,box-shadow,color] duration-300 hover:bg-surface-bright"
            >
              <span>Get in touch</span>
              <ArrowUpRight
                size={17}
                className="text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <ul
            className="hero-in flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-lg bg-surface-container-low/85 px-5 py-3 shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:w-auto"
            style={{ '--d': '320ms' }}
          >
            {heroFacts.map((fact) => {
              const Icon = icons[fact.icon];
              const icon = <Icon size={15} aria-hidden="true" className={accents[fact.accent].text} />;
              return (
                <li key={fact.text} className="flex items-center gap-2 text-label-md text-on-surface">
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="flex items-center gap-2 underline decoration-outline decoration-dotted underline-offset-4 transition-colors hover:decoration-primary"
                    >
                      {icon}
                      {fact.text}
                      <span className="sr-only"> (see Experience)</span>
                    </a>
                  ) : (
                    <>
                      {icon}
                      {fact.text}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hero-rise relative flex justify-center lg:col-span-5 lg:justify-end print:hidden">
          <Tilt className="group relative w-full max-w-[440px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-low shadow-[0_0_50px_rgba(6,182,212,0.18)]">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-[center_20%] brightness-95 contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-50" />
              {/* Light sheen that follows the tilt */}
              <div className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
