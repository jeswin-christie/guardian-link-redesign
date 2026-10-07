import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { SplitWords, Eyebrow, JsonLd } from '@/components/primitives';
import { POLICIES } from '@/lib/legal';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('legal');

// Cards shown on the live Legal hub, in its order
const HUB = ['acceptable-use-policy', 'sms-calling-and-communication-terms', 'coverage-and-emergency-disclaimer', 'child-guardian-consent-policy', 'sponsor-group-admin-acknowledgment'];
const CORE = ['privacy-policy', 'terms-of-use', 'end-user-license-agreement', 'refund-policy'];

export default function Legal() {
  const pick = (slugs: string[]) => slugs.map((s) => POLICIES.find((p) => p.slug === s)!);
  return (
    <>
      <JsonLd data={pageSchema('legal')} />
      <PageHero
        size="short"
        scale="lg"
        eyebrow="My Guardian Link™"
        lines={['Legal Policies', '& Disclaimers']}
        sub="Please review our policies and agreements below."
        image="chatgpt-image-jun-8-2026-05-14-13-pm-1.webp"
      />
      <section className="panel sec sec--page" data-section="policies">
        <div className="sec__head">
          <Eyebrow>Policies &amp; agreements</Eyebrow>
          <SplitWords className="h2" text="Please review our policies and agreements below." />
        </div>
        <div className="cards" data-stagger>
          {pick(HUB).map((p, i) => (
            <Link key={p.slug} href={`/${p.slug}/`} className="card card-link">
              <span className="card__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3><p>{p.summary}</p>
            </Link>
          ))}
        </div>
        <h3 className="mini-title" style={{ marginTop: 60 }}>Also see</h3>
        <div className="cards" data-stagger>
          {pick(CORE).map((p) => (
            <Link key={p.slug} href={`/${p.slug}/`} className="card card--dark card-link"><h3>{p.title}</h3><p>{p.summary}</p></Link>
          ))}
          <Link href="/account-deletion/" className="card card--dark card-link"><h3>Account Deletion</h3><p>How to permanently delete your account.</p></Link>
        </div>
      </section>
    </>
  );
}
