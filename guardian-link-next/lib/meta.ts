import type { Metadata } from 'next';
import pageMeta from '@/content/page-meta.json';

export const SITE = 'https://myguardianlink.com';
export const PORTAL = 'https://portal.myguardianlink.com/login';
/** Account creation = the portal's phone-number sign-in (verified 2026-10-08: portal.myguardianlink.com/ redirects here; no separate signup route).
 *  The portal reads only `returnTo`, `source` and `code` — it cannot preserve a chosen plan yet. */
export const SIGNUP = PORTAL;
export const APP_STORE = 'https://apps.apple.com/us/app/my-guardian-link/id6782908401';
export const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.my_guardian_link';
export const SUPPORT_EMAIL = 'support@myguardianlink.com';
export const SUPPORT_FORM = 'https://link.yougetitfirst.com/widget/form/KzxeNUNyIwEYjMV3Z1ux';
/** GoHighLevel chat widget "My Guardian Help Desk" (location Ab2vxQ5yR5MIplQBIXB5) */
/** Sitewide 911 disclaimer — import these everywhere so the wording never drifts. */
export const DISCLAIMER_911 = 'My Guardian Link supports 911 — it does not replace 911.';
export const DISCLAIMER_RESPONSE = 'Emergency response depends on circumstances, connectivity, and available services.';
export const DISCLAIMER = `${DISCLAIMER_911} ${DISCLAIMER_RESPONSE}`;
/** Shown under every major Get Protected Now button. */
export const NEXT_STEP = 'Next step: create your account, choose your plan, add trusted contacts, download the app, and activate protection.';
export const CHAT_WIDGET_ID = '6a4f7c76cf52f8a07d7a8f6e';

type MetaEntry = {
  route: string;
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  schema_jsonld?: unknown[];
};
const META = pageMeta as unknown as Record<string, MetaEntry>;

/** Page metadata straight from seo/page-meta.json (titles and descriptions are the live site's, unchanged). */
export function pageMetadata(key: string): Metadata {
  const m = META[key];
  if (!m) return {};
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: m.canonical },
    robots: m.robots,
    openGraph: { title: m.title, description: m.description, url: m.canonical, siteName: 'My Guardian Link', type: 'website' },
  };
}

export function pageSchema(key: string): unknown[] {
  return META[key]?.schema_jsonld ?? [];
}
