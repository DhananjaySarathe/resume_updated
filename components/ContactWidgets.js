'use client';

import { useEffect, useState } from 'react';
import { CheckCheck, Copy, Mail } from 'lucide-react';

function useCopy(text, onFail) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      onFail?.();
    }
  };

  return [copied, copy];
}

export function CopyEmailPill({ email }) {
  // Clipboard can be blocked (insecure origin, permissions); fall back to the mail client.
  const [copied, copy] = useCopy(email, () => {
    window.location.href = `mailto:${email}`;
  });

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
      className={`group flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl px-3.5 py-4 text-left shadow-inner sm:gap-3 sm:px-5 backdrop-blur-md transition-[background-color,box-shadow,color] duration-300 ${
        copied ? 'bg-primary-container/15 ring-1 ring-primary/50' : 'bg-surface-container-high/90 hover:bg-surface-bright'
      }`}
    >
      <span className="flex min-w-0 items-center gap-2 sm:gap-3">
        {copied ? <CheckCheck size={19} className="shrink-0 text-primary" /> : <Mail size={19} className="shrink-0 text-primary" />}
        <span className="truncate text-[0.875rem] text-on-surface sm:text-label-lg">{email}</span>
      </span>
      <span
        aria-hidden="true"
        className={`hidden shrink-0 text-label-sm sm:inline ${copied ? 'text-secondary' : 'text-primary group-hover:underline'}`}
      >
        {copied ? 'Copied' : 'Copy email'}
      </span>
      {!copied && <Copy size={17} aria-hidden="true" className="shrink-0 text-primary sm:hidden" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}

export function CopyChip({ text }) {
  const [copied, copy] = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${text}`}
      className="inline-flex items-center gap-2 rounded-lg bg-surface-container-high px-3 py-2 font-mono text-label-md text-on-surface transition-colors hover:bg-surface-bright"
    >
      {text}
      {copied ? (
        <CheckCheck size={14} aria-hidden="true" className="text-primary" />
      ) : (
        <Copy size={14} aria-hidden="true" className="text-on-surface-variant" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
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

// Local time in Bengaluru. Late at night it points to email instead.
export function IstClock({ className = '' }) {
  // Starts empty so the server-rendered HTML matches the first client render.
  const [time, setTime] = useState(null);

  // Checked every second (React skips the render when the minute hasn't changed), so the
  // minute flips on time and stays right after the laptop wakes from sleep.
  useEffect(() => {
    const tick = () => setTime(istFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const hour = time ? Number(time.slice(0, 2)) : 12;
  const late = hour >= 22 || hour < 8;

  return (
    <span className={className}>
      It&apos;s <span className="tabular-nums text-on-surface">{time ?? '--:--'}</span> in Bengaluru
      {late && ', so email is the better bet'}
    </span>
  );
}
