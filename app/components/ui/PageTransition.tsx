"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pageVariants, reducedPageVariants } from "@/lib/animation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps a page in a Framer Motion fade-in/fade-out transition.
 * Safely respects `prefers-reduced-motion`.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedPageVariants : pageVariants;

  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit">
      {children}
    </motion.div>
  );
}
