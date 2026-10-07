import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";
import { Logo } from "@/components/runners/ui/Logo";

const features = [
  "One tap",
  "Voice command",
  "Silent activation",
  "GPS location",
  "Live coordinator",
  "Trusted Circle support",
];

/** Faint shield + location-pin watermark (decorative). */
function ShieldPinWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 230"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M100 8 L184 38 V104 C184 160 148 202 100 222 C52 202 16 160 16 104 V38 Z" />
      <path d="M100 26 L168 50 V104 C168 150 140 186 100 204 C60 186 32 150 32 104 V50 Z" strokeWidth={2} />
      <path d="M100 62 C80 62 66 77 66 96 C66 122 100 156 100 156 C100 156 134 122 134 96 C134 77 120 62 100 62 Z" />
      <circle cx="100" cy="96" r="13" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-white lg:min-h-[max(100svh,600px)]"
    >
      {/* Watermark: top-right on phones, top-center over the photo on desktop */}
      <ShieldPinWatermark className="pointer-events-none absolute -right-10 top-4 z-0 h-56 w-48 animate-float text-ink opacity-[0.04] lg:left-[47%] lg:right-auto lg:top-6 lg:z-20 lg:h-[300px] lg:w-[260px] lg:text-navy lg:opacity-[0.08]" />

      <Container className="relative z-10 pb-5 pt-5 sm:pb-6 sm:pt-6 lg:flex lg:flex-1 lg:flex-col lg:pb-10 lg:pt-8">
        <Logo className="animate-rise" />

        <div className="mt-6 min-w-0 sm:mt-10 lg:my-auto lg:w-[56%] lg:max-w-[640px] lg:py-4">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.5rem,13vw,5.75rem)] font-bold leading-[0.92] tracking-tight text-ink lg:text-[clamp(4.5rem,7.4vw,6rem)]"
          >
            <span className="block animate-rise [animation-delay:80ms]">
              Run <span className="text-brand-red">Free.</span>
            </span>
            <span className="block animate-rise [animation-delay:180ms]">
              Never Run <span className="text-brand-red">Alone.</span>
            </span>
          </h1>

          <p className="mt-4 max-w-[520px] animate-rise text-[15px] [animation-delay:300ms] leading-relaxed text-body sm:mt-5 sm:text-lg lg:mt-6">
            When something feels wrong on a run, My Guardian Link gets help moving fast — even when you cannot safely
            call, speak, or explain where you are.
          </p>

          <ul
            aria-label="Key features"
            className="mt-3 flex max-w-[520px] animate-rise flex-wrap short:hidden sm:mt-4 [animation-delay:380ms] items-center gap-x-2 gap-y-1 text-[13px] font-medium text-muted"
          >
            {features.map((f, i) => (
              <li key={f} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-red" />}
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex animate-rise flex-col gap-2.5 [animation-delay:460ms] sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button href={site.links.getProtected} variant="red" className="w-full sm:w-auto">
              {site.cta.setup}
            </Button>
            <Button href={site.links.portal} variant="navy" className="w-full sm:w-auto">
              {site.cta.portal}
            </Button>
          </div>

          <p className="mt-4 flex max-w-[480px] animate-rise items-start short:hidden sm:mt-6 [animation-delay:540ms] gap-3 text-sm leading-snug text-body">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-ink" strokeWidth={1.75} />
            <span>Built for dawn runs, night routes, trails, parking lots, long-distance training, and everyday solo runs.</span>
          </p>
        </div>
      </Container>

      {/* Photo: in-flow block below the copy on phones/tablets; right-side bleed on desktop */}
      <div className="relative mx-4 mb-4 min-h-[40vw] flex-1 overflow-hidden rounded-xl sm:mx-6 sm:mb-6 sm:min-h-[34vw] lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:m-0 lg:min-h-0 lg:w-[55%] lg:rounded-none">
        <Image
          src="/runners/images/hero-runner.jpg"
          alt="A woman running down a sunlit city street wearing earbuds"
          fill
          preload
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="animate-hero-zoom object-cover object-[60%_30%]"
        />
        {/* White fade on the photo's left edge so the copy sits on white (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-white via-white/70 to-transparent lg:block"
        />
        {/* Thin red diagonal accent, bottom-right */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute bottom-0 right-0 h-10 w-2/3 origin-bottom-right animate-rise text-brand-red [animation-delay:700ms] sm:h-14 lg:h-20 lg:w-1/2"
        >
          <polygon points="100,38 100,50 22,100 6,100" fill="currentColor" />
          <polygon points="100,62 100,100 52,100" fill="currentColor" opacity="0.35" />
        </svg>
      </div>
    </section>
  );
}
