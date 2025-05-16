import NavBar from "../components/NavBar";

function About() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p>This will be where you can read about me.</p>
      {/* Footer Section */}
      <footer className="w-full bg-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffbd62]"
                >
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffbd62]"
                >
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffbd62]"
                >
                  <i className="fab fa-twitter text-2xl"></i>
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
                  <a href="/portfolio" className="hover:text-[#ffbd62]">
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
                  <span>email@example.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-phone"></i>
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Location, City, Country</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
