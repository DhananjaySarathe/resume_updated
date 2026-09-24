'use client';

import { useEffect } from 'react';

// One observer and one pointer listener for the whole page, instead of a wrapper per element.
export default function Motion() {
  useEffect(() => {
    window.__revealReady = true;

    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const onPointerMove = (event) => {
      const card = event.target.closest?.('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    if (finePointer) document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return null;
}
