import Link from 'next/link';
import { Img, Giant } from './primitives';
import { SUPPORT_FORM } from '@/lib/meta';

export default function Footer() {
  return (
    <footer className="panel footer" id="footer" data-section="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href="/"><Img src="mgl-horizontal-logo-rev.webp" alt="My Guardian Link" sizes="220px" className="footer__logo" /></Link>
          <p>Smart protection. Connected confidence. Always with you when it matters most.</p>
          <div className="footer__stay">
            <h5>Stay Connected</h5>
            <p><b>Download the Free Version</b></p>
            <p>Get product updates, Prevention &amp; Protection tips with in-app messaging.</p>
          </div>
        </div>
        <nav className="footer__col" aria-label="Product">
          <h5>Product</h5>
          <Link href="/how-it-works/">How it Works</Link>
          <Link href="/features/">Features</Link>
          <Link href="/features/#devices">Devices</Link>
          <Link href="/pricing/">Plan &amp; Pricing</Link>
        </nav>
        <nav className="footer__col" aria-label="Resources">
          <h5>Resources</h5>
          <Link href="/faq/">Info Center</Link>
          <Link href="/features/#coverage-map">Coverage Map</Link>
          <a href={SUPPORT_FORM} target="_blank" rel="noopener">Support</a>
        </nav>
        <nav className="footer__col" aria-label="Company">
          <h5>Company</h5>
          <Link href="/about-us/">About Us</Link>
          <Link href="/about-us/#partners">Partners</Link>
        </nav>
      </div>

      <div className="footer__disclaimer">
        <p>My Guardian Link requires cellular data or Wi-Fi and does not replace 911. <Link href="/coverage-and-emergency-disclaimer/">View coverage and service limitations.</Link></p>
        <p className="footer__strong">Strengthens 911 response —it does not replace 911.</p>
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

      <Giant className="giant--footer" dir={-1} speed={0.25} auto={40} repeat={3}
        word={<>My Guardian Link<b className="dot">.</b></>} />
    </footer>
  );
}
