import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

interface ContactSubmission {
  id: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const Contact: React.FC = () => {
  // Honeypot fields - should remain empty
  const [honeypot1, setHoneypot1] = useState("");
  const [honeypot2, setHoneypot2] = useState("");
  const [formLoadTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const storeSubmission = (email: string, message: string) => {
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      email,
      message,
      date: new Date().toISOString(),
      read: false
    };

    const existingSubmissions = localStorage.getItem('contactSubmissions');
    const submissions: ContactSubmission[] = existingSubmissions 
      ? JSON.parse(existingSubmissions) 
      : [];
    
    submissions.unshift(submission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Honeypot validation - if filled, it's likely a bot
    if (honeypot1 || honeypot2) {
      e.preventDefault();
      console.log("Bot detected via honeypot");
      // Redirect to thank you page anyway to not alert the bot
      window.location.href = import.meta.env.DEV 
        ? 'http://localhost:5173/thank-you'
        : 'https://jkhopkins39.github.io/thank-you';
      return;
    }
    
    // Time-based validation - form submitted too quickly (less than 3 seconds)
    const timeTaken = Date.now() - formLoadTime;
    if (timeTaken < 3000) {
      e.preventDefault();
      console.log("Bot detected via timing");
      alert("Please take your time filling out the form.");
      return;
    }

    // Store submission locally before sending to web3forms
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      if (email && message) {
        storeSubmission(email, message);
      }
    }

    setIsSubmitting(true);
    // Form will submit normally to web3forms
  };
  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      logo: '/images/social/instagram-logo.png',
      handle: '@jeremykhopkins',
      url: 'https://instagram.com/jeremykhopkins'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      logo: '/images/social/facebook-logo.png',
      handle: 'Jeremy Hopkins',
      url: 'https://facebook.com/jeremy.hopkins.94695'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      logo: '/images/social/linkedin-logo.png',
      handle: 'jeremy-hopkins-160001275',
      url: 'https://www.linkedin.com/in/jeremy-hopkins-160001275'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      logo: '/images/social/github-logo.png',
      handle: 'jkhopkins39',
      url: 'https://github.com/jkhopkins39'
    }
  ];

  // Determine redirect URL based on environment
  const redirectUrl = import.meta.env.DEV 
    ? 'http://localhost:5173/thank-you'
    : 'https://jkhopkins39.github.io/thank-you';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-3 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          Contact Me
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Get in touch to discuss professional opportunities, project collaborations, or to learn more about my services and expertise.
        </motion.p>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-10"
        >
          <form 
            ref={formRef}
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-5"
            onSubmit={handleFormSubmit}
          >
            <input type="hidden" name="access_key" value="46cae387-addf-453a-a32f-6464199035c6" />
            <input type="hidden" name="subject" value="New Contact Form Submission" />
            <input type="hidden" name="redirect" value={redirectUrl} />
            
            {/* Honeypot fields - hidden from users, visible to bots */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="contact_website">Leave this field empty</label>
              <input
                type="text"
                id="contact_website"
                name="contact_website"
                value={honeypot1}
                onChange={(e) => setHoneypot1(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
              <label htmlFor="contact_fax">Fax (do not fill)</label>
              <input
                type="text"
                id="contact_fax"
                name="contact_fax"
                value={honeypot2}
                onChange={(e) => setHoneypot2(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

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
              <label className="block text-base mb-2">From:</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full p-2.5 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-base mb-2">Message:</label>
              <textarea
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
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-lg font-medium text-base transition-transform bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
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
