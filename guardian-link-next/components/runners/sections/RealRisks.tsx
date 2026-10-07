import type { ReactNode } from "react";
import { HeartPulse, ShieldAlert } from "lucide-react";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";
import { site } from "@/lib/runners/site";

/* ------------------------------------------------------------------ */
/* Illustrative icons — bold solid red, echoing the reference design.  */
/* ------------------------------------------------------------------ */

function HoodedFigureIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {/* shoulders / torso */}
      <path d="M8 62c0-14 9-22 24-22s24 8 24 22z" className="fill-brand-red" />
      {/* hood */}
      <path
        d="M32 3C20.5 3 14 12.5 14 24c0 7.5 3.4 13 8.5 16.5h19C46.6 37 50 31.5 50 24 50 12.5 43.5 3 32 3z"
        className="fill-brand-red"
      />
      {/* shadowed face opening */}
      <ellipse cx="32" cy="26" rx="9.5" ry="11.5" className="fill-brand-red-dark" />
      {/* hoodie strings + zipper */}
      <path
        d="M27 40v9M37 40v9M32 44v18"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="27" cy="50.5" r="1.6" fill="#fff" />
      <circle cx="37" cy="50.5" r="1.6" fill="#fff" />
    </svg>
  );
}

function HeartPulseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path
        d="M32 57C14 45 3.5 35 3.5 21.5 3.5 12.5 10.5 6 19 6c5.6 0 10 2.8 13 7.2C35 8.8 39.4 6 45 6c8.5 0 15.5 6.5 15.5 15.5C60.5 35 50 45 32 57z"
        className="fill-brand-red"
      />
      <polyline
        points="7,31 20,31 24.5,23 30,41 35.5,15 40.5,34 43.5,31 57,31"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarBikeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 116 64" className={className} aria-hidden="true" focusable="false">
      {/* car */}
      <g className="fill-brand-red">
        <path d="M12 29l5.2-13.5C18 13.4 20 12 22.3 12h13.4c2.3 0 4.3 1.4 5.1 3.5L46 29z" />
        <rect x="4" y="27" width="50" height="21" rx="5" />
        <rect x="8" y="45" width="9" height="9" rx="2.5" />
        <rect x="41" y="45" width="9" height="9" rx="2.5" />
      </g>
      <g fill="#fff">
        <path d="M17.5 27l3.6-9.2c.3-.8 1-1.3 1.9-1.3H28V27z" />
        <path d="M31 16.5h5c.9 0 1.6.5 1.9 1.3l3.6 9.2H31z" />
        <circle cx="12.5" cy="36.5" r="3.4" />
        <circle cx="45.5" cy="36.5" r="3.4" />
        <rect x="21" y="35" width="16" height="3" rx="1.5" />
      </g>
      {/* bicycle */}
      <g
        fill="none"
        className="stroke-brand-red"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="73" cy="44" r="10" />
        <circle cx="103" cy="44" r="10" />
        <path d="M73 44l9-15h15l6 15M82 29l6 15h-15M88 44l9-15M80 23h7M82 29l-1.5-6M97 29l-2-6h5" />
      </g>
    </svg>
  );
}

function TreesPathIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g className="fill-brand-red">
        {/* round tree */}
        <circle cx="20" cy="15" r="9" />
        <circle cx="12.5" cy="23" r="7.5" />
        <circle cx="27.5" cy="23" r="7.5" />
        <circle cx="20" cy="25" r="7" />
        <rect x="18" y="27" width="4" height="13" rx="1" />
        {/* pine tree */}
        <path d="M45 5l8 13h-4l6 11H35l6-11h-4z" />
        <rect x="43" y="28" width="4" height="9" rx="1" />
        {/* winding path */}
        <path d="M60 38.5c-13 0-29 .8-29 6.6 0 6.1 18.5 4.3 18.5 9.8 0 4.8-10.5 6.6-30.5 6.6H6c17.5 0 33-1 33-5.4 0-5.2-19.5-3.6-19.5-11.2C19.5 36.4 40 35 60 35z" />
      </g>
    </svg>
  );
}

type Risk = {
  title: [string, string];
  body: string;
  icon: ReactNode;
};

const risks: Risk[] = [
  {
    title: ["Being Followed", "or Threatened"],
    body: "When someone makes you feel unsafe and calling 911 could escalate the situation.",
    icon: <HoodedFigureIcon className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]" />,
  },
  {
    title: ["Medical", "Emergency"],
    body: "When chest pain, heat, asthma, injury, or collapse happens away from help.",
    icon: <HeartPulseIcon className="h-14 w-14 animate-heartbeat sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]" />,
  },
  {
    title: ["Road or Trail", "Accident"],
    body: "When a fall, vehicle, bike, or terrain injury leaves you unable to communicate clearly.",
    icon: <CarBikeIcon className="h-9 w-[65px] sm:h-14 sm:w-[101px] lg:h-[60px] lg:w-[109px]" />,
  },
  {
    title: ["Isolated", "Route Risk"],
    body: "When you are alone on a trail, rural road, park path, or low-traffic area.",
    icon: <TreesPathIcon className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]" />,
  },
];

export function RealRisks() {
  return (
    <section id="risks" aria-labelledby="risks-heading" className="bg-mist py-14 sm:py-16 lg:py-20">
      <Container>
        {/* The emotional truth, then the problem */}
        <div data-reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <HeartPulse aria-hidden="true" strokeWidth={1.5} className="mx-auto h-14 w-14 animate-heartbeat text-brand-red" />
          <p className="mt-4 text-2xl font-bold leading-tight text-ink text-balance sm:text-[28px]">
            Runners should be able to move freely without feeling alone.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-body sm:text-base">
            But a normal run can become an urgent situation fast — and the moment you need help is often the moment you
            cannot stop, speak, or explain where you are.
          </p>
        </div>

        {/* Heading flanked by thin red rules */}
        <div data-reveal className="flex items-center justify-center gap-4 sm:gap-6">
          <span aria-hidden="true" className="hidden h-px max-w-36 flex-1 bg-brand-red/70 min-[480px]:block" />
          <h2
            id="risks-heading"
            className="text-center text-[22px] leading-tight font-extrabold tracking-[0.06em] text-navy uppercase sm:text-2xl lg:text-[28px]"
          >
            Real Risks Runners Face
          </h2>
          <span aria-hidden="true" className="hidden h-px max-w-36 flex-1 bg-brand-red/70 min-[480px]:block" />
        </div>
        <p className="mt-2 text-center text-[15px] text-muted sm:text-base">Be ready before the run.</p>

        {/* Risk cards: horizontal tiles on phones, centered cards from sm up */}
        <ul data-reveal-stagger className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {risks.map((risk) => (
            <li
              key={risk.title.join(" ")}
              className="lift group flex items-start gap-4 rounded-xl border border-line bg-white p-5 shadow-card sm:flex-col sm:items-center sm:gap-0 sm:px-6 sm:py-7 sm:text-center"
            >
              <div className="flex h-16 w-[72px] shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-auto lg:h-[84px]">
                {risk.icon}
              </div>
              <div className="min-w-0 sm:mt-4">
                <h3 className="text-lg leading-snug font-bold text-brand-red">
                  {risk.title[0]} <br className="hidden sm:inline" />
                  {risk.title[1]}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body sm:mt-3 sm:text-[15px]">
                  {risk.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA strip */}
        <div data-reveal="scale" className="mt-8 flex flex-col items-stretch gap-5 rounded-xl bg-navy px-5 py-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-start gap-3 sm:items-center">
            <ShieldAlert aria-hidden="true" className="mt-0.5 h-7 w-7 shrink-0 text-brand-red sm:mt-0" strokeWidth={1.75} />
            <p className="text-lg leading-snug font-semibold text-white sm:text-xl">
              Do not wait until you are in trouble to figure out how to get help.
            </p>
          </div>
          <Button href={site.links.getProtected} variant="red" className="w-full shrink-0 sm:w-auto">
            {site.cta.setup}
          </Button>
        </div>
      </Container>
    </section>
  );
}
