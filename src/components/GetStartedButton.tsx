// src/components/GetStartedButton.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const GetStartedButton: React.FC = () => {
  return (
    <Link
      to="/login"
      className="flex items-center justify-center px-6 py-3 bg-primary text-background rounded-full transition duration-300 hover:bg-primary-dark hover:shadow-[0_0_20px_rgba(20,184,166,0.7)]"
    >
      Get Started <FiArrowRight className="ml-2" />
    </Link>
  );
};

export default GetStartedButton;
