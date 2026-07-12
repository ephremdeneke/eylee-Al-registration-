import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
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
              <span>AL-AMI Spark Leadership Program 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight tracking-tight"
            >
              Ignite Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Leadership Journey</span> with AL-AMI Spark
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-light"
            >
              Join Ethiopia's next generation of leaders through practical leadership training, professional mentorship, team-based community projects, and real-world impact.
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

          {/* Right Column: Premium Collage Grid */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-[450px] mx-auto h-[480px]">
              {/* Decorative Circle Grid */}
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[radial-gradient(#0f4c81_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              
              {/* Image 1: Main collaboration card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute top-0 right-4 w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600"
                  alt="Young leaders collaborating"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>

              {/* Image 2: Public speaking */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute top-[160px] left-0 w-[240px] h-[180px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600"
                  alt="Public speaking training"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>

              {/* Image 3: Community impact */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute bottom-0 right-8 w-[250px] h-[190px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd96e53a24a4?q=80&w=600"
                  alt="Community service activity"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              
              {/* Highlight badge floating */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[280px] right-2 bg-white px-5 py-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                  500+
                </div>
                <div>
                  <span className="block text-xs text-gray-500 font-medium">Alumni Network</span>
                  <span className="block text-sm font-bold text-primary">Active Leaders</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
