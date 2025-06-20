import React from "react";
import Footer from "../components/Footer";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-center text-gray-400">Blog content will be displayed here.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
