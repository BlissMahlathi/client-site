import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import nail1 from "@/assets/gallery/nail-1.jpg";
import nail2 from "@/assets/gallery/nail-2.jpg";
import nail3 from "@/assets/gallery/nail-3.jpg";
import nail4 from "@/assets/gallery/nail-4.jpg";
import nail5 from "@/assets/gallery/nail-5.jpg";

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

  return (
    <section id="gallery" data-gsap-text className="py-24 px-4 sm:px-6 bg-gradient-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="Our Gallery"
          subtitle="A glimpse of work from our students and instructors."
        />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-12 *:mb-4">
          {tiles.map((it, i) => (
            <div
              key={it.id}
              data-parallax
              data-speed={0.04 + (i % 3) * 0.02}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-soft transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={it.image_url}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                alt={it.caption ?? "Nail art by Tasha's Glamour"}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
