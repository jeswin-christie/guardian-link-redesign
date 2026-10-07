import type { LucideIcon } from "lucide-react";
import {
  BellOff,
  Headphones,
  Headset,
  MessageSquareText,
  Mic,
  PhoneOff,
  Pointer,
  Send,
  Siren,
  Watch,
} from "lucide-react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";
import { Container } from "@/components/runners/ui/Container";

const methods: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: Pointer, label: "One-Touch", text: "Tap once to trigger help." },
  { icon: Mic, label: "Hey Siri", text: "Use your voice when your phone is not in your hand." },
  { icon: MessageSquareText, label: "Speech-to-Text", text: "Speak or whisper what is happening." },
  { icon: Headphones, label: "Earbuds", text: "Activate help while keeping your movement natural." },
  { icon: BellOff, label: "Silent Preset", text: "Send help when speaking out loud could make it worse." },
  { icon: Watch, label: "Smart Watch", text: "Trigger protection from your wrist." },
];

const outcomes: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Send,
    title: "What gets sent",
    text: "Your identity, GPS location, phone number, and urgent need for help — so the right people know who you are, where you are, and what may be happening.",
  },
  {
    icon: Headset,
    title: "What happens next",
    text: "A live coordinator can check in, contact your Trusted Circle, help assess the situation, and escalate when needed.",
  },
];

const iconProps = { "aria-hidden": true, strokeWidth: 1.5 } as const;

export function WhyItMatters() {
  return (
    <section id="how-it-works" aria-labelledby="why-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <div data-reveal-stagger className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-8">
          {/* Left: the communication barrier */}
          <div className="mx-auto max-w-md min-w-0 text-center lg:max-w-none">
            <PhoneOff {...iconProps} className="mx-auto h-14 w-14 text-brand-red" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-red">How it works</p>
            <h2 id="why-heading" className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-[26px]">
              The problem is not just danger. It is getting help when you cannot safely communicate.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Every second matters when something feels wrong. Stopping to explain is not always safe. My Guardian Link
              helps remove the communication roadblocks that slow help down.
            </p>
          </div>

          {/* Center: activation methods — the focal card */}
          <div className="lift min-w-0 rounded-xl border border-line bg-white p-5 shadow-card sm:p-7">
            <h3 className="text-center text-xl font-bold leading-tight text-ink sm:text-2xl">
              Activate help without stopping to explain.
            </h3>
            <ul data-reveal-stagger className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 min-[400px]:grid-cols-2">
              {methods.map(({ icon: Icon, label, text }) => (
                <li key={label} className="group flex min-w-0 items-start gap-3">
                  <Icon {...iconProps} className="h-8 w-8 shrink-0 text-brand-red transition-transform duration-300 group-hover:scale-110" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-snug text-ink">{label}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-center text-sm font-semibold text-ink">
              Exact location + live call back + Trusted Circle support.
            </p>
          </div>

          {/* Right: the outcome */}
          <div className="mx-auto max-w-md min-w-0 text-center lg:max-w-none">
            <Siren {...iconProps} className="mx-auto h-14 w-14 text-brand-red" />
            <h3 className="mt-4 text-2xl font-bold leading-tight text-ink sm:text-[26px]">Help gets moving fast.</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              My Guardian Link lets runners send their identity, GPS location, and urgent need for help fast — when they
              cannot safely call, speak, or explain.
            </p>
          </div>
        </div>

        {/* What gets sent / What happens next */}
        <ul data-reveal-stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {outcomes.map(({ icon: Icon, title, text }) => (
            <li key={title} className="lift flex min-w-0 items-start gap-4 rounded-xl border border-line bg-mist p-5 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <Icon {...iconProps} className="h-6 w-6 text-brand-red" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-body">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-8 flex justify-center">
          <Button href={site.links.activation} variant="red" size="lg" className="w-full sm:w-auto">
            Activate My Runner Setup
          </Button>
        </div>
      </Container>
    </section>
  );
}
