import PageHero from '@/components/PageHero';
import { Img, SplitWords, Btn, Eyebrow, JsonLd } from '@/components/primitives';
import { AUDIENCES, CtaPanel } from '@/components/Sections';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('who-it-protects');

const PILLARS: [string, string, string][] = [
  ['Prevent', 'Notice risk early. Report concerns before they escalate.', '2-being-followed-photo.webp'],
  ['Protect', 'Send the silent urgent signal with identity, GPS location, and incident details.', 'chatgpt-image-jun-8-2026-05-14-13-pm-1.webp'],
  ['Deter', 'Real people, rapid response and documented action help discourage harm.', 'home-banner-2-e1783070253640.webp'],
];

export default function WhoItProtects() {
  return (
    <>
      <JsonLd data={pageSchema('who-it-protects')} />
      <PageHero
        eyebrow="Who It Protects"
        lines={['Protection That Starts', 'Before The Emergency']}
        scale="lg"
        sub="My Guardian Link helps prevent risk, protect people in urgent moments, and deter harm with silent activcation, exact location, trusted contact, and real human support."
        primary={{ label: 'Get Protected Now', href: '/pricing/' }}
        link={{ label: 'See How It works', href: '/how-it-works/' }}
        image="page4-1-1.webp"
      />

      <section className="panel dark" data-section="pillars">
        <div className="dark__intro">
          <Eyebrow light>Prevent · Protect · Deter</Eyebrow>
          <div><SplitWords className="h2 h2--xl" text="Be prepared. Stay connected. Stay Protected." /></div>
        </div>
        {PILLARS.map(([t, d, img]) => (
          <article className="kin" key={t}>
            <div className="kin__text" data-reveal><h3>{t}</h3><p>{d}</p></div>
            <figure className="kin__img img-reveal" data-reveal-img><Img src={img} data-parallax-img="" /></figure>
          </article>
        ))}
      </section>

      <section className="panel who" data-section="audiences">
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

      <CtaPanel />
    </>
  );
}
