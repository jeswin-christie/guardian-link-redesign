import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";

/** Renders the site URL; any path after the domain is accented, like the reference. */
function DisplayUrl({ className = "" }: { className?: string }) {
  const slash = site.displayUrl.indexOf("/");
  const domain = slash === -1 ? site.displayUrl : site.displayUrl.slice(0, slash);
  const path = slash === -1 ? "" : site.displayUrl.slice(slash);
  return (
    <span className={`break-all ${className}`}>
      {domain}
      {path && <span className="text-red-400">{path}</span>}
    </span>
  );
}

export function FinalCta() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className="relative isolate overflow-hidden bg-navy-deep text-white"
    >
      {/* Photo: full-bleed behind text on mobile, right side on desktop */}
      <div className="absolute inset-0 -z-10 lg:left-[38%]">
        <Image
          src="/runners/images/final-cta-runner.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[55%_45%]"
        />
        {/* Dusk tint so the bright sunrise sits in the navy palette */}
        <div aria-hidden className="absolute inset-0 bg-navy-deep/35 mix-blend-multiply" />
      </div>
      {/* Readability overlays: strong on mobile, left-to-right fade on desktop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-navy-deep/85 lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-navy-deep from-38% via-navy-deep/80 via-55% to-navy-deep/0 lg:block"
      />

      <Container className="py-14 sm:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div data-reveal className="min-w-0 max-w-2xl">
            <h2
              id="get-started-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Before your next run, make sure help knows how to find you.
            </h2>
            <p className="mt-4 text-lg font-semibold text-amber sm:text-xl">
              You should not have to choose between freedom and safety.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              My Guardian Link lets runners send their identity, GPS location, and urgent need for help fast —
              when they cannot safely call, speak, or explain.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={site.links.getProtected} variant="red" size="lg" className="w-full sm:w-auto">
                Set Up Runner Protection Now
              </Button>
              <Button href={site.links.portal} variant="outline-light" size="lg" className="w-full sm:w-auto">
                {site.cta.portal}
              </Button>
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white/80 sm:text-left">
              Takes about 10 minutes. Could matter in seconds.
            </p>
          </div>

          {/* QR: scan on desktop, tap on phones */}
          <a
            href={site.links.portal}
            aria-label={`Scan or tap to set up Runner Protection at ${site.displayPortalUrl}`}
            data-reveal="scale"
            className="group mx-auto flex w-fit flex-col items-center rounded-xl bg-white p-4 text-center shadow-card transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:hover:translate-y-0 sm:p-5 lg:mx-0"
          >
            <QRCodeSVG
              value={site.links.portal}
              level="M"
              size={140}
              fgColor="#0a1828"
              aria-hidden
              className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]"
            />
            <span className="mt-3 text-sm font-bold text-ink">Scan or tap to set up</span>
            <span className="mt-0.5 max-w-[160px] break-all text-xs text-muted group-hover:text-brand-red">
              {site.displayPortalUrl}
            </span>
          </a>
        </div>

        <p className="mt-12 text-center text-lg font-bold tracking-wide sm:text-xl">
          <a href={site.links.website} className="hover:text-amber">
            <DisplayUrl />
          </a>
        </p>
      </Container>
    </section>
  );
}
