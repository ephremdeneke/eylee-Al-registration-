import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'What is the AL-AMI Spark Leadership Program?',
      a: 'AL-AMI Spark is a youth leadership initiative that brings together passionate individuals to undergo intensive leadership workshops, receive professional mentorship, and design and execute collaborative community service projects.'
    },
    {
      q: 'What does the commitment fee cover and how do I pay?',
      a: 'The commitment fee is a flat 500 ETB fee. It helps cover program materials, event logistics, workshops, and graduation certificates. You can make payments via bank transfer or mobile money (CBE, Telebirr, etc.), and you must provide the payment reference number or a screenshot of the transaction receipt during registration.'
    },
    {
      q: 'What is the duration of the program?',
      a: 'The program is completed over several weekends, featuring intensive modules, interactive seminars, group discussions, and active team service project development and execution.'
    },
    {
      q: 'How are teams assigned?',
      a: 'During registration, you select your preferred team domains (such as Community Service, Media, Technology, Event Management, Research, Education, Innovation). The selection committee reviews these preferences alongside your background and scores to assign you to a suitable taskforce.'
    },
    {
      q: 'How does the selection process work?',
      a: 'After you register, our review team grades applications based on motivation, experience, and commitment. Shortlisted candidates are scored. Administrators can view, update, and approve selections via the program dashboard.'
    },
    {
      q: 'Will I get a certificate?',
      a: 'Yes, all participants who attend at least 90% of the training workshops and successfully complete their team service projects will receive an official leadership graduation certificate.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-md">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Everything you need to know about the AL-AMI Spark registration process and training experience.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 ${isOpen ? 'text-secondary' : 'text-gray-400'} shrink-0`} />
                    <span className="font-bold text-base text-primary">{faq.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-gray-600 text-sm leading-relaxed text-left bg-slate-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
