'use client';

import { useEffect, useState } from 'react';
import { APP_STORE, GOOGLE_PLAY, PORTAL } from '@/lib/meta';
import { deviceType, type Device } from '@/lib/device';

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }

const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

/** Campaign parameters the invite link was opened with (e.g. /invite/?utm_source=whatsapp). */
function campaign(): Record<string, string> {
  const q = new URLSearchParams(window.location.search);
  return Object.fromEntries(PARAMS.filter((k) => q.get(k)).map((k) => [k, q.get(k) as string]));
}

function track(event: string, data: Record<string, unknown>) {
  (window.dataLayer ||= []).push({ event, page: '/invite/', ...campaign(), ...data });
}

/** Google Play passes `referrer` on to the app's install-referrer, so campaign parameters survive the install. */
function googlePlayUrl() {
  const c = new URLSearchParams(campaign()).toString();
  return c ? `${GOOGLE_PLAY}&referrer=${encodeURIComponent(c)}` : GOOGLE_PLAY;
}

function portalUrl() {
  const url = new URL(PORTAL);
  for (const [k, v] of Object.entries(campaign())) url.searchParams.set(k, v);
  return url.toString();
}

/**
 * GET MY GUARDIAN LINK: the device is checked when the button is tapped, not on page load.
 * iPhone/iPad → App Store, Android → Google Play, computer (or unknown) → both store buttons appear
 * here, plus the web portal. Without JavaScript the button falls back to /download/.
 * Analytics: invite_view, invite_cta_click and invite_store_click go to window.dataLayer (the site's existing
 * analytics hook, see components/CtaTracking.tsx) with the device and any campaign parameters.
 */
export default function InviteCta() {
  const [choose, setChoose] = useState(false);
  const [device, setDevice] = useState<Device>('desktop');

  useEffect(() => {
    const d = deviceType();
    setDevice(d);
    track('invite_view', { device: d });
  }, []);

  const onCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const d = deviceType();
    if (d === 'desktop') {
      e.preventDefault();
      setChoose(true);
      track('invite_cta_click', { device: d, destination: 'store_choice' });
      return;
    }
    e.currentTarget.href = d === 'ios' ? APP_STORE : googlePlayUrl();
    track('invite_cta_click', { device: d, destination: d === 'ios' ? 'app_store' : 'google_play' });
  };

  const store = (s: 'app_store' | 'google_play') => () => track('invite_store_click', { device, store: s });

  return (
    <>
      <a className="inv__cta" href="/download/" onClick={onCta} data-invite="cta">
        Get My Guardian Link <span aria-hidden="true">&rarr;</span>
      </a>

      {choose ? (
        <div className="inv__choose" role="region" aria-label="Download options">
          <p>Download the app on your phone:</p>
          <div className="inv__stores">
            <a href={APP_STORE} target="_blank" rel="noopener" onClick={store('app_store')}><small>Download on the</small>App Store</a>
            <a href={googlePlayUrl()} target="_blank" rel="noopener" onClick={store('google_play')}><small>Get it on</small>Google Play</a>
          </div>
          <p className="inv__web">Or set up your account on the web: <a href={portalUrl()} onClick={() => track('invite_portal_click', { device })}>User Portal</a></p>
        </div>
      ) : (
        <p className="inv__note">
          iPhone users go to the <a href={APP_STORE} onClick={store('app_store')}>App Store</a>.
          {' '}Android users go to <a href={GOOGLE_PLAY} onClick={store('google_play')}>Google Play</a>.
        </p>
      )}
    </>
  );
}
