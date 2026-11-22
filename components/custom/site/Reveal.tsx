"use client";

/**
 * Scroll-triggered entrance animations shared by the public pages.
 *
 * - <Reveal> fades and lifts a block into place the first time it's seen.
 * - <MaskReveal> slides a line of text up from behind a clipping mask, for
 *   the large display headings.
 *
 * Both render content in place, without animating, when the visitor prefers
 * reduced motion.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal. The wrapper is padded so descenders (g, j, y) aren't
 * clipped by the tight display line-height.
 */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (used in the hero). */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapper = `block overflow-hidden pb-[0.16em] -mb-[0.16em] pt-[0.04em] -mt-[0.04em] ${className}`;

  if (reduce) {
    return (
      <span className={wrapper}>
        <span className="block">{children}</span>
      </span>
    );
  }

  const animateProps = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -5% 0px" } };

  return (
    <span className={wrapper}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        {...animateProps}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
