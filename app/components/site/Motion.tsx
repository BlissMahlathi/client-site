"use client";

import type { Variants } from "framer-motion";

export const sectionViewport = { once: true, amount: 0.3 };

export const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
