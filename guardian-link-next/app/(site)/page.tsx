import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, NextStep, Eyebrow, JsonLd, TextLink } from '@/components/primitives';
import { SignalLayers } from '@/components/SignalLayers';
import { pageMetadata, pageSchema } from '@/lib/meta';
import { CtaPanel, AudienceGrid, HOME_AUDIENCES } from '@/components/Sections';
import { getProtected, signupUrl } from '@/lib/funnel';
import { PLANS, FREE_SETUP } from '@/lib/plans';

export const metadata = pageMetadata('home');

/* Homepage order (client conversion review, Oct 2026):
   hero → problem → 4 use cases → one silent signal → 4 features → who it protects → why it's different
   → proof → pricing preview → final CTA. See Something Say Something and Roadside Assistance live on
   /pricing/ ("What's included") and /how-it-works/, not here. */

const USE_CASES: [string, string, string][] = [
  ['2-being-followed-photo.webp', 'Personal Protection', 'Being followed, harassed, or feeling unsafe.'],
  ['3-medical-distress.webp', 'Medical Distress', 'When you cannot explain what is happening.'],
  ['4-college-threat.webp', 'Student Reality', 'On campus, off campus, and on the way home.'],
  ['6-runner-in-danger.webp', 'Runners & Lone Workers', 'Out alone, early, late, or far from help.'],
];

const FEATURES: [string, string, string, string?][] = [
  ['Silent Activation', 'Discreet and fast when it matters most.', '2-being-followed-photo.webp'],
  ['Trusted Contacts Alerted', 'Instant alerts sent to the people you trust most.', '8.webp'],
  ['Trained Response Coordinator', 'A real response coordinator reviews and acts when needed.', 'support-banner-mgl-1.webp'],
  ['Documented Incident Details', 'Every signal is recorded for clarity and peace of mind.', 'coordinator-incident-dashboard.webp', 'Coordinator reviewing an incident record with identity, live location, message thread and a timestamped event log'],
];

/* [video, poster, title, text, data-cta] */
const PROOF_VIDEOS: [string, string, string, string, string][] = [
  ['demo.mp4', 'screenshot-2026-07-18-at-2-17-39-pm.webp', 'Watch the Demo', 'See how My Guardian Link works when every second counts.', 'proof-demo'],
  ['babysitter-reality.mp4', 'video-poster-babysitter.webp', 'Babysitter Reality', 'Alone with three young children when something changes. See how a whisper connects her to a response coordinator.', 'proof-babysitter'],
  ['nurse-reality.mp4', 'video-poster-nurse.webp', 'Nurse Reality', 'Leaving a night shift and being followed. See how her whisper becomes her name, exact location and help on the way.', 'proof-nurse'],
];

const DIFFERENT = ['Silent urgent signal', 'Verified identity', 'GPS location', 'Trusted contacts', 'Trained response coordinator who can contact 911 when needed'];

export default function Home() {
  return (
    <>
      <JsonLd data={pageSchema('home')} />

      {/* 1 · Hero */}
      <PageHero
        size="full"
        hideNextStep
        kicker="Your Personal Protection Link"
        lines={['When Danger Finds You,', 'So Do We!']}
        footnote="Strengthens, Complements & Supports 911 — Does Not Replace 911."
        sub="Activate an urgent alert, share your live location, notify trusted contacts, and connect with a trained response coordinator in seconds."
        primary={getProtected('hero')}
        link={{ label: 'See How It Works', video: '/media/video/demo.mp4', cta: 'hero-demo' }}
        image="chatgpt-image-may-22-2026-06-26-52-pm.webp"
        video="/media/video/walking-alone.mp4"
      >
        <p className="hero__sub">When voice fails, My Guardian Link turns confusion into verified action.</p>
      </PageHero>

      {/* 2 · Problem */}
      <section className="panel split split--stats split--compact" id="voice" data-section="voice">
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="home-banner-2-e1783070253640.webp" data-parallax-img="" /></div>
        </div>
        <div className="split__body split__body--statement">
          <Eyebrow light>911 was built for voice calls.</Eyebrow>
          <SplitWords className="statement" text="Real emergencies are often silent, chaotic, fast-moving, or unsafe to explain." />
          <ul className="ticks" data-reveal>
            <li>You may not be able to speak.</li>
            <li>You may not know exactly where you are.</li>
            <li>Calling may escalate the danger.</li>
            <li>Your trusted people need to know quickly.</li>
          </ul>
          <p className="split__more" data-reveal><TextLink a={{ label: 'Why 911 alone may not be enough', href: '/why-it-matters/', cta: 'home-why' }} /></p>
        </div>
      </section>

      {/* 3 · Use cases — four static cards (replaces the pinned horizontal gallery and its dead space) */}
      <section className="panel cases" data-section="situations">
        <div className="cases__head">
          <SplitWords className="h2" text="When calling is difficult, My Guardian Link helps keep you connected." />
          <p className="lead lead--light" data-reveal>My Guardian Link delivers silent protection, precise location, and real people who can act.</p>
        </div>
        <div className="cases__grid" data-stagger>
          {USE_CASES.map(([img, title, line]) => (
            <figure className="case" key={title}>
              <Img src={img} sizes="(max-width: 860px) 50vw, 25vw" />
              <figcaption><b>{title}</b><span>{line}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 4 · The Solution — one silent urgent signal, five layers */}
      <section className="panel sig" id="solution" data-section="solution">
        <div className="sig__intro">
          <div>
            <Eyebrow>The Solution</Eyebrow>
            <SplitWords className="h2" text="One silent urgent signal." />
          </div>
          <div>
            <p className="lead" data-reveal>One silent urgent signal sends your identity, GPS location, and incident details to your trusted contacts and a trained response coordinator.</p>
            <p className="lead sig__who" data-reveal>Your trusted contacts are people you choose. Your response coordinator is a trained person who reviews the urgent signal and helps move the response forward.</p>
          </div>
        </div>
        <SignalLayers layers={[
          { key: 'identity', title: 'Identity', body: 'Your name and key identification details.', tags: ['Name', 'Photo', 'Key ID details'],
            image: 'solution-identity.webp', frame: 'device', alt: 'My Guardian Link profile screen with photo, name, mobile number, email and personal details' },
          { key: 'location', title: 'GPS Location', body: 'Real-time location at the moment of the signal.', tags: ['Real-time location', 'At the moment of the signal'],
            image: 'signal-city-night.webp', frame: 'cover', position: '40% 60%', alt: 'Empty city street at night',
            inset: { image: 'solution-gps-location.webp', alt: 'My Guardian Link live map with the user’s location pin, coordinates and street address' } },
          { key: 'incident', title: 'Incident Details', body: 'Type of emergency, time, and any details you provide.', tags: ['Type of emergency', 'Time', 'Your details'],
            image: 'incident-details.webp', frame: 'cover', position: '72% 50%', alt: 'Response coordinator reviewing an active urgent assist — the user’s message “Someone is following me”, notes, live map, medical details and time-stamped events' },
          { key: 'contacts', title: 'Trusted Contacts', body: 'The people you choose receive instant alerts.', tags: ['People you choose', 'Instant alerts'],
            image: 'solution-trusted-contacts.webp', frame: 'card', alt: 'My Guardian Link Add trusted contact screen with three connected trusted contacts' },
          { key: 'coordinator', title: 'Response Coordinator', body: 'A trained response coordinator reviews your signal and can contact 911 when needed.', tags: ['Reviews your signal', 'Can contact 911 when needed'],
            image: 'support-banner-mgl-1.webp', frame: 'card', alt: 'Trained My Guardian Link response coordinator wearing a headset' },
        ]} />
      </section>

      {/* 5 · Four features — one compact row that supports the signal section */}
      <section className="panel feats" data-section="features">
        <div className="feats__grid" data-stagger>
          {FEATURES.map(([t, d, img, alt]) => (
            <article className="feat" key={t}>
              <figure><Img src={img} alt={alt ?? ''} sizes="(max-width: 860px) 50vw, 25vw" /></figure>
              <div><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
        <div className="feats__cta" data-reveal>
          <Btn a={getProtected('features')} variant="cta" />
          <NextStep className="next-step--center" />
        </div>
      </section>

      {/* 6 · Who it protects — six most likely converters; the full list is on /who-it-protects/ */}
      <section className="panel who" id="who-it-protects" data-section="who">
        <div className="who__head">
          <Eyebrow light>Who It Protects</Eyebrow>
          <div><SplitWords className="h2" text="Protection for the people most likely to need help when calling 911 is difficult, delayed, or impossible." /></div>
        </div>
        <AudienceGrid items={HOME_AUDIENCES} six />
        <div className="who__foot" data-reveal>
          <p>From every day uneasiness to urgent danger, protection should move with you.</p>
          <Btn a={{ label: 'See Who It Protects', href: '/who-it-protects/', cta: 'home-who' }} variant="ghost" arrow />
        </div>
      </section>

      {/* 7 · Why it is different — five differentiators, no feature dump */}
      <section className="panel dark diff2" id="different" data-section="different">
        <div className="diff2__grid">
          <SplitWords className="h2 h2--xl" text="Not another panic button. Not just location sharing. Not just a call app." />
          <div>
            <ul className="diff-list diff-list--one" data-stagger>
              {DIFFERENT.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p className="diff2__note" data-reveal>Built to support faster, more coordinated response when every second matters.</p>
          </div>
        </div>
      </section>

      {/* 8 · Proof — three videos (client, Oct 2026: the coordinator view is already shown above and the
          contact view used the wrong template). Real assets only.
          To add later (client to supply): a "From the Founder" card (Richard's photo + short mission statement)
          and a "What Users Are Saying" card (real, permissioned quotes only — never invented). */}
      <section className="panel sec sec--panel proof" id="proof" data-section="proof">
        <div className="sec__center">
          <SplitWords className="h2" text="See What Happens After You Activate Help" />
        </div>
        <div className="proof__grid">
          {PROOF_VIDEOS.map(([video, poster, title, text, cta], i) => (
            <article className="proof__card" data-reveal key={video} style={i ? { ['--d' as string]: `${i / 10}s` } : undefined}>
              <button type="button" className="vcard" data-video={`/media/video/${video}`} data-cta={cta} aria-label={`Play: ${title}`}>
                <Img src={poster} sizes="(max-width: 860px) 100vw, 33vw" />
                <span className="vcard__play" />
              </button>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 9 · Pricing preview */}
      <section className="panel sec sec--page pp" id="plans-preview" data-section="pricing-preview">
        <div className="sec__center">
          <SplitWords className="h2" text="Simple plans. Powerful protection." />
          <p className="lead" data-reveal>Start free with a trusted contact, or choose full protection with Urgent Assist.</p>
        </div>
        <div className="pp__grid" data-stagger>
          {PLANS.map((p) => {
            const free = p.id === 'free';
            return (
              <article key={p.id} className={`pp__card${p.featured ? ' pp__card--featured' : ''}`}>
                {p.tag && <span className="plan__tag">{p.tag}</span>}
                <h3>{p.name}</h3>
                <p>{p.preview}</p>
                <p className="pp__price">{p.annualMo}<small>/month</small></p>
                <p className="pp__bill">{free ? FREE_SETUP : <>Billed annually at {p.annualTotal} · or {p.monthly}/month billed monthly</>}</p>
                <a href={signupUrl()} data-cta={`home-plan-${p.id}`} data-plan={p.id} data-billing={free ? undefined : 'annual'}
                  className={`btn ${p.featured ? 'btn--cta' : 'btn--ghost'}`}>{p.cta}</a>
              </article>
            );
          })}
        </div>
        <div className="pp__foot" data-reveal>
          <NextStep className="next-step--center" />
        </div>
        <div className="pp__refund" data-reveal>
          <div>
            <h3>30-Day Refund Policy · Cancel Anytime · No Long-Term Commitment</h3>
            <p>Cancel within the first 30 days of your first paid membership to request a refund. After 30 days, your membership remains active through the end of your paid billing term.</p>
            <p className="pp__refund-note">Free Plan does not include Urgent Assist or live response coordination.</p>
          </div>
          <button type="button" className="btn btn--cta" data-open="org" data-cta="home-org">Protect My Organization</button>
        </div>
      </section>

      {/* 10 · Final CTA */}
      <CtaPanel
        title="Set up protection before you need it."
        text="Create your account, choose your plan, add trusted contacts, download the app, and activate protection in minutes."
        image={null}
        reassure="Start free · Paid plans from $9.99/month, billed annually · 30-day refund policy · Cancel anytime"
      />
    </>
  );
}
