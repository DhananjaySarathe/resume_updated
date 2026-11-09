'use client';

import { useEffect, useRef } from 'react';

// The timeline line fills in as the Experience section scrolls past the middle of the
// screen, and each job's dot fills when the line reaches it. With reduced motion the
// line and dots are simply full.
export default function TimelineTrack({ className = '' }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const track = fill?.parentElement;
    if (!track) return;
    const nodes = [...track.parentElement.querySelectorAll('[data-timeline-node]')];

    const paint = (progress) => {
      fill.style.transform = `scaleY(${progress})`;
      const rect = track.getBoundingClientRect();
      const reach = rect.top + rect.height * progress;
      for (const node of nodes) {
        const r = node.getBoundingClientRect();
        node.dataset.reached = String(r.top + r.height / 2 <= reach + 1);
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
      paint(Math.min(Math.max(progress, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`absolute w-0.5 -translate-x-1/2 rounded-pill bg-outline-variant ${className}`}>
      <div ref={fillRef} className="h-full w-full origin-top scale-y-0 rounded-pill bg-primary" />
    </div>
  );
}
