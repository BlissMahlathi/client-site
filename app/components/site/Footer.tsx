"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, reducedFadeUp, reducedStaggerContainer } from "@/lib/animation";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const container = shouldReduceMotion ? reducedStaggerContainer : staggerContainer;
  const item = shouldReduceMotion ? reducedFadeUp : fadeUp;

  return (
    <footer className="bg-foreground text-background/90 py-16 px-6">
      <motion.div
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={item}>
          <p className="font-script text-3xl bg-gradient-pink bg-clip-text text-transparent">
            Tasha&apos;s Glamour
          </p>
          <p className="mt-4 text-sm text-background/60 max-w-xs">
            Professional nail training academy. Register with R200 and pay your training amount at
            the class.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <h4 className="font-display text-lg mb-4">Visit Us</h4>
          <p className="text-sm text-background/70">296 Pretorius Street</p>
          <p className="text-sm text-background/70">Premium Towers (next to Steers)</p>
          <p className="text-sm text-background/70 mt-2">Registration: R200 (separate)</p>
        </motion.div>
        <motion.div variants={item}>
          <h4 className="font-display text-lg mb-4">Follow</h4>
          <p className="text-sm text-background/70">TikTok: Tasha&apos;s Glamour Training</p>
          <p className="text-sm text-background/70">Instagram: @tashas_glamour11</p>
          <div className="flex gap-4 mt-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/tashas_glamour11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@tashasglamourtraining"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.79a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.22Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-background/10 text-center text-xs text-background/50">
        © {new Date().getFullYear()} Tasha&apos;s Glamour Training. All rights reserved.
      </div>
    </footer>
  );
}
