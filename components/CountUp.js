'use client';

import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/lib/format';

// Server render shows the final number, so it reads correctly without JS.
// Screen readers get the final value once; the animated digits are hidden from them.
export default function CountUp({ value, prefix = '', suffix = '', format, srText, duration = 1400, className = '' }) {
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

    // Printing before the numbers scrolled into view would otherwise print zeros.
    const onBeforePrint = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      setDisplay(value);
    };
    window.addEventListener('beforeprint', onBeforePrint);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('beforeprint', onBeforePrint);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`count-up tabular-nums ${className}`}>
      <span className="sr-only">{srText ?? `${prefix}${formatNumber(value, format)}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {formatNumber(display, format)}
        {suffix}
      </span>
    </span>
  );
}
