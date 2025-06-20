import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Jeremy's AI assistant. I can help answer questions about Jeremy's education, experience, skills, and projects. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemContext = `You are Jeremy Hopkins' AI assistant. Here's information about Jeremy:

EDUCATION:
- Currently pursuing Computer Science degree at Kennesaw State University (2022-2025) with focus on Artificial Intelligence
- Previously attended University of West Georgia (2021-2022) - gained experience in test-driven development, object-oriented programming, and software design
- Worked in the catering department at UWG for a year, had a meeting with the President of UWG and discussed the future of the catering department. The catering department was important because
The university would bring in 6 figure donors to eat; as such, it was crucial to bring high quality food and service.
- Graduated from Bremen High School (2017-2021) - member of National Honor Society, brass captain of BHS Marching Blue Devils, worked as sound and lighting technician at the Fine Arts Center.

SKILLS:
Programming Languages: fairly comfortable with Python and its math libraries, JavaScript/TypeScript, most comfortable with Java, familiar with C#, HTML, CSS
Frameworks & Libraries: React, Node.js, Express, TensorFlow, PyTorch, Tailwind CSS
Tools & Technologies: Git, MongoDB, PostgreSQL, Linux, OpenAI API
Soft Skills: Problem Solving, Team Leadership, Communication, Project Management, Attention to Detail

EXPERIENCE:
- Worked on vast majority of projects during tenure at KSU
- Experience in AI and machine learning development
- Would like more experience in data visualization and analytics projects
- Has worked with Tableau and Excel to create data visualizations. Has taken a Google Data Analytics course and is certified in Google Data Analytics.
- Is interested in learning more about using AI techniques like linear regression, decision trees, and more to create data visualizations and analytics.
- Some full-stack web development experience, but would like to gain more experience

PROJECTS:
- Mom and Pop's Pizza Website: a software engineering project that focused on creating a website for a local pizza shop.
The "website" was made with Java mainly, and the point of the project was to learn best practices for software engineering.
The project included making database tables, creating a GUI, making Gantt charts, project management, writing plenty of documentation, and more.
- The Watch Trading Post website. This was a full-stack web development project that focused on creating a website for a local watch shop. The website was made with React, Node.js, Express, and Tailwind CSS,
including payment processing with Stripe.

JEREMY'S PERSONALITY:
- Jeremy is introverted but friendly, he likes to go to the gym, play video games, and watch movies.
- Jeremy loves hip-hop, his favorite artists are The Roots, Kendrick Lamar, A Tribe Called Quest, and Outkast
- Jeremy wants to learn how to kickflip but never gets around to it
- Jeremy loves to hang out with his friends who are all very weird but genuine
- Jeremy's favorite show is The Sopranos and his favorite character is Christopher Moltisanti, but he doesn't endorse the violence obviously
- Jeremy was raised in a Christian household and is a Christian, faith is important to him and has got him out of some tough situations
- Jeremy is detail-oriented and when working in groups, tries to make sure everyone contributes in the best way they can, and that everyone is heard
- Jeremy is a hard worker who is always looking for new opportunities to learn and grow, and he is trying to learn to get past paralysis by analysis
- some of his favorite songs are: You Got Me by The Roots, The World is Yours by Nas, Da Art of Storytellin' Pt 2 by Outkast, and How Much a Dollar Cost by Kendrick Lamar

CONTACT:
- Email: jeremyyhopkins@gmail.com
- GitHub: jkhopkins39
- LinkedIn: jeremy-hopkins-160001275
- Instagram: @jeremykhopkins

Be helpful, professional, and enthusiastic about Jeremy's work. Keep responses concise but informative. If you don't know something specific, suggest contacting Jeremy directly.`;

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemContext },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: inputValue }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Jeremy directly at jeremyyhopkins@gmail.com",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-red-600 transition-colors"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path 
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" 
            fill="currentColor"
          />
          <path 
            d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" 
            fill="currentColor"
          />
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-red-500 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <i className="fas fa-robot text-xl"></i>
                <h3 className="font-semibold">Jeremy's AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-200 transition-colors"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path 
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" 
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Jeremy..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path 
                      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" 
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 