import { APP_STORE, GOOGLE_PLAY } from './meta';

export type Device = 'ios' | 'android' | 'desktop';

/** iPhone/iPad → 'ios', Android phones and tablets → 'android', everything else → 'desktop'.
 *  Browser-only (reads navigator). iPadOS reports itself as a Mac, hence the touch check. */
export function deviceType(): Device {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'desktop';
}

/** The visitor's app store if they are on a phone or tablet: App Store on iPhone/iPad, Google Play on Android.
 *  Null on computers. */
export function phoneStore(): string | null {
  const d = deviceType();
  return d === 'ios' ? APP_STORE : d === 'android' ? GOOGLE_PLAY : null;
}
