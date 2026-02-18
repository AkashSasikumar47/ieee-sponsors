"use client";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Winners from "./components/Winners/Winners";
import About from "./components/About/About";
import Tracks from "./components/Tracks/Tracks";
import Mentors from "./components/Mentors/Mentors";
import EventCountdown from "./components/EventCountdown/EventCountdown";
import EventTimeline from "./components/EventTimeline/EventTimeline";
import FAQ from "./components/FAQ/FAQ";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Winners />
      <About />
      <Tracks />
      <Mentors />
      <EventCountdown />
      <EventTimeline />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;
