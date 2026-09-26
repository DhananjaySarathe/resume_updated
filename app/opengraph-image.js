import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@/lib/data';
import { loadOgFonts } from '@/lib/ogFonts';

export const alt = `${profile.name}, founding SDE at Quickads, ${profile.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The link preview for Slack, LinkedIn and WhatsApp, drawn at build time.
export default async function OpenGraphImage() {
  const [fonts, portrait] = await Promise.all([
    loadOgFonts(),
    readFile(path.join(process.cwd(), 'public', 'portrait.jpg')),
  ]);
  const photo = `data:image/jpeg;base64,${portrait.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 80px',
          backgroundColor: '#121317',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(140, 51, 242, 0.35), transparent 55%), radial-gradient(circle at 10% 90%, rgba(13, 191, 230, 0.30), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Bodoni', fontSize: 104, lineHeight: 1.05, color: '#e3e2e7' }}>{profile.firstName}</div>
          <div
            style={{
              fontFamily: 'Bodoni',
              fontStyle: 'italic',
              fontSize: 104,
              lineHeight: 1.1,
              paddingRight: 12,
              backgroundImage: 'linear-gradient(90deg, #4cd7f6, #d0bcff 60%, #acedff)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {`${profile.lastName}.`}
          </div>
          <div style={{ marginTop: 36, fontFamily: 'Hanken', fontSize: 30, color: '#c7d2d6' }}>
            {`${profile.role} · ${profile.location}`}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={photo}
          width={380}
          height={475}
          style={{ objectFit: 'cover', borderRadius: 16, boxShadow: '0 0 60px rgba(6, 182, 212, 0.25)' }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}
