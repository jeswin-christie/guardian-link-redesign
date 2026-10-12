import { Icon } from '@/components/students/IconSprite';

/* ==========================================================================
   3 · DEMO — straight after the trust strip, so parents see how it works
   before anything else (company feedback 3). Plays the College Campus
   Reality scenario
   (/media/video/college-campus-reality.mp4, with its poster, the same
   video the main site uses on Who It Protects). Video View is tracked
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

        <a className="demo__video" href="/media/video/college-campus-reality.mp4" target="_blank" rel="noopener" data-track="video" data-reveal="" aria-label="Play the College Campus Reality video">
          <img src="/media/video-poster-college-campus.webp" width={1280} height={720} decoding="async" alt="" />
          <span className="demo__play"><Icon name="play" fill /></span>
          <span className="demo__caption">Watch College Campus Reality</span>
        </a>
      </div>
    </section>
  );
}
