"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/assets/videos/190605(720p).mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-medium"
        >
          IEEE SRM SB presents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white font-black text-[clamp(4.5rem,16vw,11rem)] leading-none tracking-tight mb-6"
        >
          PROTOCOL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white/50 text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-12"
        >
          Empowering Innovations in Tech
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="https://registrations.ieeesrmist.com/protocol"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white/[0.08] text-white text-sm font-semibold rounded-full border border-white/[0.12] hover:bg-white/[0.14] transition-all duration-300 backdrop-blur-sm"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
