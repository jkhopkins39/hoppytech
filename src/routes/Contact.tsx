import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

interface ContactSubmission {
  id: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const Contact: React.FC = () => {
  const [honeypot1, setHoneypot1] = useState("");
  const [honeypot2, setHoneypot2] = useState("");
  const [formLoadTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const storeSubmission = (email: string, message: string) => {
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      email,
      message,
      date: new Date().toISOString(),
      read: false
    };

    const existingSubmissions = localStorage.getItem('contactSubmissions');
    const submissions: ContactSubmission[] = existingSubmissions 
      ? JSON.parse(existingSubmissions) 
      : [];
    
    submissions.unshift(submission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (honeypot1 || honeypot2) {
      e.preventDefault();
      window.location.href = import.meta.env.DEV 
        ? 'http://localhost:5173/thank-you'
        : 'https://jkhopkins39.github.io/thank-you';
      return;
    }
    
    const timeTaken = Date.now() - formLoadTime;
    if (timeTaken < 3000) {
      e.preventDefault();
      alert("Please take your time filling out the form.");
      return;
    }

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      if (email && message) {
        storeSubmission(email, message);
      }
    }

    setIsSubmitting(true);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      logo: '/images/social/instagram-logo.png',
      handle: '@jeremykhopkins',
      url: 'https://instagram.com/jeremykhopkins',
      gradient: 'from-pink-500 via-purple-500 to-orange-500',
      hoverBg: 'hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-orange-500/20'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      logo: '/images/social/facebook-logo.png',
      handle: 'Jeremy Hopkins',
      url: 'https://facebook.com/jeremy.hopkins.94695',
      gradient: 'from-blue-600 to-blue-400',
      hoverBg: 'hover:bg-blue-500/20'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      logo: '/images/social/linkedin-logo.png',
      handle: 'jeremy-hopkins',
      url: 'https://www.linkedin.com/in/jeremy-hopkins-160001275',
      gradient: 'from-blue-700 to-cyan-500',
      hoverBg: 'hover:bg-blue-600/20'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      logo: '/images/social/github-logo.png',
      handle: 'jkhopkins39',
      url: 'https://github.com/jkhopkins39',
      gradient: 'from-gray-600 to-gray-400',
      hoverBg: 'hover:bg-gray-500/20'
    }
  ];

  const redirectUrl = import.meta.env.DEV 
    ? 'http://localhost:5173/thank-you'
    : 'https://jkhopkins39.github.io/thank-you';

  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/15 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Get In Touch</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-red-500/30 rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-[#0a0a0f]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                      <p className="text-gray-500 text-sm">I'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form 
                    ref={formRef}
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="space-y-6"
                    onSubmit={handleFormSubmit}
                  >
                    <input type="hidden" name="access_key" value="46cae387-addf-453a-a32f-6464199035c6" />
                    <input type="hidden" name="subject" value="New Contact Form Submission" />
                    <input type="hidden" name="redirect" value={redirectUrl} />
                    
                    {/* Honeypot fields */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                      <input type="text" name="contact_website" value={honeypot1} onChange={(e) => setHoneypot1(e.target.value)} tabIndex={-1} autoComplete="off" />
                      <input type="text" name="contact_fax" value={honeypot2} onChange={(e) => setHoneypot2(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="hello@example.com"
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        name="subject_line"
                        placeholder="What's this about?"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-white placeholder-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Message</label>
                      <textarea
                        name="message"
                        required
                        placeholder="Tell me about your project, idea, or just say hi..."
                        rows={6}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-white placeholder-gray-600 resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Direct Contact */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a href="mailto:jeremyyhopkins@gmail.com" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Email</p>
                      <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">jeremyyhopkins@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-red-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  Follow Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 ${social.hoverBg} hover:border-white/20`}
                    >
                      <div className="relative w-10 h-10">
                        <img
                          src={social.logo}
                          alt={`${social.name} logo`}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <i className={`${social.icon} text-2xl text-white absolute inset-0 flex items-center justify-center hidden`}></i>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">{social.name}</p>
                        <p className="text-gray-500 text-xs truncate max-w-[100px]">{social.handle}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Quick Response</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      I typically respond within 24 hours. For urgent matters, reach out on LinkedIn.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
