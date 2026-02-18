"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FAQS = [
  {
    q: "How do I register for the hackathon?",
    a: 'Registration is simple! Click on the "Register Now" button on the homepage and follow the instructions on the registration page.',
  },
  {
    q: "Can I participate individually or do I need to form a team?",
    a: "You can participate individually or as part of a team. However, forming a team is recommended to collaborate and tackle challenges more effectively.",
  },
  {
    q: "Are there any registration fees?",
    a: "No, participation in Protocol is completely free of charge.",
  },
  {
    q: "What are the eligibility criteria?",
    a: "Protocol is open to Computer Science and Engineering students from all over the world. As long as you have a passion for technology and innovation, you're welcome to join!",
  },
  {
    q: "Can I work on a pre-existing project?",
    a: "Yes, pre-existing projects are allowed as long as they align with one of the hackathon themes and are submitted within the specified timeline.",
  },
  {
    q: "How will projects be judged?",
    a: "Projects will be judged based on creativity, technical complexity, impact, and presentation. Judges will evaluate each project holistically to determine the winners.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="bg-black border-t border-white/[0.06] py-28 sm:py-36"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <p className="text-[#2997ff] text-xs tracking-[0.3em] uppercase font-semibold mb-5">
            FAQ
          </p>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Common questions.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/[0.08]">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-white font-semibold text-base sm:text-lg pr-8 group-hover:text-[#2997ff] transition-colors duration-200">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-white/35 text-2xl font-light shrink-0 leading-none select-none"
                >
                  +
                </motion.span>
              </button>

              {/*
                CSS max-height transition is used here instead of Framer Motion AnimatePresence.
                Animating height:"auto" with AnimatePresence requires Framer Motion to measure
                the element height before it is visible, which fails in many configurations.
                max-height CSS transition is 100% reliable for accordion patterns.
              */}
              <div
                style={{
                  maxHeight: open === i ? "400px" : "0px",
                  opacity: open === i ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <p className="text-white/55 text-base pb-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
