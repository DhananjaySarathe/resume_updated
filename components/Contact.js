import {
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  Code2,
  FileText,
  Github,
  Linkedin,
  Phone,
  RadioTower,
  Video,
} from 'lucide-react';
import { profile } from '@/lib/data';
import { CopyEmailRow, IstClock } from './ContactWidgets';

const telHref = `tel:${profile.phone.replace(/\s/g, '')}`;

// Until a real scheduler URL is configured, "book a slot" becomes a pre-filled email.
const bookingHref =
  profile.booking ||
  `mailto:${profile.email}?subject=${encodeURIComponent('Intro call / coffee chat')}&body=${encodeURIComponent(
    'Hi Dhananjay,\n\nI would like to book a 15–30 min call.\n\nTopic:\nA few times that work for me:\n'
  )}`;
const bookingIsExternal = Boolean(profile.booking);

const agendaTopics = [
  { n: '#01', text: '0→1 Architecture Discussion', mark: 'text-cyber-lime', hover: 'hover:border-cyber-lime/40' },
  { n: '#02', text: 'Founding Engineer Role', mark: 'text-cyber-cyan', hover: 'hover:border-cyber-cyan/40' },
  { n: '#03', text: 'AI & AdTech Pipelines', mark: 'text-cyber-lime', hover: 'hover:border-cyber-lime/40' },
];

const channels = [
  {
    label: 'GitHub',
    sub: 'Repos & Commits',
    href: profile.socials.github,
    icon: Github,
    hover: 'hover:border-cyber-lime',
    text: 'group-hover:text-cyber-lime',
  },
  {
    label: 'LinkedIn',
    sub: 'Founding Network',
    href: profile.socials.linkedin,
    icon: Linkedin,
    hover: 'hover:border-cyber-cyan',
    text: 'group-hover:text-cyber-cyan',
  },
  {
    label: 'LeetCode',
    sub: 'Algorithms Profile',
    href: profile.socials.leetcode,
    icon: Code2,
    hover: 'hover:border-amber-400',
    text: 'group-hover:text-amber-400',
  },
  {
    label: 'Resume',
    sub: 'Full Chronology (PDF)',
    href: profile.resume,
    icon: FileText,
    hover: 'hover:border-cyber-lime',
    text: 'group-hover:text-cyber-lime',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 w-full py-24">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyber-lime" data-reveal>
          <RadioTower size={16} aria-hidden="true" />
          <span>[08 // CONNECT // FOUNDING ENG SYNC]</span>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left: direct signals */}
          <div
            data-reveal
            className="corner-bracket relative flex flex-col justify-between rounded-lg border border-white/15 bg-black/60 p-7 shadow-2xl backdrop-blur-xl md:p-8 lg:col-span-5"
          >
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded border border-cyber-lime/30 bg-cyber-lime/10 px-2.5 py-1 font-mono text-[11px] text-cyber-lime">
                <span className="h-2 w-2 animate-ping rounded-full bg-cyber-lime" />
                <span>DIRECT SIGNALS // PRIORITY CHANNEL</span>
              </div>
              <h2 className="mb-4 font-headline text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Open for Early-Stage{' '}
                <span className="bg-gradient-to-r from-cyber-lime via-white to-cyber-cyan bg-clip-text text-transparent">
                  Founding Roles
                </span>
              </h2>
              <p className="mb-8 text-sm font-light leading-relaxed text-zinc-300 sm:text-base">
                Open for early-stage founding engineering roles, high-velocity advisory, &amp; low-latency architecture
                consulting.
              </p>

              <div className="space-y-4">
                <CopyEmailRow email={profile.email} />

                <a
                  href={telHref}
                  className="group flex items-center justify-between rounded-lg border border-white/10 bg-zinc-950/80 p-4 transition-all hover:border-cyber-lime"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-cyber-lime transition-transform group-hover:scale-105">
                      <Phone size={20} />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        Direct Phone
                      </span>
                      <span className="font-mono text-xs font-medium text-white group-hover:text-cyber-lime sm:text-sm">
                        {profile.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded border border-cyber-lime/30 bg-cyber-lime/10 px-2 py-0.5 font-mono text-[10px] text-cyber-lime">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-lime" />
                    <span>Direct Signal</span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 rounded-lg border border-white/10 bg-zinc-950/80 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-cyber-cyan">
                    <Clock size={20} />
                  </div>
                  <div className="min-w-0 font-mono">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-500">
                      Timezone &amp; Operating Window
                    </span>
                    <div className="mt-0.5 text-xs font-medium text-zinc-200 sm:text-sm">Bengaluru, IN (UTC+5:30)</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Active hours: {profile.activeHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-[11px] text-zinc-400">
              <span className="text-zinc-500">// LATENCY_TO_REPLY</span>
              <span className="text-cyber-lime">&lt; 3 Hours Average</span>
            </div>
          </div>

          {/* Right: scheduling + channels */}
          <div
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
            className="corner-bracket relative flex flex-col justify-between rounded-lg border border-white/15 bg-black/60 p-7 shadow-2xl backdrop-blur-xl md:p-8 lg:col-span-7"
          >
            <div>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="mb-1.5 font-headline text-2xl font-bold text-white">Schedule an Intro Call / Coffee Chat</h3>
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    Book 15–30 min technical sync for architectural review, founding roles, or collaborative sprint
                    scoping.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300">
                    <Video size={14} className="text-cyber-cyan" />
                    <span>Google Meet</span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300">
                    <CalendarDays size={14} className="text-cyber-lime" />
                    <span>{bookingIsExternal ? 'Calendar' : 'Via email'}</span>
                  </span>
                </div>
              </div>

              <div className="mb-6 rounded-lg border border-white/10 bg-zinc-950/90 p-5 transition-all hover:border-cyber-lime/40 md:p-6">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-black text-cyber-lime">
                      <CalendarCheck size={26} />
                    </div>
                    <div>
                      <div className="font-headline text-lg font-bold text-white">Book 15–30 Min Technical Sync</div>
                      <div className="mt-0.5 font-mono text-xs text-zinc-400">
                        {bookingIsExternal
                          ? 'Instant calendar invite + Google Meet link generated'
                          : 'Send a few times that suit you; I reply with a Meet link'}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded border border-cyber-lime/30 bg-cyber-lime/10 px-3 py-1.5 font-mono text-xs text-cyber-lime sm:self-auto">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-lime" />
                    <span>
                      <span className="hidden sm:inline">Now in </span>Bengaluru: <IstClock />
                    </span>
                  </div>
                </div>

                <a
                  href={bookingHref}
                  {...(bookingIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-cyber-lime px-6 py-4 font-mono text-sm font-bold tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(204,255,0,0.6)]"
                >
                  <CalendarDays size={20} />
                  <span>
                    {bookingIsExternal ? (
                      'Select a Slot'
                    ) : (
                      <>
                        Request a Slot<span className="hidden sm:inline"> by Email</span>
                      </>
                    )}
                  </span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mb-6">
                <span className="mb-2.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  // Quick agenda topics
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {agendaTopics.map((t) => (
                    <div
                      key={t.n}
                      className={`flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:text-white ${t.hover}`}
                    >
                      <span className={t.mark}>{t.n}</span>
                      <span>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span className="uppercase tracking-wider">// Social signals &amp; profiles</span>
                <span className="text-zinc-500">SYNC_STATUS: ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {channels.map(({ label, sub, href, icon: Icon, hover, text }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col justify-between rounded border border-white/10 bg-zinc-950/80 p-3 transition-all hover:bg-white/5 ${hover}`}
                  >
                    <div className={`mb-2 flex items-center justify-between text-zinc-400 ${text}`}>
                      <Icon size={18} />
                      <ArrowUpRight size={14} />
                    </div>
                    <div>
                      <div className={`font-mono text-xs font-bold text-white ${text}`}>{label}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-zinc-400">{sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
