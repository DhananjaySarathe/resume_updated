import { profile } from '@/lib/data';
import SectionHeader from './SectionHeader';

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// Plain contact details, set like the header of a resume.
const details = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { label: 'Location', value: profile.location },
  { label: 'GitHub', value: bare(profile.socials.github), href: profile.socials.github, external: true },
  { label: 'LinkedIn', value: bare(profile.socials.linkedin), href: profile.socials.linkedin, external: true },
  { label: 'LeetCode', value: bare(profile.socials.leetcode), href: profile.socials.leetcode, external: true },
  { label: 'Resume', value: 'PDF on Google Drive', href: profile.resume, external: true },
];

export default function Connect() {
  return (
    <section
      id="connect"
      className="mx-auto w-full max-w-[1200px] px-margin-sm py-16 md:px-margin lg:px-margin-lg print:hidden"
    >
      <SectionHeader eyebrow="Contact" title="Contact details" className="mb-8" />
      <dl data-reveal className="grid grid-cols-1 gap-x-10 gap-y-5 rounded-xl border border-outline-variant bg-surface-container-low p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
        {details.map(({ label, value, href, external }) => (
          <div key={label} className="min-w-0">
            <dt className="text-label-sm text-on-surface-variant">{label}</dt>
            <dd className="mt-1 truncate text-body-md text-on-surface">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-link"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
