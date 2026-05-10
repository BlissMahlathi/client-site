"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT_SELECTOR = "h1, h2, h3, h4, p, a, li, blockquote, figcaption, label, time";

export function TextScrollAnimator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const scopes = gsap.utils.toArray<HTMLElement>("[data-gsap-text]");

      scopes.forEach((scope) => {
        const targets = scope.querySelectorAll<HTMLElement>(TEXT_SELECTOR);
        if (targets.length === 0) return;

        gsap.set(targets, {
          opacity: 0,
          y: 22,
          filter: "blur(6px)",
          willChange: "transform, opacity, filter",
        });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "willChange,filter",
          scrollTrigger: {
            trigger: scope,
            start: "top 82%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
