import { ArrowUp, Mail } from 'lucide-react';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-black py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
            <span className="font-bold text-white">{profile.name}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-cyber-lime">{profile.tagline}</span>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. Engineered with high craft and precision.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900 px-3 py-1 text-zinc-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-lime" />
            <span>Next.js • TypeScript • Go • Distributed Systems</span>
          </div>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 text-cyber-lime hover:underline">
            <Mail size={15} />
            <span>Get in touch</span>
          </a>
          <a
            href="#overview"
            className="inline-flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1 text-zinc-400 transition-colors hover:border-cyber-lime hover:text-cyber-lime"
          >
            <ArrowUp size={14} />
            <span>Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
