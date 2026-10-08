import PageHero from '@/components/PageHero';
import { SplitWords, Btn, Eyebrow, JsonLd, TextLink } from '@/components/primitives';
import { CtaPanel } from '@/components/Sections';
import { pageMetadata, pageSchema, DISCLAIMER_RESPONSE } from '@/lib/meta';
import { getProtected } from '@/lib/funnel';

export const metadata = pageMetadata('how-it-works');

/* Five practical situations (client review: reduced from nine). The product list lives on /pricing/. */
const SITUATIONS = [
  'Someone is nearby and you cannot speak.',
  'You are being followed.',
  'You are injured or confused.',
  'You do not know where you are.',
  'Calling 911 may escalate the danger.',
];

const FLOW: [string, string][] = [
  ['You Activate Help', 'Tap the app, use your voice, smartwatch, or earbuds — or activate silently.'],
  ['Your identity and location are sent', 'Your verified identity, phone number, GPS location, emergency type, and time are sent instantly.'],
  ['Your trusted contacts are alerted', 'The people you choose receive an alert with your details and location.'],
  ['A trained response coordinator responds', 'A trained response coordinator reviews your signal and helps guide the response.'],
  ['911 Escalation', 'When needed, the coordinator can contact 911 and share your verified details.'],
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={pageSchema('how-it-works')} />
      <PageHero
        eyebrow="The 5-Step Flow"
        lines={['Help Starts With', 'One Silent Signal.']}
        scale="lg"
        sub="A simple step-by-step view of how My Guardian Link helps move information quickly when urgent help is needed."
        primary={getProtected('hero')}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="9.webp"
      />

      <section className="panel sec sec--page" data-section="flow">
        <Eyebrow>The 5-Step Flow</Eyebrow>
        <SplitWords className="h2" text="From one signal to a coordinated response." />
        <ol className="steps steps--page" data-reveal>
          {FLOW.map(([title, text]) => <li key={title}><b>{title}</b>{text}</li>)}
        </ol>
        <div className="flow-proof" data-reveal>
          <Btn a={{ label: 'See What Happens After Activation', href: '/#proof', cta: 'hiw-proof' }} variant="ghost" arrow />
          <TextLink a={{ label: 'See all activation options & devices', href: '/features/#devices', cta: 'hiw-devices' }} />
        </div>
      </section>

      <section className="panel sec sec--black" data-section="cannot-speak">
        <div className="sec__head">
          <SplitWords className="h2 h2--xl" text="When you cannot speak" />
          <p className="lead lead--light" data-reveal>Some emergencies are silent, fast-moving, or too dangerous to explain out loud.</p>
        </div>
        <ol className="biglist biglist--sm" data-stagger>
          {SITUATIONS.map((s, i) => <li key={s}><em>{String(i + 1).padStart(2, '0')}</em>{s}</li>)}
        </ol>
        <p className="statement statement--center statement--sm" data-reveal style={{ marginTop: 'clamp(40px,7vh,72px)' }}>Even when you cannot explain the emergency, your identity, precise location, and urgent signal can still reach trusted contacts and a response coordinator.</p>
      </section>

      <CtaPanel
        title="Set it up before you need it."
        text="Preparation takes minutes. The moment you need help is not the time to wish you had it."
        image="page-2-block-4-bg-e1779960403948.webp"
        alt=""
        reassure={`Setup takes minutes. ${DISCLAIMER_RESPONSE}`}
        notes={false}
      />
    </>
  );
}
