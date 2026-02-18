"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EVENT_DATE = new Date("2024-04-12T20:00:00");

const calcTimeLeft = () => {
  const diff = +EVENT_DATE - +new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => n.toString().padStart(2, "0");

const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isComplete = +EVENT_DATE <= +new Date();

  useEffect(() => {
    if (isComplete) return;
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [isComplete]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      className="bg-black border-t border-white/[0.06] py-28 sm:py-36"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[#2997ff] text-xs tracking-[0.3em] uppercase font-semibold mb-5">
            Event Countdown
          </p>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-3">
            April 12, 2024
          </h2>
          {isComplete && (
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-12">
              Event complete
            </p>
          )}

          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto mt-14">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="bg-[#141414] border border-white/[0.08] rounded-2xl py-6 px-2"
              >
                <div className="text-white font-bold text-2xl sm:text-3xl md:text-4xl font-mono tabular-nums leading-none">
                  {pad(unit.value)}
                </div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-3">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventCountdown;
