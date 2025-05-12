import * as React from "react";
import Logo from "./Logo";
import { useNavigate, Route, Routes, BrowserRouter } from "react-router-dom";
import About from "../routes/About";
import App from "../App";

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="h-16 bg-blue-500 p-2 bg-gradient-to-b from-[#5e8fde] to-[#4b73b3] scale-100 min-h-16">
      <div className="flex items-center h-full max-w-8xl mx-auto scale-100">
        <Routes>
          <div className="justify-start p-4 scale-auto">
            <Route>
              <Logo />
            </Route>
          </div>
          <div className="flex flex-1 justify-end sm:pr-8 scale-100">
            <ul className="flex lg:gap-12 scale-100">
              <div className="rounded-full p-4 scale-100">
                <button
                  onClick={() => handleClick("/About")}
                  className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                >
                  <Route path="/About" element={<About />} />
                  About
                </button>
              </div>
              <li>
                <div className="rounded-full p-4 scale-100">
                  <button
                    onClick={() => handleClick("/Projects")}
                    className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                  >
                    Portfolio
                  </button>
                </div>
              </li>
              <li>
                <div className="rounded-full p-4 scale-100">
                  <button
                    onClick={() => handleClick("/Creative")}
                    className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                  >
                    Creative
                  </button>
                </div>
              </li>
              <li>
                <div className="rounded-full p-4 scale-100">
                  <button
                    onClick={() => handleClick("/Contact")}
                    className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                  >
                    Contact
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </Routes>
      </div>
    </nav>
  );
};

export default NavBar;
