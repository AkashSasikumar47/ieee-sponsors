"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const STATS = [
  { value: "4", label: "Tracks" },
  { value: "3", label: "Days" },
  { value: "Free", label: "Entry" },
  { value: "Apr '24", label: "Cohort" },
];

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      className="bg-black border-t border-white/[0.06] py-28 sm:py-36"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#2997ff] text-xs tracking-[0.3em] uppercase font-semibold mb-8"
        >
          About
        </motion.p>

        {/* Giant editorial headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white font-bold tracking-tight leading-[1.05] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-12"
        >
          Hack.
          <br />
          Build.
          <br />
          <span className="text-white/30">Innovate.</span>
        </motion.h2>

        {/* Divider + Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="border-t border-white/[0.08] pt-8 mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <p className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-white/35 text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description + images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8">
              Protocol is an innovative online hackathon aimed at empowering
              Computer Science and Engineering students to build impactful
              solutions. With a focus on fostering creativity and collaboration,
              Protocol provides participants with a platform to explore
              cutting-edge technologies and address real-world challenges.
            </p>
            <a
              href="/EventDocumentation"
              className="inline-flex items-center text-[#2997ff] text-sm font-semibold hover:text-blue-400 transition-colors group"
            >
              View documentation
              <span className="ml-1.5 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </motion.div>

          {/* Posters */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#141414]">
              <img
                src="/assets/Posters/POSTER 1.jpg"
                alt="Protocol Poster"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#141414] mt-8">
              <img
                src="/assets/Posters/POSTER 3.jpg"
                alt="Protocol Poster"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
