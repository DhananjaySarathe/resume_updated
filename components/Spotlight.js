import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { photos, principles } from '@/lib/data';

// Wraps the linked part of a footnote in an anchor, if the note has one.
function Proof({ proof, link }) {
  if (!link) return proof;
  const [before, after] = proof.split(link.text);
  return (
    <>
      {before}
      <a href={link.href} className="text-link text-on-surface">
        {link.text}
      </a>
      {after}
    </>
  );
}

export default function Spotlight() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1200px] px-margin-sm py-16 md:px-margin lg:px-margin-lg">
      <div className="relative rounded-xl border border-outline-variant bg-surface-container-low p-6 sm:p-8 md:p-12">
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* The photo stays in view while the rules and their notes scroll past. */}
          <div className="flex justify-center lg:sticky lg:top-28 lg:col-span-5 print:hidden">
            <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl border border-outline-variant">
              <Image
                src={photos.spotlight.src}
                alt={photos.spotlight.alt}
                fill
                sizes="(min-width: 1024px) 340px, 90vw"
                className="object-cover object-[center_25%]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="eyebrow mb-4 text-primary">About me</h2>
            <blockquote className="mb-6 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              <span className="-ml-[0.42em]">&ldquo;</span>I like the first version of things. I like the{' '}
              <em className="not-italic text-primary">rewrite</em> even
              more.&rdquo;
            </blockquote>
            <p className="mb-8 max-w-[65ch] text-body-lg text-on-surface-variant">
              I joined Quickads before there was much of a product. Since then I&apos;ve built the ad library, Discover,
              Live Search, Eve and ADAM, and set up the design system the rest of the frontend runs on. A few rules I keep
              coming back to:
            </p>

            <ol className="divide-y divide-outline-variant border-y border-outline-variant">
              {principles.map((p) => (
                <li key={p.n} className="flex items-baseline gap-5 py-4">
                  <span className="text-label-md tabular-nums text-primary">{p.n}</span>
                  <span className="font-display text-headline-sm text-on-surface">
                    {p.text}
                    <a
                      id={`fnref-${p.n}`}
                      href={`#fn-${p.n}`}
                      aria-label={`Note ${Number(p.n)}`}
                      aria-describedby="footnotes-label"
                      className="ml-0.5 inline-flex h-6 min-w-6 -translate-y-2 items-center justify-center rounded font-sans text-body-md text-primary transition-colors hover:underline"
                    >
                      {p.mark}
                    </a>
                  </span>
                </li>
              ))}
            </ol>

            <h3 id="footnotes-label" className="sr-only">
              Notes
            </h3>
            <ol className="footnotes mt-5 max-w-[62ch] space-y-1 text-body-sm text-on-surface-variant">
              {principles.map((p) => (
                <li key={p.n} id={`fn-${p.n}`} className="flex gap-2.5 rounded px-2 py-1 -mx-2">
                  <span aria-hidden="true" className="w-3 shrink-0 text-primary">
                    {p.mark}
                  </span>
                  <span>
                    <Proof proof={p.proof} link={p.proofLink} />{' '}
                    <a
                      href={`#fnref-${p.n}`}
                      aria-label={`Back to rule ${Number(p.n)}`}
                      className="-my-1 inline-flex h-6 w-6 items-center justify-center align-middle text-outline transition-colors hover:text-primary print:hidden"
                    >
                      <ArrowUp size={13} aria-hidden="true" />
                    </a>
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
