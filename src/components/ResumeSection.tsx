import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shareOptions = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin', action: () => window.open('https://linkedin.com/share', '_blank') },
    { name: 'Email', icon: 'fas fa-envelope', action: () => window.location.href = 'mailto:?subject=Resume&body=Check out my resume!' },
    { name: 'Discord', icon: 'fab fa-discord', action: () => window.open('https://discord.com', '_blank') },
    { name: 'Copy Link', icon: 'fas fa-link', action: () => navigator.clipboard.writeText(window.location.href) }
  ];

  return (
    <div className="w-full mb-16">
      <div className="flex justify-center relative">
        {/* Resume Preview */}
        <motion.div
          className="w-96 bg-gray-900 rounded-lg overflow-hidden shadow-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="aspect-[3/4] relative">
            <img 
              src="/resume-preview.png" 
              alt="Resume Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-center">
                <i className="fas fa-expand text-2xl mb-2"></i>
                <p className="text-sm">Click to view</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="absolute right-0 flex flex-col gap-6 w-96">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg font-medium flex items-center gap-3 justify-center text-lg transition-transform"
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <i className="fas fa-file-pdf text-2xl"></i>
            <span>PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg font-medium flex items-center gap-3 justify-center text-lg transition-transform"
            onClick={() => window.open('/resume.docx', '_blank')}
          >
            <i className="fas fa-file-word text-2xl"></i>
            <span>DOCX</span>
          </motion.button>
          <div className="bg-red-500 rounded-lg shadow-xl p-4">
            <h3 className="text-white text-lg font-medium mb-4">Share Options</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  onClick={option.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-left text-white rounded-lg flex items-center gap-3 transition-transform"
                >
                  <i className={`${option.icon} text-white text-xl`}></i>
                  <span>{option.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Resume View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full h-[95vh] bg-white rounded-lg shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src="/resume.pdf"
                className="w-full h-full"
                title="Resume PDF"
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-75 rounded-full p-3 hover:bg-opacity-100 transition-all flex items-center justify-center w-10 h-10"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeSection; 