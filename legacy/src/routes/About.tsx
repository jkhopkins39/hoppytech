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
      image: "/images/education/marietta-campus.jpg",
    },
    {
      title: "University of West Georgia",
      period: "2021-2022",
      description:
        "During my time at UWG I gained experience in test-driven development, object-oriented programming, and software design. I also worked in the catering department and became very familiar with the facilities there.",
      image: "/images/education/UWG.jpg",
    },
    {
      title: "Bremen High School",
      period: "2017-2021",
      description:
        "I graduated from Bremen High School in 2021. I was a member of the National Honor Society and the brass captain of the BHS Marching Blue Devils. I also worked in the Fine Arts Center as a sound and lighting technician.",
      image: "/images/education/BHS.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] translate-x-1/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[130px] translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Get To Know Me</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            I'm a passionate Computer Science student at Kennesaw State University with a focus on Artificial Intelligence and Machine Learning. 
            I specialize in building innovative web applications, AI solutions, and software engineering projects using modern technologies.
          </p>
        </motion.div>

        {/* Education Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative py-8 mb-8"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-6 bg-[#050508] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Education Journey
              </span>
            </div>
          </div>
        </motion.div>

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
