import PageHero from '@/components/PageHero';
import { SplitWords, Eyebrow, JsonLd } from '@/components/primitives';
import { PricingPlans } from '@/components/Interactive';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('pricing');

export default function Pricing() {
  return (
    <>
      <JsonLd data={pageSchema('pricing')} />
      <PageHero
        size="short"
        eyebrow="Plan & Pricing"
        lines={['Get Protected', 'In Minutes']}
        sub="Simple plans. Powerful protection. Peace of mind."
        primary={{ label: 'See Plans', href: '#plans' }}
        link={{ label: 'Protect My Organization', open: 'org' }}
        image="homw-block-3-highshield-e1779616387559.webp"
      />

      <section className="panel sec sec--page plans-wrap" id="plans" data-section="plans">
        <div className="sec__center">
          <Eyebrow>Plans</Eyebrow>
          <SplitWords className="h2" text="Simple plans. Powerful protection." />
        </div>
        <PricingPlans plans={[
          {
            name: 'Free Plan', blurb: 'Best for learning and setup.', annualMo: '$0', annualTotal: '$0', monthly: '$0',
            rows: [['Annual Plan', 'Free with app download'], ['Monthly Plan', 'Free with app download'], ['Trusted Contact Assist', '1 User*'], ['Urgent Assist', 'N/A'], ['See Something Say Something', 'N/A']],
            cta: 'Start Free',
          },
          {
            name: 'Single Plan', tag: 'Most Popular', featured: true, blurb: 'Best for individual protection.', annualMo: '$9.99', annualTotal: '$119.88', monthly: '$19.99',
            rows: [['Annual Plan', '$119.88'], ['Monthly Plan', '$19.99'], ['Trusted Contact Assist', 'Single*'], ['Urgent Assist', 'Included'], ['See Something Say Something', 'Included']],
            cta: 'Get Protected Now',
          },
          {
            name: 'Group Plan (3 users)', blurb: <><small>Trusted Circle $8.99 / mo / additional users</small>Best for families and trusted circles.</>, annualMo: '$24.99', annualTotal: '$299.88', monthly: '$49.99',
            rows: [['Annual Plan', '$299.88'], ['Monthly Plan', '$49.99'], ['Trusted Contact Assist', 'Group*'], ['Urgent Assist', 'Included'], ['See Something Say Something', 'Included']],
            cta: 'Protect My Family',
          },
        ]} />
      </section>

      <section className="panel sec sec--panel refund" data-section="refund">
        <div className="sec__center" style={{ marginBottom: 0 }}>
          <SplitWords className="h2" text="30-Day Refund Policy · Cancel Anytime · No Long-Term Commitment" />
          <p className="lead lead--light" data-reveal>Cancel within the first 30 days of your first paid membership to request a refund. After 30 days, your membership remains active through the end of your paid billing term. Free Plan does not include Urgent Assist or live response coordination.</p>
          <div className="btn-row btn-row--center" data-reveal>
            <button type="button" className="btn btn--orange" data-open="org">Protect My Organization</button>
          </div>
        </div>
      </section>
    </>
  );
}
