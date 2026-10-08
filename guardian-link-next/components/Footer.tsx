import Link from 'next/link';
import { Img } from './primitives';
import { DISCLAIMER_911, DISCLAIMER_RESPONSE, APP_STORE, GOOGLE_PLAY } from '@/lib/meta';
import { signupUrl } from '@/lib/funnel';

export default function Footer() {
  return (
    <footer className="panel footer" id="footer" data-section="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href="/"><Img src="mgl-horizontal-logo-rev.webp" alt="My Guardian Link" sizes="220px" className="footer__logo" /></Link>
          <p>Smart protection. Connected confidence. Always with you when it matters most.</p>
          <div className="footer__stay">
            <h5>Start Free</h5>
            <a href={signupUrl()} className="btn btn--cta footer__start" data-cta="footer-free" data-plan="free">Create Free Account</a>
            <p>Then download the app to add trusted contacts and activate protection.</p>
            <div className="footer__stores">
              <a href={APP_STORE} className="store" target="_blank" rel="noopener" data-cta="footer-app-store">
                <small>Download on the</small>App Store
              </a>
              <a href={GOOGLE_PLAY} className="store" target="_blank" rel="noopener" data-cta="footer-google-play">
                <small>Get it on</small>Google Play
              </a>
            </div>
          </div>
        </div>
        <nav className="footer__col" aria-label="Product">
          <h5>Product</h5>
          <Link href="/how-it-works/">How It Works</Link>
          <Link href="/pricing/">Pricing</Link>
          <Link href="/faq/">FAQ</Link>
        </nav>
        <nav className="footer__col" aria-label="Company">
          <h5>Company</h5>
          <Link href="/about-us/">About Us</Link>
          <Link href="/support/">Support</Link>
        </nav>
      </div>

      <div className="footer__disclaimer">
        <p><b>{DISCLAIMER_911}</b> {DISCLAIMER_RESPONSE}</p>
        <p>Requires cellular data or Wi-Fi. <Link href="/coverage-and-emergency-disclaimer/">View coverage and service limitations.</Link></p>
      </div>

      <div className="footer__bottom">
        <p>© 2026 My Guardian Link®. All rights reserved.</p>
        <nav aria-label="Legal">
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/terms-of-use/">Terms of Use</Link>
          <Link href="/end-user-license-agreement/">EULA</Link>
          <Link href="/refund-policy/">Refund Policy</Link>
          <Link href="/legal/">Legal</Link>
        </nav>
      </div>
    </footer>
  );
}
