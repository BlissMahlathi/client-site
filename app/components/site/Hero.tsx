"use client";

import Image from "next/image";
import heroImg from "@/assets/hero-nails.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      data-gsap-text
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero animate-gradient pt-16 sm:pt-[72px]"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-blush/40 blur-3xl animate-float will-change-transform"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-sky-deep/40 blur-3xl animate-float will-change-transform"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* TEXT */}
        <div className="max-w-xl">
          <p className="font-script text-xl sm:text-2xl text-primary mb-4">Welcome to Tasha&apos;s Glamour</p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-[1.05] text-foreground">
            <span className="word inline-block mr-2">Learn</span>
            <span className="word inline-block mr-2">the</span>
            <span className="word inline-block mr-2">Art</span>
            <span className="word inline-block mr-2">of</span>
            <em className="font-script text-primary not-italic inline-block mr-2 word">Beautiful</em>
            <span className="word inline-block mr-2">Nails</span>
            <span className="word inline-block mr-2">&amp;</span>
            <span className="word inline-block">Lashes</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Hands-on training in nails, cluster lashes, makeup, installation, and more. Pay a 50%
            deposit to secure your spot and train with a certified pro.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-pink text-white shadow-soft hover:shadow-glow rounded-full px-8 h-12 focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-200 active:scale-[0.98]"
            >
              <a href="#contact">Book a Course</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full px-8 h-12 border-primary/40 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-200 active:scale-[0.98]"
            >
              <a href="#gallery">View Gallery</a>
            </Button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative" data-parallax data-speed="0.12">
          <div
            className="absolute inset-0 bg-gradient-pink rounded-[3rem] blur-2xl opacity-30"
            aria-hidden="true"
          />

          <Image
            src={heroImg}
            alt="Beautiful manicured nails with floral nail art"
            loading="eager"
            width={1200}
            height={900}
            className="relative rounded-[3rem] shadow-soft object-cover w-full aspect-4/3"
          />
        </div>
      </div>
    </section>
  );
}
