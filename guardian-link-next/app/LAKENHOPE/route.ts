import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* Laken Hope Foundation × My Guardian Link landing page (/LAKENHOPE/, client request Nov 2026).
   Served exactly as the approved proof (laken-hope-proof.vercel.app): one self-contained HTML file with its
   images embedded, kept in content/lakenhope/index.html, plus the Panel 4 image in public/LAKENHOPE/.
   Production edits to the proof copy: every CTA goes to the LAKENHOPE referral link, the Vercel preview
   toolbar script is removed, and the title / link-preview tags are added.
   /lakenhope in any other letter case redirects here in the server's nginx config (like /FALL50/). */
export const dynamic = 'force-static';

const html = readFileSync(join(process.cwd(), 'content/lakenhope/index.html'), 'utf8');

export function GET() {
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}
