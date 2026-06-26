"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface MotionStaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
}

export function MotionStagger({ children, className, as = "div" }: MotionStaggerProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionStaggerItem({ children, className }: MotionStaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
