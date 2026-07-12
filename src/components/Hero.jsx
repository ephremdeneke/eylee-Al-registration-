import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Users, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import photo1 from '../assets/photo_1_2026-07-12_15-52-17.jpg';
import photo2 from '../assets/photo_2_2026-07-12_15-52-17.jpg';
import photo3 from '../assets/photo_3_2026-07-12_15-52-17.jpg';
import photo4 from '../assets/photo_4_2026-07-12_15-52-17.jpg';
import photo5 from '../assets/photo_5_2026-07-12_15-52-17.jpg';
import photo6 from '../assets/photo_6_2026-07-12_15-52-17.jpg';
import photo7 from '../assets/photo_7_2026-07-12_15-52-17.jpg';
import photo8 from '../assets/photo_8_2026-07-12_15-52-17.jpg';
import photo9 from '../assets/photo_9_2026-07-12_15-52-17.jpg';
import photo10 from '../assets/photo_10_2026-07-12_15-52-17.jpg';
import photo11 from '../assets/photo_11_2026-07-12_15-52-17.jpg';
import photo12 from '../assets/photo_12_2026-07-12_15-52-17.jpg';
import photo13 from '../assets/photo_13_2026-07-12_15-52-17.jpg';
import photo14 from '../assets/photo_14_2026-07-12_15-52-17.jpg';

export default function Hero() {
  const photos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11,
    photo12,
    photo13,
    photo14,
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-primary/5 to-secondary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-accent/5 to-primary/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
            >
              <Sparkles className="h-4 w-4 text-secondary fill-secondary" />
              <span>AL-AMI Leadership Incubator 2026/2027</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight tracking-tight"
            >
             Discover Your Purpose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"></span> with AL-AMI
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-light"
            >
        
             AL-AMI empowers young people to become visionary, 
             ethical, and impact-driven leaders through 
             a transformative leadership incubation journey.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/register"
                className="bg-primary hover:bg-primary-light text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/35 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                Register Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-primary font-bold text-base px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                Learn More
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-accent">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-primary">Certified</span>
                  <span className="block text-xs text-gray-500">Graduation Certificate</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-secondary-dark">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-primary">Mentorship</span>
                  <span className="block text-xs text-gray-500">Expert Guidance</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-sky-50 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-primary">Practical</span>
                  <span className="block text-xs text-gray-500">Project-Based Learning</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero slideshow */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-[450px] mx-auto h-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={photos[index]}
                  alt={`Hero ${index + 1}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
