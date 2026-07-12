import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'Who can apply?',
      a: 'AL-AMI is open to students, young professionals, entrepreneurs, volunteers, and emerging leaders aged 18–35.'
    },
    {
      q: 'Do I need prior leadership experience?',
      a: 'No. AL-AMI is designed for both aspiring and experienced leaders.'
    },
    {
      q: 'Is there a registration fee?',
      a: 'A small commitment fee may apply to support program logistics and participant engagement.'
    },
    {
      q: 'Will I receive a certificate?',
      a: 'Yes. Participants who successfully complete the program requirements will receive a certificate.'
    },
    {
      q: 'Can I continue to the next level?',
      a: 'Yes. Participants who complete a level become eligible to progress to the next stage of the incubator.'
    },
    {
      q: 'Is AL-AMI only for people in Ethiopia?',
      a: 'Currently, AL-AMI primarily serves Ethiopian youth while building a broader leadership community.'
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
            Everything you need to know about the AL-AMI registration process and leadership experience.
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
