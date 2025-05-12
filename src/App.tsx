import NavBar from "./components/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./routes/About";
import Projects from "./routes/Portfolio";
import Creative from "./routes/Creative";
import Contact from "./routes/Contact";

function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-black transform-none snap-mandatory snap-y">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 transform-none">
        <NavBar />
      </div>

      {/* Main Content - starts below navbar */}
      <div className="pt-[50px] transform-none h-[calc(100vh-50px)] overflow-y-scroll overflow-x-hidden bg-black">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section className="h-[calc(100vh-50px)] flex items-center justify-end transform-none">
                  <div className="flex justify-end w-full h-full transform-none">
                    <h1 className="text-black font-bold drop-shadow-sm h-full w-full justify-center p-24 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] flex-1 self-center transform-none overflow-y-hidden">
                      Hello, my name is Jeremy! I am an aspiring AI developer
                      who loves to learn and build new things. Here you will
                      find some information about me and what I can do.{" "}
                      <span className="text-[#5e8fde] drop-shadow-sm animate-pulse">
                        So what's next?
                      </span>
                    </h1>
                    <div className="relative h-full w-auto transform-none flex-shrink-0">
                      <img
                        src="/Introduction.jpg"
                        alt="A picture of me"
                        className="h-full w-auto object-cover transform-none"
                      />
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 h-full w-full object-cover transform-none mix-blend-plus-lighter"
                      >
                        <source src="/output.webm" type="video/webm" />
                      </video>
                    </div>
                  </div>
                </section>

                {/* Second Section */}
                <section className="h-[calc(100vh-50px)] bg-black text-white flex flex-col items-center justify-center p-8">
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
                      onClick={() => navigate("/projects")}
                      className="group relative px-8 py-4 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                      <span className="relative text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                        My Work
                      </span>
                    </button>
                  </div>
                </section>
                <div className="h-[1px] bg-black" />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
