import type { ReactNode } from "react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";

/* Red illustrative line icons echoing the reference artwork. */
const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

function TireIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="4.5" />
      {/* tread blocks */}
      <path d="M24 5v4M24 39v4M5 24h4M39 24h4M10.6 10.6l2.8 2.8M34.6 34.6l2.8 2.8M37.4 10.6l-2.8 2.8M13.4 34.6l-2.8 2.8" />
      {/* spokes */}
      <path d="M24 12v7.5M24 28.5V36M12 24h7.5M28.5 24H36" />
    </svg>
  );
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="5" y="14" width="38" height="26" rx="3" />
      <path d="M11 14v-4h7v4M30 14v-4h7v4" />
      <path d="M11.5 27h8M15.5 23v8" />
      <path d="M28.5 27h8" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M14.5 21v-6a9.5 9.5 0 0 1 19 0v6" />
      <rect x="9" y="21" width="30" height="22" rx="3.5" />
      <circle cx="24" cy="30" r="3" />
      <path d="M24 33v4.5" />
    </svg>
  );
}

function TowTruckIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      {/* truck body + cab */}
      <path d="M3 35V25h17V17h7l5 8h3v10" />
      <path d="M22 19v6h8" />
      {/* boom + hook */}
      <path d="M10 25 16 9h3l-2 6" />
      <path d="M17 15v3.5a2 2 0 1 1-2.5 1.9" />
      {/* wheels */}
      <circle cx="10" cy="37" r="3.5" />
      <circle cx="28" cy="37" r="3.5" />
      <path d="M13.5 37h11M31.5 37H35" />
      {/* towed car */}
      <path d="M35 33h10v-4l-3-4h-6l-1 3" />
      <circle cx="41" cy="37" r="2.5" />
    </svg>
  );
}

type Service = { label: [string, string]; icon: (p: { className?: string }) => ReactNode };

const services: Service[] = [
  { label: ["Flat Tire", "Assistance"], icon: TireIcon },
  { label: ["Battery", "Jump Start"], icon: BatteryIcon },
  { label: ["Lockout", "Assistance"], icon: LockIcon },
  { label: ["Vehicle", "Towing"], icon: TowTruckIcon },
];

const situations = [
  "Stranded at a trailhead",
  "Unsafe parking lot situation",
  "Alone and uncomfortable after dark",
];

export function Roadside() {
  return (
    <section id="roadside" aria-labelledby="roadside-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Copy */}
          <div data-reveal="left" className="min-w-0">
            <h2
              id="roadside-heading"
              className="text-3xl font-extrabold leading-tight tracking-tight text-ink text-balance sm:text-4xl"
            >
              Protection does not stop when the run ends.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
              Drive to a trailhead? Early morning meet-up? Parked alone after dark? My Guardian Link also
              introduces Roadside Assistance for flat tires, dead batteries, lockouts, and breakdowns — so you
              can get back on your way.
            </p>

            <ul className="mt-5 space-y-2.5" aria-label="Also there for">
              {situations.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                  <span
                    aria-hidden
                    className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-brand-red ring-4 ring-brand-red-soft"
                  />
                  <span className="min-w-0">{s}</span>
                </li>
              ))}
            </ul>

            <Button href={site.links.roadside} variant="navy" className="mt-7 w-full sm:w-auto">
              Set Up My Guardian Link
            </Button>
          </div>

          {/* Services panel */}
          <div data-reveal="right" className="min-w-0 rounded-xl bg-mist px-4 py-7 sm:px-8 sm:py-9">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink sm:text-base">
                Roadside Assistance
              </h3>
              <span className="rounded-full bg-brand-red-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-red-dark">
                Future release
              </span>
            </div>

            <ul data-reveal-stagger className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-3">
              {services.map(({ label, icon: Icon }) => (
                <li key={label.join(" ")} className="group flex min-w-0 flex-col items-center text-center">
                  <Icon className="h-14 w-14 text-brand-red transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:h-16 sm:w-16" />
                  <span className="mt-3 text-sm font-semibold leading-snug text-ink">
                    {label[0]}
                    <br />
                    {label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
