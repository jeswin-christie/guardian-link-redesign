"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BatteryFull,
  Eye,
  House,
  LayoutTemplate,
  MessageSquare,
  PenLine,
  Settings,
  ShieldCheck,
  Signal,
  User,
  Wifi,
} from "lucide-react";

type AlertMode = "primary" | "secondary";

const modes: Record<AlertMode, { tab: string; label: string; tile: string; poster: string }> = {
  primary: {
    tab: "Primary Alert",
    label: "Primary alert",
    tile: "Urgent Assist",
    poster: "Urgent Assist",
  },
  secondary: {
    tab: "Secondary Alert",
    label: "Secondary alert",
    tile: "See Something Say Something",
    poster: "See Something Say Something",
  },
};

const tabs = [
  { label: "Home", Icon: House, active: true },
  { label: "Message", Icon: MessageSquare },
  { label: "Manual Entry", Icon: PenLine },
  { label: "Switch Templates", Icon: LayoutTemplate },
  { label: "Profile", Icon: User },
];

/**
 * HTML/CSS recreation of the My Guardian Link app alert screen.
 * The Primary / Secondary toggle is a small, accessible demo (buttons with aria-pressed).
 */
export function AppAlertMockup({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<AlertMode>("primary");
  const current = modes[mode];

  return (
    <figure data-reveal="right" className={`mx-auto w-full max-w-[280px] lg:max-w-[300px] ${className}`}>
      {/* Device frame */}
      <div className="rounded-[2.75rem] bg-navy-deep p-2.5 shadow-[0_30px_60px_-25px_rgb(16_35_58/0.55)] ring-1 ring-black/10">
        <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[2.2rem] bg-[#f2f2f2] font-slab text-ink">
          {/* Dynamic island */}
          <div aria-hidden="true" className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar + app header */}
          <div className="bg-white">
            <div aria-hidden="true" className="flex items-center justify-between px-6 pt-3 font-sans text-[11px] font-semibold text-ink">
              <span>2:48</span>
              <span className="flex items-center gap-1">
                <Signal className="size-3" strokeWidth={2.5} />
                <Wifi className="size-3" strokeWidth={2.5} />
                <BatteryFull className="size-4" strokeWidth={2} />
              </span>
            </div>
            <div className="relative flex items-center justify-center px-4 pb-2.5 pt-3">
              <Image
                src="/runners/images/mgl-logo.svg"
                alt="My Guardian Link"
                width={520}
                height={150}
                unoptimized
                className="h-8 w-auto"
              />
              <Settings aria-hidden="true" className="absolute right-4 size-5 text-ink/70" strokeWidth={1.5} />
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col px-3 pt-3">
            <div
              role="group"
              aria-label="Alert screen (interactive preview)"
              className="grid grid-cols-2 rounded-full bg-[#e6ebf1] p-0.5 font-sans text-[11px]"
            >
              {(Object.keys(modes) as AlertMode[]).map((key) => {
                const active = key === mode;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setMode(key)}
                    className={`relative rounded-full py-1.5 transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${
                      active ? "bg-app-navy text-white shadow-sm" : "text-[#4b5563] hover:text-app-navy"
                    }`}
                  >
                    {modes[key].tab}
                  </button>
                );
              })}
            </div>

            <p aria-hidden="true" className="mt-3 text-center text-sm font-bold text-[#444]">
              {current.label}
            </p>

            {/* Alert tile */}
            <div className="flex flex-1 items-center">
              <div className="flex h-32 w-full overflow-hidden rounded-xl border-[3px] border-app-navy bg-white">
                <div className="flex min-w-0 flex-1 items-center bg-[#c62828] px-3">
                  <p key={mode} aria-live="polite" className="animate-rise text-lg font-bold leading-tight text-white">
                    {current.tile}
                  </p>
                </div>
                <div aria-hidden="true" className="flex w-[36%] shrink-0 items-center bg-white p-1.5">
                  <div className="flex h-full w-full flex-col bg-[#e6ebf1] px-1 py-2">
                    <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-linear-to-b from-brand-red-dark to-[#5c090c] px-1 text-center">
                      {mode === "primary" ? (
                        <ShieldCheck className="size-6 text-amber" strokeWidth={1.75} />
                      ) : (
                        <Eye className="size-6 text-amber" strokeWidth={1.75} />
                      )}
                      <span className="font-display text-[8px] font-bold uppercase leading-none tracking-wide text-amber">
                        {current.poster}
                      </span>
                    </div>
                    <div className="bg-white px-1 py-1.5 text-[5px] leading-none text-ink">Text Message</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom tab bar */}
          <div aria-hidden="true" className="grid grid-cols-5 border-t border-line bg-white px-1 pb-4 pt-2 font-sans">
            {tabs.map(({ label, Icon, active }) => (
              <span
                key={label}
                className={`flex flex-col items-center gap-0.5 text-center text-[8px] leading-tight ${
                  active ? "text-mgl-blue" : "text-muted"
                }`}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted">
        The My Guardian Link alert screen. Tap Primary or Secondary to preview.
      </figcaption>
    </figure>
  );
}
