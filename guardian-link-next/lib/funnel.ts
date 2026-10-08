import { SIGNUP } from './meta';
import type { Action } from '@/components/primitives';

/**
 * The one conversion path: every Get Protected Now / plan / Create Free Account button goes
 * to the portal (portal.myguardianlink.com/login — phone sign-in doubles as sign-up). The
 * portal handles plan selection, payment, trusted contacts, app download and activation;
 * the website only routes there. Ad attribution (utm_*, gclid, fbclid) is appended at click
 * time by components/CtaTracking.tsx.
 */
export type PlanId = 'free' | 'single' | 'group';
export type Billing = 'annual' | 'monthly';

export function signupUrl(): string {
  return SIGNUP;
}

/** The primary red "Get Protected Now" action. `cta` names the placement for click analytics (data-cta). */
export function getProtected(cta: string): Action {
  return { label: 'Get Protected Now', href: signupUrl(), cta };
}
