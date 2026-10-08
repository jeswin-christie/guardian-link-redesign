'use client';

import { useEffect } from 'react';
import { APP_STORE, GOOGLE_PLAY } from '@/lib/meta';

/** On a phone, go straight to that phone's store. Desktops stay on the page and see both buttons. */
export default function StoreRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (ios) window.location.replace(APP_STORE);
    else if (/Android/i.test(ua)) window.location.replace(GOOGLE_PLAY);
  }, []);
  return null;
}
