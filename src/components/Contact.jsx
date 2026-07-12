import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-accent font-bold text-xs uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Contact AL-AMI Spark
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Have questions or want to partner with us? Drop us a message or use our official contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white text-left flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <h3 className="text-2xl font-bold">Contact Details</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Reach out to our organizing team for application inquiries, event partnerships, corporate sponsor opportunities, or school collaborations.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Email Us</span>
                    <a href="mailto:info@alamispark.org" className="block text-sm font-semibold hover:text-secondary transition-colors">
                      info@alamispark.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Call Us</span>
                    <a href="tel:+251911223344" className="block text-sm font-semibold hover:text-secondary transition-colors">
                      +251 911 223 344
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Headquarters</span>
                    <span className="block text-sm font-semibold">
                      Addis Ababa, Ethiopia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 relative z-10">
              <span className="block text-xs text-gray-400">Response Time</span>
              <span className="block text-sm font-bold text-white mt-1">Within 24 Hours</span>
            </div>
          </div>

          {/* Right Column: Mini Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm text-left">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
                <span className="block font-bold text-lg">Thank You!</span>
                <p className="text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Abebe Kebede"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. abebe@gmail.com"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can support you..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary hover:bg-primary-light text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
