import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BatteryFull,
  CalendarClock,
  Ellipsis,
  Eye,
  House,
  MapPin,
  MessageCircleQuestionMark,
  MessageSquare,
  Signal,
  Siren,
  Users,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";
import { site } from "@/lib/runners/site";

const reportQuestions: { label: string; icon: LucideIcon }[] = [
  { label: "What did you see?", icon: Eye },
  { label: "Where did it happen?", icon: MapPin },
  { label: "When did it happen?", icon: CalendarClock },
  { label: "Why did it concern you?", icon: MessageCircleQuestionMark },
];

const tabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Home", icon: House },
  { label: "Message", icon: MessageSquare },
  { label: "Report", icon: Siren, active: true },
  { label: "Circle", icon: Users },
  { label: "More", icon: Ellipsis },
];

const PHOTO_SRC = "/runners/images/see-something.jpg";
const PHOTO_ALT =
  "A runner on a quiet road at sunset heads toward a parked SUV — the kind of situation runners notice first.";

/** Bold red eye-in-circle used on the app's report screen. */
function EyeAlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" focusable="false">
      <path d="M2 20C9 8.5 19.5 2 32 2s23 6.5 30 18c-7 11.5-17.5 18-30 18S9 31.5 2 20z" className="fill-brand-red" />
      <circle cx="32" cy="20" r="12" fill="#fff" />
      <circle cx="32" cy="20" r="7.5" className="fill-brand-red" />
    </svg>
  );
}

/** HTML/CSS phone mockup of the My Guardian Link "I See Something" report screen. */
function PhoneMockup() {
  return (
    <div
      role="img"
      aria-label="My Guardian Link app showing the I See Something screen with a Report Activity button"
      className="relative w-[210px] shrink-0 rounded-[2.4rem] bg-[#0d0f14] p-2.5 shadow-[0_24px_48px_-20px_rgb(16_35_58/0.55)] ring-1 ring-black/20 sm:w-[230px] xl:w-[240px]"
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute top-24 -left-[3px] h-10 w-[3px] rounded-l bg-[#0d0f14]" />
      <span aria-hidden="true" className="absolute top-28 -right-[3px] h-14 w-[3px] rounded-r bg-[#0d0f14]" />

      <div aria-hidden="true" className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[1.9rem] bg-white">
        {/* notch */}
        <div className="absolute top-0 left-1/2 h-5 w-[42%] -translate-x-1/2 rounded-b-2xl bg-[#0d0f14]" />

        {/* status bar */}
        <div className="flex items-center justify-between px-5 pt-1.5 text-[10px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-0.5">
            <Signal className="h-2.5 w-2.5" strokeWidth={2.5} />
            <Wifi className="h-2.5 w-2.5" strokeWidth={2.5} />
            <BatteryFull className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>

        {/* screen content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <span className="relative flex items-center justify-center">
            <span aria-hidden="true" className="absolute h-16 w-16 animate-soft-ping rounded-full bg-brand-red/25" />
            <EyeAlertIcon className="relative h-auto w-[72px]" />
          </span>
          <p className="font-slab text-[19px] leading-tight font-bold tracking-wide text-ink uppercase">
            I See
            <br />
            Something
          </p>
          <span className="rounded-md bg-brand-red px-4 py-2 text-[12px] font-semibold text-white shadow-sm">
            Report Activity
          </span>
        </div>

        {/* tab bar */}
        <div className="bg-app-navy px-1.5 pt-2 pb-1.5">
          <ul className="grid grid-cols-5">
            {tabs.map(({ label, icon: Icon, active }) => (
              <li key={label} className="flex flex-col items-center gap-0.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    active ? "bg-brand-red text-white" : "text-white/85"
                  }`}
                >
                  <Icon className="h-3 w-3" strokeWidth={2.25} />
                </span>
                <span className={`text-[7.5px] leading-none ${active ? "font-semibold text-white" : "text-white/70"}`}>
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-1.5 h-1 w-16 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}

export function SeeSomething() {
  return (
    <section
      id="see-something"
      aria-labelledby="see-something-heading"
      className="relative overflow-hidden bg-mist py-14 sm:py-16 lg:py-20"
    >
      {/* Desktop photo — bleeds to the right edge and fades into the gray band */}
      <div data-reveal="fade" className="absolute inset-y-0 right-0 hidden lg:block lg:w-[32%] xl:w-[38%]">
        <Image src={PHOTO_SRC} alt={PHOTO_ALT} fill sizes="(min-width: 1280px) 38vw, 32vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-mist via-mist/50 to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-10 lg:max-w-[68%] lg:flex-row lg:items-center lg:gap-10 xl:max-w-[62%] xl:gap-12">
          {/* Copy */}
          <div data-reveal className="order-1 min-w-0 flex-1 lg:order-2">
            <h2
              id="see-something-heading"
              className="font-display text-[44px] leading-[0.95] font-bold text-ink min-[360px]:text-5xl sm:text-6xl lg:text-[56px] xl:text-6xl"
            >
              <span className="block">See Something.</span>
              <span className="block">Say Something.</span>
            </h2>
            <p className="mt-4 text-lg leading-snug font-semibold text-brand-red">
              Your run can also help protect someone else.
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body sm:text-base">
              Runners see what others miss — suspicious vehicles, harassment, stalking behavior, unsafe situations, or
              someone who may need help. My Guardian Link makes it easier to report what you see and help protect your
              community.
            </p>

            <p className="mt-6 text-sm font-semibold text-ink">Report behavior, not fear or guesses:</p>
            <ul data-reveal-stagger className="mt-2.5 grid max-w-xl grid-cols-2 gap-2">
              {reportQuestions.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm leading-snug font-medium text-ink"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-red" strokeWidth={2} />
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
            </ul>

            <Button href={site.links.getProtected} variant="red" className="mt-7 w-full sm:w-auto">
              Set Up Protection + Reporting
            </Button>
          </div>

          {/* Phone mockup (+ photo below lg) */}
          <div data-reveal="left" className="order-2 flex flex-col items-center gap-6 md:flex-row md:items-stretch lg:order-1 lg:shrink-0">
            <div className="flex justify-center md:items-center">
              <PhoneMockup />
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-card md:aspect-auto md:min-h-[300px] md:flex-1 lg:hidden">
              <Image
                src={PHOTO_SRC}
                alt={PHOTO_ALT}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
