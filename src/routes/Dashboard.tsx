import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

interface ContactSubmission {
  id: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('blogAdminLoggedIn');
    if (loggedIn !== 'true') {
      navigate('/');
      return;
    }
    setIsLoggedIn(true);

    // Load submissions
    const savedSubmissions = localStorage.getItem('contactSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
    setIsLoading(false);
  }, [navigate]);

  const markAsRead = (id: string) => {
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, read: true } : sub
    );
    setSubmissions(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const markAsUnread = (id: string) => {
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, read: false } : sub
    );
    setSubmissions(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
  };

  const deleteSubmission = (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('contactSubmissions', JSON.stringify(updated));
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null);
    }
  };

  const clearAllSubmissions = () => {
    if (!confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) return;
    setSubmissions([]);
    localStorage.setItem('contactSubmissions', JSON.stringify([]));
    setSelectedSubmission(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('blogAdminLoggedIn');
    navigate('/');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'unread') return !sub.read;
    if (filter === 'read') return sub.read;
    return true;
  });

  const unreadCount = submissions.filter(s => !s.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-2">Manage contact form submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 self-start md:self-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Submissions</p>
                <p className="text-3xl font-bold text-white">{submissions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Unread</p>
                <p className="text-3xl font-bold text-white">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Read</p>
                <p className="text-3xl font-bold text-white">{submissions.length - unreadCount}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <div className="flex gap-2">
            {(['all', 'unread', 'read'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${
                  filter === f 
                    ? 'bg-violet-500 text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f}
                {f === 'unread' && unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          {submissions.length > 0 && (
            <button
              onClick={clearAllSubmissions}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium transition-all duration-300"
            >
              Clear All
            </button>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Submissions List */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Messages</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p>No {filter !== 'all' ? filter : ''} submissions</p>
                </div>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => {
                      setSelectedSubmission(submission);
                      if (!submission.read) markAsRead(submission.id);
                    }}
                    className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${
                      selectedSubmission?.id === submission.id 
                        ? 'bg-violet-500/20' 
                        : 'hover:bg-white/5'
                    } ${!submission.read ? 'border-l-4 border-l-amber-500' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${!submission.read ? 'text-white' : 'text-gray-300'}`}>
                          {submission.email}
                        </p>
                        <p className="text-gray-500 text-sm truncate mt-1">
                          {submission.message}
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                          {formatDate(submission.date)}
                        </p>
                      </div>
                      {!submission.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedSubmission ? (
                <motion.div
                  key={selectedSubmission.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col"
                >
                  {/* Detail Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">
                          {selectedSubmission.email}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {formatDate(selectedSubmission.date)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectedSubmission.read ? markAsUnread(selectedSubmission.id) : markAsRead(selectedSubmission.id)}
                          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                          title={selectedSubmission.read ? "Mark as unread" : "Mark as read"}
                        >
                          {selectedSubmission.read ? (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                        <a
                          href={`mailto:${selectedSubmission.email}`}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all"
                          title="Reply via email"
                        >
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </a>
                        <button
                          onClick={() => deleteSubmission(selectedSubmission.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-all"
                          title="Delete"
                        >
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 p-6">
                    <div className="bg-black/30 rounded-xl p-6">
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center p-12"
                >
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">Select a message to view</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
