'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { CHAT_WIDGET_ID } from '@/lib/meta';

/**
 * GoHighLevel / LeadConnector live chat ("My Guardian Help Desk"),
 * the same widget the WordPress site loads. Content, greeting and colours are
 * managed in GHL → Sites → Chat Widget; nothing is configured here except:
 *  - GHL's own round launcher bubble is hidden (it collides with the pill nav);
 *    the red chat button in the pill nav opens the widget instead (toggleChat).
 */

type ChatApi = { isLoaded?: boolean; openWidget: () => void; closeWidget: () => void; isActive: () => boolean };
declare global {
  interface Window { leadConnector?: { chatWidget?: ChatApi } }
}

const WIDGET_CSS = '#lc_text-widget--btn{display:none!important}';

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
    if (styleWidget()) return;
    const id = window.setInterval(() => { if (styleWidget()) window.clearInterval(id); }, 100);
    const stop = window.setTimeout(() => window.clearInterval(id), 60000);
    return () => { window.clearInterval(id); window.clearTimeout(stop); };
  }, []);

  return (
    <Script
      id="lc-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={CHAT_WIDGET_ID}
      strategy="afterInteractive"
    />
  );
}
