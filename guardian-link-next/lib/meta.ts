import type { Metadata } from 'next';
import pageMeta from '@/content/page-meta.json';

export const SITE = 'https://myguardianlink.com';
export const PORTAL = 'https://portal.myguardianlink.com/login';
export const SUPPORT_FORM = 'https://link.yougetitfirst.com/widget/form/KzxeNUNyIwEYjMV3Z1ux';

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
