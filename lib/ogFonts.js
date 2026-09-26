import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Satori (next/og) needs TTF/OTF/WOFF, not the WOFF2 that next/font serves, so the
// link preview and icons read the same typefaces from Fontsource.
const file = (pkg, name) => readFile(path.join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', name));

export async function loadOgFonts({ withSans = true } = {}) {
  const [bodoni, bodoniItalic, hanken] = await Promise.all([
    file('bodoni-moda', 'bodoni-moda-latin-700-normal.woff'),
    file('bodoni-moda', 'bodoni-moda-latin-700-italic.woff'),
    withSans ? file('hanken-grotesk', 'hanken-grotesk-latin-500-normal.woff') : null,
  ]);
  return [
    { name: 'Bodoni', data: bodoni, weight: 700, style: 'normal' },
    { name: 'Bodoni', data: bodoniItalic, weight: 700, style: 'italic' },
    ...(hanken ? [{ name: 'Hanken', data: hanken, weight: 500, style: 'normal' }] : []),
  ];
}
