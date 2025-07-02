import React, { useState } from 'react';
import { socialLinks, contactInfo } from '../config/socialLinks';

const Footer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Hardcoded credentials (you can change these)
  const ADMIN_USERNAME = "jeremy";
  const ADMIN_PASSWORD = "bcs11482";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginForm({ username: "", password: "" });
      setShowLogin(false);
      // Store login state in localStorage
      localStorage.setItem('blogAdminLoggedIn', 'true');
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('blogAdminLoggedIn');
  };

  // Check if already logged in on component mount
  React.useEffect(() => {
    const loggedIn = localStorage.getItem('blogAdminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <footer className="w-full bg-black text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Social Links */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Connect With Me
            </h3>
            <div className="flex space-x-4 md:space-x-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/Github-icon.png"
                  alt="GitHub"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/instagram-logo.png"
                  alt="Instagram"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity bg-white"
              >
                <img
                  src="/facebook-logo.png"
                  alt="Facebook"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <i className="fas fa-envelope"></i>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm md:text-base"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-phone"></i>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm md:text-base"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt"></i>
                <span className="text-sm md:text-base">
                  {contactInfo.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Admin Section */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Admin
            </h3>
            {!isLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {showLogin ? 'Hide Login' : 'Admin Login'}
                </button>
                {showLogin && (
                  <form onSubmit={handleLogin} className="space-y-2 mt-2">
                    <input
                      type="text"
                      placeholder="Username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                      className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded text-xs transition-colors"
                    >
                      Login
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-green-400">Logged in as Admin</p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700 text-center">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} Jeremy Hopkins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 