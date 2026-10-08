import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   3 · DEMO — straight after the trust strip, so parents see how it works
   before anything else (company feedback 3). Photo 1, as the guides
   README assigns it. Plays the product demo (/media/video/demo.mp4, the
   same video as the main site's "Watch the Demo"). Video View is tracked
   on click (lib/behaviour/main.js).
   ========================================================================== */
export default function Demo() {
  return (
    <section className="section section--soft demo" id="demo">
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">See the experience</p>
          <h2 className="h2">See Protection in Action</h2>
          <p className="lede">See what happens from the moment she activates <span className="brand">myGuardianLink</span>.</p>
        </header>

        <a className="demo__video" href="/media/video/demo.mp4" target="_blank" rel="noopener" data-track="video" data-reveal="" aria-label="Play the myGuardianLink demo video">
          <img src="/students/assets/img/campaign/campus-dusk.webp" width={1672} height={941} decoding="async" alt="" />
          <span className="demo__play"><Icon name="play" fill /></span>
          <span className="demo__caption">Watch the myGuardianLink Demo</span>
        </a>
      </div>
    </section>
  );
}
