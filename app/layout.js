import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import { experience, profile } from '@/lib/data';
import { siteUrl } from '@/lib/site';
import './globals.css';
import './print.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
  fallback: ['Didot', 'Georgia', 'serif'],
  adjustFontFallback: false,
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

const title = 'Dhananjay Sarathe | Founding SDE @ Quickads';
const description =
  'Founding engineer at Quickads. I build the product end to end: the Next.js frontend, the AI features, and the scrapers that pull in ads from Meta.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    firstName: profile.firstName,
    lastName: profile.lastName,
    url: '/',
    siteName: profile.name,
    locale: 'en_IN',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport = {
  themeColor: '#121317',
};

// Runs before first paint: enables reveal styles, and backs them out if hydration never arrives.
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},3000);`;

// Structured data for search engines. Public profile facts only: no email or phone.
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  givenName: profile.firstName,
  familyName: profile.lastName,
  jobTitle: experience[0].role,
  worksFor: { '@type': 'Organization', name: experience[0].company, url: experience[0].companyUrl },
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
  url: siteUrl,
  image: `${siteUrl}/portrait.jpg`,
  sameAs: Object.values(profile.socials),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only rounded-pill bg-primary-container text-label-md text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
