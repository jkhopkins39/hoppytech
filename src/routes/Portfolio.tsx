import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'ai' | 'other';
}

const Portfolio: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "Watch Trading Post",
      description: "A web application that allows users to buy and sell watches. It is built with React, Node.js, and Tailwind CSS. It also includes a chatbot that can answer questions about the watches.",
      shortDescription: "A web app for buying and selling watches",
      image: "/projects/ai-chat.png",
      technologies: ["React", "Node.js", "Tailwind CSS", "OpenAI API"],
      repoUrl: "https://github.com/jkhopkins39/ai-chat-app",
      liveUrl: "https://ai-chat-app.vercel.app",
      category: "ai"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'other', name: 'Other' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          Portfolio
        </motion.h1>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-xl"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-project.png';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <i className="fas fa-expand text-3xl text-white mb-2"></i>
                    <p className="text-white text-sm">Click to expand</p>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.shortDescription}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expand Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium transition-transform"
                >
                  {expandedProject === project.id ? 'Show Less' : 'Learn More'}
                </motion.button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-gray-800">
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.repoUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-medium text-center transition-transform hover:bg-gray-700"
                          >
                            <i className="fab fa-github mr-2"></i>
                            Repository
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#ffbd62] text-black py-2 rounded-lg font-medium text-center transition-transform hover:bg-[#ff8f62]"
                          >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
