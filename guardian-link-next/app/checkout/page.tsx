import { Img, SplitWords, Eyebrow, JsonLd } from '@/components/primitives';
import PageHero from '@/components/PageHero';
import { CoverageAck } from '@/components/Interactive';
import { pageMetadata, pageSchema } from '@/lib/meta';

export const metadata = pageMetadata('checkout');

export default function Checkout() {
  return (
    <>
      <JsonLd data={pageSchema('checkout')} />
      <PageHero
        size="short"
        eyebrow="Checkout"
        lines={['Before You', 'Continue']}
        sub="Please review and acknowledge and coverage requirements."
        image="map-image.webp"
      />
      <section className="panel split" data-section="ack">
        <div className="split__body">
          <Eyebrow>Coverage Acknowledgment</Eyebrow>
          <SplitWords className="h2" text="Coverage Acknowledgment" />
          <p className="lead" data-reveal>My Guardian Link requires an active cellular data connection or Wi-Fi connection. Coverage is not guaranteed in every location. Performance may vary based on carrier, phone model, battery level, roaming plan, congestion, terrain, weather, buildings, basements, elevators, tunnels, rural areas, and local outages. My Guardian Link supports urgent communication but does not replace calling 911 or local emergency services when it is safe and possible.</p>
          <CoverageAck />
        </div>
        <div className="split__body split__body--map">
          <Eyebrow light>General 5G Coverage Overview</Eyebrow>
          <figure className="coverage__map" data-reveal>
            <Img src="map-image.webp" alt="General 5G coverage map of the United States, Canada and Mexico" sizes="(max-width: 860px) 100vw, 50vw" />
          </figure>
        </div>
      </section>
    </>
  );
}
