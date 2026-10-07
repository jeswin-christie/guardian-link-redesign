import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "red" | "navy" | "outline-light" | "outline-navy" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-center font-semibold leading-tight transition-[color,background-color,border-color,translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const variants: Record<Variant, string> = {
  red: "bg-brand-red text-white shadow-sm hover:bg-brand-red-dark",
  navy: "bg-navy text-white shadow-sm hover:bg-navy-deep",
  "outline-light": "border-2 border-white text-white hover:bg-white hover:text-navy",
  "outline-navy": "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  white: "bg-white text-navy shadow-sm hover:bg-mist",
};

const sizes: Record<Size, string> = {
  md: "py-3 text-[15px]",
  lg: "py-4 text-base sm:text-lg",
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Stretch to full width (use e.g. "w-full sm:w-auto" via className for mobile-only). */
  children: ReactNode;
};

/** CTA link styled as a button. All CTAs on this page are links (portal or in-page anchors). */
export function Button({ href, variant = "red", size = "md", className = "", children, ...rest }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
