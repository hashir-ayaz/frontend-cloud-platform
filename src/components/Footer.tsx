// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Container Deployment Platform. All rights reserved.
    </footer>
  );
};

export default Footer;
