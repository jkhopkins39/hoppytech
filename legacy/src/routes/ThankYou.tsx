import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-green-600/20 rounded-full blur-[120px] translate-x-1/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[130px] translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/40">
                  <svg 
                    className="w-14 h-14 text-white" 
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-green-400 bg-clip-text text-transparent">
                Thank You!
              </span>
            </motion.h1>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10"
            >
              <p className="text-xl text-gray-300 mb-4 font-light leading-relaxed">
                Your message has been successfully submitted.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I appreciate you taking the time to reach out. I will review your message and get back to you as soon as possible, typically within 24-48 hours.
              </p>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-10"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-green-500/20 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold mb-1">What happens next?</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        I'll carefully review your message and respond to your inquiry via email. Please check your inbox (and spam folder, just in case) for my response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Return Home
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Another Message
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYou;
