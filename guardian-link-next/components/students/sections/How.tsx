import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   6 · HOW IT WORKS — the page's one explanation of the protection
   workflow. Five steps, restored at the user's request (2026-09-13) from
   the earlier "One Activation. A Coordinated Response." section, word for
   word, in place of the three-step version — so the page still explains
   it once (company feedback 5). The 911 response chain stays removed.
   ========================================================================== */
export default function How() {
  return (
    <section className="section section--soft how" id="how">
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">Simple when it matters</p>
          <h2 className="h2">How Protection Works</h2>
          <p className="lede">One activation creates a clear path from your student to the people ready to respond.</p>
        </header>

        <ol className="steps" data-reveal="">
          <li className="step">
            <span className="step__ico"><Icon name="tap" /></span>
            <span className="step__num" aria-hidden="true">01</span>
            <h3 className="h3">Activate</h3>
            <p>One tap or supported activation method.</p>
          </li>
          <li className="step">
            <span className="step__ico"><Icon name="id" /></span>
            <span className="step__num" aria-hidden="true">02</span>
            <h3 className="h3">Identify</h3>
            <p>Verified identity and incident information.</p>
          </li>
          <li className="step">
            <span className="step__ico"><Icon name="pin" /></span>
            <span className="step__num" aria-hidden="true">03</span>
            <h3 className="h3">Locate</h3>
            <p>Precise GPS location and nearest available address.</p>
          </li>
          <li className="step">
            <span className="step__ico"><Icon name="people" /></span>
            <span className="step__num" aria-hidden="true">04</span>
            <h3 className="h3">Connect</h3>
            <p>Trusted contacts and a live response coordinator.</p>
          </li>
          <li className="step step--escalate">
            <span className="step__ico"><Icon name="shield" /></span>
            <span className="step__num" aria-hidden="true">05</span>
            <h3 className="h3">Escalate</h3>
            <p>911 escalation when appropriate.</p>
          </li>
        </ol>

        <p className="how__summary" data-reveal=""><span className="brand">myGuardianLink</span> turns a moment of danger or uncertainty into a coordinated response&mdash;<strong className="accent">getting the right information to the right people immediately</strong> so they can act.</p>
      </div>
    </section>
  );
}
