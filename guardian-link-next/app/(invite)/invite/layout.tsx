import type { Metadata, Viewport } from 'next';
import helvetica from '../../fonts/helvetica';
import { ORIGIN, SITE } from '@/lib/meta';
import './invite.css';

/* Personal Invite page (/invite/) — its own root layout, so none of the main site's nav, loader, chat or
   styles load here: one message, one button, fast on mobile. The link-preview image, its alt text and the
   icons are the files in this folder (opengraph-image.jpg, twitter-image.jpg, icon.png, apple-icon.png),
   which Next.js turns into og:/twitter: tags in the server-rendered HTML that messaging apps read. */
const TITLE = 'You’re Invited to My Guardian Link';
const DESCRIPTION = 'Personal protection. Trusted contacts. Live response support.';

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/invite/` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE}/invite/`, type: 'website', siteName: 'My Guardian Link' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: '#06183A', width: 'device-width', initialScale: 1 };

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={helvetica.variable}>
      <body className="inv-body">{children}</body>
    </html>
  );
}
