import { site } from "@/lib/runners/site";
import { Container } from "@/components/runners/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-deep pb-24 pt-8 text-white/70 md:pb-8">
      {/* No logo here: the client removed the footer logo (runners update PDF, 2026-10-12). */}
      <Container className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-1 text-sm">
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
