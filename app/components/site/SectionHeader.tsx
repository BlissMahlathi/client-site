"use client";

import { motion } from "framer-motion";
import { itemVariants, sectionVariants, sectionViewport } from "./Motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={sectionVariants}
    >
      <motion.p variants={itemVariants} className="font-script text-2xl text-primary">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-display font-semibold mt-2"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={itemVariants} className="text-muted-foreground mt-4">
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={itemVariants}
        className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </motion.div>
  );
}
