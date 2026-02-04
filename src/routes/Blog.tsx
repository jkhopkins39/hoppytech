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
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: ""
  });

  // Calculate reading time (average 200 words per minute)
  const calculateReadTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  // Format date nicely
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }

    const loggedIn = localStorage.getItem('blogAdminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
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

    const updatedPosts = [post, ...blogPosts];
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setPostForm({ title: "", content: "", excerpt: "", tags: "" });
    setIsCreatingPost(false);
  };

  const handleEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPostId) return;

    const updatedPosts = blogPosts.map(post => {
      if (post.id === editingPostId) {
        return {
          ...post,
          title: postForm.title,
          content: postForm.content,
          excerpt: postForm.excerpt,
          tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          readTime: calculateReadTime(postForm.content)
        };
      }
      return post;
    });

    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setPostForm({ title: "", content: "", excerpt: "", tags: "" });
    setEditingPostId(null);
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

  const deletePost = (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const updatedPosts = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  // Tag colors for visual variety
  const tagColors = [
    'from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/30',
    'from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30',
    'from-green-500/20 to-green-600/20 text-green-300 border-green-500/30',
    'from-orange-500/20 to-orange-600/20 text-orange-300 border-orange-500/30',
    'from-pink-500/20 to-pink-600/20 text-pink-300 border-pink-500/30',
    'from-cyan-500/20 to-cyan-600/20 text-cyan-300 border-cyan-500/30',
  ];

  const getTagColor = (index: number) => tagColors[index % tagColors.length];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Thoughts on AI, web development, and the journey of building cool things.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Admin Controls */}
        {isLoggedIn && !editingPostId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <button
              onClick={() => {
                setIsCreatingPost(!isCreatingPost);
                if (!isCreatingPost) {
                  setPostForm({ title: "", content: "", excerpt: "", tags: "" });
                }
              }}
              className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
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
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </span>
                  {editingPostId ? 'Edit Post' : 'Create New Post'}
                </h2>
                <form onSubmit={editingPostId ? handleEditPost : handleCreatePost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500"
                      placeholder="Enter an engaging title..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500 resize-none"
                      rows={2}
                      placeholder="A brief summary that hooks readers..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500 resize-none"
                      rows={12}
                      placeholder="Write your post content here..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <input
                      type="text"
                      value={postForm.tags}
                      onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500"
                      placeholder="AI, React, Web Development (comma-separated)"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {editingPostId ? 'Save Changes' : 'Publish Post'}
                    </button>
                    {editingPostId && (
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-all duration-300"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts Display */}
        <div className="max-w-4xl mx-auto">
          {blogPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">The blog is waiting for its first story.</p>
              {isLoggedIn && (
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Write the first post
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                    {/* Colored accent bar */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h2 
                            className="text-2xl md:text-3xl font-bold text-white mb-3 cursor-pointer hover:text-blue-400 transition-colors"
                            onClick={() => toggleExpand(post.id)}
                          >
                            {post.title}
                          </h2>
                          
                          {/* Meta info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-2">
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
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                              title="Edit post"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
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
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {expandedPostId === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-gray-700/50">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-700/50">
                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r border ${getTagColor(tagIndex)}`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read more button */}
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          {expandedPostId === post.id ? (
                            <>
                              Show less
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              Read more
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
