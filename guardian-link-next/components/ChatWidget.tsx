'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { CHAT_WIDGET_ID } from '@/lib/meta';

/**
 * GoHighLevel / LeadConnector live chat ("My Guardian Help Desk"),
 * the same widget the WordPress site loads. Content, greeting and colours are
 * managed in GHL → Sites → Chat Widget; nothing is configured here except:
 *  - GHL's own round launcher bubble is hidden; our red chat button (.chat-fab) takes its
 *    place in the bottom-right corner, directly under the greeting prompt and chat window,
 *    and opens the widget instead (toggleChat).
 *  - Where the pill nav reaches that corner (phones), the widget and the button are lifted
 *    above the pill so they never sit on top of it (liftAboveNav).
 *  - The greeting prompt shows on every page load. GHL hides it for 24 hours once the visitor
 *    opens the chat or closes the prompt; that flag is cleared before the widget loads.
 */

/* Runs when this client chunk loads — before hydration, so before the afterInteractive loader script. */
if (typeof window !== 'undefined') {
  try {
    // Key is `${locationId}lead-connecter-text-widget-prompt-dismissed` (GHL's own spelling)
    Object.keys(window.localStorage)
      .filter((k) => k.endsWith('lead-connecter-text-widget-prompt-dismissed'))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch { /* storage blocked: GHL just keeps its default behaviour */ }
}

type ChatApi = { isLoaded?: boolean; openWidget: () => void; closeWidget: () => void; isActive: () => boolean };
declare global {
  interface Window { leadConnector?: { chatWidget?: ChatApi } }
}

/* --mgl-chat-bottom is set on <html> by liftAboveNav(); custom properties inherit into the shadow root.
   The widget keeps GHL's 70px launcher space at its bottom — the red button sits there — so that
   transparent space must let clicks through to the button. */
const WIDGET_CSS = '#lc_text-widget--btn{display:none!important}'
  + '#lc_text-widget{bottom:var(--mgl-chat-bottom,20px)!important;pointer-events:none}'
  + '#lc_text-widget>*{pointer-events:auto}';

/** GHL's launcher footprint: 60px wide, 20px from the right edge. */
const LAUNCHER_SPACE = 20 + 60 + 12;

/** Lift the widget above the pill nav when the pill would run under the corner button. */
function liftAboveNav() {
  const pill = document.querySelector('.pill');
  const root = document.documentElement.style;
  if (!pill) { root.removeProperty('--mgl-chat-bottom'); return; }
  const p = pill.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  if (p.right > vw - LAUNCHER_SPACE) {
    // pill::before draws a ring 5px outside the pill
    root.setProperty('--mgl-chat-bottom', `${Math.round(window.innerHeight - p.top + 5 + 10)}px`);
  } else {
    root.removeProperty('--mgl-chat-bottom');
  }
}

/** Inject our overrides into the widget's (open) shadow root. Returns true once done. */
function styleWidget() {
  const root = document.querySelector('chat-widget')?.shadowRoot;
  if (!root || !root.querySelector('#lc_text-widget--btn')) return false;
  if (!root.querySelector('style[data-mgl]')) {
    const s = document.createElement('style');
    s.setAttribute('data-mgl', '');
    s.textContent = WIDGET_CSS;
    root.appendChild(s);
  }
  return true;
}

/** Open / close the GHL chat. Waits briefly if the widget is still loading. */
export function toggleChat() {
  const start = Date.now();
  const attempt = () => {
    const cw = window.leadConnector?.chatWidget;
    if (cw?.isLoaded) {
      if (cw.isActive()) cw.closeWidget();
      else cw.openWidget();
      return;
    }
    // widget blocked or failed to load (ad blocker, offline): fall back to the support page
    if (Date.now() - start > 6000) { window.location.assign('/support/'); return; }
    setTimeout(attempt, 150);
  };
  attempt();
}

export default function ChatWidget() {
  useEffect(() => {
    // The pill slides in on load and widens when its back-to-top button appears on scroll — re-check each time.
    liftAboveNav();
    const pill = document.querySelector('.pill');
    const ro = new ResizeObserver(liftAboveNav);
    if (pill) ro.observe(pill);
    pill?.addEventListener('transitionend', liftAboveNav);
    window.addEventListener('resize', liftAboveNav);
    return () => { ro.disconnect(); pill?.removeEventListener('transitionend', liftAboveNav); window.removeEventListener('resize', liftAboveNav); };
  }, []);

  useEffect(() => {
    if (styleWidget()) return;
    const id = window.setInterval(() => { if (styleWidget()) window.clearInterval(id); }, 100);
    const stop = window.setTimeout(() => window.clearInterval(id), 60000);
    return () => { window.clearInterval(id); window.clearTimeout(stop); };
  }, []);

  return (
    <>
      <button className="chat-fab" onClick={toggleChat} aria-label="Chat with us">
        <svg viewBox="0 0 24 24"><path d="M4 5h16v10H9l-5 4V5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="10" r="1" fill="currentColor" /><circle cx="15" cy="10" r="1" fill="currentColor" /></svg>
      </button>
      <Script
        id="lc-chat-widget"
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={CHAT_WIDGET_ID}
        strategy="afterInteractive"
      />
    </>
  );
}
