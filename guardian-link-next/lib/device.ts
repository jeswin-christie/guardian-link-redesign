import { APP_STORE, GOOGLE_PLAY } from './meta';

/** The visitor's app store if they are on a phone or tablet: App Store on iPhone/iPad, Google Play on Android.
 *  Null on computers. Browser-only (reads navigator). iPadOS reports itself as a Mac, hence the touch check. */
export function phoneStore(): string | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return APP_STORE;
  if (/Android/i.test(ua)) return GOOGLE_PLAY;
  return null;
}
