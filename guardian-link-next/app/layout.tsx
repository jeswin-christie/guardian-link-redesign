import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Loader from '@/components/Loader';
import Motion from '@/components/Motion';
import PillNav from '@/components/PillNav';
import Overlays from '@/components/Overlays';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { SITE } from '@/lib/meta';

// Helvetica Neue, self-hosted from the client-supplied font files (subset to Latin, WOFF2)
const helvetica = localFont({
  src: [
    { path: './fonts/helvetica-neue-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/helvetica-neue-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/helvetica-neue-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/helvetica-neue-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/helvetica-neue-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/helvetica-neue-700-italic.woff2', weight: '700', style: 'italic' },
    { path: './fonts/helvetica-neue-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/helvetica-neue-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'My Guardian Link | Get Connected + Stay Protected', template: '%s | My Guardian Link' },
  icons: { icon: '/media/shield-mark-favicon.webp', apple: '/media/cropped-whatsapp-image-2026-07-07-at-7-55-30-pm.webp' },
};

export const viewport: Viewport = { themeColor: '#020C1D', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={helvetica.variable}>
      <body>
        <Loader />
        <Cursor />
        <main className="frame">
          {children}
          <Footer />
        </main>
        <PillNav />
        <Overlays />
        <Motion />
        <ChatWidget />
      </body>
    </html>
  );
}
