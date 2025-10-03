import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Create Agent", path: "/create-agent", icon: Plus },
  ];

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.name) {
      const names = user.name.split(' ');
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-700 min-h-screen fixed left-0 top-0 backdrop-blur-sm flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <Link to="/" className="flex items-center gap-3">
          <img src="/vite.ico" alt="SyntaxTual Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-xl font-bold bg-gradient-to-tr from-white to-cyan-400 text-transparent bg-clip-text">
            SyntaxTual
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "text-white/70 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-all"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.picture} alt={user?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">{user?.name || user?.email}</p>
            <p className="text-xs text-white/50">View Profile</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
