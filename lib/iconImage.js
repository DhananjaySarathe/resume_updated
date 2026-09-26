import { ImageResponse } from 'next/og';
import { loadOgFonts } from './ogFonts';

// One place for the tab icon's letter, shared by the favicon and the Apple touch icon.
const LETTER = 'D';

export async function iconImage(px, radius) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121317',
          borderRadius: radius,
          fontFamily: 'Bodoni',
          fontStyle: 'italic',
          fontSize: Math.round(px * 0.8),
          color: '#4cd7f6',
          paddingRight: Math.round(px * 0.04),
        }}
      >
        {LETTER}
      </div>
    ),
    { width: px, height: px, fonts: await loadOgFonts({ withSans: false }) }
  );
}
