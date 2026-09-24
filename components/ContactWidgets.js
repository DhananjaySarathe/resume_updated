'use client';

import { useEffect, useState } from 'react';
import { CheckCheck, Copy, Mail } from 'lucide-react';

export function CopyEmailPill({ email }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
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
      aria-label={`Copy email address ${email}`}
      className={`group flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl px-3.5 py-4 text-left shadow-inner sm:gap-3 sm:px-5 backdrop-blur-md transition-all duration-300 ${
        copied ? 'bg-primary-container/15 ring-1 ring-primary/50' : 'bg-surface-container-high/90 hover:bg-surface-bright'
      }`}
    >
      <span className="flex min-w-0 items-center gap-2 sm:gap-3">
        {copied ? <CheckCheck size={19} className="shrink-0 text-primary" /> : <Mail size={19} className="shrink-0 text-primary" />}
        <span className="truncate text-[0.875rem] text-on-surface sm:text-label-lg sm:tracking-wide">{email}</span>
      </span>
      <span
        aria-hidden="true"
        className={`hidden shrink-0 text-label-sm uppercase tracking-widest sm:inline ${copied ? 'text-secondary' : 'text-primary group-hover:underline'}`}
      >
        {copied ? 'Copied!' : 'Copy email'}
      </span>
      {!copied && <Copy size={17} aria-hidden="true" className="shrink-0 text-primary sm:hidden" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}

const istFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
});

export function IstClock({ className = '', suffix = ' IST' }) {
  // Starts empty so the server-rendered HTML matches the first client render.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(istFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`}>
      {time ?? '--:--'}
      {suffix}
    </span>
  );
}
