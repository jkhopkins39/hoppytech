/*
The logo component will contain the following:
- A square thumbnail
- A square clickable area to take you to the Home page
*/

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <img
        src="/WebsiteLogo.png"
        alt="Logo"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-100 drop-shadow-sm"
      />
    </Link>
  );
};

export default Logo;
