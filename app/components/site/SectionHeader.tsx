"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, reducedFadeUp, reducedStaggerContainer } from "@/lib/animation";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const container = shouldReduceMotion ? reducedStaggerContainer : staggerContainer;
  const item = shouldReduceMotion ? reducedFadeUp : fadeUp;

  return (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p variants={item} className="font-script text-2xl text-primary">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={item} className="text-4xl md:text-5xl font-display font-semibold mt-2">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={item} className="text-muted-foreground mt-4">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
