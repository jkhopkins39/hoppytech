/*
The logo component will contain the following:
- A square thumbnail
- A square clickable area to take you to the Home page
*/

import * as React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="block group">
      <div className="relative">
        <img
          src="/WebsiteLogo.png"
          alt="Logo"
          className="border-1 border-white size-12 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-100 drop-shadow-md"
        />
      </div>
    </Link>
  );
};

export default Logo;
