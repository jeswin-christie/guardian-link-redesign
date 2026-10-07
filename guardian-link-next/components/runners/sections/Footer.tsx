import { site } from "@/lib/runners/site";
import { Container } from "@/components/runners/ui/Container";
import { Logo } from "@/components/runners/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-deep pb-24 pt-8 text-white/70 md:pb-8">
      <Container className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <Logo tone="light" className="justify-center md:justify-start [&_img]:h-9 sm:[&_img]:h-10" />
        <div className="flex flex-col items-center gap-1 text-sm md:items-end">
          <a
            href={site.links.website}
            className="inline-flex min-h-11 items-center break-all font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {site.displayUrl}
          </a>
          <p>
            © {year} {site.brand}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
