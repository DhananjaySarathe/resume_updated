import { CalendarDays, Clock, Code2, FileText, Github, Linkedin, Phone } from 'lucide-react';
import { profile } from '@/lib/data';
import { CopyEmailPill, IstClock } from './ContactWidgets';

const telHref = `tel:${profile.phone.replace(/\s/g, '')}`;

// Until a real scheduler URL is configured, the call button opens a pre-filled email.
const scheduleHref =
  profile.booking ||
  `mailto:${profile.email}?subject=${encodeURIComponent('Intro call')}&body=${encodeURIComponent(
    'Hi Dhananjay,\n\nCould we set up a 15-minute call?\n\nWhat it is about:\nA few times that work for me:\n'
  )}`;
const scheduleIsExternal = Boolean(profile.booking);

const channels = [
  { label: 'GitHub', href: profile.socials.github, icon: Github },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: profile.socials.leetcode, icon: Code2 },
  { label: 'Resume', href: profile.resume, icon: FileText },
];

export default function Connect() {
  return (
    <section
      id="connect"
      className="mx-auto w-full max-w-[1440px] px-margin-sm py-20 md:px-margin lg:px-margin-lg print:hidden"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-2xl bg-surface-container-low/90 p-6 shadow-[0_0_80px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-3xl sm:p-8 md:p-14"
      >
        {/* Oversized monogram filling the open right side on wide screens */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-10 hidden select-none bg-gradient-to-br from-primary/[0.14] via-secondary/[0.08] to-transparent bg-clip-text pr-[0.1em] font-display text-[22rem] italic leading-none text-transparent xl:block"
        >
          DS
        </span>

        <div className="relative z-10 max-w-3xl">
          <div className="eyebrow mb-4 text-primary">Contact</div>
          <h2 className="mb-5 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
            Building something early? <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text pr-[0.1em] italic text-transparent">
              Let&apos;s talk.
            </span>
          </h2>
          <p className="mb-9 max-w-[62ch] text-body-lg text-on-surface-variant">
            I&apos;m always happy to talk about early-stage products, an AI feature you&apos;re building, or a scraping
            problem you&apos;re stuck on. Email is the fastest way to reach me.
          </p>

          <div className="mb-10 space-y-4">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <CopyEmailPill email={profile.email} />
              <a
                href={telHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-surface-container-high/90 px-6 py-4 text-label-lg text-on-surface shadow-inner transition-colors hover:bg-surface-bright"
              >
                <Phone size={19} className="text-primary" />
                <span className="tabular-nums">{profile.phone}</span>
              </a>
            </div>

            <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
              <a
                href={scheduleHref}
                {...(scheduleIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-primary-container px-8 py-4 text-label-lg text-on-primary shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-[background-color,box-shadow,color] duration-300 hover:bg-primary hover:shadow-[0_0_46px_rgba(6,182,212,0.6)]"
              >
                <CalendarDays size={21} className="transition-transform duration-300 group-hover:-rotate-6" />
                {scheduleIsExternal ? (
                  <>
                    <span className="sm:hidden">Book a call</span>
                    <span className="hidden sm:inline">Book a 15-minute call</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Ask for a call</span>
                    <span className="hidden sm:inline">Ask for a 15-minute call</span>
                  </>
                )}
              </a>
              <p className="flex items-center justify-center gap-2 rounded-lg bg-surface-container px-4 py-3 text-label-sm text-on-surface-variant">
                <Clock size={15} aria-hidden="true" className="shrink-0 text-tertiary" />
                <IstClock />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/5 pt-6">
            <span className="text-label-sm text-on-surface-variant">Elsewhere</span>
            {channels.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-label-md text-on-surface transition-colors hover:text-primary"
              >
                <Icon size={17} aria-hidden="true" /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
