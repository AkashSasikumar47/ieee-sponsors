"use client";

import { motion } from "motion/react";
import { EASE_OUT, FLIP } from "./timing";

export function FlipIn({
  children,
  delay = 0,
  origin = "top",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  origin?: "top" | "bottom";
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{
        transformPerspective: FLIP.perspective,
        transformOrigin: origin,
      }}
      initial={{
        rotateX: origin === "top" ? FLIP.tilt : -FLIP.tilt,
        opacity: 0,
      }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: FLIP.duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
