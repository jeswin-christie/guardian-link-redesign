import type { LegalJson } from '@/components/LegalDoc';
import privacy from '@/content/legal/privacy-policy.json';
import terms from '@/content/legal/terms-of-use.json';
import eula from '@/content/legal/end-user-license-agreement.json';
import refund from '@/content/legal/refund-policy.json';
import child from '@/content/legal/child-guardian-consent-policy.json';
import aup from '@/content/legal/acceptable-use-policy.json';
import sponsor from '@/content/legal/sponsor-group-admin-acknowledgment.json';
import coverage from '@/content/legal/coverage-and-emergency-disclaimer.json';
import sms from '@/content/legal/sms-calling-and-communication-terms.json';
import deletion from '@/content/legal/account-deletion.json';

export type Policy = { slug: string; title: string; summary: string; doc: LegalJson };

/** The nine policy pages. Summaries are the card descriptions used on the live Legal hub / Support page. */
export const POLICIES: Policy[] = [
  { slug: 'privacy-policy', title: 'Privacy Policy', summary: 'Learn how we protect your information.', doc: privacy as LegalJson },
  { slug: 'terms-of-use', title: 'Terms of Use', summary: 'Read our terms and conditions.', doc: terms as LegalJson },
  { slug: 'end-user-license-agreement', title: 'End User License Agreement', summary: 'Read our End User License Agreement.', doc: eula as LegalJson },
  { slug: 'refund-policy', title: 'Subscription, Refund, Cancellation, and Auto-Renewal Terms', summary: 'Review our refund and cancellation policy.', doc: refund as LegalJson },
  { slug: 'acceptable-use-policy', title: 'Acceptable Use Policy', summary: 'Guidelines for acceptable and prohibited use of My Guardian Link services.', doc: aup as LegalJson },
  { slug: 'sms-calling-and-communication-terms', title: 'SMS, Calling, and Communication Terms', summary: 'Terms governing text messages, phone calls, and other communications sent by or through My Guardian Link.', doc: sms as LegalJson },
  { slug: 'coverage-and-emergency-disclaimer', title: 'Coverage and Emergency Disclaimer', summary: 'Important limitations regarding emergency response, location sharing, connectivity, and coverage.', doc: coverage as LegalJson },
  { slug: 'child-guardian-consent-policy', title: 'Child / Guardian Consent Policy', summary: 'Information on accounts and data use for minors and the required parental/guardian consent.', doc: child as LegalJson },
  { slug: 'sponsor-group-admin-acknowledgment', title: 'Sponsor / Group Admin Acknowledgment', summary: 'Terms for any person or organization creating, managing, or sponsoring a My Guardian Link group.', doc: sponsor as LegalJson },
];

export const DELETION = deletion as LegalJson;
