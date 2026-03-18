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
      shortDescription: "Modern website for DNB artist",
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
    <div className="min-h-screen bg-[#050508] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] translate-x-1/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
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

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16 pb-44">
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
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Featured Work</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Explore my latest projects in web development, AI applications, and software engineering. 
            Each project showcases my skills in React, Python, JavaScript, and modern development practices.
          </p>
        </motion.div>

        {/* Admin Add Project Button */}
        {isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-center"
          >
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
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                {isAddingProject ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Project
                  </>
                )}
              </span>
            </button>
          </motion.div>
        )}

        {/* Add/Edit Project Form */}
        <AnimatePresence>
          {isLoggedIn && isAddingProject && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-16"
            >
              <div className="max-w-4xl mx-auto relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-red-500/50 rounded-3xl blur-xl opacity-30" />
                <div className="relative bg-[#0a0a0f]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </span>
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {editingId ? 'Edit Project' : 'Add New Project'}
                    </span>
                  </h2>
                  <form onSubmit={handleAddProject} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Project Title</label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={e => setNewProject({...newProject, title: e.target.value})}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                          placeholder="Enter project title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Category</label>
                        <select
                          value={newProject.category}
                          onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white"
                        >
                          <option value="web" className="bg-gray-900">Web Development</option>
                          <option value="mobile" className="bg-gray-900">Mobile Apps</option>
                          <option value="ai" className="bg-gray-900">AI & Machine Learning</option>
                          <option value="other" className="bg-gray-900">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Short Description (Card View)</label>
                      <input
                        type="text"
                        value={newProject.shortDescription}
                        onChange={e => setNewProject({...newProject, shortDescription: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                        placeholder="Brief summary of the project"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Full Description</label>
                      <textarea
                        value={newProject.description}
                        onChange={e => setNewProject({...newProject, description: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600 resize-none h-32"
                        placeholder="Detailed project description"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Image URL</label>
                        <input
                          type="text"
                          value={newProject.image}
                          onChange={e => setNewProject({...newProject, image: e.target.value})}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                          placeholder="/path/to/image.jpg or https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Technologies</label>
                        <div className="flex flex-wrap gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl min-h-[3.5rem] items-center">
                          {newProject.technologies?.map(tech => (
                            <span key={tech} className="bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              {tech}
                              <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400 transition-colors">×</button>
                            </span>
                          ))}
                          <input
                            type="text"
                            value={techInput}
                            onChange={e => setTechInput(e.target.value)}
                            onKeyDown={handleAddTech}
                            className="bg-transparent outline-none flex-1 min-w-[100px] text-white placeholder-gray-600"
                            placeholder="Type & Enter to add"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Live URL</label>
                        <input
                          type="text"
                          value={newProject.liveUrl}
                          onChange={e => setNewProject({...newProject, liveUrl: e.target.value})}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Repository URL</label>
                        <input
                          type="text"
                          value={newProject.repoUrl}
                          onChange={e => setNewProject({...newProject, repoUrl: e.target.value})}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {editingId ? 'Update Project' : 'Save Project'}
                    </button>
                  </form>
                </div>
              </div>
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
          <div className="flex flex-wrap gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
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
          {filteredProjects.map((project, index) => {
            const cardGradients = [
              'from-blue-600/20 via-indigo-600/10 to-indigo-600/20',
              'from-indigo-600/20 via-purple-600/10 to-red-600/20',
              'from-red-600/20 via-rose-600/10 to-pink-600/20',
            ];
            const cardBorders = [
              'border-blue-500/30 hover:border-blue-400/50',
              'border-indigo-500/30 hover:border-indigo-400/50',
              'border-red-500/30 hover:border-red-400/50',
            ];
            const cardAccents = [
              'from-blue-500 to-indigo-500',
              'from-indigo-500 to-red-500',
              'from-red-500 to-rose-500',
            ];
            const gradient = cardGradients[index % cardGradients.length];
            const border = cardBorders[index % cardBorders.length];
            const accent = cardAccents[index % cardAccents.length];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Outer glow */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700`} />
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden border ${border} transition-all duration-500`}>
                  <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl m-[1px] rounded-[calc(1rem-1px)] overflow-hidden">
                    {/* Accent line */}
                    <div className={`h-1 bg-gradient-to-r ${accent}`} />
                    
                    <div className="relative h-48 overflow-hidden">
                      {isLoggedIn && (
                        <div className="absolute top-3 right-3 z-20 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(project);
                            }}
                            className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-blue-500/50 border border-white/20 hover:border-blue-400/50 text-white rounded-xl transition-all duration-300"
                            title="Edit Project"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project.id);
                            }}
                            className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-red-500/50 border border-white/20 hover:border-red-400/50 text-white rounded-xl transition-all duration-300"
                            title="Delete Project"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <picture>
                        <source srcSet={project.imageWebP} type="image/webp" />
                        <img
                          src={project.imageFallback || project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all duration-300">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.shortDescription}</p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => {
                          const techColors = [
                            'bg-blue-500/20 text-blue-300 border-blue-400/30',
                            'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
                            'bg-red-500/20 text-red-300 border-red-400/30',
                          ];
                          return (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-semibold rounded-full border ${techColors[techIndex % techColors.length]} transition-all duration-300 hover:scale-105`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-gray-400 border border-white/10">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Expand Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          expandedProject === project.id
                            ? 'bg-white/10 border border-white/20 text-gray-300'
                            : `bg-gradient-to-r ${accent} text-white shadow-lg hover:shadow-xl`
                        }`}
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
                          <div className="px-6 pb-6 pt-2 border-t border-white/10">
                            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                              {project.description}
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              {project.repoUrl && (
                                <motion.a
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                  <i className="fab fa-github"></i>
                                  Repository
                                </motion.a>
                              )}
                              {project.liveUrl && (
                                <motion.a
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex-1 py-3 bg-gradient-to-r ${accent} text-white rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Live Demo
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
