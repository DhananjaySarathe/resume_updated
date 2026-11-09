'use client';

import { useEffect } from 'react';

// One observer for the whole page. Cards and headings below the fold rise 8px and fade in
// once as they arrive. Anything already on screen at load is left alone, nothing is hidden
// without JavaScript, and reduced motion turns it off.
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const targets = [...document.querySelectorAll('[data-reveal]')];

    // Mark what is already on screen (or above it) before turning on the hidden state.
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.dataset.revealed = 'true';
    }
    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.revealed = 'true';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    targets.filter((el) => el.dataset.revealed !== 'true').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
