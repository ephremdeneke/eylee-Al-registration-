import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 flex items-center justify-center text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Compass className="h-10 w-10 animate-bounce" />
        </div>
        <h1 className="text-6xl font-black text-primary">404</h1>
        <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
