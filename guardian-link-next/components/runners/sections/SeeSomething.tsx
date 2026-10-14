import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, Eye, MapPin, MessageCircleQuestionMark } from "lucide-react";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";
import { site } from "@/lib/runners/site";

const reportQuestions: { label: string; icon: LucideIcon }[] = [
  { label: "What did you see?", icon: Eye },
  { label: "Where did it happen?", icon: MapPin },
  { label: "When did it happen?", icon: CalendarClock },
  { label: "Why did it concern you?", icon: MessageCircleQuestionMark },
];

// The app's Secondary Alert screen: the client's screenshot (2026-10-14).
const SCREEN_SRC = "/runners/images/app/see-something-screen.jpg";

const PHOTO_SRC = "/runners/images/see-something.jpg";
const PHOTO_ALT =
  "A runner on a quiet road at sunset heads toward a parked SUV — the kind of situation runners notice first.";

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
              {/* The app's Secondary Alert screen — the client's screenshot, in the same phone frame. */}
              <figure className="mx-auto w-[230px] sm:w-[250px] lg:max-w-[260px]">
                <div className="rounded-[2.75rem] bg-navy-deep p-2.5 shadow-[0_30px_60px_-25px_rgb(16_35_58/0.55)] ring-1 ring-black/10">
                  <Image
                    src={SCREEN_SRC}
                    alt="My Guardian Link app: Secondary Alert screen with the See Something Say Something alert"
                    width={738}
                    height={1600}
                    sizes="260px"
                    className="block h-auto w-full rounded-[2.2rem]"
                  />
                </div>
              </figure>
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
