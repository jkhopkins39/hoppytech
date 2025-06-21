import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Add required FormSubmit fields
      formData.append('_subject', 'New Contact Form Submission from Portfolio');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      
      const response = await fetch('https://formsubmit.co/jeremyyhopkins@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      logo: '/instagram-logo.png',
      handle: '@jeremykhopkins',
      url: 'https://instagram.com/jeremykhopkins'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      logo: '/facebook-logo.png',
      handle: 'Jeremy Hopkins',
      url: 'https://facebook.com/jeremy.hopkins.94695'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      logo: '/linkedin-logo.png',
      handle: 'jeremy-hopkins-160001275',
      url: 'https://www.linkedin.com/in/jeremy-hopkins-160001275'
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
      <div className="container mx-auto px-4 py-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          Contact Me
        </motion.h1>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-14"
        >
          <form 
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-base mb-2">To:</label>
              <input
                type="text"
                value="jeremyyhopkins@gmail.com"
                disabled
                className="w-full p-2.5 bg-gray-900 rounded-lg text-gray-400"
              />
            </div>
            <div>
              <label className="block text-base mb-2" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full p-2.5 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-base mb-2" htmlFor="email">From:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full p-2.5 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-base mb-2" htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Enter your message"
                rows={5}
                className="w-full p-2.5 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-3.5 rounded-lg font-medium text-base transition-all duration-300 ${
                status === 'sending' 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : status === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : status === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {status === 'sending' ? 'Sending...' : 
               status === 'success' ? 'Message Sent!' : 
               status === 'error' ? 'Try Again' : 
               'Send Message'}
            </motion.button>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 text-center"
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center"
              >
                ❌ Failed to send message. Please try again or email me directly.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-5 bg-gray-900 rounded-lg transition-transform"
              >
                <div className="relative w-14 h-14">
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
                  <i className={`${social.icon} text-4xl text-white absolute inset-0 flex items-center justify-center hidden`}></i>
                </div>
                <div className="text-center">
                  <h3 className="text-base font-medium text-white">{social.name}</h3>
                  <p className="text-gray-400 text-sm">{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
