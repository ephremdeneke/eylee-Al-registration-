import React from 'react';
import { CheckCircle2, UserCheck, CalendarRange, Users, Sparkles, BookOpen, GraduationCap, ClipboardList } from 'lucide-react';

export default function Program() {
  const steps = [
    { title: 'Registration', desc: 'Fill out and submit the online application form with payment reference.', icon: ClipboardList },
    { title: 'Application Review', desc: 'Our screening committee reviews all backgrounds, leadership essays, and details.', icon: UserCheck },
    { title: 'Selection', desc: 'Successful applicants are officially selected and announced.', icon: Sparkles },
    { title: 'Training', desc: 'Participate in intensive leadership workshops and skill modules.', icon: BookOpen },
    { title: 'Team Assignment', desc: 'Get assigned to a project team matching your interests and goals.', icon: Users },
    { title: 'Projects', desc: 'Collaborate to solve real challenges through community service campaigns.', icon: CalendarRange },
    { title: 'Graduation', desc: 'Graduate, receive certificates, and join our active alumni network.', icon: GraduationCap }
  ];

  const eligibility = [
    'Be passionate about leadership & community service',
    'Be open-minded, willing to learn, and cooperate in teams',
    'Commit to attending the scheduled weekend training sessions',
    'Commit to actively designing and executing the assigned community project'
  ];

  return (
    <section id="journey" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-accent font-bold text-xs uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md">
            Program Structure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            The AL-AMI Spark Journey
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Learn more about the stages of the leadership training, from initial registration to graduation.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="relative mb-24">
          {/* Vertical line connector (desktop/tablet) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center relative">
                  {/* Circle Indicator */}
                  <div className="absolute left-[30px] md:left-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary z-10 -translate-x-1/2 shadow-md">
                    <IconComp className="h-5 w-5" />
                  </div>

                  {/* Left spacer / right box on desktop */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    {isEven && (
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-xs font-bold text-secondary-dark uppercase block mb-1">Step {idx + 1}</span>
                        <h4 className="font-extrabold text-lg text-primary mb-2">{step.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Spacer for vertical layout */}
                  <div className="w-12 h-12 hidden md:block md:order-2 shrink-0"></div>

                  {/* Right box / left spacer on desktop */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 md:text-left ${isEven ? 'md:order-3' : 'md:order-1'}`}>
                    {!isEven && (
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-xs font-bold text-secondary-dark uppercase block mb-1">Step {idx + 1}</span>
                        <h4 className="font-extrabold text-lg text-primary mb-2">{step.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eligibility Criteria Cards */}
        <div className="bg-gradient-to-br from-slate-900 to-primary-dark rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Title / Info */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">Are You Eligible?</span>
              <h3 className="text-3xl font-extrabold text-white leading-tight">Who Can Apply?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                AL-AMI Spark targets proactive young people who are willing to devote time, effort, and creativity to improving community life. Please ensure you meet the criteria before filling the registration form.
              </p>
            </div>

            {/* Checklist */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {eligibility.map((criterion, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-gray-200">{criterion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
