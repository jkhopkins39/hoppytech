/*
The logo component will contain the following:
- A square thumbnail
- A square clickable area to take you to the Home page
*/

import * as React from "react";

const Logo = () => {
  return (
    <div className="w-10 h-10 bg-gray-200 rounded-md">
      <button>
        <img src="assets/WebsiteLogo.png" alt="Logo" />
      </button>
    </div>
  );
};

export default Logo;
