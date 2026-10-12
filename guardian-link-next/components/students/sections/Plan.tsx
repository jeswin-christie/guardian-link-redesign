import { PARENT_PLAN_LABEL, PARENT_PLAN_URL } from '@/lib/students/cta';
import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   7 · PRICE — The Parent Plan. Photo 3, "The Parent Plan photo", set large
   rather than in the draft's small circle (brief item 4).
   Below the card, "How the Parent Plan works" spells out the offer (company
   feedback 4), using only terms the client's own copy states: the price,
   paid sign-up with the app after payment, 30-Day Refund Policy, Cancel Anytime, No Long-Term
   Commitment. The unconfirmed billing rows (paid today, billing start,
   what "free" means) were removed at the user's request, 2026-09-14.
   ========================================================================== */
export default function Plan() {
  return (
    <section className="section plan" id="plan">
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">Protection for the family</p>
          <h2 className="h2">The Parent Plan</h2>
          <p className="lede">Designed for families preparing for college&mdash;and for life beyond campus.</p>
        </header>

        <div className="plan-card" data-reveal="">
          <figure className="plan-card__media">
            <img src="/students/assets/img/campaign/parent-plan.webp" width={1254} height={1254} loading="lazy" decoding="async"
                 alt="College student walking across campus with a backpack" />
          </figure>

          <div className="plan-card__main">
            <p className="plan-card__tier">The Parent Plan <span>(Group Plan)</span></p>
            <p className="plan-card__sub">Designed for families preparing for college.</p>
            <ul className="checks">
              <li><span className="check"><Icon name="check" /></span>Protect up to 3 people you love</li>
              <li><span className="check"><Icon name="check" /></span>Private, secure accounts</li>
              <li><span className="check"><Icon name="check" /></span>Trusted contacts &amp; live response support</li>
              <li><span className="check"><Icon name="check" /></span>Built for college life and beyond</li>
            </ul>
          </div>

          <div className="plan-card__price on-dark">
            {/* Goes where every Get the Parent Plan button goes
                (lib/students/cta.ts), tracked as a CTA click from "plan". */}
            <a className="badge" href={PARENT_PLAN_URL} data-cta="start">{PARENT_PLAN_LABEL}</a>
            <p className="plan-card__people">3 Members</p>
            <p className="plan-card__amount">$24.99<small>/ month</small></p>
            <p className="plan-card__each">Billed annually at $299.88 &middot; $8.33 each</p>
          </div>
        </div>

        <div className="offer" id="offer" data-reveal="">
          <h3 className="h3 offer__title">How the Parent Plan Works</h3>
          <dl className="offer__list">
            <div className="offer__row">
              <dt><span className="offer__ico" aria-hidden="true"><svg className="icon"><use href="#i-people" /></svg></span>The plan</dt>
              <dd>$24.99/month for 3 people, billed annually at $299.88 &mdash; $8.33 each. Or $49.99/month, billed monthly.</dd>
            </div>
            <div className="offer__row">
              <dt><span className="offer__ico" aria-hidden="true"><svg className="icon"><use href="#i-tag" /></svg></span>Getting started</dt>
              <dd>Get the Parent Plan and complete payment. The app download comes right after.</dd>
            </div>
            <div className="offer__row">
              <dt><span className="offer__ico" aria-hidden="true"><svg className="icon"><use href="#i-refund" /></svg></span>Refunds</dt>
              <dd><a href="https://myguardianlink.com/refund-policy/" target="_blank" rel="noopener">30-Day Refund Policy</a>.</dd>
            </div>
            <div className="offer__row">
              <dt><span className="offer__ico" aria-hidden="true"><svg className="icon"><use href="#i-cancel" /></svg></span>Cancellation</dt>
              <dd>Cancel Anytime.</dd>
            </div>
            <div className="offer__row">
              <dt><span className="offer__ico" aria-hidden="true"><svg className="icon"><use href="#i-calendar" /></svg></span>Commitment</dt>
              <dd>No Long-Term Commitment.</dd>
            </div>
          </dl>
        </div>

      </div>
    </section>
  );
}
