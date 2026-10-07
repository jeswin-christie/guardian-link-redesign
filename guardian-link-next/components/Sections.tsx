import { Img, SplitWords, Btn, NextStep } from './primitives';
import { DISCLAIMER_911, DISCLAIMER_RESPONSE } from '@/lib/meta';

/** [image, label, optional link] — linked boxes open that audience's own page */
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

export function CtaPanel({
  title = "Don't wait for the moment you need help to wish you had it.",
  text = 'Life is unpredictable. My Guardian Link is here to help protect you and the people you care about – anytime, anywhere.',
  image = 'home-page-5.webp',
  alt = 'Family watching the city at night with the My Guardian Link Urgent Assist screen',
  notes = true,
}: { title?: string; text?: string; image?: string; alt?: string; notes?: boolean }) {
  return (
    <section className="panel cta" data-section="cta">
      <div className="cta__media" data-parallax="0.22"><Img src={image} alt={alt} sizes="100vw" /></div>
      <div className="cta__tint" />
      <div className="cta__content">
        <SplitWords className="cta__title" text={title} />
        {text && <p data-reveal>{text}</p>}
        <div className="cta__btns" data-reveal>
          <Btn a={{ label: 'Get Protected Now', href: '/pricing/' }} variant="cta" />
          <button type="button" className="btn btn--circle" data-open="org"><span>Protect My Organization</span></button>
        </div>
        <NextStep className="cta__next" />
        {notes && (
          <ul className="cta__notes" data-reveal>
            <li><b>{DISCLAIMER_911}</b> {DISCLAIMER_RESPONSE}</li>
            <li>Real-time protection. Trusted connections. Peace of mind.</li>
          </ul>
        )}
      </div>
    </section>
  );
}
