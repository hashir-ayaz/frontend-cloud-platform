// src/components/FeatureCard.tsx
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg transition-colors hover:bg-white/20">
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="text-2xl font-semibold ml-2">{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
