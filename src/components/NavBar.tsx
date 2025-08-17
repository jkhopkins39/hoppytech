import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const handleClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="h-12 sm:h-14 md:h-16 bg-black bg-gradient-to-l from-red-500 via-indigo-700 to-blue-500 relative z-50">
      <div className="flex items-center justify-between h-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
        <Logo />

        {/* Mobile Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg border-2 border-gray-400 hover:bg-gray-100 hover:border-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span 
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span 
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 mt-1 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 mt-1 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
          )}

          {/* Mobile Menu Content */}
          <div 
            className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-600 bg-gray-800">
                <h2 className="text-white text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-4">
                <button
                  onClick={() => handleClick("/about")}
                  className="w-full text-left px-6 py-4 text-white hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:bg-blue-600 focus:text-white transition-all duration-200 font-bold text-lg border-b border-gray-700"
                >
                  About
                </button>
                <button
                  onClick={() => handleClick("/portfolio")}
                  className="w-full text-left px-6 py-4 text-white hover:bg-purple-600 hover:text-white active:bg-purple-700 focus:bg-purple-600 focus:text-white transition-all duration-200 font-bold text-lg border-b border-gray-700"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => handleClick("/creative")}
                  className="w-full text-left px-6 py-4 text-white hover:bg-green-600 hover:text-white active:bg-green-700 focus:bg-green-600 focus:text-white transition-all duration-200 font-bold text-lg border-b border-gray-700"
                >
                  Creative
                </button>
                <button
                  onClick={() => handleClick("/contact")}
                  className="w-full text-left px-6 py-4 text-white hover:bg-orange-600 hover:text-white active:bg-orange-700 focus:bg-orange-600 focus:text-white transition-all duration-200 font-bold text-lg border-b border-gray-700"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleClick("/blog")}
                  className="w-full text-left px-6 py-4 text-white hover:bg-indigo-600 hover:text-white active:bg-indigo-700 focus:bg-indigo-600 focus:text-white transition-all duration-200 font-bold text-lg border-b border-gray-700"
                >
                  Blog
                </button>
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t-2 border-gray-600 bg-gray-800">
                <p className="text-white text-sm text-center font-bold">
                  © 2024 Jeremy Hopkins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
