import * as React from "react";
import Button from "./Button";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between max-w-8xl mx-auto">
        <Logo />
        <ul className="flex space-x-96">
          <li>
            <Button>About</Button>
          </li>
          <li>
            <Button>Portfolio</Button>
          </li>
          <li>
            <Button>Creative</Button>
          </li>
          <li>
            <Button>Contact</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
