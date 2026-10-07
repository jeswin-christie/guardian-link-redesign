import type { ReactNode } from "react";
import { CircleCheck, MapPinned, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";
import { site } from "@/lib/runners/site";
import { AppAlertMockup } from "./AppAlertMockup";

const pillars: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Protection",
    text: "When something feels wrong, help can start moving quickly.",
    Icon: ShieldCheck,
  },
  {
    title: "Connection",
    text: "Trusted contacts or teammates receive your updates and location.",
    Icon: Users,
  },
  {
    title: "Coordination",
    text: "Everyday check-ins, pickups, relay handoffs, race logistics, and situational awareness.",
    Icon: MapPinned,
  },
];

const Code = () => <strong className="font-bold tracking-wide text-brand-red">{site.groupCode}</strong>;
const Hl = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-brand-red">{children}</strong>;

type Option = {
  tag: string;
  title: string;
  team: boolean;
  before: ReactNode[];
  during: ReactNode[];
  result: string;
};

const options: Option[] = [
  {
    tag: "Option 1 — Free",
    title: "Check in with one teammate",
    team: false,
    before: [
      "Download My Guardian Link.",
      <>
        Enter group code <Code />.
      </>,
      "Select Free Membership.",
      "Add one teammate as your Trusted Contact.",
    ],
    during: [
      <>
        On the Alert screen, press and hold <Hl>Trusted Contact Assist</Hl>.
      </>,
      <>
        Say &ldquo;Check-in&rdquo; and your update, <Hl>then release</Hl>.
      </>,
    ],
    result: "Your selected teammate receives your update and map.",
  },
  {
    tag: "Option 2 — Paid Membership",
    title: "Check in with your entire team",
    team: true,
    before: [
      "Download My Guardian Link.",
      <>
        Enter group code <Code />.
      </>,
      "Select a Paid Membership.",
      "Add your team members as Trusted Contacts.",
    ],
    during: [
      <>
        On the Alert screen, press and hold <Hl>Trusted Network Assist</Hl>.
      </>,
      <>
        Say &ldquo;Check-in&rdquo; and your update, <Hl>then release</Hl>.
      </>,
    ],
    result:
      "Your team receives your update, live tracking map, distance, time to complete, and directions to your teammate.",
  },
];

/** Running figure drawn with thick round strokes so it reads as a silhouette. */
function RunnerFigure({ x = 0, opacity = 1 }: { x?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} 0)`} opacity={opacity}>
      <circle cx="14.2" cy="3.6" r="2.3" fill="currentColor" stroke="none" />
      <path d="M13.2 7.2 11.2 13.4" />
      <path d="M12.7 8.4 9.4 9.8 7.8 12.6" />
      <path d="M12.7 8.4 15.6 10.8 18.2 9.6" />
      <path d="M11.2 13.4 14.6 16 13.6 20.6 15.8 20.8" />
      <path d="M11.2 13.4 9.4 17.2 5.6 18.2" />
    </g>
  );
}

function RunnerIcon({ team }: { team: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={team ? "0 0 52 23" : "0 0 23 23"}
      className={`shrink-0 text-ink ${team ? "h-11 w-auto sm:h-12" : "size-11 sm:size-12"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {team ? (
        <>
          <RunnerFigure x={0} opacity={0.45} />
          <RunnerFigure x={14} opacity={0.7} />
          <RunnerFigure x={28} />
        </>
      ) : (
        <RunnerFigure />
      )}
    </svg>
  );
}

function StepList({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="mt-3 space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-snug text-body">
          <span
            aria-hidden="true"
            className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white"
          >
            {i + 1}
          </span>
          <span className="min-w-0 break-words pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function OptionCard({ option }: { option: Option }) {
  const { tag, title, team, before, during, result } = option;
  const titleId = `checkin-${team ? "team" : "one"}`;
  return (
    <article
      aria-labelledby={titleId}
      className={`flex min-w-0 flex-col rounded-xl border-2 bg-white p-4 shadow-card sm:p-6 ${
        team ? "border-navy" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-1 font-display text-base font-bold uppercase leading-none tracking-wide text-white sm:text-lg ${
                team ? "bg-navy" : "bg-brand-red"
              }`}
            >
              {tag}
            </span>
            {team && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-red-soft px-2.5 py-1 text-xs font-semibold text-brand-red">
                <Users aria-hidden="true" className="size-3.5" strokeWidth={2} />
                Whole team
              </span>
            )}
          </div>
          <h4 id={titleId} className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-[1.7rem]">
            {title}
          </h4>
        </div>
        <RunnerIcon team={team} />
      </div>

      <h5 className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-brand-red">Before the race</h5>
      <StepList steps={before} />

      <hr className="my-5 border-line" />

      <h5 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-red">During the race</h5>
      <StepList steps={during} />

      {/* Spacer keeps the result boxes aligned at the bottom when cards share a row */}
      <div aria-hidden="true" className="min-h-6 flex-1" />

      <p
        className={`flex items-start gap-2.5 rounded-lg p-3.5 text-[15px] font-semibold leading-snug ${
          team ? "bg-navy text-white" : "bg-brand-red-soft text-ink"
        }`}
      >
        <CircleCheck
          aria-hidden="true"
          className={`mt-px size-5 shrink-0 ${team ? "text-white" : "text-brand-red"}`}
          strokeWidth={2}
        />
        <span className="min-w-0">{result}</span>
      </p>
    </article>
  );
}

export function EverydayUse() {
  return (
    <section id="everyday" aria-labelledby="everyday-title" className="border-t border-line bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Intro + pillars, with the app mockup beside them on desktop */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-16 lg:gap-y-10">
          <div data-reveal className="min-w-0 text-center lg:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red">Before, during, and after the run</p>
            <h2
              id="everyday-title"
              className="mt-3 font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl lg:text-6xl"
            >
              Not just for emergencies. <span className="text-brand-red">Something you&rsquo;ll actually use.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg lg:mx-0">
              During a relay race, group run, long training route, or organized event, check in with a teammate or your
              whole team &mdash; your update, location, map, distance, timing, and directions, so everyone knows where you
              are and what&rsquo;s happening.
            </p>
          </div>

          <AppAlertMockup className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />

          <ul data-reveal-stagger className="grid min-w-0 gap-4 sm:grid-cols-3 lg:col-start-1 lg:row-start-2">
            {pillars.map(({ title, text, Icon }) => (
              <li
                key={title}
                className="lift flex gap-4 rounded-xl border border-line bg-white p-5 shadow-card sm:block sm:text-center lg:text-left"
              >
                <Icon aria-hidden="true" className="size-10 shrink-0 text-brand-red sm:mx-auto lg:mx-0" strokeWidth={1.75} />
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:mt-3">{title}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-body">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Example: race-day check-in */}
        <div className="mt-16 sm:mt-20">
          <div data-reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-red">Example: Race-day check-in</p>
            <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-body">
              Here&rsquo;s how a team could set it up for an organized race. The same check-in works for group runs,
              relays, and long training days.
            </p>
          </div>

          <div data-reveal className="mt-8 overflow-hidden rounded-xl border border-line shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-brand-red px-4 py-4 text-white sm:px-8 sm:py-5">
              <div className="min-w-0">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-wide sm:text-4xl">
                  {site.eventName} Race Check-In
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">My Guardian Link</p>
              </div>
              <span className="rounded-full border border-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Example
              </span>
            </div>

            <div data-reveal-stagger className="grid gap-4 bg-mist p-3 sm:gap-6 sm:p-6 md:grid-cols-2">
              {options.map((option) => (
                <OptionCard key={option.tag} option={option} />
              ))}
            </div>
          </div>

          <div data-reveal className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
            <Button href={site.links.getProtected} variant="red" size="lg" className="w-full sm:w-auto">
              {site.cta.setup}
            </Button>
            <p className="max-w-xs text-[15px] font-medium leading-snug text-ink">
              Use it for check-ins today. Have it ready if you ever need more.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
