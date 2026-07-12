import React from 'react';
import { Target, Eye, ShieldCheck, Award, Heart, RefreshCw, Zap, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    { name: 'Leadership', desc: 'Inspiring others to unlock potential and drive positive change.', icon: Zap, color: 'text-primary bg-primary/10' },
    { name: 'Integrity', desc: 'Honoring commitments and holding high ethical standards.', icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-100' },
    { name: 'Innovation', desc: 'Fostering creativity and design-thinking solutions.', icon: RefreshCw, color: 'text-indigo-700 bg-indigo-100' },
    { name: 'Teamwork', desc: 'Collaborating effectively to achieve shared community goals.', icon: Users, color: 'text-amber-700 bg-amber-100' },
    { name: 'Service', desc: 'Prioritizing community support and volunteer initiatives.', icon: Heart, color: 'text-red-700 bg-red-100' },
    { name: 'Excellence', desc: 'Striving for highest quality in self-growth and impact.', icon: Award, color: 'text-primary bg-secondary/20' }
  ];

  const highlights = [
    'Leadership Workshops', 'Team Projects', 'Mentorship',
    'Community Engagement', 'Networking', 'Personal Development'
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Who We Are & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 text-secondary-dark font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-md">
              Who We Are
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Empowering Young Leaders in Ethiopia
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              AL-AMI Spark is a youth leadership development initiative dedicated to empowering young people with the knowledge, skills, and confidence needed to become impactful leaders in their communities.
            </p>
            <p className="text-gray-700 font-medium border-l-4 border-secondary pl-4 py-1 italic">
              "We believe leadership is not about titles—it is about influence, service, innovation, and responsibility."
            </p>
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span className="text-sm font-semibold text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            {/* Graphic card layout */}
            <div className="bg-gradient-to-tr from-primary to-primary-light p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden text-left">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
                <GraduationCap className="h-80 w-80" />
              </div>
              <h3 className="text-xl font-bold mb-6 text-secondary">Why AL-AMI Spark matters</h3>
              <p className="text-gray-100 text-sm leading-relaxed mb-6">
                Ethiopia’s youth are the foundation of tomorrow. However, traditional education systems rarely focus on active social accountability, public speaking, or design-thinking methodologies. 
              </p>
              <p className="text-gray-100 text-sm leading-relaxed">
                Our curriculum fills this gap. We equip you with practical tools to identify problems, pitch solutions, assemble teams, and implement actual service projects that leave lasting community impact.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission Card */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col items-center md:items-start text-center md:text-left space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              To inspire and equip young leaders with practical leadership skills that create positive, lasting change across local communities.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col items-center md:items-start text-center md:text-left space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-accent/10 text-accent rounded-xl">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              To build a generation of ethical, innovative, and servant leaders across Ethiopia who lead with responsibility and excellence.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">Principles We Stand By</span>
            <h3 className="text-3xl font-extrabold text-primary">Our Core Values</h3>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              These six core values shape our culture, guide our learning sessions, and define how our teams implement service projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-100 p-6 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all duration-300 flex items-start gap-4 text-left"
                >
                  <div className={`p-3 rounded-xl shrink-0 ${val.color}`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-primary">{val.name}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
