import localFont from 'next/font/local';

// Helvetica Neue, self-hosted from the client-supplied font files (subset to Latin, WOFF2)
const helvetica = localFont({
  src: [
    { path: './helvetica-neue-300.woff2', weight: '300', style: 'normal' },
    { path: './helvetica-neue-400.woff2', weight: '400', style: 'normal' },
    { path: './helvetica-neue-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './helvetica-neue-500.woff2', weight: '500', style: 'normal' },
    { path: './helvetica-neue-700.woff2', weight: '700', style: 'normal' },
    { path: './helvetica-neue-700-italic.woff2', weight: '700', style: 'italic' },
    { path: './helvetica-neue-800.woff2', weight: '800', style: 'normal' },
    { path: './helvetica-neue-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});

export default helvetica;
