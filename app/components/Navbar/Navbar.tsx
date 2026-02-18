"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" aria-label="Protocol">
          <img
            src="/assets/Logo/protocol.svg"
            alt="Protocol"
            className="h-7 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-200"
          />
        </a>
        <a
          href="https://www.ieeesrmist.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="IEEE SRM SB"
          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          <img
            src="/assets/Logo/IEEE SRM SB.png"
            alt="IEEE SRM SB"
            className="h-9 brightness-0 invert"
          />
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
