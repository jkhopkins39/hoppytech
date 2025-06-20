import React from 'react';
import { socialLinks, contactInfo } from '../config/socialLinks';

const Footer: React.FC = () => {
  return (
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
                  src="/Github-icon.png"
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
                  src="/LinkedIn_logo_initials.png"
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
                  src="/instagram-logo.png"
                  alt="Instagram"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity bg-white"
              >
                <img
                  src="/facebook-logo.png"
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
            &copy; {new Date().getFullYear()} Jeremy Hopkins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 