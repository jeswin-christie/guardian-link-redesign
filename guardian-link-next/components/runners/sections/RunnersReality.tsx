import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/runners/ui/Container";

/*
 * The Runners Reality scenario video, set up like the /parentplan/ page's demo:
 * a poster card with a play button that opens the video. Same video and poster as
 * the main site uses (public/media/video/runners-reality.mp4, 720p web encode of the
 * client's "Runners Reality" film; public/media/video-poster-runners.webp).
 */
const VIDEO_SRC = "/media/video/runners-reality.mp4";
const POSTER_SRC = "/media/video-poster-runners.webp";

export function RunnersReality() {
  return (
    <section id="video" aria-labelledby="video-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">See the experience</p>
          <h2 id="video-heading" className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-[26px]">
            See Protection in Action
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-body sm:text-base">
            See what happens from the moment a runner activates My Guardian Link.
          </p>
        </div>

        <a
          href={VIDEO_SRC}
          target="_blank"
          rel="noopener"
          aria-label="Play the Runners Reality video"
          data-reveal="scale"
          className="lift group relative mx-auto mt-8 block aspect-video max-w-5xl overflow-hidden rounded-xl bg-navy shadow-card sm:mt-10"
        >
          <Image
            src={POSTER_SRC}
            alt=""
            fill
            sizes="(min-width: 1072px) 1024px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Darken toward the bottom so the caption reads */}
          <span aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-navy/10 to-navy/70" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-red shadow-lift transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
          >
            <Play fill="currentColor" strokeWidth={0} className="ml-1 h-7 w-7 sm:h-10 sm:w-10" />
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-lg font-bold leading-tight text-white sm:bottom-7 sm:left-8 sm:right-8 sm:text-2xl">
            Watch Runners Reality
          </span>
        </a>
      </Container>
    </section>
  );
}
