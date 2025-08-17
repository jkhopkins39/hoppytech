import { motion } from 'framer-motion';
import EducationTimeline from "../components/EducationTimeline";
import SkillsDropdown from "../components/SkillsDropdown";
import ResumeSection from "../components/ResumeSection";
import Footer from "../components/Footer";

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
          About Jeremy Hopkins
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-300 text-center mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          I'm a passionate Computer Science student at Kennesaw State University with a focus on Artificial Intelligence and Machine Learning. 
          I specialize in building innovative web applications, AI solutions, and software engineering projects using modern technologies.
        </motion.p>

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
      <Footer />
    </div>
  );
}

export default About;
