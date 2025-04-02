import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  onNavItemClick?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className, onNavItemClick }) => {
  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "About", id: "about" },
  ];

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavItemClick) {
      onNavItemClick(id);
    }
  };

  return (
    <header className={cn("fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10", className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-tr from-white to-fuchsia-500 text-transparent bg-clip-text mr-8">
            Syntaxual
          </h1>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(item.id, e)}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white/70 hover:text-white">
            Login
          </Button>
          <Button variant="gradient">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
