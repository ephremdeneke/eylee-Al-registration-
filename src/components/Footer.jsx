import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, Sparkles, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center text-secondary">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-wider text-white">AL-AMI SPARK</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ethiopia's next generation leadership initiative. Empowering youth with practical skills, mentorship, and opportunities to drive community-wide positive change.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61585242568861"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center hover:text-primary-dark transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://t.me/eye_lee"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center hover:text-primary-dark transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/eyleaders1?igsh=Yml6azczY3AxdDZ0&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center hover:text-primary-dark transition-all duration-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase border-b border-white/10 pb-2">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  About the Program
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Program Benefits
                </a>
              </li>
              <li>
                <a href="#journey" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Program Journey
                </a>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Register for Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase border-b border-white/10 pb-2">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-gray-300 text-sm">+251 98 3393165 </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-gray-300 text-sm">ethiopianyouthleadership@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Legal / Program Hours */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase border-b border-white/10 pb-2">
              Our Vision
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Building ethical, innovative, and servant leaders to design and deliver social impact projects across Ethiopia.
            </p>
          
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} AL-AMI Spark Leadership Program. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
