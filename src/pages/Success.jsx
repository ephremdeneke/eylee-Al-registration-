import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Copy, Sparkles, Home, Download } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const state = location.state;

  // Protect Success page from direct URL access without state
  if (!state || !state.regId) {
    return <Navigate to="/" replace />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(state.regId);
    alert("Registration ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 flex items-center justify-center relative">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Success Card */}
        <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl text-center space-y-8 relative overflow-hidden">
          {/* Confetti decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          
          <div className="w-16 h-16 bg-emerald-50 text-accent rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-3">
            <span className="text-accent font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">
              Congratulations!
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Registration Submitted Successfully
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-primary">{state.fullName}</strong>. Your application has been logged and is pending review.
            </p>
          </div>

          {/* Registration ID Panel */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              Your Registration ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl sm:text-2xl font-extrabold text-primary tracking-wide">
                {state.regId}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 bg-white border border-gray-200 text-slate-500 hover:text-primary rounded-lg shadow-sm hover:shadow transition-all"
                title="Copy Registration ID"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-500 font-light leading-normal max-w-xs mx-auto">
              Please copy and keep your Registration ID for future reference and score checkups.
            </p>
          </div>

          {/* Further Instructions */}
          <div className="text-left space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-sm text-primary">What happens next?</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <span>Our screening team will review your application essays and credentials.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <span>Your commitment fee and payment reference number will be verified.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-500">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <span>You will receive an email or text update once the selection results are out.</span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <Link
              to="/"
              className="flex-1 bg-primary hover:bg-primary-light text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
