'use client';

import { useEffect } from 'react';
import { PORTAL } from '@/lib/meta';

const KEY = 'mgl_attribution';
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const PORTAL_ORIGIN = new URL(PORTAL).origin;

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }

/**
 * 1. Remembers the ad parameters a visitor landed with (sessionStorage) and adds them to
 *    every portal link when it is clicked, so signups stay attributed to the campaign.
 * 2. Pushes `{ event: 'cta_click', cta, page, plan, billing, destination }` to window.dataLayer
 *    for every link carrying data-cta — ready for GTM / GA4 when analytics is installed.
 */
export default function CtaTracking() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const found = PARAMS.filter((k) => q.get(k)).map((k) => [k, q.get(k) as string]);
      if (found.length) sessionStorage.setItem(KEY, JSON.stringify(Object.fromEntries(found)));
    } catch { /* storage unavailable */ }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      let url: URL;
      try { url = new URL(a.href); } catch { return; }
      if (url.origin === PORTAL_ORIGIN) {
        try {
          const saved = JSON.parse(sessionStorage.getItem(KEY) || '{}') as Record<string, string>;
          for (const [k, v] of Object.entries(saved)) if (!url.searchParams.has(k)) url.searchParams.set(k, v);
          a.href = url.toString();
        } catch { /* storage unavailable */ }
      }
      const { cta, plan, billing } = a.dataset;
      if (cta) {
        (window.dataLayer ||= []).push({
          event: 'cta_click', cta, page: window.location.pathname, plan, billing,
          destination: url.origin + url.pathname,
        });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
