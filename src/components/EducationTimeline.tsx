import React from "react";

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
  return (
    <div className="relative min-h-[800px]">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex justify-center"
          >
            {/* Content container */}
            <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white relative">
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 bg-white rounded-full border-4 border-blue-500 z-10"></div>
              
              {/* Image container with drop shadow */}
              <div className="mb-4 overflow-hidden rounded-lg shadow-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Title and period */}
              <div className="mb-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm font-semibold opacity-90">{item.period}</p>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeline;
