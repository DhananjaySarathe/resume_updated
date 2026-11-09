'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';

// The pinned preview beside the project chapters (desktop only). It shows the clip of the
// chapter you are reading and crossfades as you scroll. Only the active clip loads and
// plays, and only while the stage is on screen. Reduced motion keeps the posters until
// someone presses play. The segments under the stage jump to a chapter.
export default function ProjectStage({ items }) {
  const frame = useRef(null);
  const videos = useRef([]);
  const loaded = useRef(new Set());
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [shown, setShown] = useState({});
  const [playing, setPlaying] = useState(false);

  // Which chapter is being read: the one crossing a band about a third of the way down.
  useEffect(() => {
    const chapters = [...document.querySelectorAll('#projects [data-chapter]')];
    const mark = (index) => {
      chapters.forEach((el, i) => {
        el.dataset.active = String(i === index);
      });
      setActive(index);
    };
    mark(0);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) mark(Number(entry.target.dataset.chapter));
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    chapters.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUserPaused(true);
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play the active clip, pause the rest.
  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && onScreen && !userPaused) {
        if (!loaded.current.has(i)) {
          loaded.current.add(i);
          video.src = video.canPlayType('video/webm; codecs="vp9"') ? items[i].preview.webm : items[i].preview.mp4;
        }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, onScreen, userPaused, items]);

  const jump = (i) => {
    const target = document.querySelector(`#projects [data-chapter="${i}"]`);
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  };

  const current = items[active];

  return (
    <div className="sticky top-24">
      <div
        ref={frame}
        className="relative aspect-[16/10] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest"
      >
        {items.map((item, i) => (
          <div
            key={item.slug}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={item.preview.poster}
              alt=""
              width={960}
              height={600}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <video
              ref={(el) => {
                videos.current[i] = el;
              }}
              muted
              loop
              playsInline
              preload="none"
              onPlaying={() => {
                setShown((s) => (s[i] ? s : { ...s, [i]: true }));
                if (i === active) setPlaying(true);
              }}
              onPause={() => {
                if (i === active) setPlaying(false);
              }}
              className={`relative h-full w-full object-cover transition-opacity duration-500 ${shown[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={playing && !userPaused ? 'Pause the project preview' : 'Play the project preview'}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-pill bg-black/55 text-white opacity-85 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        >
          {playing && !userPaused ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="min-w-0 truncate text-label-lg text-on-surface" aria-live="polite">
          <span className="mr-2 font-mono text-label-md tabular-nums text-on-surface-variant">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <a href={current.url} target="_blank" rel="noopener noreferrer" className="text-link font-semibold">
            {current.title}
            <ArrowUpRight size={15} aria-hidden="true" className="ml-0.5 inline-block align-[-2px]" />
          </a>
          <span className="ml-2 text-on-surface-variant">{current.category}</span>
        </p>
        <div role="group" aria-label="Jump to a project" className="flex shrink-0 items-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === active ? 'true' : undefined}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-1.5 rounded-pill transition-all duration-300 ${
                  i === active ? 'w-8 bg-primary' : 'w-4 bg-outline-variant group-hover:bg-outline'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
