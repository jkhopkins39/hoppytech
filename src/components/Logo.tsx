/*
The logo component will contain the following:
- A square thumbnail
- A square clickable area to take you to the Home page
*/

import * as React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="block">
      <img src="/WebsiteLogo.png" alt="Logo" className="size-12" />
    </Link>
  );
};

export default Logo;
