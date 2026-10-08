'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PORTAL } from '@/lib/meta';
import { signupUrl } from '@/lib/funnel';
import { scrollToTop } from './Motion';
import { toggleChat } from './ChatWidget';

const LINKS = [
  { href: '/how-it-works/', label: 'How It Works' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/about-us/', label: 'About Us' },
];
const MORE = [
  { href: '/who-it-protects/', label: 'Who It Protects' },
  { href: '/support/', label: 'Support' },
  { href: '/legal/', label: 'Legal' },
];

export default function PillNav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMenu(false); }, [path]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const active = (href: string) => path === href || path === href.replace(/\/$/, '');

  return (
    <>
      <nav className={`pill${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary">
        <button className="pill__top" onClick={() => scrollToTop()} aria-label="Back to top">
          <svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="pill__links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={active(l.href) ? 'is-active' : ''}>{l.label}</Link>
          ))}
          <a href={PORTAL} className="pill__login">Log In</a>
        </div>
        <button className="pill__menu" onClick={() => setMenu((m) => !m)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
          <span /><span />
        </button>
        <a href={signupUrl()} className="pill__cta" data-cta="nav">Get Protected Now</a>
        <button className="pill__chat" onClick={toggleChat} aria-label="Chat with us">
          <svg viewBox="0 0 24 24"><path d="M4 5h16v10H9l-5 4V5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="10" r="1" fill="currentColor" /></svg>
        </button>
      </nav>

      <div className={`menu${menu ? ' is-open' : ''}`} aria-hidden={!menu}>
        <nav>
          {LINKS.map((l, i) => (
            <Link key={l.href} href={l.href} style={{ ['--i' as string]: i }} className={active(l.href) ? 'is-active' : ''}>{l.label}</Link>
          ))}
        </nav>
        <div className="menu__more">
          {MORE.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>
        <div className="menu__ctas">
          <a href={PORTAL} className="btn btn--gold">Log In</a>
          <a href={signupUrl()} className="btn btn--cta" data-cta="menu">Get Protected Now</a>
        </div>
      </div>
    </>
  );
}
