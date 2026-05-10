"use client";

import { useEffect } from "react";

const TEXT_SELECTOR = "h1, h2, h3, h4, p, a, li, blockquote, figcaption, label, time, span.word";

export function TextScrollAnimator() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert?: () => void } | null = null;

    // Dynamically import GSAP and ScrollTrigger to keep initial bundle smaller
    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default ?? gsapModule;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger ?? ScrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const duration = isMobile ? 0.48 : 0.72;
      const blurStart = isMobile ? 3 : 6;
      const stagger = isMobile ? 0.03 : 0.06;

      ctx = gsap.context(() => {
        const scopes = gsap.utils.toArray<HTMLElement>("[data-gsap-text]");

        // Word reveal and element reveal
        scopes.forEach((scope) => {
          const words = scope.querySelectorAll<HTMLElement>("span.word");
          const targets = scope.querySelectorAll<HTMLElement>(TEXT_SELECTOR);

          if (words.length) {
            gsap.set(words, { opacity: 0, y: 18, filter: `blur(${blurStart}px)`, willChange: "transform,opacity,filter" });
            gsap.to(words, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration,
              ease: "power3.out",
              stagger,
              clearProps: "willChange,filter",
              scrollTrigger: { trigger: scope, start: "top 82%", once: true },
            });
          }

          // fallback to generic targets when no word split
          if (targets.length && !words.length) {
            gsap.set(targets, { opacity: 0, y: 22, filter: `blur(${blurStart}px)`, willChange: "transform,opacity,filter" });
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration,
              ease: "power3.out",
              stagger,
              clearProps: "willChange,filter",
              scrollTrigger: { trigger: scope, start: "top 82%", once: true },
            });
          }
        });

        // Parallax depth for elements with data-parallax
        const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-parallax]");
        parallaxEls.forEach((el) => {
          const speedAttr = el.getAttribute("data-speed");
          const speed = speedAttr ? parseFloat(speedAttr) : 0.08;
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
      }, document.body);
    })();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, []);

  return null;
}
