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
          <li className="setup__step setup__step--app">
            <span className="setup__num" aria-hidden="true">4</span>
            {/* The client's download card (2026-09-14), copy exactly as supplied.
                The QR is scanned from a desktop and tapped on a phone, which
                can't scan its own screen. The QR (segno, client's updated code,
                2026-10-09) and the tap both go to
                https://portal.myguardianlink.com/app?group=PARENTPLAN.
                NEXT_PUBLIC_PORTAL_URL (lib/behaviour/main.js) can override the tap. */}
            <div className="app-card">
              <h3 className="h3 app-card__title">Download the myGuardianLink Mobile App</h3>
              <a className="app-card__qr" href="https://portal.myguardianlink.com/app?group=PARENTPLAN" data-cta="portal">
                <img src="/students/assets/img/campaign/qr-app.svg" width={200} height={200}
                     alt="QR code: download the myGuardianLink app" loading="lazy" decoding="async" />
              </a>
              <p className="app-card__action">Scan or Tap to Download</p>
              <p className="app-card__hint">On mobile, tap the QR code. On desktop, scan it with your phone.</p>
              <p className="app-card__visit">or get it on the <a href="https://apps.apple.com/us/app/my-guardian-link/id6782908401" target="_blank" rel="noopener">App Store</a> or <a href="https://play.google.com/store/apps/details?id=com.my_guardian_link" target="_blank" rel="noopener">Google Play</a></p>
              <div className="app-card__code">
                <p className="app-card__code-label">Group Code</p>
                <p className="app-card__code-value">PARENTPLAN</p>
                <p className="app-card__code-note">If you do not use the QR code, enter this code during on boarding to join the group.</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
