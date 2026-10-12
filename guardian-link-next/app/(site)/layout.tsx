import type { Metadata, Viewport } from 'next';
import helvetica from '../fonts/helvetica';
import '../globals.css';
import Loader from '@/components/Loader';
import Motion from '@/components/Motion';
import PillNav from '@/components/PillNav';
import Overlays from '@/components/Overlays';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import CtaTracking from '@/components/CtaTracking';
import { ORIGIN, OG_IMAGE } from '@/lib/meta';

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: { default: 'My Guardian Link | Get Connected + Stay Protected', template: '%s | My Guardian Link' },
  icons: { icon: '/media/shield-mark-favicon.webp', apple: '/media/cropped-whatsapp-image-2026-07-07-at-7-55-30-pm.webp' },
  // Fallback for pages that don't set their own openGraph (pageMetadata() adds the same image)
  openGraph: { siteName: 'My Guardian Link', type: 'website', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
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
        <CtaTracking />
      </body>
    </html>
  );
}
