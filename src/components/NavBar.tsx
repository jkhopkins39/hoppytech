import * as React from "react";
import Button from "./Button";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="h-16 bg-blue-500 p-2 bg-gradient-to-b from-[#5e8fde] to-[#4b73b3]">
      <div className="flex items-center h-full max-w-8xl mx-auto">
        <div className="mr-4 sm:mr-8">
          <Logo />
        </div>
        <div className="flex-1 flex justify-end pr-4 sm:pr-8">
          <ul className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-12">
            <li>
              <div className="bg-gradient-to-r from-[#ffbd62] to-black rounded-full p-[2px]">
                <button
                  onClick={() => handleClick("/About")}
                  className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                >
                  About
                </button>
              </div>
            </li>
            <li>
              <div className="bg-gradient-to-r from-[#ffbd62] to-black rounded-full p-[2px]">
                <button
                  onClick={() => handleClick("/Projects")}
                  className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                >
                  Portfolio
                </button>
              </div>
            </li>
            <li>
              <div className="bg-gradient-to-r from-[#ffbd62] to-black rounded-full p-[2px]">
                <button
                  onClick={() => handleClick("/Creative")}
                  className="w-full px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm text-white rounded-full hover:bg-orange-400 transition-colors duration-200"
                >
                  Creative
                </button>
              </div>
            </li>
            <li>
              <div className="bg-gradient-to-r from-[#ffbd62] to-black rounded-full p-[2px]">
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
      </div>
    </nav>
  );
};

export default NavBar;
