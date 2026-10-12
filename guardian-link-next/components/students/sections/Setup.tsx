import { PARENT_PLAN_LABEL, PARENT_PLAN_URL, PORTAL_LABEL, PORTAL_URL } from '@/lib/students/cta';

/* ==========================================================================
   8 · FAMILY SETUP
   ========================================================================== */
export default function Setup() {
  return (
    <section className="section section--soft setup" id="setup">
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">Fast family setup</p>
          <h2 className="h2">Getting Your Family Protected Is Simple</h2>
        </header>

        <ol className="setup__steps" data-reveal="">
          <li className="setup__step">
            <span className="setup__num" aria-hidden="true">1</span>
            <div className="setup__body">
              <h3 className="h3">Parent Purchases</h3>
              <p>Create your own account and purchase the Parent Plan.</p>
            </div>
          </li>
          <li className="setup__step">
            <span className="setup__num" aria-hidden="true">2</span>
            <div className="setup__body">
              <h3 className="h3">Send Secure Invites</h3>
              <p>Your college student and other family members receive invitations to join.</p>
            </div>
          </li>
          <li className="setup__step">
            <span className="setup__num" aria-hidden="true">3</span>
            <div className="setup__body">
              <h3 className="h3">Each User Verifies</h3>
              <p>Each person enters their own contact information, completes verification, and controls their private profile.</p>
            </div>
          </li>
          <li className="setup__step">
            <span className="setup__num" aria-hidden="true">4</span>
            {/* No download links, QR or group code before payment (paid
                traffic, 2026-10-12): the app is offered only once the
                Parent Plan is paid for. */}
            <div className="setup__body">
              <h3 className="h3">Download the App After Payment</h3>
              <p>Once your payment is complete, you&rsquo;ll be shown how to download the <span className="brand">myGuardianLink</span> app and activate protection.</p>
            </div>
          </li>
        </ol>

        {/* Two buttons under the steps, as on the runners page (client, 2026-10-12) */}
        <div className="actions setup__actions" data-reveal="">
          <a className="btn btn--start" href={PARENT_PLAN_URL} data-cta="start">{PARENT_PLAN_LABEL}</a>
          <a className="btn btn--portal" href={PORTAL_URL} data-cta="portal">{PORTAL_LABEL}</a>
        </div>
      </div>
    </section>
  );
}
