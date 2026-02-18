"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WINNERS = [
  {
    position: "1st Place",
    team: "PIE",
    members: [
      { name: "Shivam Umang Mitter", id: "RA2111003011074" },
      { name: "Shinjan Patra", id: "RA2211003011869" },
    ],
    icon: "🥇",
    border: "border-yellow-400/20",
    glow: "from-yellow-400/8 to-transparent",
    tag: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
  },
  {
    position: "2nd Place",
    team: "Watch Dogs",
    members: [
      { name: "Vijai Krishna Prasanna", id: "RA2211018010007" },
      { name: "Sreeram Reji Madhavan", id: "RA2211018010028" },
    ],
    icon: "🥈",
    border: "border-zinc-400/20",
    glow: "from-zinc-400/8 to-transparent",
    tag: "text-zinc-300 bg-zinc-400/10 border-zinc-400/20",
  },
  {
    position: "3rd Place",
    team: "Cyber Life",
    members: [
      { name: "Parth Nath Chauhan", id: "RA2311030010162" },
      { name: "Aayush Namdeo", id: "RA2311027010189" },
    ],
    icon: "🥉",
    border: "border-orange-400/20",
    glow: "from-orange-400/8 to-transparent",
    tag: "text-orange-300 bg-orange-400/10 border-orange-400/20",
  },
];

const Winners = () => {
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
            Hackathon Results
          </p>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Congratulations
            <br />
            to the winners.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WINNERS.map((w, i) => (
            <motion.div
              key={w.team}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`bg-gradient-to-b ${w.glow} bg-[#141414] border ${w.border} rounded-2xl p-7`}
            >
              <div className="flex items-start justify-between mb-7">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${w.tag}`}
                >
                  {w.position}
                </span>
                <span className="text-2xl">{w.icon}</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-5">{w.team}</h3>
              <div className="space-y-3">
                {w.members.map((m) => (
                  <div key={m.name}>
                    <p className="text-white/70 text-sm font-medium">{m.name}</p>
                    <p className="text-white/25 text-xs font-mono mt-0.5">
                      {m.id}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Winners;
