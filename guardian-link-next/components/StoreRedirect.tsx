'use client';

import { useEffect } from 'react';
import { phoneStore } from '@/lib/device';

/** On a phone, go straight to that phone's store. Desktops stay on the page and see both buttons. */
export default function StoreRedirect() {
  useEffect(() => {
    const store = phoneStore();
    if (store) window.location.replace(store);
  }, []);
  return null;
}
