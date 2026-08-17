import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
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
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-[0.35em] shadow-sm shadow-emerald-200">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            Apply / Register Now
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900 tracking-tight leading-snug">
            Ready to Begin Your Leadership Journey?
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-lg leading-8 text-slate-700">
            <p className="font-semibold text-gray-900">
              The future belongs to those who dare to dream, grow, and lead.
            </p>
            <p className="font-semibold text-gray-800">
              Join the next generation of AL-AMI Fellows and take the first step toward becoming the leader you were created to be.
            </p>
          </div>

          <div className="max-w-xl mx-auto mt-6 rounded-[32px] bg-emerald-50 border border-emerald-200 p-7 text-left shadow-lg shadow-emerald-100">
            <p className="text-sm uppercase tracking-[0.25em] font-bold text-emerald-700">AL-AMI መነሻ (Spark)</p>
            <p className="mt-3 text-2xl font-extrabold text-emerald-900">Level 1 — Registration Open</p>
            <p className="mt-3 text-base font-semibold text-emerald-800">Every Visionary Starts With a Spark.</p>
            <p className="mt-3 text-base font-semibold text-emerald-3500">
                This training is open to everyone who lives in Adama or can travel there on their own.
                Please note that we provide the training for free,
                but we do not offer any transportation assistance.
              </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-300">
                🚀 Register Now
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-emerald-900 border border-emerald-200">
                🔗 Secure Your Seat Today
              </span>
            </div>
          </div>
        </div>

        {/* Form Component */}
        <RegistrationForm />
        
      </div>
    </div>
  );
}
