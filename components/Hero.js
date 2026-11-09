import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { accents, heroFacts, photos, profile } from '@/lib/data';
import { siteUrl } from '@/lib/site';
import { icons } from './icons';

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const printContact = [profile.email, profile.phone, bare(siteUrl), bare(profile.socials.github), bare(profile.socials.linkedin)];

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative mx-auto w-full max-w-[1200px] px-margin-sm pb-16 pt-10 md:px-margin lg:px-margin-lg lg:pb-24 lg:pt-16"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="z-10 flex flex-col items-start lg:col-span-7">
          <p className="eyebrow mb-4 text-primary print:hidden">Building at Quickads</p>

          <h1 className="mb-5 font-display text-display-hero-mobile text-on-surface md:text-display-hero">{profile.name}</h1>

          <p className="mb-6 hidden text-body-md print:block">{printContact.join('  ·  ')}</p>

          <p className="mb-8 max-w-[60ch] text-body-lg text-on-surface-variant md:text-body-xl">
            I&apos;m a founding engineer at{' '}
            <a href="https://quickads.ai" target="_blank" rel="noopener noreferrer" className="text-link font-semibold text-on-surface">
              Quickads
            </a>
            . I build the product end to end: the Next.js frontend, the AI features, and the scrapers that pull in ads from
            Meta.
          </p>

          <a
            href="#projects"
            className="mb-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-container px-5 py-3 text-label-lg text-on-primary transition-colors hover:bg-primary-container/90 print:hidden"
          >
            See my work
            <ArrowDown size={17} aria-hidden="true" />
          </a>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {heroFacts.map((fact) => {
              const Icon = icons[fact.icon];
              const icon = <Icon size={15} aria-hidden="true" className={accents[fact.accent].text} />;
              return (
                <li key={fact.text} className="flex items-center gap-2 text-label-lg font-medium text-on-surface">
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

        <div className="relative flex justify-center lg:col-span-5 lg:justify-end print:hidden">
          <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-xl border border-outline-variant bg-surface-container">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 360px, 90vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
