import type { Metadata } from 'next';
import pageMeta from '@/content/page-meta.json';

export const SITE = 'https://myguardianlink.com';
export const PORTAL = 'https://portal.myguardianlink.com/login';
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
