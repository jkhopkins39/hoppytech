import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const downloadResume = (format: 'pdf' | 'docx') => {
    const filename = format === 'pdf' ? 'Jeremy_Hopkins_Resume.pdf' : 'Jeremy_Hopkins_Resume.docx';
    const fileUrl = format === 'pdf' ? '/resume.pdf' : '/resume.docx';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOptions = [
    { 
      name: 'LinkedIn', 
      icon: 'fab fa-linkedin', 
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/resume.pdf')}`, '_blank') 
    },
    { 
      name: 'Email', 
      icon: 'fas fa-envelope', 
      action: () => window.location.href = `mailto:?subject=Jeremy Hopkins Resume&body=Check out my resume: ${window.location.origin}/resume.pdf` 
    },
    { 
      name: 'Discord', 
      icon: 'fab fa-discord', 
      action: () => {
        navigator.clipboard.writeText(`${window.location.origin}/resume.pdf`);
        window.open('https://discord.com', '_blank');
        alert('Resume link copied to clipboard! You can now paste it in Discord.');
      }
    },
    { 
      name: 'Copy Link', 
      icon: 'fas fa-link', 
      action: () => {
        navigator.clipboard.writeText(`${window.location.origin}/resume.pdf`);
        alert('Resume link copied to clipboard!');
      }
    }
  ];

  return (
    <div className="w-full mb-16">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 relative">
        {/* Resume Preview */}
        <motion.div
          className="w-full max-w-sm lg:w-96 bg-gray-900 rounded-lg overflow-hidden shadow-xl cursor-pointer"
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
        <div className="flex flex-col gap-4 lg:gap-6 w-full max-w-sm lg:w-96">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-medium flex items-center gap-3 justify-center text-sm sm:text-base lg:text-lg transition-transform"
            onClick={() => downloadResume('pdf')}
          >
            <i className="fas fa-file-pdf text-lg sm:text-xl lg:text-2xl"></i>
            <span>PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg font-medium flex items-center gap-3 justify-center text-sm sm:text-base lg:text-lg transition-transform"
            onClick={() => downloadResume('docx')}
          >
            <i className="fas fa-file-word text-lg sm:text-xl lg:text-2xl"></i>
            <span>DOCX</span>
          </motion.button>
          <div className="bg-red-500 rounded-lg shadow-xl p-3 sm:p-4">
            <h3 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">Share Options</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  onClick={option.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left bg-white hover:bg-gray-100 text-black rounded-lg flex items-center gap-2 sm:gap-3 transition-all text-sm sm:text-base font-medium shadow-md"
                >
                  <i className={`${option.icon} text-black text-base sm:text-lg lg:text-xl`}></i>
                  <span className="font-semibold">{option.name}</span>
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
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full h-[95vh] bg-white rounded-lg shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <object
                data="/resume.pdf"
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full text-gray-800 bg-gray-50">
                  <p className="mb-4 text-lg">It appears your browser cannot display the PDF directly.</p>
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg"
                  >
                    Click here to view PDF
                  </a>
                </div>
              </object>

              {/* Open in New Tab Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white bg-black bg-opacity-75 rounded-lg px-4 py-2 hover:bg-opacity-100 transition-all flex items-center gap-2 z-50"
              >
                <i className="fas fa-external-link-alt text-sm"></i>
                <span className="text-sm font-medium hidden sm:inline">Open in New Tab</span>
              </a>

              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-black bg-opacity-75 rounded-full p-2 sm:p-3 hover:bg-opacity-100 transition-all flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 z-50"
              >
                <i className="fas fa-times text-lg sm:text-xl"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeSection; 