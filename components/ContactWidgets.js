'use client';

import { useEffect, useState } from 'react';
import { CheckCheck, Copy, Mail } from 'lucide-react';

export function CopyEmailRow({ email }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); fall back to the mail client.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group flex w-full items-center justify-between rounded-lg border bg-zinc-950/80 p-4 text-left transition-all ${
        copied ? 'border-cyber-lime' : 'border-white/10 hover:border-cyber-lime'
      }`}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-cyber-lime transition-transform group-hover:scale-105">
          <Mail size={20} />
        </div>
        <div className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500" aria-live="polite">
            Direct Inbox ·{' '}
            <span className={copied ? 'text-cyber-lime' : 'text-zinc-400 group-hover:text-cyber-lime'}>
              {copied ? 'Copied!' : 'Click to copy'}
            </span>
          </span>
          <span className="block truncate font-mono text-xs font-medium text-white group-hover:text-cyber-lime sm:text-sm">
            {email}
          </span>
        </div>
      </div>
      <div className="shrink-0 pl-2 text-zinc-400 transition-colors group-hover:text-cyber-lime">
        {copied ? <CheckCheck size={16} className="text-cyber-lime" /> : <Copy size={16} />}
      </div>
    </button>
  );
}

const istFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export function IstClock({ className = '' }) {
  // Starts empty so the server-rendered HTML matches the first client render.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(istFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={`tabular-nums ${className}`}>{time ?? '--:--:--'} IST</span>;
}
