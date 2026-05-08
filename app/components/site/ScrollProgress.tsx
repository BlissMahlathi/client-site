"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        },
      );
    }, fillRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 px-4 pt-0.5 sm:px-6"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-full bg-foreground/10 shadow-[0_0_18px_rgba(255,192,215,0.2)]">
        <div
          ref={fillRef}
          className="h-1 w-full origin-left bg-gradient-to-r from-primary via-sky-400 to-rose-300"
        />
      </div>
    </div>
  );
}
