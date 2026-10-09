import PageHero from '@/components/PageHero';
import { SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { Faq } from '@/components/Interactive';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { pageMetadata, pageSchema, DISCLAIMER_911, APP_STORE, GOOGLE_PLAY } from '@/lib/meta';
import { getProtected } from '@/lib/funnel';

export const metadata = pageMetadata('faq');

/* Conversion order (client review, Oct 2026). Every answer is 2–4 plain-English sentences and uses only
   what the site already states. Keep content/page-meta.json (FAQPage JSON-LD) in sync with these. */
const QA: [string, ReactNode][] = [
  ['Does My Guardian Link replace 911?', <>No. {DISCLAIMER_911} When you cannot call, speak, or explain clearly, it helps share your verified identity, location, and incident details with your trusted contacts and a trained response coordinator, who can contact 911 when needed. If you can safely call 911 yourself, do so. <Link href="/why-it-matters/">Why 911 alone may not be enough</Link>.</>],
  ['What happens after I activate help?', 'Your identity, GPS location, and incident details are sent to your trusted contacts and a trained response coordinator. The coordinator reviews your signal and, when needed, can contact 911 and share your verified details.'],
  ['Who receives my signal?', 'Your trusted contacts and a trained response coordinator. Your trusted contacts are the people you choose when you set up your account.'],
  ['What does the response coordinator do?', 'A trained response coordinator reviews your alert in real time and checks your location and message. They begin the next response steps right away and can contact 911 and share your verified details when needed.'],
  ['Is my GPS location sent?', 'Yes. Your GPS location is sent with your signal when it is available. Accuracy depends on your device, coverage, and connectivity.'],
  ['What if I cannot talk?', <>You can send an alert without speaking. My Guardian Link is designed for silent or limited-action situations. <Link href="/features/#devices">See all activation options</Link>.</>],
  ['Can my family or trusted contacts be notified?', 'Yes. The trusted contacts you choose, such as family members, receive the urgent signal. They get an alert with your message, location, and quick action options.'],
  ['Does My Guardian Link work everywhere?', <>My Guardian Link works over cellular data or Wi-Fi. Coverage is not guaranteed in every location, and performance depends on coverage, connectivity, and device connections. <Link href="/features/#coverage-map">View the coverage map</Link>.</>],
  ['Is there a record of the incident?', 'Yes. Incident activity can be time-stamped and documented for accountability. This gives you a clear record of what happened and when.'],
  ['What happens after I click Get Protected Now?', 'You create your account, choose your plan, add trusted contacts, download the app, and activate protection. Setup only takes a few minutes.'],
  ['Where do I create my account?', 'You create your account through the secure My Guardian Link portal. Tap Get Protected Now on any page to open it. You verify your mobile number, then choose your plan and add your trusted contacts.'],
  ['Where do I download the app?', <>Download the My Guardian Link app from the <a href={APP_STORE} target="_blank" rel="noopener" data-cta="faq-app-store">App Store</a> on iPhone or <a href={GOOGLE_PLAY} target="_blank" rel="noopener" data-cta="faq-google-play">Google Play</a> on Android. After you create your account, download the app to activate protection.</>],
  ['Can I cancel anytime?', 'Yes. There is no long-term commitment. Cancel within the first 30 days of your first paid membership to request a refund. After you cancel, your membership stays active through the end of your paid billing term, and Apple subscriptions are managed in your Apple account settings.'],
  ['Who should use this?', 'Anyone who may need help when they cannot speak, move, call, or explain clearly. That includes people who feel unsafe, people at risk of medical distress, students, runners and lone workers, and families who want to protect each other.'],
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
