/* ==========================================================================
   4 · WHY PARENTS NEED IT — a direct link. Photo 4, daughter walking.
   The draft's hero paragraph opens this section, word for word; the three
   lines after it are the draft's parent-message paragraphs.
   ========================================================================== */
export default function HerLink() {
  return (
    <section className="section herlink" id="her">
      <div className="wrap herlink__grid">
        <figure className="herlink__media" data-reveal="">
          <img src="/students/assets/img/campaign/student-walk-phone.webp" width={1122} height={1402} loading="lazy" decoding="async"
               alt="College student walking confidently across campus with her phone" />
        </figure>

        <div className="herlink__copy" data-reveal="">
          <p className="eyebrow">A direct link when she needs it</p>
          <h2 className="h2">Give Her a Direct Link to <span className="accent">Protection.</span></h2>
          <p className="herlink__lede">College brings new freedom, new routines, and moments when she may not be able to safely call or explain what&rsquo;s happening. <strong><span className="brand">myGuardianLink</span> keeps her connected</strong> to the people she trusts, with her location and critical details ready when <strong>seconds matter.</strong></p>
          <ul className="points">
            <li><strong><span className="brand">myGuardianLink</span> connects your college student</strong> to trusted people and a live response coordinator&mdash;fast.</li>
            <li>When something doesn&rsquo;t feel right, she can activate <span className="brand">myGuardianLink</span> <strong>without having to make a traditional phone call or explain everything first.</strong></li>
            <li><strong>Her identity, location and incident information</strong> can be delivered to the people who need it so they can act.</li>
          </ul>
          <blockquote className="pull">When something doesn&rsquo;t feel right, she won&rsquo;t face it alone.</blockquote>
        </div>
      </div>
    </section>
  );
}
