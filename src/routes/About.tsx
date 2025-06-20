import React from 'react';
import { motion } from 'framer-motion';
import EducationTimeline from "../components/EducationTimeline";
import SkillsDropdown from "../components/SkillsDropdown";
import ResumeSection from "../components/ResumeSection";

function About() {
  const educationHistory = [
    {
      title: "Kennesaw State University",
      period: "2022-2025",
      description:
        "Currently pursuing a degree in Computer Science with a focus in Artificial Intelligence. I have worked on the vast majority of my projects during my tenure at KSU, which you can find in my portfolio.",
      image: "/marietta-campus.jpg", // You'll need to add this image to your public folder
    },
    {
      title: "University of West Georgia",
      period: "2021-2022",
      description:
        "During my time at UWG I gained experience in test-driven development, object-oriented programming, and software design. I also worked in the catering department and became very familiar with the facilities there.",
      image: "/UWG.jpg", // You'll need to add this image to your public folder
    },
    {
      title: "Bremen High School",
      period: "2017-2021",
      description:
        "I graduated from Bremen High School in 2021. I was a member of the National Honor Society and the brass captain of the BHS Marching Blue Devils. I also worked in the Fine Arts Center as a sound and lighting technician.",
      image: "/BHS.png", // You'll need to add this image to your public folder
    },
    // Add more education entries as needed
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          About Me
        </motion.h1>

        {/* Decorative Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="px-4 bg-black text-2xl font-bold text-[#ffbd62]"
            >
              Education Journey
            </motion.div>
          </div>
        </div>

        {/* Education Timeline Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <EducationTimeline items={educationHistory} />
        </motion.section>

        {/* Skills Section */}
        <SkillsDropdown />

        {/* Resume Section */}
        <ResumeSection />
      </div>
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
