import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const downloadResume = (format: 'pdf' | 'docx') => {
    const filename = format === 'pdf' ? 'Jeremy_Hopkins_Resume.pdf' : 'Jeremy_Hopkins_Resume.docx';
    const fileUrl = format === 'pdf' ? '/documents/resume.pdf' : '/documents/resume.docx';
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mb-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-8 mb-8"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="px-6 bg-[#050508] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              My Resume
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 relative">
        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm lg:w-96 group relative cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-red-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-red-500/20 rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
            <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl m-[1px] rounded-[calc(1rem-1px)] overflow-hidden">
              {/* Accent line */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500" />
              
              <div className="aspect-[3/4] relative">
                <img 
                  src="/documents/resume-preview.png" 
                  alt="Resume Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-40" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold">Click to view full resume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 w-full max-w-sm lg:w-96"
        >
          {/* Download Buttons */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-bold text-white text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3"
            onClick={() => downloadResume('pdf')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v4h-2v-4H6l4-4 4 4h-2z"/>
            </svg>
            Download PDF
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-3"
            onClick={() => downloadResume('docx')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-1 9l-2 6-2-6H6l3 8h2l2-5 2 5h2l3-8h-2l-2 6-2-6h-2z"/>
            </svg>
            Download DOCX
          </motion.button>
        </motion.div>
      </div>

      {/* Expanded Resume View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <object
                data="/documents/resume.pdf"
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full text-gray-800 bg-gray-50">
                  <p className="mb-4 text-lg">It appears your browser cannot display the PDF directly.</p>
                  <a 
                    href="/documents/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    Click here to view PDF
                  </a>
                </div>
              </object>

              {/* Open in New Tab Button */}
              <a
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 text-white bg-black/75 hover:bg-black rounded-xl px-4 py-2 transition-all flex items-center gap-2 z-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm font-medium hidden sm:inline">Open in New Tab</span>
              </a>

              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-white bg-black/75 hover:bg-black rounded-xl p-3 transition-all z-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeSection;
