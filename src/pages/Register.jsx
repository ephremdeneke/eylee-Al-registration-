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
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Apply Now
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Register for AL-AMI Spark 2026
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Fill out the form below. Please ensure all details are correct. All fields marked with * are required.
          </p>
        </div>

        {/* Form Component */}
        <RegistrationForm />
        
      </div>
    </div>
  );
}
