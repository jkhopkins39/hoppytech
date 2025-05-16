import NavBar from "../components/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./About";
import Blog from "./Blog";
import Creative from "./Creative";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import { socialLinks, contactInfo } from "../config/socialLinks";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Fixed Navbar */}
      <div className="flex-none top-0 right-0 left-0 fixed z-50">
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
                <section className="h-screen flex items-center justify-end bg-[#1a1a1a]">
                  <div className="flex justify-end w-full h-full">
                    <h1 className="text-blue-400 bg-clip-text box-content font-extrabold text-center select-none justify-center p-24 flex-1 self-center overflow-y-hidden">
                      Hello, my name is Jeremy! I am an aspiring AI developer
                      who loves to learn and build new things. Here you will
                      find some information about me and what I can do.{" "}
                      <span
                        onClick={() => scrollTo()}
                        className="text-red-600 drop-shadow-sm animate-pulse"
                      >
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

                {/* Footer Section */}
                <footer className="w-full bg-black text-white py-12">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Social Links */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">
                          Connect With Me
                        </h3>
                        <div className="flex space-x-6">
                          <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/Github-icon.png"
                              alt="GitHub"
                              className="w-8 h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/LinkedIn_logo_initials.png"
                              alt="LinkedIn"
                              className="w-8 h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/Instagram_icon.png"
                              alt="Instagram"
                              className="w-8 h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity bg-white"
                          >
                            <img
                              src="/facebook-icon-lg.png"
                              alt="Facebook"
                              className="w-8 h-8"
                            />
                          </a>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                          <li>
                            <a href="/about" className="hover:text-[#ffbd62]">
                              About
                            </a>
                          </li>
                          <li>
                            <a
                              href="/portfolio"
                              className="hover:text-[#ffbd62]"
                            >
                              Portfolio
                            </a>
                          </li>
                          <li>
                            <a href="/blog" className="hover:text-[#ffbd62]">
                              Blog
                            </a>
                          </li>
                          <li>
                            <a href="/contact" className="hover:text-[#ffbd62]">
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-envelope"></i>
                            <a href={`mailto:${contactInfo.email}`}>
                              {contactInfo.email}
                            </a>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-phone"></i>
                            <a href={`tel:${contactInfo.phone}`}>
                              {contactInfo.phone}
                            </a>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{contactInfo.location}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                      <p>
                        &copy; {new Date().getFullYear()} Jeremy Hopkins. All
                        rights reserved.
                      </p>
                    </div>
                  </div>
                </footer>
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
