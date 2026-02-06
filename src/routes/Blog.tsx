import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  readTime?: number;
}

const Blog: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: ""
  });

  const calculateReadTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateString: string): string => {
    // Parse date parts directly to avoid timezone shifting
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Fetch posts from JSON file
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/data/blogPosts.json');
        if (response.ok) {
          const posts = await response.json();
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    const loggedIn = localStorage.getItem('blogAdminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setStatusMessage(null);

    const post: BlogPost = {
      id: Date.now().toString(),
      title: postForm.title,
      content: postForm.content,
      excerpt: postForm.excerpt,
      author: "Jeremy Hopkins",
      date: new Date().toISOString().split('T')[0],
      tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: calculateReadTime(postForm.content)
    };

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', post })
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: `Post published! Commit: "${result.commitMessage}"` });
        setBlogPosts([post, ...blogPosts]);
        setPostForm({ title: "", content: "", excerpt: "", tags: "" });
        setIsCreatingPost(false);
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Failed to publish post' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPostId) return;
    
    setIsPublishing(true);
    setStatusMessage(null);

    const existingPost = blogPosts.find(p => p.id === editingPostId);
    const updatedPost: BlogPost = {
      id: editingPostId,
      title: postForm.title,
      content: postForm.content,
      excerpt: postForm.excerpt,
      author: existingPost?.author || "Jeremy Hopkins",
      date: existingPost?.date || new Date().toISOString().split('T')[0],
      tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: calculateReadTime(postForm.content)
    };

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', post: updatedPost, postId: editingPostId })
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: `Post updated! Commit: "${result.commitMessage}"` });
        setBlogPosts(blogPosts.map(p => p.id === editingPostId ? updatedPost : p));
        setPostForm({ title: "", content: "", excerpt: "", tags: "" });
        setEditingPostId(null);
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Failed to update post' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsPublishing(false);
    }
  };

  const startEditing = (post: BlogPost) => {
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', ')
    });
    setEditingPostId(post.id);
    setIsCreatingPost(false);
  };

  const cancelEditing = () => {
    setPostForm({ title: "", content: "", excerpt: "", tags: "" });
    setEditingPostId(null);
  };

  const deletePost = async (id: string) => {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    setIsPublishing(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', postId: id })
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: `Post deleted! Commit: "${result.commitMessage}"` });
        setBlogPosts(blogPosts.filter(p => p.id !== id));
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Failed to delete post' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsPublishing(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  // Card gradient themes for variety (matching navbar: red-500, indigo-700, blue-500)
  const cardThemes = [
    {
      gradient: 'from-blue-600/20 via-indigo-600/10 to-indigo-600/20',
      border: 'border-blue-500/30 hover:border-blue-400/50',
      accent: 'from-blue-500 to-indigo-500',
      glow: 'blue-500/30'
    },
    {
      gradient: 'from-indigo-600/20 via-purple-600/10 to-red-600/20',
      border: 'border-indigo-500/30 hover:border-indigo-400/50',
      accent: 'from-indigo-500 to-red-500',
      glow: 'indigo-500/30'
    },
    {
      gradient: 'from-red-600/20 via-rose-600/10 to-pink-600/20',
      border: 'border-red-500/30 hover:border-red-400/50',
      accent: 'from-red-500 to-rose-500',
      glow: 'red-500/30'
    },
    {
      gradient: 'from-blue-600/20 via-sky-600/10 to-cyan-600/20',
      border: 'border-blue-500/30 hover:border-sky-400/50',
      accent: 'from-blue-500 to-sky-500',
      glow: 'blue-500/30'
    },
    {
      gradient: 'from-indigo-600/20 via-violet-600/10 to-purple-600/20',
      border: 'border-indigo-500/30 hover:border-violet-400/50',
      accent: 'from-indigo-500 to-violet-500',
      glow: 'indigo-500/30'
    },
  ];

  const getCardTheme = (index: number) => cardThemes[index % cardThemes.length];

  const tagColors = [
    'bg-blue-500/20 text-blue-300 border-blue-400/30',
    'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
    'bg-red-500/20 text-red-300 border-red-400/30',
    'bg-sky-500/20 text-sky-300 border-sky-400/30',
    'bg-violet-500/20 text-violet-300 border-violet-400/30',
    'bg-rose-500/20 text-rose-300 border-rose-400/30',
  ];

  const getTagColor = (index: number) => tagColors[index % tagColors.length];

  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Mesh gradient orbs */}
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
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Status Message */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
              statusMessage.type === 'success' 
                ? 'bg-green-500/20 border-green-400/30 text-green-300' 
                : 'bg-red-500/20 border-red-400/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {statusMessage.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{statusMessage.text}</span>
              <button 
                onClick={() => setStatusMessage(null)}
                className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publishing Overlay */}
      <AnimatePresence>
        {isPublishing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#0a0a0f] rounded-2xl border border-white/10 p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-white font-semibold text-lg">Publishing to GitHub...</p>
              <p className="text-gray-500 text-sm mt-2">Committing and pushing changes</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Decorative elements */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Latest Thoughts</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                The
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Blog
              </span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              Exploring the intersection of <span className="text-gray-300">AI</span>, <span className="text-gray-300">code</span>, and <span className="text-gray-300">creativity</span>.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Admin Controls */}
        {isLoggedIn && !editingPostId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-center"
          >
            <button
              onClick={() => {
                setIsCreatingPost(!isCreatingPost);
                if (!isCreatingPost) {
                  setPostForm({ title: "", content: "", excerpt: "", tags: "" });
                }
              }}
              className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                {isCreatingPost ? (
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
                    Create New Post
                  </>
                )}
              </span>
            </button>
          </motion.div>
        )}

        {/* Create/Edit Post Form */}
        <AnimatePresence>
          {(isCreatingPost || editingPostId) && isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-16"
            >
              <div className="max-w-3xl mx-auto relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-red-500/50 rounded-3xl blur-xl opacity-30" />
                <div className="relative bg-[#0a0a0f]/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </span>
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {editingPostId ? 'Edit Post' : 'Create New Post'}
                    </span>
                  </h2>
                  <form onSubmit={editingPostId ? handleEditPost : handleCreatePost} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Title</label>
                      <input
                        type="text"
                        value={postForm.title}
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white text-lg placeholder-gray-600"
                        placeholder="Enter an engaging title..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Excerpt</label>
                      <textarea
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600 resize-none"
                        rows={2}
                        placeholder="A brief summary that hooks readers..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Content</label>
                      <textarea
                        value={postForm.content}
                        onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600 resize-none font-mono text-sm leading-relaxed"
                        rows={14}
                        placeholder="Write your post content here..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Tags</label>
                      <input
                        type="text"
                        value={postForm.tags}
                        onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
                        placeholder="AI, React, Web Development (comma-separated)"
                      />
                    </div>
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        disabled={isPublishing}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {editingPostId ? 'Update & Publish' : 'Publish Post'}
                      </button>
                      {editingPostId && (
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-white transition-all duration-300"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts Display */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-6 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-indigo-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">No stories yet</h3>
              <p className="text-gray-500 text-lg mb-8">The blog awaits its first chapter.</p>
              {isLoggedIn && (
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-red-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                >
                  Write the first post
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-10">
              {blogPosts.map((post, index) => {
                const theme = getCardTheme(index);
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="group relative"
                  >
                    {/* Outer glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${theme.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700`} />
                    
                    {/* Card */}
                    <div className={`relative bg-gradient-to-br ${theme.gradient} rounded-3xl overflow-hidden border ${theme.border} transition-all duration-500`}>
                      {/* Inner card content */}
                      <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl m-[1px] rounded-[calc(1.5rem-1px)] overflow-hidden">
                        {/* Accent line */}
                        <div className={`h-1.5 bg-gradient-to-r ${theme.accent}`} />
                        
                        {/* Corner decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.gradient} opacity-30 blur-2xl`} />
                        
                        <div className="relative p-8 md:p-10">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div className="flex-1">
                              {/* Post number badge */}
                              <div className="inline-flex items-center gap-2 mb-4">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${theme.accent} text-white`}>
                                  #{String(blogPosts.length - index).padStart(2, '0')}
                                </span>
                                <span className="text-gray-500 text-sm">•</span>
                                <span className="text-gray-500 text-sm font-medium">{formatDate(post.date)}</span>
                              </div>
                              
                              <h2 
                                className="text-3xl md:text-4xl font-black text-white mb-4 cursor-pointer hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:to-gray-400 hover:bg-clip-text transition-all duration-300 leading-tight tracking-tight"
                                onClick={() => toggleExpand(post.id)}
                              >
                                {post.title}
                              </h2>
                              
                              {/* Meta info */}
                              <div className="flex flex-wrap items-center gap-5 text-sm">
                                <span className="flex items-center gap-2 text-gray-400">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                                    JH
                                  </div>
                                  {post.author}
                                </span>
                                <span className="flex items-center gap-2 text-gray-500">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {post.readTime || calculateReadTime(post.content)} min read
                                </span>
                              </div>
                            </div>

                            {/* Admin actions */}
                            {isLoggedIn && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEditing(post)}
                                  className="p-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 text-gray-400 hover:text-blue-400 rounded-xl transition-all duration-300"
                                  title="Edit post"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => deletePost(post.id)}
                                  className="p-3 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/30 text-gray-400 hover:text-red-400 rounded-xl transition-all duration-300"
                                  title="Delete post"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Excerpt */}
                          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-6">
                            {post.excerpt}
                          </p>

                          {/* Expanded content */}
                          <AnimatePresence>
                            {expandedPostId === post.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 border-t border-white/10">
                                  <p className="text-gray-400 leading-loose whitespace-pre-wrap text-base">
                                    {post.content}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Footer */}
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
                            {/* Tags */}
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${getTagColor(tagIndex)} transition-all duration-300 hover:scale-105`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Read more button */}
                            <button
                              onClick={() => toggleExpand(post.id)}
                              className={`flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 ${expandedPostId === post.id ? 'text-gray-400' : `bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}`}
                            >
                              {expandedPostId === post.id ? (
                                <>
                                  Collapse
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  Read full post
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                                  </svg>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
