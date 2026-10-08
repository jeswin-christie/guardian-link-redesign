/**
 * Landing page configuration.
 *
 * This page is reused for many runner influencers — swap the `partner`
 * block (name + logo) and links per influencer. Everything else stays generic.
 */
import { SITE, SIGNUP } from "@/lib/meta";

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
   * CTA destinations — one path to membership, same as the main site (lib/funnel.ts):
   * every setup button goes to account setup in the User Portal (phone sign-in = sign-up),
   * where plan → trusted contacts → app download → activation follow.
   */
  links: {
    /** User Portal — sign in / sign up with phone OTP, then onboarding. */
    portal: SIGNUP,
    /** "Set Up Runner Protection" — account setup. */
    getProtected: SIGNUP,
    /** "Activate My Runner Setup" — activation happens in the app: /download/ sends phones to their store. */
    activation: "/download/",
    /** Roadside Assistance is a Future Release (lib/status.ts), so its button goes to account setup. */
    roadside: SIGNUP,
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
