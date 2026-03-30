import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const skills = [
    {
      category: "Programming Languages",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "HTML", "CSS"],
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      category: "Frameworks & Libraries",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: ["React", "Node.js", "Tailwind CSS", "TensorFlow", "PyTorch", "NumPy", "Pandas"],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      category: "Tools & Technologies",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: ["Git", "MongoDB", "SQL", "Linux", "Microsoft Office", "Microsoft SQL Server"],
      gradient: 'from-red-500 to-rose-500'
    },
    {
      category: "Soft Skills",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: ["Problem Solving", "Team Leadership", "Communication", "Project Management", "Attention to Detail"],
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="w-full mb-16">
      {/* Decorative line with gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
      
      {/* Button container */}
      <div className="flex justify-center mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 ${
            isOpen ? 'bg-white/10 border border-white/20' : ''
          }`}
        >
          {!isOpen && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500" />
          )}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 opacity-0 ${!isOpen ? 'group-hover:opacity-100' : ''} transition-opacity`} />
          <span className="relative flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Skills & Expertise
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </span>
        </motion.button>
      </div>

      {/* Decorative line with gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Skills content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Outer glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${skillGroup.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skillGroup.gradient} flex items-center justify-center shadow-lg text-white`}>
                        {skillGroup.icon}
                      </div>
                      <h3 className={`text-sm font-bold bg-gradient-to-r ${skillGroup.gradient} bg-clip-text text-transparent uppercase tracking-wide`}>
                        {skillGroup.category}
                      </h3>
                    </div>
                    
                    {/* Skills list */}
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                          className="text-gray-400 flex items-center gap-3 text-sm group/item hover:text-white transition-colors duration-200"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skillGroup.gradient} flex-shrink-0`} />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsDropdown;
