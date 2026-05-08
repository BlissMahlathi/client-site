import { FaStar } from "react-icons/fa";
import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    name: "Sophie M.",
    course: "Gel Extensions",
    rating: 5,
    quote:
      "Belle Academy completely changed my career. The instructors are pros and the small class size meant I got real feedback every day.",
  },
  {
    name: "Aaliyah K.",
    course: "Nail Art Masterclass",
    rating: 5,
    quote:
      "I went from hobbyist to booked-out salon owner in 6 months. The technique training is unreal.",
  },
  {
    name: "Megan R.",
    course: "Beginner Acrylic",
    rating: 5,
    quote:
      "So nervous on day one, so confident by day four. The studio is beautiful and the energy is so supportive.",
  },
  {
    name: "Priya S.",
    course: "Manicure & Pedicure Pro",
    rating: 5,
    quote:
      "Loved every minute. The client-care module was honestly the most useful part of my whole training.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Love Notes" title="What Students Say" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-3xl bg-card p-6 shadow-soft animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FaStar key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm text-foreground/80 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.course}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
