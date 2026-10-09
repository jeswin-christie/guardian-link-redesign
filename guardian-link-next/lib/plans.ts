import type { PlanId } from './funnel';

/**
 * Plan prices and billing wording — the single source for the homepage preview, the pricing
 * page and the campaign pages. Prices are the live site's (myguardianlink.com/pricing, Oct 2026).
 */
export type Plan = {
  id: PlanId;
  name: string;
  /** Short line for the homepage preview. */
  preview: string;
  blurb: string;
  tag?: string;
  featured?: boolean;
  /** Per-month price when billed annually, the annual total, and the month-to-month price. */
  annualMo: string;
  annualTotal: string;
  monthly: string;
  /** Extra line shown above the blurb (e.g. additional users). */
  note?: string;
  rows: [string, string][];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: 'free', name: 'Free Plan', preview: 'Basic trusted contact setup', blurb: 'Best for learning and setup.',
    annualMo: '$0', annualTotal: '$0', monthly: '$0',
    rows: [['Trusted Contact Assist', '1 user'], ['Urgent Assist', 'Not included'], ['Trusted Network Assist', 'Not included'], ['See Something Say Something', 'Not included']],
    cta: 'Start Free',
  },
  {
    id: 'single', name: 'Single Plan', preview: 'Individual protection', blurb: 'Best for individual protection.',
    tag: 'Most Popular', featured: true,
    annualMo: '$9.99', annualTotal: '$119.88', monthly: '$19.99',
    rows: [['Trusted Contact Assist', 'Single'], ['Urgent Assist', 'Included'], ['Trusted Network Assist', 'Included'], ['See Something Say Something', 'Included']],
    cta: 'Get Protected Now',
  },
  {
    id: 'group', name: 'Group Plan (3 users)', preview: 'Family / trusted circle protection', blurb: 'Best for families and trusted circles.',
    note: 'Trusted Circle: $8.99/month per additional user',
    annualMo: '$24.99', annualTotal: '$299.88', monthly: '$49.99',
    rows: [['Trusted Contact Assist', 'Group'], ['Urgent Assist', 'Included'], ['Trusted Network Assist', 'Included'], ['See Something Say Something', 'Included']],
    cta: 'Protect My Family',
  },
];

/** Free plan setup order: the Start Free button opens the portal sign-up, then the app is downloaded. */
export const FREE_SETUP = 'Create a free account, then download the app';

export const plan = (id: PlanId) => PLANS.find((p) => p.id === id)!;

/** "$9.99/month, billed annually at $119.88" — the exact wording the client asked for. */
export const annualLine = (p: Plan) => `${p.annualMo}/month, billed annually at ${p.annualTotal}`;
export const monthlyLine = (p: Plan) => `${p.monthly}/month, billed monthly`;
