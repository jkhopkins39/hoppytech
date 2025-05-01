/**
 * The button component will contain the following:
 * - A medium gray background with black text
 * - A clickable area over the button to link you to the respective page
 */
import * as React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-orange-500 text-white rounded-md p-1">
      <button className="bg-transparent"> {children} </button>
    </div>
  );
};

export default Button;
