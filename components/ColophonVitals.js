'use client';

import { useEffect, useRef, useState } from 'react';

// This visit's own numbers: script bytes from Resource Timing, largest paint where the
// browser reports it (Safari doesn't). Measured just before the line scrolls into view,
// into space that is already reserved, so nothing shifts.
export default function ColophonVitals() {
  const ref = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lcp = 0;
    let paintObserver;
    if (PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint')) {
      const keepLast = (entries) => {
        if (entries.length) lcp = entries[entries.length - 1].startTime;
      };
      paintObserver = new PerformanceObserver((list) => keepLast(list.getEntries()));
      paintObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      paintObserver.keepLast = keepLast;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (paintObserver) {
          paintObserver.keepLast(paintObserver.takeRecords());
          paintObserver.disconnect();
        }
        // Same-origin JavaScript, whether it came in through a <script> tag or a preload link.
        const scripts = new Map();
        for (const r of performance.getEntriesByType('resource')) {
          if (r.name.startsWith(location.origin) && /\.js(\?|$)/.test(r.name)) scripts.set(r.name, r.encodedBodySize);
        }
        const bytes = [...scripts.values()].reduce((sum, size) => sum + size, 0);
        if (!bytes) return;
        const kb = `${Math.round(bytes / 1000)} kB of JavaScript`;
        setText(
          lcp
            ? `On this visit the page loaded ${kb}, and its largest paint landed at ${(lcp / 1000).toFixed(1)} s.`
            : `On this visit the page loaded ${kb}.`
        );
      },
      { rootMargin: '0px 0px 600px 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      paintObserver?.disconnect();
    };
  }, []);

  return (
    <p ref={ref} className="min-h-[3.1em] sm:min-h-[1.55em]">
      {text}
    </p>
  );
}
