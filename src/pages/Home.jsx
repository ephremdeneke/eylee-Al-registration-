import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Benefits from '../components/Benefits';
import Program from '../components/Program';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Benefits />
      <Program />
      <FAQ />
      <Contact />
    </div>
  );
}
