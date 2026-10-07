/* ==========================================================================
   myGuardianLink — motion layer (behaviour)

   Pairs with styles/motion.css. Switches the layer on, adds its decorative
   pieces (lines, rings — all aria-hidden, no text), and drives what CSS
   alone cannot: the hero's cue from the opening scene, the scroll-drawn
   lines in How It Works and Family Setup, a very light image parallax,
   the Parent Plan card's hover tilt, and the FAQ's smooth open and close.

   Does nothing at all for a visitor who prefers reduced motion, and hands
   the still page back if they switch it on mid-visit. The page's own
   reveal (lib/behaviour/main.js, [data-reveal] → .is-in) is left as it is; this
   layer only choreographs what happens inside those blocks.

   To remove the layer: drop initMotion() from components/PageScripts.tsx
   and the motion.css import from app/layout.tsx.
   ========================================================================== */

import { onLoad } from './on-load';

export function initMotion() {
  'use strict';

  var doc = document.documentElement;
  var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  if (reduceQuery && reduceQuery.matches) return;
  if (!('IntersectionObserver' in window) || !window.requestAnimationFrame) return;

  doc.classList.add('motion-on');

  // Every hidden or moving state in styles/motion.css hangs off .motion-on, so
  // dropping it gives the still page back at once.
  var stopMotion = function (e) { if (e.matches) doc.classList.remove('motion-on'); };
  if (reduceQuery) {
    if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', stopMotion);
    else if (reduceQuery.addListener) reduceQuery.addListener(stopMotion);
  }
  var moving = function () { return doc.classList.contains('motion-on'); };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var clamp = function (v) { return v < 0 ? 0 : (v > 1 ? 1 : v); };
  var soft = function (v) { return v * v * (3 - 2 * v); };   // smoothstep
  var smoother = function (v) { return v * v * v * (v * (v * 6 - 15) + 10); };
  var mix = function (a, b, t) { return a + (b - a) * t; };

  // A decorative span, optionally holding `rings` empty spans.
  function deco(parent, cls, rings) {
    var el = document.createElement('span');
    el.className = cls;
    el.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < (rings || 0); i++) el.appendChild(document.createElement('span'));
    parent.appendChild(el);
    return el;
  }

  // --i on list items drives their stagger in styles/motion.css.
  function index(list) { list.forEach(function (el, i) { el.style.setProperty('--i', i); }); }
  index($$('.hero__features > li'));
  index($$('.proof__item'));
  index($$('.herlink .points > li'));
  index($$('.plan-card .checks > li'));
  index($$('.faq__list > .faq__item'));

  /* ------------------------------------------------------------------
     1. HERO — cued by the opening scene
     The copy rises as the doors part. No scene (a #section arrival):
     it rises straight away. The timeout is a safety catch in case the
     scene is taken away by app/layout.tsx's watchdog instead.
     ------------------------------------------------------------------ */

  var hero = $('.hero');
  var gate = $('.gate');
  var heroIn = function () { if (hero) hero.classList.add('m-in'); };

  if (hero && gate && !gate.hidden && doc.classList.contains('gate-on')) {
    var watchGate = new MutationObserver(function () {
      if (gate.classList.contains('is-open') || gate.hidden || !doc.classList.contains('gate-on')) {
        watchGate.disconnect();
        heroIn();
      }
    });
    watchGate.observe(gate, { attributes: true, attributeFilter: ['class', 'hidden'] });
    watchGate.observe(doc, { attributes: true, attributeFilter: ['class'] });
    setTimeout(heroIn, 5000);
  } else {
    requestAnimationFrame(function () { requestAnimationFrame(heroIn); });
  }

  /* ------------------------------------------------------------------
     2. IN VIEW
     .m-in once, for pieces the page's own reveal doesn't cover;
     .m-live while on screen, so looping signals rest when out of sight.
     ------------------------------------------------------------------ */

  var once = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('m-in');
      once.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  var live = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle('m-live', e.isIntersecting); });
  });

  var proof = $('.proof__list');
  if (proof) once.observe(proof);
  $$('.nine').forEach(function (el) { live.observe(el); });

  /* ------------------------------------------------------------------
     3. DECORATIVE PIECES
     ------------------------------------------------------------------ */

  // Her link: the thread through the points.
  var points = $('.herlink .points');
  var thread = points ? deco(points, 'm-thread') : null;
  var herMedia = $('.herlink__media');
  var herCopy = $('.herlink__copy');

  // 911: the radar.
  var nine = $('.nine');
  if (nine) deco(nine, 'm-radar', 3);

  // Family setup: the steps light in turn, and nothing more — its drawn
  // lines were removed at the user's request (2026-09-14).
  var setupList = $('.setup__steps');
  var setupSteps = $$('.setup__steps > .setup__step');

  var howList = $('.steps');
  var howSteps = $$('.steps > .step');

  // Places the pieces that follow the page's own geometry. Offsets, not
  // bounding boxes, so the reveals' transforms don't skew them.
  function layout() {
    if (thread) {
      var lis = $$('.points > li', herCopy || document);
      var first = lis[0];
      var last = lis[lis.length - 1];
      if (first && last && first !== last) {
        var fs = parseFloat(getComputedStyle(first).fontSize) || 18;
        var dot = fs * 0.55 + 5.5;               // the dot's centre, per styles.css
        thread.style.top = (first.offsetTop + dot) + 'px';
        thread.style.height = (last.offsetTop - first.offsetTop) + 'px';
      }
    }

    // Family Setup: a step's place in its row (desktop: all four in one;
    // tablet: two by two; phones: one each) sets how long it waits to
    // light after the step to its left.
    setupSteps.forEach(function (s, i) {
      var col = 0;
      for (var j = 0; j < i; j++) if (setupSteps[j].offsetTop === s.offsetTop) col++;
      s.style.setProperty('--m-delay', (col * 0.12).toFixed(2) + 's');
    });
  }

  /* ------------------------------------------------------------------
     4. SCROLL: the drawn lines, and parallax
     How It Works: the list's progress runs 0 → 1 from its top reaching
     the lower edge of the screen to its foot passing a little above the
     middle. With n steps, step i lights at progress i/n and the line
     after it draws until the next one lights.
     Family Setup: each step lights as its own top comes a little way up
     into the screen (SETUP_LIGHT_AT), so nothing on screen is left dim —
     the tall download card of step 4 included, which on desktop sits
     beside step 1 (user, 2026-09-14: it lit only after scrolling past
     it). Steps sharing a row light together, each a beat after the one
     to its left (--m-delay, set in layout()): a cascade in time, never a
     later trigger in scroll. No drawn lines in this section (removed at
     the user's request, 2026-09-14).
     One way, both: kept at the furthest reached.
     ------------------------------------------------------------------ */

  var furthestHow = 0;
  var SETUP_LIGHT_AT = 0.85;       // share of the screen's height, from the top

  function progress(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    return clamp((vh * 0.95 - r.top) / (r.height + vh * 0.4));
  }

  function scrub() {
    if (howList && howSteps.length) {
      furthestHow = Math.max(furthestHow, progress(howList));
      var p = furthestHow * howSteps.length;
      howSteps.forEach(function (s, i) {
        if (furthestHow > 0 && p >= i) s.classList.add('m-active');
        s.style.setProperty('--m-draw', (clamp(p - i) * 100).toFixed(1) + '%');
      });
    }

    if (setupList && setupSteps.length) {
      var vh = window.innerHeight;
      var line = vh * SETUP_LIGHT_AT;
      // Where each step's top is on screen, from offsets, so a step still
      // sliding in (styles/motion.css) doesn't shift its own trigger.
      var base = setupList.getBoundingClientRect().top;
      var tops = setupSteps.map(function (s) { return base + s.offsetTop; });
      setupSteps.forEach(function (s, i) {
        if (line - tops[i] >= 0) s.classList.add('m-active');
      });
    }
  }

  // The images sit a few percent oversize (styles/motion.css) and drift less
  // than the page scrolls: k is the drift, as a share of the frame's height.
  var layers = [];
  var heroImg = $('.hero__media img');
  if (heroImg) layers.push({ box: $('.hero__media'), img: heroImg, k: 0.02 });
  var herImg = $('.herlink__media img');
  if (herImg && herMedia) layers.push({ box: herMedia, img: herImg, k: 0.035 });

  function parallax(glide) {
    var vh = window.innerHeight;
    var busy = false;
    layers.forEach(function (l) {
      if (l.img === heroImg && pin.on) return;   // the hero transition owns it
      var r = l.box.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      var rel = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      rel = Math.max(-1, Math.min(1, rel));
      var target = rel * r.height * l.k;
      // Glides toward its place, as the hero does, rather than stepping
      // with each notch of the wheel.
      l.cur = l.cur === undefined ? target : l.cur + (target - l.cur) * glide;
      if (Math.abs(target - l.cur) < 0.05) l.cur = target; else busy = true;
      l.img.style.translate = '0 ' + l.cur.toFixed(2) + 'px';
    });
    return busy;
  }

  /* ------------------------------------------------------------------
     4b. HERO SCROLL TRANSITION — desktop
     The hero holds under the header (sticky, styles/motion.css 2b) while the
     page scrolls about a screen and a half, and plays in stages: the copy
     steps back; the photo widens from the right until it fills the hero,
     which fills the screen; a navy shade gathers over its left side and
     the brand tagline writes itself in there, left to right. It holds,
     then the hero lets go and scrolls away, the trust strip following
     straight on. Everything is read from the scroll position: scroll
     back and it reverses.
     Geometry, not scale: the photo's box is resized and object-fit: cover
     re-crops it, so it is never stretched. 1024px and wider only; phones
     and tablets keep the page's own hero, where START FREE must stay in
     first view.
     ------------------------------------------------------------------ */

  var heroMedia = $('.hero__media');
  var heroCopy = $('.hero__copy');
  var heroArc = $('.hero__arc');
  var header = $('.header');
  var pin = { on: false, start: 0, dist: 1, W: 0, H: 0, r0: null, rx: 0, ry: 0 };
  var shown = 0;
  var track = null;

  // The hero's scroll track: its height is the hero plus the distance the
  // transition plays over, which is what lets the sticky hero hold.
  if (hero && heroMedia && heroCopy) {
    track = document.createElement('div');
    track.className = 'm-hero-track';
    hero.parentNode.insertBefore(track, hero);
    track.appendChild(hero);
  }

  // The heading that writes itself in where the copy was. Words already on
  // the page (the brand tagline), so screen readers skip this copy of it.
  // To change the words, change them here.
  var REVEAL_LINES = ['Get connected.', 'Stay protected.'];
  var reveal = null;
  var revealLines = [];
  var revealRule = null;

  if (track) {
    reveal = document.createElement('div');
    reveal.className = 'm-hero-reveal';
    reveal.setAttribute('aria-hidden', 'true');
    REVEAL_LINES.forEach(function (text, i) {
      var line = document.createElement('p');
      line.className = 'm-hero-reveal__line' + (i ? ' m-hero-reveal__line--accent' : '');
      line.textContent = text;
      reveal.appendChild(line);
      revealLines.push(line);
    });
    revealRule = document.createElement('span');
    revealRule.className = 'm-hero-reveal__rule';
    reveal.appendChild(revealRule);
    hero.appendChild(reveal);
  }

  // A navy shade over the photo's left side, so the tagline reads on it.
  var scrim = null;
  if (track) {
    scrim = document.createElement('span');
    scrim.className = 'm-hero-scrim';
    scrim.setAttribute('aria-hidden', 'true');
    heroMedia.appendChild(scrim);
  }

  function clearHero() {
    if (!track) return;
    ['left', 'top', 'right', 'bottom', 'width', 'height', 'borderBottomLeftRadius']
      .forEach(function (k) { heroMedia.style[k] = ''; });
    heroCopy.style.opacity = '';
    heroCopy.style.transform = '';
    heroCopy.style.visibility = '';
    if (heroArc) heroArc.style.opacity = '';
    revealLines.forEach(function (line) {
      line.style.opacity = '';
      line.style.clipPath = '';
      line.style.transform = '';
    });
    if (revealRule) revealRule.style.transform = '';
    if (scrim) scrim.style.opacity = '';
    if (reveal) reveal.style.marginTop = '';
    if (header) {
      header.style.transform = '';
      header.style.visibility = '';
    }
  }

  function pinTarget() {
    return clamp((window.pageYOffset - pin.start) / pin.dist);
  }

  // Where each part is at scroll progress p (0 to 1). Staged so one thing
  // leads at a time: the copy steps back (0 - 0.35); the photo widens to
  // fill the hero (0.05 - 0.6); the shade gathers (0.3 - 0.65); the tagline
  // writes itself in, line by line (0.5 - 0.9); the rest holds.
  function applyHero(p) {
    if (p <= 0.0005) { clearHero(); return; }  // at rest: the page's own hero

    var e = smoother(clamp((p - 0.05) / 0.55));
    var a = pin.r0;
    var b = pin.r1;
    var s = heroMedia.style;

    // The navigation steps aside for the transition: it slides up as the
    // photo starts to open, the photo rising into the space it leaves, and
    // it comes back for the last of the hold, just before the page moves on.
    var away = soft(clamp(p / 0.12)) * (1 - soft(clamp((p - 0.92) / 0.08)));
    var ext = (pin.lift || 0) * away;
    if (header) {
      header.style.transform = away > 0.001 ? 'translateY(' + (-100 * away).toFixed(2) + '%)' : '';
      header.style.visibility = away >= 0.999 ? 'hidden' : '';
    }

    s.right = 'auto';
    s.bottom = 'auto';
    s.left = mix(a.x, b.x, e).toFixed(2) + 'px';
    s.top = (mix(a.y, b.y, e) - ext).toFixed(2) + 'px';
    s.width = mix(a.w, b.w, e).toFixed(2) + 'px';
    s.height = (mix(a.h, b.h, e) + ext).toFixed(2) + 'px';
    s.borderBottomLeftRadius = (pin.rx * (1 - e)).toFixed(1) + 'px ' + (pin.ry * (1 - e)).toFixed(1) + 'px';

    // The copy steps back; once fully faded it is hidden, so nothing
    // invisible stays clickable or tabbable.
    var fade = soft(clamp(p / 0.35));
    heroCopy.style.opacity = (1 - fade).toFixed(3);
    heroCopy.style.transform = 'translateX(' + (-28 * fade).toFixed(1) + 'px)';
    heroCopy.style.visibility = fade >= 1 ? 'hidden' : '';
    if (heroArc) heroArc.style.opacity = (1 - soft(clamp(p / 0.25))).toFixed(3);
    if (scrim) scrim.style.opacity = soft(clamp((p - 0.3) / 0.35)).toFixed(3);

    // Each line is uncovered left to right as it glides in from the left.
    revealLines.forEach(function (line, i) {
      var r = soft(clamp((p - 0.5 - i * 0.1) / 0.28));
      line.style.opacity = Math.min(1, r * 2).toFixed(3);
      line.style.clipPath = 'inset(-12% ' + ((1 - r) * 100).toFixed(2) + '% -12% 0)';
      line.style.transform = 'translateX(' + (-48 * (1 - r)).toFixed(1) + 'px)';
    });
    if (revealRule) {
      revealRule.style.transform = 'scaleX(' + soft(clamp((p - 0.74) / 0.16)).toFixed(3) + ')';
    }
    if (reveal) reveal.style.marginTop = (-ext / 2).toFixed(1) + 'px';
  }

  function layoutPin() {
    if (!track) return;
    clearHero();
    track.style.height = '';
    pin.on = false;

    var wide = moving() && window.innerWidth >= 1024;
    doc.classList.toggle('m-hero-pin', wide);
    if (!wide) return;

    var headH = header ? header.offsetHeight : 0;
    hero.style.removeProperty('--m-hero-top');
    var heroH = hero.offsetHeight;

    // Where the hero holds. Normally right under the header. On a short
    // screen (a laptop with display scaling) the hero is taller than the
    // space under the header, so it holds once its foot meets the foot of
    // the screen instead: its top slides under the header only after the
    // scroll has begun and the copy is already fading. At rest, nothing is
    // hidden that the page's own layout shows.
    var stickTop = Math.min(headH, window.innerHeight - heroH);
    if (stickTop < -headH) {                 // far taller than the screen: leave it be
      doc.classList.remove('m-hero-pin');
      return;
    }
    hero.style.setProperty('--m-hero-top', stickTop + 'px');
    // How far the photo rises when the navigation steps aside: up to the
    // top of the screen, from wherever the hero holds.
    pin.lift = Math.max(0, stickTop);

    pin.on = true;
    pin.dist = Math.round(window.innerHeight * 1.6);
    pin.W = hero.clientWidth;
    pin.H = heroH;

    // Nothing moves until the whole hero is on screen and has sat still a
    // moment: on a short screen the buttons and fine print start below the
    // fold, and scrolling down to reach them must not fade them away. So
    // the transition starts where the hero comes to hold (its foot at the
    // foot of the screen) plus a short still stretch of scroll.
    var still = Math.round(window.innerHeight * 0.15);
    var trackTop = track.getBoundingClientRect().top + window.pageYOffset;
    track.style.height = (heroH + still + pin.dist) + 'px';
    pin.start = trackTop - stickTop + still;
    pin.r0 = { x: heroMedia.offsetLeft, y: heroMedia.offsetTop, w: heroMedia.offsetWidth, h: heroMedia.offsetHeight };
    var radius = getComputedStyle(heroMedia).borderBottomLeftRadius.split(' ');
    pin.rx = parseFloat(radius[0]) || 0;
    pin.ry = parseFloat(radius[1] || radius[0]) || 0;
    if (heroImg) heroImg.style.translate = '';

    // The photo's end frame: the whole hero, which fills the screen.
    pin.r1 = { x: 0, y: 0, w: pin.W, h: heroH };

    // The heading starts where the copy starts and keeps to the shaded
    // left of the photo: if that room is narrow, the type steps down.
    if (reveal) {
      var left = heroCopy.offsetLeft;
      var room = pin.W * 0.58 - left;
      reveal.style.setProperty('--m-reveal-left', left + 'px');
      reveal.style.fontSize = '';
      var widest = Math.max.apply(null, revealLines.map(function (l) { return l.offsetWidth; }));
      if (widest > room && widest > 0) {
        reveal.style.fontSize = (parseFloat(getComputedStyle(reveal).fontSize) * room / widest).toFixed(1) + 'px';
      }
    }

    shown = pinTarget();
    applyHero(shown);
  }

  // Everything scroll-linked is eased toward the scroll position rather
  // than snapped to it, so a mouse wheel's steps become one continuous
  // glide. Timed, not counted in frames — the same ~200ms settle on a 60Hz
  // or a 120Hz screen — with a small floor per frame so it can never stall
  // if the clock between frames reads as zero.
  var GLIDE_MS = 200;

  // True while still catching up, so the loop asks for another frame.
  function heroFrame(glide) {
    if (!pin.on) return false;
    var target = pinTarget();
    shown += (target - shown) * glide;
    if (Math.abs(target - shown) < 0.0005) shown = target;
    applyHero(shown);
    return shown !== target;
  }

  var queued = false;
  var lastTick = 0;
  function frame() {
    queued = false;
    var now = window.performance ? performance.now() : Date.now();
    var dt = lastTick ? now - lastTick : 16;
    var glide = Math.max(0.035, 1 - Math.exp(-dt / GLIDE_MS));
    scrub();
    var busy = parallax(glide);
    if (heroFrame(glide)) busy = true;
    // Settled: the next scroll starts a fresh glide from a normal frame step.
    lastTick = busy ? now : 0;
    if (busy) queue();
  }
  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(frame);
  }

  function relayout() { layout(); layoutPin(); queue(); }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', relayout);
  onLoad(relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  if (reduceQuery && reduceQuery.addEventListener) reduceQuery.addEventListener('change', relayout);
  layout();
  layoutPin();
  frame();

  /* ------------------------------------------------------------------
     5. PARENT PLAN — a quiet lift and tilt under a mouse pointer
     ------------------------------------------------------------------ */

  var card = $('.plan-card');
  var mouse = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (card && mouse) {
    var resetTilt = function () {
      card.classList.remove('m-hover');
      card.style.setProperty('--m-rx', '0deg');
      card.style.setProperty('--m-ry', '0deg');
    };
    card.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse') card.classList.add('m-hover');
    });
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--m-rx', (-y * 2.4).toFixed(2) + 'deg');
      card.style.setProperty('--m-ry', (x * 3).toFixed(2) + 'deg');
    });
    card.addEventListener('pointerleave', resetTilt);
  }

  /* ------------------------------------------------------------------
     6. FAQ — smooth open and close
     The <details> element keeps its native meaning and keyboard use; only
     the change of height is animated. Padding travels with the height so
     the answer grows from nothing rather than from its bottom padding.
     ------------------------------------------------------------------ */

  $$('.faq__item').forEach(function (item) {
    var summary = $('summary', item);
    var body = $('.faq__a', item);
    if (!summary || !body || !body.animate) return;
    var anim = null;

    summary.addEventListener('click', function (e) {
      if (!moving()) return;                    // reduced motion: the native toggle
      e.preventDefault();
      if (anim) return;

      var closing = item.open;
      body.style.overflow = 'hidden';

      if (!closing) {
        item.open = true;
        var pb = getComputedStyle(body).paddingBottom;
        anim = body.animate([
          { height: '0px', paddingBottom: '0px', opacity: 0 },
          { height: body.scrollHeight + 'px', paddingBottom: pb, opacity: 1 }
        ], { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      } else {
        item.classList.add('m-closing');
        var pbc = getComputedStyle(body).paddingBottom;
        anim = body.animate([
          { height: body.offsetHeight + 'px', paddingBottom: pbc, opacity: 1 },
          { height: '0px', paddingBottom: '0px', opacity: 0 }
        ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
      }

      // Runs once, from whichever comes first: the animation's own finish,
      // or the safety catch below — as lib/behaviour/intro.js has for its doors — in
      // case the finish event never comes (a stalled animation clock). The
      // answer is never left half-open, nor the question unclickable.
      var finished = false;
      var done = function () {
        if (finished) return;
        finished = true;
        clearTimeout(guard);
        if (anim) {
          anim.onfinish = anim.oncancel = null;
          anim.cancel();                         // fill: none — no visual change
        }
        if (closing) {
          item.open = false;
          item.classList.remove('m-closing');
        }
        body.style.overflow = '';
        anim = null;
        queue();
      };
      var guard = setTimeout(done, (closing ? 400 : 520) + 150);
      anim.onfinish = anim.oncancel = done;
    });
  });
}
