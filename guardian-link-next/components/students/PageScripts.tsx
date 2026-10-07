'use client';

import { useEffect } from 'react';

import { initIntro } from '@/lib/students/behaviour/intro';
import { initMain } from '@/lib/students/behaviour/main';
import { initMotion } from '@/lib/students/behaviour/motion';

// The page's behaviour (opening scene, tracking, FAQ line setting, dock,
// motion layer) works on the rendered DOM, as it did on the static page.
// It starts once, after hydration, in the original order. The page itself
// is static markup that React never re-renders, so the scripts' DOM changes
// (wrapping the hero, re-setting FAQ lines) are safe.
// The guide (/guide) has no opening scene or motion layer: it takes only
// main.js — launch links, attribution, tracking, no-tails, reveal.
let started = false;

export default function PageScripts({ page = 'landing' }: { page?: 'landing' | 'guide' }) {
  useEffect(() => {
    if (started) return;   // React strict mode runs effects twice in dev
    started = true;
    if (page === 'guide') {
      initMain('guide');
      return;
    }
    initIntro();
    initMain('landing');
    initMotion();
  }, [page]);

  return null;
}
