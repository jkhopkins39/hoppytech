import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-6">
        <li>
          <a href="#home" className="text-white hover:text-gray-200">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="text-white hover:text-gray-200">
            About
          </a>
        </li>
        <li>
          <a href="#services" className="text-white hover:text-gray-200">
            Services
          </a>
        </li>
        <li>
          <a href="#contact" className="text-white hover:text-gray-200">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
