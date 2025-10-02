import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/auth/UserProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, UserPlus } from "lucide-react";

interface HeaderProps {
  className?: string;
  onNavItemClick?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className, onNavItemClick }) => {
  const { user, loading } = useAuth();
  
  const navItems = [
    { label: "Home", id: "hero", path: "/" },
    { label: "Features", id: "features", path: "/" },
    { label: "Pricing", id: "pricing", path: "/pricing" },
    { label: "About", id: "about", path: "/" },
  ];

  const handleClick = (id: string, path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (path === "/pricing") {
      window.location.href = path;
    } else if (onNavItemClick) {
      onNavItemClick(id);
    }
  };

  return (
    <header className={cn("fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10", className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/vite.ico" alt="Syntaxtual Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-tr from-white to-cyan-400 text-transparent bg-clip-text cursor-pointer">
              Syntaxtual
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-6 ml-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path === "/pricing" ? item.path : `#${item.id}`}
                onClick={(e) => handleClick(item.id, item.path, e)}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border-fuchsia-500/30 text-white hover:bg-gradient-to-r hover:from-fuchsia-600/40 hover:to-pink-600/40 hover:border-fuchsia-400/50 backdrop-blur-sm transition-all duration-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-black/90 backdrop-blur-md border-white/10 text-white" 
                align="end"
              >
                <div className="px-3 py-2 text-sm text-white/70">
                  <p className="font-medium">Welcome to Syntaxtual</p>
                  <p className="text-xs">Sign in or create an account</p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white">
                  <Link to="/login" className="flex items-center w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white">
                  <Link to="/signup" className="flex items-center w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="px-3 py-2 text-xs text-white/50">
                  <p>Build and deploy autonomous AI agents</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;