"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, reducedFadeUp, reducedStaggerContainer } from "@/lib/animation";
import type { Variants } from "framer-motion";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  id?: string;
}

/**
 * A section wrapper that fades/slides children in when scrolled into view.
 * Automatically respects `prefers-reduced-motion`.
 */
export function MotionSection({
  children,
  className,
  delay = 0,
  stagger = false,
  id,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const variants: Variants = shouldReduceMotion
    ? stagger
      ? reducedStaggerContainer
      : reducedFadeUp
    : stagger
      ? staggerContainer
      : fadeUp;

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

/**
 * A child item that animates when its parent MotionSection (with stagger=true) enters the view.
 */
export function MotionItem({ children, className, delay, variants }: MotionItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeVariants: Variants = shouldReduceMotion ? reducedFadeUp : (variants ?? fadeUp);

  return (
    <motion.div
      className={className}
      variants={safeVariants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
