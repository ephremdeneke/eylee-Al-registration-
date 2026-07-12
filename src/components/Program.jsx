import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Program() {
  const levels = [
    {
  level: "Level 1",
  name: "AL-AMI መነሻ (Spark)",
  status: "OPEN FOR REGISTRATION",

  theme: "Every Visionary Starts With a Spark",

  description:
    "The first level of the Excellence Youth Leadership of Ethiopia (EYLE) Leadership Incubator. A high-intensity half-day experience designed to spark your leadership potential and prepare you to lead with Character, Competence, and Clarity.",

  focus: [
    "Visionary Mindset",
    "3-Level Vision (Micro, Meso & Macro)",
    "Lead Yourself",
    "Lead Your Circle",
    "Lead Your Movement",
    "Character, Competence & Clarity"
  ],

  questions: [
    "Who can I become?",
    "How does leadership grow?",
    "What is holding me back?",
    "What future am I committed to creating?"
  ],

  event: {
    date: "July 25, 2026",
    location: "Russian House, Piassa, Addis Ababa"
  },

  contact: {
    email: "info@eyleaders.org",
    phone: "+251 983393165"
  },

  register: true
},
    {
      level: 'Level 2',
      name: 'AL-AMI ንድፍ (Design)',
      status: 'Locked',
      theme: 'Transform Vision into Action',
      focus: [
        'Goal setting',
        'Strategic planning',
        'Personal development planning',
        'Project design',
        'Problem solving'
      ],
      outcome: ['Participants develop a practical roadmap for achieving their vision'],
      note: 'Complete Spark to unlock Design.'
    },
    {
      level: 'Level 3',
      name: 'AL-AMI ተፅዕኖ (Impact)',
      status: 'Locked',
      theme: 'Lead Change and Create Impact',
      focus: [
        'Leadership skills',
        'Communication',
        'Team building',
        'Community engagement',
        'Influence and service'
      ],
      outcome: ['Participants gain the skills needed to create positive change in their communities'],
      note: 'Complete Design to unlock Impact.'
    },
    {
      level: 'Level 4',
      name: 'AL-AMI አሻራ (Legacy)',
      status: 'Locked',
      theme: 'Build What Outlasts You',
      focus: [
        'Legacy thinking',
        'Ethical leadership',
        'Mentorship',
        'Sustainability',
        'Multiplying impact'
      ],
      outcome: ['Participants learn how to develop leaders, sustain initiatives, and create long-term change'],
      note: 'Complete Impact to unlock Legacy.'
    }
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
            The AL-AMI Journey
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Learn more about the levels of the leadership incubator, from initial spark level to building a legacy.
          </p>
        </div>

        {/* Journey Levels */}
        <div className="grid gap-8 mb-20">
          {levels.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 shadow-sm transition-shadow duration-300 ${idx === 0 ? 'bg-white/95 border border-emerald-200 hover:shadow-2xl' : 'bg-white border border-slate-200 hover:shadow-xl'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] ${idx === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-gray-600'}`}>
                    {item.level}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-extrabold mt-2 ${idx === 0 ? 'text-emerald-900' : 'text-primary'}`}>{item.name}</h3>
                  {idx === 0 && item.theme && (
                    <p className="mt-3 text-sm text-emerald-700 max-w-2xl">{item.theme}</p>
                  )}
                </div>
                <div className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${item.status === 'Locked' ? 'bg-slate-100 text-gray-600' : 'bg-emerald-100 text-emerald-800'}`}>
                  {item.status}
                </div>
              </div>

              {idx === 0 ? (
                <div className="space-y-6">
                  <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6">
                    <p className="text-gray-700 leading-7 text-sm">{item.description}</p>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-3xl bg-white border border-emerald-200 p-6">
                      <h4 className="font-bold text-lg text-emerald-900 mb-4">What You'll Master</h4>
                      <p className="text-sm text-emerald-700 mb-4">As an Al-ami Fellow, you will master the visionary mindset needed to lead yourself, your circle, and your movement.</p>
                      <ul className="grid gap-3 text-gray-700 text-sm">
                        {item.focus.map((focusItem) => (
                          <li key={focusItem} className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-600 text-lg">•</span>
                            <span>{focusItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl bg-white border border-emerald-200 p-6">
                      <h4 className="font-bold text-lg text-emerald-900 mb-4">Key Questions</h4>
                      <ul className="grid gap-3 text-gray-700 text-sm">
                        {item.questions.map((question) => (
                          <li key={question} className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6">
                      <h4 className="font-bold text-lg text-emerald-900 mb-4">Event Details</h4>
                      <p className="text-emerald-700 text-sm leading-7"><strong>Date:</strong> {item.event.date}</p>
                      <p className="text-emerald-700 text-sm leading-7"><strong>Location:</strong> {item.event.location}</p>
                    </div>
                    <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6">
                      <h4 className="font-bold text-lg text-emerald-900 mb-4">Contact</h4>
                      <p className="text-emerald-700 text-sm leading-7"><strong>Email:</strong> {item.contact.email}</p>
                      <p className="text-emerald-700 text-sm leading-7"><strong>Phone:</strong> {item.contact.phone}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-emerald-900 border border-emerald-800 p-6 text-white">
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-200 font-semibold">About this level</p>
                    <p className="mt-4 leading-7 text-sm text-emerald-100">This is not a typical seminar; it is a high-intensity half-day experience designed to spark your leadership potential and equip you with the mindset, character, and vision required to create meaningful impact.</p>
                    <div className="mt-6">
                      <Link
                        to="/register"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-900 shadow-lg hover:bg-emerald-300 transition-colors duration-200"
                      >
                        Register for AL-AMI መነሻ (Spark)
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                    <h4 className="font-bold text-lg text-primary">Theme</h4>
                    <p className="text-gray-600 mt-2">{item.theme}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                      <h4 className="font-bold text-lg text-primary mb-3">Key Focus Areas</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {item.focus.map((focusItem) => (
                          <li key={focusItem} className="flex items-start gap-3">
                            <span className="mt-1 text-primary text-lg">•</span>
                            <span>{focusItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                      <h4 className="font-bold text-lg text-primary mb-3">Outcome</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {item.outcome.map((outcomeItem) => (
                          <li key={outcomeItem} className="flex items-start gap-3">
                            <span className="mt-1 text-secondary text-lg">✓</span>
                            <span>{outcomeItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {item.note && (
                    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
                      <p className="text-gray-600 text-sm font-semibold">🔒 {item.note}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Eligibility Criteria Cards */}

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
