import React from 'react';
import { BookOpen, Users, Compass, ShieldAlert, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Benefits() {
  const cards = [
    {
      title: 'Leadership Training',
      desc: 'Learn practical leadership skills from experienced mentors using interactive workshop methods.',
      icon: BookOpen,
      color: 'from-blue-500 to-sky-600'
    },
    {
      title: 'Networking',
      desc: 'Connect with passionate, high-potential young leaders from universities and local organizations.',
      icon: Users,
      color: 'from-amber-500 to-yellow-600'
    },
    {
      title: 'Team Projects',
      desc: 'Solve real-world community challenges together with your assigned taskforce teams.',
      icon: Compass,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Personal Growth',
      desc: 'Improve communication, public speaking, confidence, self-awareness, and critical decision-making.',
      icon: ArrowUpRight,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Mentorship',
      desc: 'Receive direct, personal guidance and support from experienced leaders and active professionals.',
      icon: ShieldAlert,
      color: 'from-red-500 to-rose-600'
    },
    {
      title: 'Graduation Certificate',
      desc: 'Earn a certified recognition after successful completion of training workshops and team projects.',
      icon: Award,
      color: 'from-indigo-500 to-violet-600'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-md">
            Program Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Why Join AL-AMI Spark?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Our program is structured to provide value that extends far beyond standard classrooms, helping you develop tangible skills.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="group bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/10 transform hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
                
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComp className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3">
                  {card.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8 text-left">
          {/* Subtle decoration vector */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Ready to spark your potential?</h3>
            <p className="text-blue-100 max-w-lg text-sm md:text-base leading-relaxed">
              Applications for the 2026 cohort are open for a limited time. Don't miss this opportunity to transform your leadership skills.
            </p>
          </div>
          <Link
            to="/register"
            className="shrink-0 bg-secondary hover:bg-secondary-light text-primary font-extrabold text-base px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Register Now
          </Link>
        </div>

      </div>
    </section>
  );
}
