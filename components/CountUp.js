'use client';

import { useEffect, useRef, useState } from 'react';

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

function formatValue(n, format) {
  return format === 'compact' ? compact.format(n) : Math.round(n).toString();
}

// Server render shows the final number, so it reads correctly without JS.
export default function CountUp({ value, prefix = '', suffix = '', format, duration = 1400, className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setDisplay(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${prefix}${formatValue(value, format)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {formatValue(display, format)}
        {suffix}
      </span>
    </span>
  );
}
