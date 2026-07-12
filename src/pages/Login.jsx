import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // We will allow either admin@alamispark.org / AdminSpark2026! or simpler local testing credentials admin / admin123
      const isValidAdmin = 
        (email === 'admin@alamispark.org' && password === 'AdminSpark2026!waluwa') || 
        (email === 'admin' && password === 'admin123waluwa');

      if (isValidAdmin) {
        localStorage.setItem('alami_admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError('Invalid administrator email or password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50 flex items-center justify-center relative">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Login Card */}
        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

          {/* Icon Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-primary">Admin Portal</h2>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
              Please sign in with your administrative credentials to manage registrations, view stats, and score applications.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs leading-normal">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Administrator Username / Email
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="text"
                  required
                  placeholder="e.g. admin@alamispark.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                />
                <Mail className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:bg-white focus:border-primary transition-all"
                />
                <Lock className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all pt-3 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Quick instructions/notes */}
          <div className="border-t border-slate-100 pt-6">
            <span className="block text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
              Default Credentials
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
