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
  /** Intrinsic size of the logo file. */
  width?: number;
  height?: number;
};

export const site = {
  brand: "My Guardian Link",
  /**
   * Set to a Partner object to co-brand the page; null shows My Guardian Link only.
   * With a logo, the partner's logo replaces the My Guardian Link logo at the top of the
   * hero (client proof, 2026-10-12). The Fall 50 logo is the client's (runners update PDF,
   * 2026-10-12); the client said not to use the SRSE Sports logo.
   */
  partner: {
    name: "The Fall 50",
    logo: "/runners/images/partners/fall50.png",
    width: 480,
    height: 349,
  } as Partner | null,

  /** Public URL of the site — used for absolute social-preview links (WhatsApp, etc.). Lives at /runners/. */
  siteUrl: SITE,

  /**
   * CTA destinations (client proof, 2026-10-12). Every "Set Up…" / "Activate…" button and
   * the QR code go to the portal's app sign-up with the partner's group code preselected;
   * "Go to User Portal" goes to the partner's organization page.
   */
  links: {
    /** "Go to User Portal" — the partner's organization in the User Portal. */
    portal: "https://portal.myguardianlink.com/org/FALL50",
    /** "Set Up Runner Protection" and the other setup buttons, plus the QR code. */
    getProtected: "https://portal.myguardianlink.com/app?group=FALL50",
    /** "Activate My Runner Setup". */
    activation: "https://portal.myguardianlink.com/app?group=FALL50",
    /** "Set Up My Guardian Link" under Roadside Assistance (a Future Release, lib/status.ts). */
    roadside: "https://portal.myguardianlink.com/app?group=FALL50",
    /** Official website home. */
    website: "/",
  },
  /** Human-readable URLs printed on the page. */
  displayUrl: "myguardianlink.com",

  /** Example group code used in the race check-in example and setup line. */
  groupCode: "FALL50",
  /** Example event name for the everyday-use check-in example. */
  eventName: "Fall 50",

  cta: {
    setup: "Set Up Runner Protection",
    portal: "Go to User Portal",
  },
} as const;
