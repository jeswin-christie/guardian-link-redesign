import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   11 · START FREE — photo 1 behind Guardian Navy, as in the draft.
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
          <p className="final__price"><strong>3 people &mdash; $24.99/month.</strong> Try It Free.</p>
          <div className="actions">
            <a className="btn btn--start" href="#plan" data-cta="start">Start Free</a>
            <a className="btn btn--action" href="#demo">
              <Icon name="play" fill />
              See Protection in Action
            </a>
          </div>
          <p className="final__tag">Get connected. Stay protected.</p>
        </div>
      </div>
    </section>
  );
}
