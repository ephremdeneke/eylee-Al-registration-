import React from 'react';
import { Target, Eye, ShieldCheck, Award, Heart, RefreshCw, Zap, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    { name: 'Purpose', desc: 'Leadership begins with understanding who you are and why you exist.', icon: Target, color: 'text-primary bg-primary/10' },
    { name: 'Integrity', desc: 'We choose honesty, accountability, and ethical leadership.', icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-100' },
    { name: 'Excellence', desc: 'We pursue continuous growth and strive to reach our highest potential.', icon: Award, color: 'text-indigo-700 bg-indigo-100' },
    { name: 'Service', desc: 'We use leadership to serve others and create value for our communities.', icon: Heart, color: 'text-amber-700 bg-amber-100' },
    { name: 'Growth', desc: 'We embrace learning, resilience, and lifelong development.', icon: RefreshCw, color: 'text-red-700 bg-red-100' },
    { name: 'Impact', desc: 'We focus on creating meaningful and sustainable change.', icon: Zap, color: 'text-primary bg-secondary/20' }
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
                AL-AMI is an initiative of Excellence Youth Leadership of Ethiopia (EYLE), 
                a youth-led organization dedicated to developing ethical, 
                visionary, and impact-driven leaders.             </p>
            <p className="text-gray-700 font-medium border-l-4 border-secondary pl-4 py-1 italic">
              "We believe that leadership is not about titles or positions—it is about character,
               purpose, service, and the ability to create positive change."
            </p>
             <p className="text-gray-700 font-medium border-l-4 border-secondary pl-4 py-1 italic">
             AL-AMI was created as EYLE's flagship leadership incubation program to help young people move from potential to purpose,
              from vision to action, and from individual growth to lasting impact.
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
              <h3 className="text-xl font-bold mb-6 text-secondary">Why AL-AMI?</h3>
              <p className="text-gray-100 text-sm leading-relaxed mb-6">
                Unlike traditional workshops that end after a single event, AL-AMI is a leadership incubation journey.
              </p>
              <p className="text-gray-100 text-sm leading-relaxed mb-6">
                Participants don't simply attend training sessions—they embark on a structured pathway of personal growth, leadership development, community impact, and legacy building.
              </p>
              <div className="space-y-3">
                {[
                  'Self-discovery',
                  'Leadership development',
                  'Practical application',
                  'Community engagement',
                  'Mentorship and peer learning',
                  'Long-term growth through progressive levels',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-gray-100 text-sm leading-relaxed">
                    <span className="mt-1 text-lg">✅</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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
To equip and empower young people with the mindset, character, skills, and vision needed to become ethical leaders, problem-solvers, and agents of positive change.</p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col items-center md:items-start text-center md:text-left space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="p-3 bg-accent/10 text-accent rounded-xl">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
To cultivate a generation of visionary, ethical, empowered, and resilient young leaders who drive sustainable transformation in Ethiopia and beyond.            </p>
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
