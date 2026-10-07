import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import LegalDoc from '@/components/LegalDoc';
import { POLICIES } from '@/lib/legal';
import { SITE } from '@/lib/meta';

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ policy: string }> }): Promise<Metadata> {
  const { policy } = await params;
  const p = POLICIES.find((x) => x.slug === policy);
  if (!p) return {};
  const title = `${p.doc.title} | My Guardian Link | Get Connected + Stay Protected`;
  return { title: { absolute: title }, description: p.summary, alternates: { canonical: `${SITE}/${p.slug}/` } };
}

export default async function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params;
  const p = POLICIES.find((x) => x.slug === policy);
  if (!p) notFound();
  const words = p.doc.title.split(' ');
  // split long titles over two lines for the hero
  const mid = Math.ceil(words.length / 2);
  const lines = words.length > 3 ? [words.slice(0, mid).join(' '), words.slice(mid).join(' ')] : [p.doc.title];
  return (
    <>
      <PageHero
        size="short"
        scale="md"
        eyebrow={p.doc.subtitle || 'My Guardian Link™'}
        lines={lines}
        sub={<div className="doc__meta">{p.doc.updated && <span>{p.doc.updated}</span>}<span>Legal Policies &amp; Disclaimers</span></div>}
        image="homw-block-3-highshield.webp"
      />
      <LegalDoc doc={p.doc} />
    </>
  );
}
