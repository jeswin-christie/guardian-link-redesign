import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   1 · HERO — her safety. Photo 2, mother and daughter.
   The first ten seconds carry the brief's four things only:
     Protection She Deserves.
     One tap. Precise location. Trusted people. Live response.
     3 members — $24.99/month.   ("people" → "members" at the user's
                                  request, 2026-09-14, matching the
                                  Parent Plan card's "3 Members")
     Start Free.
   ========================================================================== */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__media">
          <img src="/students/assets/img/campaign/hero-parent-daughter.webp" width={1122} height={1402}
               alt="Mother and college-age daughter looking at a phone together"
               fetchPriority="high" />
          <span className="hero__arc" aria-hidden="true"></span>
        </div>

        <div className="hero__copy">
          <h1 className="hero__title"><span className="accent">Protection</span> <span>She Deserves.</span></h1>

          <ul className="hero__features" aria-label="Key benefits">
            <li className="feature"><span className="feature__ico"><Icon name="tap" /></span>One tap</li>
            <li className="feature"><span className="feature__ico"><Icon name="pin" /></span>Precise location</li>
            <li className="feature"><span className="feature__ico"><Icon name="people" /></span>Trusted people</li>
            <li className="feature"><span className="feature__ico"><Icon name="headset" /></span>Live response</li>
          </ul>

          <p className="hero__price">
            <span>3 members</span>
            <span className="hero__price-sep" aria-hidden="true">&mdash;</span>
            <span><b>$24.99</b>/month</span>
          </p>

          <div className="actions">
            <a className="btn btn--start" href="#plan" data-cta="start">Start Free</a>
            <a className="btn btn--action" href="#demo">
              <Icon name="play" fill />
              See Protection in Action
            </a>
          </div>
          <p className="fine">Try&nbsp;It&nbsp;Free&nbsp;&middot; 30-Day&nbsp;Refund&nbsp;Policy&nbsp;&middot; Cancel&nbsp;Anytime&nbsp;&middot; No&nbsp;Long-Term&nbsp;Commitment <a className="fine__link" href="#offer">How Start&nbsp;Free&nbsp;works</a></p>
        </div>
      </div>
    </section>
  );
}
