import type { Metadata, Viewport } from 'next';
import { PT_Sans, Roboto_Slab } from 'next/font/google';

import { SITE } from '@/lib/meta';

import '@/styles/students/styles.css';
import '@/styles/students/intro.css';
// Motion layer: scroll-led reveals, drawn lines, soft pulses. Adds no
// content; remove this and initMotion() in components/PageScripts.tsx to
// turn it off.
import '@/styles/students/motion.css';

// Website headlines: Roboto Slab ExtraBold. Body and subheads: PT Sans.
// Self-hosted by next/font; styles/styles.css reads them as --display / --body.
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-roboto-slab',
});
const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
});

// og:image must be an ABSOLUTE URL for Facebook — uses the main site's address.

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: '/students/' },
  title: 'myGuardianLink — College Parent Protection',
  description:
    'myGuardianLink connects college students to trusted people and a live response coordinator when seconds matter.',
  icons: { icon: '/students/assets/logo.png' },
  openGraph: {
    type: 'website',
    title: 'Protection She Deserves. | myGuardianLink',
    description:
      'One tap. Precise location. Trusted people. Live response. 3 members  — $24.99/month. Start free.',
    images: [{ url: '/students/assets/img/campaign/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#102A43',
};

/* Runs before first paint.
   - `js` lets the reveal and dock styles apply only when a script exists to
     undo them.
   - `gate-on` shows the opening scene, on every page load and every
     refresh. Only arriving on a #section link from elsewhere skips it (the
     visitor asked for that section). A refresh after using the menu still
     plays it: the #section is dropped so the doors open onto the hero.
     The timeout is the safety catch: if lib/behaviour/intro.js never runs,
     nothing could open the scene, so it takes itself away.
   - The scene belongs to the landing page (/students/) only; /students/guide/ has none. */
const GATE_SCRIPT = `(function () {
  var d = document.documentElement;
  d.classList.add('js');
  if (location.pathname !== '/students/' && location.pathname !== '/students') return;
  var nav = window.performance && performance.getEntriesByType
    ? performance.getEntriesByType('navigation')[0] : null;
  var reload = !!nav && nav.type === 'reload';
  if (window.location.hash) {
    if (!reload) return;
    history.replaceState(null, '', location.pathname + location.search);
  }
  d.classList.add('gate-on');
  setTimeout(function () {
    if (!window.__gateReady) d.classList.remove('gate-on');
  }, 3000);
}());`;

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return (
    // The gate script adds classes to <html> before React hydrates.
    <html lang="en" className={`${robotoSlab.variable} ${ptSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />
        <link rel="preload" as="image" href="/students/assets/img/campaign/campus-dusk.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
