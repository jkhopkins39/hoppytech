import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const skills = [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "HTML", "CSS"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Node.js", "Tailwind CSS", "TensorFlow", "PyTorch"]
    },
    {
      category: "Tools & Technologies",
      items: ["Git", "MongoDB", "SQL", "Linux"]
    },
    {
      category: "Soft Skills",
      items: ["Problem Solving", "Team Leadership", "Communication", "Project Management"]
    }
  ];

  return (
    <div className="w-full mb-16">
      {/* Full width line */}
      <div className="w-full h-px bg-black relative">
        <div className="absolute inset-0 bg-white opacity-20"></div>
      </div>
      
      {/* Button container */}
      <div className="flex justify-center my-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg font-medium flex items-center gap-3 transition-transform"
        >
          <span>Skills & Expertise</span>
          <motion.i
            className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}
            animate={{ rotate: isOpen ? 180 : 0 }}
          />
        </motion.button>
      </div>

      {/* Full width line */}
      <div className="w-full h-px bg-black relative">
        <div className="absolute inset-0 bg-white opacity-20"></div>
      </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 p-6 rounded-lg"
                >
                  <h3 className="text-red-500 text-xl font-bold mb-4">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-white flex items-center gap-2">
                        <i className="fas fa-check text-[#ffbd62]"></i>
                        {skill}
                      </li>
                    ))}
                  </ul>
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