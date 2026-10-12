import Image from "next/image";
import { site } from "@/lib/runners/site";

/**
 * My Guardian Link logo — the brand's own artwork (the hand-drawn SVG it replaces was
 * flagged in the client proof, 2026-10-12). `tone="light"` is for dark backgrounds.
 */
export function MglLogo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return tone === "light" ? (
    <Image
      src="/runners/images/mgl-logo-white.png"
      alt="My Guardian Link — get connected, stay protected"
      width={1000}
      height={309}
      className={`w-auto ${className}`}
    />
  ) : (
    <Image
      src="/runners/images/mgl-logo.png"
      alt="My Guardian Link — get connected, stay protected"
      width={1212}
      height={324}
      className={`w-auto ${className}`}
    />
  );
}

/**
 * The hero's logo: the partner's logo when `site.partner` has one (it replaces the My Guardian
 * Link logo there, per the client proof), otherwise the My Guardian Link logo.
 */
export function Logo({ className = "" }: { className?: string }) {
  const partner = site.partner;
  return (
    <div className={`flex items-center ${className}`}>
      {partner?.logo ? (
        <Image src={partner.logo} alt={partner.name} width={383} height={154} className="h-14 w-auto sm:h-16 lg:h-[72px]" />
      ) : (
        <MglLogo className="h-12 sm:h-14" />
      )}
    </div>
  );
}
