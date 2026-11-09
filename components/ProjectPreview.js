'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

// A short muted loop of the project. The poster shows first; the video only loads when the
// card nears the screen and plays only while it is on screen. People who ask for reduced
// motion keep the poster unless they press play. The button stops or starts the loop.
export default function ProjectPreview({ title, preview }) {
  const video = useRef(null);
  const toggle = useRef(() => {});
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let loaded = false;
    let userPaused = reduce.matches;

    const load = () => {
      if (loaded) return;
      loaded = true;
      el.src = el.canPlayType('video/webm; codecs="vp9"') ? preview.webm : preview.mp4;
    };
    const play = () => el.play().catch(() => {});

    const onPlay = () => {
      setPlaying(true);
      setShown(true);
    };
    const onPause = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);

    toggle.current = () => {
      if (el.paused) {
        userPaused = false;
        load();
        play();
      } else {
        userPaused = true;
        el.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        if (userPaused) return;
        load();
        play();
      },
      { rootMargin: '200px 0px', threshold: 0.25 }
    );
    observer.observe(el);

    const onReduce = () => {
      if (!reduce.matches) return;
      userPaused = true;
      el.pause();
    };
    reduce.addEventListener('change', onReduce);

    return () => {
      observer.disconnect();
      reduce.removeEventListener('change', onReduce);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [preview]);

  return (
    <figure className="project-preview relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest">
      {/* The poster is a lazy image, so nothing here loads until the card is near the screen. */}
      <img
        src={preview.poster}
        alt=""
        width={960}
        height={600}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`relative h-full w-full object-cover transition-opacity duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <figcaption className="sr-only">{`A short preview of ${title}`}</figcaption>
      <button
        type="button"
        onClick={() => toggle.current()}
        aria-label={playing ? `Pause the ${title} preview` : `Play the ${title} preview`}
        className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-pill bg-black/55 text-white opacity-80 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:opacity-100"
      >
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>
    </figure>
  );
}
