"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/runners/site";
import { Button } from "@/components/runners/ui/Button";

/**
 * Sticky bottom CTA for phones. Slides up once the visitor scrolls past the hero
 * (i.e. #risks reaches the viewport) and hides again while the final CTA
 * (#get-started) or anything below it is on screen.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const start = document.getElementById("risks");
      const end = document.getElementById("get-started");

      const pastHero = start ? start.getBoundingClientRect().top < vh * 0.85 : window.scrollY > vh * 0.9;
      const atFinal = end ? end.getBoundingClientRect().top < vh * 0.9 : false;

      setVisible(pastHero && !atFinal);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(16_35_58/0.25)] transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button href={site.links.getProtected} variant="red" className="w-full">
        {site.cta.setup}
      </Button>
    </div>
  );
}
