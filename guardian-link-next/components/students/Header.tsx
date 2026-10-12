import { PARENT_PLAN_LABEL, PARENT_PLAN_URL } from '@/lib/students/cta';

/* ==========================================================================
   HEADER — paid traffic, so no menu to wander off through (company
   feedback 1): the logo, See Protection in Action, and Get the Parent Plan.
   Phones and small laptops show the logo and Get the Parent Plan only. (The draft's full
   menu was tried at the user's request, then taken out again on
   2026-09-14 to follow the company's feedback.)
   ========================================================================== */
// `home` prefixes the in-page links: '' on the landing page, '/' on the
// guide, so they lead back to the landing page's sections.
export default function Header({ home = '' }: { home?: string }) {
  return (
    <header className="header" id="top">
      <div className="wrap header__bar">
        <a className="header__logo" href={home ? home : '#top'} aria-label={home ? 'myGuardianLink — home' : 'myGuardianLink — back to top'}>
          <img src="/students/assets/logo-white.png" width={1000} height={309} alt="myGuardianLink — get connected, stay protected" />
        </a>
        <nav className="header__nav" aria-label="Primary">
          <a href={`${home}#demo`}>See Protection in Action</a>
        </nav>
        <a className="btn btn--start btn--sm" href={PARENT_PLAN_URL} data-cta="start">{PARENT_PLAN_LABEL}</a>
      </div>
    </header>
  );
}
