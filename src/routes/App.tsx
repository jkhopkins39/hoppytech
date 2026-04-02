import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import NavBar from "../components/NavBar";
import Chatbot from "../components/Chatbot";
import About from "./About";
import Blog from "./Blog";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import ThankYou from "./ThankYou";
import Footer from "../components/Footer";
import { socialLinks, contactInfo } from "../config/socialLinks";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function HomePage() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <>
      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-68px)] overflow-hidden">
        {/* Full-bleed photo — absolutely positioned right half */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="absolute inset-y-0 right-0 w-full md:w-[55%] z-0"
        >
          <img
            src="/Introduction.jpg"
            alt="Jeremy Hopkins"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover mix-blend-plus-lighter opacity-50"
          >
            <source src="/video/output.webm" type="video/webm" />
          </video>
          {/* Left gradient — blends into text area */}
          <div
            className="absolute inset-y-0 left-0 w-2/3 z-10"
            style={{ background: "linear-gradient(to right, var(--canvas) 10%, color-mix(in srgb, var(--canvas) 60%, transparent) 60%, transparent 100%)" }}
          />
          {/* Right gradient — fades to nothing at edge (no hard cutoff) */}
          <div
            className="absolute inset-y-0 right-0 w-1/4 z-10"
            style={{ background: "linear-gradient(to left, var(--canvas) 0%, transparent 100%)" }}
          />
          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 z-10"
            style={{ background: "linear-gradient(to top, var(--canvas) 0%, transparent 100%)" }}
          />
          {/* Top gradient — subtle */}
          <div
            className="absolute inset-x-0 top-0 h-24 z-10"
            style={{ background: "linear-gradient(to bottom, var(--canvas) 0%, transparent 100%)" }}
          />
        </motion.div>

        {/* Ambient glow — follows cursor subtly */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 60% at ${30 + mousePos.x * 5}% ${40 + mousePos.y * 5}%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* Text content */}
        <div className="relative z-[5] flex flex-col justify-center min-h-[calc(100vh-68px)] max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="md:w-[52%]">
            {/* Heading */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-[clamp(2.6rem,6vw,5.2rem)] font-bold leading-[1.08] tracking-tight text-ink mb-6"
            >
              AI Developer<br />
              <span
                className="italic"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                & Builder
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-muted text-lg leading-relaxed max-w-md mb-10"
            >
              Computer Science student at Kennesaw State University,
              specializing in AI & Machine Learning — building innovative
              solutions with React, Python, and modern web technologies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => navigate("/portfolio")}
                className="px-7 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] text-[15px]"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--canvas)",
                  boxShadow: "0 0 0 0 color-mix(in srgb, var(--accent) 30%, transparent)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px color-mix(in srgb, var(--accent) 30%, transparent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                View My Work
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-7 py-3.5 font-medium rounded-xl transition-all duration-200 text-[15px] text-ink border"
                style={{ borderColor: "var(--border-color)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--surface-alpha)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
                }}
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted z-[5]"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── What I Do ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-accent text-[13px] font-mono uppercase tracking-widest">What I do</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-ink">
            Turning ideas into<br />
            <span style={{ fontFamily: "'DM Serif Display', serif" }} className="italic">real products</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Web Development",
              desc: "Full-stack web applications using React, Node.js, and modern tooling. Fast, accessible, and production-ready.",
              accent: "var(--accent)",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: "AI & Machine Learning",
              desc: "Integrating intelligence into applications using TensorFlow, PyTorch, and the OpenAI API.",
              accent: "#7C5CBF",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              ),
              title: "Software Engineering",
              desc: "Clean, maintainable code with best practices — test-driven development, object-oriented design, and clear documentation.",
              accent: "#0EA5E9",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border transition-all duration-300"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${card.accent}22`, color: card.accent }}
              >
                {card.icon}
              </div>
              <h3 className="font-semibold text-ink mb-2 text-lg">{card.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA banner ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent) 0%, color-mix(in srgb, var(--accent) 4%, transparent) 100%)",
            border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
          }}
        >
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-ink"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Let's build something great.
            </h2>
            <p className="text-muted mt-2 text-lg">Open to freelance and collaboration opportunities.</p>
          </div>
          <div className="flex flex-wrap gap-4 flex-none">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border text-ink rounded-xl transition-all duration-200 text-[14px] font-medium flex items-center gap-2"
              style={{ borderColor: "var(--border-color)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--surface-alpha)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-color)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="px-6 py-3 font-semibold rounded-xl transition-all duration-200 text-[14px]"
              style={{ backgroundColor: "var(--accent)", color: "var(--canvas)" }}
            >
              Send Email
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col bg-canvas min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thanks" element={<ThankYou />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
