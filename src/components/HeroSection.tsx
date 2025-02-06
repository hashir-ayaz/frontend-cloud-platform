// src/components/HeroSection.tsx
import React from "react";
import GetStartedButton from "./GetStartedButton";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fadeInDown delay-0">
        Deploy with Confidence
      </h1>
      <p className="text-xl md:text-2xl mb-8 animate-fadeInUp delay-[300ms]">
        A self-hosted PaaS to deploy and manage containers on demand using Docker,
        Traefik, PostgreSQL and more.
      </p>
      <div className="animate-fadeInUp delay-[600ms]">
        <GetStartedButton />
      </div>
    </section>
  );
};

export default HeroSection;
