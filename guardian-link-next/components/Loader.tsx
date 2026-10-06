'use client';

import { useEffect } from 'react';

/** No preloader screen: flags <html> as ready on mount so entrance animations run immediately. */
export default function Loader() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-ready');
    root.dataset.booted = '1';
  }, []);

  return null;
}
