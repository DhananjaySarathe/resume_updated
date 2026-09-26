import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { photos } from '@/lib/data';
import Aurora from '@/components/Aurora';
import RequestedPath from '@/components/RequestedPath';

export const metadata = { title: 'Not found | Dhananjay Sarathe' };

export default function NotFound() {
  return (
    <>
      <Aurora />
      <main
        id="main"
        tabIndex={-1}
        className="flex min-h-screen items-center justify-center gap-10 px-margin-sm py-16 focus:outline-none"
      >
        <div className="glass w-full max-w-xl rounded-2xl p-8 md:p-12">
          <p className="eyebrow mb-4 text-primary">404</p>
          <h1 className="mb-5 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
            Nothing at this address.
          </h1>
          <p className="mb-9 text-body-lg text-on-surface-variant">
            <RequestedPath /> isn&apos;t a page on this site. Everything lives on the home page.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3.5 text-label-lg text-on-primary transition-colors hover:bg-primary"
            >
              See the projects
            </a>
            <a
              href="/#connect"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-surface-container/90 px-6 py-3.5 text-label-lg text-on-surface transition-colors hover:bg-surface-bright"
            >
              Get in touch
              <ArrowUpRight size={17} aria-hidden="true" className="text-primary" />
            </a>
          </div>
        </div>
        <div className="relative hidden aspect-[4/5] w-[280px] shrink-0 overflow-hidden rounded-xl md:block">
          <Image
            src={photos.standing.src}
            alt={photos.standing.alt}
            fill
            sizes="280px"
            className="object-cover object-top"
          />
        </div>
      </main>
    </>
  );
}
