import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="h-12 sm:h-14 md:h-16 bg-black bg-gradient-to-l from-red-500 via-indigo-700 to-blue-500">
      <div className="flex items-center justify-between h-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
        <Logo />

        {/* Explore Button and Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white border-1 border-black px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
          >
            Explore
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => handleClick("/about")}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                About
              </button>
              <button
                onClick={() => handleClick("/portfolio")}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                Portfolio
              </button>
              <button
                onClick={() => handleClick("/creative")}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                Creative
              </button>
              <button
                onClick={() => handleClick("/contact")}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                Contact
              </button>
              <button
                onClick={() => handleClick("/blog")}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
