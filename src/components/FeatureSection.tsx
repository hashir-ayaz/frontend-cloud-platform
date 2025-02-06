// src/components/FeatureSection.tsx
import React from "react";
import FeatureCard from "./FeatureCard";
import { SiDocker, SiPostgresql, SiGithubactions } from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa";

const FeatureSection: React.FC = () => {
  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2 animate-fadeInUp delay-500">
      <FeatureCard 
        icon={<SiDocker className="text-3xl text-primary" />} 
        title="Docker & Containers" 
        description="Deploy and manage containers on demand with ease." 
      />
      <FeatureCard 
        icon={<FaNetworkWired className="text-3xl text-primary" />} 
        title="Traefik Gateway" 
        description="Dynamic routing, SSL termination, and rate limiting at your service." 
      />
      <FeatureCard 
        icon={<SiPostgresql className="text-3xl text-primary" />} 
        title="PostgreSQL DB" 
        description="Robust and scalable database solutions for your applications." 
      />
      <FeatureCard 
        icon={<SiGithubactions className="text-3xl text-primary" />} 
        title="CI/CD Automation" 
        description="Automate deployments using GitHub Actions for faster delivery." 
      />
    </section>
  );
};

export default FeatureSection;
