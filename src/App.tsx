import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      {/* Main Content - starts below navbar */}
      <div className="pt-16">
        {" "}
        {/* This padding-top matches navbar height */}
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-end">
          <div className="flex justify-end w-full">
            <h1 className="text-black font-bold drop-shadow-sm h-full w-full justify-center p-24 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] flex-1 self-center">
              Hello, my name is Jeremy! I am an aspiring AI developer who loves
              to learn and build new things. Here you will find some information
              about me and what I can do.{" "}
              <span className="text-[#5e8fde] drop-shadow-sm animate-pulse">
                So what's next?
              </span>
            </h1>
            <div className="relative">
              <img
                src="/Introduction.jpg"
                alt="A picture of me"
                className="w-[80vw] h-[100vh] object-cover"
              />
            </div>
          </div>
        </section>
        {/* Next Section */}
        <section className="min-h-screen">
          {/* Content for next section will go here */}
        </section>
      </div>
    </div>
  );
}

export default App;
