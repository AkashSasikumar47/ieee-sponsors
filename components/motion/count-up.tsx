"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { EASE_OUT, INTRO } from "./timing";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.textContent = String(value);
      shown.current = value;
      return;
    }
    const controls = animate(shown.current, value, {
      duration: shown.current === 0 ? INTRO.count : 0.5,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        shown.current = Math.round(latest);
        node.textContent = String(shown.current);
      },
    });
    return () => controls.stop();
  }, [value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}
