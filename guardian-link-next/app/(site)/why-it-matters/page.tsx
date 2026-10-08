import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, NextStep, Eyebrow, JsonLd } from '@/components/primitives';
import { pageMetadata, pageSchema, DISCLAIMER_911, DISCLAIMER_RESPONSE } from '@/lib/meta';

export const metadata = pageMetadata('why-it-matters');

export default function WhyItMatters() {
  return (
    <>
      <JsonLd data={pageSchema('why-it-matters')} />
      <PageHero
        eyebrow="Why It Matters"
        lines={['911 Is Essential.', 'But Sometimes You Cannot Call, Speak, or Explain Fast Enough.']}
        scale="md"
        footnote={DISCLAIMER_911}
        sub="My Guardian Link supports anxious moments when calling 911 is difficult, unsafe, delayed, or confusing. It will send your precise location, alert your trusted contacts, and connect you immediately to a live response coordinator when every second counts."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="8.webp"
      />

      <section className="panel sec sec--page" data-section="compare">
        <div className="compare">
          <div data-reveal>
            <p className="eyebrow">The problem</p>
            <h3>Why 911 Alone May Not Be Enough</h3>
            <ul className="xlist">
              <li>You may not be able to speak safely.</li>
              <li>You may be panicked, injured, or confused.</li>
              <li>You may not know your precise location.</li>
              <li>Calling may increase the danger.</li>
            </ul>
          </div>
          <div data-reveal style={{ ['--d' as string]: '.1s' }}>
            <p className="eyebrow">The answer</p>
            <h3>How My Guardian Link Helps</h3>
            <ul className="clist">
              <li>Silent or limited-action activation.</li>
              <li>Precise GPS location shared with trusted contacts, response coordinator, and 911 dispatch.</li>
              <li>Trusted contacts are alerted immediately.</li>
              <li>Response Coordinator relays critical details.</li>
            </ul>
          </div>
        </div>
        <p className="tagline tagline--center" data-reveal>Real-time protection. Trusted connections. Peace of mind.</p>
      </section>

      {/* The Reality */}
      <section className="panel split split--stats" data-section="reality">
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="the-reality.webp" data-parallax-img="" /></div>
        </div>
        <div className="split__body">
          <Eyebrow light>The Reality</Eyebrow>
          <SplitWords className="h2" text="911 Works Best When the Caller Can:" />
          <ol className="biglist biglist--sm" data-stagger>
            {['Speak Clearly', 'Know their location', 'Explain the problem', 'Stay on the line', 'Safely make the call'].map((x, i) => <li key={x}><em>{String(i + 1).padStart(2, '0')}</em>{x}</li>)}
          </ol>
        </div>
      </section>

      <section className="panel sec sec--orange warn" data-section="warn">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/icons/exclamation-triangle-svgrepo-com.svg" alt="" width={64} height={64} className="warn__icon" data-reveal />
        <h3 className="warn__title" data-reveal>In many emergencies that is not possible.</h3>
      </section>

      {/* The Gap */}
      <section className="panel sec sec--black" data-section="gap">
        <div className="gap__head">
          <Eyebrow light>The Gap</Eyebrow>
          <SplitWords className="h2 h2--xl" text="The gap is not 911." />
          <SplitWords as="p" className="statement" text="The gap is what happens before 911 gets clear information." />
          <p className="lead lead--light" data-reveal>My Guardian Link helps close the information gap by moving verified details to the right people fast.</p>
        </div>
        <div className="flow" data-stagger>
          <div className="flow__step">
            <span className="card__n">01</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/icons/exclamation-triangle-svgrepo-com.svg" alt="" width={40} height={40} />
            <h3>Something goes wrong</h3>
          </div>
          <span className="flow__arrow" aria-hidden="true" />
          <div className="flow__step">
            <span className="card__n">02</span>
            <h3>Information is unclear</h3>
            <ul>
              <li><Img src="user-speak.webp" sizes="22px" />Can not speak clearly</li>
              <li><Img src="location-ques.webp" sizes="22px" />Location unknown</li>
              <li><Img src="file-ques.webp" sizes="22px" />Details incomplete</li>
            </ul>
          </div>
          <span className="flow__arrow" aria-hidden="true" />
          <div className="flow__step flow__step--end">
            <span className="card__n" style={{ color: 'var(--navy-deep)' }}>03</span>
            <h3>911 gets clear information</h3>
            <div className="flow__big">911</div>
            <p>Verified details. Faster response.</p>
          </div>
        </div>
        <div className="gap__grid">
          <figure className="gap__img img-reveal" data-reveal-img><Img src="the-gap-section-banner.webp" data-parallax-img="" /></figure>
          <div className="cards cards--stack" data-stagger>
            <article className="card"><h3>Faster clarity</h3><p>Critical details delivered when it matters most.</p></article>
            <article className="card"><h3>Verified location</h3><p>Accurate, shareable location to speed response.</p></article>
            <article className="card"><h3>Real people notified</h3><p>Your trusted contacts and responders alerted fast.</p></article>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="panel split" data-section="positioning">
        <div className="split__body">
          <Eyebrow>Positioning Statement</Eyebrow>
          <SplitWords className="h2" text="Built to Strengthen, Complement and support 911 — not replace it." />
          <p className="lead" data-reveal>My Guardian Link delivers verified information to right people when calling, speaking, or explaning is difficult.</p>
          <p className="tagline" data-reveal>Protect Yourself Before The Call You Cannot Make.</p>
          <div className="pos" data-reveal>
            <h3>{DISCLAIMER_911}</h3>
            <p>Designed for moments when a direct 911 call is difficult, unsafe, delayed, or incomplete. {DISCLAIMER_RESPONSE}</p>
          </div>
          <div className="cards cards--2" data-stagger>
            <article className="card"><h3>Supports 911</h3><p>Coordinators can contact 911 and share verified details.</p></article>
            <article className="card"><h3>Verified details</h3><p>Identity, location, and incident information are verified.</p></article>
            <article className="card"><h3>Trusted contacts</h3><p>The right people are notified instantly with what matters.</p></article>
            <article className="card"><h3>Personal coordinator</h3><p>A trained coordinator reviews and relays critical information.</p></article>
          </div>
          <div className="btn-row" data-reveal>
            <Btn a={{ label: 'Get Protected Now', href: '/pricing/' }} variant="cta" />
            <button type="button" className="ulink" data-open="org">Protect My Organization</button>
          </div>
          <NextStep />
        </div>
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="page3-block5-e1780058629749.webp" data-parallax-img="" /></div>
        </div>
      </section>

      {/* After you activate */}
      <section className="panel sec sec--panel" data-section="after">
        <div className="sec__center">
          <Eyebrow light>Real stories. Real outcomes. Real peace of mind.</Eyebrow>
          <SplitWords className="h2" text="See what happen after you activate." />
        </div>
        <div className="demo">
          <div className="demo__main" data-reveal>
            <button type="button" className="vcard vcard--tall" data-video="/media/video/demo.mp4" aria-label="Play 60-Second Demo">
              <Img src="screenshot-2026-07-18-at-2-17-39-pm.webp" sizes="(max-width: 860px) 100vw, 50vw" />
              <span className="vcard__play" />
              <span className="vcard__cap">60-Second Demo</span>
            </button>
            <h3>60-Second Demo</h3>
            <p>See how My Guardian Link works when every second counts.</p>
          </div>
          <div className="demo__side" data-reveal style={{ ['--d' as string]: '.1s' }}>
            <h3>Real-Life Scenarios</h3>
            <p>Reenactments based on real situations people face.</p>
            <div className="demo__pair">
              <button type="button" className="vcard" data-video="/media/video/real-estate-agent-reality.mp4" aria-label="Play real estate agent scenario">
                <Img src="what-trusted-cordinator-sees-4.webp" sizes="(max-width: 860px) 100vw, 25vw" /><span className="vcard__play" />
              </button>
              <button type="button" className="vcard" data-video="/media/video/nurse-reality.mp4" aria-label="Play nurse scenario">
                <Img src="what-trusted-cordinator-sees-3.webp" sizes="(max-width: 860px) 100vw, 25vw" /><span className="vcard__play" />
              </button>
            </div>
            <button type="button" className="ulink" data-video="/media/video/nurse-reality.mp4">Watch scenario reenactments</button>
          </div>
        </div>
        <div className="sees">
          <div className="sees__item" data-reveal>
            <h3>What the Response Coordinator Sees</h3>
            <p>A live dashboard gives coordinators, precise GPS map, message, and quick buttons to response fast.</p>
            <div className="shot"><Img src="what-trusted-cordinator-sees-1.webp" sizes="(max-width: 860px) 100vw, 60vw" /></div>
          </div>
          <div className="sees__item sees__item--phone" data-reveal style={{ ['--d' as string]: '.1s' }}>
            <h3>What Your Contacts Receive</h3>
            <p>Trusted contacts receive an instant alert with the message, location, and quick action options.</p>
            <div className="phone"><Img src="what-your-account-recieve.webp" sizes="320px" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
