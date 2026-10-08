import { Img, SplitWords, Btn, NextStep } from './primitives';
import { DISCLAIMER_911, DISCLAIMER_RESPONSE } from '@/lib/meta';
import { getProtected } from '@/lib/funnel';

/** [image, label, optional link] — linked boxes open that audience's own page. Full list: /who-it-protects/ */
export const AUDIENCES: [string, string, string?][] = [
  ['1-students.webp', 'Students', '/students/'],
  ['2-nurse.webp', 'Nurses & Healthcare Workers'],
  ['3-daycare.webp', 'Daycare Providers'],
  ['4-runners.webp', 'Runners', '/runners/'],
  ['whatsapp-image-2026-07-13-at-6-59-53-am.webp', 'Lone Workers'],
  ['6-real-estate-agent.webp', 'Real Estate Agents'],
  ['7-seniors.webp', 'Seniors & Dementia-Risk Families'],
  ['8-women-walking.webp', 'Walking, Working, Traveling, Or Living Alone.'],
];

/** The six most likely converters, shown on the homepage (client review, Oct 2026). */
export const HOME_AUDIENCES: [string, string, string?][] = [
  ['8-women-walking.webp', 'Women on the Move'],
  ['1-students.webp', 'Students', '/students/'],
  ['7-dementia.webp', 'Seniors / People Living Alone'],
  ['7-seniors.webp', 'Families & Caregivers'],
  ['2-nurse.webp', 'Healthcare Workers'],
  ['4-runners.webp', 'Runners, Walkers & Lone Workers', '/runners/'],
];

export function AudienceGrid({ items, six }: { items: [string, string, string?][]; six?: boolean }) {
  return (
    <div className={`who__grid${six ? ' who__grid--6' : ''}`} data-stagger>
      {items.map(([img, label, href]) => (
        <figure className={href ? 'aud aud--link' : 'aud'} key={img + label}>
          <Img src={img} sizes={six ? '(max-width: 860px) 50vw, 33vw' : '(max-width: 860px) 50vw, 25vw'} />
          <figcaption>{label}</figcaption>
          {/* Plain <a>: /students/ and /runners/ have their own root layouts, so it's a full page load anyway */}
          {href && <a className="aud__link" href={href} aria-label={label} />}
        </figure>
      ))}
    </div>
  );
}

/**
 * Closing call to action. `image={null}` gives a plain branded background (no photo behind the text).
 * `reassure` adds a short pricing / setup line under the button.
 */
export function CtaPanel({
  title = "Don't wait for the moment you need help to wish you had it.",
  text = 'Life is unpredictable. My Guardian Link is here to help protect you and the people you care about – anytime, anywhere.',
  image = 'home-page-5.webp',
  alt = 'Family watching the city at night with the My Guardian Link Urgent Assist screen',
  reassure,
  notes = true,
}: { title?: string; text?: string; image?: string | null; alt?: string; reassure?: string; notes?: boolean }) {
  return (
    <section className={`panel cta${image ? '' : ' cta--plain'}`} data-section="cta">
      {image && <div className="cta__media" data-parallax="0.22"><Img src={image} alt={alt} sizes="100vw" /></div>}
      <div className="cta__tint" />
      <div className="cta__content">
        <SplitWords className="cta__title" text={title} />
        {text && <p data-reveal>{text}</p>}
        <div className="cta__btns" data-reveal>
          <Btn a={getProtected('final-cta')} variant="cta" />
        </div>
        <NextStep className="cta__next" />
        {reassure && <p className="cta__reassure" data-reveal>{reassure}</p>}
        <button type="button" className="ulink cta__org" data-open="org" data-cta="final-org">Protect My Organization</button>
        {notes && (
          <ul className="cta__notes" data-reveal>
            <li><b>{DISCLAIMER_911}</b> {DISCLAIMER_RESPONSE}</li>
          </ul>
        )}
      </div>
    </section>
  );
}
