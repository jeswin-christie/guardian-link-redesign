/**
 * Product / feature availability — the single source of truth for every
 * "Included", "Coming Soon", "New Release" and "Future Release" label on the site.
 *
 * Mirrored from the live site (myguardianlink.com, scraped 2026-10-08, visible
 * desktop + mobile content only; Elementor blocks hidden on all breakpoints ignored;
 * the pricing-page "New Customer Portal Celebration" banner ignored — removed by the client).
 * `source` says where the live site shows it. `conflict` is set where the live
 * site contradicts itself — those need client confirmation before launch.
 */
export type Status = 'live' | 'new-release' | 'coming-soon' | 'future-release';

export type Item = {
  name: string;
  status: Status;
  /** Badge text exactly as the live site shows it (undefined = no badge shown live). */
  label?: string;
  /** One-line description (from the live How It Works product grid). */
  desc?: string;
  source: string;
  conflict?: string;
};

export const STATUS_LABEL: Record<Status, string> = {
  live: 'Included',
  'new-release': 'New Release',
  'coming-soon': 'Coming Soon',
  'future-release': 'Future Release',
};

export const PRODUCTS = {
  trustedContactAssist: {
    name: 'Trusted Contact Assist', desc: 'Notify a trusted contact so they can respond and support you.', status: 'live', label: 'Freemium',
    source: 'How It Works: FREEMIUM; pricing cards: Free plan 1 user, Single, Group',
  },
  urgentAssist: {
    name: 'Urgent Assist', desc: 'Rapid help when you need it most.', status: 'live',
    source: 'How It Works "current products" (no badge); pricing cards: Included on Single and Group, N/A on Free',
  },
  roadsideAssistance: {
    name: 'Roadside Assistance', desc: 'Get back on the road quickly and safely.', status: 'future-release', label: 'Future Release',
    source: 'Client confirmed 2026-10-08 (live site showed "Coming Soon" on Home, no badge on How It Works)',
  },
  urgentMedicalAssistance: {
    name: 'Urgent Medical Assistance', desc: 'Connect to medical help when every second counts.', status: 'future-release', label: 'Future Release',
    source: 'Client confirmed 2026-10-08 (live How It Works showed NEW RELEASE)',
  },
  seeSomethingSaySomething: {
    name: 'See Something, Say Something', desc: 'Report concerns. Help keep communities safe.', status: 'live',
    source: 'Pricing cards: Included on Single and Group, N/A on Free; no badge on Home or How It Works',
  },
  falseAlarmWorkflow: {
    name: 'False Alarm Workflow', desc: 'Confirms accidental activations quickly and helps prevent unnecessary escalation.', status: 'live',
    source: 'How It Works "current products", no badge',
  },
  tornadoAlert: {
    name: 'Tornado Alert', desc: 'Real-time alerts and guidance when severe weather threatens.', status: 'future-release', label: 'Future Release',
    source: 'How It Works product grid: FUTURE RELEASE',
  },
  wildfireAlert: {
    name: 'Wildfire Alert', desc: 'Stay ahead of wildfire risk with timely alerts and updates.', status: 'future-release', label: 'Future Release',
    source: 'How It Works product grid: FUTURE RELEASE',
  },
} satisfies Record<string, Item>;

/** Activation methods — Features page "Activate Your Protection". */
export const ACTIVATION = {
  oneTouch: { name: 'One-Touch', status: 'live', label: 'Instant', source: 'Features' },
  speechToText: { name: 'Speech-to-Text', status: 'live', source: 'Features' },
  whisperToText: { name: 'Whisper-to-Text', status: 'live', source: 'Features' },
  handsFreeVoice: { name: 'Hands-Free Voice', status: 'live', source: 'Features' },
  heySiri: { name: '“Hey Siri”', status: 'live', label: 'Available', source: 'Features' },
  heyGoogle: { name: '“Hey Google”', status: 'coming-soon', label: 'Coming Soon', source: 'Features' },
  smartWatch: { name: 'Smart Watch', status: 'live', label: 'Ready', source: 'Features' },
  earbuds: { name: 'Earbuds', status: 'live', label: 'Ready', source: 'Features' },
  silentActivation: { name: 'Silent activation', status: 'live', source: 'Features: "available when speaking or drawing attention is unsafe"' },
} satisfies Record<string, Item>;

/** Operational claims the live site makes. Keep wording identical to these until the client confirms otherwise. */
export const CLAIMS = {
  coordinatorHours: {
    name: 'Live response coordinators 24/7/365, U.S.-based', status: 'live',
    source: 'Features ("Coordinator availability: 24/7/365"), About Us. Pricing: Free plan does not include Urgent Assist or live response coordination.',
  },
  psapAccess: {
    name: 'Central-station access to approximately 5,800 PSAPs', status: 'live',
    source: 'Home, Features, About Us (Quick Response, central-station partner)',
  },
} satisfies Record<string, Item>;
