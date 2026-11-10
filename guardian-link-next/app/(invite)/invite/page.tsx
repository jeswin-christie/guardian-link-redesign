import InviteCta from '@/components/invite/InviteCta';

/* Personal Invite landing page (client brief "Personal Invite Smart Link", Nov 2026).
   Layout follows the supplied design: invite icon, headline, orange underline, one-line description,
   the orange button, the store note and a link to the main site. */
export default function Invite() {
  return (
    <main className="inv">
      <svg className="inv__swoosh inv__swoosh--tl" viewBox="0 0 400 260" aria-hidden="true"><path d="M-20 250 C 90 120, 230 30, 420 -10" /></svg>
      <svg className="inv__swoosh inv__swoosh--br" viewBox="0 0 400 260" aria-hidden="true"><path d="M-20 270 C 160 230, 300 150, 420 40" /></svg>
      <svg className="inv__wave" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C 300 40, 650 210, 1200 70 L1200 200 L0 200 Z" /></svg>

      <div className="inv__card">
        {/* eslint-disable-next-line @next/next/no-img-element -- small fixed asset; plain img keeps the page light */}
        <img className="inv__icon" src="/invite/invite-icon.webp" width={640} height={640} alt="My Guardian Link invite" fetchPriority="high" />
        <h1 className="inv__title">You&rsquo;ve Been Invited to<br />My&nbsp;Guardian&nbsp;Link</h1>
        <svg className="inv__underline" viewBox="0 0 320 14" aria-hidden="true"><path d="M4 10 Q 160 -4 316 10" /></svg>
        <p className="inv__text">My Guardian Link is a personal protection app that connects users with trusted contacts and live response support.</p>
        <InviteCta />
        <a className="inv__site" href="/" data-invite="site">Visit myguardianlink.com</a>
      </div>
    </main>
  );
}
