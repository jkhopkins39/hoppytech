import NavBar from "./components/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./routes/About";
import Blog from "./routes/Blog";
import Creative from "./routes/Creative";
import Contact from "./routes/Contact";
import Portfolio from "./routes/Portfolio";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Fixed Navbar */}
      <div className="flex-none">
        <NavBar />
      </div>

      {/* Main Content - starts below navbar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-black">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section className="h-screen flex items-center justify-end">
                  <div className="flex justify-end w-full h-full">
                    <h1 className="text-black font-bold drop-shadow-sm h-full w-full justify-center p-24 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] flex-1 self-center overflow-y-hidden">
                      Hello, my name is Jeremy! I am an aspiring AI developer
                      who loves to learn and build new things. Here you will
                      find some information about me and what I can do.{" "}
                      <span className="text-[#5e8fde] drop-shadow-sm animate-pulse">
                        So what's next?
                      </span>
                    </h1>
                    <div className="relative h-full w-auto flex-shrink-0">
                      <img
                        src="/Introduction.jpg"
                        alt="A picture of me"
                        className="h-full w-auto object-cover"
                      />
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 h-full w-full object-cover mix-blend-plus-lighter"
                      >
                        <source src="/output.webm" type="video/webm" />
                      </video>
                    </div>
                  </div>
                </section>

                {/* Second Section */}
                <section className="h-screen bg-black text-white flex flex-col items-center justify-center p-8 snap-start">
                  {/* Buttons Container */}
                  <div className="flex gap-8 mt-8">
                    {/* Contact Me Button */}
                    <button
                      onClick={() => navigate("/contact")}
                      className="group relative px-8 py-4 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                      <span className="relative text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                        Contact Me
                      </span>
                    </button>

                    {/* My Work Button */}
                    <button
                      onClick={() => navigate("/portfolio")}
                      className="group relative px-8 py-4 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                      <span className="relative text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                        My Work
                      </span>
                    </button>
                  </div>
                </section>
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
