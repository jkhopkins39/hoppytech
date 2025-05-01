/*
The logo component will contain the following:
- A square thumbnail
- A square clickable area to take you to the Home page
*/

import * as React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="block w-[4vw] h-[4vw] min-w-[40px] min-h-[40px]">
      <img
        src="/WebsiteLogo.png"
        alt="Logo"
        className="w-full h-full object-cover rounded-md"
      />
    </Link>
  );
};

export default Logo;
