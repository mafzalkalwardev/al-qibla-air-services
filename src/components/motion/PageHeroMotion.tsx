"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PageHeroMotionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeroMotion({ badge, title, subtitle, children }: PageHeroMotionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        {badge && (
          <span className="mb-4 inline-flex w-fit rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-light backdrop-blur-sm">
            {badge}
          </span>
        )}
        <h1 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{subtitle}</p>}
        {children}
      </>
    );
  }

  return (
    <>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-4 inline-flex w-fit rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-light backdrop-blur-sm"
        >
          {badge}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
