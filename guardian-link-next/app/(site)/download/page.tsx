import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import StoreRedirect from '@/components/StoreRedirect';
import { APP_STORE, GOOGLE_PLAY, SITE } from '@/lib/meta';

/* One link / QR code for "download the app": phones are sent to their own store,
   desktops see both buttons. Used by the /students/ download card's QR code. */
export const metadata: Metadata = {
  title: { absolute: 'Download the App | My Guardian Link' },
  description: 'Download the My Guardian Link app for iPhone or Android.',
  alternates: { canonical: `${SITE}/download/` },
};

export default function Download() {
  return (
    <>
      <StoreRedirect />
      <PageHero
        size="short"
        lines={['Download', 'the App']}
        sub="Get My Guardian Link on your phone to add trusted contacts and activate protection."
        image="home-page-5.webp"
      >
        <div className="footer__stores download__stores">
          <a href={APP_STORE} className="store" data-cta="download-app-store"><small>Download on the</small>App Store</a>
          <a href={GOOGLE_PLAY} className="store" data-cta="download-google-play"><small>Get it on</small>Google Play</a>
        </div>
      </PageHero>
    </>
  );
}
