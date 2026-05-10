import { Blog } from "@/components/site/Blog";
import { Booking } from "@/components/site/Booking";
import { Courses } from "@/components/site/Courses";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Testimonials } from "@/components/site/Testimonials";
import { TextScrollAnimator } from "@/components/site/TextScrollAnimator";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <TextScrollAnimator />
      <Navbar />
      <ScrollProgress />
      <Hero />
      <Courses />
      <Gallery />
      <Blog />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}