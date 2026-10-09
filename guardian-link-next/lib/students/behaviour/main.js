/* ==========================================================================
   myGuardianLink — page behaviour
   Launch settings, ad attribution, conversion tracking, "no tails" line
   breaking, scroll reveal, the phone START FREE dock and smooth anchors.
   No dependencies; the page reads correctly without any of it.
   ========================================================================== */

import { onLoad } from './on-load';

// page: 'landing' (the campaign page) or 'guide' (/guide). Everything below
// is shared; only the page-view event differs.
export function initMain(page) {
  'use strict';

  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* ------------------------------------------------------------------
     1. LAUNCH SETTINGS
     The defaults below are live. To change a destination, set the
     environment variable (.env.local, or the host's settings) and every
     matching button follows; see env.example.txt.
     ------------------------------------------------------------------ */

  // Every START FREE (data-cta="start") goes here (the links' own href is the
  // same URL, so they still work if this script never runs).
  // Every START FREE (data-cta="start") goes here. One destination for all
  // of them (company feedback 8). Since 2026-10-06 (user request) it is the
  // member portal's login page, the one the main site's login button uses;
  // set the variable to send them to a dedicated checkout instead.
  var START_FREE_URL = process.env.NEXT_PUBLIC_START_FREE_URL || 'https://portal.myguardianlink.com/login';

  // The QR code in setup step 4's download card (data-cta="portal") goes
  // here when tapped — the phones' route, as a phone can't scan its own
  // screen. Unset, it keeps its own link (the same one the QR encodes):
  // https://portal.myguardianlink.com/app?group=PARENTPLAN
  var PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || '';

  // Meta Pixel ID, from Events Manager. Empty: no pixel loads, and events
  // still reach window.dataLayer for GTM / GHL.
  var META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

  /* ------------------------------------------------------------------
     2. AD ATTRIBUTION
     The ad's utm_* and fbclid parameters travel on to checkout and the
     portal, so GHL can credit the purchase to the ad that brought it.
     Kept for the visit in sessionStorage, in case the address loses them.
     ------------------------------------------------------------------ */

  var ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid'];
  var attribution = {};

  try {
    var query = new URLSearchParams(window.location.search);
    ATTRIBUTION_KEYS.forEach(function (k) {
      var v = query.get(k);
      if (v) attribution[k] = v;
    });
    if (Object.keys(attribution).length) {
      sessionStorage.setItem('mgl_attribution', JSON.stringify(attribution));
    } else {
      attribution = JSON.parse(sessionStorage.getItem('mgl_attribution') || '{}') || {};
    }
  } catch (e) { /* storage blocked: the address alone still carries them */ }

  function withAttribution(url) {
    try {
      var u = new URL(url, window.location.href);
      Object.keys(attribution).forEach(function (k) {
        if (!u.searchParams.has(k)) u.searchParams.set(k, attribution[k]);
      });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function pointAll(selector, url) {
    if (!url) return;
    each(document.querySelectorAll(selector), function (a) { a.href = withAttribution(url); });
  }

  pointAll('[data-cta="start"]', START_FREE_URL);
  pointAll('[data-cta="portal"]', PORTAL_URL);

  /* ------------------------------------------------------------------
     3. CONVERSION TRACKING (company feedback 10)
     The funnel:  Landing Page View → Video View → CTA Click →
                  Checkout Start → Purchase → Group Plan Activation
     This page fires the first three. Checkout Start and Purchase belong
     on the checkout (GHL) page, Group Plan Activation on the app's
     backend — see README, "Conversion tracking".
     Each event is pushed to window.dataLayer and, once META_PIXEL_ID is
     set, sent to the Meta Pixel with the same event_id, so a matching
     Conversions API event can be de-duplicated against it.
     ------------------------------------------------------------------ */

  window.dataLayer = window.dataLayer || [];

  if (META_PIXEL_ID && !window.fbq) {
    // Meta's standard Pixel base code.
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID);
  }

  function newEventId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  // name: the dataLayer event. pixel: [fbq method, Meta event name].
  function track(name, pixel, params) {
    params = params || {};
    var id = newEventId();

    var payload = { event: name, event_id: id };
    Object.keys(params).forEach(function (k) { payload[k] = params[k]; });
    Object.keys(attribution).forEach(function (k) { payload[k] = attribution[k]; });
    window.dataLayer.push(payload);

    if (window.fbq && pixel) window.fbq(pixel[0], pixel[1], params, { eventID: id });
  }

  // Which part of the page a button sits in: header, hero, demo, plan…
  function placeOf(el) {
    if (el.closest('[data-dock]')) return 'dock';
    if (el.closest('.header')) return 'header';
    var host = el.closest('section, aside');
    if (!host) return 'page';
    return host.id || host.classList[0] || 'page';
  }

  if (page === 'guide') track('guide_page_view', ['track', 'PageView']);
  else track('landing_page_view', ['track', 'PageView']);

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;

    if (el.matches('[data-cta="start"]')) {
      track('cta_click', ['trackCustom', 'StartFreeClick'], { cta_location: placeOf(el) });
    } else if (el.matches('[data-track="video"]')) {
      // A click on the poster for now; with a real player, fire on play.
      track('video_view', ['trackCustom', 'VideoView'], { video: '1-minute overview' });
    } else if (el.matches('a[href="#demo"]')) {
      track('demo_click', ['trackCustom', 'SeeProtectionClick'], { cta_location: placeOf(el) });
    } else if (el.matches('[data-cta="portal"]')) {
      track('portal_click', ['trackCustom', 'PortalClick']);
    }
  });

  /* ------------------------------------------------------------------
     4. NO TAILS
     Brief item 9: no single word left alone on the last line. Headlines
     get this from CSS text-wrap: balance; paragraphs and list items get it
     here, by tying their last two words together with a no-break space.
     ------------------------------------------------------------------ */

  var SPACE = /\s/;

  function tieLastWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);

    var seenWord = false;
    for (var i = nodes.length - 1; i >= 0; i--) {
      var v = nodes[i].nodeValue;
      for (var j = v.length - 1; j >= 0; j--) {
        if (!SPACE.test(v.charAt(j))) { seenWord = true; continue; }
        if (!seenWord) continue;

        // Found the gap before the last word. Collapse the whole run of
        // whitespace (source indentation included) into one no-break space.
        var k = j;
        while (k > 0 && SPACE.test(v.charAt(k - 1))) k--;
        nodes[i].nodeValue = v.slice(0, k) + ' ' + v.slice(j + 1);
        return;
      }
    }
  }

  // Paragraph-sized copy only. Headings are left to CSS text-wrap: balance:
  // tying two long words together at display size can push them wider than
  // a phone. Not .hero__price either: it is a flex row of spans, and a
  // no-break space between them would become a stray flex item.
  each(document.querySelectorAll(
    'main p:not(.hero__price), main blockquote, main .points li, main .checks li'
  ), tieLastWords);

  /* ------------------------------------------------------------------
     4b. LINE-BY-LINE JUSTIFICATION — FAQ answers, phones
     User, 2026-09-15: the answers justified — flush on both edges — with
     words never split, no wide gaps or spread letters, and the same on
     every phone. The browser can't do that in a phone column (measured):
     it fills each line greedily, so a line cut short by a long word
     ("myGuardianLink", "traditional") is left with a hole that
     justification then has to stretch.
     So each answer is set here, as a typesetter would: the line breaks
     are chosen for the whole paragraph at once, so the leftover space is
     shared between the lines instead of piling up on one. Then each line
     is rebuilt as a block and given exactly the spacing that brings it
     flush — word gaps first (up to MAX_GAP spaces), then a hair of letter
     spacing (up to MAX_LETTER px); a line that still needs more (one with
     a long word like the brand name and only two gaps) goes to GAP_2 /
     LETTER_2 in a second round, and any rest is split between gaps and
     letters, so it never opens a single hole. Breaks fall only at spaces
     and after hyphens or dashes,
     never inside a word or at the no-break space that keeps the last two
     words together. The last line is left as it is. Same rule in every
     browser; without the script the answers are simply left-aligned.
     ------------------------------------------------------------------ */

  var LINE_SET = '.faq__a p';
  var MAX_GAP = 1.8;      // a word gap, in normal spaces, before letters take a share
  var MAX_LETTER = 0.6;   // px between letters (below what shows) before gaps take more
  var GAP_2 = 2.6;        // second round, for the few lines that need it
  var LETTER_2 = 1.2;
  var phoneView = window.matchMedia('(max-width: 719px)');
  var fontCtx = document.createElement('canvas').getContext('2d');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function setLines(p) {
    // Always start from the answer as written.
    if (p.dataset.lineSource === undefined) p.dataset.lineSource = p.innerHTML;
    else p.innerHTML = p.dataset.lineSource;
    p.classList.remove('is-lined');
    if (!phoneView.matches) return;
    var box = p.getBoundingClientRect();
    if (!box.width) return;   // not laid out (a closed answer): set when opened

    var cs = getComputedStyle(p);
    fontCtx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    var space = fontCtx.measureText(' ').width || 5;

    // Pieces in reading order, each with its natural width: words, split at
    // a hyphen or dash (a line may break after one: "30-" / "day"). An
    // element (the brand name) is kept whole. `space` is what came before
    // the piece: ' ' (a line may break there), ' ' (it may not) or ''.
    var pieces = [];
    var gap = '';
    var wraps = false;
    var gapSamples = [];
    each(p.childNodes, function (node) {
      if (node.nodeType === 3) {
        var re = /(\s+)|([\-–—]|[^\s\-–—]+)/g;
        var m;
        while ((m = re.exec(node.nodeValue))) {
          if (m[1]) { gap = / /.test(m[1]) ? ' ' : ' '; continue; }
          var range = document.createRange();
          range.setStart(node, m.index);
          range.setEnd(node, m.index + m[2].length);
          var r = range.getBoundingClientRect();
          pieces.push({ html: escapeHtml(m[2]), chars: m[2].length, space: gap, width: r.width,
                        left: r.left, right: r.right, top: r.top, dash: /^[\-–—]$/.test(m[2]) });
          gap = '';
        }
      } else if (node.nodeType === 1) {
        if (/\s/.test(node.textContent)) wraps = true;   // an element that could wrap inside itself
        var er = node.getBoundingClientRect();
        pieces.push({ html: node.outerHTML, chars: node.textContent.length, space: gap, width: er.width,
                      left: er.left, right: er.right, top: er.top, dash: false });
        gap = '';
      }
    });
    if (wraps || pieces.length < 2) return;

    // A space's real width, read from the page itself (the web font), with
    // the canvas measure as a fallback.
    for (var s = 1; s < pieces.length; s++) {
      var a0 = pieces[s - 1], b0 = pieces[s];
      if (b0.space && Math.abs(a0.top - b0.top) < 4 && b0.left > a0.right) gapSamples.push(b0.left - a0.right);
    }
    if (gapSamples.length) {
      gapSamples.sort(function (x, y) { return x - y; });
      space = gapSamples[Math.floor(gapSamples.length / 2)];
    }

    var n = pieces.length;
    var W = box.width - 2;   // 2px held back for sub-pixel rounding: a line never re-wraps

    function canBreak(i) {
      return i === 0 || i === n || pieces[i].space === ' ' || (!pieces[i].space && pieces[i - 1].dash);
    }
    function measure(a, b) {
      var width = 0, gaps = 0, chars = 0;
      for (var k = a; k < b; k++) {
        if (k > a && pieces[k].space) { width += space; gaps++; chars++; }
        width += pieces[k].width;
        chars += pieces[k].chars;
      }
      return { width: width, gaps: gaps, chars: chars };
    }
    // How loose a line would be, justified: its extra space per word gap,
    // in spaces, cubed — so one very loose line costs far more than several
    // slightly loose ones.
    function looseness(line) {
      var slack = W - line.width;
      var r = line.gaps ? slack / (line.gaps * space) : slack / Math.max(1, line.chars);
      return r * r * r + 0.5;   // + a little per line, so it adds none needlessly
    }

    // The cheapest set of breaks for the whole answer (the last line is free).
    var best = [0];
    var from = [0];
    for (var b = 1; b <= n; b++) {
      best[b] = Infinity;
      if (!canBreak(b)) continue;
      for (var a = b - 1; a >= 0; a--) {
        if (!canBreak(a) || best[a] === Infinity) continue;
        var line = measure(a, b);
        if (line.width > W && b - a > 1) break;   // too long, and longer from here back
        var cost = best[a] + (b === n ? 0 : looseness(line));
        if (cost < best[b]) { best[b] = cost; from[b] = a; }
      }
    }
    if (best[n] === Infinity) return;

    var cuts = [];
    for (var at = n; at > 0; at = from[at]) cuts.unshift(at);
    if (cuts.length < 2) return;

    var start = 0;
    var html = '';
    cuts.forEach(function (end, i) {
      var text = '';
      for (var k = start; k < end; k++) text += (k > start && pieces[k].space ? pieces[k].space : '') + pieces[k].html;
      var style = '';
      if (i < cuts.length - 1) {
        var line = measure(start, end);
        var slack = Math.max(0, W - line.width);
        // Filled in rounds, gaps then letters, each round a little wider,
        // so a line that must absorb a lot shares it out instead of opening
        // one hole.
        var gapAdd = 0;
        var letterAdd = 0;
        var rest = slack;
        var chars = Math.max(1, line.chars);
        [[MAX_GAP, MAX_LETTER], [GAP_2, LETTER_2]].forEach(function (cap) {
          if (line.gaps) {
            var g = Math.min(rest / line.gaps, (cap[0] - 1) * space - gapAdd);
            if (g > 0) { gapAdd += g; rest -= g * line.gaps; }
          }
          var l = Math.min(rest / chars, cap[1] - letterAdd);
          if (l > 0) { letterAdd += l; rest -= l * chars; }
        });
        // Whatever is left still goes in, split between the two, so every
        // line ends flush.
        if (rest > 0.01) {
          if (line.gaps) { gapAdd += rest / 2 / line.gaps; letterAdd += rest / 2 / chars; }
          else letterAdd += rest / chars;
        }
        style = ' style="word-spacing:' + gapAdd.toFixed(2) + 'px;letter-spacing:' + letterAdd.toFixed(2) + 'px"';
      }
      // Between lines, a space only where the text had one: a line that
      // ends "30-" runs straight on into "day", as written.
      if (i) html += pieces[start].space ? ' ' : '';
      html += '<span class="ln"' + style + '>' + text + '</span>';
      start = end;
    });

    p.innerHTML = html;
    p.classList.add('is-lined');
  }

  function setAllLines() { each(document.querySelectorAll(LINE_SET), setLines); }

  setAllLines();
  // Again once the web fonts are in (they change every line), on resize and
  // rotation, and for each answer as it opens.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setAllLines);
  onLoad(setAllLines);
  var linesTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(linesTimer);
    linesTimer = setTimeout(setAllLines, 150);
  });
  each(document.querySelectorAll('.faq__item'), function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) each(item.querySelectorAll(LINE_SET), setLines);
    });
  });



  /* ------------------------------------------------------------------
     5. SCROLL REVEAL
     ------------------------------------------------------------------ */

  var revealed = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    each(revealed, function (el) { io.observe(el); });
  } else {
    each(revealed, function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------
     6. PHONE DOCK
     Shown once the hero's START FREE has scrolled away, hidden again from
     the closing section to the end of the page, which carries its own
     START FREE. The CSS keeps it off desktop. Restored at the user's
     request (2026-09-14) after being removed the same day.
     ------------------------------------------------------------------ */

  var dock = document.querySelector('[data-dock]');
  var heroActions = document.querySelector('.hero .actions');
  var closing = document.querySelector('.final');

  // Read from where things are on screen, on every scroll, rather than from
  // IntersectionObserver crossings: a jump straight to a #section (an ad
  // link) never crosses the final CTA, so an observer would never report it
  // as reached.
  if (dock && heroActions && closing) {
    var queued = false;

    var setDock = function () {
      queued = false;
      // Scrolled past, not merely out of view: on a short screen (a phone
      // on its side) the hero's button starts below the fold, and the dock
      // would cover the headline before the visitor has seen it.
      var heroPassed = heroActions.getBoundingClientRect().bottom < 0;
      // Reached, not merely in view: once the final CTA is on screen or
      // above it, the rest of the page has its own button.
      var closingReached = closing.getBoundingClientRect().top < window.innerHeight;
      var show = heroPassed && !closingReached;
      dock.classList.toggle('is-shown', show);
      // Out of reach when out of sight: no tabbing to a hidden button.
      dock.inert = !show;
      dock.setAttribute('aria-hidden', show ? 'false' : 'true');
    };

    var queue = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(setDock);
    };

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    onLoad(queue);   // after the browser's jump to a #section
    setDock();
  }

  /* ------------------------------------------------------------------
     7. SMOOTH ANCHORS
     Switched on only after load, so a visitor arriving from the ad on a
     #section link lands there at once instead of gliding down to it.
     ------------------------------------------------------------------ */

  var ready = function () { document.documentElement.classList.add('is-ready'); };
  if (document.readyState === 'complete') ready();
  else onLoad(ready);
}
