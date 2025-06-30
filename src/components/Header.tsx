import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/auth/UserProfile";

interface HeaderProps {
  className?: string;
  onNavItemClick?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className, onNavItemClick }) => {
  const { user, loading } = useAuth();
  
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
          <Link to="/">
            <h1 className="text-xl font-bold bg-gradient-to-tr from-indigo-400 to-violet-400 text-transparent bg-clip-text mr-8 cursor-pointer">
              Syntaxtual
            </h1>
          </Link>
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
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : user ? (
            <UserProfile />
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;