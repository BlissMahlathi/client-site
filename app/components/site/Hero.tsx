"use client";

import Image from "next/image";
import heroImg from "@/assets/hero-nails.jpg";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { reducedFadeUp, reducedStaggerContainer } from "@/lib/animation";

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const heroImage: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? reducedStaggerContainer : heroContainer;
  const itemVariants = shouldReduceMotion ? reducedFadeUp : heroItem;
  const imageVariants = shouldReduceMotion ? reducedFadeUp : heroImage;

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero animate-gradient"
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

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="font-script text-2xl text-primary mb-4">
            Welcome to Tasha&apos;s Glamour
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-[1.05] text-foreground"
          >
            Learn the Art of <em className="font-script text-primary not-italic">Beautiful</em>{" "}
            Nails &amp; Lashes
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 text-lg text-muted-foreground max-w-md">
            Hands-on training in nails, cluster lashes, makeup, installation, and more. Pay a 50%
            deposit to secure your spot and train with a certified pro.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-pink text-white shadow-soft hover:shadow-glow rounded-full px-8 h-12 focus-visible:ring-2 focus-visible:ring-primary group"
            >
              <a href="#contact" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Book a Course
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 border-primary/40 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
            >
              <a href="#gallery">View Gallery</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className="relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
