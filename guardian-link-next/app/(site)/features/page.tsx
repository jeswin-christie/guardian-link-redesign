import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { pageMetadata, pageSchema, DISCLAIMER_911, DISCLAIMER_RESPONSE, APP_STORE, GOOGLE_PLAY } from '@/lib/meta';
import { getProtected } from '@/lib/funnel';
import { AudioLines, Hand, Headphones, MessageSquareText, Mic, ShieldCheck, Sparkles, Speech, Watch, type LucideIcon } from 'lucide-react';

export const metadata = pageMetadata('features');

/* Activation methods — icon layout after the client's reference (runners update PDF, Oct 2026). Status labels match lib/status.ts ACTIVATION. */
const METHODS: [LucideIcon, string, string?][] = [
  [Hand, 'One-Touch', 'Instant'],
  [MessageSquareText, 'Speech-to-Text'],
  [AudioLines, 'Whisper-to-Text'],
  [Speech, 'Hands-Free Voice'],
  [Mic, '“Hey Siri”', 'Available'],
  [Sparkles, '“Hey Google”', 'Coming Soon'],
  [Watch, 'Smart Watch', 'Ready'],
  [Headphones, 'Earbuds', 'Ready'],
];

/* Guided response rows. `list` items are plain strings or [label, text] pairs (label in bold).
   Trusted Contact and 911 copy is the client's (runners update PDF, Oct 2026). */
type Guided = { t: string; lead?: string; d: string; extra?: string; list: (string | [string, string])[]; close?: string; img: string; phone?: boolean; alt?: string };
const GUIDED: Guided[] = [
  { t: 'Trained Response Coordinator', d: 'Reviews your alert, location, and message, communicates with you, and helps coordinate next steps.', extra: 'Coordinator availability: 24/7/365', list: ['Reviews your information', 'Communicates with you', 'Takes next steps'], img: 'support-banner-mgl-1.webp' },
  {
    t: 'Trusted Contact', lead: 'When trouble starts, seconds matter.', d: 'Your Trusted Contact receives an immediate Urgent Assist alert with:',
    list: [['WHO', 'Your name and identity.'], ['WHERE', 'Your precise GPS location on a map.'], ['WHAT', 'Your message explaining the situation.'], ['CALL', 'One tap to contact you directly.'], ['DIRECTIONS', 'One tap for turn-by-turn navigation to your location.']],
    close: 'The right people. The right information. Right when it matters.',
    img: 'trusted-contact-alert.webp', phone: true,
    alt: 'Urgent Assist Trusted Contact alert in the My Guardian Link app: map location, sender name, Call and Directions buttons, and the message “Someone is following me and I don’t feel comfortable.”',
  },
  {
    t: '911 Escalation. Coordinated Response.', lead: 'When every second counts, immediate action matters.', d: 'Your Urgent Response Coordinator will escalate a serious threat directly to 911.',
    list: [['911 NOTIFIED', 'Emergency services contacted when needed.'], ['CRITICAL DETAILS', 'Your identity, location, and incident information shared.'], ['STAY CONNECTED', 'Your coordinator remains involved to support the response.']],
    close: 'One Signal. Coordinated Action. Response When It Matters Most.',
    img: 'home-banner-2-e1783070253640.webp',
  },
];

export default function Features() {
  return (
    <>
      <JsonLd data={pageSchema('features')} />
      <PageHero
        eyebrow="Activate Your Protection"
        lines={['Activate with Confidence.', 'Stay in Control.']}
        scale="lg"
        sub="Start protection in the way that feels right for you-quietly, quickly and from anywhere."
        primary={getProtected('hero')}
        link={{ label: 'See What Gets Shared', href: '#shared' }}
        image="feature-home-banner.webp"
      />

      {/* Activation methods */}
      <section className="panel act" id="devices" data-section="devices">
        <div className="act__head">
          <Eyebrow light>Activate Your Protection</Eyebrow>
          <SplitWords className="h2" text="Start protection the way that feels right for you." />
          <p className="lead lead--light" data-reveal>Quietly, quickly, and from anywhere.</p>
        </div>
        <ul className="act__grid" data-stagger>
          {METHODS.map(([Icon, name, status]) => (
            <li key={name}>
              <Icon aria-hidden="true" className="act__icon" strokeWidth={1.6} />
              <b>{name}</b>
              {status && <span className={status === 'Coming Soon' ? 'act__soon' : undefined}>{status}</span>}
            </li>
          ))}
        </ul>
        <div className="act__foot" data-reveal>
          <p className="act__silent"><ShieldCheck aria-hidden="true" strokeWidth={1.6} />Silent activation is available when speaking or drawing attention is unsafe.</p>
          <div className="footer__stores">
            <a href={APP_STORE} className="store" target="_blank" rel="noopener" data-cta="features-app-store"><small>Download on the</small>App Store</a>
            <a href={GOOGLE_PLAY} className="store" target="_blank" rel="noopener" data-cta="features-google-play"><small>Get it on</small>Google Play</a>
          </div>
        </div>
      </section>

      {/* What gets shared */}
      <section className="panel split" id="shared" data-section="shared">
        {/* Gold, smaller and subtler than the old green shield (client, runners update PDF, Oct 2026) */}
        <div className="split__media split__media--emblem">
          <div className="emblem" data-reveal><Img src="shield-gold.webp" alt="" sizes="300px" /></div>
        </div>
        <div className="split__body">
          <Eyebrow>What Gets Shared</Eyebrow>
          <SplitWords className="h2" text="Your Information. Shared Securely." />
          <p className="lead" data-reveal>We shared only what’s needed-instantly-so the right people can respond with confidence.</p>
          <div className="shared" data-reveal>
            <h3>Automatically sent</h3>
            <p>As soon as you activated.</p>
            <ul className="shared__list" data-stagger>
              <li><b>Name</b></li>
              <li><b>Phone Number</b></li>
              <li><b>GPS Location</b><span>Precise &amp; real-time.</span></li>
              <li><b>Incident Type / details</b></li>
              <li><b>Time Stamp</b></li>
            </ul>
          </div>
          <div className="cards" data-stagger style={{ marginTop: 26 }}>
            <article className="card"><h3>Secure. Encrypted. Private.</h3><p>Your data is encrypted and never sold.</p></article>
            <article className="card"><h3>Optional and voluntary</h3><p>You can choose to share additional information.</p></article>
          </div>
          <p className="statement statement--sm" data-reveal>The right information. To the right people . At the right time.</p>
          <p className="tagline" data-reveal>Your Privacy, Our Promise</p>
        </div>
      </section>

      {/* Guided response */}
      <section className="panel dark" data-section="guided">
        <div className="dark__intro">
          <Eyebrow light>Guided Response</Eyebrow>
          <div>
            <SplitWords className="h2 h2--xl" text="Coordinated Support. Stronger Outcomes." />
            <p className="lead lead--light" data-reveal>Once activated, your response is managed by professionals and the people you trust.</p>
          </div>
        </div>
        {GUIDED.map((g) => (
          <article className="kin" key={g.t}>
            <div className="kin__text" data-reveal>
              <h3>{g.t}</h3>
              {g.lead && <p className="kin__lead">{g.lead}</p>}
              <p>{g.d}</p>
              {g.extra && <p className="kin__extra">{g.extra}</p>}
              <ul className="clist">
                {g.list.map((x) => typeof x === 'string'
                  ? <li key={x}>{x}</li>
                  : <li key={x[0]}><b>{x[0]}</b> — {x[1]}</li>)}
              </ul>
              {g.close && <p className="kin__close">{g.close}</p>}
            </div>
            {g.phone
              ? <figure className="kin__img kin__img--phone" data-reveal><Img src={g.img} alt={g.alt ?? ''} sizes="(max-width: 860px) 70vw, 320px" /></figure>
              : <figure className="kin__img img-reveal" data-reveal-img><Img src={g.img} alt={g.alt ?? ''} data-parallax-img="" /></figure>}
          </article>
        ))}
        <div className="sec__center" style={{ marginTop: 'clamp(60px,10vh,120px)', marginBottom: 0, padding: '0 var(--pad)' }}>
          <SplitWords className="h2" text="Protection for anxious moments and urgent response." />
          <p className="lead lead--light" data-reveal>Real support. Real people. Real peace of mind.</p>
          <div className="btn-row btn-row--center" data-reveal><Btn a={getProtected('guided-response')} variant="cta" /></div>
          <NextStep className="next-step--center" />
        </div>
      </section>

      {/* disclaimers strip */}
      <section className="panel sec sec--page notes3" data-section="notes">
        <ul data-stagger>
          <li>{DISCLAIMER_911}</li>
          <li>{DISCLAIMER_RESPONSE}</li>
          <li>Your information is encrypted and never sold.</li>
        </ul>
      </section>

      {/* Coverage */}
      <section className="panel sec sec--panel" id="coverage-map" data-section="coverage">
        <div className="sec__head">
          <Eyebrow light>Coverage and Connectivity</Eyebrow>
          <SplitWords className="h2" text="Coverage and Connectivity" />
          <p className="lead lead--light" data-reveal>Clear answer to help you stay confident and connected.</p>
        </div>
        <div className="coverage">
          <div className="coverage__qa" data-reveal>
            <h3>Does My Guardian Link work everywhere?</h3>
            <p><b>Make sure you are covered.</b> My Guardian Link works on active cellular data connections or Wi-Fi. For the most reliable performance, use My Guardian Link in areas with strong cellular or Wi-Fi coverage.</p>
            <ul className="clist">
              <li>Works on cellular data and Wi-Fi</li>
              <li>Best performance in areas with strong coverage</li>
              <li>{DISCLAIMER_911}</li>
            </ul>
            <div className="stat stat--inline">
              <b data-num="5800" data-format="comma">5,800</b>
              <span>My Guardian Link connects through a central-station emergency response system capable of reaching approximately 5800 U.S. PSAPs / 911 centers.</span>
            </div>
            <div className="btn-row"><Btn a={getProtected('coverage')} variant="cta" /></div>
            <NextStep />
          </div>
          <figure className="coverage__map" data-reveal>
            <figcaption>5G Coverage Map</figcaption>
            <Img src="map-image.webp" alt="5G coverage map of the United States, Canada and Mexico" sizes="(max-width: 860px) 100vw, 55vw" />
          </figure>
        </div>
      </section>
    </>
  );
}
