'use client';

import { useEffect, useState } from 'react';
import { AURORA_EVENTS, AURORA_STORAGE_KEY, auroraStill } from '@/lib/aurora';

// Stops or restarts the background shader. The choice is remembered on this device.
export default function AuroraToggle() {
  const [paused, setPaused] = useState(null);

  useEffect(() => {
    if (auroraStill()) return;
    let stored = false;
    try {
      stored = localStorage.getItem(AURORA_STORAGE_KEY) === 'paused';
    } catch {}
    setPaused(stored);
  }, []);

  if (paused === null) return null;

  const toggle = () => {
    const next = !paused;
    try {
      if (next) localStorage.setItem(AURORA_STORAGE_KEY, 'paused');
      else localStorage.removeItem(AURORA_STORAGE_KEY);
    } catch {}
    window.dispatchEvent(new Event(next ? AURORA_EVENTS.pause : AURORA_EVENTS.play));
    setPaused(next);
  };

  return (
    <button type="button" onClick={toggle} className="text-link text-on-surface">
      {paused ? 'Play background' : 'Pause background'}
    </button>
  );
}
