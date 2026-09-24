import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata = {
  title: 'Dhananjay Sarathe | Founding SDE @ Quickads',
  description:
    'Founding engineer at Quickads. I build the product end to end: the Next.js frontend, the AI features, and the scrapers that pull in ads from Meta.',
};

export const viewport = {
  themeColor: '#121317',
};

// Runs before first paint: enables reveal styles, and backs them out if hydration never arrives.
const revealBootstrap = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},3000);`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
