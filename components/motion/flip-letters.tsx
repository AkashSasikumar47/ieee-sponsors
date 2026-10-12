"use client";

import { motion } from "motion/react";
import { EASE_OUT, FLIP } from "./timing";

export function FlipLetters({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((letter, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="inline-block"
          style={{
            transformPerspective: FLIP.perspective,
            transformOrigin: "top",
          }}
          initial={{ rotateX: FLIP.tilt, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            duration: FLIP.duration,
            delay: delay + index * FLIP.stagger,
            ease: EASE_OUT,
          }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </span>
  );
}
