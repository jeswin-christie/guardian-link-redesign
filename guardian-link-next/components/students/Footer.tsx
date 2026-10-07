/* ==========================================================================
   FOOTER — the draft's line and links.
   Privacy, Terms and Refund Policy are the main site's own pages
   (2026-10-06), opened in a new tab so a visitor from the ad keeps
   this page.
   ========================================================================== */
// `home`: '' on the landing page, '/' on the guide (see Header).
export default function Footer({ home = '' }: { home?: string }) {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__logo" href={home ? home : '#top'} aria-label={home ? 'myGuardianLink — home' : 'myGuardianLink — back to top'}>
          <img src="/students/assets/logo-white.png" width={1000} height={309} alt="myGuardianLink — get connected, stay protected" loading="lazy" />
        </a>
        <p className="footer__line">Strengthens, Complements &amp; Supports 911 &mdash; Connecting You When Seconds Matter.</p>
        <div className="footer__meta">
          <nav className="footer__links" aria-label="Footer">
            <a href={`${home}#how`}>How It Works</a>
            <a href={`${home}#plan`}>Parent Plan</a>
            <a href={`${home}#faq`}>Parent Questions</a>
            <a href="https://myguardianlink.com/privacy-policy/" target="_blank" rel="noopener">Privacy</a>
            <a href="https://myguardianlink.com/terms-of-use/" target="_blank" rel="noopener">Terms</a>
            <a href="https://myguardianlink.com/refund-policy/" target="_blank" rel="noopener">Refund Policy</a>
          </nav>
          <p className="footer__legal">&copy; 2026 myGuardianLink</p>
        </div>
      </div>
    </footer>
  );
}
