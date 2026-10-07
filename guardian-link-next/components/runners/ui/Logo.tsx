import Image from "next/image";
import { site } from "@/lib/runners/site";

const slab = "var(--font-roboto-slab), Georgia, serif";

/** Inline so the wordmark uses the page's Roboto Slab (an <img> SVG can't reach page fonts). */
function MglWordmark({ tone, className }: { tone: "dark" | "light"; className: string }) {
  const blue = tone === "light" ? "#FFFFFF" : "#0B4F8A";
  return (
    <svg viewBox="0 0 520 150" className={className} role="img" aria-label="My Guardian Link — get connected, stay protected">
      <path d="M12 24 Q62 8 116 14 L116 78 Q116 120 64 144 Q12 120 12 78 Z" fill="#0B4F8A" stroke={tone === "light" ? "#FFFFFF" : "#0A3F6E"} strokeWidth="2" />
      <path d="M21 30 Q23 29 28 28 L28 80 Q28 112 60 134 Q24 118 21 80 Z" fill="#E8772E" />
      <text x="68" y="90" textAnchor="middle" fontFamily={slab} fontWeight="700" fontSize="50" fill="#FFFFFF" textLength="66" lengthAdjust="spacingAndGlyphs">
        my
      </text>
      <text x="130" y="82" fontFamily={slab} fontWeight="700" fontSize="54" fill={blue} textLength="376" lengthAdjust="spacingAndGlyphs">
        GuardianLink
      </text>
      <g fontFamily={slab} fontWeight="700" fontSize="22" fill="#E8772E">
        <text x="134" y="118" textLength="160" lengthAdjust="spacingAndGlyphs">
          get connected
        </text>
        <path d="M308 99 L299 112 L305 112 L301 124 L312 108 L306 108 L310 99 Z" />
        <text x="318" y="118" textLength="184" lengthAdjust="spacingAndGlyphs">
          stay protected
        </text>
      </g>
    </svg>
  );
}

/**
 * My Guardian Link logo, plus the influencer/partner logo when `site.partner` is set.
 * `tone="light"` is for dark backgrounds.
 */
export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const partner = site.partner;
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <MglWordmark tone={tone} className="h-12 w-auto sm:h-14" />
      {partner && (
        <div className={`flex items-center gap-3 border-l pl-4 ${tone === "light" ? "border-white/30" : "border-line"}`}>
          {partner.logo ? (
            <Image src={partner.logo} alt={partner.name} width={160} height={64} className="h-10 w-auto sm:h-12" />
          ) : null}
          <span className={`text-xs font-semibold uppercase tracking-wider ${tone === "light" ? "text-white/80" : "text-muted"}`}>
            with <span className={tone === "light" ? "text-white" : "text-ink"}>{partner.name}</span>
          </span>
        </div>
      )}
    </div>
  );
}
