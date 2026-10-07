/**
 * Landing page configuration.
 *
 * This page is reused for many runner influencers — swap the `partner`
 * block (name + logo) and links per influencer. Everything else stays generic.
 */
import { SITE } from "@/lib/meta";

export type Partner = {
  /** Influencer / run club name, e.g. "Coach Sam Rivera" */
  name: string;
  /** Path under /public, e.g. "/runners/images/partners/sam-rivera.png" */
  logo?: string;
};

export const site = {
  brand: "My Guardian Link",
  /** Set to a Partner object to co-brand the page; null shows My Guardian Link only. */
  partner: null as Partner | null,

  /** Public URL of the site — used for absolute social-preview links (WhatsApp, etc.). Lives at /runners/. */
  siteUrl: SITE,

  /**
   * CTA destinations. The page now lives on the main site (/runners/), so site links are relative;
   * only the User Portal is external (opens in a new tab).
   * (Mapped from myguardianlink.com, Oct 2026.)
   * Sign-up flow there is: "Get Protected Now" → /pricing/ (Free / Single / Group plans)
   * → plan button → User Portal login, where onboarding (profile, contacts, app) starts.
   */
  links: {
    /** User Portal — sign in / sign up with phone OTP, then onboarding. */
    portal: "https://portal.myguardianlink.com/login",
    /** Plans page — the official "Get Protected Now" destination. */
    getProtected: "/pricing/",
    /** Features → "Activate Your Protection" (activation options). */
    activation: "/features/#devices",
    /** Pricing → Roadside Assistance add-on (scroll-to-text; falls back to the page top). */
    roadside: "/pricing/#:~:text=Roadside%20Assistance",
    /** Official website home. */
    website: "/",
  },
  /** Human-readable URLs printed on the page. */
  displayUrl: "myguardianlink.com",
  displayPortalUrl: "portal.myguardianlink.com",

  /** Example group code used in the race check-in example and setup line. */
  groupCode: "FALL50",
  /** Example event name for the everyday-use check-in example. */
  eventName: "Fall 50",

  cta: {
    setup: "Set Up Runner Protection",
    portal: "Go to User Portal",
  },
} as const;
