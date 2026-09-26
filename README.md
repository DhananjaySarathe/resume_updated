# Dhananjay Sarathe, portfolio

My portfolio. One page, built with Next.js 14 (App Router), React 18 and Tailwind CSS.

![check](https://github.com/DhananjaySarathe/resume_updated/actions/workflows/check.yml/badge.svg)

## Where things are

- `lib/data.js` holds all the copy: profile, experience, projects, stack. Change text there, not in components.
- `lib/colophon.json` holds the "How this page is built" notes in the footer. Each note names the files it describes, and the build fails if one of them goes missing.
- `components/` has one file per section. Files that start with `'use client'` ship JavaScript; the rest render on the server.
- `app/` has the page, the metadata, the link preview image (`opengraph-image.js`), the icons, the 404 and the print stylesheet.

## Decisions

| What | Why |
| --- | --- |
| The aurora is a WebGL shader at half the window size and at most 30 fps, with a pause control | The shader is soft, so the lower resolution is hard to spot, and fewer pixels and frames mean less GPU work |
| One IntersectionObserver for every scroll reveal, plus a no-JS fallback in the head | If hydration never happens, the page still shows everything after three seconds |
| Metrics render at their final value on the server | They read right without JavaScript and when printed; the count-up is extra |
| Two font families through `next/font` | Self-hosted, no requests to Google |
| A print stylesheet | Cmd+P gives a plain resume instead of a dark page |

## Budget and checks

First-load JavaScript for `/` stays under 110 kB gzipped (about 102 kB today). CI checks it on every push, and also runs [Prunify](https://www.npmjs.com/package/prunify) (my dead-code tool) for dead exports, import cycles and unused assets.

Before each build, `scripts/prunify-self.mjs` runs Prunify on this repo and saves the counts that the Prunify project card shows. That step never blocks a deploy.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build
npm run check:budget
npm run check:prunify
```

Set `NEXT_PUBLIC_SITE_URL` in production once there is a custom domain; until then the Vercel production URL is used for metadata.

## Credit

The visual design started from a concept made in Google Stitch.
