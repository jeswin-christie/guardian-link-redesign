'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Lenis from 'lenis';

/* Module-level handles so other client components can drive scrolling. */
let lenis: Lenis | null = null;
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
export function lockScroll(on: boolean) {
  document.documentElement.style.overflow = on ? 'hidden' : '';
  if (lenis) (on ? lenis.stop() : lenis.start());
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T & Element>(s)) as T[];

/**
 * All scroll-linked and reveal motion for the site. Pages only add data attributes:
 * data-reveal · data-split-words · data-stagger · data-bubble · .stairs · data-reveal-img
 * data-num · data-marquee · data-parallax · data-parallax-img · data-hscroll · hero shapes
 */
export default function Motion() {
  const path = usePathname();

  // Smooth scrolling (once)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: { offset: 0 } });
    let id = 0;
    const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, []);

  // Per-route setup
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    // replay hero entrance on client-side navigation (first load is driven by the Loader)
    if (root.dataset.booted) {
      root.classList.remove('is-ready');
      void root.offsetWidth;
      requestAnimationFrame(() => root.classList.add('is-ready'));
    }
    if (!location.hash) { if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }
    else {
      const target = document.querySelector(location.hash);
      if (target) setTimeout(() => (lenis ? lenis.scrollTo(target as HTMLElement, { duration: 1.2 }) : target.scrollIntoView()), 350);
    }
    const hero = document.querySelector('.hero');
    const settle = setTimeout(() => hero?.classList.add('is-settled'), 2400);

    /* reveals */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal],[data-split-words],[data-stagger],.stairs,[data-bubble]').forEach((el) => io.observe(el));
    $$('[data-stagger]').forEach((el) => Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i))));
    $$('[data-bubble]').forEach((b, i) => b.style.setProperty('--i', String(i % 6)));

    // clip-path hides elements from IntersectionObserver, so observe the parent
    const ioImg = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(':scope > [data-reveal-img]', e.target).forEach((c) => c.classList.add('is-in'));
        ioImg.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    const hosts = new Set<Element>();
    $$('[data-reveal-img]').forEach((el) => el.parentElement && hosts.add(el.parentElement));
    hosts.forEach((h) => ioImg.observe(h));

    /* count-up numbers */
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const to = +(el.dataset.num || 0), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        const fmt = (n: number) => (el.dataset.format === 'comma' ? n.toLocaleString('en-US') : String(n));
        const t0 = performance.now();
        const step = (t: number) => {
          const p = clamp((t - t0) / 1600, 0, 1);
          el.textContent = pre + fmt(Math.round(to * (1 - Math.pow(1 - p, 4)))) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.6 });
    if (!reduce) $$('[data-num]').forEach((el) => countIO.observe(el));

    /* scroll-linked loop */
    const marquees = $$('[data-marquee]').map((el) => ({
      el, dir: +(el.dataset.marquee || 1), speed: +(el.dataset.speed || 0.4), auto: +(el.dataset.auto || 0), offset: 0,
      host: (el.closest('section,footer,article') || el.parentElement) as HTMLElement,
    }));
    const parallax = $$('[data-parallax]').map((el) => ({ el, f: +(el.dataset.parallax || 0) }));
    const pImgs = $$('[data-parallax-img]');
    const hsList = $$('[data-hscroll-section]').map((s) => ({
      s, track: s.querySelector<HTMLElement>('[data-hscroll]')!, bar: s.querySelector<HTMLElement>('[data-hscroll-bar]'),
    })).filter((h) => h.track);
    const shapes = $$<SVGPathElement>('.hero__shapes [data-depth]');
    const heroCenter = document.querySelector<HTMLElement>('[data-hero-center]');
    const heroVideo = document.querySelector<HTMLVideoElement>('video.hero__video');
    if (heroVideo && reduce) heroVideo.pause();

    const sizeH = () => hsList.forEach(({ s, track }) => {
      const extra = Math.max(0, track.scrollWidth - window.innerWidth);
      s.style.setProperty('--hs-h', `${window.innerHeight + extra}px`);
    });
    sizeH();
    window.addEventListener('resize', sizeH);
    const sizeT = setTimeout(sizeH, 800);

    let last = window.scrollY, vel = 0, prevT = performance.now(), raf = 0;
    const frame = (t: number) => {
      const y = window.scrollY, vh = window.innerHeight;
      const dt = Math.max(16, t - prevT); prevT = t;
      vel = lerp(vel, (y - last) / dt, 0.15); last = y;

      marquees.forEach((m) => {
        const r = m.host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const progress = (vh - r.top) / (vh + r.height);
        if (m.auto) m.offset += (m.auto / 1000) * dt * (1 + Math.abs(vel) * 6);
        const width = m.el.scrollWidth / (m.el.children.length || 1);
        let x = m.dir * (progress * width * m.speed * 2.2) - (m.auto ? m.offset % width : 0);
        if (m.dir < 0 && !m.auto) x -= width * 0.15;
        if (m.dir > 0) x -= width * 1.1;
        m.el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      });

      if (!reduce) {
        parallax.forEach(({ el, f }) => {
          const r = (el.parentElement as HTMLElement).getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          el.style.transform = `translate3d(0,${(-r.top * f).toFixed(1)}px,0)`;
        });
        pImgs.forEach((img) => {
          const box = img.parentElement as HTMLElement;
          if (!box.classList.contains('is-in')) return;
          const r = box.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          img.style.transform = `translate3d(0,${(((r.top + r.height / 2 - vh / 2) / vh) * -9).toFixed(2)}%,0)`;
        });
        if (y < vh * 1.2) {
          shapes.forEach((sh) => sh.style.setProperty('--sy', `${(-y * +(sh.dataset.depth || 0)).toFixed(1)}px`));
          if (heroCenter) {
            const p = clamp(y / (vh * 0.8), 0, 1);
            heroCenter.style.transform = `translate3d(0,${(y * 0.25).toFixed(1)}px,0) scale(${(1 - p * 0.06).toFixed(3)})`;
            heroCenter.style.opacity = (1 - p * 1.1).toFixed(3);
          }
        }
      }

      hsList.forEach(({ s, track, bar }) => {
        const r = s.getBoundingClientRect();
        const dist = s.offsetHeight - vh;
        const p = dist > 0 ? clamp(-r.top / dist, 0, 1) : 0;
        const extra = Math.max(0, track.scrollWidth - window.innerWidth);
        track.style.transform = `translate3d(${(-p * extra).toFixed(1)}px,0,0)`;
        if (bar) bar.style.transform = `scaleX(${p})`;
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    /* cursor hover state */
    return () => {
      io.disconnect(); ioImg.disconnect(); countIO.disconnect();
      cancelAnimationFrame(raf); clearTimeout(settle); clearTimeout(sizeT);
      window.removeEventListener('resize', sizeH);
    };
  }, [path]);

  return null;
}
