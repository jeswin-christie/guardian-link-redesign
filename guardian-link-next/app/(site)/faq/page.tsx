import PageHero from '@/components/PageHero';
import { SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { Faq } from '@/components/Interactive';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { pageMetadata, pageSchema, DISCLAIMER_911 } from '@/lib/meta';
import { getProtected } from '@/lib/funnel';

export const metadata = pageMetadata('faq');

/* Conversion order (client review, Oct 2026). Answers use only what the live site states. */
const QA: [string, ReactNode][] = [
  ['Does My Guardian Link replace 911?', <>No. {DISCLAIMER_911} It is designed to support 911 when you cannot call, speak, or explain clearly. <Link href="/why-it-matters/">Why 911 alone may not be enough</Link>.</>],
  ['What happens after I activate help?', 'Your identity, GPS location, and incident details are sent to your trusted contacts and a trained response coordinator. The coordinator reviews your signal and, when needed, can contact 911 and share your verified details.'],
  ['Who receives my signal?', 'Your trusted contacts and a trained response coordinator.'],
  ['What does the response coordinator do?', 'A live coordinator reviews your alert in real time, verifies your location and message, and begins the next response steps immediately.'],
  ['Is my GPS location sent?', 'Yes, the system sends GPS location when available.'],
  ['What if I cannot talk?', <>My Guardian Link is designed for silent or limited-action situations. You can send an alert without speaking. <Link href="/features/#devices">See all activation options</Link>.</>],
  ['Can my family or trusted contacts be notified?', 'Yes. The trusted contacts you choose can receive the urgent signal.'],
  ['Does My Guardian Link work everywhere?', <>My Guardian Link works on cellular data or Wi-Fi. Performance depends on coverage, connectivity, and device connections. <Link href="/features/#coverage-map">View the coverage map</Link>.</>],
  ['Is there a record of the incident?', 'Yes. Incident activity can be time-stamped and documented for accountability.'],
  ['What happens after I click Get Protected Now?', 'You will create your account, choose your plan, add trusted contacts, download the app, and activate protection. Setup only takes a few minutes.'],
  ['Can I cancel anytime?', 'Yes. There is no long-term commitment. Cancel within the first 30 days of your first paid membership to request a refund. After you cancel, your membership remains active through the end of your paid billing term. Subscriptions purchased through Apple are managed in your Apple account settings.'],
  ['Who should use this?', 'Anyone who may need help when they cannot speak, move, call, or explain clearly.'],
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={pageSchema('faq')} />
      <PageHero
        size="short"
        eyebrow="Info Center"
        lines={['What You Need', 'To Know']}
        sub="Clear answers before you activate protection."
        primary={getProtected('hero')}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="hero-new-block-bg-e1779806276185.webp"
      />

      <section className="panel sec sec--panel" data-section="trust">
        <div className="stat-row" data-stagger>
          <div className="stat"><b>Built for protection.</b><span>Powered by reliable response technology.</span></div>
          <div className="stat"><b>US-based support.</b><span>Ready when urgent moments happen.</span></div>
          <div className="stat"><b>Your privacy.</b><span>Your information is encrypted and never sold.</span></div>
        </div>
      </section>

      <section className="panel sec sec--page" data-section="faq">
        <div className="faqsec">
          <div className="faqsec__aside">
            <Eyebrow>Info Center</Eyebrow>
            <SplitWords className="h2" text="Clear answers before you activate protection." />
            <div className="btn-row" data-reveal>
              <Btn a={getProtected('faq')} variant="cta" />
              <button type="button" className="ulink" data-open="org">Protect My Organization</button>
            </div>
            <NextStep />
          </div>
          <Faq items={QA.map(([q, a]) => ({ q, a: <p>{a}</p> }))} />
        </div>
      </section>
    </>
  );
}
