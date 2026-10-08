import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { SplitWords, Eyebrow, JsonLd } from '@/components/primitives';
import { Faq } from '@/components/Interactive';
import { pageMetadata, pageSchema, SUPPORT_FORM, SUPPORT_EMAIL } from '@/lib/meta';

export const metadata = pageMetadata('support');

const TOPICS = [
  {
    q: 'Why can’t I sign in?',
    a: <><p>Make sure you are using the email address or mobile number connected to your My Guardian Link account. Confirm that your internet connection is active and that your password was entered correctly.</p><p>If you still cannot sign in, contact My Guardian Link Support.</p></>,
  },
  {
    q: 'Why am I not receiving my verification code?',
    a: <><p>Verification codes may be delayed by your mobile carrier or email provider.</p><p>Check the following:</p>
      <ul><li>Confirm that your phone number or email address is correct.</li><li>Check your email spam or junk folder.</li><li>Make sure your phone can receive text messages.</li><li>Do not request several codes in rapid succession. Only the newest code may work.</li></ul>
      <p>Contact Support if the code still does not arrive.</p></>,
  },
  {
    q: 'Why is Sign in with Apple not working?',
    a: <><p>Make sure you are signed into your Apple ID on the device and that your internet connection is active.</p><p>If you previously selected Hide My Email, your My Guardian Link account may be connected to Apple’s private relay email address rather than your regular email address.</p><p>Try signing in again with Apple. If the problem continues, contact Support and provide the email address you believe is connected to your account.</p></>,
  },
  {
    q: 'How do I create an account?',
    a: <><ol><li>Open the My Guardian Link app.</li><li>Select Create Account or Get Started.</li><li>Enter the requested account information.</li><li>Verify your email address and mobile number.</li><li>Complete your profile and protection settings.</li><li>Select a membership plan when prompted.</li></ol><p>You must accept the Terms of Use and Privacy Policy before completing registration.</p></>,
  },
  {
    q: 'How do I add trusted contacts?',
    a: <><ol><li>Open the My Guardian Link app.</li><li>Go to Profile or Trusted Contacts.</li><li>Select Add Trusted Contact.</li><li>Enter the person’s name, mobile number, and email address.</li><li>Save the contact and send the invitation if prompted.</li></ol><p>Trusted contacts should know that you selected them and understand how to respond when they receive an alert.</p><p>You must accept the Terms of Use and Privacy Policy before completing registration.</p></>,
  },
  {
    q: 'How do I test Urgent Assist?',
    a: <><ol><li>Open Urgent Assist in the app.</li><li>Follow the activation instructions shown on the screen.</li><li>Clearly enter or say: “Practice call test only.”</li><li>Confirm that your trusted contacts and the response workflow operate as expected.</li></ol><p>Do not use Urgent Assist for casual testing without identifying the activation as a practice test.</p></>,
  },
  {
    q: 'How do I manage or cancel a subscription?',
    a: <><p>Subscriptions purchased through Apple must be managed through your Apple account:</p><ol><li>Open the iPhone Settings app.</li><li>Tap your name.</li><li>Tap Subscriptions.</li><li>Select My Guardian Link.</li><li>Choose the available option to manage or cancel the subscription.</li></ol><p>Deleting the app does not automatically cancel a subscription. Cancellation normally stops future renewal while access continues through the current paid term.</p></>,
  },
  {
    q: 'How do I delete my account?',
    a: <><ol><li>Open the My Guardian Link app.</li><li>Go to Profile or Account Settings.</li><li>Select Delete Account.</li><li>Review the information shown.</li><li>Confirm the deletion request.</li></ol><p>Account deletion is permanent and may remove your profile, settings, trusted-contact connections, and other account information. Cancel any active Apple subscription separately through your Apple subscription settings.</p></>,
  },
  {
    q: 'How do I fix location or notification issues?',
    a: <><p>Confirm that My Guardian Link has permission to use location services and send notifications.</p><p>On iPhone:</p><ol><li>Open Settings.</li><li>Select My Guardian Link.</li><li>Allow Notifications.</li><li>Open Location and select the location permission recommended by the app.</li><li>Turn on Precise Location.</li><li>Confirm that cellular data is enabled for the app.</li></ol><p>Also make sure Low Power Mode, Focus settings, or restricted background activity are not preventing alerts or location updates. Reopen the app after changing permissions.</p></>,
  },
];

const RESOURCES: [string, string, string][] = [
  ['/privacy-policy/', 'Privacy Policy', 'Learn how we protect your information.'],
  ['/terms-of-use/', 'Terms of Use', 'Read our terms and conditions.'],
  ['/end-user-license-agreement/', 'EULA', 'Read our End User License Agreement.'],
  ['/account-deletion/', 'Account Deletion', 'How to permanently delete your account.'],
  ['/refund-policy/', 'Refund & Cancellation', 'Review our refund and cancellation policy.'],
];

export default function Support() {
  return (
    <>
      <JsonLd data={pageSchema('support')} />
      <PageHero
        size="short"
        eyebrow="Support"
        lines={['My Guardian Link', 'Support']}
        sub={<><strong>We&apos;re here for you</strong><br />Our support team can assist with account access, app setup, trusted contacts, activation settings, subscriptions, and technical issues.</>}
        primary={{ label: 'Open Support Form', href: SUPPORT_FORM }}
        link={{ label: 'Common Support Topics', href: '#topics' }}
        image="support-banner-mgl.webp"
        imageMobile="support-banner-mgl-1.webp"
      />

      <section className="panel band" data-section="contact">
        <div className="band__head">
          <Eyebrow light>Contact Support</Eyebrow>
          <SplitWords className="h2" text="Contact Support" />
        </div>
        <div className="bubbles bubbles--3">
          <div className="bubble bubble--round" data-bubble>
            <span className="bubble__n">Email Us</span>
            <h4><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></h4>
            <p>We typically respond within 24 business hours.</p>
          </div>
          <div className="bubble bubble--round" data-bubble>
            <span className="bubble__n">Send us a Message</span>
            <p>Use our public contact form to ask a question or report an issue.</p>
            <a href={SUPPORT_FORM} target="_blank" rel="noopener" className="btn btn--red bubble__btn">Open Support Form</a>
          </div>
          <div className="bubble bubble--round" data-bubble>
            <span className="bubble__n">Support Hours</span>
            <p>We are available</p>
            <h4>7 days a week<br />8:00 AM – 8:00 PM CT</h4>
            <p>We typically respond within 24 hours.</p>
          </div>
        </div>
      </section>

      <section className="panel sec sec--page" id="topics" data-section="topics">
        <div className="faqsec">
          <div className="faqsec__aside">
            <Eyebrow>Help Center</Eyebrow>
            <SplitWords className="h2" text="Common Support Topics" />
          </div>
          <Faq items={TOPICS} />
        </div>
      </section>

      <section className="panel sec sec--panel" data-section="resources">
        <div className="sec__head">
          <Eyebrow light>Helpful Resources</Eyebrow>
          <SplitWords className="h2" text="Helpful Resources" />
        </div>
        <div className="cards" data-stagger>
          {RESOURCES.map(([href, t, d]) => (
            <Link href={href} key={href} className="card card--dark card-link"><h3>{t}</h3><p>{d}</p></Link>
          ))}
        </div>
      </section>

      <section className="panel sec sec--black" data-section="here">
        <div className="sec__center" style={{ marginBottom: 0 }}>
          <SplitWords className="h2 h2--xl" text="We're Here When You Need Us" />
          <p className="lead lead--light" data-reveal>Prevention and your protection is our priority.</p>
          <p className="urgent" data-reveal>If you need urgent assistance, please use Urgent Assist on your mobile app.</p>
        </div>
      </section>
    </>
  );
}
