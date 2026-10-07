import PageHero from '@/components/PageHero';
import { SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { Faq } from '@/components/Interactive';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('faq');

const QA: [string, string][] = [
  ['Does My Guardian Link work everywhere?', 'My Guardian Link works on cellular data or Wi-Fi. Performance depends on coverage, connectivity, and device connections.'],
  ['Is this a replacement for 911?', 'No. It is designed to support 911 when you cannot call, speak, or explain clearly.'],
  ['Who receives my signal?', 'Your trusted contacts and a personal coordinator.'],
  ['What does the coordinator do?', 'A live coordinator reviews your alert in real time, verifies your location and message, and begins the next response steps immediately.'],
  ['Does it work if I cannot talk?', 'Yes. The system is designed for silent or limited-action situations.'],
  ['Is my location sent?', 'Yes, the system sends GPS location when available.'],
  ['Can my family be notified?', 'Yes, trusted contacts can receive the urgent signal.'],
  ['Is there a record?', 'Yes. Incident activity can be time-stamped and documented for accountability.'],
  ['Who should use this?', 'Anyone who may need help when they cannot speak, move, call, or explain clearly.'],
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={pageSchema('faq')} />
      <PageHero
        size="short"
        eyebrow="Info Center"
        lines={['What You Need', 'To know']}
        sub="Clear answer before you activate protection."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="hero-new-block-bg-e1779806276185.webp"
      />

      <section className="panel sec sec--panel" data-section="trust">
        <div className="stat-row" data-stagger>
          <div className="stat"><b>Built for protection.</b><span>Powered by reliable response technology.</span></div>
          <div className="stat"><b>US-based support</b><span>Ready when urgent moments happen.</span></div>
          <div className="stat"><b>Your privacy</b><span>Always protected.</span></div>
        </div>
        <p className="tagline tagline--center" data-reveal>Trusted. Secure. You are never alone.</p>
      </section>

      <section className="panel sec sec--page" data-section="faq">
        <div className="faqsec">
          <div className="faqsec__aside">
            <Eyebrow>Info Center</Eyebrow>
            <SplitWords className="h2" text="Clear answer before you activate protection." />
            <div className="btn-row" data-reveal>
              <Btn a={{ label: 'Get Protected Now', href: '/pricing/' }} variant="cta" />
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
