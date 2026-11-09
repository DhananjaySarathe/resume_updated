'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Switches between the warm light theme (default) and the dark theme, and remembers the
// choice on this device. The icon is picked in CSS, so it is right on the first paint.
export default function ThemeToggle() {
  const [dark, setDark] = useState(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme !== 'dark';
    // Colour transitions would otherwise animate every element through the switch.
    root.classList.add('theme-switching');
    if (next) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    void getComputedStyle(root).color;
    requestAnimationFrame(() => root.classList.remove('theme-switching'));
    try {
      if (next) localStorage.setItem('theme', 'dark');
      else localStorage.removeItem('theme');
    } catch {}
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', next ? '#111214' : '#faf7f2');
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={dark ?? undefined}
      title={dark ? 'Switch to the light theme' : 'Switch to the dark theme'}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
    >
      <Moon size={17} aria-hidden="true" className="dark:hidden" />
      <Sun size={17} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
