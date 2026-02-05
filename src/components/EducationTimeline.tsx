import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  period: string;
  description: string;
  image: string;
}

interface EducationTimelineProps {
  items: TimelineItem[];
}

const EducationTimeline: React.FC<EducationTimelineProps> = ({ items }) => {
  const cardGradients = [
    { gradient: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', accent: 'from-blue-500 to-indigo-500', dot: 'bg-blue-500' },
    { gradient: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', accent: 'from-indigo-500 to-purple-500', dot: 'bg-indigo-500' },
    { gradient: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30', accent: 'from-red-500 to-rose-500', dot: 'bg-red-500' },
  ];

  return (
    <div className="relative min-h-[800px]">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-red-500/50"></div>

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const theme = cardGradients[index % cardGradients.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex justify-center group"
            >
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 -top-1 w-4 h-4 ${theme.dot} rounded-full z-10 ring-4 ring-[#050508] shadow-lg`}>
                <div className={`absolute inset-0 ${theme.dot} rounded-full animate-ping opacity-30`} style={{ animationDuration: '2s' }} />
              </div>

              {/* Content container */}
              <div className="w-full max-w-2xl relative">
                {/* Outer glow */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${theme.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700`} />
                
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${theme.gradient} rounded-2xl overflow-hidden border ${theme.border} transition-all duration-500 group-hover:border-opacity-70`}>
                  <div className="relative bg-[#0a0a0f]/80 backdrop-blur-xl m-[1px] rounded-[calc(1rem-1px)] overflow-hidden">
                    {/* Accent line */}
                    <div className={`h-1 bg-gradient-to-r ${theme.accent}`} />
                    
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                      
                      {/* Period badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.accent} text-white text-sm font-bold shadow-lg`}>
                          {item.period}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationTimeline;
