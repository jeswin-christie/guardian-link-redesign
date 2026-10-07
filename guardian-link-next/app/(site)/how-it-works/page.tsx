import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { AutoAccordion } from '@/components/Interactive';
import { CtaPanel } from '@/components/Sections';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('how-it-works');

const SITUATIONS = [
  'When Someone Is Nearby And You Cannot Speak', 'You are hiding', 'You Are Being Chased', 'You Are Being Attacked',
  'You are injured', 'You are confused', 'You are being followed', 'You do not know where you are', 'When Calling 911 Will Escalate The Danger',
];

const PRODUCTS: { n: string; t: string; tag?: [string, string]; d: string }[] = [
  { n: '1', t: 'URGENT ASSIST', d: 'Rapid help when you need it most.' },
  { n: '2', t: 'ROADSIDE ASSISTANCE', d: 'Get back on the road quickly and safely.' },
  { n: '3', t: 'URGENT MEDICAL ASSISTANCE', tag: ['NEW RELEASE', ''], d: 'Connect to medical help when every second counts.' },
  { n: '4', t: 'SEE SOMETHING, SAY SOMETHING', d: 'Report concerns. Help keep communities safe.' },
  { n: '5', t: 'TRUSTED CONTACT ASSIST', tag: ['FREEMIUM', ''], d: 'Notify one trusted contact so they can respond and support you.' },
  { n: '6', t: 'FALSE ALARM WORKFLOW', d: 'Confirms accidental activations quickly and helps prevent unnecessary escalation.' },
  { n: '7', t: 'TORNADO ALERT', tag: ['FUTURE RELEASE', 'future'], d: 'Real-time alerts and guidance when severe weather threatens.' },
  { n: '8', t: 'WILDFIRE ALERT', tag: ['FUTURE RELEASE', 'future'], d: 'Stay ahead of wildfire risk with timely alerts and updates.' },
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={pageSchema('how-it-works')} />
      <PageHero
        eyebrow="The 5-Step Flow"
        lines={['Helps starts with', 'one silent signal.']}
        scale="lg"
        sub="A simple step-by-step view of how My Guardian Link helps move information quickly when urgent help is needed."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="9.webp"
      />

      <section className="panel accsec" data-section="flow">
        <div className="accsec__head">
          <Eyebrow>The 5-Step Flow</Eyebrow>
          <SplitWords className="h2" text="From one signal to a coordinated response." />
        </div>
        <AutoAccordion items={[
          { title: 'You Activate Help', body: <p>Tap the app, use voice command, smartwatch, earbuds, or silent activation.</p>, image: '9.webp' },
          { title: 'Your identity and location are sent', body: <p>Verified identity, phone, GPS location, emergency type, and timestamp are delivered instantly.</p>, image: 'chatgpt-image-may-25-2026-03-00-28-pm-e1779701764908.webp' },
          { title: 'Your trusted contacts are alerted', body: <p>The people you choose receive immediate alerts with verified details.</p>, image: 'what-your-account-recieve.webp' },
          { title: 'A trained personal coordinator responds', body: <p>A human response coordinator reviews and takes action on your signal and guides the response.</p>, image: 'support-banner-mgl-1.webp' },
          { title: '911 Escalation', body: <p>911 will be contacted. When needed, verified details will be shared with 911 so response can begin faster.</p>, image: 'home-banner-2-e1783070253640.webp' },
        ]} />
      </section>

      <section className="panel sec sec--black" data-section="cannot-speak">
        <div className="sec__head">
          <Eyebrow light>When you cannot speak</Eyebrow>
          <SplitWords className="h2 h2--xl" text="When you cannot speak" />
          <p className="lead lead--light" data-reveal>Some emergencies are silent, fast-moving, or too dangerous to explain out loud.</p>
        </div>
        <ol className="biglist" data-stagger>
          {SITUATIONS.map((s, i) => <li key={s}><em>{String(i + 1).padStart(2, '0')}</em>{s}</li>)}
        </ol>
        <div className="sec__center" style={{ marginTop: 'clamp(50px,9vh,100px)', marginBottom: 0 }}>
          <p className="statement statement--center" data-reveal>Even when you cannot explain the emergency, your identity, precise location, and urgent signal can still reach trusted contacts and a personal coordinator.</p>
          <ul className="chips chips--lg chips--center" data-stagger style={{ marginTop: 34 }}>
            <li>Silent urgent signal</li><li>Precise GPS location</li><li>Trusted contacts</li><li>Personal coordinator</li>
          </ul>
        </div>
      </section>

      <section className="panel sec sec--panel" data-section="products">
        <div className="sec__head">
          <Eyebrow light>My Guardian Link current products</Eyebrow>
          <SplitWords className="h2" text="My Guardian Link current products" />
          <p className="lead lead--light" data-reveal>The platform is designed as a flexible infrastructure layer that supports multiple user needs and deployment models.</p>
        </div>
        <div className="products">
          <figure className="products__img img-reveal" data-reveal-img><Img src="page-2-section-4-e1779956986685.webp" data-parallax-img="" /></figure>
          <div className="cards cards--2" data-stagger>
            {PRODUCTS.map((p) => (
              <article className="card card--dark" key={p.n}>
                <span className="card__n">{p.n.padStart(2, '0')}</span>
                {p.tag && <span className={`card__tag${p.tag[1] ? ' card__tag--' + p.tag[1] : ''}`}>{p.tag[0]}</span>}
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="statement statement--center" data-reveal style={{ marginTop: 'clamp(48px,8vh,90px)' }}>One platform. Protection for individuals, families, teams, and organizations.</p>
      </section>

      <CtaPanel
        title="Set it up before you need it."
        text="Preparation takes minutes. The moment you need is help is not the time to wish you had it."
        image="page-2-block-4-bg-e1779960403948.webp"
        alt=""
        notes={false}
      />
      <section className="panel sec sec--page strip" data-section="starts">
        <div className="strip__lead" data-reveal>
          <h3>Starts in minutes</h3>
          <p>Be ready before danger finds you.</p>
        </div>
        <ul className="chips chips--lg" data-stagger>
          <li>Silent Activation</li><li>Trusted Contact</li><li>Personal Coordinator</li><li>911 escalation support</li>
        </ul>
        <p className="tagline" data-reveal>Your Protection. Our Technology. Always Connected.</p>
        <div className="strip__btn">
          <Btn a={{ label: 'Get Protected Now', href: '/pricing/' }} variant="cta" />
          <NextStep />
        </div>
      </section>
    </>
  );
}
