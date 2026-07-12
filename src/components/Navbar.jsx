import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import logo from '../assets/AL-AMI-removebg-preview.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth status on scroll, mount, and location changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAdmin(localStorage.getItem('alami_admin_authenticated') === 'true');
    };
    checkAuth();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.type === 'route') {
      navigate(link.href);
    } else {
      if (location.pathname !== '/') {
        navigate('/' + link.href);
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('alami_admin_authenticated');
    setIsAdmin(false);
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '#home', type: 'scroll' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Benefits', href: '#benefits', type: 'scroll' },
    { name: 'Program Journey', href: '#journey', type: 'scroll' },
    { name: 'FAQs', href: '#faq', type: 'scroll' },
    { name: 'Contact', href: '#contact', type: 'scroll' },
  ];

  // Append Dashboard link if administrator is logged in
  if (isAdmin) {
    navLinks.push({ name: 'Dashboard', href: '/admin', type: 'route' });
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 group cursor-pointer">
            <img src={logo} alt="AL-AML" className="h-12 md:h-20 w-auto object-contain" />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-bold md:text-lg text-primary leading-none tracking-tight">
                AL-AMI Leadership Incubator
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest mt-0.5">
                LEADERSHIP PROGRAM
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`hover:text-primary font-medium text-sm transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full ${
                  link.type === 'route' && location.pathname === link.href
                    ? 'text-primary font-bold after:w-full'
                    : 'text-gray-600'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-rose-600 hover:text-rose-800 font-semibold text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-gray-600 hover:text-primary font-semibold text-sm transition-colors"
              >
                <ShieldAlert className="h-4 w-4" />
                Admin Portal
              </Link>
            )}
            <Link
              to="/register"
              className="bg-primary hover:bg-primary-light text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="text-rose-600 hover:text-rose-800 p-2"
                title="Log Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary p-2"
                title="Admin Portal"
              >
                <ShieldAlert className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass border-b border-gray-200 absolute top-full left-0 w-full shadow-xl z-40 transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2 text-left">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                  link.type === 'route' && location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="h-px bg-gray-100 my-4"></div>
            <div className="flex flex-col gap-3 px-4">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-full shadow-md"
              >
                Register Now
              </Link>
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold py-3 rounded-full border border-rose-200"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
