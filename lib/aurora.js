// Shared by the aurora canvas, its pause control and the footer sentence that describes them.

// The aurora is soft by nature, so it renders at a fraction of the screen size and is
// scaled up by CSS. Visually identical, a fraction of the GPU cost.
export const RENDER_SCALE = 0.5;

// Slow drift doesn't need 120 redraws a second; 30 keeps laptops cool.
export const AURORA_FPS = 30;

export const AURORA_STORAGE_KEY = 'aurora';
export const AURORA_EVENTS = { pause: 'aurora:pause', play: 'aurora:play' };

// Reduced motion or Save-Data: draw a single still frame and offer no toggle.
export function auroraStill() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
}
