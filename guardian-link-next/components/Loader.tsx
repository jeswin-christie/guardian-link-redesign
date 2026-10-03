'use client';

import { useEffect, useRef, useState } from 'react';

/** First-load preloader; reveals the page and flags <html> as ready so entrance animations run. */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      setDone(true);
      root.classList.add('is-ready');
      root.dataset.booted = '1';
      setTimeout(() => setGone(true), 1300);
    };
    if (reduce) { finish(); return; }
    const imgs = Array.from(document.images).filter((i) => i.loading !== 'lazy').slice(0, 8);
    let loaded = 0, shown = 0, ended = false, id = 0;
    imgs.forEach((im) => {
      if (im.complete) loaded++;
      else { im.addEventListener('load', () => loaded++, { once: true }); im.addEventListener('error', () => loaded++, { once: true }); }
    });
    const total = Math.max(imgs.length, 1), start = performance.now();
    const tick = () => {
      const target = Math.min(100, (loaded / total) * 100);
      const min = Math.min(1, (performance.now() - start) / 1100) * 100;
      shown += (Math.min(target, min) - shown) * 0.14;
      if (target >= 100 && min >= 100 && shown > 99.4) shown = 100;
      if (bar.current) bar.current.style.width = shown + '%';
      if (num.current) num.current.textContent = String(Math.round(shown));
      if (shown >= 100 && !ended) { ended = true; finish(); return; }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    const safety = setTimeout(() => { if (!ended) { ended = true; finish(); } }, 4000);
    return () => { cancelAnimationFrame(id); clearTimeout(safety); };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="loader__mark" src="/media/cropped-whatsapp-image-2026-07-07-at-7-55-30-pm.webp" alt="" width={84} height={84} />
        <div className="loader__bar"><span ref={bar} /></div>
        <div className="loader__count"><span ref={num}>0</span>%</div>
      </div>
    </div>
  );
}
