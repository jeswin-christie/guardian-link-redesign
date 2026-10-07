/* ==========================================================================
   myGuardianLink — opening scene

   The logo and headline rise in, hold for a moment, and the two doors part
   on their own onto the hero; then the scene removes itself entirely. The
   page is held at scroll 0 underneath the whole time, so what the doors
   reveal is the real hero, exactly where it will stay.

   There is no button: the ENTER CTA was removed at the user's request
   (2026-09-13). A visitor who doesn't want to wait can scroll, swipe, tap
   or press any key, and the doors open at once.

   It plays on every page load, refreshes included; see the inline gate
   script in app/layout.tsx for the one exception.

   If this script never runs, the watchdog in app/layout.tsx takes the scene
   away after 3s and the page is simply itself.
   ========================================================================== */

import { onLoad } from './on-load';

export function initIntro() {
  'use strict';

  var gate = document.querySelector('.gate');
  if (!gate) return;

  var doc = document.documentElement;

  // The inline script in <head> decided this visitor arrived on a #section
  // link from elsewhere and asked for that section. Nothing to do.
  if (!doc.classList.contains('gate-on')) {
    gate.hidden = true;
    return;
  }

  // Tells the watchdog something is here to open the scene.
  window.__gateReady = true;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var opened = false;

  // How long the scene holds before the doors part, in ms. Long enough for
  // the rise-in (styles/intro.css, ~1.4s) to land and be read. Without motion
  // there is no rise-in to wait for, so it holds a little less.
  var HOLD = reduce ? 1600 : 2200;

  /* ------------------------------------------------------------------
     1. HOLD THE PAGE
     Browsers restore the last scroll offset on reload, which would leave
     the hero half off-screen when the doors part.
     ------------------------------------------------------------------ */

  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // Some browsers restore the offset again after their own load handler has
  // run — on a refresh especially. Park it back at the top until it opens.
  onLoad(function () {
    if (!opened) window.scrollTo(0, 0);
  });

  // The page behind is out of reach while the scene is up: not tabbable, not
  // read out. Everything but the scene itself and scripts — and the phone
  // dock, whose inert state lib/behaviour/main.js owns; handing it back here would make
  // the dock tabbable while it is still hidden off-screen.
  var behind = Array.prototype.filter.call(document.body.children, function (el) {
    return el !== gate && el.tagName !== 'SCRIPT' && !el.hasAttribute('data-dock');
  });
  behind.forEach(function (el) { el.inert = true; });

  /* ------------------------------------------------------------------
     2. OPEN
     ------------------------------------------------------------------ */

  function open() {
    if (opened) return;
    opened = true;
    clearTimeout(timer);

    behind.forEach(function (el) { el.inert = false; });
    gate.classList.add('is-open');

    window.removeEventListener('wheel', onWheel, true);
    window.removeEventListener('touchstart', onTouchStart, true);
    window.removeEventListener('touchmove', onTouchMove, true);
    window.removeEventListener('keydown', onKey);
    gate.removeEventListener('click', open);

    if (reduce) {
      finish();
      return;
    }

    // Finish when the second door has travelled; the timeout covers a
    // transitionend that never fires (a backgrounded tab, for one).
    var door = gate.querySelector('.gate__door--r');
    var fallback = setTimeout(finish, 1600);
    door.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'transform') return;
      door.removeEventListener('transitionend', handler);
      clearTimeout(fallback);
      finish();
    });
  }

  function finish() {
    gate.hidden = true;
    doc.classList.remove('gate-on');

    // Toggling overflow on <html> can leave a sticky header mis-measured on
    // some mobile browsers; reading layout forces the recalculation.
    void document.body.offsetHeight;

    // Hand keyboard and screen-reader focus to the page, at the hero.
    var main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------
     3. TIMING AND INPUT
     The doors open on their own after HOLD. A wheel flick, an upward
     swipe, a tap or click anywhere, or any key opens them sooner.
     ------------------------------------------------------------------ */

  var timer = setTimeout(open, HOLD);

  var wheelSum = 0;
  function onWheel(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.deltaY > 0) wheelSum += e.deltaY;
    if (wheelSum > 60) open();
  }

  var touchY = 0;
  function onTouchStart(e) { touchY = e.touches[0].clientY; }
  function onTouchMove(e) {
    e.preventDefault();
    if (touchY - e.touches[0].clientY > 40) open();
  }

  function onKey(e) {
    // Tab is left alone so focus lands in the page once it is handed back.
    if (e.key !== 'Tab') e.preventDefault();
    open();
  }

  window.addEventListener('wheel', onWheel, { passive: false, capture: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
  window.addEventListener('keydown', onKey);
  gate.addEventListener('click', open);
}
