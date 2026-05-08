"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import nail1 from "@/assets/gallery/nail-1.jpg";
import nail2 from "@/assets/gallery/nail-2.jpg";
import nail3 from "@/assets/gallery/nail-3.jpg";
import nail4 from "@/assets/gallery/nail-4.jpg";
import nail5 from "@/assets/gallery/nail-5.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Item = { id: string; image_url: string; caption: string | null };

const defaults: Item[] = [
  { id: "d1", image_url: nail1.src, caption: "Stiletto & coffin art" },
  { id: "d2", image_url: nail2.src, caption: "Floral 3D nails" },
  { id: "d3", image_url: nail3.src, caption: "Tasha's Glamour signature" },
  { id: "d4", image_url: nail4.src, caption: "Student showcase" },
  { id: "d5", image_url: nail5.src, caption: "Color stiletto set" },
];

export function Gallery() {
  const tiles = defaults;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-tile", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.75,
        ease: "power3.out",
        stagger: { amount: 0.5, from: "start" },
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 px-6 bg-gradient-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="Our Gallery"
          subtitle="A glimpse of work from our students and instructors."
        />
        <div className="gallery-grid columns-2 md:columns-3 lg:columns-4 gap-4 mt-12 *:mb-4">
          {tiles.map((it) => (
            <div
              key={it.id}
              className="gallery-tile break-inside-avoid rounded-2xl overflow-hidden shadow-soft group relative"
            >
              <Image
                src={it.image_url}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                alt={it.caption ?? "Nail art by Tasha's Glamour"}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              />
              {it.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium">{it.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
