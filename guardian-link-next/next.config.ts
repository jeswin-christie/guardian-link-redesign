import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  // 75 is the default; 85 is used by the /runners/ page photos
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 85] },
  // Three root layouts (main site, /students/, /runners/) — app/global-not-found.tsx serves the 404
  experimental: { globalNotFound: true },
  async redirects() {
    // 301s carried over from the WordPress site (seo/redirects.csv)
    return [
      { source: '/who-it-protect', destination: '/who-it-protects/', permanent: true },
      { source: '/support-2-2', destination: '/support/', permanent: true },
      { source: '/home-page', destination: '/', permanent: true },
      { source: '/home-page-white', destination: '/', permanent: true },
      { source: '/elementor-8018', destination: '/', permanent: true },
      { source: '/info-center', destination: '/faq/', permanent: true },
    ];
  },
};

export default nextConfig;
