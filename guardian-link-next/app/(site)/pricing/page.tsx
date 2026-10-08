import PageHero from '@/components/PageHero';
import { SplitWords, Eyebrow, JsonLd } from '@/components/primitives';
import { PricingPlans } from '@/components/Interactive';
import { pageMetadata, pageSchema, APP_STORE, GOOGLE_PLAY } from '@/lib/meta';
import { PLANS } from '@/lib/plans';
import { PRODUCTS, STATUS_LABEL, type Item } from '@/lib/status';

export const metadata = pageMetadata('pricing');

const AFTER = ['Create your account', 'Verify your phone', 'Choose or confirm your plan', 'Add trusted contacts', 'Download the app', 'Activate protection'];

/* Live products first, then future releases — labels come from lib/status.ts */
const INCLUDED: Item[] = [
  PRODUCTS.urgentAssist, PRODUCTS.trustedContactAssist, PRODUCTS.seeSomethingSaySomething, PRODUCTS.falseAlarmWorkflow,
  PRODUCTS.roadsideAssistance, PRODUCTS.urgentMedicalAssistance, PRODUCTS.tornadoAlert, PRODUCTS.wildfireAlert,
];

export default function Pricing() {
  return (
    <>
      <JsonLd data={pageSchema('pricing')} />
      <PageHero
        size="short"
        eyebrow="Plan & Pricing"
        lines={['Get Protected', 'In Minutes']}
        sub="Simple plans. Powerful protection. Peace of mind."
        primary={{ label: 'Choose Your Plan', href: '#plans', cta: 'pricing-hero' }}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="home-page-5.webp"
      />

      <section className="panel sec sec--page plans-wrap" id="plans" data-section="plans">
        <div className="sec__center">
          <Eyebrow>Plans</Eyebrow>
          <SplitWords className="h2" text="Simple plans. Powerful protection." />
        </div>
        <PricingPlans plans={PLANS} />
      </section>

      <section className="panel sec after" data-section="after-purchase">
        <div className="sec__center">
          <SplitWords className="h2" text="What Happens After You Choose a Plan" />
        </div>
        <ol className="after__steps" data-stagger>
          {AFTER.map((s, i) => <li key={s}><em>{String(i + 1).padStart(2, '0')}</em>{s}</li>)}
        </ol>
        <div className="after__stores" data-reveal>
          <p>Download the My Guardian Link app</p>
          <a href={APP_STORE} className="store" target="_blank" rel="noopener" data-cta="pricing-app-store"><small>Download on the</small>App Store</a>
          <a href={GOOGLE_PLAY} className="store" target="_blank" rel="noopener" data-cta="pricing-google-play"><small>Get it on</small>Google Play</a>
        </div>
      </section>

      <section className="panel sec sec--page" data-section="included">
        <div className="sec__center">
          <SplitWords className="h2" text="What's included today — and what's coming" />
          <p className="lead" data-reveal>Urgent Assist and See Something Say Something are included on the Single and Group plans. Trusted Contact Assist is included on every plan.</p>
        </div>
        <div className="incl" data-stagger>
          {INCLUDED.map((p) => (
            <article className="card card--dark" key={p.name}>
              <span className={`card__tag card__tag--${p.status === 'live' ? 'live' : 'future'}`}>{STATUS_LABEL[p.status]}</span>
              <h3>{p.name}</h3>
              {p.desc && <p>{p.desc}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="panel sec sec--panel refund" data-section="refund">
        <div className="sec__center" style={{ marginBottom: 0 }}>
          <SplitWords className="h2" text="30-Day Refund Policy · Cancel Anytime · No Long-Term Commitment" />
          <p className="lead lead--light" data-reveal>Cancel within the first 30 days of your first paid membership to request a refund. Your membership remains active through the end of your paid billing term after cancellation. Free Plan does not include Urgent Assist or live response coordination.</p>
        </div>
      </section>

      <section className="panel sec sec--page org-band" data-section="organization">
        <SplitWords className="h2" text="Protect My Organization" />
        <p className="lead" data-reveal>For families, schools, teams, employers, and organizations that want to protect groups of people.</p>
        <div className="btn-row btn-row--center" data-reveal>
          <button type="button" className="btn btn--ghost" data-open="org" data-cta="pricing-org">Learn about organization plans</button>
        </div>
      </section>
    </>
  );
}
