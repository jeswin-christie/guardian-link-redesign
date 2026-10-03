/* My Guardian Link — interactions & motion (vanilla JS, optional Lenis smooth scroll) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Text splitting ---------- */
  // Letters for hero lines
  $$('[data-split]').forEach((el, li) => {
    const base = li * 260;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((word) => {
            if (!word) return;
            if (/^\s+$/.test(word)) { frag.append(' '); return; }
            const wd = document.createElement('span'); wd.className = 'wd'; // keeps words unbroken
            [...word].forEach((c) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; wd.append(s); });
            frag.append(wd);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    $$('.ch', el).forEach((c, i) => { c.style.setProperty('--i', i); c.style.setProperty('--base', base + 'ms'); });
  });
  // Words for headings
  $$('[data-split-words]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });

  /* ---------- Preloader ---------- */
  const loader = $('.loader');
  const bar = $('.loader__bar span');
  const count = $('[data-count]');
  const imgs = $$('img').filter((i) => !i.loading || i.loading !== 'lazy').slice(0, 8);
  let loaded = 0, shown = 0, done = false;
  const total = Math.max(imgs.length, 1);
  imgs.forEach((im) => {
    if (im.complete) loaded++;
    else { im.addEventListener('load', () => loaded++, { once: true }); im.addEventListener('error', () => loaded++, { once: true }); }
  });
  const start = performance.now();
  const tickLoader = () => {
    const target = Math.min(100, (loaded / total) * 100);
    const minTime = clamp((performance.now() - start) / 1200, 0, 1) * 100;
    shown = lerp(shown, Math.min(target, minTime), 0.12);
    if (target >= 100 && minTime >= 100 && shown > 99.4) shown = 100;
    bar.style.width = shown + '%';
    count.textContent = Math.round(shown);
    if (shown >= 100 && !done) return finish();
    requestAnimationFrame(tickLoader);
  };
  const finish = () => {
    done = true;
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.documentElement.classList.add('is-ready');
    document.body.classList.add('is-ready');
    setTimeout(() => loader.remove(), 1300);
    setTimeout(() => $('.hero')?.classList.add('is-settled'), 2200);
  };
  if (reduce) finish(); else requestAnimationFrame(tickLoader);
  setTimeout(() => { if (!done) finish(); }, 4500); // safety

  /* ---------- Smooth scroll (Lenis if present) ---------- */
  let lenis = null;
  const initLenis = () => {
    if (reduce || !window.Lenis || lenis) return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  };
  window.addEventListener('load', initLenis);
  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: 0 });
    else (typeof target === 'number' ? window.scrollTo({ top: target, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
  };

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal],[data-split-words],[data-stagger],.stairs,[data-bubble]').forEach((el) => io.observe(el));
  // clip-path hides the element from IntersectionObserver, so watch the parent and reveal the child
  const ioImg = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$(':scope > [data-reveal-img]', e.target).forEach((c) => c.classList.add('is-in'));
      if (e.target.matches('[data-reveal-img]')) e.target.classList.add('is-in');
      ioImg.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$('[data-reveal-img]').forEach((el) => {
    if (el.tagName === 'FIGURE') { // figure: wrap observation via its parent article
      const host = el.parentElement; host.dataset.revealHost = '1'; ioImg.observe(host);
    } else ioImg.observe(el.parentElement);
  });
  $$('[data-stagger]').forEach((el) => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
  $$('.bubbles [data-bubble]').forEach((b, i) => b.style.setProperty('--i', i));

  /* ---------- Count-up numbers ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.num, pre = el.dataset.prefix || '';
      const fmt = (n) => el.dataset.format === 'comma' ? n.toLocaleString('en-US') : String(n);
      const t0 = performance.now(), dur = 1600;
      const step = (t) => {
        const p = clamp((t - t0) / dur, 0, 1), eased = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + fmt(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  if (!reduce) $$('[data-num]').forEach((el) => countIO.observe(el));

  /* ---------- Accordion with auto-progress ---------- */
  const acc = $('[data-acc]');
  if (acc) {
    const items = $$('.acc__item', acc);
    const pics = $$('.acc-media__stack img');
    const num = $('[data-acc-num]');
    const DUR = 6000;
    let idx = 0, t0 = performance.now(), visible = false, paused = false;
    const set = (i) => {
      idx = i; t0 = performance.now();
      items.forEach((it, k) => { it.classList.toggle('is-active', k === i); $('.acc__bar i', it).style.transform = 'scaleX(0)'; });
      pics.forEach((p, k) => p.classList.toggle('is-active', k === i));
      num.textContent = String(i + 1).padStart(2, '0');
    };
    items.forEach((it, k) => {
      $('.acc__head', it).addEventListener('click', () => set(k));
    });
    acc.addEventListener('mouseenter', () => { paused = true; });
    acc.addEventListener('mouseleave', () => { paused = false; t0 = performance.now() - pausedAt; });
    let pausedAt = 0;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) t0 = performance.now(); }, { threshold: 0.3 }).observe(acc);
    const loop = (t) => {
      if (visible && !paused && !reduce) {
        const p = clamp((t - t0) / DUR, 0, 1);
        $('.acc__bar i', items[idx]).style.transform = `scaleX(${p})`;
        if (p >= 1) set((idx + 1) % items.length);
      } else if (paused) pausedAt = t - t0;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Scroll-driven effects ---------- */
  const marquees = $$('[data-marquee]').map((el) => ({
    el, dir: +el.dataset.marquee || 1, speed: +el.dataset.speed || 0.4, auto: +el.dataset.auto || 0, offset: 0,
    host: el.closest('section,footer,article') || el.parentElement,
  }));
  const parallax = $$('[data-parallax]').map((el) => ({ el, f: +el.dataset.parallax }));
  const pImgs = $$('[data-parallax-img]');
  const hs = $('#situations');
  const hsTrack = $('[data-hscroll]');
  const hsBar = $('[data-hscroll-bar]');
  const pill = $('.pill');
  const heroShapes = $$('.hero__shapes [data-depth]');
  const heroCenter = $('[data-hero-center]');
  const heroVideo = $('.hero__video');
  if (heroVideo && reduce) { heroVideo.removeAttribute('autoplay'); heroVideo.pause(); }
  const navLinks = $$('[data-nav]');
  const sections = $$('[data-section]');

  const sizeHScroll = () => {
    if (!hs || !hsTrack) return;
    const extra = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
    hs.style.setProperty('--hs-h', `${window.innerHeight + extra}px`);
  };
  sizeHScroll();
  window.addEventListener('resize', sizeHScroll);
  window.addEventListener('load', sizeHScroll);

  let lastY = window.scrollY, velocity = 0, prevT = performance.now();
  const frame = (t) => {
    const y = window.scrollY, vh = window.innerHeight;
    const dt = Math.max(16, t - prevT); prevT = t;
    velocity = lerp(velocity, (y - lastY) / dt, 0.15); lastY = y;

    // marquee words: driven by position of host within viewport + velocity kick + optional autoplay
    marquees.forEach((m) => {
      const r = m.host.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const progress = (vh - r.top) / (vh + r.height); // 0 → 1 while passing
      if (m.auto) m.offset += (m.auto / 1000) * dt * (1 + Math.abs(velocity) * 6);
      const width = m.el.scrollWidth / (m.el.children.length || 1);
      let x = m.dir * (progress * width * m.speed * 2.2) - (m.auto ? m.offset % width : 0);
      if (m.dir < 0 && !m.auto) x -= width * 0.15;
      if (m.dir > 0) x -= width * 1.1;
      m.el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    });

    // parallax backgrounds
    if (!reduce) {
      parallax.forEach(({ el, f }) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        el.style.transform = `translate3d(0,${(-r.top * f).toFixed(1)}px,0)`;
      });
      pImgs.forEach((img) => {
        const box = img.parentElement;
        if (!box.classList.contains('is-in')) return;
        const r = box.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        img.style.transform = `translate3d(0,${(p * -9).toFixed(2)}%,0)`;
      });
    }

    // horizontal pinned gallery
    if (hs && hsTrack && window.innerWidth > 0) {
      const r = hs.getBoundingClientRect();
      const dist = hs.offsetHeight - vh;
      const p = dist > 0 ? clamp(-r.top / dist, 0, 1) : 0;
      const extra = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
      hsTrack.style.transform = `translate3d(${(-p * extra).toFixed(1)}px,0,0)`;
      hsBar.style.transform = `scaleX(${p})`;
    }

    // hero: shapes rise at different depths, content drifts and fades
    if (y < vh * 1.2 && !reduce) {
      heroShapes.forEach((sh) => sh.style.setProperty('--sy', `${(-y * +sh.dataset.depth).toFixed(1)}px`));
      if (heroCenter) {
        const p = clamp(y / (vh * 0.8), 0, 1);
        heroCenter.style.transform = `translate3d(0,${(y * 0.25).toFixed(1)}px,0) scale(${(1 - p * 0.06).toFixed(3)})`;
        heroCenter.style.opacity = (1 - p * 1.1).toFixed(3);
      }
    }

    // pill state + active section
    pill.classList.toggle('is-scrolled', y > vh * 0.6);
    let current = null;
    sections.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < vh * 0.5 && r.bottom > vh * 0.5) current = s.dataset.section; });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === current));

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ---------- Anchor links ---------- */
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id.length > 1 && $(id);
    if (!target) return;
    e.preventDefault(); closeMenu(); scrollToTarget(target);
  }));
  $('[data-to-top]').addEventListener('click', () => scrollToTarget(0));

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('[data-menu]');
  const menu = $('[data-menu-panel]');
  const closeMenu = () => { menu.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); };
  menuBtn.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  });

  /* ---------- Chat prompt ---------- */
  const chat = $('[data-chat-panel]');
  $('[data-chat]').addEventListener('click', () => chat.classList.toggle('is-open'));
  $('[data-chat-close]').addEventListener('click', () => chat.classList.remove('is-open'));
  if (window.innerWidth > 860) setTimeout(() => { if (!sessionStorageSafe('chatSeen')) chat.classList.add('is-open'); }, 6000);
  function sessionStorageSafe(k) {
    try { const v = sessionStorage.getItem(k); sessionStorage.setItem(k, '1'); return v; } catch { return null; }
  }

  /* ---------- Video lightbox ---------- */
  const lb = $('[data-lightbox]');
  const vid = $('video', lb);
  const lock = (on) => { document.body.style.overflow = on ? 'hidden' : ''; if (lenis) on ? lenis.stop() : lenis.start(); };
  $$('[data-video]').forEach((b) => b.addEventListener('click', () => {
    vid.src = b.dataset.video; lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lock(true);
    vid.play().catch(() => {});
  }));
  const closeLb = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); vid.pause(); lock(false); };
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('[data-close]')) closeLb(); });

  /* ---------- Org modal ---------- */
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => {
    const m = $(`[data-modal="${b.dataset.open}"]`);
    m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); lock(true);
  }));
  $$('[data-modal]').forEach((m) => m.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) { m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); lock(false); }
  }));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('is-open')) closeLb();
    $$('[data-modal].is-open').forEach((m) => { m.classList.remove('is-open'); lock(false); });
    closeMenu(); chat.classList.remove('is-open');
  });

  /* ---------- Cursor dot ---------- */
  const dot = $('.cursor-dot');
  if (matchMedia('(hover:hover)').matches && !reduce) {
    let mx = 0, my = 0, dx = 0, dy = 0;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.classList.add('is-on'); });
    addEventListener('mouseover', (e) => dot.classList.toggle('is-hover', !!e.target.closest('a,button,.aud,.sit')));
    document.addEventListener('mouseleave', () => dot.classList.remove('is-on'));
    const follow = () => { dx = lerp(dx, mx, 0.2); dy = lerp(dy, my, 0.2); dot.style.left = dx + 'px'; dot.style.top = dy + 'px'; requestAnimationFrame(follow); };
    follow();
  }
})();
