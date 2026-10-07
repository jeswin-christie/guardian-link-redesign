import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, Eyebrow, JsonLd } from '@/components/primitives';
import { AutoAccordion } from '@/components/Interactive';
import { pageMetadata, pageSchema, DISCLAIMER, DISCLAIMER_911 } from '@/lib/meta';
import { CtaPanel, AUDIENCES } from '@/components/Sections';

export const metadata = pageMetadata('home');

const SITUATIONS: [string, string][] = [
  ['2-being-followed-photo.webp', 'Being Followed'],
  ['3-medical-distress.webp', 'Medical Distress'],
  ['4-college-threat.webp', 'College threat / College student protection.'],
  ['6-runner-in-danger.webp', 'Runner In Danger'],
  ['7-dementia.webp', 'Dementia-Related Confusion'],
  ['9-military-ptsd.webp', 'Military Veteran – PTSD'],
  ['10-baby-sitter-protection.webp', 'Babysitter Protection'],
  ['12-personal-attack.webp', 'Personal Attack'],
  ['13-anxious-moments.webp', 'Anxious Moments'],
];


export default function Home() {
  return (
    <>
      <JsonLd data={pageSchema('home')} />

      <PageHero
        size="full"
        lines={['When danger finds you,', 'So Do We!']}
        footnote={DISCLAIMER_911}
        sub="Activate an urgent alert, share your live location, notify trusted contacts, and connect with a live response coordinator in seconds."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'See How it Works', video: '/media/video/walking-alone.mp4' }}
        image="chatgpt-image-may-22-2026-06-26-52-pm.webp"
        video="/media/video/walking-alone.mp4"
      >
        <p className="hero__note">When voice fails, My Guardian Link turns confusion into verified action.</p>
      </PageHero>

      {/* 911 was built for voice calls */}
      <section className="panel split split--stats" id="voice" data-section="voice">
        <div className="split__media split__media--stats">
          <div className="img-reveal" data-reveal-img>
            <Img src="home-banner-2-e1783070253640.webp" data-parallax-img="" />
          </div>
          <ul className="stairs">
            <li className="stairs__item" style={{ ['--i' as string]: 0 }}><b data-num="5800" data-prefix="~" data-format="comma">~5,800</b><span>PSAPs via central-station access</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 1 }}><b>U.S.</b><span>Live U.S-Based Response Support</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 2 }}><b>Silent</b><span>Urgent signal</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 3 }}><b>911</b><span>Escalation support</span></li>
          </ul>
        </div>
        <div className="split__body split__body--statement">
          <Eyebrow light>911 was built for voice calls.</Eyebrow>
          <SplitWords className="statement" text="Real emergencies are often silent, chaotic, fast-moving, or unsafe to explain." />
          <ul className="ticks" data-reveal>
            <li>You can’t always speak.</li>
            <li>You may not know where you are.</li>
            <li>You may not know what to say.</li>
            <li>Every second matters.</li>
          </ul>
          <p className="lead" data-reveal>Emergencies don’t follow a script. You deserve a way to get help—no matter the situation.</p>
        </div>
      </section>

      {/* Situations — horizontal pinned gallery */}
      <section className="panel hscroll" data-hscroll-section data-section="situations">
        <div className="hscroll__sticky">
          <div className="hscroll__head">
            <p className="eyebrow eyebrow--light">Emergencies don’t follow a script.</p>
            <h2 className="h2">You can&apos;t always call. But you can always be connected.</h2>
            <p className="lead lead--light">My Guardian Link delivers silent protection, precise location, and real people who can act—fast.</p>
          </div>
          <div className="hscroll__track" data-hscroll>
            {SITUATIONS.map(([img, label], i) => (
              <figure className="sit" key={img}>
                <Img src={img} sizes="400px" />
                <figcaption><em>{String(i + 1).padStart(2, '0')}</em>{label}</figcaption>
              </figure>
            ))}
            <div className="sit sit--end">
              <ul className="ticks ticks--green">
                <li>Live U.S-Based Response Support</li>
                <li>Trusted Contact Assist Alerted Immediately</li>
                <li>Verified Location and Details Shared</li>
                <li>Central-Station Access to Approximately 5,800 PSAPs</li>
              </ul>
              <Btn a={{ label: 'Be Ready. Be Protected. Before you need it.', href: '/pricing/' }} arrow />
              <small>{DISCLAIMER}</small>
            </div>
          </div>
          <div className="hscroll__progress"><i data-hscroll-bar /></div>
        </div>
      </section>

      {/* The Solution */}
      <section className="panel accsec" id="solution" data-section="solution">
        <div className="accsec__head">
          <Eyebrow>The Solution</Eyebrow>
          <SplitWords className="h2" text="One silent urgent signal." />
          <p className="lead" data-reveal>One silent urgent signal sends your identity, GPS location, and incident details to your trusted contacts and a trained personal coordinator.</p>
        </div>
        <AutoAccordion items={[
          { title: 'Identity', body: <p>Your name and key identification details.</p>, image: 'untitled-09-july-2026-at-11-38-19-1.webp', alt: 'My Guardian Link app — Arm My Guardian Link screen' },
          { title: 'GPS Location', body: <p>Real-time location at the moment of the signal.</p>, image: 'chatgpt-image-may-25-2026-03-00-28-pm-e1779701764908.webp' },
          { title: 'Incident Details', body: <p>Type of emergency, time, and any details you provide.</p>, image: 'what-trusted-cordinator-sees-1.webp' },
          { title: 'Trusted Contacts', body: <p>The people you choose receive instant alerts.</p>, image: 'page3-block5-2-e1780066345642.webp' },
          { title: 'Personal Coordinator', body: <p>A trained response coordinator reviews your signal, and can escalate to 911 immediately.</p>, image: 'support-banner-mgl-1.webp' },
        ]} />
      </section>

      {/* Four features — kinetic type */}
      <section className="panel dark dark--tight" data-section="features">
        {[
          ['Silent Activation.', 'Discreet and fast when it matters most.', 'Silent', '2-being-followed-photo.webp'],
          ['Trusted Contacts Alerted.', 'Instant alerts sent to the people you trust most.', 'Trusted', '8.webp'],
          ['Trained Personal Coordinator.', 'A real response coordinator reviews and acts when needed.', 'Coordinator', 'home-banner-2-e1783070253640.webp'],
          ['Documented Incident Details.', 'Every signal is recorded for clarity and peace of mind.', 'Documented', 'homw-block-3-highshield-e1779616387559.webp'],
        ].map(([t, d, , img]) => (
          <article className="kin" key={t}>
            <div className="kin__text" data-reveal><h3>{t}</h3><p>{d}</p></div>
            <figure className="kin__img img-reveal" data-reveal-img><Img src={img} data-parallax-img="" /></figure>
          </article>
        ))}
      </section>

      {/* See Something Say Something */}
      <section className="panel band band--compact band--sss" id="see-something-say-something" data-section="see-something">
        <div className="band__head">
          <div>
            <Eyebrow light>See Something Say Something</Eyebrow>
            <SplitWords className="h2" text="You see it. Report It We Help Coordinate the response" />
          </div>
          <div>
            <p className="lead lead--light" data-reveal>Report suspicious activity or an urgent concern. My Guardian Link shares the information with the appropriate people so action can begin sooner.</p>
          </div>
        </div>
        <div className="bubbles bubbles--cards">
          <div className="bubble bubble--pill" data-bubble>
            <h4>What to report</h4>
            <ul className="report-list">
              {['Drugs or laws violation', 'Threats or act of violence', 'Nuisance or act of alarm', 'Abandoned cars', 'Vandalism or theft', 'Suspicious vehicles or people', 'Anything that doesn’t feel right'].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          {[
            ['See', 'Notice suspicious activity or an urgent concern.'],
            ['Report', 'Send information quickly and anonymously.'],
            ['We Coordinate', 'We share details with the right people to help start the response.'],
            ['Stronger Communities', 'Working together to keep our neighborhoods safer.'],
          ].map(([t, d], i) => (
            <div className="bubble bubble--round" data-bubble key={t}><span className="bubble__n">0{i + 1}</span><h4>{t}</h4><p>{d}</p></div>
          ))}
          <div className="bubble bubble--pill bubble--wide" data-bubble>
            <Img src="shield-lock.webp" sizes="64px" />
            <div>
              <h4>Every report is taken seriously and handled with care.</h4>
              <p>Your identity is protected. Reports are confidential and never shared publicly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadside */}
      <section className="panel split split--road" id="roadside-assistance" data-section="roadside">
        <div className="split__body">
          <Eyebrow>Roadside assistance</Eyebrow>
          <SplitWords className="h2" text="Help when You Need It most." />
          <p className="lead" data-reveal>Fast, reliable roadside assistance, 24/7. Wherever you are, we are just one tap away.</p>
          <h4 className="mini-title" data-reveal>service we provide</h4>
          <ul className="chips" data-stagger>
            {['Towing', 'Battery Jump Start', 'Flat Tire Assistance', 'Lockout Service', 'Fuel Delivery', 'Winching', 'Accident Assistance', 'Add More'].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <span className="btn btn--soon" data-reveal>Coming Soon</span>
        </div>
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="roadside-assistance.webp" data-parallax-img="" /></div>
        </div>
      </section>

      {/* Who it protects */}
      <section className="panel who" id="who-it-protects" data-section="who">
        <div className="who__head">
          <Eyebrow light>Who It Protects</Eyebrow>
          <div><SplitWords className="h2" text="Protection for the people most likely to need help when calling 911 is difficult, delayed, or impossible." /></div>
        </div>
        <div className="who__grid" data-stagger>
          {AUDIENCES.map(([img, label, href]) => (
            <figure className={href ? 'aud aud--link' : 'aud'} key={img}>
              <Img src={img} sizes="(max-width: 860px) 50vw, 25vw" />
              <figcaption>{label}</figcaption>
              {/* Plain <a>: /students/ and /runners/ have their own root layouts, so it's a full page load anyway */}
              {href && <a className="aud__link" href={href} aria-label={label} />}
            </figure>
          ))}
        </div>
        <div className="who__foot" data-reveal>
          <p>From every day uneasiness to urgent danger, protection should move with you.</p>
          <Btn a={{ label: 'See Who It Protects', video: '/media/video/college-campus-reality.mp4' }} variant="orange" play />
        </div>
      </section>

      {/* Why it is different */}
      <section className="panel dark" id="different" data-section="different">
        <div className="dark__intro">
          <Eyebrow light>Why It Is Different</Eyebrow>
          <div>
            <SplitWords className="h2 h2--xl" text="Not another panic button. Not just location sharing. Not just a call app." />
          </div>
        </div>
        <div className="diff-wrap">
          <figure className="diff-img img-reveal" data-reveal-img><Img src="chatgpt-image-may-25-2026-03-00-28-pm-e1779701764908.webp" data-parallax-img="" sizes="100vw" /></figure>
        </div>
        <div className="diff-grid">
          <ul className="diff-list" data-stagger>
            {['Silent urgent signal', 'Verified identity', 'Precise GPS location', 'Incident details', 'Trusted contact', 'Personal coordinator', '911 escalation support', 'Time-stamped incident record', 'Real defence record'].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div className="diff-cta" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/icons/shield-check-svgrepo-com-2.svg" alt="" width={56} height={56} />
            <p>Built to support faster, more coordinated response when every second matters.</p>
            <Btn a={{ label: "See Why It's Different", video: '/media/video/runners-reality.mp4' }} variant="orange" play />
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
