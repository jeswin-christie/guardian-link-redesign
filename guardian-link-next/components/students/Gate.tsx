/* ==========================================================================
   OPENING SCENE — photo 1, the college scene. The campus at dusk, split
   down the middle into two doors; the logo and headline rise in, hold for
   a moment, and the doors part on their own onto the hero, which is
   already laid out behind. No button: the ENTER CTA was removed at the
   user's request (2026-09-13); a scroll, swipe, tap or key opens it
   sooner. Plays on every load and refresh; see styles/intro.css and
   lib/behaviour/intro.js.
   Decorative, so hidden from screen readers; it is gone in about three
   seconds. Deliberately not an <h1> — the hero owns the page's one
   headline. Must stay a direct child of <body> (intro.js makes every
   other child inert while it is up).
   ========================================================================== */
export default function Gate() {
  return (
    <div className="gate" aria-hidden="true">
      <div className="gate__door gate__door--l"></div>
      <div className="gate__door gate__door--r"></div>
      <div className="gate__inner">
        <img className="gate__logo" src="/students/assets/logo-white.png" width={1000} height={309} alt="" />
        <p className="gate__title"><span>Protection</span> <span>She Deserves.</span></p>
        <p className="gate__tag">Get connected <span>&bull;</span> Stay protected</p>
      </div>
    </div>
  );
}
