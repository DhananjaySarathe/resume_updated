import { ArrowUp, ChevronDown, Code2, Github, Linkedin } from 'lucide-react';
import { profile } from '@/lib/data';
import { AURORA_FPS, RENDER_SCALE } from '@/lib/aurora';
import colophon from '@/lib/colophon.json';
import { repoUrl } from '@/lib/site';
import AuroraToggle from './AuroraToggle';
import ColophonVitals from './ColophonVitals';

const links = [
  { label: 'GitHub', href: profile.socials.github, icon: Github },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: profile.socials.leetcode, icon: Code2 },
];

const sha = process.env.BUILD_SHA || '';
const ref = sha || 'main';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Written out by hand: Intl's en-GB now prints "Sept", and the date should be Bengaluru's.
function deployDate() {
  const ist = new Date(Date.parse(process.env.BUILD_TIME) + 5.5 * 3600 * 1000);
  return `${ist.getUTCDate()} ${months[ist.getUTCMonth()]} ${ist.getUTCFullYear()}`;
}

const fileHref = (file) => `${repoUrl}/${file.includes('.') ? 'blob' : 'tree'}/${ref}/${file}`;

const total = Number(process.env.BUILD_COMPONENTS);
const client = Number(process.env.BUILD_CLIENT_COMPONENTS);
const fillCounts = (text) =>
  text.replace('{total}', total).replace('{client}', client).replace('{server}', total - client);

export default function Footer() {
  const scale = RENDER_SCALE === 0.5 ? 'half' : `${RENDER_SCALE * 100}% of`;

  return (
    <footer id="colophon" className="relative w-full bg-surface-container-lowest/90 backdrop-blur-xl print:hidden">
      <div className="mx-auto max-w-[1440px] px-margin-sm py-12 md:px-margin lg:px-margin-lg">
        <div className="flex flex-col items-start justify-between gap-5 pb-8 md:flex-row md:items-center">
          <span className="font-display text-headline-sm text-on-surface">{profile.name}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-label-md text-on-surface-variant transition-colors hover:text-primary"
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            ))}
            <a
              href="#overview"
              className="flex items-center gap-1.5 text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              <ArrowUp size={15} aria-hidden="true" /> Top
            </a>
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/5 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="max-w-[62ch] space-y-3 text-body-sm text-on-surface-variant lg:col-span-7">
            <h2 className="eyebrow text-primary">About this page</h2>
            <p>
              Set in Bodoni Moda and Hanken Grotesk. The light behind the page is a WebGL shader, drawn at {scale} the
              window&apos;s width and height and at most {AURORA_FPS} frames a second. It stops while the tab is hidden, and holds a
              single frame if your system asks for reduced motion. <AuroraToggle />
            </p>
            {sha && (
              <p>
                Deployed {deployDate()} from{' '}
                <a
                  href={`${repoUrl}/commit/${sha}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link font-mono text-label-md text-on-surface"
                >
                  {sha.slice(0, 7)}
                </a>
                .
              </p>
            )}
            <ColophonVitals />
          </div>

          <details className="group self-start lg:col-span-5">
            <summary className="flex min-h-10 w-full cursor-pointer list-none items-center justify-between rounded-lg bg-surface-container/70 px-3 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface [&::-webkit-details-marker]:hidden">
              How this page is built
              <ChevronDown size={15} aria-hidden="true" className="transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <ol className="space-y-4 pt-4 text-body-sm text-on-surface-variant">
              {colophon.notes.map((note, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-label-sm tabular-nums text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    {fillCounts(note.text)}{' '}
                    {note.files.map((file) => (
                      <a
                        key={file}
                        href={fileHref(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link mr-2 whitespace-nowrap font-mono text-label-sm text-on-surface"
                      >
                        {file}
                      </a>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          </details>
        </div>

        <p className="mt-10 text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
