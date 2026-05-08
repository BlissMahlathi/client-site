import { Blog } from "@/components/site/Blog";
import { Booking } from "@/components/site/Booking";
import { Courses } from "@/components/site/Courses";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Testimonials } from "@/components/site/Testimonials";
import { PageTransition } from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <Courses />
        <Gallery />
        <Blog />
        <Testimonials />
        <Booking />
        <Footer />
      </main>
    </PageTransition>
  );
}