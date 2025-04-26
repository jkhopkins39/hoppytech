import { Link } from "react-router-dom"; // if using React Router
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4">
      <div className="text-xl font-bold">MySite</div>
      <div className="space-x-4">
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
