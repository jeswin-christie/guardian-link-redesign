import type { LucideIcon } from "lucide-react";
import { CreditCard, ShieldCheck, Smartphone, User, Users } from "lucide-react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";

type Step = { title: string; detail?: string; icon: LucideIcon };

const steps: Step[] = [
  { title: "Create your account.", icon: User },
  { title: "Choose your plan.", icon: CreditCard },
  { title: "Add your Trusted Circle.", icon: Users },
  { title: "Download the app.", detail: "App Store or Google Play.", icon: Smartphone },
  {
    title: "Activate protection.",
    detail: "Tap, voice, earbuds, watch, or silent preset.",
    icon: ShieldCheck,
  },
];

export function SetupSteps() {
  return (
    <section id="setup" aria-labelledby="setup-heading" className="bg-mist py-14 sm:py-16 lg:py-20">
      <Container>
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="setup-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink text-balance sm:text-4xl"
          >
            Protect your next run in about 10 minutes.
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Set up your Runner Protection profile before your next run.
          </p>
        </div>

        <ol data-reveal-stagger className="relative mx-auto mt-10 max-w-md md:mt-12 md:grid md:max-w-none md:grid-cols-5 md:gap-5">
          {/* Desktop horizontal connector (sits behind the number circles) */}
          <span aria-hidden data-reveal="line-x" className="absolute left-[10%] right-[10%] top-5 hidden h-0.5 bg-brand-red md:block" />

          {steps.map(({ title, detail, icon: Icon }, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={title}
                className={`relative flex gap-4 md:flex-col md:items-center md:gap-5 ${last ? "" : "pb-5 md:pb-0"}`}
              >
                {/* Mobile vertical connector */}
                {!last && (
                  <span aria-hidden data-reveal="line-y" className="absolute bottom-0 left-5 top-10 w-0.5 -translate-x-1/2 bg-brand-red md:hidden" />
                )}

                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-base font-bold text-white ring-4 ring-mist"
                  aria-hidden
                >
                  {i + 1}
                </span>

                <div className="lift flex min-w-0 flex-1 items-center gap-3.5 rounded-xl border border-line bg-white p-4 shadow-card md:w-full md:flex-col md:justify-center md:self-stretch md:text-center lg:flex-row lg:justify-start lg:px-5 lg:py-5 lg:text-left">
                  <Icon aria-hidden className="h-8 w-8 shrink-0 text-ink" strokeWidth={1.5} />
                  <p className="min-w-0 text-[15px] leading-snug text-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    <span className="font-semibold">{title}</span>
                    {detail && <span className="mt-1 block text-sm font-normal text-muted">{detail}</span>}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mt-10 flex flex-col items-center text-center">
          <Button href={site.links.portal} variant="navy" size="lg" className="w-full max-w-md sm:w-auto sm:max-w-none">
            {site.cta.portal}
          </Button>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted sm:text-sm">
            Runner Protection Setup • GROUP: {site.groupCode} <span className="normal-case">(example)</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
