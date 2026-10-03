import PageHero from '@/components/PageHero';
import { Img, SplitWords, Giant, Eyebrow, JsonLd } from '@/components/primitives';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('about-us');

const PILLARS: [string, string][] = [
  ['Prevention', 'Helping people recognize and avoid potential danger.'],
  ['Protection', 'Tools and support that put help at your fingertips.'],
  ['Response', '24/7 live response coordinators ready to act.'],
  ['Intelligence', 'Verified information shared with the right people.'],
];
const TRUST: [string, string][] = [
  ['24/7/365 Live Response Coordinators', 'U.S.-based professionals trained in emergency response, crisis communication, and 911 escalation. Real people—always.'],
  ['Central-Station Partnership', 'Connected through a leading U.S. central station with access to approximately 5,800 PSAPs across the country.'],
  ['Security & Privacy First', 'Your information is encrypted, never sold, and used only to protect and respond. We take your trust seriously.'],
  ['Built on Experience', 'Founded by leaders with deep experience in technology, emergency response, and protecting communities.'],
];
const PARTNERS: [string, string, string][] = [
  ['quick-response-logo-removebg-preview-e1784124073391.webp', 'Quick Response', 'Central-station partner with access to approximately 5,800 PSAPs.'],
  ['aws-logo1.webp', 'AWS', 'Secure, reliable cloud infrastructure.'],
  ['twilio-scaled-e1784124116381.webp', 'Twilio', 'Enterprise-grade communication and alert delivery.'],
  ['telecoming-logo-removebg-preview-e1784124392766.webp', 'TelecomInc', 'Reliable, U.S.-Based Contact Center.'],
  ['stripe-logo1-e1784124453926.webp', 'Stripe', 'Secure payment processing.'],
];

export default function About() {
  return (
    <>
      <JsonLd data={pageSchema('about-us')} />
      <PageHero
        eyebrow="Created By Forward Move"
        lines={['About Us']}
        footnote="Protection. Prevention. Response."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'Our Partners', href: '#partners' }}
        image="about-us-banner.webp"
      />

      <section className="panel split" data-section="mission">
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="about-us-banner.webp" data-parallax-img="" /></div>
        </div>
        <div className="split__body">
          <Eyebrow>Our mission</Eyebrow>
          <SplitWords className="statement" text="Our mission is to help prevent violence and protect people during vulnerable and urgent moments by making it easier to recognize threats, communicate quickly, and connect with trusted people and trained response support." />
          <p className="lead" data-reveal><strong>We are especially committed to preventing sexual, gender-based, racial, religious, and other forms of targeted violence.</strong></p>
          <p className="lead" data-reveal>More than an app, My Guardian Link is a lifeline—bridging the gap between awareness and action through seamless collaboration with support teams and law enforcement. Our platform is built on the belief that prevention, protection, and education are essential to building stronger, better communities. Through onboarding training and user education, we equip every member with the tools and knowledge to recognize threats early, act with confidence, and become a proactive force for protection and prevention.</p>
          <p className="addr" data-reveal><b>Forward Move</b><br />2680 Vernon Drive, Green Bay, WI 54302</p>
        </div>
      </section>

      <section className="panel sec sec--black" data-section="who-we-are">
        <div className="sec__head">
          <Eyebrow light>Who We Are</Eyebrow>
          <SplitWords className="h2 h2--xl" text="Real Peaple. Real Experience. real Protection." />
          <div className="lead lead--light" data-reveal>
            <p>My Guardian Link was created by people who understand high-stress situations and the importance of a faster way to get help. Our mission is to empower individuals to recognize threats earlier, report concerns safely, and connect with the right people so action can begin sooner.</p>
            <p style={{ marginTop: 14 }}>We combine advanced technology with trained response professionals and trusted partnerships to deliver reliable support when every second matters.</p>
          </div>
        </div>
        <Giant className="giant--section" word="Prevention · Protection · Response · Intelligence ·" dir={-1} speed={0.4} repeat={3} />
        <div className="cards" data-stagger>
          {PILLARS.map(([t, d], i) => (
            <article className="card card--dark" key={t}><span className="card__n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>

      <section className="panel split split--stats" data-section="trust">
        <div className="split__body">
          <Eyebrow light>Why trust us</Eyebrow>
          <div className="trust" data-stagger>
            {TRUST.map(([t, d]) => (
              <div className="trust__item" key={t}><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
        <div className="split__media">
          <div className="img-reveal" data-reveal-img><Img src="support-banner-mgl-1.webp" data-parallax-img="" /></div>
          <ul className="stairs">
            <li className="stairs__item" style={{ ['--i' as string]: 0 }}><b>24/7</b><span>Live response coordinators</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 1 }}><b>365</b><span>Days a year</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 2 }}><b data-num="5800" data-prefix="~" data-format="comma">~5,800</b><span>PSAPs</span></li>
            <li className="stairs__item" style={{ ['--i' as string]: 3 }}><b>U.S.</b><span>Based professionals</span></li>
          </ul>
        </div>
      </section>

      <section className="panel band" id="partners" data-section="partners">
        <div className="band__head">
          <Eyebrow light>Trusted Partners &amp; Integrations</Eyebrow>
          <SplitWords className="h2" text="TRUSTED PARTNERS & INTEGRATIONS" />
        </div>
        <div className="partners">
          {PARTNERS.map(([img, name, d]) => (
            <div className="partner bubble" data-bubble key={name} style={{ background: 'none', border: 0 }}>
              <div className="partner__logo"><Img src={img} alt={name} sizes="200px" /></div>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="band__sig band__sig--center" data-reveal>Real support. Real people. Real peace of mind.</p>
      </section>
    </>
  );
}
