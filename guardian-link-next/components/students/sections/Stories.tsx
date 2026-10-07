/* ==========================================================================
   SOCIAL PROOF — HIDDEN until real evidence exists (company feedback 7).
   Never fill this with invented quotes, names or numbers.
   To show it: replace every "REPLACE" below with a real, approved
   testimonial / review / usage figure / partner, then delete `hidden`.
   Remove any .story or .stat you have nothing real for.
   ========================================================================== */
export default function Stories() {
  return (
    <section className="section stories" id="stories" hidden>
      <div className="wrap">
        <header className="section-head" data-reveal="">
          <p className="eyebrow">REPLACE — eyebrow</p>
          <h2 className="h2">REPLACE — section headline</h2>
        </header>

        <ul className="stats" data-reveal="">
          <li className="stat"><strong>REPLACE</strong><span>REPLACE — what the number counts</span></li>
        </ul>

        <div className="stories__list" data-reveal="">
          <figure className="story">
            <blockquote>REPLACE — the parent&rsquo;s own words.</blockquote>
            <figcaption>REPLACE — name, e.g. &ldquo;Parent of a sophomore&rdquo;</figcaption>
          </figure>
          <figure className="story">
            <blockquote>REPLACE — the parent&rsquo;s own words.</blockquote>
            <figcaption>REPLACE — name, e.g. &ldquo;Parent of a sophomore&rdquo;</figcaption>
          </figure>
          <figure className="story">
            <blockquote>REPLACE — the parent&rsquo;s own words.</blockquote>
            <figcaption>REPLACE — name, e.g. &ldquo;Parent of a sophomore&rdquo;</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
