import * as React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="h-16 p-2 bg-black scale-100 min-h-16 bg-gradient-to-l from-red-500 via-indigo-700 to-blue-500">
      <div className="flex items-center h-full max-w-8xl mx-auto scale-100">
        <div className="justify-start p-4 scale-auto">
          <Logo />
        </div>
        <div className="flex flex-1 justify-end sm:pr-8 scale-100">
          <ul className="flex lg:gap-12 scale-100">
            <div className="rounded-full p-4 scale-100">
              <button
                onClick={() => handleClick("/about")}
                className="bg-white w-full border-1 border-black px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
              >
                About
              </button>
            </div>
            <li>
              <div className="rounded-full p-4 scale-100">
                <button
                  onClick={() => handleClick("/portfolio")}
                  className="bg-white w-full border-1 border-black px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Portfolio
                </button>
              </div>
            </li>
            <li>
              <div className="rounded-full p-4 scale-100">
                <button
                  onClick={() => handleClick("/creative")}
                  className="bg-white w-full border-1 border-black px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Creative
                </button>
              </div>
            </li>
            <li>
              <div className="rounded-full p-4 scale-100">
                <button
                  onClick={() => handleClick("/contact")}
                  className="bg-white w-full border-1 border-black px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </li>
            <li>
              <div className="rounded-full p-4 scale-100">
                <button
                  onClick={() => handleClick("/blog")}
                  className="bg-white w-full border-1 border-black px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-black rounded-full hover:bg-blue-200 transition-colors duration-200"
                >
                  Blog
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
