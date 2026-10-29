import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { Sparkles, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  // Set to true while registration is closed, or false to re-enable the registration form
  const isRegistrationClosed = true;

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 flex items-center justify-center relative">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Link */}
        <div className="mb-6 flex">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-primary font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Heading Panel */}
        <div className="text-center space-y-5 mb-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-[0.35em] shadow-sm ${
              isRegistrationClosed
                ? 'bg-amber-100 text-amber-900 shadow-amber-200'
                : 'bg-emerald-100 text-emerald-900 shadow-emerald-200'
            }`}
          >
            {isRegistrationClosed ? (
              <>
                <Clock className="h-4 w-4 text-amber-700" />
                Registration Closed
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-emerald-700" />
                Apply / Register Now
              </>
            )}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900 tracking-tight leading-snug">
            {isRegistrationClosed ? 'AL-AMI Leadership Incubator' : 'Ready to Begin Your Leadership Journey?'}
          </h2>

          <div className="max-w-xl mx-auto mt-6 rounded-[32px] bg-emerald-50 border border-emerald-200 p-7 text-left shadow-lg shadow-emerald-100">
            <p className="text-sm uppercase tracking-[0.25em] font-bold text-emerald-700">AL-AMI መነሻ (Spark)</p>
            <p className="mt-3 text-2xl font-extrabold text-emerald-900">
              {isRegistrationClosed ? 'Level 1 — Registration Closed' : 'Level 1 — Registration Open'}
            </p>
            <p className="mt-3 text-base font-semibold text-emerald-800">Every Visionary Starts With a Spark.</p>    
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              {isRegistrationClosed ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-5 py-3 text-sm font-semibold shadow-sm">
                  ⏳ Registration is Closed
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-300">
                    🚀 Register Now
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-emerald-900 border border-emerald-200">
                    🔗 Secure Your Seat Today
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content: Closed Message or Registration Form */}
        {isRegistrationClosed ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-emerald-100 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                Notice
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Registration is closed
              </h3>
              <p className="text-base text-emerald-800 font-semibold">
                ምዝገባው ተዘግቷል
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
                Thank you for your overwhelming interest in the AL-AMI Leadership Incubator! Registration for the upcoming cohort is currently closed.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Please stay tuned or follow our updates for announcements regarding the next cohort and upcoming opportunities.
              </p>
            </div>

            {/* Contact / Help info */}
            <div className="pt-4 border-t border-slate-100 text-sm text-slate-600 space-y-2">
              <p className="font-semibold text-slate-700">Have questions or need assistance?</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="mailto:info@eyleaders.org"
                  className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline inline-flex items-center gap-1"
                >
                  ✉️ info@eyleaders.org
                </a>
                <a
                  href="tel:+251983393165"
                  className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline inline-flex items-center gap-1"
                >
                  📞 +251 983393165
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-900/20 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <a
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-emerald-200 text-emerald-900 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        ) : (
          <RegistrationForm />
        )}
        
      </div>
    </div>
  );
}
