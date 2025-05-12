import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 transform-none">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 transform-none">
        <NavBar />
      </div>

      {/* Main Content - starts below navbar */}
      <div className="pt-[50px] transform-none">
        {/* Hero Section */}
        <section className="h-[calc(100vh-50px)] flex items-center justify-end transform-none">
          <div className="flex justify-end w-full h-full transform-none">
            <h1 className="text-black font-bold drop-shadow-sm h-full w-full justify-center p-24 bg-[#ffbd62] bg-gradient-to-r from-[#ff9e00] to-[#ffbd62] flex-1 self-center transform-none overflow-y-hidden">
              Hello, my name is Jeremy! I am an aspiring AI developer who loves
              to learn and build new things. Here you will find some information
              about me and what I can do.{" "}
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
        {/* Next Section */}
        <section className="min-h-screen transform-none">
          {/* Content for next section will go here */}
        </section>
      </div>
    </div>
  );
}

export default App;
