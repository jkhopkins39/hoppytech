import NavBar from "../components/NavBar";
import Chatbot from "../components/Chatbot";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./About";
import Blog from "./Blog";
import Creative from "./Creative";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import ThankYou from "./ThankYou";
import { socialLinks, contactInfo } from "../config/socialLinks";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-black">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="flex flex-col md:flex-row bg-[#1a1a1a]">
                  <div className="w-full md:w-1/2 p-4 sm:p-4 md:p-8 flex flex-col justify-center order-2 md:order-1">
                    <h1 className="text-blue-400 bg-clip-text font-extrabold text-center md:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl select-none max-w-[90vw] md:max-w-none mx-auto mb-8">
                      Hello, I'm Jeremy Hopkins - AI Developer & Computer Science Student
                    </h1>
                    <p className="text-gray-300 text-center md:text-left text-lg md:text-xl mb-6 leading-relaxed">
                      I'm a Computer Science student at Kennesaw State University specializing in Artificial Intelligence and Machine Learning. 
                      I love building innovative solutions using React, Python, and modern web technologies.
                    </p>
                    <p className="text-gray-400 text-center md:text-left text-base md:text-lg mb-8 leading-relaxed">
                      Explore my portfolio to see my projects in AI development, web applications, and software engineering. 
                      Let's connect and build something amazing together!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button
                        onClick={() => navigate("/portfolio")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
                      >
                        Explore My Work
                      </button>
                      <button
                        onClick={() => navigate("/contact")}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
                      >
                        Contact Me
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-screen relative order-1 md:order-2">
                    <img
                      src="/Introduction.jpg"
                      alt="Jeremy Hopkins - AI Developer and Computer Science Student at Kennesaw State University"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute top-0 left-0 h-full w-full object-cover mix-blend-plus-lighter"
                    >
                      <source src="/video/output.webm" type="video/webm" />
                    </video>
                  </div>
                </section>

                <footer className="w-full bg-black text-white py-8 md:py-12">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {/* Social Links */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                          Connect With Me
                        </h3>
                        <div className="flex space-x-4 md:space-x-6">
                          <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/images/social/Github-icon.png"
                              alt="GitHub"
                              className="w-6 h-6 md:w-8 md:h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/images/social/LinkedIn_logo_initials.png"
                              alt="LinkedIn"
                              className="w-6 h-6 md:w-8 md:h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/images/social/instagram-logo.png"
                              alt="Instagram"
                              className="w-6 h-6 md:w-8 md:h-8"
                            />
                          </a>
                          <a
                            href={socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/images/social/facebook-logo.png"
                              alt="Facebook"
                              className="w-6 h-6 md:w-8 md:h-8"
                            />
                          </a>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                          Contact Info
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-envelope"></i>
                            <a
                              href={`mailto:${contactInfo.email}`}
                              className="text-sm md:text-base"
                            >
                              {contactInfo.email}
                            </a>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-phone"></i>
                            <a
                              href={`tel:${contactInfo.phone}`}
                              className="text-sm md:text-base"
                            >
                              {contactInfo.phone}
                            </a>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="text-sm md:text-base">
                              {contactInfo.location}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700 text-center">
                      <p className="text-sm md:text-base">
                        &copy; {new Date().getFullYear()} Jeremy Hopkins. All
                        rights reserved.
                      </p>
                    </div>
                  </div>
                </footer>
                
                {/* Chatbot */}
                <Chatbot />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
