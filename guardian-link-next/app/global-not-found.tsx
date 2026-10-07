import type { Metadata } from 'next';
import SiteLayout from './(site)/layout';
import NotFound from './(site)/not-found';

/*
 * The site now has three root layouts — (site) for the main website, (students) and (runners)
 * for the two campaign pages — so unmatched URLs no longer have a single layout to render inside.
 * This file serves the main site's 404 (same chrome, same styles) for any URL that matches nothing.
 */
export const metadata: Metadata = { title: 'Page not found | My Guardian Link' };

export default function GlobalNotFound() {
  return (
    <SiteLayout>
      <NotFound />
    </SiteLayout>
  );
}
