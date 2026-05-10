import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Post = {
  id: string;
  title: string;
  type: string;
  post_date: string;
  excerpt: string | null;
  media_url: string | null;
  embed_url: string | null;
};

const posts: Post[] = [
  {
    id: "b1",
    title: "How to prep nails for a long-lasting set",
    type: "Tutorial",
    post_date: "2026-05-03",
    excerpt: "A quick breakdown of prep, shaping, and product control for cleaner retention.",
    media_url: "/nail-1.jpg",
    embed_url: null,
  },
  {
    id: "b2",
    title: "Why posture matters in beauty training",
    type: "Insight",
    post_date: "2026-04-28",
    excerpt: "Small technique habits that improve speed, comfort, and consistency for students.",
    media_url: "/nail-2.jpg",
    embed_url: null,
  },
  {
    id: "b3",
    title: "Student showcase: soft glam and sharp detail",
    type: "Showcase",
    post_date: "2026-04-20",
    excerpt: "Recent class work and the finishing details that make a portfolio stand out.",
    media_url: "/nail-3.jpg",
    embed_url: null,
  },
];

export function Blog() {
  return (
    <section id="blog" data-gsap-text className="py-24 px-4 sm:px-6 bg-gradient-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Stories"
          title="Blog & Vlog"
          subtitle="Tutorials, trends, and behind-the-scenes."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((p, i) => (
            <article
              key={p.id}
              className="rounded-3xl border bg-card overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {p.media_url ? (
                <Image
                  src={p.media_url}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  width={800}
                  height={450}
                  alt={p.title}
                  className="w-full aspect-video object-cover"
                />
              ) : p.embed_url ? (
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Video embed
                </div>
              ) : (
                <div
                  className="aspect-video bg-gradient-soft animate-gradient"
                  aria-hidden="true"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                    {p.type}
                  </span>
                  <time className="text-muted-foreground" dateTime={p.post_date}>
                    {new Date(p.post_date).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="font-display text-xl font-semibold mt-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
