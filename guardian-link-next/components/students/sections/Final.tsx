import { PARENT_PLAN_LABEL, PARENT_PLAN_URL } from '@/lib/students/cta';
import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   11 · GET THE PARENT PLAN — photo 1 behind Guardian Navy, as in the draft.
   The draft's "When danger finds you, so do we" is not used: it leads
   with fear at the moment of purchase (brief item 11). The headline is
   the draft's own next line.
   ========================================================================== */
export default function Final() {
  return (
    <section className="final on-dark" id="start">
      <div className="wrap">
        <div className="final__inner" data-reveal="">
          <h2 className="h2">Give her peace of mind. <span className="accent">Give yourself confidence.</span></h2>
          <p className="final__price"><strong>3 people &mdash; $24.99/month, billed annually.</strong></p>
          <div className="actions">
            <a className="btn btn--start" href={PARENT_PLAN_URL} data-cta="start">{PARENT_PLAN_LABEL}</a>
            <a className="btn btn--action" href="#demo">
              <Icon name="play" fill />
              See Protection in Action
            </a>
          </div>
          <p className="final__next">Next step: get the Parent Plan and complete payment. After payment you download the app, add trusted contacts and activate protection.</p>
          <p className="final__tag">Get connected. Stay protected.</p>
        </div>
      </div>
    </section>
  );
}
