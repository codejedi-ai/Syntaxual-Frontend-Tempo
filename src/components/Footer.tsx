import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  onNavItemClick?: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavItemClick }) => {
  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavItemClick) {
      onNavItemClick(id);
    }
  };

  return (
    <footer className="container mx-auto py-8 px-4 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold bg-gradient-to-tr from-indigo-400 to-violet-400 text-transparent bg-clip-text">Syntaxual</h3>
          <p className="text-white/50">© 2025 Syntaxual. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="#hero" onClick={(e) => handleClick("hero", e)} className="text-white/70 hover:text-white">Home</a>
          <a href="#features" onClick={(e) => handleClick("features", e)} className="text-white/70 hover:text-white">Features</a>
          <a href="#pricing" onClick={(e) => handleClick("pricing", e)} className="text-white/70 hover:text-white">Pricing</a>
          <a href="#about" onClick={(e) => handleClick("about", e)} className="text-white/70 hover:text-white">About</a>
          <Link to="#" className="text-white/70 hover:text-white">Contact</Link>
          <Link to="#" className="text-white/70 hover:text-white">Privacy</Link>
          <Link to="#" className="text-white/70 hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;