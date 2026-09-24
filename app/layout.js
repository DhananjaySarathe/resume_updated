import { Syne } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata = {
  title: 'Dhananjay Sarathe | Founding SDE & Systems Architect',
  description:
    'Founding Member (SDE) at Quickads. Full Stack Engineer building scalable, AI-driven ecosystems with Next.js, AI vision workflows and high-throughput scraping pipelines.',
};

export const viewport = {
  themeColor: '#08080b',
};

// Runs before first paint: enables reveal styles, and backs them out if hydration never arrives.
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},3000);`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
