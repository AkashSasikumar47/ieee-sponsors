"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EVENTS = [
  {
    phase: "01",
    title: "Introduction & Track Description",
    date: "April 12, 2024",
    time: "8:00 PM – 10:00 PM",
    details: [
      "Kick off with an introduction to Protocol",
      "Detailed descriptions of all four tracks",
      "Live Q&A session for participants",
    ],
  },
  {
    phase: "02",
    title: "Hackathon Begins",
    date: "April 13, 2024",
    time: "10:00 AM",
    details: [
      "Start hacking — participants begin building their projects",
    ],
  },
  {
    phase: "03",
    title: "Project Submission",
    date: "April 15, 2024",
    time: "8:00 PM – 10:00 PM",
    details: [
      "Submit your GitHub repository link",
      "Include a case study presentation",
      "Upload a short project demo video",
    ],
  },
  {
    phase: "04",
    title: "Results Declaration",
    date: "April 16, 2024",
    time: "8:00 PM – 10:00 PM",
    details: [
      "Winners and top projects announced",
      "Certificates issued to all participants",
    ],
  },
];

const EventTimeline = () => {
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
          className="mb-20"
        >
          <p className="text-[#2997ff] text-xs tracking-[0.3em] uppercase font-semibold mb-5">
            Schedule
          </p>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            Hackathon timeline.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-white/[0.08]" />

          <div className="space-y-5">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative pl-14 sm:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-[11px] sm:left-[19px] top-6 w-2.5 h-2.5 rounded-full bg-[#2997ff] ring-4 ring-black" />

                <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-7 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <span className="text-[#2997ff] text-xs font-mono font-semibold tracking-wider">
                        Phase {event.phase}
                      </span>
                      <h3 className="text-white text-lg font-bold mt-1">
                        {event.title}
                      </h3>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <p className="text-white/70 text-sm font-medium">{event.date}</p>
                      <p className="text-white/35 text-xs mt-0.5">{event.time}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 border-t border-white/[0.06] pt-4">
                    {event.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-white/50 text-sm flex items-start gap-2"
                      >
                        <span className="text-[#2997ff] mt-0.5 shrink-0">›</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
