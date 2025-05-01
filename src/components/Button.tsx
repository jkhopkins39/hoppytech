/**
 * The button component will contain the following:
 * - A medium gray background with black text
 * - A clickable area over the button to link you to the respective page
 */
import * as React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#ffbd62] text-white rounded-md p-1 transition-colors duration-200">
      <button className="bg-transparent focus:outline-none outline-none">
        {" "}
        {children}{" "}
      </button>
    </div>
  );
};

export default Button;
