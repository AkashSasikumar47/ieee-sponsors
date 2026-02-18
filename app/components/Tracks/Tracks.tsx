"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TRACKS = [
  { name: "HealthTech Solutions", img: "/assets/Tracks/HealthTech Solutions.jpg", wide: false },
  { name: "Future Tech Innovations", img: "/assets/Tracks/Future Tech Innovations.jpg", wide: true },
  { name: "Sustainable Development", img: "/assets/Tracks/Sustainable Development.jpg", wide: true },
  { name: "Open Ended", img: "/assets/Tracks/Open Ended.jpg", wide: false },
];

const Tracks = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="bg-black border-t border-white/[0.06] py-28 sm:py-36"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <p className="text-[#2997ff] text-xs tracking-[0.3em] uppercase font-semibold mb-5">
            Tracks
          </p>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Choose your challenge.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TRACKS.map((track, i) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#141414] ${
                track.wide ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={track.img}
                alt={track.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-base">{track.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
