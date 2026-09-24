'use client';

import { useEffect, useRef } from 'react';

// The glowing timeline line fills in as its section scrolls past the middle of the viewport.
export default function TimelineTrack({ className = '' }) {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const track = fill?.parentElement;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.transform = 'scaleY(1)';
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
      fill.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`;
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
    <div aria-hidden="true" className={`absolute w-[2px] rounded-pill bg-surface-container-highest ${className}`}>
      <div
        ref={fillRef}
        className="h-full w-full origin-top scale-y-0 rounded-pill bg-gradient-to-b from-primary via-secondary to-primary-fixed/40 shadow-[0_0_12px_rgba(76,215,246,0.6)]"
      />
    </div>
  );
}
