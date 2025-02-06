// src/pages/Landing.tsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b to-secondary from-background text-gray-100 font-sans flex flex-col">
      <main className="flex-grow flex flex-col justify-center items-center px-4">
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
