import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  imageWebP?: string;
  imageFallback?: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'ai' | 'other';
}

const Portfolio: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialProjects: Project[] = [
    {
      id: 1,
      title: "Watch Trading Post",
      description: "A luxury timepiece marketplace showcasing exceptional watches from the world's finest brands. Features an elegant design with smooth animations and a comprehensive collection of high-end timepieces for discerning collectors.",
      shortDescription: "Luxury timepiece marketplace",
      image: "/images/projects/watch.webp",
      imageWebP: "/images/projects/watch.webp",
      imageFallback: "/images/projects/watch.png",
      technologies: ["React", "Node.js", "Tailwind CSS", "Modern UI/UX"],
      repoUrl: "",
      liveUrl: "https://www.watchtradingpost.com/",
      category: "web"
    },
    {
      id: 2,
      title: "Landlock Solutions LLC",
      description: "A professional business website showcasing comprehensive solutions and services. Built with modern web technologies to provide an excellent user experience and clear communication of business offerings.",
      shortDescription: "Professional business solutions website",
      image: "/images/projects/land.webp",
      imageWebP: "/images/projects/land.webp",
      imageFallback: "/images/projects/land.png",
      technologies: ["React", "Node.js", "Tailwind CSS", "Business Solutions"],
      repoUrl: "",
      liveUrl: "https://landlocksolutionsllc.com",
      category: "web"
    },
    {
      id: 3,
      title: "SXNCTUARY",
      description: "A modern web platform featuring innovative design and functionality. This project demonstrates advanced web development techniques and creative user interface design.",
      shortDescription: "Modern web platform with innovative design",
      image: "/images/projects/sxnctuary.webp",
      imageWebP: "/images/projects/sxnctuary.webp",
      imageFallback: "/images/projects/sxnctuary.png",
      technologies: ["React", "Node.js", "Tailwind CSS", "Modern Design"],
      repoUrl: "",
      liveUrl: "https://sxnctuary.com",
      category: "web"
    }
  ];

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    technologies: [],
    category: 'web',
    liveUrl: '',
    repoUrl: ''
  });
  const [techInput, setTechInput] = useState('');

  React.useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem('blogAdminLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };
    
    checkLogin();
    // Listen for storage events to update login state across tabs/components
    window.addEventListener('storage', checkLogin);
    // Also check on interval in case storage event doesn't fire (same window)
    const interval = setInterval(checkLogin, 1000);
    
    return () => {
      window.removeEventListener('storage', checkLogin);
      clearInterval(interval);
    };
  }, []);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    if (editingId) {
      // Edit existing project
      const updatedProjects = projects.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            title: newProject.title!,
            description: newProject.description!,
            shortDescription: newProject.shortDescription || '',
            image: newProject.image || '/placeholder-image.jpg',
            imageWebP: newProject.image,
            imageFallback: newProject.image,
            technologies: newProject.technologies || [],
            category: newProject.category as any,
            liveUrl: newProject.liveUrl,
            repoUrl: newProject.repoUrl
          };
        }
        return p;
      });
      
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      setEditingId(null);
    } else {
      // Add new project
      const project: Project = {
        id: Date.now(),
        title: newProject.title!,
        description: newProject.description!,
        shortDescription: newProject.shortDescription || '',
        image: newProject.image || '/placeholder-image.jpg',
        imageWebP: newProject.image,
        imageFallback: newProject.image,
        technologies: newProject.technologies || [],
        category: newProject.category as any,
        liveUrl: newProject.liveUrl,
        repoUrl: newProject.repoUrl
      };

      const updatedProjects = [project, ...projects];
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    }
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      shortDescription: '',
      image: '',
      technologies: [],
      category: 'web',
      liveUrl: '',
      repoUrl: ''
    });
    setIsAddingProject(false);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription,
      image: project.image,
      technologies: project.technologies,
      category: project.category,
      liveUrl: project.liveUrl || '',
      repoUrl: project.repoUrl || ''
    });
    setEditingId(project.id);
    setIsAddingProject(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    }
  };

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setNewProject(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (techToRemove: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter(t => t !== techToRemove)
    }));
  };

  // Debug: Log image paths
  console.log('Portfolio projects:', projects.map(p => ({ title: p.title, image: p.image })));

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
      <div className="container mx-auto px-4 py-12 pb-44">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          Jeremy Hopkins Portfolio
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Explore my latest projects in web development, AI applications, and software engineering. 
          Each project showcases my skills in React, Python, JavaScript, and modern development practices.
        </motion.p>

        {/* Admin Add Project Button */}
        {isLoggedIn && (
          <div className="mb-8 text-center">
            <button
              onClick={() => {
                if (isAddingProject) {
                  setIsAddingProject(false);
                  setEditingId(null);
                  setNewProject({
                    title: '',
                    description: '',
                    shortDescription: '',
                    image: '',
                    technologies: [],
                    category: 'web',
                    liveUrl: '',
                    repoUrl: ''
                  });
                } else {
                  setIsAddingProject(true);
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105"
            >
              {isAddingProject ? 'Cancel' : 'Add New Project'}
            </button>
          </div>
        )}

        {/* Add/Edit Project Form */}
        <AnimatePresence>
          {isLoggedIn && isAddingProject && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl overflow-hidden border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Category</label>
                    <select
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                      className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Short Description (Card View)</label>
                  <input
                    type="text"
                    value={newProject.shortDescription}
                    onChange={e => setNewProject({...newProject, shortDescription: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Brief summary of the project"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Full Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    className="w-full bg-gray-800 text-white rounded p-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Detailed project description"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Image URL</label>
                    <input
                      type="text"
                      value={newProject.image}
                      onChange={e => setNewProject({...newProject, image: e.target.value})}
                      className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="/path/to/image.jpg or https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Technologies</label>
                    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-800 rounded min-h-[3rem]">
                      {newProject.technologies?.map(tech => (
                        <span key={tech} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                          {tech}
                          <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-300">×</button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={techInput}
                        onChange={e => setTechInput(e.target.value)}
                        onKeyDown={handleAddTech}
                        className="bg-transparent outline-none flex-1 min-w-[100px]"
                        placeholder="Type & Enter to add"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Live URL</label>
                    <input
                      type="text"
                      value={newProject.liveUrl}
                      onChange={e => setNewProject({...newProject, liveUrl: e.target.value})}
                      className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Repository URL</label>
                    <input
                      type="text"
                      value={newProject.repoUrl}
                      onChange={e => setNewProject({...newProject, repoUrl: e.target.value})}
                      className="w-full bg-gray-800 text-white rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.02]"
                >
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

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
              <div className="relative h-48 overflow-hidden">
                {isLoggedIn && (
                  <div className="absolute top-2 right-2 z-20 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                      title="Edit Project"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                      className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                      title="Delete Project"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
                <picture>
                  <source srcSet={project.imageWebP} type="image/webp" />
                  <img
                    src={project.imageFallback || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`Failed to load image: ${project.image}`);
                      if (project.imageFallback && project.imageFallback !== project.image) {
                        target.src = project.imageFallback;
                      } else {
                        target.style.display = 'none';
                      }
                    }}
                  />
                </picture>
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
