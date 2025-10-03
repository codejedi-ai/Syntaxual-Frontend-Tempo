import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { UserProfile } from "@/components/auth/UserProfile";
import { User } from "lucide-react";

interface HeaderProps {
  className?: string;
  onNavItemClick?: (sectionId: string) => void;
  showDashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ className, onNavItemClick, showDashboard = true }) => {
  const { user, loading } = useAuth();

  const allNavItems = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news" },
    { label: "Pricing", path: "/pricing" },
    { label: "Dashboard", path: "/dashboard", protected: true },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.protected && !showDashboard) return false;
    return true;
  });

  return (
    <header className={cn("fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10", className)}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/vite.ico" alt="SyntaxTual Logo" className="h-12 w-12 object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-tr from-white to-cyan-400 text-transparent bg-clip-text cursor-pointer">
              SyntaxTual
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-6 ml-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : user ? (
            <UserProfile />
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                className="bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border-fuchsia-500/30 text-white hover:bg-gradient-to-r hover:from-fuchsia-600/40 hover:to-pink-600/40 hover:border-fuchsia-400/50 backdrop-blur-sm transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;