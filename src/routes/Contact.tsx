import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/jeremyyhopkins@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      logo: '/instagram-logo.png',
      handle: '@jeremyhopkins',
      url: 'https://instagram.com/jeremyhopkins'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      logo: '/facebook-logo.png',
      handle: 'Jeremy Hopkins',
      url: 'https://facebook.com/jeremyhopkins'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      logo: '/linkedin-logo.png',
      handle: 'jeremy-hopkins',
      url: 'https://linkedin.com/in/jeremy-hopkins'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      logo: '/github-logo.png',
      handle: 'jkhopkins39',
      url: 'https://github.com/jkhopkins39'
    }
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
          Contact Me
        </motion.h1>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <form 
            action="https://formsubmit.co/jeremyyhopkins@gmail.com" 
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.origin + '/contact-success'} />
            
            <div>
              <label className="block text-lg mb-2">To:</label>
              <input
                type="text"
                value="jeremyyhopkins@gmail.com"
                disabled
                className="w-full p-3 bg-gray-900 rounded-lg text-gray-400"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">From:</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Message:</label>
              <textarea
                name="message"
                required
                placeholder="Enter your message"
                rows={6}
                className="w-full p-3 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-4 rounded-lg font-medium text-lg transition-transform ${
                status === 'sending' 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center"
              >
                Message sent successfully!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center"
              >
                Failed to send message. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-lg transition-transform"
              >
                <div className="relative w-16 h-16">
                  {/* Custom Logo */}
                  <img
                    src={social.logo}
                    alt={`${social.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // If image fails to load, show the Font Awesome icon
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback Font Awesome Icon */}
                  <i className={`${social.icon} text-5xl text-white absolute inset-0 flex items-center justify-center hidden`}></i>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white">{social.name}</h3>
                  <p className="text-gray-400">{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
