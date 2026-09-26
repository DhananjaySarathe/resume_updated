// Absolute site URL for metadata, the link preview and the print header.
// Set NEXT_PUBLIC_SITE_URL once there is a custom domain; Vercel fills in the rest.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const repoUrl = 'https://github.com/DhananjaySarathe/resume_updated';
