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
            className={`relative flex items-center ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* Content container */}
            <div
              className={`w-5/12 p-6 rounded-lg shadow-lg ${
                index % 2 === 0 ? "bg-blue-500" : "bg-red-500"
              } text-white`}
            >
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
                <p className="text-sm font-semibold">{item.period}</p>
              </div>

              {/* Description */}
              <p className="text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeline;
